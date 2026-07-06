import { useMemo } from "react";
import { content } from "../../content";
import { useInertiaScroll } from "../../hooks/useInertiaScroll";
import { HeroSlide } from "./HeroSlide";
import { ProjectSlide } from "./ProjectSlide";
import { ContactSlide } from "./ContactSlide";
import "./Gallery.css";

interface GalleryProps {
  /** Virtual scroll paused while the About overlay is open. */
  active: boolean;
}

export function Gallery({ active }: GalleryProps) {
  const reducedMotion = useMemo(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );

  const projects = content.projects;
  const slideCount = projects.length + 2; // hero + projects + contact
  const { progress, velocity, jumpTo } = useInertiaScroll({
    slideCount,
    enabled: active && !reducedMotion,
  });

  const labels = [
    "Intro",
    ...projects.map((p) => p.title),
    "Contact",
  ];

  const slides = [
    <HeroSlide key="hero" />,
    ...projects.map((project, i) => (
      <ProjectSlide
        key={project.title}
        project={project}
        index={i}
        total={projects.length}
        // Distance of this slide from the viewport centre, in slide units.
        offset={progress - (i + 1)}
        velocity={velocity}
      />
    )),
    <ContactSlide key="contact" />,
  ];

  if (reducedMotion) {
    // Native scroll + snap fallback: no virtual scroll, no distortion.
    return (
      <main className="gallery gallery--native">
        {slides.map((slide, i) => (
          <div key={i} className="gallery__slide">
            {slide}
          </div>
        ))}
      </main>
    );
  }

  return (
    <main className="gallery" aria-label="Project gallery">
      <div
        className="gallery__track"
        style={{ transform: `translate3d(0, ${-progress * 100}vh, 0)` }}
      >
        {slides.map((slide, i) => (
          <div key={i} className="gallery__slide">
            {slide}
          </div>
        ))}
      </div>

      <nav className="gallery__rail" aria-label="Slide navigation">
        {labels.map((label, i) => (
          <button
            key={label}
            className={`gallery__tick${Math.round(progress) === i ? " is-active" : ""}`}
            onClick={() => jumpTo(i)}
            aria-label={`Go to ${label}`}
          />
        ))}
      </nav>

      <p className="gallery__hint label" style={{ opacity: progress < 0.15 ? 1 : 0 }}>
        Scroll
      </p>
    </main>
  );
}
