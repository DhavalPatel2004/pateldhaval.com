import { content } from "../content";
import { ProjectCard } from "../components/ui/ProjectCard";
import { Button } from "../components/ui/Button";
import "./apps.css";

export function ProjectsApp() {
  return (
    <div className="projects-app">
      <div className="projects-app__grid">
        {content.projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
      <div className="projects-app__more">
        <Button
          href={content.contact.github}
          target="_blank"
          rel="noreferrer"
          variant="outline"
        >
          See more on GitHub
        </Button>
      </div>
    </div>
  );
}
