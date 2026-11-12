import { useMemo } from 'react';

/**
 * Hook to automatically load photos from `src/assets/photos/` using Vite's eager glob.
 * If no photos are found (e.g. before the user uploads their own), a curated set
 * of aesthetic high-resolution photos is provided as a fallback so the preview looks stunning right away.
 */
export function usePhotos() {
  const photoModules = import.meta.glob('/src/assets/photos/*.{jpg,jpeg,png,webp}', { eager: true });

  const { photos, hasUserPhotos } = useMemo(() => {
    const loadedPaths = Object.values(photoModules).map((mod) => {
      // In Vite, eager import returns { default: '/path/to/asset.jpg' }
      return typeof mod === 'string' ? mod : mod?.default || '';
    }).filter(Boolean);

    if (loadedPaths.length > 0) {
      return {
        photos: loadedPaths,
        hasUserPhotos: true
      };
    }

    // Curated high-res romantic aesthetic portraits & golden hour memories (fallback)
    const fallbackPhotos = [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1479936343636-73cdc5aae0c3?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1496449903678-68ddcb189a24?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1485290334079-a57c9c0ce621?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?auto=format&fit=crop&w=1000&q=85"
    ];

    return {
      photos: fallbackPhotos,
      hasUserPhotos: false
    };
  }, [photoModules]);

  // Helper to safely get photo by index with infinite wrap-around
  const getPhoto = (index) => {
    if (!photos || photos.length === 0) return '';
    return photos[index % photos.length];
  };

  return {
    photos,
    totalPhotos: photos.length,
    hasUserPhotos,
    getPhoto
  };
}

