import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Sparkles, Heart } from 'lucide-react';
import { CONFIG } from '../config';

export function StoryTimeline({ photos, onPhotoClick }) {
  const galleryPhotos = photos.filter(p => !p.includes('avatar'));
  const activePhotos = galleryPhotos.length > 0 ? galleryPhotos : photos;
  return (
    <section className="relative py-24 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-20"
      >
        <span className="text-xs font-semibold tracking-widest uppercase text-gold-400 bg-gold-400/10 px-4 py-1.5 rounded-full border border-gold-400/20">
          Our Journey
        </span>
        <h2 className="text-3xl sm:text-5xl font-serif text-white mt-3">
          Every Step Led to You
        </h2>
        <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-lg mx-auto">
          The defining moments that turned two separate stories into one unforgettable romance.
        </p>
      </motion.div>

      {/* Vertical Timeline Central Line */}
      <div className="relative">
        <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-blush-500/80 via-gold-400/80 to-blush-600/80" />

        <div className="space-y-12 sm:space-y-20">
          {CONFIG.timeline.map((item, idx) => {
            const isEven = idx % 2 === 0;
            const photoUrl = activePhotos[idx % activePhotos.length];

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
                className={`relative flex flex-col sm:flex-row items-start ${
                  isEven ? 'sm:flex-row-reverse' : ''
                } gap-6 sm:gap-12 pl-10 sm:pl-0`}
              >
                {/* Center Node / Dot */}
                <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 top-5 z-20">
                  <div className="w-5 h-5 rounded-full bg-midnight-950 border-2 border-gold-400 flex items-center justify-center shadow-[0_0_15px_rgba(251,191,36,0.8)]">
                    <span className="w-2 h-2 rounded-full bg-blush-500" />
                  </div>
                </div>

                {/* Content Card */}
                <div className="w-full sm:w-1/2">
                  <div className="glass-panel rounded-2xl p-5 sm:p-6 border border-white/10 hover:border-blush-400/40 transition-all shadow-xl group">
                    {/* Badge and Date */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blush-500/20 text-blush-300 border border-blush-400/30">
                        {item.badge}
                      </span>
                      <span className="text-xs text-gold-300/90 font-medium flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {item.date}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-serif text-white font-semibold mb-2 group-hover:text-blush-300 transition-colors">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-slate-300 leading-relaxed mb-4">
                      {item.description}
                    </p>

                    {/* Photo preview with tap to expand */}
                    {photoUrl && (
                      <div
                        onClick={() => onPhotoClick(photoUrl, `${item.title} — ${item.date}`)}
                        className="relative h-48 sm:h-56 rounded-xl overflow-hidden cursor-pointer group/photo border border-white/10"
                      >
                        <img
                          src={photoUrl}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover/photo:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover/photo:opacity-80 transition-opacity" />
                        
                        <div className="absolute bottom-3 right-3 flex items-center gap-1 text-[11px] font-medium text-white/90 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                          <Sparkles className="w-3 h-3 text-gold-400" />
                          View Memory
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Blank spacer for other side on desktop */}
                <div className="hidden sm:block sm:w-1/2" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

