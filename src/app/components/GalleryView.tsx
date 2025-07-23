'use client';

import { useState, useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useWindowSize } from '../hooks/useWindowSize';
import PerspectiveGrid from './PerspectiveGrid';
import { ItemDescription } from './ItemDescription';
import Image from 'next/image';
import styles from './GalleryView.module.css';
import { Project } from '@/types/project';

interface GalleryViewProps {
  items: Project[];
}

export default function GalleryView({ items }: GalleryViewProps) {
  const { width: windowWidth, height: windowHeight } = useWindowSize();
  const galleryRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentItem, setCurrentItem] = useState<number | null>(null);
  const [headerOpacity, setHeaderOpacity] = useState(1);
  const [sliderValue, setSliderValue] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0, degree: 0 });
  const animationRef = useRef<gsap.core.Timeline | null>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Initialize GSAP animations
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const zMax = Math.min(windowWidth * 10, 20000);
    const totalImages = items.length;

    animationRef.current = gsap.timeline({
      paused: true,
      defaults: { 
        ease: "power3.inOut",
        duration: 1.5
      }
    });

    items.forEach((_, index) => {
      const zPos = (index / totalImages) * (zMax * -1);
      const opacity = 1 - index / totalImages;
      
      animationRef.current?.to(imageRefs.current[index], {
        z: zPos + zMax * 0.95,
        opacity: opacity - 0.95,
      }, 0);
    });

    animationRef.current?.eventCallback("onUpdate", () => {
      if (!animationRef.current) return;
      const progress = animationRef.current.progress();
      setHeaderOpacity(1 - progress);
      setSliderValue(progress);
      setCurrentItem(Math.min(Math.floor(progress * items.length), items.length - 1));
    });

  }, { scope: containerRef });

  // Position calculation functions
  const calculatePosition = (index: number, element: HTMLElement) => {
    if (!galleryRef.current) return { left: 0, top: 0 };
    
    if (windowWidth < 768) {
      // Mobile layout - centered stack
      const { height: imageHeight, width: imageWidth } = element.getBoundingClientRect();
      const { width: galleryWidth } = galleryRef.current.getBoundingClientRect();
      
      return {
        left: (galleryWidth - imageWidth) / 2,
        top: 100 + index * 30, // Slightly staggered
      };
    } else {
      // Desktop layout - quadrant positioning
      const quadrant = (Math.floor(Math.random() * 2) + index) % 4;
      const { height: imageHeight, width: imageWidth } = element.getBoundingClientRect();
      const { height: galleryHeight, width: galleryWidth } = galleryRef.current.getBoundingClientRect();

      const yOffset = 0.2 * windowHeight;
      const xOffset = 0.2 * windowWidth;
      const rightBound = galleryWidth - imageWidth;
      const bottomBound = galleryHeight - imageHeight;

      switch (quadrant) {
        case 0: return { // Top-left
          left: xOffset + Math.random() * (rightBound/2 - xOffset),
          top: yOffset + Math.random() * (bottomBound/2 - yOffset)
        };
        case 1: return { // Top-right
          left: rightBound/2 + Math.random() * (rightBound/2 - xOffset),
          top: yOffset + Math.random() * (bottomBound/2 - yOffset)
        };
        case 2: return { // Bottom-left
          left: xOffset + Math.random() * (rightBound/2 - xOffset),
          top: bottomBound/2 + Math.random() * (bottomBound/2 - yOffset)
        };
        case 3: return { // Bottom-right
          left: rightBound/2 + Math.random() * (rightBound/2 - xOffset),
          top: bottomBound/2 + Math.random() * (bottomBound/2 - yOffset)
        };
        default: return { left: 0, top: 0 };
      }
    }
  };

  // Setup initial gallery positions
  const setupGallery = () => {
    if (!galleryRef.current || !containerRef.current) return;

    const zMax = Math.min(windowWidth * 10, 20000);
    const totalImages = items.length;

    items.forEach((_, index) => {
      const image = imageRefs.current[index];
      if (!image) return;

      const position = calculatePosition(index, image);
      const zPos = (index / totalImages) * (zMax * -1);

      gsap.set(image, {
        x: position.left,
        y: position.top,
        z: zPos,
        opacity: 1 - index / totalImages,
        zIndex: totalImages - index
      });
    });
  };

  // Handle window resize
  useEffect(() => {
    setupGallery();
  }, [windowWidth, windowHeight]);

  // Mouse interaction handlers
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Title tilt
    setTilt({
      x: y / (rect.height / 2),
      y: -x / (rect.width / 2),
      degree: Math.sqrt(Math.pow(x / rect.width, 2) + Math.pow(y / rect.height, 2)) * 30
    });

    // Image parallax
    items.forEach((_, index) => {
      gsap.to(imageRefs.current[index], {
        x: `+=${x * 0.02 * (index + 1)}`,
        y: `+=${y * 0.02 * (index + 1)}`,
        duration: 0.5
      });
    });
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (!animationRef.current) return;
    e.preventDefault();
    
    const delta = Math.sign(e.deltaY);
    const currentProgress = animationRef.current.progress();
    const step = 1 / items.length;

    if (delta > 0 && currentProgress < 0.95) {
      gsap.to(animationRef.current, {
        progress: currentProgress + step,
        ease: "power3.out"
      });
    } else if (delta < 0 && currentProgress > 0) {
      gsap.to(animationRef.current, {
        progress: Math.max(0, currentProgress - step),
        ease: "power3.out"
      });
    }
  };

  const handleItemClick = (index: number) => {
    if (items[index].url) {
      window.open(items[index].url, '_blank', 'noopener,noreferrer');
    } else {
      const targetProgress = index / (items.length - 1);
      gsap.to(animationRef.current, {
        progress: targetProgress,
        duration: 0.7,
        ease: "power3.out"
      });
    }
  };

  return (
    <div 
      className={styles.galleryContainer}
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onWheel={handleWheel}
    >
      <div className={styles.gallery} ref={galleryRef}>
        {items.map((item, index) => (
          <div
            key={item.id}
            ref={(el) => {
                if (el) {
                    imageRefs.current[index] = el;
                }
            }}
            className={styles.galleryItem}
            onClick={() => handleItemClick(index)}
            style={{ cursor: item.url ? 'pointer' : 'default' }}
          >
            <Image
              src={item.image.src}
              width={item.image.width}
              height={item.image.height}
              alt={item.altText}
              priority={index < 4}
              className={styles.image}
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,...`} // Tiny placeholder
            />
            {item.url && (
              <div className={styles.linkIndicator} aria-hidden="true">
                ↗
              </div>
            )}
          </div>
        ))}
        <PerspectiveGrid />
      </div>

      <div className={styles.header} style={{ opacity: headerOpacity }}>
        <h1 
          style={{ 
            transform: `rotate3d(${tilt.x}, ${tilt.y}, 0, ${tilt.degree}deg)`,
            transition: 'transform 0.5s ease-out'
          }}
        >
          Selected Projects
        </h1>
      </div>

      {currentItem !== null && (
        <ItemDescription item={items[currentItem]} />
      )}

      <div className={styles.controls}>
        <div className={styles.sliderContainer}>
          <input
            type="range"
            min="0"
            max="0.999"
            step="0.001"
            value={sliderValue}
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              setSliderValue(value);
              animationRef.current?.progress(value);
            }}
            className={styles.slider}
          />
          <div className={styles.sliderTicks}>
            {items.map((_, i) => (
              <div 
                key={i}
                className={styles.tick}
                onClick={() => {
                  const progress = i / (items.length - 1);
                  animationRef.current?.progress(progress);
                }}
              />
            ))}
          </div>
        </div>

        <div className={styles.zoomControls}>
          <button
            onClick={() => animationRef.current?.reverse()}
            disabled={sliderValue <= 0}
            aria-label="Zoom out"
          >
            −
          </button>
          <button
            onClick={() => animationRef.current?.play()}
            disabled={sliderValue >= 0.95}
            aria-label="Zoom in"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}