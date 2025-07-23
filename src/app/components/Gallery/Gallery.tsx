'use client';
import { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Scene from './Scene';
import Overlay from './Overlay';
import Loader from './Loader';
import { Project } from '@/types/gallery';

export default function Gallery() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  return (
    <>
      {!assetsLoaded && <Loader />}
      
      <div className={`fixed inset-0 ${assetsLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <Suspense fallback={null}>
            <Scene 
              onSelectProject={setSelectedProject} 
              onAssetsLoaded={() => setAssetsLoaded(true)}
            />
          </Suspense>
        </Canvas>
        <Overlay project={selectedProject} />
      </div>
    </>
  );
}