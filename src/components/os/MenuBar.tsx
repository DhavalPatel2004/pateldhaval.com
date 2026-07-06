import { useEffect, useState } from "react";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../ui/BrandIcons";
import { content } from "../../content";
import "./MenuBar.css";

function useClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(timer);
  }, []);
  return now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

interface MenuBarProps {
  activeTitle: string | null;
}

export function MenuBar({ activeTitle }: MenuBarProps) {
  const time = useClock();
  const { contact } = content;

  return (
    <header className="menubar">
      <span className="menubar__brand">
        <span className="menubar__logo" aria-hidden>
          ◉
        </span>
        DhavalOS
      </span>
      <span className="menubar__active">{activeTitle ?? "Desktop"}</span>
      <div className="menubar__right">
        <a href={contact.github} target="_blank" rel="noreferrer" aria-label="GitHub">
          <GithubIcon size={15} aria-hidden />
        </a>
        <a href={contact.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
          <LinkedinIcon size={15} aria-hidden />
        </a>
        <a href={`mailto:${contact.email}`} aria-label="Email">
          <Mail size={15} aria-hidden />
        </a>
        <time className="menubar__clock">{time}</time>
      </div>
    </header>
  );
}
