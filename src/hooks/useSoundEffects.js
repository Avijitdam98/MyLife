import { useRef, useCallback, useState, useEffect } from 'react';
import { CONFIG } from '../config';
import romanticSongUrl from '../assets/audio/romantic_song.mp3';

/**
 * Procedural Web Audio API sound effects and MP3 soundtrack engine.
 * Plays the romantic song 'Pachelbel's Canon in D' with smooth fallback to
 * generative procedural piano synthesis if needed.
 */
export function useSoundEffects() {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const audioCtxRef = useRef(null);
  const ambientIntervalRef = useRef(null);
  const customAudioRef = useRef(null);

  // Initialize AudioContext safely on first interaction
  const getAudioContext = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  // 1. Glitch static sound
  const playGlitchSound = useCallback(() => {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const bufferSize = ctx.sampleRate * 0.25;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * (Math.random() > 0.4 ? 0.35 : 0.05);
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(2400, ctx.currentTime);
      filter.Q.setValueAtTime(3, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.4, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.24);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
    } catch (e) {
      console.warn("Audio play error", e);
    }
  }, [getAudioContext, isMuted]);

  // 2. Cinematic Bass Drop
  const playBassDrop = useCallback(() => {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(180, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(38, ctx.currentTime + 1.2);

      gain.gain.setValueAtTime(0.8, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 1.45);
    } catch (e) {
      console.warn(e);
    }
  }, [getAudioContext, isMuted]);

  // 3. Heartbeat (lub-dub)
  const playHeartbeat = useCallback(() => {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const playThud = (delay, freq, duration) => {
      setTimeout(() => {
        try {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + duration);

          gain.gain.setValueAtTime(0.6, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + duration);
        } catch (e) {}
      }, delay);
    };

    playThud(0, 75, 0.18);
    playThud(180, 60, 0.24);
  }, [getAudioContext, isMuted]);

  // 4. Sparkling Bell Chime
  const playChime = useCallback(() => {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const freqs = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    freqs.forEach((freq, idx) => {
      setTimeout(() => {
        try {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          gain.gain.setValueAtTime(0.25, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.9);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.95);
        } catch (e) {}
      }, idx * 70);
    });
  }, [getAudioContext, isMuted]);

  // 5. Celebration Fanfare + Fireworks Sound
  const playCelebration = useCallback(() => {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const notes = [
      { f: 440, t: 0 },
      { f: 554.37, t: 0.12 },
      { f: 659.25, t: 0.24 },
      { f: 880, t: 0.38 },
      { f: 1108.73, t: 0.6 }
    ];

    notes.forEach((note) => {
      setTimeout(() => {
        try {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(note.f, ctx.currentTime);

          gain.gain.setValueAtTime(0.4, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 1.25);
        } catch (e) {}
      }, note.t * 1000);
    });
  }, [getAudioContext, isMuted]);

  // 6. Subtle UI Tap Sound
  const playTap = useCallback(() => {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch (e) {}
  }, [getAudioContext, isMuted]);

  // 7. Start Romantic Background Music
  const startAmbientMusic = useCallback(() => {
    if (isPlayingMusic) return;
    setIsPlayingMusic(true);

    try {
      // First try playing the authentic romantic MP3 song
      if (!customAudioRef.current) {
        customAudioRef.current = new Audio(romanticSongUrl);
        customAudioRef.current.loop = true;
        customAudioRef.current.volume = 0.75;
      }
      customAudioRef.current.play().then(() => {
        // Playing MP3 successfully
      }).catch((err) => {
        console.log("Audio file play fallback to synth chords:", err);
        // Fallback to procedural romantic ambient synth chords
        startProceduralSynth();
      });
    } catch (e) {
      startProceduralSynth();
    }
  }, [isPlayingMusic]);

  // Procedural synthesizer fallback
  const startProceduralSynth = () => {
    const ctx = getAudioContext();
    if (!ctx) return;

    const chords = [
      [174.61, 261.63, 329.63, 349.23, 440.00], // Fmaj9
      [146.83, 220.00, 261.63, 329.63, 440.00], // Dm9
      [116.54, 233.08, 293.66, 349.23, 440.00], // Bbmaj7
      [130.81, 196.00, 261.63, 349.23, 392.00]  // Csus4
    ];

    let chordIdx = 0;

    const playChord = () => {
      if (isMuted) return;
      const currentChord = chords[chordIdx % chords.length];
      chordIdx++;

      currentChord.forEach((freq, i) => {
        try {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const filter = ctx.createBiquadFilter();

          osc.type = i === 0 ? 'sine' : 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(900, ctx.currentTime);

          gain.gain.setValueAtTime(0.001, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.045, ctx.currentTime + 1.2);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 4.8);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);

          osc.start();
          osc.stop(ctx.currentTime + 5.0);
        } catch (e) {}
      });
    };

    playChord();
    ambientIntervalRef.current = setInterval(playChord, 4200);
  };

  const stopAmbientMusic = useCallback(() => {
    setIsPlayingMusic(false);
    if (ambientIntervalRef.current) {
      clearInterval(ambientIntervalRef.current);
      ambientIntervalRef.current = null;
    }
    if (customAudioRef.current) {
      customAudioRef.current.pause();
    }
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      if (customAudioRef.current) {
        customAudioRef.current.muted = next;
      }
      return next;
    });
  }, []);

  useEffect(() => {
    return () => {
      if (ambientIntervalRef.current) {
        clearInterval(ambientIntervalRef.current);
      }
      if (customAudioRef.current) {
        customAudioRef.current.pause();
      }
    };
  }, []);

  return {
    isMuted,
    isPlayingMusic,
    toggleMute,
    startAmbientMusic,
    stopAmbientMusic,
    playGlitchSound,
    playBassDrop,
    playHeartbeat,
    playChime,
    playCelebration,
    playTap
  };
}
