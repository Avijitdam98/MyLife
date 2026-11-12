import React from 'react';
import { motion } from 'framer-motion';
import { Stethoscope, Heart, Sparkles, Activity, ShieldCheck, Pill } from 'lucide-react';
import { CONFIG } from '../config';

export function MedicoSpecialCard() {
  return (
    <section className="relative py-16 px-4 sm:px-6 max-w-4xl mx-auto select-none">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative rounded-3xl glass-gold p-6 sm:p-10 border border-gold-400/40 shadow-[0_20px_60px_rgba(251,191,36,0.15)] overflow-hidden"
      >
        {/* Top Floating Glow & Medico Icons */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gold-400/20 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white shadow-lg">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-gold-300">
                {CONFIG.medicoCard.badge}
              </span>
              <h3 className="text-xl sm:text-2xl font-serif text-white font-bold">
                {CONFIG.medicoCard.title}
              </h3>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/20 border border-rose-400/30 text-rose-300 text-xs font-semibold">
            <Activity className="w-4 h-4 text-rose-400 animate-pulse" />
            <span>Vital Status: In Love</span>
          </div>
        </div>

        {/* Prescription Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="p-4 rounded-2xl bg-midnight-950/60 border border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-rose-300 uppercase tracking-wider">
              <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
              <span>Medical Diagnosis</span>
            </div>
            <p className="text-sm text-slate-200 leading-relaxed font-sans">
              "{CONFIG.medicoCard.diagnosis}"
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-midnight-950/60 border border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-gold-300 uppercase tracking-wider">
              <Pill className="w-4 h-4 text-gold-400" />
              <span>Nurse's Care Plan & Prescription</span>
            </div>
            <p className="text-sm text-slate-200 leading-relaxed font-sans">
              "{CONFIG.medicoCard.prescription}"
            </p>
          </div>
        </div>

        {/* Nurse Signature Line */}
        <div className="mt-8 pt-4 border-t border-gold-400/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Verified by {CONFIG.herFullName} • Caring Nurse & Lifelong Holder of Avijit's Heart 🩺</span>
          </div>
          <span className="font-handwriting text-2xl text-gold-300 font-bold">
            Nurse {CONFIG.herName} Patra 🩺✨
          </span>
        </div>
      </motion.div>
    </section>
  );
}

