import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  MessageCircle, 
  Bookmark, 
  Grid, 
  Sparkles, 
  CheckCircle2, 
  Send,
  MoreHorizontal
} from 'lucide-react';
import { CONFIG } from '../config';

export function InstagramMock({ photos, onPhotoClick }) {
  const [activeCommentIdx, setActiveCommentIdx] = useState(0);
  const comments = CONFIG.instagramProfile.commentsFromMe;

  // Cycle through boyfriend's sweet comments
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCommentIdx((prev) => (prev + 1) % comments.length);
    }, 3800);
    return () => clearInterval(interval);
  }, [comments.length]);

  // First 9 gallery photos for the 3x3 grid (excluding avatar icon)
  const galleryPhotos = photos.filter(p => !p.includes('avatar'));
  const gridPhotos = (galleryPhotos.length > 0 ? galleryPhotos : photos).slice(0, 9);

  return (
    <section className="relative py-20 px-4 flex flex-col items-center justify-center">
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12 max-w-lg"
      >
        <span className="text-xs font-semibold tracking-widest uppercase text-blush-400 bg-blush-500/10 px-3.5 py-1.5 rounded-full border border-blush-400/20">
          Digital Love Story
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif text-white mt-3">
          The Muse of My Feed
        </h2>
        <p className="text-sm text-slate-400 mt-2">
          Every picture of you looks like art, but the best moments are the ones behind the lens.
        </p>
      </motion.div>

      {/* Phone Frame Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative w-full max-w-[410px] rounded-[44px] p-3.5 sm:p-4 bg-gradient-to-b from-neutral-800 via-neutral-900 to-black border-4 border-neutral-700/60 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(244,63,94,0.15)]"
      >
        {/* Dynamic Island / Notch */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-30 flex items-center justify-end px-3">
          <div className="w-2.5 h-2.5 rounded-full bg-neutral-900 ring-1 ring-neutral-800" />
        </div>

        {/* Screen Bezel Inside */}
        <div className="relative w-full rounded-[34px] overflow-hidden bg-black text-white pt-8 pb-4">
          
          {/* Top IG Header */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-neutral-800">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm tracking-tight text-white">
                {CONFIG.herInstagram}
              </span>
              <CheckCircle2 className="w-4 h-4 text-sky-400 fill-sky-400" />
            </div>
            <MoreHorizontal className="w-5 h-5 text-neutral-400" />
          </div>

          {/* Profile Bio & Stats */}
          <div className="px-5 pt-4">
            <div className="flex items-center justify-between gap-4">
              {/* Profile Avatar with glowing story ring */}
              <div className="relative p-1 rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 animate-pulse-slow">
                <div className="w-16 h-16 rounded-full overflow-hidden p-0.5 bg-black">
                  <img
                    src={photos.find(p => p.includes('avatar')) || photos[0]}
                    alt={CONFIG.herName}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>

              {/* Stats: Posts, Followers, Following */}
              <div className="flex items-center justify-around flex-1 text-center">
                <div>
                  <div className="font-bold text-sm sm:text-base text-white">
                    {CONFIG.instagramProfile.stats.posts}
                  </div>
                  <div className="text-[11px] text-neutral-400">posts</div>
                </div>
                <div>
                  <div className="font-bold text-sm sm:text-base text-white">
                    {CONFIG.instagramProfile.stats.followers}
                  </div>
                  <div className="text-[11px] text-neutral-400">followers</div>
                </div>
                <div>
                  <div className="font-bold text-sm sm:text-base text-white">
                    {CONFIG.instagramProfile.stats.following}
                  </div>
                  <div className="text-[11px] text-neutral-400">following</div>
                </div>
              </div>
            </div>

            {/* Bio text */}
            <div className="mt-3 text-xs leading-relaxed">
              <p className="font-semibold text-white">{CONFIG.herName} ✨</p>
              <p className="text-neutral-300 mt-0.5">{CONFIG.instagramProfile.bio}</p>
              <p className="text-blush-400 text-[11px] font-medium mt-1">
                {CONFIG.instagramProfile.linkText}
              </p>
            </div>

            {/* Follow / Message Buttons */}
            <div className="flex gap-2 mt-4 text-xs font-semibold">
              <button className="flex-1 py-1.5 rounded-lg bg-blush-500 text-white flex items-center justify-center gap-1.5 hover:bg-blush-600 transition-colors">
                <Heart className="w-3.5 h-3.5 fill-current" />
                <span>Following</span>
              </button>
              <button className="flex-1 py-1.5 rounded-lg bg-neutral-800 text-white hover:bg-neutral-700 transition-colors">
                Message
              </button>
            </div>

            {/* Story Highlights Circles */}
            <div className="flex items-center gap-3.5 mt-5 overflow-x-auto no-scrollbar pb-1">
              {CONFIG.instagramProfile.stories.map((story) => (
                <div key={story.id} className="flex flex-col items-center flex-shrink-0 cursor-pointer">
                  <div className="w-13 h-13 rounded-full p-[2px] bg-gradient-to-tr from-gold-400 to-blush-500">
                    <div className="w-12 h-12 rounded-full bg-neutral-900 flex items-center justify-center text-lg">
                      {story.emoji}
                    </div>
                  </div>
                  <span className="text-[10px] text-neutral-400 mt-1">{story.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Grid Tab Navigation */}
          <div className="mt-4 border-t border-neutral-800 flex justify-around text-neutral-400">
            <div className="py-2.5 border-b-2 border-white text-white flex justify-center flex-1">
              <Grid className="w-4 h-4" />
            </div>
            <div className="py-2.5 flex justify-center flex-1 hover:text-white transition-colors">
              <Bookmark className="w-4 h-4" />
            </div>
          </div>

          {/* 3x3 Photo Grid */}
          <div className="grid grid-cols-3 gap-0.5 bg-neutral-900">
            {gridPhotos.map((photoUrl, idx) => (
              <motion.div
                key={idx}
                whileHover={{ opacity: 0.9 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onPhotoClick(photoUrl, `Captured moment #${idx + 1} with my favorite person.`)}
                className="relative aspect-square cursor-pointer group overflow-hidden bg-neutral-950"
              >
                <img
                  src={photoUrl}
                  alt={`Instagram photo ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Hover overlay with heart */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-bold">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 fill-white" />
                    942
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Animated Boyfriend Comment Drawer / Notification */}
          <div className="p-3 mx-3 mt-4 rounded-xl glass-panel border border-blush-400/25 relative overflow-hidden">
            <div className="flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blush-500 to-gold-400 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-sm">
                {CONFIG.myName.charAt(0)}
              </div>
              <div className="flex-1 min-h-[44px]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blush-300">
                    {CONFIG.myName.toLowerCase()}_always
                  </span>
                  <span className="text-[10px] text-neutral-500">
                    {comments[activeCommentIdx].time}
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.p
                    key={activeCommentIdx}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.35 }}
                    className="text-xs text-white mt-0.5 leading-snug font-medium"
                  >
                    {comments[activeCommentIdx].text}
                  </motion.p>
                </AnimatePresence>
              </div>

              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
              >
                <Heart className="w-4 h-4 text-blush-500 fill-blush-500" />
              </motion.div>
            </div>
          </div>

        </div>
      </motion.div>
    </section>
  );
}

