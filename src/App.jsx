import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CONFIG } from './config';
import { usePhotos } from './hooks/usePhotos';
import { useSoundEffects } from './hooks/useSoundEffects';
import { useHaptics } from './hooks/useHaptics';

// Visual Effects & Interactive Widgets
import { BackgroundEffects } from './components/BackgroundEffects';
import { BackgroundMusic } from './components/BackgroundMusic';
import { LightboxModal } from './components/LightboxModal';
import { CursorSparkleTrail } from './components/CursorSparkleTrail';
import { InteractiveLoveMeter } from './components/InteractiveLoveMeter';
import { MedicoSpecialCard } from './components/MedicoSpecialCard';
import { SecretGoldenScratchCard } from './components/SecretGoldenScratchCard';
import { NurseCarePackage } from './components/NurseCarePackage';
import { CoupleBucketList } from './components/CoupleBucketList';

// Shock Sequence Stages
import { LockScreen } from './components/ShockSequence/LockScreen';
import { GlitchTerminal } from './components/ShockSequence/GlitchTerminal';
import { PhotoExplosion } from './components/ShockSequence/PhotoExplosion';
import { RevealScreen } from './components/ShockSequence/RevealScreen';

// Main Website Sections
import { InstagramMock } from './components/InstagramMock';
import { StoryTimeline } from './components/StoryTimeline';
import { MemoryWall } from './components/MemoryWall';
import { ReasonsGrid } from './components/ReasonsGrid';
import { LiveCounter } from './components/LiveCounter';
import { LoveLetter } from './components/LoveLetter';
import { ProposalFinale } from './components/ProposalFinale';

