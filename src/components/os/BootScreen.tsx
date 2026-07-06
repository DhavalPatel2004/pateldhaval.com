import { useEffect, useState } from "react";
import "./BootScreen.css";

// Brief boot splash on first load. Skipped entirely for reduced-motion users.
export function BootScreen() {
  const [phase, setPhase] = useState<"boot" | "fade" | "done">(() =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "done" : "boot",
  );

  useEffect(() => {
    if (phase !== "boot") return;
    const fadeTimer = setTimeout(() => setPhase("fade"), 1400);
    return () => clearTimeout(fadeTimer);
  }, [phase]);

  useEffect(() => {
    if (phase !== "fade") return;
    const doneTimer = setTimeout(() => setPhase("done"), 500);
    return () => clearTimeout(doneTimer);
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div className={`boot-screen${phase === "fade" ? " is-fading" : ""}`} aria-hidden>
      <span className="boot-screen__logo">◉</span>
      <span className="boot-screen__name">DhavalOS</span>
      <span className="boot-screen__bar">
        <span className="boot-screen__bar-fill" />
      </span>
    </div>
  );
}
