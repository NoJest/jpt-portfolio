'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface ProjectDetailsProps {
  project: Project
  onClose: () => void
}

export const ProjectDetails = ({ project, onClose }: ProjectDetailsProps) => {

  return (
    <motion.div 
  className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  onClick={onClose}
>
  <motion.div 
    className="bg-muted dark:bg-muted rounded-xl p-6 max-w-2xl w-full max-h-[90vh] flex flex-col border border-border"
    initial={{ y: 20 }}
    animate={{ y: 0 }}
    onClick={(e) => e.stopPropagation()}
  >
    {/* Header */}
    <div className="flex justify-between items-start mb-4 flex-shrink-0">
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

    {/* Scrollable Content */}
    <div className="flex-1 overflow-y-auto pr-2 mb-4">
      {project.imageUrl && (
        <div className="mb-6 rounded-lg overflow-hidden border border-border/50">
          <Image
            src={project.imageUrl}
            alt={project.title}
            width={800}
            height={450}
            className="w-full h-auto object-cover"
            priority
          />
        </div>
      )}

      <p className="mb-6 text-foreground dark:text-foreground">
        {project.description}
      </p>

      {project.techStack && (
        <div className="mb-6">
          <h3 className="font-semibold mb-2 text-primary dark:text-primary">
            Tech Stack
          </h3>
          <div className="flex flex-wrap gap-2 mb-2">
            {project.techStack.map(tech => (
              <span 
                key={tech} 
                className="bg-primary/10 dark:bg-secondary/10 text-primary dark:text-secondary px-3 py-1 rounded-full text-sm border border-border/50 whitespace-nowrap"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Add extra bottom padding so last bubbles don't get cut off */}
      <div className="h-4"></div>
    </div>

    {/* Footer Buttons */}
    <div className="flex gap-4 flex-shrink-0">
      {project.projectUrl && (
        <a
          href={project.projectUrl}
          className="bg-muted text-foreground hover:bg-muted/70 px-4 py-2 rounded-lg transition-colors border border-border dark:hover:bg-muted/60"
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