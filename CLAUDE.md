# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server (webpack mode)
npm run build        # Production build (webpack mode)
npm run lint         # ESLint
npm test             # Playwright e2e tests (headless)
npm run test:ui      # Playwright with UI
npm run check:i18n   # Validate es/en dictionary keys are in sync
npm run analyze      # Bundle analysis (ANALYZE=true next build)
```

`postbuild` auto-runs `next-sitemap` after every build.

Both `dev` and `build` use `--webpack` explicitly (webpack bundler, not Turbopack).

## Architecture

### Routing & i18n

All user-facing routes live under `src/app/[lang]/` where `lang` is `"es"` or `"en"`. The language routing logic (detection, redirects, CSP headers) is in **`src/proxy.ts`** — this file was originally `src/middleware.ts` and must be placed at `src/middleware.ts` to function as Next.js middleware.

- When users visit `/manijapp`, the middleware redirects to `/es/manijapp` or `/en/manijapp` based on the `NEXT_LOCALE` cookie or `Accept-Language` header.
- Every new route slug must be added to `RUTAS_CON_IDIOMA` in `src/proxy.ts` to trigger that redirect.

### Dictionaries

Translations live in `dictionaries/es.json` and `dictionaries/en.json` (project root, not inside `src/`).

`src/lib/getDictionary.ts` loads them with a dual-cache: `React.cache()` (per-request memoization) + a `Map` (cross-request persistence). It is `server-only` — never import it in Client Components.

**Case study pages** (Digito, Manijapp, etc.) do NOT use dictionary keys for their content. Instead, they use inline bilingual ternaries:

```tsx
const es = lang === "es"
// then throughout:
{es ? "Texto en español" : "English text"}
```

### Layouts

- `src/app/layout.tsx` — root layout: renders `<html>/<body>`, loads fonts (Manrope + local Neue Haas), injects JSON-LD, reads the `x-nonce` header for CSP.
- `src/app/[lang]/layout.tsx` — lang layout: calls `preloadDictionary(lang)`, does NOT render `<html>/<body>`.

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

### DevImage (`src/components/DevImage.tsx`)

Custom image component:
- `src` provided → renders `next/image`
- `src` missing + dev → renders a labeled placeholder div
- `src` missing + prod → renders `null`

Use `fill` prop for banners (requires parent `relative` with fixed height). Without `fill`, creates its own aspect-ratio container from `width`/`height` props.

## Adding a New Project Page

1. Create `src/app/[lang]/[slug]/page.tsx` as an async Server Component (see Digito or Manijapp as reference)
2. Add `slug` to `RUTAS_CON_IDIOMA` in `src/proxy.ts`
3. Add entry to `projectsData` in `src/data/projectsData.ts`
4. Add `'/slug'` to the routes array in `next-sitemap.config.js`

## Constraints

- Never use `<img>` — always `next/image` (or `DevImage` for placeholders)
- Default to Server Components; only add `'use client'` when the component needs `useState`, `useEffect`, event handlers, or browser APIs
- No `pages/` directory
- Strict TypeScript — no `any`
- framer-motion has been removed; use `tailwindcss-animate` or CSS for animations
