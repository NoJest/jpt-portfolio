import { ProjectView } from "../components/ProjectView";
import { projects } from "../../../public/data/projects";

export default function ProjectsPage() {
  return (
    <main>
      <ProjectView items={projects}/>
    </main>
  );
}