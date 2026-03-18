# Reporte de auditoría del proyecto

> Formato de issue: **archivo**, **línea aprox**, **severidad** (crítico/medio/bajo), **sugerencia de fix**.

## Código

### TODOs / stubs repetidos
- **archivo**: `src/app/[lang]/playground/recto-final/page.tsx` (≈L47–53)  
  **severidad**: bajo  
  **issue**: `TODO: agregar descripción del proyecto` / placeholders.  
  **fix**: completar contenido o centralizar en un `PlaygroundStubPage` y pasar props.

- **archivo**: `src/app/[lang]/playground/dibujar-voz/page.tsx` (≈L44–50)  
  **severidad**: bajo  
  **issue**: mismo stub TODO.  
  **fix**: idem.

- **archivo**: `src/app/[lang]/playground/light-the-byte/page.tsx` (≈L47–53)  
  **severidad**: bajo  
  **issue**: mismo stub TODO.  
  **fix**: idem.

- **archivo**: `src/app/[lang]/playground/obra-generativa/page.tsx` (≈L49–55)  
  **severidad**: bajo  
  **issue**: mismo stub TODO.  
  **fix**: idem.

### Bloques deshabilitados / comentados (código “muerto” efectivo)
- **archivo**: `src/components/navbar/Navbar.tsx` (≈L253–296)  
  **severidad**: medio  
  **issue**: links “Proyectos” deshabilitados con `false && (...)` (desktop y mobile).  
  **fix**: eliminar estado/observer/handler asociado si no se usa, o reemplazar por feature flag real.

- **archivo**: `src/components/navbar/Navbar.tsx` (≈L264–275 y ≈L360–377)  
  **severidad**: bajo  
  **issue**: bloque “Playground” comentado; existe handler `handlePlaygroundClick` sin UI activa.  
  **fix**: borrar handler + imports si no se usa, o reactivar con flag.

### Código muerto probable / handlers no conectados
- **archivo**: `src/components/projects/Project-card.tsx` (≈L40–49)  
  **severidad**: bajo  
  **issue**: `handleProjectClick` (GA4) definido pero (probablemente) no está enganchado a ningún `onClick`; `sendGAEvent` puede quedar sin uso.  
  **fix**: conectar `onClick={handleProjectClick}` al `Link` o eliminar handler + import.

### Inconsistencias / duplicación
- **archivo**: `src/components/projects/Project-card.tsx` (nombre de archivo)  
  **severidad**: bajo  
  **issue**: naming inconsistente (archivo con guión vs PascalCase en el resto).  
  **fix**: unificar convención (p.ej. `ProjectCard.tsx`).

- **archivo**: `src/components/projects/AwwwardsProjectCard.tsx` (≈L40–49) y `src/components/projects/Project-card.tsx` (≈L40–49)  
  **severidad**: bajo  
  **issue**: duplicación de payload/evento GA4.  
  **fix**: extraer helper `trackProjectClick({slug,title,location})`.

### Logs en código
- **archivo**: `src/middleware.ts` (≈L198–203 y ≈L290–296)  
  **severidad**: medio  
  **issue**: `console.log`/logs en middleware (edge) generan ruido y posible exposición.  
  **fix**: gatear por `NODE_ENV !== 'production'` o remover.

- **archivo**: `src/app/api/contact/route.ts` (≈L365 / ≈L377 / ≈L389)  
  **severidad**: bajo  
  **issue**: logs de éxito/errores en API.  
  **fix**: mantener `console.error` si hace falta, pero evitar `console.log` de éxito en prod o usar logger con niveles.

## UI/UX

- **archivo**: `src/components/navbar/Navbar.tsx` (varios) y `src/components/footer/Footer.tsx` (varios)  
  **severidad**: medio  
  **issue**: gradientes/sombras hardcodeadas en `style={{...}}` repetidas en CTAs; dificulta consistencia de estados.  
  **fix**: centralizar en tokens/utilities (`btn-primary` + variables CSS / Tailwind theme).

- **archivo**: `src/components/LanguageSelector.tsx` (≈L95–130) vs CTAs en navbar/footer  
  **severidad**: bajo  
  **issue**: patrones distintos de focus/hover/active.  
  **fix**: estandarizar un set de utilities para foco visible y hover en controles principales.

## SEO

- **archivo**: `src/app/layout.tsx` (≈L78–85 y ≈L190–195)  
  **severidad**: crítico  
  **issue**: `validLang = 'es'` fuerza `lang` del `<html>` y JSON-LD en ES incluso en rutas `/en/...`.  
  **fix**: derivar el idioma desde `params.lang` en layout por idioma (p.ej. `src/app/[lang]/layout.tsx`) y setear `<html lang>`/JSON-LD por idioma.

