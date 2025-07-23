'use client'
import { useState, useRef, useEffect } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { ProjectPanel } from './ProjectPanel'
import { ProjectDetails } from './ProjectDetails'
import { Project } from '@/types/project'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'

// Custom scroll-controlled orbit component
const ScrollOrbitControls = () => {
  const controls = useRef<OrbitControlsImpl>(null)
  const { camera } = useThree()
  
useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      e.preventDefault()
      if (controls.current) {
        const delta = e.deltaY * 0.002
        // Access the internal azimuth angle safely
        controls.current.setAzimuthalAngle(controls.current.getAzimuthalAngle() + delta)
        controls.current.update()
      }
    }

    window.addEventListener('wheel', handleScroll, { passive: false })
    return () => window.removeEventListener('wheel', handleScroll)
  }, [])

  return (
    <OrbitControls
      ref={controls}
      enableZoom={false} // Disable zoom
      enablePan={false}
      autoRotate={false}
      minPolarAngle={Math.PI / 4} // Limit vertical rotation
      maxPolarAngle={Math.PI / 2}
      target={[0, 1, 0]} // Focus point
    />
  )
}

export const ProjectShowcase = ({ projects }: { projects: Project[] }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const getProjectPosition = (index: number, total: number): [number, number, number] => {
    const angle = (index / total) * Math.PI * 2
    const radius = 5
    const x = Math.sin(angle) * radius
    const z = Math.cos(angle) * radius
    const y = Math.sin(angle * 1.5) * 2
    return [x, y, z]
  }

  return (
    <div className="relative h-screen w-full">
      <Canvas 
        camera={{ 
          position: [0, 8, 15], // More zoomed out starting position
          fov: 35, // Narrower field of view
          rotation: [-0.3, 0, 0] // Downward tilt
        }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <ScrollOrbitControls /> {/* Using our custom controls */}
        <Environment preset="city" />
        
        {projects.map((project, index) => {
          const position = getProjectPosition(index, projects.length)
          const isSelected = selectedProject?.id === project.id
          
          const finalPosition: [number, number, number] = isSelected 
            ? [
                position[0] * 0.7, 
                position[1] + 0.5, 
                position[2] * 0.7
              ] 
            : position

          return (
            <ProjectPanel 
              key={project.id}
              position={finalPosition}
              project={project}
              isSelected={isSelected}
              onClick={() => setSelectedProject(isSelected ? null : project)}
            />
          )
        })}
      </Canvas>
      
      {selectedProject && (
        <ProjectDetails 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </div>
  )
}