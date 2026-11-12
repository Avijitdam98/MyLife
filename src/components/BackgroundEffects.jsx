import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export function BackgroundEffects() {
  // Generate random glowing particles
  const particles = useMemo(() => {
    return Array.from({ length: 28 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 12 + 10,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.5 + 0.2
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Deep Romantic Ambient Radial Glows */}
      <div 
        className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-blush-600/10 blur-[120px]" 
      />
      <div 
        className="absolute top-[40%] -right-[15%] w-[55vw] h-[55vw] rounded-full bg-midnight-700/20 blur-[130px]" 
      />
      <div 
        className="absolute -bottom-[15%] left-[20%] w-[70vw] h-[70vw] rounded-full bg-gold-400/5 blur-[140px]" 
      />

      {/* Floating Sparkles & Dust Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-rose-200"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            boxShadow: '0 0 10px rgba(254, 205, 211, 0.8), 0 0 20px rgba(251, 191, 36, 0.5)'
          }}
          animate={{
            y: ['0vh', '-100vh'],
            opacity: [0, p.opacity, p.opacity, 0],
            scale: [0.8, 1.2, 0.9, 0.5],
            x: [`${p.x}%`, `${p.x + (Math.random() * 6 - 3)}%`]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Subtle Noise / Grain Overlay */}
      <div className="absolute inset-0 bg-radial-vignette opacity-80" />
    </div>
  );
}

