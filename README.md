# pateldhaval.com

Personal portfolio website — [patel-dhaval.com](https://patel-dhaval.com)

React + Vite static SPA, deployed to GitHub Pages via GitHub Actions.

## Editing content

All page content (bio, work experience, education, clubs, skills, projects,
contact info) lives in [content.md](content.md). Edit that file — not the
components — and the site regenerates from it on the next build:

- `scripts/parse-content.mjs` parses `content.md` into `src/content.ts`
  (generated, gitignored) automatically before `npm run dev` and `npm run build`.
- Images referenced from `content.md` live in `src/assets/`. To swap a photo,
  overwrite the file and keep the name (e.g. `src/assets/hero-photo.jpg`).
- The resume is `public/resume.pdf` — overwrite it to update the download.

## Development

```bash
npm install
npm run dev      # local dev server
npm run build    # production build into dist/
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the
site and deploys `dist/` to GitHub Pages. The custom domain is set by
`public/CNAME`.
