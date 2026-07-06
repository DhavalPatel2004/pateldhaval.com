import "./GlowBackdrop.css";

// Fixed decorative gradient blobs behind all content — this is what the
// frosted glass panels visually refract. Purely decorative.
export function GlowBackdrop() {
  return (
    <div className="glow-backdrop" aria-hidden>
      <div className="glow-backdrop__blob glow-backdrop__blob--a" />
      <div className="glow-backdrop__blob glow-backdrop__blob--b" />
      <div className="glow-backdrop__blob glow-backdrop__blob--c" />
    </div>
  );
}
