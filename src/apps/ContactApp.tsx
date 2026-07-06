import { FileDown, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../components/ui/BrandIcons";
import { content } from "../content";
import { Button } from "../components/ui/Button";
import { ContactForm } from "../components/ui/ContactForm";
import "./apps.css";

export function ContactApp() {
  const { contact } = content;

  return (
    <div className="contact-app">
      <div className="contact-app__info">
        <p className="app-muted">
          Whether you have an opportunity, a question, or just want to say
          hello — my inbox is always open.
        </p>
        <ul className="contact-app__channels">
          <li>
            <a href={`mailto:${contact.email}`}>
              <Mail size={18} aria-hidden /> {contact.email}
            </a>
          </li>
          <li>
            <a href={contact.linkedin} target="_blank" rel="noreferrer">
              <LinkedinIcon size={18} aria-hidden /> LinkedIn
            </a>
          </li>
          <li>
            <a href={contact.github} target="_blank" rel="noreferrer">
              <GithubIcon size={18} aria-hidden /> GitHub
            </a>
          </li>
        </ul>
        <Button href={contact.resumePdf} download variant="outline">
          <FileDown size={18} aria-hidden /> Download resume
        </Button>
      </div>
      <ContactForm />
    </div>
  );
}
