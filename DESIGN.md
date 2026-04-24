# DESIGN.md

> Machine-readable design system for AI coding agents working on this portfolio.  
> Stack: Next.js 15 · Tailwind CSS v3 · TypeScript · Webpack  
> Theme: **dark-only** — no light mode. All decisions below assume a dark canvas.

---

## 1. Design Principles

| # | Principle | Implication |
|---|-----------|-------------|
| 1 | **Dark canvas first** | `bg-background` (`#0D0D0D`) is the ground truth. Never introduce white or near-white backgrounds at page level. |
| 2 | **Spatial hierarchy through opacity** | Secondary content uses `text-light/70`, tertiary uses `text-light/50`. Full opacity (`text-light`) is reserved for primary labels and active states. |
| 3 | **Purple as the only accent** | `#8900C3` is the sole brand color. Project-specific accents (Digito `#08A4E1`, Manijapp `#C45200`) are scoped strictly to their own pages — never bleed into shared components. |
| 4 | **Motion is subtle and purposeful** | Animations reveal, confirm, or attract attention. Never animate for decoration alone. Duration cap: 400 ms. |
| 5 | **Fluid type, fixed grid** | Typography scales continuously with the viewport. Layout columns snap at defined breakpoints. |
| 6 | **Bilingual by default** | Every user-visible string must exist in both `es` and `en`. Case-study content uses inline ternaries; shared UI uses dictionary keys. |
| 7 | **Server Components by default** | Add `'use client'` only when `useState`, `useEffect`, event handlers, or browser APIs are required. |

---

## 2. Tokens

### 2.1 Colors

```ts
// tailwind.config.js key names → CSS / hex
background:          '#0D0D0D'   // page background
surface:             '#111111'   // slightly lifted surface (rare)
container:           '#18181b'   // card / panel background
container.light:     '#F2F2F2'   // inverted container (rare)
subtle:              '#333333'   // divider, border, muted fill
primary:             '#8900C3'   // brand purple — interactive elements
secondary:           '#595959'   // secondary actions, deselected states
accent:              '#A6A6A6'   // secondary text, icon fill
light:               '#F2F2F2'   // primary text on dark
dark:                '#1A1A1A'   // deep surface
border:              '#9C96A4'   // default border
white:               '#FFFFFF'   // explicit white when needed
```

**Opacity modifiers in use**

| Token | Usage |
|-------|-------|
| `text-light` | Primary body text, active labels |
| `text-light/80` | Supporting text |
| `text-light/70` | Secondary descriptions |
| `text-light/50` | Tertiary, disabled, placeholders |
| `bg-container/80` | Semi-transparent card backgrounds |
| `bg-white/10` | Frosted tag backgrounds |
| `border-white/20` | Frosted tag borders |

**Project accent colors** — scoped, not global tokens

```
Digito:    #08A4E1
Manijapp:  #C45200
```

**Semantic shadow color**

```
glow:  0 0 20px rgba(137, 0, 195, 0.3)   // purple glow on primary elements
```

### 2.2 Typography

**Font families**

| Token | Source | CSS variable | Role |
|-------|--------|-------------|------|
| `font-manrope` | Google Fonts | `--font-manrope` | Default UI font |
| `font-neue-haas` | Local `public/fonts/Neue-Haas.woff2` | `--font-neue-haas` | Display / hero headings |
| `font-inter` | Google Fonts | `--font-inter` | Code blocks, technical text |

**Fluid text scale** — use these CSS utility classes, never hard-coded `text-{size}` for body content

```css
.fluid-text-xs   /* clamp(0.75rem,  0.7rem  + 0.25vw, 0.875rem) */
.fluid-text-sm   /* clamp(0.875rem, 0.8rem  + 0.375vw, 1rem)    */
.fluid-text-base /* clamp(1rem,     0.9rem  + 0.5vw,   1.125rem) */
.fluid-text-lg   /* clamp(1.125rem, 1rem    + 0.625vw, 1.25rem)  */
.fluid-text-xl   /* clamp(1.25rem,  1.1rem  + 0.75vw,  1.5rem)   */
.fluid-text-2xl  /* clamp(1.5rem,   1.3rem  + 1vw,     2rem)     */
.fluid-text-3xl  /* clamp(1.875rem, 1.6rem  + 1.375vw, 2.5rem)   */
.fluid-text-4xl  /* clamp(2.25rem,  1.9rem  + 1.75vw,  3rem)     */
.fluid-text-5xl  /* clamp(3rem,     2.5rem  + 2.5vw,   4rem)     */
.fluid-text-6xl  /* clamp(3.75rem,  3rem    + 3.75vw,  5.5rem)   */
.fluid-text-7xl  /* clamp(4.5rem,   3.5rem  + 5vw,     7rem)     */
```

