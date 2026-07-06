import type { PointerEvent, ReactNode } from "react";
import { Minus, X } from "lucide-react";
import "./Window.css";

interface WindowProps {
  title: string;
  x: number;
  y: number;
  z: number;
  width: number;
  height: number;
  isTop: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
  onMove: (x: number, y: number) => void;
  children: ReactNode;
}

export function Window({
  title,
  x,
  y,
  z,
  width,
  height,
  isTop,
  onClose,
  onMinimize,
  onFocus,
  onMove,
  children,
}: WindowProps) {
  const handleTitlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    // Don't start a drag from the window control buttons.
    if ((e.target as HTMLElement).closest("button")) return;
    e.preventDefault(); // stop text selection from hijacking the drag
    const origin = { px: e.clientX, py: e.clientY, wx: x, wy: y };

    const handleMove = (ev: globalThis.PointerEvent) => {
      const nx = origin.wx + (ev.clientX - origin.px);
      const ny = origin.wy + (ev.clientY - origin.py);
      // Keep the title bar reachable: clamp within the viewport with margins.
      const maxX = window.innerWidth - 160;
      const maxY = window.innerHeight - 120;
      onMove(
        Math.min(Math.max(nx, -width + 160), maxX),
        Math.min(Math.max(ny, 0), maxY),
      );
    };
    const stop = () => {
      document.removeEventListener("pointermove", handleMove);
      document.removeEventListener("pointerup", stop);
      document.removeEventListener("pointercancel", stop);
    };
    document.addEventListener("pointermove", handleMove);
    document.addEventListener("pointerup", stop);
    document.addEventListener("pointercancel", stop);
  };

  return (
    <section
      className={`window glass${isTop ? " is-top" : ""}`}
      role="dialog"
      aria-label={title}
      style={{
        left: x,
        top: y,
        zIndex: z,
        width: `min(${width}px, calc(100vw - 24px))`,
        height: `min(${height}px, calc(100dvh - 120px))`,
      }}
      onPointerDown={onFocus}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
    >
      <div className="window__titlebar" onPointerDown={handleTitlePointerDown}>
        <div className="window__controls">
          <button
            className="window__control window__control--close"
            onClick={onClose}
            aria-label={`Close ${title}`}
          >
            <X size={9} aria-hidden />
          </button>
          <button
            className="window__control window__control--minimize"
            onClick={onMinimize}
            aria-label={`Minimize ${title}`}
          >
            <Minus size={9} aria-hidden />
          </button>
        </div>
        <span className="window__title">{title}</span>
        <span className="window__titlebar-spacer" aria-hidden />
      </div>
      <div className="window__body">{children}</div>
    </section>
  );
}
