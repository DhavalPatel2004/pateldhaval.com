import { useEffect, useRef, useState } from "react";

export interface InertiaScrollState {
  /** Float slide index, 0 .. slideCount-1 */
  progress: number;
  /** Signed scroll velocity in slide-heights per frame (small values) */
  velocity: number;
}

interface Options {
  slideCount: number;
  /** Disable all listeners/rAF (reduced-motion fallback path). */
  enabled?: boolean;
}

const LERP = 0.085;
const SNAP_DELAY_MS = 160;
const WHEEL_FACTOR = 1;
const TOUCH_FACTOR = 2.2;

/**
 * Virtual inertia scroll for a full-screen slide gallery. Listens to wheel,
 * touch, and arrow/paging keys; lerps toward the target offset every frame and
 * gently snaps to the nearest slide once input goes idle.
 */
export function useInertiaScroll({ slideCount, enabled = true }: Options) {
  const [state, setState] = useState<InertiaScrollState>({ progress: 0, velocity: 0 });
  const jumpRef = useRef<(index: number) => void>(() => {});

  useEffect(() => {
    if (!enabled) return;

    const slideH = () => window.innerHeight;
    const maxOffset = () => (slideCount - 1) * slideH();

    let target = 0;
    let current = 0;
    let lastInputAt = 0;
    let snapped = true;
    let raf = 0;
    let touchY: number | null = null;

    const clampTarget = () => {
      target = Math.min(Math.max(target, 0), maxOffset());
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      target += e.deltaY * WHEEL_FACTOR;
      clampTarget();
      lastInputAt = performance.now();
      snapped = false;
    };

    const onTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (touchY === null) return;
      e.preventDefault();
      const y = e.touches[0].clientY;
      target += (touchY - y) * TOUCH_FACTOR;
      touchY = y;
      clampTarget();
      lastInputAt = performance.now();
      snapped = false;
    };
    const onTouchEnd = () => {
      touchY = null;
    };

    const onKeyDown = (e: KeyboardEvent) => {
      // Don't hijack keys while typing in the contact form.
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      const currentIndex = Math.round(target / slideH());
      if (["ArrowDown", "PageDown", " "].includes(e.key)) {
        e.preventDefault();
        target = Math.min(currentIndex + 1, slideCount - 1) * slideH();
      } else if (["ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        target = Math.max(currentIndex - 1, 0) * slideH();
      } else if (e.key === "Home") {
        target = 0;
      } else if (e.key === "End") {
        target = maxOffset();
      } else {
        return;
      }
      lastInputAt = performance.now();
      snapped = false;
    };

    jumpRef.current = (index: number) => {
      target = Math.min(Math.max(index, 0), slideCount - 1) * slideH();
      lastInputAt = performance.now();
      snapped = false;
    };

    const tick = () => {
      // Gentle snap to nearest slide once input has been idle.
      if (!snapped && performance.now() - lastInputAt > SNAP_DELAY_MS && touchY === null) {
        target = Math.round(target / slideH()) * slideH();
        snapped = true;
      }

      const next = current + (target - current) * LERP;
      const velocity = (next - current) / slideH();
      current = next;

      if (Math.abs(target - current) < 0.1 && Math.abs(velocity) < 0.0002) {
        current = target;
      }

      setState((prev) => {
        const progress = current / slideH();
        if (prev.progress === progress && prev.velocity === velocity) return prev;
        return { progress, velocity };
      });

      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("keydown", onKeyDown);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKeyDown);
      cancelAnimationFrame(raf);
    };
  }, [slideCount, enabled]);

  return { ...state, jumpTo: (index: number) => jumpRef.current(index) };
}
