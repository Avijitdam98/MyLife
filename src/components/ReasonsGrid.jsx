import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, RefreshCw } from 'lucide-react';
import { CONFIG } from '../config';

export function ReasonsGrid({ playTap }) {
  // Track which cards are flipped (set of IDs)
  const [flippedCards, setFlippedCards] = useState({});

  const toggleFlip = (id) => {
    if (playTap) playTap();
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section className="relative py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-xs font-semibold tracking-widest uppercase text-blush-400 bg-blush-500/10 px-4 py-1.5 rounded-full border border-blush-400/20">
          From My Heart
        </span>
        <h2 className="text-3xl sm:text-5xl font-serif text-white mt-3">
          10 Reasons Why I Love You
        </h2>
        <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-md mx-auto">
          Out of a million reasons, here are just ten that make you completely irreplaceable.
        </p>
      </motion.div>

      {/* Grid of 3D Flip Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {CONFIG.reasons.map((reason, idx) => {
          const isFlipped = !!flippedCards[reason.id];

          return (
            <motion.div
              key={reason.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }}
              className="relative h-64 w-full perspective-1000 cursor-pointer select-none"
              onClick={() => toggleFlip(reason.id)}
            >
              <div
                className={`relative w-full h-full duration-700 transform-style-preserve-3d transition-transform ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
              >
                {/* ─── FRONT OF CARD ─── */}
                <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl glass-panel border border-blush-400/20 hover:border-blush-400/50 p-6 flex flex-col justify-between shadow-xl transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-serif text-gold-400 font-bold">
                      #{String(reason.id).padStart(2, '0')}
                    </span>
                    <span className="text-2xl">{reason.frontIcon}</span>
                  </div>

                  <div className="my-auto">
                    <h3 className="text-xl font-serif font-semibold text-white group-hover:text-blush-300 transition-colors">
                      {reason.short}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs text-blush-300">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                      Tap to flip card
                    </span>
                    <RefreshCw className="w-3.5 h-3.5 opacity-60" />
                  </div>
                </div>

                {/* ─── BACK OF CARD (REVEAL) ─── */}
                <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl glass-gold border border-gold-400/40 p-6 flex flex-col justify-between shadow-2xl">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold tracking-wider uppercase text-gold-300">
                      Reason #{reason.id}
                    </span>
                    <Heart className="w-4 h-4 text-blush-500 fill-blush-500" />
                  </div>

                  <div className="my-auto">
                    <p className="text-sm sm:text-base text-slate-100 leading-relaxed font-sans">
                      "{reason.text}"
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gold-400/20 text-[11px] text-gold-300/80">
                    <span>Forever & Always</span>
                    <span className="flex items-center gap-1">
                      <RefreshCw className="w-3 h-3" />
                      Tap to close
                    </span>
                  </div>
                </div>

              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

