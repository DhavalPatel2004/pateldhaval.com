import { content } from "../content";
import { resolveAsset } from "../lib/resolveAsset";
import { Tabs } from "../components/ui/Tabs";
import "./apps.css";

export function AboutApp() {
  const { about, workExperience, clubs, education } = content;

  const tabs = [
    {
      id: "work",
      label: "Work Experience",
      content: (
        <ul className="app-entries">
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
        <ul className="app-entries app-entries--plain">
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
        <ul className="app-entries">
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
    <div className="about-app">
      <div className="about-app__header">
        <img
          className="about-app__photo"
          src={resolveAsset(about.photo)}
          alt={content.hero.name}
          loading="lazy"
        />
        <p className="about-app__bio">{about.bio}</p>
      </div>
      <Tabs items={tabs} />
    </div>
  );
}