- **archivo**: `src/app/[lang]/page.tsx` (≈L8–16)  
  **severidad**: alto  
  **issue**: canonical `'/’` (home) pero la ruta real vive en `/{lang}` ⇒ canonical i18n potencialmente incorrecto.  
  **fix**: canonical por idioma y (ideal) `alternates.languages`.

- **archivo**: `src/app/layout.tsx` (≈L47–58)  
  **severidad**: medio  
  **issue**: `metadataBase` y `openGraph.url` apuntan a dominios distintos.  
  **fix**: unificar dominio (o parametrizar por env) para OG/canonicals consistentes.

## Performance

- **archivo**: `src/components/projects/FeaturedProjectCard.tsx` (≈L43–53)  
  **severidad**: alto  
  **issue**: `<Image ... priority />` en background grande sin control de “above the fold”.  
  **fix**: hacer `priority` condicional (solo el primer elemento visible).

- **archivo**: `src/components/projects/FeaturedProjectCard.tsx` (≈L76–82)  
  **severidad**: medio  
  **issue**: logo con `fill` sin `sizes`.  
  **fix**: agregar `sizes` o usar `width/height`.

- **archivo**: `src/app/layout.tsx` (≈L13–15)  
  **severidad**: medio  
  **issue**: `preloadDictionary('es')` + `preloadDictionary('en')` siempre.  
  **fix**: precargar solo el idioma actual y diferir el alternativo (idle / on demand).

## Accesibilidad

- **archivo**: `src/components/fxscripts/GlareHover.tsx` (≈L137–149)  
  **severidad**: crítico  
  **issue**: wrapper con `aria-hidden="true"` hace que todo el contenido hijo sea invisible para lectores de pantalla.  
  **fix**: remover `aria-hidden` del contenedor; dejarlo solo en overlays decorativos.

- **archivo**: `src/app/[lang]/contact/ContactForm.tsx` (≈L334–339, ≈L363–368, ≈L393–409)  
  **severidad**: alto  
  **issue**: clases `focus-visible:-visible:-visible::...` inválidas + `*:focus { outline: none; }` ⇒ foco puede ser imperceptible.  
  **fix**: usar clases válidas (`focus-visible:ring-2`, etc.) o evitar anular outline globalmente.

- **archivo**: `src/app/[lang]/contact/SpotlightCard.tsx` (≈L145–173)  
  **severidad**: alto  
  **issue**: maneja `onFocus/onBlur` pero `<div>` no es focusable (sin `tabIndex`).  
  **fix**: agregar `tabIndex={0}` y estilo de foco o quitar lógica de focus si es decorativa.

- **archivo**: `src/components/navbar/Navbar.tsx` (≈L226–230, ≈L343–349)  
  **severidad**: medio  
  **issue**: `aria-label` hardcodeado (no localizado) y “Toggle menu” en inglés aunque `lang` sea ES.  
  **fix**: usar `dict` para labels accesibles ES/EN.

## Seguridad

- **archivo**: `src/middleware.ts` (≈L133–151)  
  **severidad**: alto  
  **issue**: CSP incluye `'unsafe-inline'` y `'unsafe-eval'`, lo que debilita el modelo de `nonce`.  
  **fix**: endurecer CSP (remover `unsafe-inline` y si es posible `unsafe-eval`), usar `nonce-${nonce}` en `script-src`/`style-src`.

- **archivo**: `src/app/layout.tsx` (≈L211–215, ≈L217–222)  
  **severidad**: bajo  
  **issue**: `dangerouslySetInnerHTML` para CSS crítico y JSON-LD (superficie sensible).  
  **fix**: mantener solo con contenido 100% controlado y CSP más estricta.

## Internacionalización (i18n)

- **archivo**: `dictionaries/es.json` y `dictionaries/en.json`  
  **severidad**: medio  
  **issue**: estructura de keys debe mantenerse idéntica ES/EN. Se corrigió el desvío en `en.json` para igualar a `es.json`.  
  **fix**: agregar un chequeo automático (script) que falle CI si se desalinean keys.

- **archivo**: `src/app/[lang]/about/page.tsx` (≈L60–106)  
  **severidad**: alto  
  **issue**: contenido grande hardcodeado en objeto `content` en lugar de diccionario.  
  **fix**: mover a `dictionaries/*` (o MDX por idioma) y tiparlo.

- **archivo**: `src/components/footer/Footer.tsx` (≈L78–92)  
  **severidad**: medio  
  **issue**: fallbacks hardcodeados en ES aunque `lang` sea EN si `dict` es `undefined`.  
  **fix**: fallbacks por idioma o hacer `dict` requerido.

## Analytics y tracking

- **archivo**: `src/components/footer/Footer.tsx` (≈L43–51)  
  **severidad**: medio  
  **issue**: existe `handleTalkButtonClick` pero el CTA del footer no dispara el evento (se pierde tracking).  
  **fix**: enganchar `onClick={handleTalkButtonClick}` al CTA si se quiere trackear ese click.

