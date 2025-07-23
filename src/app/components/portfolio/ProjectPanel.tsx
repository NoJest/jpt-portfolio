'use client'

import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Float } from '@react-three/drei'
import * as THREE from 'three'
import { Project } from '@/types/project'

interface ProjectPanelProps {
  project: Project
  position: [number, number, number]
  isSelected?: boolean
  onClick: () => void
}

export const ProjectPanel = ({ project, position, isSelected, onClick }: ProjectPanelProps) => {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHover] = useState(false)
  
  useFrame((state) => {
    if (!meshRef.current) return
    
    // Floating animation
    meshRef.current.rotation.y += isSelected ? 0.02 : 0.005
    meshRef.current.position.y = Math.sin(state.clock.getElapsedTime() * (isSelected ? 2 : 1)) * 0.2
    
    // Smooth scaling
    const targetScale = isSelected ? 1.2 : hovered ? 1.1 : 1
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
  })

  return (
    <Float 
      speed={isSelected ? 5 : 2}
      rotationIntensity={isSelected ? 1 : 0.5}
      floatIntensity={isSelected ? 2 : 1}
    >
      <mesh
        ref={meshRef}
        position={position}
        onClick={onClick}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <boxGeometry args={[3, 2, 0.1]} />
        <meshStandardMaterial 
          color={hovered ? '#6b46c1' : '#4a5568'} 
          metalness={0.2}
          roughness={0.4}
        />
        
        <Text
          position={[0, 0.5, 0.06]}
          fontSize={0.3}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {project.title}
        </Text>
      </mesh>
    </Float>
  )
}