import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, AlertTriangle, ShieldAlert } from 'lucide-react';
import { CONFIG } from '../../config';

export function GlitchTerminal({ onComplete, playGlitchSound, glitchBuzz }) {
  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isGlitching, setIsGlitching] = useState(true);

  const lines = CONFIG.shockGlitch.terminalLines;

  // Sound and haptic on entry
  useEffect(() => {
    playGlitchSound();
    glitchBuzz();
  }, [playGlitchSound, glitchBuzz]);

  // Typewriter effect
  useEffect(() => {
    if (currentLineIndex < lines.length) {
      const currentFullText = lines[currentLineIndex];

      if (currentCharIndex < currentFullText.length) {
        const timeout = setTimeout(() => {
          setCurrentCharIndex((prev) => prev + 1);
        }, 22 + Math.random() * 20); // Dynamic typing cadence
        return () => clearTimeout(timeout);
      } else {
        // Line completed, wait a moment then move to next
        const lineTimeout = setTimeout(() => {
          setDisplayedLines((prev) => [...prev, currentFullText]);
          setCurrentLineIndex((prev) => prev + 1);
          setCurrentCharIndex(0);

          // Audio glitch burst on key lines
          playGlitchSound();
          glitchBuzz();
        }, 450);
        return () => clearTimeout(lineTimeout);
      }
    } else {
      // All lines typed, short pause then trigger explosion!
      const finishTimeout = setTimeout(() => {
        onComplete();
      }, 900);
      return () => clearTimeout(finishTimeout);
    }
  }, [currentLineIndex, currentCharIndex, lines, onComplete, playGlitchSound, glitchBuzz]);

  // Periodic random screen shake and rgb flicker
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 140);
    }, 1200);
    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <div className={`relative min-h-screen w-full bg-black text-rose-300 font-mono flex flex-col justify-center items-center p-4 sm:p-8 overflow-hidden select-none ${isGlitching ? 'glitch-active' : ''}`}>
      {/* CRT Scanline & Phosphor Overlay */}
      <div className="absolute inset-0 crt-overlay pointer-events-none z-30" />

      {/* Cyber chromatic aberration backdrop */}
      <div className="absolute -top-10 -left-10 w-64 h-64 bg-red-600/15 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-cyan-600/15 rounded-full blur-[80px] pointer-events-none" />

      {/* Terminal Window Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-xl bg-black/90 border border-blush-500/40 rounded-xl shadow-[0_0_50px_rgba(244,63,94,0.3)] overflow-hidden z-20 backdrop-blur-xl"
      >
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-900/90 border-b border-blush-500/20 text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block animate-pulse" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            <span className="ml-2 font-semibold tracking-wider text-rose-400 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5" />
              SYSTEM_OVERRIDE.exe
            </span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-blush-400">
            <AlertTriangle className="w-3.5 h-3.5 animate-bounce text-amber-400" />
            <span>UNAUTHORIZED ACCESS</span>
          </div>
        </div>

        {/* Terminal Content Body */}
        <div className="p-6 space-y-3 min-h-[280px] text-sm sm:text-base leading-relaxed">
          {displayedLines.map((line, idx) => (
            <div key={idx} className="flex items-start gap-2 text-rose-200">
              <span className="text-blush-500 select-none">{'>'}</span>
              <span>{line}</span>
            </div>
          ))}

          {/* Currently typing line */}
          {currentLineIndex < lines.length && (
            <div className="flex items-start gap-2 text-white font-medium">
              <span className="text-blush-400 select-none animate-pulse">{'>'}</span>
              <span>
                {lines[currentLineIndex].slice(0, currentCharIndex)}
                <span className="inline-block w-2.5 h-4 bg-blush-400 ml-1 translate-y-0.5 animate-ping" />
              </span>
            </div>
          )}
        </div>

        {/* Terminal Footer Status */}
        <div className="px-6 py-3 bg-neutral-950/80 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
          <span className="flex items-center gap-1 text-rose-400 font-mono">
            <ShieldAlert className="w-3.5 h-3.5" />
            Target: @{CONFIG.herInstagram}
          </span>
          <span className="text-[11px] text-neutral-500">
            Bypassing defense protocol 9...
          </span>
        </div>
      </motion.div>
    </div>
  );
}

