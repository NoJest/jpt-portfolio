'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface PreloaderProps {
  images: string[];
}

export default function Preloader({ images }: PreloaderProps) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (images.length === 0) {
      setLoaded(true);
      return;
    }

    const promises = images.map(src => {
      return new Promise<void>((resolve) => {
        const img = document.createElement('img');
        img.src = src;
        img.onload = () => resolve();
        img.onerror = () => resolve();
      });
    });

    Promise.all(promises).then(() => {
      setLoaded(true);
    });
  }, [images]);

  if (!loaded) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
        <div className="animate-pulse text-primary">
          Loading projects...
        </div>
      </div>
    );
  }

  return null;
}