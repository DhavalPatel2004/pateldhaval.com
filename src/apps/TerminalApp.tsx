import { useEffect, useRef, useState, type FormEvent } from "react";
import { content } from "../content";
import { useOpenApp } from "../os/OpenAppContext";
import "./apps.css";

interface Line {
  kind: "input" | "output";
  text: string;
}

const PROMPT = "visitor@dhaval-os:~$";

const HELP = `Available commands:
  help          show this help
  about         who is Dhaval?
  skills        list skills
  projects      list projects
  experience    list work experience
  education     list education
  contact       how to reach me
  open <app>    open an app window (about, projects, skills, contact)
  clear         clear the terminal`;

function runCommand(input: string, openApp: (id: string) => void): string | null {
  const [cmd, ...args] = input.trim().split(/\s+/);

  switch (cmd) {
    case "":
      return "";
    case "help":
      return HELP;
    case "about":
      return content.about.bio;
    case "skills":
      return content.skills.map((s) => `  • ${s}`).join("\n");
    case "projects":
      return content.projects
        .map((p) => `  • ${p.title} [${p.tech.join(", ")}]`)
        .join("\n");
    case "experience":
      return content.workExperience.map((w) => `  • ${w.title}`).join("\n");
    case "education":
      return content.education
        .map((e) => `  • ${e.title} — ${e.subtitle}`)
        .join("\n");
    case "contact":
      return [
        `  email:    ${content.contact.email}`,
        `  linkedin: ${content.contact.linkedin}`,
        `  github:   ${content.contact.github}`,
        `  resume:   try the Resume icon in the dock`,
      ].join("\n");
    case "open": {
      const target = args[0];
      if (!target) return "usage: open <about|projects|skills|contact>";
      if (!["about", "projects", "skills", "contact", "welcome"].includes(target)) {
        return `open: no app named "${target}"`;
      }
      openApp(target);
      return `opening ${target}…`;
    }
    case "clear":
      return null; // handled by caller
    case "sudo":
      return "visitor is not in the sudoers file. This incident will be reported.";
    default:
      return `command not found: ${cmd} — try "help"`;
  }
}

export function TerminalApp() {
  const openApp = useOpenApp();
  const [lines, setLines] = useState<Line[]>([
    { kind: "output", text: 'Welcome to DhavalOS terminal. Type "help" to get started.' },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const command = input;
    setInput("");
    if (command.trim() === "clear") {
      setLines([]);
      return;
    }
    const output = runCommand(command, openApp);
    setLines((prev) => [
      ...prev,
      { kind: "input", text: command },
      ...(output ? [{ kind: "output" as const, text: output }] : []),
    ]);
  };

  return (
    <div
      className="terminal-app"
      ref={scrollRef}
      onClick={() => inputRef.current?.focus()}
    >
      {lines.map((line, i) =>
        line.kind === "input" ? (
          <div key={i} className="terminal-app__line">
            <span className="terminal-app__prompt">{PROMPT}</span> {line.text}
          </div>
        ) : (
          <pre key={i} className="terminal-app__output">
            {line.text}
          </pre>
        ),
      )}
      <form className="terminal-app__line terminal-app__input-row" onSubmit={handleSubmit}>
        <label className="terminal-app__prompt" htmlFor="terminal-input">
          {PROMPT}
        </label>
        <input
          id="terminal-input"
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          aria-label="Terminal command input"
        />
      </form>
    </div>
  );
}