**Font weight scale**

```
normal:   400
medium:   500
semibold: 600
bold:     700
```

**Line height scale**

```
tight:   1.25   (headings)
snug:    1.375  (subheadings)
normal:  1.5    (body)
relaxed: 1.625  (long-form prose)
```

### 2.3 Spacing

Tailwind default scale (`4px` base) plus these custom tokens:

```
spacing[18]:    4.5rem  (72px)
spacing[88]:    22rem   (352px)
spacing[128]:   32rem   (512px)
spacing[touch]: 44px    (minimum tap target)
```

**Padding conventions for content areas**

```
Inline section padding:  px-8 md:px-12 lg:px-20
Block section padding:   py-12 md:py-16 lg:py-24
Card inner padding:      p-4 md:p-6
```

### 2.4 Border Radius

```
none:    0
xs:      2px
sm:      4px
DEFAULT: 6px
md:      8px
lg:      12px
xl:      16px
2xl:     24px
3xl:     32px
full:    9999px
```

Cards typically use `rounded-xl` (16px). Tags use `rounded-full`. Inputs use `rounded-md`.

### 2.5 Elevation (Box Shadow)

```
sm:               0 1px 2px 0 rgba(0,0,0,0.05)
DEFAULT:          0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)
md:               0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)
lg:               0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)
xl:               0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)
multi-layer:      0 2px 4px rgba(0,0,0,0.35), 0 8px 16px rgba(0,0,0,0.28), 0 20px 32px rgba(0,0,0,0.22)
glow:             0 0 20px rgba(137,0,195,0.3)
inner:            inset 0 2px 4px rgba(0,0,0,0.06)
```

**Utility class shorthand**

```css
.card-elevated    /* border + shadow combo for lifted cards */
```

---

## 3. Layout System

### 3.1 Grid

This project uses **CSS Grid** via Tailwind utilities, not Flexbox for page structure.

**Page structure template**

```
viewport
└── <main> (w-full)
    ├── <section> (px-8 md:px-12 lg:px-20)
    │   ├── GridContainer or BentoGrid
    │   │   └── Block / BentoItem / FeatureCard
    └── ImageBreakout (full-bleed, no px)
```

**`GridContainer`** — uniform card grids (`src/components/sections/GridContainer.tsx`)

```tsx
<GridContainer cols={{ default: 1, md: 2, lg: 4 }} gap="md">
  {items}
</GridContainer>
```

Gap scale: `sm` → gap-2/3/4 · `md` → gap-4/6/8 · `lg` → gap-6/8/10

**`BentoGrid`** — editorial asymmetric layouts (`src/components/sections/BentoGrid.tsx`)

```tsx
<BentoGrid cols={{ default: 1, md: 2, lg: 3 }} gap="md">
  <BentoItem colSpan={2} rowSpan={1}>{/* wide item */}</BentoItem>
  <BentoItem colSpan={1} rowSpan={2}>{/* tall item */}</BentoItem>
</BentoGrid>
```

**`Block`** — responsive colSpan/rowSpan blocks (`src/components/sections/Block.tsx`)

```tsx
<Block colSpan={{ default: 1, md: 2, lg: 4 }} rowSpan={2}>
  {content}
</Block>

// Preset aliases
<Block4x4 /> // colSpan=4, rowSpan=4
<Block2x2 /> // colSpan=2, rowSpan=2
<Block4x2 /> // colSpan=4, rowSpan=2
<Block2x4 /> // colSpan=2, rowSpan=4
```

### 3.2 Breakpoints

```
sm:  640px
md:  768px
lg:  1024px
xl:  1280px
2xl: 1536px
```

Mobile-first approach: write base styles for mobile, add `md:` and `lg:` overrides.

### 3.3 Containers

No global max-width container — sections control their own padding.  
Use `px-8 md:px-12 lg:px-20` on section wrappers.  
`ImageBreakout` with `full` prop breaks out of any padding to reach viewport edges.

---

## 4. Components

### 4.1 Buttons

No shared Button component exists; buttons are constructed inline with Tailwind.  
Follow this anatomy:

**Primary button**
```tsx
<button className="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-3 rounded-xl transition-colors duration-150">
  {label}
</button>
```

