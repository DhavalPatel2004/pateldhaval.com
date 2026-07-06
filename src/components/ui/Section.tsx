import type { ReactNode } from "react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import "./Section.css";

interface SectionProps {
  id: string;
  title?: string;
  eyebrow?: string;
  alt?: boolean;
  children: ReactNode;
}

export function Section({ id, title, eyebrow, alt, children }: SectionProps) {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section id={id} className={`section${alt ? " section--alt" : ""}`}>
      <div className="container reveal" ref={ref}>
        {eyebrow && <p className="section__eyebrow">{eyebrow}</p>}
        {title && <h2 className="section__title">{title}</h2>}
        {children}
      </div>
    </section>
  );
}
