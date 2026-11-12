import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { CONFIG } from '../../config';

export function PhotoExplosion({ 
  photos, 
  onComplete, 
  playBassDrop, 
  bassDropBuzz 
}) {
  const [phase, setPhase] = useState('flash'); // 'flash' -> 'exploding' -> 'heart'
  const [screenFlash, setScreenFlash] = useState(true);

  // Take up to 36 photos for the heart mosaic formation
  const displayPhotos = useMemo(() => {
    if (!photos || photos.length === 0) return [];
    const list = [];
    for (let i = 0; i < 36; i++) {
      list.push({
        id: i,
        url: photos[i % photos.length],
        // Random explosion trajectory in 3D space
        burstX: (Math.random() - 0.5) * (window.innerWidth < 640 ? 600 : 1200),
        burstY: (Math.random() - 0.5) * (window.innerHeight < 640 ? 700 : 1000),
        burstRotZ: (Math.random() - 0.5) * 120,
        burstRotY: (Math.random() - 0.5) * 180,
        burstScale: Math.random() * 0.5 + 0.8,
      });
    }
    return list;
  }, [photos]);

  // Compute heart shape target coordinates (parametric heart curve)
  const heartCoordinates = useMemo(() => {
    const coords = [];
    const count = 30; // 30 points on the outer heart perimeter
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    const scale = isMobile ? 8.5 : 15;

    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 2;
      // Parametric equations for a heart curve
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
      coords.push({
        x: x * scale,
        y: y * scale,
        rot: (Math.random() - 0.5) * 12
      });
    }

    // Add 6 photos to fill the center of the heart
    const innerCoords = [
      { x: 0, y: -scale * 2, rot: -5 },
      { x: -scale * 4, y: scale * 1.5, rot: 4 },
      { x: scale * 4, y: scale * 1.5, rot: -4 },
      { x: 0, y: scale * 4, rot: 2 },
      { x: -scale * 2.5, y: -scale * 1, rot: 6 },
      { x: scale * 2.5, y: -scale * 1, rot: -6 }
    ];

    return [...coords, ...innerCoords];
  }, []);

  useEffect(() => {
    // 1. Bass drop sound and vibration right on impact
    playBassDrop();
    bassDropBuzz();

    // 2. Remove flash quickly
    const flashTimer = setTimeout(() => {
      setScreenFlash(false);
      setPhase('exploding');
    }, 120);

    // 3. Transition from wild explosion into settled Heart Shape
    const heartTimer = setTimeout(() => {
      setPhase('heart');
    }, 1400);

    // 4. Automatically proceed to RevealScreen after appreciating the heart
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 5800);

    return () => {
      clearTimeout(flashTimer);
      clearTimeout(heartTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete, playBassDrop, bassDropBuzz]);

  return (
    <div className="relative min-h-screen w-full bg-midnight-950 flex items-center justify-center overflow-hidden select-none">
      {/* Screen Flash on the beat */}
      {screenFlash && (
        <div className="fixed inset-0 bg-white z-50 pointer-events-none animate-pulse" />
      )}

      {/* Deep Romantic Ambient Glow in the Center */}
      <motion.div
        animate={{
          scale: phase === 'heart' ? [1, 1.15, 1] : 1,
          opacity: phase === 'heart' ? [0.4, 0.7, 0.4] : 0.2
        }}
        transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
        className="absolute w-[360px] h-[360px] sm:w-[500px] sm:h-[500px] rounded-full bg-gradient-to-r from-blush-500/30 via-rose-600/30 to-gold-400/20 blur-[100px] pointer-events-none"
      />

      {/* Floating Sparkles & Heart Icon in center */}
      {phase === 'heart' && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute z-10 flex flex-col items-center pointer-events-none text-center"
        >
          <motion.div
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
            className="p-3 sm:p-4 rounded-full bg-blush-500/20 backdrop-blur-md border border-blush-300/40 shadow-[0_0_30px_rgba(244,63,94,0.6)]"
          >
            <Heart className="w-8 h-8 sm:w-12 sm:h-12 text-blush-400 fill-blush-500" />
          </motion.div>
          <span className="text-xs sm:text-sm font-medium text-blush-200 mt-2 tracking-widest uppercase bg-black/60 px-3 py-1 rounded-full backdrop-blur-sm border border-blush-400/20">
            {CONFIG.herName}
          </span>
        </motion.div>
      )}

      {/* Photos Bursting & Settling */}
      <div className="relative w-full h-full flex items-center justify-center perspective-1000">
        {displayPhotos.map((item, idx) => {
          const heartPos = heartCoordinates[idx] || { x: 0, y: 0, rot: 0 };

          return (
            <motion.div
              key={item.id}
              initial={{
                x: 0,
                y: 0,
                scale: 0.1,
                rotateZ: 0,
                rotateY: 0,
                opacity: 0
              }}
              animate={
                phase === 'exploding'
                  ? {
                      x: item.burstX,
                      y: item.burstY,
                      scale: item.burstScale,
                      rotateZ: item.burstRotZ,
                      rotateY: item.burstRotY,
                      opacity: 1
                    }
                  : phase === 'heart'
                  ? {
                      x: heartPos.x,
                      y: heartPos.y,
                      scale: window.innerWidth < 640 ? 0.48 : 0.62,
                      rotateZ: heartPos.rot,
                      rotateY: 0,
                      opacity: 1
                    }
                  : { opacity: 0 }
              }
              transition={{
                duration: phase === 'exploding' ? 0.8 : 1.6,
                type: "spring",
                stiffness: phase === 'exploding' ? 200 : 70,
                damping: phase === 'exploding' ? 12 : 16
              }}
              className="absolute w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden shadow-2xl border-2 border-white/60 bg-midnight-900 pointer-events-none"
              style={{
                boxShadow: phase === 'heart' ? '0 4px 20px rgba(244,63,94,0.4)' : '0 10px 30px rgba(0,0,0,0.8)'
              }}
            >
              <img
                src={item.url}
                alt="Memory frame"
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </motion.div>
          );
        })}
      </div>

      {/* Skip / Continue button in bottom corner */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        onClick={onComplete}
        className="absolute bottom-6 z-40 px-5 py-2.5 rounded-full glass-panel border border-blush-400/40 text-xs text-blush-200 font-medium hover:text-white hover:border-blush-300 transition-all flex items-center gap-2 shadow-lg"
      >
        <Sparkles className="w-3.5 h-3.5 text-gold-400" />
        Continue
      </motion.button>
    </div>
  );
}

