import { content } from "../content";
import "./apps.css";

export function SkillsApp() {
  return (
    <div className="skills-app">
      <p className="app-muted">Tools and technologies I work with:</p>
      <ul className="skills-app__grid">
        {content.skills.map((skill) => (
          <li key={skill} className="skills-app__item glass">
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
}
