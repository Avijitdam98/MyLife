import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, MessageCircle, Share2, Sparkles } from 'lucide-react';
import { CONFIG } from '../config';

export function LightboxModal({ isOpen, photo, onClose, caption, date }) {
  const [liked, setLiked] = useState(true);
  const [likeCount, setLikeCount] = useState(1842);

  if (!isOpen || !photo) return null;

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal content */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative max-w-lg w-full glass-panel rounded-2xl overflow-hidden border border-blush-400/30 z-10 shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10 bg-midnight-900/60">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full ring-2 ring-blush-400 p-0.5 overflow-hidden">
                <img 
                  src={photo} 
                  alt="Avatar" 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-100 flex items-center gap-1.5">
                  {CONFIG.herInstagram}
                  <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                </p>
                <p className="text-xs text-slate-400">{date || "Special Memory"}</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Photo */}
          <div className="relative bg-black aspect-square overflow-hidden flex items-center justify-center">
            <img
              src={photo}
              alt="Memory"
              className="w-full h-full object-cover select-none"
            />
          </div>

          {/* Interactions */}
          <div className="p-4 space-y-3 bg-midnight-900/80">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={handleLike}
                  className="group flex items-center gap-1.5 focus:outline-none"
                >
                  <motion.div whileTap={{ scale: 1.3 }}>
                    <Heart
                      className={`w-6 h-6 transition-colors ${
                        liked ? "text-blush-500 fill-blush-500" : "text-slate-300"
                      }`}
                    />
                  </motion.div>
                </button>
                <MessageCircle className="w-6 h-6 text-slate-300 cursor-pointer hover:text-blush-300 transition-colors" />
                <Share2 className="w-5 h-5 text-slate-300 cursor-pointer hover:text-blush-300 transition-colors" />
              </div>
              <span className="text-xs text-gold-300 font-medium">Favorite Moment ✨</span>
            </div>

            <p className="text-xs font-semibold text-slate-200">
              Liked by <span className="text-blush-300">{CONFIG.myName}</span> and {likeCount.toLocaleString()} others
            </p>

            <p className="text-sm text-slate-300 leading-relaxed">
              <span className="font-semibold text-white mr-2">{CONFIG.herInstagram}</span>
              {caption || `Every memory with you is etched forever in my heart. You make this life so wonderfully magical. 💖`}
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

