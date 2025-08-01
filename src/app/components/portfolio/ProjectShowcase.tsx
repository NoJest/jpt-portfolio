'use client'
import { useState, useRef, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { ProjectPanel } from './ProjectPanel'
import { ProjectDetails } from './ProjectDetails'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'

const ScrollOrbitControls = () => {
  const controls = useRef<OrbitControlsImpl>(null)
  
  
useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      e.preventDefault()
      if (controls.current) {
        const delta = e.deltaY * 0.002
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
      enableZoom={false} 
      enablePan={false}
      autoRotate={false}
      minPolarAngle={Math.PI / 4} 
      maxPolarAngle={Math.PI / 2}
      target={[0, 0, 0]} 
    />
  )
}

export const ProjectShowcase = ({ 
  projects,
  scaleFactor = 1
 }: { projects: Project[]
  scaleFactor?: number
  }) => {
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
          position: [2, 3, 15], 
          fov: 35, 
          rotation: [0, 0, 0] 
        }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <ScrollOrbitControls /> 
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
              scaleFactor={scaleFactor}
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