import { useState } from "react";
import { Menu, X } from "lucide-react";
import "./Navbar.css";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="navbar">
      <nav className="navbar__inner container" aria-label="Main navigation">
        <a className="navbar__brand" href="#home">
          <span>D</span>haval Patel
        </a>

        <button
          className="navbar__toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="site-menu"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={24} aria-hidden /> : <Menu size={24} aria-hidden />}
        </button>

        <ul id="site-menu" className={`navbar__links${isOpen ? " is-open" : ""}`}>
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={() => setIsOpen(false)}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
