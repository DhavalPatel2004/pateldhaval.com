import { Mail, FileDown } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../ui/BrandIcons";
import { content } from "../../content";
import { ContactForm } from "../ui/ContactForm";
import "./gallery-slides.css";

export function ContactSlide() {
  const { contact } = content;

  return (
    <div className="contact-slide">
      <div className="contact-slide__left">
        <p className="label contact-slide__eyebrow">Next step</p>
        <h2 className="display-title contact-slide__title">
          Let&rsquo;s work
          <br />
          together
        </h2>
        <ul className="contact-slide__channels">
          <li>
            <a href={`mailto:${contact.email}`}>
              <Mail size={16} aria-hidden /> {contact.email}
            </a>
          </li>
          <li>
            <a href={contact.linkedin} target="_blank" rel="noreferrer">
              <LinkedinIcon size={16} aria-hidden /> LinkedIn
            </a>
          </li>
          <li>
            <a href={contact.github} target="_blank" rel="noreferrer">
              <GithubIcon size={16} aria-hidden /> GitHub
            </a>
          </li>
          <li>
            <a href={contact.resumePdf} download>
              <FileDown size={16} aria-hidden /> Resume
            </a>
          </li>
        </ul>
      </div>
      <ContactForm />
    </div>
  );
}
