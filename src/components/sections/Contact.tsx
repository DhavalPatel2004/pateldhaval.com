import { FileDown, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../ui/BrandIcons";
import { content } from "../../content";
import { Button } from "../ui/Button";
import { ContactForm } from "../ui/ContactForm";
import { Section } from "../ui/Section";
import "./Contact.css";

export function Contact() {
  const { contact } = content;

  return (
    <Section id="contact" eyebrow="Next step" title="Get in touch">
      <div className="contact__layout">
        <div className="contact__info">
          <p className="contact__lead">
            Whether you have an opportunity, a question, or just want to say
            hello — my inbox is always open.
          </p>
          <ul className="contact__channels">
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
    </Section>
  );
}
