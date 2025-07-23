'use client';

import { useState, useEffect } from 'react';
import  GalleryView  from './GalleryView';
import ListView  from './ListView';
import  ViewToggle  from './ViewToggle';
import { Project } from '@/types/project';
import { ProjectErrorBoundary } from './ProjectErrorBoundary';
import { useMediaQuery } from '../hooks/useMediaQuery';
interface ProjectViewProps {
  items: Project[];
}

export function ProjectView({ items }: ProjectViewProps) {
   const isMobile = useMediaQuery('(max-width: 768px)');
   const [currentView, setCurrentView] = useState<'gallery' | 'list'>(() => {
    if (typeof window !== 'undefined') {
      // Check localStorage first, then mobile detection
      const savedPreference = localStorage.getItem('projectViewPreference');
      if (savedPreference === 'gallery' || savedPreference === 'list') {
        return savedPreference;
      }
      return isMobile ? 'list' : 'gallery';
    }
    return 'gallery'; // Default for SSR
  });

    // Persist preference and handle mobile changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Auto-switch to list view if on mobile
      if (isMobile && currentView === 'gallery') {
        setCurrentView('list');
      } else {
        // Save preference whenever it changes (except mobile override)
        localStorage.setItem('projectViewPreference', currentView);
      }
    }
  }, [currentView, isMobile]);

  // Handle view changes
  const handleViewChange = (view: 'gallery' | 'list') => {
    // Don't allow switching to gallery on mobile
    if (!isMobile || view === 'list') {
      setCurrentView(view);
    }
  };

  return (
    <ProjectErrorBoundary
      fallback={
        <div className="error-state">
          <h2>Failed to load projects</h2>
          <button onClick={() => window.location.reload()}>
            Reload Projects
          </button>
        </div>
      }
    > 
    <ViewToggle 
        onViewChange={handleViewChange} 
        initialView={currentView}
        disabled={isMobile}
      />
      {currentView === 'gallery' ? (
        <GalleryView items={items} />
      ) : (
        <ListView items={items} />
      )}
    </ProjectErrorBoundary>
  );
}