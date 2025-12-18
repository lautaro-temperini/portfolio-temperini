# Design Tokens - Portfolio Temperini

## Spacing Scale (Tailwind Default)
- `0.5` = 2px
- `1` = 4px
- `2` = 8px
- `3` = 12px
- `4` = 16px
- `6` = 24px
- `8` = 32px
- `12` = 48px
- `16` = 64px
- `20` = 80px
- `24` = 96px
- `32` = 128px

### Spacing Personalizado
- `touch` = 44px - Touch target mínimo (WCAG 2.1)
  - Uso: `min-h-touch`, `min-w-touch`, `h-touch`, `w-touch`

## Colores
- `primary` = `#8900C3` - Acento principal, CTAs, links   /* Purple */	
- `secondary` = `#595959` - Texto secundario /* Dark gray */
- `accent` = `#A6A6A6` - Texto terciario, placeholders  /* Light gray */
- `background` = `#0D0D0D` - Fondo principal  /* Almost black */
- `light` = `#F2F2F2` - Texto principal claro  /* Almost white */
- `subtle` = `#333333` - Borders sutiles, divisores  /* Border gray */
 
### Uso Recomendado
```tsx
// Texto
<p className="text-light">Principal</p>
<p className="text-accent">Secundario</p>
<p className="text-secondary">Terciario</p>

// Fondos
<div className="bg-background">...</div>

// Bordes
<div className="border border-subtle">Sutil</div>
<div className="border border-subtle/50">Más sutil</div>
<div className="border border-primary">Primario</div>

// Accesibilidad
<button className="min-h-touch min-w-touch">Click</button>
```

## Border Radius
- `rounded-sm` = 4px - Badges, pequeños elementos
- `rounded-md` = 8px - Default, botones, inputs
- `rounded-lg` = 12px - Cards, containers
- `rounded-xl` = 16px - Cards destacados
- `rounded-2xl` = 24px - Secciones grandes

## Typography
Usar clases `.fluid-text-*` para escalado responsive:
- `.fluid-text-base` - Body text (16-18px)
- `.fluid-text-lg` - Subtítulos (18-20px)
- `.fluid-text-xl` - Destacados (20-24px)
- `.fluid-text-2xl` - Títulos sección (24-32px)
- `.fluid-text-4xl` - Títulos principales (36-48px)
- `.fluid-text-6xl` - Hero titles (60-88px)

## Cuándo usar tokens vs hardcode

### ✅ Usar tokens cuando:
- Spacing estructural se repite 3+ veces
- Colores de la paleta principal
- Border radius estándar (sm, md, lg, xl, 2xl)
- Touch targets interactivos (botones, links)
- Valores que necesitan cambiar globalmente

### ❌ Mantener hardcodeado cuando:
- Posiciones absolutas calculadas (`top-[73px]`)
- Grid columns específicos (`grid-cols-[1fr_380px_1fr]`)
- Valores únicos (<3 apariciones)
- Viewport heights de layout (`h-[60vh]`)
- Ajustes ópticos (`tracking-[-0.02em]`, `mt-[-4px]`)
- Valores con `calc()` o `clamp()`
- Magic numbers que funcionan

### Ejemplos

**✅ Sistematizar:**
```tsx
// ANTES
<Card className="p-[24px] rounded-[12px] border-[#333]" />

// DESPUÉS
<Card className="p-6 rounded-lg border-subtle" />
```

**❌ NO tocar:**
```tsx
// Mantener - posición calculada específica
<div className="absolute top-[73px] left-1/2" />

// Mantener - grid específico
<div className="grid-cols-[280px_1fr_380px]" />

// Mantener - viewport height de diseño
<section className="h-[60vh]" />
```

## Recursos
- Config completo: `tailwind.config.js`
- CSS utilities: `globals.css`
- Reportes de auditoría: `AUDITORIA-DESIGN-TOKENS.md`