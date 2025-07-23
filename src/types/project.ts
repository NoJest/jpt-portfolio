 export interface Project {
  id: string
  title: string
  description: string
  imageUrl?: string
  projectUrl?: string
  githubUrl?: string
  tags: string[]
  techStack: string[]
  featured: boolean
  date: string
}
