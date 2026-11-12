import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Crown } from 'lucide-react';
import { CONFIG } from '../config';

export function ProposalFinale({
  photos,
  playHeartbeat,
  playCelebration,
  heartbeatBuzz,
  celebrationBuzz
}) {
  const [hasStartedTyping, setHasStartedTyping] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [showButtons, setShowButtons] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [screenShake, setScreenShake] = useState(false);
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });

  const sectionRef = useRef(null);
  const fullText = CONFIG.proposal.fullQuestion;

  // Track finger or cursor spotlight
  const handlePointerMove = (e) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setSpotlightPos({ x, y });
  };

  const handleTouchMove = (e) => {
    if (!sectionRef.current || !e.touches[0]) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = ((e.touches[0].clientX - rect.left) / rect.width) * 100;
    const y = ((e.touches[0].clientY - rect.top) / rect.height) * 100;
    setSpotlightPos({ x, y });
  };

  // Heartbeat sound loop while in proposal view
  useEffect(() => {
    if (!hasStartedTyping || isAccepted) return;
    const heartbeatInterval = setInterval(() => {
      playHeartbeat();
      heartbeatBuzz();
    }, 1800);
    return () => clearInterval(heartbeatInterval);
  }, [hasStartedTyping, isAccepted, playHeartbeat, heartbeatBuzz]);

  // Typewriter effect when section scrolls into view
  useEffect(() => {
    if (!hasStartedTyping) return;

    let charIndex = 0;
    const interval = setInterval(() => {
      if (charIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => setShowButtons(true), 400);
      }
    }, 70);

    return () => clearInterval(interval);
  }, [hasStartedTyping, fullText]);

  // Trigger grand fireworks and confetti celebration
  const launchFireworks = () => {
    // 1. Center burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    // 2. Left and Right continuous cannons
    const duration = 4.5 * 1000;
    const animationEnd = Date.now() + duration;
    const colors = ['#f43f5e', '#fb7185', '#fbbf24', '#f59e0b', '#ffffff', '#e11d48'];

    const frame = () => {
      confetti({
        particleCount: 6,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 6,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < animationEnd) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  // User clicked "Yes" or "Of course yes"
  const handleProposalAccept = () => {
    setIsAccepted(true);
    setScreenShake(true);
    setTimeout(() => setScreenShake(false), 800);

    playCelebration();
    celebrationBuzz();
    launchFireworks();
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handlePointerMove}
      onTouchMove={handleTouchMove}
      className={`relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-20 select-none overflow-hidden transition-all duration-700 ${screenShake ? 'glitch-active' : ''
        }`}
    >
      {/* ─── DYNAMIC SPOTLIGHT FOLLOWING CURSOR OR FINGER ─── */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-150 ease-out z-0"
        style={{
          background: `radial-gradient(circle 380px at ${spotlightPos.x}% ${spotlightPos.y}%, rgba(244,63,94,0.18) 0%, rgba(6,3,12,0.92) 80%, #06030c 100%)`
        }}
      />

      {/* Floating Sparkles in the dark */}
      <div className="absolute inset-0 bg-radial-vignette opacity-90 pointer-events-none" />

      {/* ─── BEFORE ACCEPTING: THE PROPOSAL QUESTION ─── */}
      {!isAccepted ? (
        <motion.div
          onViewportEnter={() => setHasStartedTyping(true)}
          viewport={{ once: true, amount: 0.5 }}
          className="relative z-10 max-w-2xl mx-auto text-center space-y-8"
        >
          {/* Glowing Ring Icon */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            className="inline-flex p-4 rounded-full bg-blush-500/20 border border-blush-400/40 text-blush-300 shadow-[0_0_40px_rgba(244,63,94,0.5)]"
          >
            <motion.div
              animate={{ rotate: [0, 8, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            >
              <Crown className="w-10 h-10 text-gold-400" />
            </motion.div>
          </motion.div>

          {/* Typing Question */}
          <div className="min-h-[140px] flex items-center justify-center">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-white text-glow-pink tracking-tight leading-tight">
              {displayedText}
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-1.5 h-10 sm:h-14 bg-blush-400 ml-2 translate-y-1"
              />
            </h1>
          </div>

          <p className="text-sm sm:text-base text-slate-400 max-w-md mx-auto">
            From May 29th until the end of time, Avijit chooses Aunkita.
          </p>

          {/* Proposal Buttons: Only Yes & Of course yes */}
          {showButtons && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-4"
            >
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleProposalAccept}
                className="w-full sm:w-auto px-10 py-5 rounded-full bg-gradient-to-r from-blush-500 via-rose-500 to-pink-600 text-white font-serif text-xl sm:text-2xl font-bold shadow-[0_0_35px_rgba(244,63,94,0.6)] hover:shadow-[0_0_55px_rgba(244,63,94,0.9)] transition-all flex items-center justify-center gap-3 border border-white/20"
              >
                <span>{CONFIG.proposal.yesOption}</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleProposalAccept}
                className="w-full sm:w-auto px-10 py-5 rounded-full glass-gold text-amber-200 font-serif text-xl sm:text-2xl font-bold shadow-[0_0_35px_rgba(251,191,36,0.4)] hover:shadow-[0_0_55px_rgba(251,191,36,0.8)] transition-all flex items-center justify-center gap-3 border border-gold-400/50"
              >
                <span>{CONFIG.proposal.ofCourseOption}</span>
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      ) : (
        /* ─── AFTER ACCEPTING: FINALE SCREEN WITH PHOTO MOSAIC ─── */
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center"
        >
          {/* Background Photo Mosaic Wall */}
          <div className="absolute -inset-10 grid grid-cols-4 sm:grid-cols-6 gap-2 opacity-35 blur-[1px] pointer-events-none overflow-hidden rounded-3xl">
            {(photos.filter(p => !p.includes('avatar')).length > 0 ? photos.filter(p => !p.includes('avatar')) : photos).slice(0, 24).map((url, i) => (
              <img
                key={i}
                src={url}
                alt="Mosaic"
                className="w-full h-full object-cover rounded-lg"
              />
            ))}
          </div>

          {/* Floating Gold & Glass Card */}
          <div className="relative z-20 glass-gold rounded-3xl p-8 sm:p-14 border border-gold-400/50 shadow-[0_20px_70px_rgba(0,0,0,0.8)] backdrop-blur-2xl max-w-2xl mx-auto">
            {/* Top Sparkles & Rings */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-400/20 border border-gold-400/40 text-gold-200 text-xs font-semibold mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{CONFIG.proposal.dateBadge}</span>
              <Sparkles className="w-3.5 h-3.5" />
            </div>

            {/* Success Heading */}
            <motion.h1
              initial={{ scale: 0.8 }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="text-4xl sm:text-6xl md:text-7xl font-serif text-white text-glow-gold font-bold mb-4"
            >
              {CONFIG.proposal.successHeading}
            </motion.h1>

            {/* Heartbeat pulse */}
            <div className="my-6 flex justify-center">
              <motion.div
                animate={{ scale: [1, 1.25, 1] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
                className="p-4 rounded-full bg-blush-500/30 border border-blush-400/40 text-blush-400 shadow-[0_0_30px_rgba(244,63,94,0.6)]"
              >
                <Heart className="w-12 h-12 fill-blush-500 text-blush-400" />
              </motion.div>
            </div>

            {/* Message */}
            <p className="text-base sm:text-xl text-slate-100 font-sans leading-relaxed mb-8">
              {CONFIG.proposal.successMessage}
            </p>

            {/* Launch more fireworks button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={launchFireworks}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-gold-400 to-amber-500 text-neutral-950 font-bold text-sm tracking-wide shadow-lg hover:shadow-gold-400/40 transition-all flex items-center gap-2 mx-auto"
            >
              <Sparkles className="w-4 h-4 fill-neutral-950" />
              <span>Celebrate Forever 🎉</span>
            </motion.button>
          </div>
        </motion.div>
      )}
    </section>
  );
}

