'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './ViewToggle.module.css';

interface ViewToggleProps {
  onViewChange: (view: 'gallery' | 'list') => void;
  initialView?: 'gallery' | 'list';
  disabled?: boolean;
}

export default function ViewToggle({ 
  onViewChange, 
  initialView = 'list',
  disabled = false
}: ViewToggleProps) {
  const [currentView, setCurrentView] = useState(initialView);

  const handleToggle = () => {
    if (disabled) return;
    const newView = currentView === 'gallery' ? 'list' : 'gallery';
    setCurrentView(newView);
    onViewChange(newView);
  };

  return (
    <div className={styles.container}>
      <button 
        onClick={handleToggle}
        className={styles.button}
        disabled={disabled}
        aria-label={`Switch to ${currentView === 'gallery' ? 'list' : 'gallery'} view`}
      >
        <motion.div
          className={styles.track}
          animate={{
            backgroundColor: currentView === 'gallery' 
              ? 'rgb(50 35 110)' // --primary
              : 'rgb(230 230 250)' // --muted
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.span
            className={styles.thumb}
            animate={{
              x: currentView === 'gallery' ? 0 : 24,
              backgroundColor: currentView === 'gallery' 
                ? 'rgb(230 230 250)' // --muted
                : 'rgb(50 35 110)' // --primary
            }}
            transition={{ 
              type: "spring",
              stiffness: 300,
              damping: 15
            }}
          />
        </motion.div>
      </button>
    </div>
  );
}