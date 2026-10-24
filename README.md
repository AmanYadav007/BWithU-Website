# BwithU Website

Marketing site for BwithU, the AI companion you can video-call at https://app.bwithu.live.
React 19 + Vite + Tailwind 4 + Framer Motion.

## Run

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-checks, then outputs dist/
npm run preview
```

## Deploy

Hosted on Cloudflare Pages (project `bwithu-website`, domain bwithu.live):

```bash
npm run build && npx wrangler pages deploy dist --project-name bwithu-website
```

`public/_redirects` sends `/privacy` and `/terms` to the app's pages, which are the single source of truth.

## Content

- `src/lib/site.ts`: every link (app, privacy, terms, email, X) and the free-minutes figure.
- `src/lib/companions.ts`: faces and voices. Ids must match the app's `web/src/config/companion.ts`;
  face cards link to `app.bwithu.live/?face=<id>`, which preselects that face.
- `public/faces/*.jpg`: renders of the 3D faces captured from the app. `public/voices/*.mp3`: the app's voice samples.
- Waitlist (the "your own companion" section) posts to the Google Sheet via `google-sheets/waitlist.gs`
  with source `custom-companion`.
- Keep the FAQ JSON-LD in `index.html` in sync with `src/sections/FAQ.tsx`.

## Brand

- Colors: Deep Space `#060816`, Aurora Purple `#A855F7`, Neon Cyan `#38BDF8`, Soft White `#F5F7FF` (tokens in `src/index.css`).
- Type: Poppins (display), Inter (body).
- Logo: the winking bear mark, `public/brand/mark.svg` (also `public/favicon.svg`); app icon `public/brand/icon.svg`.
