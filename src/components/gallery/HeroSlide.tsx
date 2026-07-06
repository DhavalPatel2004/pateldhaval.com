import { content } from "../../content";
import "./gallery-slides.css";

export function HeroSlide() {
  const { hero } = content;
  const [firstName, ...rest] = hero.name.split(" ");

  return (
    <div className="hero-slide">
      <p className="label hero-slide__eyebrow">Portfolio — {content.meta.domain}</p>
      <h1 className="display-title hero-slide__name">
        {firstName}
        <br />
        {rest.join(" ")}
      </h1>
      <p className="hero-slide__tagline">{hero.headline}</p>
    </div>
  );
}
