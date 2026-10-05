# BwithU Website

Marketing site for the BwithU Chrome extension. React 19 + Vite + Tailwind 4 + Framer Motion — the same stack as the extension.

## Run

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-checks, then outputs dist/
npm run preview
```

Deploys to Netlify: `netlify.toml` runs `npm run build` and publishes `dist/` (`/privacy` serves `privacy.html`).

## Going live checklist

All switches live in `src/lib/site.ts`:

- `chromeStoreUrl` — paste the Chrome Web Store link. Every CTA flips from "Get early access" to "Add to Chrome".
- `sheetsUrl` — the Google Apps Script web-app URL (already set). The waitlist form appends each signup (Timestamp, Email, Source) to the Google Sheet. Setup steps are at the top of `google-sheets/waitlist.gs`; set `VITE_SHEETS_URL` to point a build at a different sheet.
- `url`, `email`, `x`, `github` — check these. The canonical domain (`https://bwithu.live`) is also hard-coded in `index.html`, `privacy.html`, `public/robots.txt` and `public/sitemap.xml`.

## Structure

```
src/
  sections/      one file per page section (Hero, Demo, Features, Alive, …)
  components/    CallPanel (the extension's side panel), Nav, Footer, Logo, …
  pixel/         pixelRig.ts is copied verbatim from bwithu-extension/packages/ui;
                 PixelCompanion.tsx is a trimmed copy of the extension's face "brain"
  lib/           site config, scripted demo conversations, playback hook
public/
  brand/         logo mark + app icons (SVG source and PNG sizes)
  favicon.*, apple-touch-icon.png, og.png, site.webmanifest, robots.txt, sitemap.xml
```

When the extension's companions change, re-copy `packages/ui/src/pixelRig.ts` into `src/pixel/` (only the import line differs).

## Brand

- Colors: Deep Space `#060816`, Aurora Purple `#A855F7`, Neon Cyan `#38BDF8`, Soft White `#F5F7FF` (tokens in `src/index.css`).
- Type: Poppins (display), Inter (body), Jersey 10 inside pixel UI.
- Logo: a minimal winking bear head (three circles, one dot eye, one wink, one smile) in the purple→cyan gradient. `public/brand/mark.svg` is the mark (also `public/favicon.svg`), `public/brand/icon.svg` the app icon on a dark tile.
