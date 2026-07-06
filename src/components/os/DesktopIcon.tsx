import type { ReactNode } from "react";
import "./DesktopIcon.css";

interface DesktopIconProps {
  label: string;
  icon: ReactNode;
  onOpen: () => void;
}

export function DesktopIcon({ label, icon, onOpen }: DesktopIconProps) {
  return (
    <button className="desktop-icon" onDoubleClick={onOpen} onClick={onOpen}>
      <span className="desktop-icon__glyph glass">{icon}</span>
      <span className="desktop-icon__label">{label}</span>
    </button>
  );
}
