import { content } from "../../content";
import { resolveAsset } from "../../lib/resolveAsset";
import { Section } from "../ui/Section";
import { Tabs } from "../ui/Tabs";
import "./About.css";

export function About() {
  const { about, workExperience, clubs, education } = content;

  const tabs = [
    {
      id: "work",
      label: "Work Experience",
      content: (
        <ul className="about__entries">
          {workExperience.map((job) => (
            <li key={job.title}>
              <h4>{job.title}</h4>
              <p>{job.body}</p>
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: "clubs",
      label: "Clubs & Activities",
      content: (
        <ul className="about__entries about__entries--plain">
          {clubs.map((club) => (
            <li key={club}>
              <h4>{club}</h4>
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: "education",
      label: "Education",
      content: (
        <ul className="about__entries">
          {education.map((entry) => (
            <li key={entry.title}>
              <h4>{entry.title}</h4>
              <p>{entry.subtitle}</p>
            </li>
          ))}
        </ul>
      ),
    },
  ];

  return (
    <Section id="about" eyebrow="Who I am" title="About" alt>
      <div className="about__layout">
        <div className="about__photo glass">
          <img src={resolveAsset(about.photo)} alt="Dhaval Patel" loading="lazy" />
        </div>
        <div className="about__content">
          <p className="about__bio">{about.bio}</p>
          <Tabs items={tabs} />
        </div>
      </div>
    </Section>
  );
}
