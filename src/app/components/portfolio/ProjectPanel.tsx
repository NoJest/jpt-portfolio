'use client'

import { useRef, useState, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'


export const ProjectPanel = ({ 
  project, 
  position, 
  isSelected, 
  onClick,
  scaleFactor = 1
 }: ProjectPanelProps & {scaleFactor?: number }) => {
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHover] = useState(false)
  const [visibleSide, setVisibleSide] = useState<'front'|'back'>('front')
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const { camera } = useThree()
  

  useEffect(() => {
    if (!project.imageUrl) return;

    // Create texture loader
    const loader = new THREE.TextureLoader();
    loader.crossOrigin = 'anonymous';
    
    loader.load(project.imageUrl, (loadedTexture) => {
      loadedTexture.wrapS = THREE.RepeatWrapping;
      loadedTexture.repeat.x = -1;
      setTexture(loadedTexture);
    });
  }, [project.imageUrl]);

    
  
  const checkVisibility = () => {
    if (!groupRef.current) return
    
    // Get the panel's world position and forward vector
    const worldPosition = new THREE.Vector3()
    groupRef.current.getWorldPosition(worldPosition)
    const forward = new THREE.Vector3(0, 0, 1)
    forward.applyQuaternion(groupRef.current.quaternion)
    
    // Vector from panel to camera
    const toCamera = new THREE.Vector3()
    camera.getWorldPosition(toCamera)
    toCamera.sub(worldPosition).normalize()
    
    // Dot product determines if we're facing front or back
    const dot = forward.dot(toCamera)
    setVisibleSide(dot > 0 ? 'front' : 'back')
  }

  useFrame((state) => {
    if (!groupRef.current) return
    
    const time = state.clock.getElapsedTime()
    
    // Spin animation
    groupRef.current.rotation.y = time * 1
    
    // Bobbing animation
    groupRef.current.position.y = Math.sin(time * 2) * 0.1

    // Scale animation
    const targetScale = isSelected ? 1.2 : hovered ? 1.1 : 1
    groupRef.current.scale.lerp(
      new THREE.Vector3(
        targetScale * scaleFactor, 
        targetScale * scaleFactor, 
        targetScale * scaleFactor),
         0.1)

    // Check visibility every frame
    checkVisibility()
  })

  // Handle resize/scroll events
  useEffect(() => {
    const handleResize = () => checkVisibility()
    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleResize)
    }
  }, [])

  return (
    <group position={position} 
    ref={groupRef} 
    scale={[scaleFactor, scaleFactor, scaleFactor]}
    >
      <mesh
        onClick={onClick}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <boxGeometry args={[3, 2, 0.1]} />
        {[
          <meshStandardMaterial 
            key="front"
            color={hovered ? '#6b46c1' : '#4a5568'} 
            metalness={0.2}
            roughness={0.4}
          />,
          texture ? (
            <meshStandardMaterial
              key="back"
              map={texture}
              side={THREE.BackSide}
            />
          ) : (
            <meshStandardMaterial
              key="back-fallback"
              color="#4a5568"
              side={THREE.BackSide}
            />
          )
        ]}
      </mesh>
      
      
      <Text
        position={[0, 1, 0.06]}
        visible={visibleSide === 'front'}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
        outlineOpacity={0.8}
      >
        {project.title}
      </Text>
      
      
      <Text
        position={[0, 1, -0.06]}
        rotation={[0, Math.PI, 0]}
        visible={visibleSide === 'back'}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
        outlineOpacity={0.8}
      >
        {project.title}
      </Text>
    </group>
  )
}