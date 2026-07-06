import type { CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "../../content";
import { resolveAsset } from "../../lib/resolveAsset";
import "./gallery-slides.css";

/** Per-project accent colors, cycled (Noguier-style restrained pops). */
const ACCENTS = ["#49c5b6", "#6ea7d9", "#e0645c", "#e0b34c"];

const DISTORT_SCALE = 1.6;
const DISTORT_SKEW = 90;
const PARALLAX = 0.16; // extra slide-relative drift, in slide heights

interface ProjectSlideProps {
  project: Project;
  index: number;
  total: number;
  /** Slide's signed distance from viewport centre, in slide units (0 = centred). */
  offset: number;
  velocity: number;
}

export function ProjectSlide({ project, index, total, offset, velocity }: ProjectSlideProps) {
  const accent = ACCENTS[index % ACCENTS.length];

  const v = Math.max(-0.06, Math.min(velocity, 0.06));
  const imageStyle: CSSProperties = {
    transform: `translate3d(0, ${offset * PARALLAX * 100}vh, 0) scaleY(${
      1 + Math.abs(v) * DISTORT_SCALE
    }) skewY(${v * DISTORT_SKEW}deg)`,
  };
  const titleStyle: CSSProperties = {
    transform: `translate3d(0, ${-offset * PARALLAX * 60}vh, 0)`,
  };

  return (
    <article className="project-slide" style={{ "--accent": accent } as CSSProperties}>
      <a
        className="project-slide__media"
        href={project.link}
        target="_blank"
        rel="noreferrer"
        aria-label={`${project.title} — view project`}
      >
        <div className="project-slide__img-wrap" style={imageStyle}>
          <img src={resolveAsset(project.image)} alt={project.title} loading="lazy" />
        </div>
        <span className="project-slide__index label">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </a>

      <div className="project-slide__text" style={titleStyle}>
        <h2 className="display-title project-slide__title">{project.title}</h2>
        <p className="project-slide__tech label">{project.tech.join(" · ")}</p>
        <p className="project-slide__description">{project.description}</p>
        <a
          className="project-slide__link label"
          href={project.link}
          target="_blank"
          rel="noreferrer"
        >
          View project <ArrowUpRight size={14} aria-hidden />
        </a>
      </div>
    </article>
  );
}