**Ghost button**
```tsx
<button className="border border-subtle hover:border-accent text-light/70 hover:text-light font-medium px-6 py-3 rounded-xl transition-colors duration-150">
  {label}
</button>
```

**Link button (text only)**
```tsx
<button className="text-primary hover:text-primary/80 font-medium underline-offset-4 hover:underline transition-colors">
  {label}
</button>
```

**States**

| State | Rule |
|-------|------|
| Default | Full opacity, no shadow |
| Hover | `hover:bg-primary/90` or `hover:border-accent` |
| Focus | `focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none` |
| Disabled | `opacity-50 cursor-not-allowed pointer-events-none` |
| Loading | Replace label with spinner, keep dimensions stable |

**Minimum touch target:** `min-h-[44px] min-w-[44px]` (`spacing[touch]`)

### 4.2 Inputs

No shared Input component. Construct with:

```tsx
<input
  className="w-full bg-container border border-subtle rounded-md px-4 py-3 text-light placeholder:text-light/40
             focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
             disabled:opacity-50 disabled:cursor-not-allowed
             transition-all duration-150"
/>
```

**States**

| State | Class |
|-------|-------|
| Default | `border-subtle` |
| Focus | `ring-2 ring-primary border-transparent` |
| Error | `border-red-500 focus:ring-red-500` |
| Disabled | `opacity-50 cursor-not-allowed` |

### 4.3 Cards

**Standard card**
```tsx
<div className="bg-container rounded-xl p-6 card-elevated">
  {content}
</div>
```

**Glassmorphism card**
```tsx
<div className="glass-card rounded-xl p-6">
  {content}
</div>
/* .glass-card = backdrop-blur + bg-white/5 + border border-white/10 */
```

**Feature card** (`src/components/sections/FeatureCard.tsx`)
```tsx
<FeatureCard
  icon={<IconComponent />}
  title={es ? "Título" : "Title"}
  description={es ? "Descripción" : "Description"}
  variant="dark"   // "dark" | "light"
/>
```

**Bento card** (`src/components/playground/BentoCard.tsx`)
- 1:1 aspect ratio, min 280px
- Full-bleed image with gradient overlay (`from-black/95 via-black/60 to-black/30`)
- Tags: `bg-white/10 border border-white/20 rounded-full`
- Border color keyed to project type (purple/green/orange/pink/gray/blue)

**Card hover pattern**
```
hover:-translate-y-1 hover:shadow-lg transition-transform duration-200
```

### 4.4 Navigation

**Navbar** (`src/components/navbar/Navbar.tsx`) — client component

- Auto-hides on scroll down, reappears on scroll up (uses `scrollY` delta)
- Language selector dropdown (`LanguageSelector.tsx`)
- Mobile hamburger menu
- Active route detection via `usePathname()`
- Tracks project sections on the home page

**SectionNav** (`src/components/case-study/SectionNav.tsx`) — case-study dot nav

```tsx
<SectionNav
  sections={[
    { id: "overview" },
    { id: "problem", label: es ? "Problema" : "Problem" },
  ]}
  variant="fixed"   // "fixed" | "inline"
/>
```

- Fixed to right edge on `lg+`
- Uses `IntersectionObserver` to mark active section
- Tooltip label on hover
- Smooth scroll on dot click

**Language selector**
- `NEXT_LOCALE` cookie + `Accept-Language` header detection
- Supported values: `"es"` | `"en"`
- Route slug must be in `RUTAS_CON_IDIOMA` in `src/proxy.ts`

---

## 5. Interaction Rules

### 5.1 Feedback

| Event | Response |
|-------|----------|
| Button click | Visual press (`active:scale-95`) + state change |
| Form submit | Disable button + show loading indicator |
| Form success | Clear form + show success message inline (no modal) |
| Form error | Inline error below the field; do not clear the user's input |
| Link hover | Color shift + optional underline |
| Card hover | Slight lift (`-translate-y-1`) + shadow increase |

### 5.2 Transitions

**Default easing:** `cubic-bezier(0.4, 0, 0.2, 1)` (ease-out — fast start, gentle stop)

**Duration tiers**

| Use | Duration |
|-----|----------|
| Color / opacity | 150 ms |
| Transform (hover lift) | 200 ms |
| Enter animations | 300 ms |
| Complex sequences | 400 ms max |

