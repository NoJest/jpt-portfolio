'use client'
import { projects } from '../../../public/data/projects'
import { ProjectShowcase } from '../components/portfolio/ProjectShowcase'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import Preloader from '../components/Preloader'
import { useEffect, useState } from 'react'

export default function ProjectsPage() {
  const isMobile= useMediaQuery('(max-width: 768px)');
  const [imagesToPreload, setImagesToPreload] = useState<string[]>([]);

  useEffect(() => {
    
    const imageUrls = projects
      .map(p => p.imageUrl)
      .filter(Boolean) as string[]; 
      
    const uniqueImages = Array.from(new Set(imageUrls));
    setImagesToPreload(uniqueImages);
  }, []);

  return (
    <main className="relative h-screen w-full">
      <Preloader images={imagesToPreload} />

      <ProjectShowcase 
        projects={projects} 
        scaleFactor={isMobile ? 0.8 : 1} 
      />
      
      {/* Themed overlay text */}
      <div className="absolute top-[15%] left-0 w-full text-center z-10 pointer-events-none">
        <h1 className="text-4xl font-bold mb-2 text-primary dark:text-secondary font-space-grotesk">
          Selected Projects
        </h1>
      </div>
    </main>
  )
}