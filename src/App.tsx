import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { GlowBackdrop } from "./components/ui/GlowBackdrop";
import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
import { Skills } from "./components/sections/Skills";
import { Projects } from "./components/sections/Projects";
import { Contact } from "./components/sections/Contact";

export default function App() {
  return (
    <>
      <GlowBackdrop />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
