## Refactor — Resumen final (22/22)

Se ejecutaron los **22 prompts** de refactor en orden, sin pedir confirmaciones entre pasos.

### Estado general

- **Completados**: 22/22
- **Parcial**: 1 (Prompt 7, parte “pasar `isAboveTheFold={true}` al primer uso”)
- **No realizado**: 0

---

## Detalle por prompt

### Prompt 1 — `GlareHover.tsx` (a11y `aria-hidden`)

- Se removió `aria-hidden="true"` del contenedor principal.
- Se aplicó `aria-hidden="true"` solo a overlays/elementos puramente decorativos.
- Se verificó que ningún texto/botón/link quede dentro de un árbol con `aria-hidden`.

### Prompt 2 — Layouts raíz y por idioma

- `src/app/layout.tsx`: se eliminó el `validLang = 'es'` hardcodeado. El layout raíz no determina idioma.
- `src/app/[lang]/layout.tsx`: se agregó (o ajustó) lógica para:
  - leer `params.lang`
  - validarlo contra `['es','en']` (fallback `es`)
  - setear `<html lang={validLang}>`
  - usar `validLang` para `inLanguage` en JSON-LD

### Prompt 3 — Canonical dinámico

- `src/app/[lang]/page.tsx`: canonical dejó de ser `'/'` fijo y pasó a `/${lang}`.
- Se agregó `alternates.languages: { es: '/es', en: '/en' }`.

### Prompt 4 — Foco accesible en Contact

- `src/app/[lang]/contact/ContactForm.tsx`:
  - Se corrigieron clases Tailwind `focus-visible` malformadas.
  - Se aseguró un patrón válido de foco (`focus-visible:ring-*`, etc.).

### Prompt 5 — SpotlightCard (handlers de foco decorativos)

- `src/app/[lang]/contact/SpotlightCard.tsx`:
  - Se removieron `onFocus/onBlur` del `<div>` contenedor al ser decorativo.
  - Se dejó foco nativo en los elementos hijos interactivos.
  - Se agregó comentario breve justificando.

### Prompt 6 — CSP + logs en middleware

- `src/middleware.ts`:
  - CSP: removidos `'unsafe-inline'` y `'unsafe-eval'` de `script-src`; removido `'unsafe-inline'` de `style-src`.
  - Se agregó `'strict-dynamic'` y `nonce-${nonce}` en `script-src`.
  - `console.log` envueltos con `if (process.env.NODE_ENV !== 'production') { ... }`.

### Prompt 7 — FeaturedProjectCard: `priority` condicional + `sizes` + uso

- `src/components/projects/FeaturedProjectCard.tsx`:
  - Nueva prop `isAboveTheFold?: boolean` (default `false`).
  - `priority={isAboveTheFold}` en la imagen de fondo.
  - `sizes` agregado en el logo con `fill`.
  - Tracking migrado a helper (`trackProjectClick`).

- ⚠️ **NO REALIZADO (parcial)** — “pasar `isAboveTheFold={true}` al primer uso”:
  - Motivo: no se encontró ningún archivo en `src/` que importe/uso `FeaturedProjectCard`, por lo que no había un “primer elemento” real donde aplicar la prop.

### Prompt 8 — About: strings a diccionario

- `src/app/[lang]/about/page.tsx`:
  - Se reemplazó el objeto hardcodeado por `dict.about.page`.
- `dictionaries/es.json`:
  - Se agregaron keys para el contenido de la página bajo `about.page`.
- `dictionaries/en.json`:
  - Se espejó la misma estructura y se agregó el sufijo ` [TODO: translate]` en los valores.

### Prompt 9 — API contact: remover `console.log`

- `src/app/api/contact/route.ts`:
  - Se removieron `console.log` (se mantuvieron `console.error` de errores reales).

### Prompt 10 — Navbar: feature flag + limpieza de código muerto

- `src/components/navbar/Navbar.tsx`:
  - `false && (...)` reemplazado por `const SHOW_PROJECTS = process.env.NEXT_PUBLIC_SHOW_PROJECTS === 'true'` + `{SHOW_PROJECTS && (...)}`.
  - Eliminado bloque “Playground” comentado y su handler.
  - Limpieza de imports/variables sin uso tras el refactor.

### Prompt 11 — Helper de analytics + reemplazos

- Se creó `src/lib/analytics.ts` con:
  - `trackProjectClick`
  - `trackCTAClick`
  - `trackFormEvent`
