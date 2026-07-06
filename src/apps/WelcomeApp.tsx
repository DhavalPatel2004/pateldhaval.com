import { FolderKanban, Mail } from "lucide-react";
import { content } from "../content";
import { resolveAsset } from "../lib/resolveAsset";
import { Button } from "../components/ui/Button";
import { useOpenApp } from "../os/OpenAppContext";
import "./apps.css";

export function WelcomeApp() {
  const openApp = useOpenApp();
  const { hero } = content;

  return (
    <div className="welcome-app">
      <img
        className="welcome-app__photo"
        src={resolveAsset(hero.photo)}
        alt={hero.name}
      />
      <p className="app-eyebrow">Hello, I&rsquo;m</p>
      <h2 className="welcome-app__name">{hero.name}</h2>
      <p className="welcome-app__headline">{hero.headline}</p>
      <p className="app-muted">
        Welcome to my portfolio — it works like a desktop. Open apps from the
        dock below or the icons on the left, drag windows around, and poke at
        the Terminal if you&rsquo;re curious.
      </p>
      <div className="welcome-app__actions">
        <Button onClick={() => openApp("projects")}>
          <FolderKanban size={18} aria-hidden /> View projects
        </Button>
        <Button variant="outline" onClick={() => openApp("contact")}>
          <Mail size={18} aria-hidden /> Get in touch
        </Button>
      </div>
    </div>
  );
}
