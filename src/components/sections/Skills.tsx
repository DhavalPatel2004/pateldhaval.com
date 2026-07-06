import { content } from "../../content";
import { Section } from "../ui/Section";
import "./Skills.css";

export function Skills() {
  return (
    <Section id="skills" eyebrow="What I work with" title="Skills">
      <ul className="skills__grid">
        {content.skills.map((skill) => (
          <li key={skill} className="skills__item glass">
            {skill}
          </li>
        ))}
      </ul>
    </Section>
  );
}