- Se reemplazaron `sendGAEvent` inline por helpers en:
  - `Navbar.tsx`
  - `FeaturedProjectCard.tsx`
  - `AwwwardsProjectCard.tsx`
  - `ProjectCard.tsx` (ver Prompt 20)
  - `Footer.tsx`
  - `ContactForm.tsx`
- `src/app/layout.tsx`:
  - Google Analytics quedó renderizado de forma condicional según `NEXT_PUBLIC_GA_ID`.

### Prompt 12 — Sync diccionarios + script + package.json

- Se sincronizaron keys recursivamente entre `dictionaries/es.json` y `dictionaries/en.json`:
  - keys faltantes en `en` agregadas con valor ES + ` [TODO: translate]`
  - keys extra en `en` removidas (ES como fuente de verdad)
- Se creó `scripts/check-dict-sync.ts`.
- Se agregó script `check:i18n` en `package.json`.
- Se agregó `ts-node` (si no estaba) para ejecutar el script.

### Prompt 13 — Footer fallbacks por idioma + CTA styles a CSS global

- `Footer.tsx`:
  - fallbacks por idioma (`fallback` + `t = dict ?? fallback`)
  - gradientes/sombras inline del CTA movidos a clase CSS global.
- `globals.css`:
  - nueva clase `.btn-cta-primary`.

### Prompt 14 — Unificación de dominio en metadata + `.env.example`

- `src/app/layout.tsx`:
  - `SITE_URL` desde `NEXT_PUBLIC_SITE_URL` con fallback al dominio existente.
  - unificación de `metadataBase` y `openGraph.url`.
- `.env.example`:
  - agregado `NEXT_PUBLIC_SITE_URL=https://tu-dominio.com` (creado si no existía).

### Prompt 15 — preloadDictionary con idioma activo

- Se eliminó precarga dual (`es` + `en`) y se dejó un único preload con idioma activo en `src/app/[lang]/layout.tsx`.

### Prompt 16 — `aria-label` del menú desde diccionario

- `Navbar.tsx`:
  - `aria-label="Toggle menu"` reemplazado por `dict.navbar.menuToggle`.
- `dictionaries/es.json` y `dictionaries/en.json`:
  - agregado `navbar.menuToggle` (ES/EN).

### Prompt 17 — Touch targets / widths / nowrap

- Ajustes puntuales aplicados:
  - Footer íconos sociales: `min-w-[44px] min-h-[44px] ...`
  - Navbar botón contacto: `min-w-[106px] w-auto`
  - Hero CTA: `md:w-auto md:min-w-fit`
  - Footer CTA: `md:w-auto md:min-w-[180px]`

### Prompt 18 — Card heights + “Principios de diseño” mobile

- `AwwwardsProjectCard.tsx`: progresión suave de alturas por breakpoint.
- `src/app/[lang]/digito/page.tsx`: versión mobile de “Principios de diseño” (`block md:hidden`) con el mismo contenido.

### Prompt 19 — Playground stubs → componente reusable

- Se creó `src/components/playground/PlaygroundStubPage.tsx`.
- Se refactorizaron 4 páginas de playground para usar el componente con props.

### Prompt 20 — Rename `Project-card.tsx` → `ProjectCard.tsx`

- Renombrado de archivo a PascalCase y verificación de export.
- Actualización de imports donde aplique.
- Verificación de tracking con helper.

### Prompt 21 — `npm audit` + Next seguro + build

- Se ejecutó `npm audit` y se actualizó Next a **`16.1.7`** (mínima fuera del rango vulnerable citado).
- Se alinearon paquetes Next relacionados para compatibilidad.
- Se mantuvo webpack explícito en build (`next build --webpack`) por `next.config.mjs` con config custom.
- Se ejecutaron `npm install` y `npm run build` (build OK tras fixes necesarios).

### Prompt 22 — Tests E2E con Playwright

- Se agregó Playwright (`@playwright/test`) y scripts:
  - `test`: `playwright test`
  - `test:ui`: `playwright test --ui`
- Se creó `playwright.config.ts` (mínimo, `baseURL` localhost:3000 + `webServer`).
- Se crearon:
  - `tests/navigation.spec.ts`
  - `tests/contact.spec.ts`
  - `tests/pages.spec.ts`
- Se descargó Chromium para Playwright y se corrió la suite completa (verde).

---

## Notas

- Durante Prompt 22 se corrigió un problema de runtime en Next 16: `Footer.tsx` tenía handlers `onClick` y debía ser Client Component. Se agregó `'use client'` al inicio del archivo para evitar el error “Event handlers cannot be passed to Client Component props”.