export function App() {
  // Stages: 'lockscreen' -> 'glitch' -> 'explosion' -> 'reveal' -> 'main'
  const [stage, setStage] = useState('lockscreen');

  // Photo & Asset hooks
  const { photos, hasUserPhotos, totalPhotos } = usePhotos();

  // Audio & Haptic hooks
  const {
    isMuted,
    isPlayingMusic,
    toggleMute,
    startAmbientMusic,
    playGlitchSound,
    playBassDrop,
    playHeartbeat,
    playChime,
    playCelebration,
    playTap
  } = useSoundEffects();

  const {
    lightTap,
    notificationBuzz,
    glitchBuzz,
    bassDropBuzz,
    heartbeatBuzz,
    celebrationBuzz
  } = useHaptics();

  // Lightbox Modal State
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [photoCaption, setPhotoCaption] = useState('');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const openLightbox = (photoUrl, caption = '') => {
    lightTap();
    playTap();
    setSelectedPhoto(photoUrl);
    setPhotoCaption(caption);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    lightTap();
    setIsLightboxOpen(false);
  };

  // 1. User taps fake notification on LockScreen
  const handleLockscreenUnlock = () => {
    notificationBuzz();
    playTap();
    startAmbientMusic(); // Start background music on first user tap
    setStage('glitch');
  };

  // 2. Glitch typing finishes
  const handleGlitchComplete = () => {
    setStage('explosion');
  };

  // 3. Photo explosion & heart mosaic finishes
  const handleExplosionComplete = () => {
    setStage('reveal');
  };

  // 4. User clicks "Unfold Our Story" from Reveal screen
  const handleRevealProceed = () => {
    lightTap();
    playTap();
    setStage('main');
  };

  return (
    <div className="relative min-h-screen bg-midnight-950 text-slate-100 font-sans selection:bg-blush-500 selection:text-white overflow-x-hidden">
      {/* Dynamic Cursor & Touch Sparkle Trail */}
      <CursorSparkleTrail />

      {/* Background ambient light and floating particles */}
      <BackgroundEffects />

      {/* Floating Audio Control (active once past lockscreen) */}
      {stage !== 'lockscreen' && (
        <BackgroundMusic
          isMuted={isMuted}
          isPlayingMusic={isPlayingMusic}
          toggleMute={toggleMute}
          startAmbientMusic={startAmbientMusic}
        />
      )}

      {/* Floating Interactive Love Meter & Heart Shower */}
      {stage === 'main' && (
        <InteractiveLoveMeter
          playTap={playTap}
          lightTap={lightTap}
        />
      )}

      {/* Lightbox for zooming photos & reading memory captions */}
      <LightboxModal
        isOpen={isLightboxOpen}
        photo={selectedPhoto}
        caption={photoCaption}
        onClose={closeLightbox}
      />

      {/* Multi-Stage Cinematic Progression */}
      <AnimatePresence mode="wait">
        {stage === 'lockscreen' && (
          <motion.div
            key="lockscreen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4 }}
          >
            <LockScreen onUnlock={handleLockscreenUnlock} />
          </motion.div>
        )}

        {stage === 'glitch' && (
          <motion.div
            key="glitch"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <GlitchTerminal
              onComplete={handleGlitchComplete}
              playGlitchSound={playGlitchSound}
              glitchBuzz={glitchBuzz}
            />
          </motion.div>
        )}

        {stage === 'explosion' && (
          <motion.div
            key="explosion"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <PhotoExplosion
              photos={photos}
              onComplete={handleExplosionComplete}
              playBassDrop={playBassDrop}
              bassDropBuzz={bassDropBuzz}
            />
          </motion.div>
        )}

        {stage === 'reveal' && (
          <motion.div
            key="reveal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <RevealScreen
              onProceed={handleRevealProceed}
              playChime={playChime}
            />
          </motion.div>
        )}

        {stage === 'main' && (
          <motion.main
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative z-10 space-y-16 sm:space-y-24 pb-28"
          >
            {/* Top Welcome Title Banner */}
            <header className="pt-24 px-4 text-center max-w-3xl mx-auto">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-widest uppercase text-blush-300 bg-blush-500/10 px-5 py-2 rounded-full border border-blush-400/20"
              >
                <span>For {CONFIG.herName} ({CONFIG.herNickname})</span>
                <span>•</span>
                <span>From {CONFIG.myName}</span>
                <span>•</span>
                <span className="text-gold-300">Since May 29th</span>
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl sm:text-6xl md:text-7xl font-serif text-white mt-6 tracking-tight text-glow-pink"
              >
                A Love Story Written for You
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-base sm:text-lg text-slate-300 mt-4 leading-relaxed font-sans"
              >
                Every smile, every glance, and every memory with you is my treasure. Scroll down to see what Avijit built just for Aunkita.
              </motion.p>
            </header>

            {/* 5. Instagram Profile Mockup */}
            <InstagramMock
              photos={photos}
              onPhotoClick={openLightbox}
            />

            {/* 🩺 Special Caring Nurse & Healthcare Hero Card */}
            <MedicoSpecialCard />

            {/* ☕ Nurse Aunkita's VIP Post-Shift Care Package */}
            <NurseCarePackage 
              playTap={playTap}
              lightTap={lightTap}
            />

            {/* 6. Our Story Timeline (May 29th to Forever) */}
            <StoryTimeline
              photos={photos}
              onPhotoClick={openLightbox}
            />

            {/* 🎁 Interactive Secret Golden Scratch Ticket */}
            <SecretGoldenScratchCard
              playChime={playChime}
              lightTap={lightTap}
            />

            {/* 💍 Avijit & Aunkita's Interactive Bucket List */}
            <CoupleBucketList
              playChime={playChime}
              lightTap={lightTap}
            />

            {/* 7. Memory Wall (3D Polaroids) */}
            <MemoryWall
              photos={photos}
              onPhotoClick={openLightbox}
            />

            {/* 8. Reasons Why Avijit Loves Aunkita (3D Flip Cards) */}
            <ReasonsGrid playTap={playTap} />

            {/* 9. Live Love Counter Since May 29th */}
            <LiveCounter />

            {/* 10. Handwritten Love Letter */}
            <LoveLetter />

            {/* 11. The Proposal Climax & Fireworks */}
            <ProposalFinale
              photos={photos}
              playHeartbeat={playHeartbeat}
              playCelebration={playCelebration}
              heartbeatBuzz={heartbeatBuzz}
              celebrationBuzz={celebrationBuzz}
            />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