**Global transition** (applied in `globals.css`)
```css
* {
  transition: opacity 200ms cubic-bezier(0.4,0,0.2,1),
              color 150ms cubic-bezier(0.4,0,0.2,1),
              background-color 150ms cubic-bezier(0.4,0,0.2,1),
              border-color 150ms cubic-bezier(0.4,0,0.2,1),
              box-shadow 150ms cubic-bezier(0.4,0,0.2,1);
}
```

**Scroll reveal** — wrap elements with `<FadeOnScroll>` (`src/components/fxscripts/FadeOnScroll.tsx`)
```tsx
<FadeOnScroll delay={80}>{element}</FadeOnScroll>
// delay in ms; stagger by 80ms increments per sibling
```

**Named animations** (Tailwind `animate-*` classes)

| Class | Effect |
|-------|--------|
| `animate-fade-in` | Opacity 0→1, 300 ms |
| `animate-slide-up` | Opacity 0→1 + translateY(20px)→0, 300 ms |
| `animate-scale-in` | Opacity 0→1 + scale(0.95)→1, 200 ms |
| `animate-tilt` | ±1.5° rotation loop, 3 s infinite |
| `animate-flip` | FlipInX 360°, 1.2 s |
| `animate-shine` | Background shimmer, 4 s infinite |

### 5.3 System Responses

- **Page transitions:** `<PageTransition>` wraps `{children}` in the lang layout
- **Scroll to top:** `<ScrollToTop>` (dynamic, floats bottom-right after 500px scroll)
- **GA4 tracking:** use `window.gtag('event', ...)` for key interactions — do not import gtag types directly

---

## 6. Constraints

### Do

- Always use `DevImage` instead of `<img>` or bare `next/image` when the image asset may be missing
- Use `cn()` from `src/lib/utils.ts` for all conditional class merging
- Use `fluid-text-*` classes for any typography that appears at multiple viewport sizes
- Write bilingual ternaries for case-study pages: `{es ? "Texto" : "Text"}`
- Use dictionary keys (`dict.nav.home`) for shared UI strings
- Add every new route slug to `RUTAS_CON_IDIOMA` in `src/proxy.ts`
- Add every new project to `projectsData` in `src/data/projectsData.ts`
- Scope project accent colors to the page file only — never import into shared components
- Use `rounded-xl` (16px) for cards, `rounded-full` for tags/badges
- Keep server components as the default; only `'use client'` when truly needed

### Don't

- Never use `<img>` — always `next/image` or `DevImage`
- Never introduce a light mode or light backgrounds at the page level
- Never use `any` in TypeScript — strict mode is enforced
- Never import `getDictionary` in a Client Component — it is `server-only`
- Never add Framer Motion — it has been removed; use `tailwindcss-animate` or CSS
- Never create a `pages/` directory — App Router only
- Never hardcode a project accent color in a shared component
- Never add `transition-all` to elements with many composited properties — be specific
- Never exceed 400 ms for any user-triggered animation
- Never use arbitrary spacing values when a token exists

---

## 7. Edge Cases

### 7.1 Empty States

- Show a centered message with icon + label + optional CTA
- Use `text-light/50` for the message text
- Minimum height: `min-h-[200px]` with `flex items-center justify-center`
- Example:
  ```tsx
  <div className="flex flex-col items-center justify-center min-h-[200px] gap-3">
    <IconInbox className="w-8 h-8 text-light/30" />
    <p className="fluid-text-sm text-light/50">
      {es ? "Sin resultados" : "No results"}
    </p>
  </div>
  ```

### 7.2 Errors

- Inline errors (form fields): `text-red-400 fluid-text-sm mt-1`
- Error boundaries / page-level errors: centered card with `border-red-500/30` + retry button
- Never use browser `alert()` — all errors must render in the DOM
- Error messages must exist in both languages

### 7.3 Loading

**Skeleton pattern** (matches `bento-skeleton-square` class)
```tsx
<div className="animate-pulse bg-container rounded-xl aspect-square min-w-[280px]" />
```

**Spinner** — inline, same size as the replaced element:
```tsx
<div className="w-5 h-5 border-2 border-light/20 border-t-primary rounded-full animate-spin" />
```

- Do not shift layout during loading — reserve space with `min-h` or skeleton shapes
- `ProjectCardSkeleton` (`src/components/projects/ProjectCardSkeleton.tsx`) is the reference

### 7.4 Overflow Content

- Text truncation: `truncate` (single line) or `line-clamp-{n}` (multiline)
- Long URLs or code: `break-all` or `overflow-x-auto`
- Tables: wrap in `overflow-x-auto` container
- Images: always `object-cover` inside fixed-height containers
- Long case-study pages: use `<SectionNav>` for orientation

