'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './PerspectiveGrid.module.css';

export default function PerspectiveGrid() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    // Animation timeline
    const tl = gsap.timeline({ repeat: -1 });
    const duration = 20;
    
    tl.to(gridRef.current, {
      rotationX: 360,
      rotationY: 360,
      duration: duration,
      ease: 'none'
    });

    return () => {
      tl.kill(); // Clean up animation on unmount
    };
  }, []);

  return (
    <div className={styles.gridWrapper} ref={gridRef}>
      <div className={styles.grid}>
        {/* Vertical lines */}
        <div className={styles.vertical}>
          {Array.from({ length: 25 }).map((_, i) => (
            <div key={`v-${i}`} className={styles.line} />
          ))}
        </div>
        
        {/* Horizontal lines */}
        <div className={styles.horizontal}>
          {Array.from({ length: 25 }).map((_, i) => (
            <div key={`h-${i}`} className={styles.line} />
          ))}
        </div>
      </div>
    </div>
  );
}