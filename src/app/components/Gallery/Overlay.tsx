import { Project } from '@/types/gallery';

export default function Overlay({ project }: { project: Project | null }) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      <div className="absolute bottom-8 left-8 max-w-md bg-black bg-opacity-50 text-white p-6 rounded-lg backdrop-blur-sm">
        <h2 className="text-2xl font-bold mb-2">{project.title}</h2>
        <p className="mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map(tag => (
            <span key={tag} className="px-2 py-1 bg-white bg-opacity-20 rounded">
              {tag}
            </span>
          ))}
        </div>
        {project.link && (
          <a 
            href={project.link} 
            className="mt-4 inline-block underline pointer-events-auto"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Project
          </a>
        )}
      </div>
    </div>
  );
}