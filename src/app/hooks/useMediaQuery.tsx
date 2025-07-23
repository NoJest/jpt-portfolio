
import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    // Only run on client-side
    if (typeof window !== 'undefined') {
      const media = window.matchMedia(query);
      
      // Update state with current match
      const updateMatches = () => setMatches(media.matches);
      updateMatches(); // Initialize

      // Modern event listener
      media.addEventListener('change', updateMatches);

      // Clean up
      return () => {
        media.removeEventListener('change', updateMatches);
      };
    }
  }, [query]);

  return matches;
}