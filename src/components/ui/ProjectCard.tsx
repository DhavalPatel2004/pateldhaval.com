import { ExternalLink } from "lucide-react";
import type { Project } from "../../content";
import { resolveAsset } from "../../lib/resolveAsset";
import "./ProjectCard.css";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="project-card glass">
      <div className="project-card__media">
        <img src={resolveAsset(project.image)} alt={project.title} loading="lazy" />
      </div>
      <div className="project-card__body">
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__description">{project.description}</p>
        <ul className="project-card__tech" aria-label="Technologies used">
          {project.tech.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
        <a
          className="project-card__link"
          href={project.link}
          target="_blank"
          rel="noreferrer"
        >
          View project <ExternalLink size={16} aria-hidden />
        </a>
      </div>
    </article>
  );
}
