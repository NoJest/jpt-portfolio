import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type {ItemProps} from '@/types/gallery'

export default function Item({ project, onClick, active = false }: ItemProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const position = new THREE.Vector3(
    project.position?.x || 0,
    project.position?.y || 0,
    project.position?.z || 0
  );

  const rotation = new THREE.Euler(
    project.rotation?.x || 0,
    project.rotation?.y || 0,
    project.rotation?.z || 0
  );

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y = active 
        ? meshRef.current.rotation.y + 0.01
        : rotation.y;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
      scale={project.scale || 1}
      onClick={onClick}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial 
        color={project.color || '#ffffff'} 
        emissive={active ? project.color || '#ffffff' : '#000000'}
        emissiveIntensity={active ? 0.5 : 0}
      />
    </mesh>
  );
}