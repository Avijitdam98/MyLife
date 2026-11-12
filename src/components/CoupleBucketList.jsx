import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Circle, Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

export function CoupleBucketList({ playChime, lightTap }) {
  const [items, setItems] = useState([
    { id: 1, text: "May 29th: The day our paths crossed & love began ✨", done: true, tag: "Completed" },
    { id: 2, text: "Countless late night calls & falling helplessly in love", done: true, tag: "Completed" },
    { id: 3, text: "Loving you through every exhausting hospital nursing shift 🩺", done: true, tag: "Completed" },
    { id: 4, text: "Aunkita saying 'YES' to this proposal today 💍", done: false, tag: "Today!" },
    { id: 5, text: "Taking our dream romantic honeymoon trip together ✈️", done: false, tag: "Next Adventure" },
    { id: 6, text: "Building our cozy dream home filled with warmth & laughter 🏡", done: false, tag: "Our Dream" },
    { id: 7, text: "Growing old, wrinkly, and still holding hands forever 👵👴", done: false, tag: "Eternity" }
  ]);

  const toggleItem = (id) => {
    if (lightTap) lightTap();
    if (playChime) playChime();

    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextDone = !item.done;
          if (nextDone) {
            confetti({
              particleCount: 30,
              spread: 60,
              origin: { y: 0.7 },
              colors: ['#f43f5e', '#fbbf24', '#ffffff']
            });
          }
          return { ...item, done: nextDone };
        }
        return item;
      })
    );
  };

  return (
    <section className="relative py-16 px-4 sm:px-6 max-w-3xl mx-auto select-none">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <span className="text-xs font-semibold tracking-widest uppercase text-gold-400 bg-gold-400/10 px-4 py-1.5 rounded-full border border-gold-400/20">
          Our Future Dreams
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif text-white mt-3">
          Avijit & Aunkita's Bucket List 💍
        </h2>
        <p className="text-sm text-slate-400 mt-2">
          Tap any dream to check it off with Avijit!
        </p>
      </motion.div>

      <div className="space-y-3.5">
        {items.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.985 }}
            onClick={() => toggleItem(item.id)}
            className={`cursor-pointer p-4 rounded-2xl glass-panel border transition-all duration-300 flex items-center justify-between gap-4 ${
              item.done 
                ? 'border-gold-400/50 bg-gold-500/10 shadow-[0_4px_20px_rgba(251,191,36,0.15)]' 
                : 'border-white/10 hover:border-blush-400/40'
            }`}
          >
            <div className="flex items-center gap-3.5">
              {item.done ? (
                <CheckCircle2 className="w-5 h-5 text-gold-400 flex-shrink-0" />
              ) : (
                <Circle className="w-5 h-5 text-slate-500 flex-shrink-0" />
              )}
              <span className={`text-sm sm:text-base font-medium ${item.done ? 'text-white' : 'text-slate-300'}`}>
                {item.text}
              </span>
            </div>

            <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border flex-shrink-0 ${
              item.done 
                ? 'bg-gold-400/20 text-gold-300 border-gold-400/40' 
                : 'bg-white/5 text-slate-400 border-white/10'
            }`}>
              {item.tag}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
