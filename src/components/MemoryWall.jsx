import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Sparkles, Heart } from 'lucide-react';
import { CONFIG } from '../config';

export function MemoryWall({ photos, onPhotoClick }) {
  // Filter out avatar icon for polaroid frames
  const galleryPhotos = photos.filter(p => !p.includes('avatar'));
  const activePhotos = galleryPhotos.length > 0 ? galleryPhotos : photos;

  // Select a collection of up to 12 polaroids
  const polaroids = activePhotos.slice(0, 12).map((url, idx) => ({
    url,
    rotation: ((idx % 5) - 2) * 2.5, // Subtle realistic random tilts: -5deg to +5deg
    caption: [
      "That gorgeous smile ✨",
      "Golden hour glow 🌅",
      "Cutest moment ever 🥰",
      "Unforgettable laughter 😂",
      "My whole heart 💖",
      "Cozy rainy day ☕",
      "Best adventure partner ✈️",
      "Pure magic ✨",
      "Forever my favorite 🥹",
      "Stealing my hoodies 🧸",
      "Late night conversations 🌙",
      "You, simply you 🌸"
    ][idx % 12],
    date: `Memory #${idx + 1}`
  }));

  return (
    <section className="relative py-24 px-4 sm:px-8 max-w-6xl mx-auto">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-xs font-semibold tracking-widest uppercase text-blush-400 bg-blush-500/10 px-4 py-1.5 rounded-full border border-blush-400/20">
          Scrapbook of Us
        </span>
        <h2 className="text-3xl sm:text-5xl font-serif text-white mt-3">
          The Polaroid Gallery
        </h2>
        <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-md mx-auto">
          Snapshots of ordinary moments that became extraordinary because I was with you.
        </p>
      </motion.div>

      {/* Polaroid Grid with 3D Tilt and Parallax */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
        {polaroids.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: (idx % 3) * 0.15 }}
            whileHover={{ 
              scale: 1.05, 
              rotateZ: 0, 
              y: -8,
              transition: { duration: 0.3 } 
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onPhotoClick(item.url, `${item.caption} — ${CONFIG.herName}`)}
            style={{ rotate: `${item.rotation}deg` }}
            className="cursor-pointer group relative bg-white p-3.5 pb-6 rounded-md shadow-[0_15px_35px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_45px_rgba(244,63,94,0.3)] transition-shadow select-none"
          >
            {/* Washi Tape Strip at top */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-amber-100/70 border-t border-b border-amber-200/60 rotate-[-2deg] backdrop-blur-sm shadow-sm z-10" />

            {/* Photo Container */}
            <div className="relative aspect-square w-full overflow-hidden rounded bg-neutral-900">
              <img
                src={item.url}
                alt={item.caption}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-3">
                <span className="text-xs text-white bg-black/60 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-gold-400" />
                  Tap to expand
                </span>
              </div>
            </div>

            {/* Handwritten Caption & Tag */}
            <div className="mt-4 px-1 flex items-center justify-between">
              <p className="font-handwriting text-xl text-neutral-800 font-bold tracking-wide">
                {item.caption}
              </p>
              <Heart className="w-4 h-4 text-blush-400 group-hover:fill-blush-500 transition-colors" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

