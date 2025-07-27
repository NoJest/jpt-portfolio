'use client';
import { useEffect, useState } from 'react';

export default function ViewCounter({ path }: { path: string }) {
  const [views, setViews] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const normalizedPath = path === '/' ? '/' : path.replace(/\/+$/, '');
  useEffect(() => {
    const fetchViews = async () => {
      try {
        const res = await fetch(`/api/view-count?path=${encodeURIComponent(normalizedPath)}`);
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setViews(data.count);
      } catch (err) {
        console.error('View counter error:', err);
        setError('Could not load view count');
        setViews(0); // Fallback to 0
      }
    };

    fetchViews();
  }, [path]);
  
  if (views === null || views === 0) {
    return null;
  }

  if (error) {
    return <span className="text-sm text-muted-foreground">View count unavailable</span>;
  }

  return (
    <span className="text-sm text-muted-foreground">
      {views !== null ? `Welcome visitor number ${views.toLocaleString()}` : 'Loading views...'}
    </span>
  );
}