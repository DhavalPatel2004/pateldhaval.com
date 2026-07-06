import { FileDown, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../ui/BrandIcons";
import { content } from "../../content";
import { resolveAsset } from "../../lib/resolveAsset";
import "./AboutPage.css";

export function AboutPage() {
  const { about, workExperience, education, clubs, contact, hero } = content;

  return (
    <div className="about-page">
      <div className="about-page__inner">
        <h1 className="display-title about-page__heading">About</h1>

        <div className="about-page__intro">
          <img
            className="about-page__photo"
            src={resolveAsset(about.photo)}
            alt={hero.name}
          />
          <p className="about-page__bio">{about.bio}</p>
        </div>

        <section className="about-page__section">
          <h2 className="label about-page__section-title">Experience</h2>
          <ul className="about-page__list">
            {workExperience.map((job) => (
              <li key={job.title}>
                <h3>{job.title}</h3>
                <p>{job.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="about-page__section">
          <h2 className="label about-page__section-title">Education</h2>
          <ul className="about-page__list">
            {education.map((entry) => (
              <li key={entry.title}>
                <h3>{entry.title}</h3>
                <p>{entry.subtitle}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="about-page__section">
          <h2 className="label about-page__section-title">Clubs &amp; Activities</h2>
          <ul className="about-page__list about-page__list--inline">
            {clubs.map((club) => (
              <li key={club}>{club}</li>
            ))}
          </ul>
        </section>

        <footer className="about-page__footer">
          <a href={`mailto:${contact.email}`}>
            <Mail size={16} aria-hidden /> {contact.email}
          </a>
          <a href={contact.linkedin} target="_blank" rel="noreferrer">
            <LinkedinIcon size={16} aria-hidden /> LinkedIn
          </a>
          <a href={contact.github} target="_blank" rel="noreferrer">
            <GithubIcon size={16} aria-hidden /> GitHub
          </a>
          <a href={contact.resumePdf} download>
            <FileDown size={16} aria-hidden /> Resume
          </a>
        </footer>
      </div>
    </div>
  );
}
