import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Sparkles, Heart, Crown, Check } from 'lucide-react';
import { CONFIG } from '../config';

export function SecretGoldenScratchCard({ playChime, lightTap }) {
  const [isRevealed, setIsRevealed] = useState(false);
  const canvasRef = useRef(null);
  const [scratchProgress, setScratchProgress] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext('2d');

    // Draw shimmering golden foil
    const width = canvas.width;
    const height = canvas.height;

    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#f59e0b');
    grad.addColorStop(0.3, '#fbbf24');
    grad.addColorStop(0.5, '#fef08a');
    grad.addColorStop(0.7, '#f59e0b');
    grad.addColorStop(1, '#d97706');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Overlay text on foil
    ctx.font = 'bold 16px "Inter", sans-serif';
    ctx.fillStyle = '#451a03';
    ctx.textAlign = 'center';
    ctx.fillText('✨ RUB OR TAP TO SCRATCH & REVEAL ✨', width / 2, height / 2 - 10);
    ctx.font = '12px "Inter", sans-serif';
    ctx.fillText('A Secret Promise from Avijit to Aunkita 🎁', width / 2, height / 2 + 18);
  }, [isRevealed]);

  const scratch = (clientX, clientY) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * canvas.width;
    const y = ((clientY - rect.top) / rect.height) * canvas.height;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 32, 0, Math.PI * 2);
    ctx.fill();

    setScratchProgress((prev) => {
      const next = prev + 8;
      if (next >= 45 && !isRevealed) {
        setIsRevealed(true);
        if (playChime) playChime();
        if (lightTap) lightTap();
      }
      return next;
    });
  };

  const handleMouseMove = (e) => {
    if (e.buttons === 1) {
      scratch(e.clientX, e.clientY);
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches[0]) {
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleInstantReveal = () => {
    setIsRevealed(true);
    if (playChime) playChime();
    if (lightTap) lightTap();
  };

  return (
    <section className="relative py-16 px-4 sm:px-6 max-w-2xl mx-auto text-center select-none">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8"
      >
        <span className="text-xs font-semibold tracking-widest uppercase text-gold-400 bg-gold-400/10 px-4 py-1.5 rounded-full border border-gold-400/20">
          Interactive Surprise 🎁
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif text-white mt-3">
          Aunkita's VIP Golden Ticket
        </h2>
        <p className="text-sm text-slate-400 mt-2">
          Rub your finger across the golden foil to scratch and unlock Avijit's secret promise.
        </p>
      </motion.div>

      {/* Ticket Card Container */}
      <div className="relative w-full max-w-lg mx-auto aspect-[16/9] min-h-[260px] rounded-3xl overflow-hidden glass-gold border-2 border-gold-400/60 shadow-[0_20px_50px_rgba(251,191,36,0.25)] flex items-center justify-center p-6">

        {/* UNDERNEATH: The Secret VIP Ticket */}
        <div className="w-full h-full flex flex-col justify-between text-left p-4 rounded-2xl bg-gradient-to-br from-midnight-950 via-midnight-900 to-[#1e1035] border border-gold-400/40">
          <div className="flex items-center justify-between border-b border-gold-400/30 pb-3">
            <div className="flex items-center gap-2">
              <Crown className="w-6 h-6 text-gold-400" />
              <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-gold-200">
                VIP LIFETIME PASS TO AVIJIT'S HEART
              </span>
            </div>
            <span className="text-[10px] bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded-full border border-rose-400/30 font-semibold">
              NON-TRANSFERABLE 🔒
            </span>
          </div>

          <div className="my-auto space-y-1.5 py-2">
            <p className="text-sm sm:text-base font-serif text-white font-semibold">
              Holder: <span className="text-blush-400 text-lg">Aunkita Patra (Momo)</span>
            </p>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              "This ticket grants you unlimited forehead kisses, lifelong loyalty, late night ice cream runs, and zero arguments for all of eternity."
            </p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-gold-400/20 text-[11px] text-gold-300">
            <span>Issue Date: May 29th • Valid Forever</span>
            <span className="font-handwriting text-xl text-rose-300">Signed, Avijit 💖</span>
          </div>
        </div>

        {/* OVERLAY: Scratch Canvas */}
        {!isRevealed && (
          <canvas
            ref={canvasRef}
            width={500}
            height={280}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            onClick={handleInstantReveal}
            className="absolute inset-0 w-full h-full cursor-crosshair rounded-3xl z-20 touch-none shadow-2xl"
          />
        )}

      </div>

      {!isRevealed && (
        <button
          onClick={handleInstantReveal}
          className="mt-4 text-xs text-gold-300/80 hover:text-gold-200 underline tracking-wide"
        >
          Can't wait? Tap here to scratch instantly ✨
        </button>
      )}
    </section>
  );
}

