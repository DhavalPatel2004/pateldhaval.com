// Parses content.md (repo root) into src/content.ts, a typed data module
// consumed by the React components. Runs automatically before `dev` and
// `build` (see predev/prebuild in package.json).
//
// content.md format contract:
//   - Sections separated by `---` lines, each starting with a `## Name` heading
//   - Key/value facts as `- **Key:** value` bullets
//   - Repeatable entries as `### Title` blocks
//   - Flat lists as plain `- item` bullets
//   - HTML comments are editorial notes and are stripped entirely

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const source = readFileSync(join(root, "content.md"), "utf8");

const fail = (msg) => {
  console.error(`parse-content: ${msg}`);
  process.exit(1);
};

// Strip HTML comments first — they are human TODO notes, never content.
const cleaned = source.replace(/<!--[\s\S]*?-->/g, "");

// Split into sections keyed by their `## Name` heading.
const sections = {};
for (const block of cleaned.split(/\n---\n/)) {
  const match = block.match(/^\s*## (.+?)\s*$/m);
  if (!match) continue;
  const name = match[1].trim();
  const body = block.slice(match.index + match[0].length).trim();
  sections[name] = body;
}

const getSection = (name) => {
  if (!(name in sections)) fail(`missing required section "## ${name}"`);
  return sections[name];
};

// `- **Key:** value` bullets -> { key: value }
const parseKv = (text) => {
  const out = {};
  for (const m of text.matchAll(/^[-*] \*\*(.+?):\*\*\s*(.*)$/gm)) {
    out[m[1].trim()] = m[2].trim();
  }
  return out;
};

const requireKey = (kv, key, section) => {
  if (!kv[key]) fail(`missing "- **${key}:**" in section "## ${section}"`);
  return kv[key];
};

// `### Title` blocks -> [{ title, body }]
const parseEntries = (text) =>
  text
    .split(/^### /m)
    .slice(1)
    .map((chunk) => {
      const [first, ...rest] = chunk.split("\n");
      return { title: first.trim(), body: rest.join("\n").trim() };
    });

// Plain `- item` bullets (no bold key) -> [string]
const parseList = (text) =>
  [...text.matchAll(/^[-*] (?!\*\*)(.+)$/gm)].map((m) => m[1].trim());

const collapse = (text) => text.replace(/\s*\n\s*/g, " ").trim();

// --- Site Meta ---
const metaKv = parseKv(getSection("Site Meta"));
const meta = {
  title: requireKey(metaKv, "Site Title", "Site Meta"),
  domain: requireKey(metaKv, "Domain", "Site Meta"),
  tagline: requireKey(metaKv, "Tagline / Role", "Site Meta"),
};

// --- Hero ---
const heroKv = parseKv(getSection("Hero / Header"));
const hero = {
  name: requireKey(heroKv, "Name", "Hero / Header"),
  headline: requireKey(heroKv, "Headline", "Hero / Header"),
  photo: requireKey(heroKv, "Profile Photo", "Hero / Header"),
};

// --- About: bio paragraph(s) + one `**About Photo:** path` line ---
const aboutRaw = getSection("About");
const aboutPhotoMatch = aboutRaw.match(/\*\*About Photo:\*\*\s*(.*)$/m);
if (!aboutPhotoMatch) fail(`missing "**About Photo:**" in section "## About"`);
const about = {
  bio: collapse(aboutRaw.replace(aboutPhotoMatch[0], "")),
  photo: aboutPhotoMatch[1].trim(),
};

// --- Work Experience: title + paragraph body ---
const workExperience = parseEntries(getSection("Work Experience")).map(
  (e) => ({ title: e.title, body: collapse(e.body) }),
);
if (workExperience.length === 0) fail(`no "### " entries in "## Work Experience"`);

// --- Clubs / Activities & Skills: flat lists ---
const clubs = parseList(getSection("Clubs / Activities"));
if (clubs.length === 0) fail(`no items in "## Clubs / Activities"`);
const skills = parseList(getSection("Skills"));
if (skills.length === 0) fail(`no items in "## Skills"`);

// --- Education: title + one-line subtitle ---
const education = parseEntries(getSection("Education")).map((e) => ({
  title: e.title,
  subtitle: collapse(e.body),
}));
if (education.length === 0) fail(`no "### " entries in "## Education"`);

// --- Projects: title + description paragraph + Tech/Image/Link metadata ---
const projects = parseEntries(getSection("Projects")).map((e) => {
  const kv = parseKv(e.body);
  const description = collapse(
    e.body
      .split("\n")
      .filter((line) => !/^[-*] \*\*/.test(line.trim()))
      .join("\n"),
  );
  return {
    title: e.title,
    description,
    tech: requireKey(kv, "Tech", `Projects > ${e.title}`)
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
    image: requireKey(kv, "Image", `Projects > ${e.title}`),
    link: requireKey(kv, "Link", `Projects > ${e.title}`),
  };
});
if (projects.length === 0) fail(`no "### " entries in "## Projects"`);

// --- Contact ---
const contactKv = parseKv(getSection("Contact"));
const contact = {
  email: requireKey(contactKv, "Email", "Contact"),
  linkedin: requireKey(contactKv, "LinkedIn", "Contact"),
  github: requireKey(contactKv, "GitHub", "Contact"),
  resumePdf: requireKey(contactKv, "Resume PDF", "Contact"),
};

const content = {
  meta,
  hero,
  about,
  workExperience,
  clubs,
  education,
  skills,
  projects,
  contact,
};

const output = `// GENERATED FILE — do not edit by hand.
// Source of truth is content.md at the repo root; regenerate with \`npm run parse-content\`.

export interface SiteMeta { title: string; domain: string; tagline: string }
export interface Hero { name: string; headline: string; photo: string }
export interface About { bio: string; photo: string }
export interface WorkExperience { title: string; body: string }
export interface EducationEntry { title: string; subtitle: string }
export interface Project { title: string; description: string; tech: string[]; image: string; link: string }
export interface Contact { email: string; linkedin: string; github: string; resumePdf: string }

export interface SiteContent {
  meta: SiteMeta;
  hero: Hero;
  about: About;
  workExperience: WorkExperience[];
  clubs: string[];
  education: EducationEntry[];
  skills: string[];
  projects: Project[];
  contact: Contact;
}

export const content: SiteContent = ${JSON.stringify(content, null, 2)};
`;

writeFileSync(join(root, "src", "content.ts"), output);
console.log("parse-content: wrote src/content.ts");
