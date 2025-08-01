'use client '
import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    
    const updateMatches = () => {
      setMatches(media.matches);
    };
    
    // Initial check
    updateMatches();
    
    // Add listener
    media.addEventListener('change', updateMatches);
    
    return () => {
      media.removeEventListener('change', updateMatches);
    };
  }, [query]);

  return matches;
}