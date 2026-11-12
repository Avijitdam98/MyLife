import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function CursorSparkleTrail() {
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    let lastTime = 0;

    const addSparkle = (clientX, clientY) => {
      const now = Date.now();
      if (now - lastTime < 50) return; // Throttle to 20fps for performance
      lastTime = now;

      const newSparkle = {
        id: Math.random(),
        x: clientX,
        y: clientY,
        size: Math.random() * 8 + 6,
        color: Math.random() > 0.5 ? '#fb7185' : '#fbbf24'
      };

      setSparkles((prev) => [...prev.slice(-18), newSparkle]);

      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => s.id !== newSparkle.id));
      }, 700);
    };

    const handlePointerMove = (e) => {
      addSparkle(e.clientX, e.clientY);
    };

    const handleTouchMove = (e) => {
      if (e.touches[0]) {
        addSparkle(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {sparkles.map((s) => (
        <motion.div
          key={s.id}
          initial={{ opacity: 1, scale: 0.6 }}
          animate={{ opacity: 0, scale: 1.5, y: -12 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="absolute rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2"
          style={{
            left: s.x,
            top: s.y,
            width: s.size,
            height: s.size,
            backgroundColor: s.color,
            boxShadow: `0 0 10px ${s.color}, 0 0 20px ${s.color}`
          }}
        />
      ))}
    </div>
  );
}

