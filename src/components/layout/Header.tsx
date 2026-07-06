import { X } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../ui/BrandIcons";
import { content } from "../../content";
import "./Header.css";

interface HeaderProps {
  view: "home" | "about";
  onToggleAbout: () => void;
}

export function Header({ view, onToggleAbout }: HeaderProps) {
  const { contact, hero } = content;

  return (
    <header className="header">
      <span className="header__name label">{hero.name}</span>
      <div className="header__right">
        <a
          className="header__social"
          href={contact.github}
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
        >
          <GithubIcon size={16} aria-hidden />
        </a>
        <a
          className="header__social"
          href={contact.linkedin}
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
        >
          <LinkedinIcon size={16} aria-hidden />
        </a>
        <button className="header__about label" onClick={onToggleAbout}>
          {view === "about" ? (
            <>
              Close <X size={14} aria-hidden />
            </>
          ) : (
            "About"
          )}
        </button>
      </div>
    </header>
  );
}
