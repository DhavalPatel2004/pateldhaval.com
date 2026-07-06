import type { ComponentType, ReactNode } from "react";
import {
  FolderKanban,
  Mail,
  Sparkles,
  SquareTerminal,
  User,
  Zap,
} from "lucide-react";
import { AboutApp } from "../apps/AboutApp";
import { ProjectsApp } from "../apps/ProjectsApp";
import { SkillsApp } from "../apps/SkillsApp";
import { ContactApp } from "../apps/ContactApp";
import { TerminalApp } from "../apps/TerminalApp";
import { WelcomeApp } from "../apps/WelcomeApp";

export interface AppDefinition {
  id: string;
  title: string;
  icon: ReactNode;
  component: ComponentType;
  /** Preferred window size on desktop; clamped to the viewport. */
  width: number;
  height: number;
  /** Base position as a fraction of the desktop area. */
  baseX: number;
  baseY: number;
  /** Shown on the desktop as an icon (all apps live in the dock). */
  onDesktop?: boolean;
}

export const APPS: AppDefinition[] = [
  {
    id: "welcome",
    title: "Welcome",
    icon: <Sparkles size={22} aria-hidden />,
    component: WelcomeApp,
    width: 480,
    height: 520,
    baseX: 0.08,
    baseY: 0.1,
  },
  {
    id: "about",
    title: "About Me",
    icon: <User size={22} aria-hidden />,
    component: AboutApp,
    width: 720,
    height: 560,
    baseX: 0.16,
    baseY: 0.08,
    onDesktop: true,
  },
  {
    id: "projects",
    title: "Projects",
    icon: <FolderKanban size={22} aria-hidden />,
    component: ProjectsApp,
    width: 840,
    height: 600,
    baseX: 0.2,
    baseY: 0.12,
    onDesktop: true,
  },
  {
    id: "skills",
    title: "Skills",
    icon: <Zap size={22} aria-hidden />,
    component: SkillsApp,
    width: 520,
    height: 440,
    baseX: 0.45,
    baseY: 0.18,
    onDesktop: true,
  },
  {
    id: "contact",
    title: "Contact",
    icon: <Mail size={22} aria-hidden />,
    component: ContactApp,
    width: 760,
    height: 580,
    baseX: 0.28,
    baseY: 0.1,
    onDesktop: true,
  },
  {
    id: "terminal",
    title: "Terminal",
    icon: <SquareTerminal size={22} aria-hidden />,
    component: TerminalApp,
    width: 640,
    height: 420,
    baseX: 0.34,
    baseY: 0.3,
    onDesktop: true,
  },
];

export const getApp = (id: string) => APPS.find((app) => app.id === id);
