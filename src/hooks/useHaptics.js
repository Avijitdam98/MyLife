import { useCallback } from 'react';

/**
 * Hook for rich haptic feedback on mobile devices via navigator.vibrate
 */
export function useHaptics() {
  const triggerHaptic = useCallback((pattern = [40]) => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(pattern);
      } catch (e) {
        // Ignore errors on non-supported environments
      }
    }
  }, []);

  // Preset patterns
  const lightTap = useCallback(() => triggerHaptic([35]), [triggerHaptic]);
  const notificationBuzz = useCallback(() => triggerHaptic([80, 60, 100]), [triggerHaptic]);
  const glitchBuzz = useCallback(() => triggerHaptic([40, 20, 70, 30, 120]), [triggerHaptic]);
  const bassDropBuzz = useCallback(() => triggerHaptic([180, 50, 240]), [triggerHaptic]);
  const heartbeatBuzz = useCallback(() => triggerHaptic([80, 110, 140]), [triggerHaptic]);
  const celebrationBuzz = useCallback(() => triggerHaptic([120, 60, 150, 60, 250, 80, 400]), [triggerHaptic]);

  return {
    triggerHaptic,
    lightTap,
    notificationBuzz,
    glitchBuzz,
    bassDropBuzz,
    heartbeatBuzz,
    celebrationBuzz
  };
}

