import { ArrowDown } from "lucide-react";
import { content } from "../../content";
import { resolveAsset } from "../../lib/resolveAsset";
import { Button } from "../ui/Button";
import "./Hero.css";

export function Hero() {
  const { hero } = content;

  return (
    <section id="home" className="hero">
      <div className="hero__inner container">
        <div className="hero__text">
          <p className="hero__greeting">Hello, I&rsquo;m</p>
          <h1 className="hero__name">{hero.name}</h1>
          <p className="hero__headline">{hero.headline}</p>
          <div className="hero__actions">
            <Button href="#projects">View my work</Button>
            <Button href="#contact" variant="outline">
              Get in touch
            </Button>
          </div>
        </div>
        <div className="hero__photo glass">
          <img src={resolveAsset(hero.photo)} alt={hero.name} />
        </div>
      </div>
      <a className="hero__scroll-hint" href="#about" aria-label="Scroll to About">
        <ArrowDown size={20} aria-hidden />
      </a>
    </section>
  );
}
