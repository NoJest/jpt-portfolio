'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function TrackPageView() {
  const pathname = usePathname();

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      fetch('/api/track-view', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }, [pathname]);

  return null;
}