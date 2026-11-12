import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { CONFIG } from '../config';

export function LoveLetter() {
  return (
    <section className="relative py-24 px-4 sm:px-6 max-w-3xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <span className="text-xs font-semibold tracking-widest uppercase text-blush-400 bg-blush-500/10 px-4 py-1.5 rounded-full border border-blush-400/20">
          A Letter For You
        </span>
        <h2 className="text-3xl sm:text-5xl font-serif text-white mt-3">
          Words From My Soul
        </h2>
      </motion.div>

      {/* Letter Parchment Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative rounded-3xl p-6 sm:p-12 glass-panel border border-blush-300/30 shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-2xl overflow-hidden"
      >
        {/* Soft Golden Corner Accents */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-gold-400/40 rounded-tl-3xl pointer-events-none" />
        <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-gold-400/40 rounded-tr-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-gold-400/40 rounded-bl-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-gold-400/40 rounded-br-3xl pointer-events-none" />

        {/* Wax Seal / Stamp at top right */}
        <div className="absolute top-6 right-6 sm:top-8 sm:right-8 w-12 h-12 rounded-full bg-gradient-to-br from-rose-700 via-blush-600 to-rose-900 shadow-md flex items-center justify-center border-2 border-rose-400/40 select-none">
          <Heart className="w-5 h-5 text-white/90 fill-white/80" />
        </div>

        {/* Lines Reveal One-by-One */}
        <div className="space-y-6 sm:space-y-8 font-handwriting text-2xl sm:text-3xl md:text-4xl text-slate-100 leading-relaxed sm:leading-loose">
          {CONFIG.loveLetter.map((line, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: idx * 0.18 }}
              className="relative flex items-center gap-2"
            >
              <span className="text-glow-pink">
                {line}
              </span>
              {idx === CONFIG.loveLetter.length - 1 && (
                <Sparkles className="w-6 h-6 text-gold-400 inline animate-spin" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Signature */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: CONFIG.loveLetter.length * 0.18 + 0.3 }}
          className="mt-12 pt-6 border-t border-white/10 flex flex-col items-end"
        >
          <span className="text-xs uppercase tracking-widest text-slate-400 font-sans">
            Forever yours,
          </span>
          <span className="font-handwriting text-3xl sm:text-4xl text-gold-300 font-bold mt-1">
            {CONFIG.myName}
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}