---

## 8. Accessibility

| Rule | Implementation |
|------|----------------|
| All interactive elements have focus styles | `focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none` |
| Color alone never conveys meaning | Always pair color with text or icon |
| Minimum contrast for body text | `text-light` (`#F2F2F2`) on `bg-background` (`#0D0D0D`) — passes WCAG AA |
| Images have descriptive `alt` text | Required on every `DevImage` and `next/image` |
| Decorative images use empty alt | `alt=""` on purely decorative visuals |
| Touch targets meet 44px minimum | Use `min-h-[44px] min-w-[44px]` (token: `spacing[touch]`) |
| Language declared on `<html>` | `lang={validLang}` set in `src/app/layout.tsx` |
| Animated elements respect preferences | Wrap infinite animations with `@media (prefers-reduced-motion: reduce)` overrides |
| Landmark roles | `<main>`, `<nav>`, `<header>`, `<footer>`, `<article>` used semantically |
| SectionNav dots | Include `aria-label` with section name, `role="navigation"` on the wrapper |

**Reduced motion template**
```css
@media (prefers-reduced-motion: reduce) {
  .animate-tilt,
  .animate-shine,
  .animate-flip {
    animation: none;
  }
}
```

---

## 9. Content Guidelines

### 9.1 Tone

- **Professional but human** — not corporate, not casual
- **First person** for portfolio descriptions: "I designed…", "We shipped…"
- **Outcome-focused** — describe what changed for the user, not what the designer did
- **Bilingual parity** — both languages must carry the same meaning; do not paraphrase

### 9.2 Microcopy

| Context | Rule |
|---------|-------|
| CTA buttons | Action verb + object: "Ver proyecto" / "View project" |
| Empty states | Empathetic, not technical: "Nada por aquí aún" / "Nothing here yet" |
| Error messages | What happened + what to do: "Error al enviar. Intentá de nuevo." / "Failed to send. Please try again." |
| Loading states | Verb in progress: "Cargando…" / "Loading…" |
| Navigation links | Noun or short phrase — no gerunds |
| Image captions | Descriptive sentence, no period required |

### 9.3 Labels

- **Navigation items:** title-case in English, sentence-case in Spanish
- **Tags / badges:** all-lowercase, no punctuation
- **Section headings:** sentence-case in both languages
- **Form labels:** always visible (no placeholder-only labels)
- **Dates:** use locale-aware formatting (`toLocaleDateString(lang)`)

---

## 10. Anti-patterns

| Anti-pattern | Why it's wrong | Correct approach |
|--------------|---------------|-----------------|
| `<img src="...">` | Bypasses Next.js image optimization and security | Use `DevImage` or `next/image` |
| Light mode styles | Project is dark-only; mixing breaks visual consistency | Stick to dark tokens; no `dark:` prefix needed |
| `any` TypeScript type | Disables type safety globally | Define an interface or use `unknown` with narrowing |
| Importing `getDictionary` in a Client Component | Marked `server-only` — causes runtime error | Fetch in a Server Component, pass as props |
| Adding Framer Motion | Removed from the project; increases bundle size | Use `tailwindcss-animate`, CSS keyframes, or `FadeOnScroll` |
| Hardcoding a project accent in a shared component | Colors bleed across pages, breaking visual scoping | Pass accent as a prop or apply only in the page file |
| `className="transition-all duration-300"` everywhere | Causes jank on composited properties; over-broad | List specific properties: `transition-colors`, `transition-transform` |
| Placeholder-only form labels | Inaccessible — label disappears on focus | Always render a `<label>` element above the input |
| Modal for errors or confirmations | Breaks focus flow; harder to dismiss on mobile | Use inline feedback, toast, or inline confirmation |
| Skipping `RUTAS_CON_IDIOMA` for a new route | Language redirect silently fails — users get 404 or wrong locale | Add the slug to `src/proxy.ts` before shipping |
| Relative paths for images in `public/` | Works locally, breaks in some deployment contexts | Use paths starting with `/` (e.g., `/images/foo.png`) |
| Animating layout properties (`width`, `height`, `top`) | Forces reflow on every frame — expensive | Animate `transform` and `opacity` only |
| Blocking the main thread for i18n | `getDictionary` is async — awaiting it in a render loop causes waterfalls | Call `preloadDictionary(lang)` at layout level, memoized |
| Writing English-only strings in case-study pages | Breaks the Spanish audience experience | Always write the ternary: `{es ? "…" : "…"}` |
