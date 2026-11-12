import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wifi, Battery, MessageSquare, Lock, Sparkles, ChevronUp } from 'lucide-react';
import { CONFIG } from '../../config';

export function LockScreen({ onUnlock }) {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
      );
      setCurrentDate(
        now.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between items-center px-4 py-8 select-none overflow-hidden bg-gradient-to-b from-[#0a0518] via-[#0f0826] to-[#06030c]">
      {/* Subtle wallpaper gradient blur circles */}
      <div className="absolute top-[15%] left-[10%] w-72 h-72 rounded-full bg-blush-600/20 blur-[90px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-80 h-80 rounded-full bg-purple-700/20 blur-[100px] pointer-events-none" />

      {/* Top Phone Status Bar */}
      <header className="w-full max-w-sm flex items-center justify-between text-xs text-slate-300 font-medium px-4 pt-1 z-10">
        <span>{currentTime || "11:11"}</span>
        <div className="flex items-center gap-2">
          <span className="text-[10px] tracking-wider font-semibold">5G</span>
          <Wifi className="w-3.5 h-3.5" />
          <div className="flex items-center gap-1">
            <span className="text-[11px]">98%</span>
            <Battery className="w-4 h-4 fill-slate-300" />
          </div>
        </div>
      </header>

      {/* Center Clock & Lock Icon */}
      <div className="w-full max-w-sm flex flex-col items-center mt-6 z-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-2"
        >
          <Lock className="w-5 h-5 text-slate-400" />
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          className="text-sm font-medium text-slate-300 tracking-wide"
        >
          {currentDate || "Wednesday, November 12"}
        </motion.p>

        <motion.h1 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-7xl font-extralight tracking-tight text-white mt-1 font-sans"
        >
          {currentTime || "11:11"}
        </motion.h1>
      </div>

      {/* System Alert / Push Notification */}
      <motion.div
        initial={{ y: 50, opacity: 0, scale: 0.92 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, type: "spring", stiffness: 260, damping: 20 }}
        className="w-full max-w-sm z-20 my-auto"
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={onUnlock}
          className="relative group cursor-pointer rounded-3xl p-4 glass-panel border border-blush-400/30 hover:border-blush-400/60 shadow-[0_12px_40px_rgba(0,0,0,0.6)] backdrop-blur-2xl transition-all"
        >
          {/* Subtle pulse ring around notification */}
          <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-blush-500/40 via-gold-400/40 to-blush-500/40 opacity-70 blur-sm group-hover:opacity-100 transition-opacity animate-pulse" />

          <div className="relative z-10">
            {/* Notification Header */}
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-md bg-gradient-to-br from-blush-500 to-rose-600 flex items-center justify-center text-white shadow-sm">
                  <MessageSquare className="w-3 h-3 fill-current" />
                </div>
                <span className="font-semibold tracking-wider text-slate-200 uppercase text-[11px]">
                  {CONFIG.phoneNotification.appName}
                </span>
              </div>
              <span className="text-slate-400 text-[11px]">{CONFIG.phoneNotification.timeAgo}</span>
            </div>

            {/* Notification Body */}
            <div>
              <p className="text-base font-semibold text-white tracking-tight flex items-center gap-1.5">
                {CONFIG.phoneNotification.message}
              </p>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                {CONFIG.phoneNotification.subMessage}
              </p>
            </div>

            {/* Tap Action Hint */}
            <div className="mt-3 flex items-center justify-between pt-2 border-t border-white/5">
              <span className="text-[11px] text-blush-300 font-medium flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-gold-400 animate-spin" />
                Tap to view private message
              </span>
              <span className="text-[10px] text-slate-400 bg-white/10 px-2 py-0.5 rounded-full">
                Encrypted 🔒
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom Unlock Prompt */}
      <footer className="w-full max-w-sm flex flex-col items-center gap-2 pb-2 z-10">
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="flex flex-col items-center"
        >
          <ChevronUp className="w-5 h-5 text-slate-400" />
          <span className="text-xs text-slate-400 font-medium tracking-wide">
            Tap notification to open
          </span>
        </motion.div>

        {/* Home indicator bar */}
        <div className="w-32 h-1 bg-white/40 rounded-full mt-2" />
      </footer>
    </div>
  );
}

