import { content } from "../../content";
import { Button } from "../ui/Button";
import { ProjectCard } from "../ui/ProjectCard";
import { Section } from "../ui/Section";
import "./Projects.css";

export function Projects() {
  return (
    <Section id="projects" eyebrow="What I've built" title="Projects" alt>
      <div className="projects__grid">
        {content.projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
      <div className="projects__more">
        <Button href={content.contact.github} target="_blank" rel="noreferrer" variant="outline">
          See more on GitHub
        </Button>
      </div>
    </Section>
  );
}
