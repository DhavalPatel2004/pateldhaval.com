// content.md references images by repo path (e.g. "src/assets/hero-photo.jpg").
// Vite rewrites imported assets to hashed URLs at build time, so resolve those
// paths through import.meta.glob. Paths starting with "/" are public/ files
// served verbatim (e.g. "/resume.pdf") and pass through untouched.
const assets = import.meta.glob<string>("../assets/*", {
  eager: true,
  import: "default",
});

export function resolveAsset(path: string): string {
  if (path.startsWith("/") || path.startsWith("http")) return path;
  const key = "../" + path.replace(/^src\//, "");
  const url = assets[key];
  if (!url) {
    throw new Error(
      `Unknown asset path "${path}" in content.md — expected a file under src/assets/`,
    );
  }
  return url;
}
