// components/ListView.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ItemDescription } from './ItemDescription' ;
import styles from './ListView.module.css';
import { Project } from '@/types/project';

interface ListViewProps {
   items: Project[];
}

export default function ListView({ items }: ListViewProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [titleTilt, setTitleTilt] = useState({ x: 0, y: 0, degree: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    
    // Calculate title tilt
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const dx = clientX - centerX;
    const dy = clientY - centerY;
    
    setTitleTilt({
      x: dy / centerY,
      y: -(dx / centerX),
      degree: Math.sqrt((dy / centerY) ** 2 + (dx / centerX) ** 2) * 30
    });

    // Calculate image tilt
    setTilt({
      x: (clientX - centerX) / 20,
      y: (clientY - centerY) / 20
    });
  };

  return (
    <section 
      className={styles.container}
      onMouseMove={handleMouseMove}
    >
      <motion.div 
        className={styles.headingContainer}
        animate={{
          transform: `rotate3d(${titleTilt.x}, ${titleTilt.y}, 0, ${titleTilt.degree}deg)`
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      >
        <h1 className={styles.heading}>All Projects</h1>
      </motion.div>

      <div className={styles.list}>
        {items.map((item, index) => (
            <article key={item.id} className={styles.listItem}>
                <motion.div
                    className={styles.imageWrapper}
                    animate={{
                        x: tilt.x * (index + 1),
                        y: tilt.y * (index + 1)
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    onClick={() => item.url && window.open(item.url, '_blank')}
                    style={{ cursor: item.url ? 'pointer' : 'default' }}
                >
                <Image
                 src={item.image.src}
                 width={item.image.width}
                 height={item.image.height}
                 alt={item.altText}
                 className={styles.image}
                 priority={index < 4}
                />
                {item.url && (
                    <div className={styles.linkIndicator}>
                    <span>↗</span>
                    </div>
                )}
            </motion.div>
        </article>
        ))}
      </div>
    </section>
  );
}