'use client'

import { motion } from 'framer-motion'
import { Project } from '@/types/project'

interface ProjectDetailsProps {
  project: Project
  onClose: () => void
}

export const ProjectDetails = ({ project, onClose }: ProjectDetailsProps) => {

  return (
    <motion.div 
      className="absolute inset-0 bg-black/80 flex items-center justify-center p-4 z-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="bg-muted dark:bg-muted project-details rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-border"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          
          <h2 className="text-2xl font-semibold text-primary dark:text-primary">
            {project.title}
          </h2>
          <button 
            onClick={onClose}
            className="text-foreground/70 hover:text-primary dark:hover:text-secondary transition-colors"
          >
            ✕
          </button>
        </div>
        
        <p className="mb-6 text-foreground dark:text-foreground">
          {project.description}
        </p>
        
        {project.techStack && (
          <div className="mb-6">
            <h3 className="font-semibold mb-2 text-primary dark:text-primary">
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map(tech => (
                <span 
                  key={tech} 
                  className="bg-primary/10 dark:bg-secondary/10 text-primary dark:text-secondary px-3 py-1 rounded-full text-sm border border-border/50"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex gap-4">
          {project.projectUrl && (
            <a
              href={project.projectUrl}
              className="bg-primary text-background hover:bg-primary/90 px-4 py-2 rounded-lg transition-colors dark:bg-secondary dark:hover:bg-secondary/90"
              target="_blank"
              rel="noopener noreferrer"
            >
              Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              className="bg-muted text-foreground hover:bg-muted/70 px-4 py-2 rounded-lg transition-colors border border-border dark:hover:bg-muted/60"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Code
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}