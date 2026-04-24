# Auditoría de Design Tokens - Portfolio Next.js

**Fecha:** 2024  
**Alcance:** Archivos `.tsx` y `.jsx` en `src/`  
**Objetivo:** Identificar valores hardcodeados candidatos a sistematización

---

## 📊 Resumen Ejecutivo

- **Total de valores hardcodeados encontrados:** ~150+ instancias
- **Candidatos a sistematización (3+ repeticiones):** 12 valores
- **Valores únicos/específicos (preservar):** ~100+ valores
- **Valores en contextos especiales (preservar):** ~40+ valores

---

## ✅ CANDIDATOS A SISTEMATIZACIÓN (3+ repeticiones)

### 1. Spacing - Padding/Margin

| Hardcoded | Token Tailwind | Frecuencia | Contexto | Acción |
|-----------|----------------|-----------|----------|--------|
| `h-[40px]` | `h-10` | 8+ veces | Botones, inputs | ✅ **SISTEMATIZAR** |
| `min-h-[44px]` | `min-h-11` | 12+ veces | Botones accesibles | ⚠️ **VERIFICAR** (44px = touch target) |
| `px-[10px]` | `px-2.5` | 3 veces | Padding específico | ✅ **SISTEMATIZAR** |
| `py-[4px]` | `py-1` | 3 veces | Padding vertical pequeño | ✅ **SISTEMATIZAR** |

### 2. Alturas Viewport

| Hardcoded | Token Tailwind | Frecuencia | Contexto | Acción |
|-----------|----------------|-----------|----------|--------|
| `h-[60vh]` | - | 5 veces | Hero sections | ⚠️ **MANTENER** (específico de layout) |
| `h-[70vh]` | - | 6 veces | Imágenes/secciones | ⚠️ **MANTENER** (específico de layout) |
| `h-[150px]` | - | 1 vez | Secondary cards mobile | ⚠️ **MANTENER** (único) |
| `h-[240px]` | - | 1 vez | Secondary cards tablet | ⚠️ **MANTENER** (único) |
| `h-[260px]` | - | 1 vez | Secondary cards desktop | ⚠️ **MANTENER** (único) |

### 3. Border Radius

| Hardcoded | Token Tailwind | Frecuencia | Contexto | Acción |
|-----------|----------------|-----------|----------|--------|
| `rounded-[15px]` | `rounded-[15px]` | 2 veces | TiltedCard específico | ⚠️ **MANTENER** (único) |
| `rounded-[4px]` | `rounded-sm` | 3 veces | Badges pequeños | ✅ **SISTEMATIZAR** |

### 4. Colores Hex Hardcodeados

| Hardcoded | Token Tailwind | Frecuencia | Contexto | Acción |
|-----------|----------------|-----------|----------|--------|
| `text-[#F2F2F2]` | `text-light` | 50+ veces | Texto principal | ✅ **SISTEMATIZAR** |
| `text-[#A6A6A6]` | `text-accent` | 15+ veces | Texto secundario | ✅ **SISTEMATIZAR** |
| `text-[#595959]` | `text-secondary` | 10+ veces | Texto terciario | ✅ **SISTEMATIZAR** |
| `bg-[#0D0D0D]` | `bg-background` | 20+ veces | Fondo principal | ✅ **SISTEMATIZAR** |
| `bg-[#181818]` | - | 3 veces | Fondo inputs | ⚠️ **VERIFICAR** (puede ser `bg-surface`) |
| `border-[#333]` | `border-[#333]` | 15+ veces | Bordes sutiles | ⚠️ **MANTENER** (no hay token equivalente) |
| `border-[#8900C3]` | `border-primary` | 5+ veces | Bordes primarios | ✅ **SISTEMATIZAR** |

### 5. Shadows

| Hardcoded | Token Tailwind | Frecuencia | Contexto | Acción |
|-----------|----------------|-----------|----------|--------|
| `shadow-[0px_8px_35px_rgba(115,0,165,0.18)]` | - | 4 veces | Hover cards | ⚠️ **MANTENER** (shadow específica) |
| `shadow-[0px_4px_25px_rgba(115,0,165,0.25)]` | - | 3 veces | Botones primarios | ⚠️ **MANTENER** (shadow específica) |

### 6. Z-Index

| Hardcoded | Token Tailwind | Frecuencia | Contexto | Acción |
|-----------|----------------|-----------|----------|--------|
| `z-[9999]` | `z-[9999]` | 2 veces | Navbar | ⚠️ **MANTENER** (específico) |
| `z-[99999]` | `z-[99999]` | 1 vez | Scroll to top | ⚠️ **MANTENER** (único) |

### 7. Widths Específicos

| Hardcoded | Token Tailwind | Frecuencia | Contexto | Acción |
|-----------|----------------|-----------|----------|--------|
| `max-w-[605px]` | - | 1 vez | Hero title | ⚠️ **MANTENER** (único) |
| `max-w-[500px]` | - | 1 vez | Hero subtitle | ⚠️ **MANTENER** (único) |
| `min-w-[257px]` | - | 1 vez | Botón CTA | ⚠️ **MANTENER** (único) |
| `w-[45%]` | - | 1 vez | Perfil imagen | ⚠️ **MANTENER** (único) |

---

## ❌ VALORES PRESERVADOS (NO SISTEMATIZAR)

### 1. Posiciones Absolutas Calculadas

```tsx
// ✅ PRESERVAR - Valores específicos de layout
className="absolute top-[73px] left-1/2"
className="fixed bottom-2 md:bottom-4 right-6 md:right-12"
className="xl:w-[45%]"
```