- **archivo**: múltiples (`Navbar.tsx`, `FeaturedProjectCard.tsx`, `ContactForm.tsx`)  
  **severidad**: medio  
  **issue**: esquema de params GA4 no estandarizado (uso de `event_category/event_label` estilo UA).  
  **fix**: definir spec de eventos y normalizar params (location/label/lang/status).

- **archivo**: `src/app/layout.tsx` (≈L237–238)  
  **severidad**: medio  
  **issue**: `process.env.NEXT_PUBLIC_GA_ID!` puede romper si la env falta.  
  **fix**: render condicional si no hay GA ID.

## Consistencia de componentes

- **archivo**: `src/components/projects/AwwwardsProjectCard.tsx` vs `src/components/projects/Project-card.tsx`  
  **severidad**: bajo  
  **issue**: cards similares con estilos/patrones distintos (tracking, tamaños, responsive).  
  **fix**: unificar API (props) y extraer piezas compartidas (tags, footer, tracking).

## Dependencias

- **archivo**: `package.json` / `npm audit`  
  **severidad**: medio  
  **issue**: `next` tiene 1 vulnerabilidad moderada reportada por `npm audit` (advisories sobre rewrites y cache de `next/image`), con fix disponible.  
  **fix**: actualizar `next` a una versión fuera del rango vulnerable (según advisory).

## Testing

- **archivo**: repo (`**/*.{test,spec}.*`, `__tests__`)  
  **severidad**: medio  
  **issue**: no se encontraron archivos de tests.  
  **fix**: agregar suite mínima (smoke tests para navegación i18n, contacto, y render de páginas principales).

## Responsividad

### 1) Botón Contacto en Navbar con ancho fijo
- **archivo**: `src/components/navbar/Navbar.tsx` (≈L306 y ≈L391)  
  **severidad**: medio  
  **issue**: `w-[106px]` puede cortar texto si cambia (EN/copy).  
  **fix**: usar `min-w-[106px]` o `w-auto` + `min-w` y dejar que el contenido determine el ancho.

### 2) Saltos de altura bruscos en cards (mobile → md)
- **archivo**: `src/components/projects/AwwwardsProjectCard.tsx` (≈L61–64)  
  **severidad**: medio  
  **issue**: `h-[150px] md:h-[320px] lg:h-[380px]` (cambio abrupto).  
  **fix**: usar `aspect-*` o progresión más suave (`sm:` intermedio).

### 3) Sección oculta en mobile sin alternativa explícita
- **archivo**: `src/app/[lang]/digito/page.tsx` (≈L475–496)  
  **severidad**: medio  
  **issue**: `hidden md:block` en “Principios de diseño” puede eliminar contenido en mobile.  
  **fix**: agregar versión `md:hidden` o hacer layout responsive sin ocultar.

### 4) Touch targets debajo de 44×44 en íconos sociales
- **archivo**: `src/components/footer/Footer.tsx` (≈L100–110)  
  **severidad**: medio  
  **issue**: `w-10 h-10` (40×40) < 44×44 recomendado.  
  **fix**: subir tamaño o usar `min-w-touch min-h-touch`.

### 5) `whitespace-nowrap` en CTAs (riesgo de overflow)
- **archivo**: `src/components/navbar/Navbar.tsx` (≈L314/≈L399), `src/components/footer/Footer.tsx` (≈L90–92)  
  **severidad**: bajo  
  **issue**: evita wrap y combinado con anchos fijos puede cortar.  
  **fix**: permitir wrap en mobile o evitar anchos fijos.

### 6) CTA Hero con min-width fijo en md
- **archivo**: `src/components/hero/HeroContent.tsx` (≈L89–92)  
  **severidad**: bajo  
  **issue**: `md:min-w-[257px]` puede empujar layouts estrechos.  
  **fix**: cambiar a `min-w-fit` / controlar con `max-w`/`w-auto`.

### 7) CTA Footer con ancho fijo en md
- **archivo**: `src/components/footer/Footer.tsx` (≈L80–83)  
  **severidad**: bajo  
  **issue**: `md:w-[220px]` no escala con copy.  
  **fix**: `md:w-auto md:min-w-[...]` o `md:max-w-fit`.

## Resumen (conteo por severidad)

- **crítico**: 2  
  - `GlareHover` con `aria-hidden` envolviendo hijos (A11y)  
  - `<html lang>` hardcodeado en layout (SEO/i18n)
- **medio**: 11  
  - Incluye **Responsividad: 4** (Navbar width fijo, alturas cards, sección oculta, touch targets)  
  - + CSP laxa, canonical i18n, focus roto en ContactForm, Spotlight focus, logs middleware, etc.
- **bajo**: 15  
  - TODOs/stubs, duplicación menor, `dangerouslySetInnerHTML` controlado, etc.

