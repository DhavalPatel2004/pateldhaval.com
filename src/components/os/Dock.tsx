import { FileDown } from "lucide-react";
import { APPS } from "../../os/registry";
import { content } from "../../content";
import "./Dock.css";

interface DockProps {
  openWindows: Record<string, { minimized: boolean }>;
  topWindowId: string | null;
  onAppClick: (appId: string) => void;
}

export function Dock({ openWindows, topWindowId, onAppClick }: DockProps) {
  return (
    <nav className="dock glass" aria-label="Dock">
      {APPS.map((app) => {
        const win = openWindows[app.id];
        return (
          <button
            key={app.id}
            className={`dock__item${app.id === topWindowId ? " is-active" : ""}`}
            onClick={() => onAppClick(app.id)}
            aria-label={
              win?.minimized ? `Restore ${app.title}` : `Open ${app.title}`
            }
          >
            {app.icon}
            <span className="dock__tooltip">{app.title}</span>
            <span
              className={`dock__indicator${win ? " is-open" : ""}`}
              aria-hidden
            />
          </button>
        );
      })}
      <span className="dock__divider" aria-hidden />
      <a
        className="dock__item"
        href={content.contact.resumePdf}
        download
        aria-label="Download resume"
      >
        <FileDown size={22} aria-hidden />
        <span className="dock__tooltip">Resume</span>
        <span className="dock__indicator" aria-hidden />
      </a>
    </nav>
  );
}
