import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Clock, Sparkles } from 'lucide-react';
import { CONFIG } from '../config';

export function LiveCounter() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTime = () => {
      const start = new Date(CONFIG.relationshipStartDate).getTime();
      const now = new Date().getTime();
      const difference = Math.max(0, now - start);

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const timeBlocks = [
    { label: "DAYS", value: timeLeft.days },
    { label: "HOURS", value: String(timeLeft.hours).padStart(2, '0') },
    { label: "MINUTES", value: String(timeLeft.minutes).padStart(2, '0') },
    { label: "SECONDS", value: String(timeLeft.seconds).padStart(2, '0') }
  ];

  return (
    <section className="relative py-24 px-4 sm:px-6 max-w-4xl mx-auto text-center">
      {/* Background soft ambient radial */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blush-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <span className="text-xs font-semibold tracking-widest uppercase text-gold-400 bg-gold-400/10 px-4 py-1.5 rounded-full border border-gold-400/20">
          Our Time Together
        </span>
        <h2 className="text-3xl sm:text-5xl font-serif text-white mt-3">
          {CONFIG.counterTitle}
        </h2>
        <p className="text-sm sm:text-base text-slate-400 mt-2">
          {CONFIG.counterSubtitle}
        </p>
      </motion.div>

      {/* Counter Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 relative z-10">
        {timeBlocks.map((block, idx) => (
          <motion.div
            key={block.label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-blush-400/40 transition-colors shadow-2xl relative overflow-hidden group"
          >
            {/* Top gradient highlight */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blush-500 via-gold-400 to-rose-500 opacity-60 group-hover:opacity-100 transition-opacity" />

            <div className="flex flex-col items-center">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={block.value}
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -15, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="text-4xl sm:text-6xl font-serif font-bold text-white tracking-tight"
                >
                  {block.value}
                </motion.span>
              </AnimatePresence>

              <span className="text-xs sm:text-sm font-semibold tracking-widest text-blush-300 mt-2 font-mono">
                {block.label}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Heartbeat pulse below counter */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-400"
      >
        <motion.div
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
        >
          <Heart className="w-4 h-4 text-blush-500 fill-blush-500" />
        </motion.div>
        <span>And Avijit's heart still skips a beat for Aunkita every single day.</span>
      </motion.div>
    </section>
  );
}

