import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Flame } from 'lucide-react';
import { CONFIG } from '../config';

export function InteractiveLoveMeter({ playTap, lightTap }) {
  const [loveCount, setLoveCount] = useState(100);
  const [floatingHearts, setFloatingHearts] = useState([]);

  const handleHeartClick = (e) => {
    if (playTap) playTap();
    if (lightTap) lightTap();

    setLoveCount((prev) => {
      if (prev < 1000) return prev + 100;
      if (prev < 10000) return prev + 1000;
      if (prev < 100000) return prev + 25000;
      return prev + 500000;
    });

    // Spawn floating mini hearts
    const id = Date.now() + Math.random();
    const newHeart = {
      id,
      x: (Math.random() - 0.5) * 80,
      size: Math.random() * 12 + 16,
      rot: (Math.random() - 0.5) * 45
    };

    setFloatingHearts((prev) => [...prev.slice(-12), newHeart]);

    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((h) => h.id !== id));
    }, 1200);
  };

  const getLoveText = () => {
    if (loveCount >= 5000000) return "INFINITY % 🚀";
    if (loveCount >= 1000000) return "1,000,000 % 🔥";
    return `${loveCount.toLocaleString()} %`;
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 select-none">
      <div className="relative flex flex-col items-end">
        
        {/* Floating Mini Hearts Shower */}
        <div className="pointer-events-none absolute -top-16 right-6 w-32 h-32 overflow-visible">
          {floatingHearts.map((h) => (
            <motion.div
              key={h.id}
              initial={{ opacity: 1, y: 0, x: h.x, scale: 0.5, rotate: 0 }}
              animate={{ opacity: 0, y: -90, x: h.x * 1.5, scale: 1.4, rotate: h.rot }}
              transition={{ duration: 1.1, ease: "easeOut" }}
              className="absolute bottom-0 right-0 text-rose-500"
            >
              <Heart className="fill-current text-rose-500 drop-shadow-md" style={{ width: h.size, height: h.size }} />
            </motion.div>
          ))}
        </div>

        {/* Floating Heart Button */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleHeartClick}
          className="group relative flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 text-white font-semibold text-xs sm:text-sm shadow-[0_10px_30px_rgba(244,63,94,0.5)] border border-white/30 backdrop-blur-md"
        >
          <motion.div
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
          >
            <Heart className="w-5 h-5 fill-white text-white" />
          </motion.div>

          <div className="flex flex-col items-start leading-none">
            <span className="text-[10px] text-rose-100 font-normal">Avijit's Love for Aunkita</span>
            <span className="font-bold text-white text-xs mt-0.5 tracking-wide flex items-center gap-1">
              {getLoveText()}
              <Sparkles className="w-3 h-3 text-gold-300" />
            </span>
          </div>
        </motion.button>
      </div>
    </div>
  );
}

