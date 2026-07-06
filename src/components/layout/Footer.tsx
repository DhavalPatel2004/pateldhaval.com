import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../ui/BrandIcons";
import { content } from "../../content";
import "./Footer.css";

export function Footer() {
  const { contact, hero } = content;

  return (
    <footer className="footer">
      <div className="footer__inner container">
        <p>
          © {new Date().getFullYear()} {hero.name}
        </p>
        <div className="footer__social">
          <a href={contact.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <LinkedinIcon size={18} aria-hidden />
          </a>
          <a href={contact.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <GithubIcon size={18} aria-hidden />
          </a>
          <a href={`mailto:${contact.email}`} aria-label="Email">
            <Mail size={18} aria-hidden />
          </a>
        </div>
      </div>
    </footer>
  );
}
