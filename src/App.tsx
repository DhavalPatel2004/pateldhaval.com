import { useState } from "react";
import { Header } from "./components/layout/Header";
import { Gallery } from "./components/gallery/Gallery";
import { AboutPage } from "./components/about/AboutPage";

export default function App() {
  const [view, setView] = useState<"home" | "about">("home");

  return (
    <>
      <Header
        view={view}
        onToggleAbout={() => setView(view === "about" ? "home" : "about")}
      />
      <Gallery active={view === "home"} />
      {view === "about" && <AboutPage />}
    </>
  );
}