**Justificación:** Valores calculados para posicionamiento específico.

### 2. Alturas Viewport Específicas

```tsx
// ✅ PRESERVAR - Alturas específicas de secciones
className="h-[60vh]"  // Hero sections
className="h-[70vh]"  // Imágenes grandes
className="h-[700px]" // Contenedores específicos
className="h-[800px]" // Contenedores específicos
```

**Justificación:** Alturas específicas de diseño, no valores estructurales repetidos.

### 3. Valores Únicos (1-2 apariciones)

```tsx
// ✅ PRESERVAR - Valores únicos
className="h-[150px]"      // Secondary cards mobile
className="text-[28px]"     // Tipografía específica
className="text-[32px]"     // Tipografía específica
className="leading-[36px]"  // Line height específico
className="leading-[40px]"  // Line height específico
className="xl:text-[160px]" // Título gigante
className="2xl:text-[200px]" // Título gigante
```

**Justificación:** Valores únicos que no se repiten 3+ veces.

### 4. Magic Numbers Funcionales

```tsx
// ✅ PRESERVAR - Valores calculados
className="grid-cols-[1fr_380px_1fr]"
className="w-[calc(100%-64px)]"
className="tracking-[0.15em]"
className="mt-[-4px]"
```

**Justificación:** Valores calculados o ajustes ópticos específicos.

### 5. Shadows Específicas

```tsx
// ✅ PRESERVAR - Shadows con valores específicos
className="shadow-[0px_8px_35px_rgba(115,0,165,0.18)]"
className="shadow-[0px_4px_25px_rgba(115,0,165,0.25)]"
className="shadow-[0px_6px_30px_rgba(115,0,165,0.4)]"
```

**Justificación:** Shadows con valores específicos de diseño, no coinciden con tokens estándar.

### 6. Border Radius Específicos

```tsx
// ✅ PRESERVAR - Border radius específicos
className="rounded-[15px]"  // TiltedCard específico
className="rounded-[4px]"   // Badge específico (aunque aparece 3 veces, es específico)
```

**Justificación:** Valores específicos de componentes únicos.

---

## 🎯 PLAN DE ACCIÓN

### Fase 1: Reemplazos de Colores (Alta Prioridad)

**Impacto:** Alto - Mejora consistencia visual  
**Archivos afectados:** ~30 archivos

1. `text-[#F2F2F2]` → `text-light` (50+ instancias)
2. `text-[#A6A6A6]` → `text-accent` (15+ instancias)
3. `text-[#595959]` → `text-secondary` (10+ instancias)
4. `bg-[#0D0D0D]` → `bg-background` (20+ instancias)
5. `border-[#8900C3]` → `border-primary` (5+ instancias)

### Fase 2: Spacing Estructural (Media Prioridad)

**Impacto:** Medio - Mejora mantenibilidad  
**Archivos afectados:** ~10 archivos

1. `h-[40px]` → `h-10` (8+ instancias)
2. `px-[10px]` → `px-2.5` (3 instancias)
3. `py-[4px]` → `py-1` (3 instancias)

### Fase 3: Border Radius (Baja Prioridad)

**Impacto:** Bajo - Mejora mínima  
**Archivos afectados:** ~3 archivos

1. `rounded-[4px]` → `rounded-sm` (3 instancias)

---

## 📝 NOTAS IMPORTANTES

### ⚠️ Casos Especiales que Requieren Decisión

1. **`min-h-[44px]`** (12+ instancias)
   - **Contexto:** Touch target mínimo para accesibilidad
   - **Decisión:** ¿Crear token `min-h-touch` o mantener hardcodeado?
   - **Recomendación:** Mantener hardcodeado (es estándar de accesibilidad)

2. **`border-[#333]`** (15+ instancias)
   - **Contexto:** Bordes sutiles que no tienen token equivalente
   - **Decisión:** ¿Agregar token `border-subtle` o mantener?
   - **Recomendación:** Agregar token si se usa frecuentemente

3. **`bg-[#181818]`** (3 instancias)
   - **Contexto:** Fondo de inputs
   - **Decisión:** ¿Es `bg-surface` o necesita token propio?
   - **Recomendación:** Verificar si coincide con `surface` en tokens

### ✅ Valores que NO se tocarán

- Valores en `style={{ }}` props
- Valores dentro de funciones de animación
- Valores con `calc()` o `clamp()`
- Valores únicos (1-2 apariciones)
- Valores en posicionamiento absoluto/fijo específico
- Shadows con valores específicos de diseño

---

## 📈 Estadísticas Finales

- **Valores sistematizados:** ~12 valores
- **Valores preservados:** ~140+ valores
- **Archivos a modificar:** ~35 archivos
- **Impacto estimado:** Medio-Alto (mejora consistencia visual principalmente)

---

## 🚀 Próximos Pasos

1. ✅ **Aprobación del reporte** - Revisar y aprobar cambios sugeridos
2. ⏳ **Fase 1: Colores** - Reemplazar colores hex por tokens
3. ⏳ **Fase 2: Spacing** - Reemplazar spacing estructural
4. ⏳ **Fase 3: Border Radius** - Reemplazar border radius repetidos
5. ⏳ **Testing** - Verificar que no se rompió nada visualmente
6. ⏳ **Documentación** - Actualizar `design-tokens.md` con nuevos tokens si es necesario

---

**¿Proceder con la Fase 1 (Colores)?** Esta es la fase de mayor impacto y menor riesgo.

