import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Coffee, Heart, Sparkles, Moon, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { CONFIG } from '../config';

export function NurseCarePackage({ playTap, lightTap }) {
  const [stampedPerks, setStampedPerks] = useState({});

  const toggleStamp = (idx) => {
    if (playTap) playTap();
    if (lightTap) lightTap();
    setStampedPerks((prev) => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  return (
    <section className="relative py-16 px-4 sm:px-6 max-w-4xl mx-auto select-none">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative rounded-3xl glass-panel p-6 sm:p-10 border border-blush-400/30 shadow-[0_20px_60px_rgba(244,63,94,0.18)] overflow-hidden"
      >
        {/* Soft Ambient Glow */}
        <div className="absolute -top-16 -right-16 w-60 h-60 rounded-full bg-blush-500/20 blur-[80px] pointer-events-none" />

        {/* Header */}
        <div className="text-center sm:text-left mb-8 border-b border-white/10 pb-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blush-500/20 text-blush-300 text-xs font-semibold mb-3 border border-blush-400/30">
            <Heart className="w-3.5 h-3.5 fill-blush-500 text-blush-400" />
            <span>Dedicated to Nurse Aunkita Patra</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif text-white font-bold tracking-tight">
            {CONFIG.nurseCarePackage.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed">
            {CONFIG.nurseCarePackage.subtitle}
          </p>
        </div>

        {/* Perks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {CONFIG.nurseCarePackage.perks.map((perk, idx) => {
            const isStamped = stampedPerks[idx];

            return (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleStamp(idx)}
                className={`cursor-pointer relative p-4 rounded-2xl border transition-all duration-300 flex items-start gap-3.5 ${isStamped
                    ? 'bg-rose-950/40 border-blush-400/60 shadow-[0_0_20px_rgba(244,63,94,0.25)]'
                    : 'bg-white/5 border-white/10 hover:border-blush-400/30'
                  }`}
              >
                <div className="text-3xl p-2 rounded-xl bg-white/10 flex-shrink-0">
                  {perk.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-white">
                      {perk.title}
                    </h4>
                    {isStamped ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <span className="text-[10px] text-blush-300 bg-blush-500/10 px-2 py-0.5 rounded-full">
                        Tap to Claim
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    {perk.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer Note from Avijit */}
        <div className="mt-8 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <span className="flex items-center gap-1.5 text-blush-300 font-medium">
            <Sparkles className="w-4 h-4 text-gold-400" />
            Guaranteed by Avijit • No Expiry Date Ever
          </span>
          <span className="font-handwriting text-xl text-gold-300 font-bold">
            Avijit's Promise to Momo 💖
          </span>
        </div>
      </motion.div>
    </section>
  );
}
