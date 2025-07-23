import { projects } from '../../../public/data/projects'
import { ProjectShowcase } from '../components/portfolio/ProjectShowcase'

export default function ProjectsPage() {
  return (
    <main className="relative h-screen w-full">
      <ProjectShowcase projects={projects} />
      
      {/* Themed overlay text */}
      <div className="absolute top-[15%] left-0 w-full text-center z-10 pointer-events-none">
        <h1 className="text-4xl font-bold mb-2 text-primary dark:text-secondary font-space-grotesk">
          Selected Projects
        </h1>
      </div>
    </main>
  )
}