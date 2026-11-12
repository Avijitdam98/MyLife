import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';
import { CONFIG } from '../../config';

export function RevealScreen({ onProceed, playChime }) {
  useEffect(() => {
    // Play sparkling chime when reveal screen loads
    playChime();
  }, [playChime]);

  return (
    <div className="relative min-h-screen w-full bg-black flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden">
      {/* Subtle gentle spotlight in center */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.35, 0.15],
        }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="absolute w-[450px] h-[450px] rounded-full bg-gradient-to-r from-blush-500/20 to-purple-600/20 blur-[120px] pointer-events-none"
      />

      <div className="relative z-10 max-w-xl mx-auto space-y-6">
        {/* Soft sparkling icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="inline-flex items-center justify-center p-3 rounded-full bg-white/5 border border-white/10 text-blush-300 shadow-inner"
        >
          <Sparkles className="w-5 h-5 text-gold-400 animate-spin" />
        </motion.div>

        {/* Lead in text */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 0.9, y: 0 }}
          transition={{ duration: 1.2, delay: 0.7 }}
          className="text-base sm:text-xl font-light tracking-widest text-slate-300 uppercase font-sans"
        >
          {CONFIG.shockGlitch.revealLeadIn}
        </motion.p>

        {/* Her Glowing Name */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 1.2, ease: "easeOut" }}
          className="text-5xl sm:text-7xl md:text-8xl font-serif text-white text-glow-pink tracking-tight"
        >
          {CONFIG.herName}
        </motion.h1>

        {/* Ellipsis / heartbeat note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.0 }}
          className="flex items-center justify-center gap-2 pt-2"
        >
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <Heart className="w-4 h-4 text-blush-400 fill-blush-500" />
          </motion.div>
          <span className="text-xs sm:text-sm text-slate-400 tracking-wider">
            Avijit built something special just for you, Momo...
          </span>
        </motion.div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.8 }}
          className="pt-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={onProceed}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full glass-gold text-slate-100 font-medium tracking-wide shadow-xl hover:shadow-gold-400/30 transition-all border border-gold-400/40"
          >
            <span>{CONFIG.shockGlitch.buttonToContinue}</span>
            <ArrowRight className="w-4 h-4 text-gold-300 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

