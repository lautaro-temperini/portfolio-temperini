# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server (webpack mode) — includes auto-rebuild on file changes
npm run build        # Production build (webpack mode) — runs next-sitemap automatically as postbuild
npm run start        # Start production server (after npm run build)
npm run lint         # Run ESLint on all files
npm test             # Playwright e2e tests (headless, Chrome) — tests in /tests dir
npm run test:ui      # Playwright with interactive UI — useful for debugging tests
npm run test:ui -- --grep "pattern"  # Run tests matching a pattern
npm run check:i18n   # Validate es.json and en.json have matching keys
npm run analyze      # Bundle analysis (opens HTML report) — set ANALYZE=true flag internally
```

Both `dev` and `build` use `--webpack` explicitly (webpack bundler, not Turbopack).

## Architecture

### Routing & i18n

All user-facing routes live under `src/app/[lang]/` where `lang` is `"es"` or `"en"`. The language routing logic (detection, redirects, CSP headers) is in **`src/middleware.ts`** (the actual middleware file that Next.js reads).

- When users visit a path like `/manijapp` or `/contact`, the middleware intercepts and redirects to `/es/manijapp` or `/en/manijapp` based on (in order):
  1. `NEXT_LOCALE` cookie (user preference, if set)
  2. `Accept-Language` header (browser language preference)
  3. Falls back to `es`
- **Important**: Every new route slug must be added to `RUTAS_CON_IDIOMA` in `src/middleware.ts` to trigger the redirect logic.

### Dictionaries

Translations live in `dictionaries/es.json` and `dictionaries/en.json` (project root, not inside `src/`).

`src/lib/getDictionary.ts` loads them with a dual-cache: `React.cache()` (per-request memoization) + a `Map` (cross-request persistence). It is `server-only` — never import it in Client Components.

**Case study pages** (Digito, Manijapp, etc.) do NOT use dictionary keys for their content. Instead, they use inline bilingual ternaries:

```tsx
const es = lang === "es"
// then throughout:
{es ? "Texto en español" : "English text"}
```

### Layouts & Fonts

- `src/app/layout.tsx` — root layout: renders `<html>/<body>`, loads fonts (Manrope from Google + local Neue Haas), injects JSON-LD for structured data, reads the `x-nonce` header for Content Security Policy.
- `src/app/[lang]/layout.tsx` — lang layout: calls `preloadDictionary(lang)` to cache translations server-side, does NOT render `<html>/<body>`.

### Key Design Tokens (Tailwind)

| Token | Value |
|---|---|
| `background` | `#0D0D0D` |
| `primary` | `#8900C3` |
| `light` | `#F2F2F2` |
| `accent` | `#A6A6A6` |
| `container` | `#18181b` |
| `subtle` | `#333` |

Project-specific accent colors are applied via arbitrary values (e.g., Manijapp uses `#C45200`, Digito uses `#08A4E1`).

### Case Study Components (`src/components/sections/`)

Building blocks used in project pages:

- `GridContainer` — responsive grid wrapper
- `Block` — padded content section
- `BentoGrid` / `BentoItem` — bento-style card grid
- `FeatureCard` — icon + title + description card
- `ImageBreakout` — full-bleed image that breaks out of the grid
- `SectionNav` — sticky dot navigation for long case studies

### DevImage & Media (`src/components/DevImage.tsx`)

Custom image component for development and production:
- `src` provided → renders `next/image` (with optimization: AVIF + WebP formats, responsive sizes)
- `src` missing + dev environment → renders a labeled placeholder div
- `src` missing + prod environment → renders `null`

**Usage**:
- For full-bleed banners: use `fill` prop (requires parent `position: relative` with fixed `height`)
- For contained images: use `width` + `height` props (component creates its own aspect-ratio container)

**Video files** (`.webm`, `.mp4`): Webpack is configured to output to `/_next/static/videos/`. Import and render as `<video>` — the file loader handles the path automatically.

## Adding a New Project Page

1. Create `src/app/[lang]/[slug]/page.tsx` as an async Server Component (see Digito or Manijapp as reference)
2. Add `slug` to `RUTAS_CON_IDIOMA` in `src/middleware.ts` (must match the page's folder name)
3. Add entry to `projectsData` in `src/data/projectsData.ts` (used by the projects home page)
4. Add `'/slug'` to the routes array in `next-sitemap.config.js` (for SEO sitemap generation)

## Testing

Tests are located in the `/tests` directory and use **Playwright** for e2e testing.

- **Run all tests**: `npm test`
- **Run a single test file**: `npm test -- path/to/test.spec.ts`
- **Interactive debugging**: `npm run test:ui -- --grep "test name"` then click to run/debug
- **CI behavior**: In GitHub Actions (`CI=true`), tests retry up to 2 times; locally they don't retry
- **Trace on failure**: Playwright records a trace on first retry (viewable in the test UI)

The dev server starts automatically during tests (`baseURL: http://localhost:3000`), and tests target that URL.

## Environment & Deployment

- **Development**: `npm run dev` starts the dev server on port 3000 with hot reload.
- **Production build**: `npm run build` (includes `next-sitemap` postbuild hook to generate `sitemap.xml`).
- **Vercel integration**: The project uses `@vercel/analytics` and `@vercel/speed-insights` — these are injected via `next/third-parties` and report to Vercel's dashboard.
- **CSP headers**: Next.js middleware reads the `x-nonce` header (set by Vercel) and injects it into CSP directives for security.

No `.env.local` is required for basic development; the app works with defaults.

## Constraints

- Never use `<img>` — always `next/image` (or `DevImage` for placeholders)
- Default to Server Components; only add `'use client'` when the component needs `useState`, `useEffect`, event handlers, or browser APIs
- No `pages/` directory
- Strict TypeScript — no `any`
- Use `tailwindcss-animate` or CSS for animations (framer-motion is installed but not used in new code)
