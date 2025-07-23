import { useRef, useEffect, useState, Suspense } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useScroll, ScrollControls, Text } from '@react-three/drei';
import * as THREE from 'three';
import Item from './Item';
import { projects } from '../../../../public/data/projects';
import { Project } from '@/types/gallery';

export default function Scene({ 
  onSelectProject,
  onAssetsLoaded 
}: { 
  onSelectProject: (project: Project) => void;
  onAssetsLoaded: () => void;
}) {
  const { camera } = useThree();
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Simulate loading completion (replace with actual asset loading)
  useEffect(() => {
    const timer = setTimeout(() => {
      onAssetsLoaded();
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [onAssetsLoaded]);

  // Camera animation when project is selected
  useFrame(() => {
    if (activeProject) {
      const targetPosition = new THREE.Vector3(
        activeProject.position?.x || 0,
        activeProject.position?.y || 0,
        activeProject.position?.z || 5
      );
      camera.position.lerp(targetPosition, 0.1);
      camera.lookAt(0, 0, 0);
    } else {
      camera.position.lerp(new THREE.Vector3(0, 0, 5), 0.1)
    }
  });

  const handleItemClick = (project: Project) => {
    setActiveProject(project);
    onSelectProject(project);
  };

  // Arrange projects in a circular layout
  const arrangeProjects = () => {
    const radius = 3;
    const angleIncrement = (Math.PI * 2) / projects.length;

    return projects.map((project, index) => {
      const angle = angleIncrement * index;
      return {
        ...project,
        position: {
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius * 0.5,
          z: 0
        },
        rotation: {
          x: 0,
          y: angle,
          z: 0
        }
      };
    });
  };

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <group>
        {arrangeProjects().map((project) => (
          <Item
            key={project.id}
            project={project}
            onClick={() => handleItemClick(project)}
            active={activeProject?.id === project.id}
          />
        ))}
      </group>
    </>
  );
}