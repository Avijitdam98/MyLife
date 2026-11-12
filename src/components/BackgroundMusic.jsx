import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Music } from 'lucide-react';

export function BackgroundMusic({ 
  isMuted, 
  isPlayingMusic, 
  toggleMute, 
  startAmbientMusic 
}) {
  const handleClick = () => {
    if (!isPlayingMusic) {
      startAmbientMusic();
    } else {
      toggleMute();
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <motion.button
        onClick={handleClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="group relative flex items-center gap-2 px-3.5 py-2 rounded-full glass-panel border border-blush-300/20 hover:border-blush-400/40 text-slate-200 transition-all shadow-lg hover:shadow-blush-500/20"
        aria-label="Toggle background music"
      >
        {/* Equalizer animation when playing and unmuted */}
        {isPlayingMusic && !isMuted ? (
          <div className="flex items-center gap-0.5 h-4">
            <motion.span 
              className="w-0.5 bg-blush-400 rounded-full"
              animate={{ height: ['4px', '16px', '6px'] }}
              transition={{ repeat: Infinity, duration: 0.7, ease: "easeInOut" }}
            />
            <motion.span 
              className="w-0.5 bg-gold-400 rounded-full"
              animate={{ height: ['12px', '4px', '14px'] }}
              transition={{ repeat: Infinity, duration: 0.5, ease: "easeInOut", delay: 0.15 }}
            />
            <motion.span 
              className="w-0.5 bg-blush-400 rounded-full"
              animate={{ height: ['6px', '16px', '8px'] }}
              transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut", delay: 0.3 }}
            />
          </div>
        ) : (
          <Music className="w-4 h-4 text-blush-300 group-hover:rotate-12 transition-transform" />
        )}

        <span className="text-xs font-medium tracking-wide text-slate-200 hidden sm:inline">
          {!isPlayingMusic ? "Tap For Romantic Song" : isMuted ? "Sound Off" : "Canon in D 💖"}
        </span>

        {isMuted ? (
          <VolumeX className="w-4 h-4 text-slate-400" />
        ) : (
          <Volume2 className="w-4 h-4 text-blush-400" />
        )}

        {/* Pulse ring indicator when waiting for initial tap */}
        {!isPlayingMusic && (
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blush-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-blush-500"></span>
          </span>
        )}
      </motion.button>
    </div>
  );
}

