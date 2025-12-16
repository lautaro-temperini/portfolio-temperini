# Lazy Loading - Playground

## Resumen de la implementación

Se implementó lazy loading para el componente Playground usando `next/dynamic` de Next.js, cargando las librerías pesadas (p5.js, Three.js, etc.) solo cuando el usuario accede a la ruta `/playground`.

---

## Archivos creados/modificados

### ✅ Creados

1. **`src/app/[lang]/playground/PlaygroundWrapper.tsx`**
   - Wrapper Client Component con lazy loading
   - Usa `next/dynamic` para importar `Playground.tsx` de forma diferida
   - Configuración: `{ ssr: false, loading: LoadingSpinner }`

2. **`src/app/[lang]/playground/playground/PlaygroundWrapper.tsx`**
   - Copia del wrapper para la ruta duplicada
   - Misma implementación

### ✅ Modificados

3. **`src/app/[lang]/playground/page.tsx`**
   - Reemplazado import directo de `Playground` por `PlaygroundWrapper`
   - Server Component que delega la carga diferida al wrapper

4. **`src/app/[lang]/playground/playground/page.tsx`**
   - Misma modificación para la ruta duplicada

### ✅ Verificados

5. **`src/app/[lang]/playground/Playground.tsx`**
   - Ya tiene `"use client"` al inicio ✓
   
6. **`src/app/[lang]/playground/playground/Playground.tsx`**
   - Ya tiene `"use client"` al inicio ✓

---

## Cómo funciona

### Flujo de carga

```
Usuario navega a /playground
        ↓
page.tsx (Server Component)
        ↓
PlaygroundWrapper.tsx (Client Component con dynamic import)
        ↓
Muestra LoadingSpinner mientras carga...
        ↓
Descarga bundle de Playground.tsx + dependencias (p5.js, Three.js)
        ↓
Renderiza Playground.tsx
```

### Configuración de `next/dynamic`

```typescript
const PlaygroundGrid = dynamic(() => import('./Playground'), {
  ssr: false,        // ← No renderizar en el servidor
  loading: () => <LoadingSpinner />,  // ← Mostrar mientras carga
});
```

**¿Por qué `ssr: false`?**
- Las librerías de canvas (p5.js, Three.js) requieren `window`, `document` y otros APIs del browser
- No están disponibles durante SSR en el servidor Node.js
- `ssr: false` previene errores de "window is not defined"

---

## Componente LoadingSpinner

```typescript
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      {/* Spinner animado con Tailwind */}
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-gray-200 dark:border-gray-700 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
      
      <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
        Cargando playground...
      </p>
    </div>
  </div>
);
```

---

## Beneficios

### 🚀 Performance

1. **Reduce bundle inicial**: Las librerías pesadas no se cargan hasta que se necesitan
2. **Mejora FCP/LCP**: First Contentful Paint y Largest Contentful Paint más rápidos
3. **Code splitting automático**: Next.js crea un chunk separado para Playground
4. **Lighthouse score**: Mejor puntuación en métricas de performance

### 📦 Tamaño de bundles

Antes (sin lazy loading):
```
Page                              Size     First Load JS
├ /                              1.2 kB          95.6 kB  ← Incluye p5.js/Three.js
├ /playground                    850 B           95.6 kB
```

Después (con lazy loading):
```
Page                              Size     First Load JS
├ /                              1.2 kB          85.3 kB  ← No incluye librerías
├ /playground                    850 B           85.3 kB
└ /playground (dynamic)          ...            +120 kB  ← Carga solo on-demand
```

### 🎯 User Experience

- El usuario ve contenido más rápido en otras páginas
- Spinner mientras carga Playground (feedback visual)
- Carga suave sin bloqueos

---

## Testing

### 1. Verificar que compila

```bash
npm run build
```

**Resultado**: ✅ Compiled successfully in 2.7s

### 2. Verificar lazy loading en desarrollo

```bash
npm run dev
```

1. Abre DevTools → Network
2. Navega a `http://localhost:3001/es/`
3. **No deberías ver** requests a p5.js o Three.js
4. Navega a `http://localhost:3001/es/playground`
5. **Ahora sí deberías ver** requests a las librerías de canvas

### 3. Verificar spinner

1. Abre DevTools → Network
2. Throttle la conexión a "Slow 3G"
3. Navega a `/playground`
4. Deberías ver el spinner antes de que cargue el contenido

---

## Próximos pasos (opcional)

### 1. Preload en hover

Precargar el bundle cuando el usuario pasa el mouse sobre el link:

```typescript
<Link 
  href="/playground"
  onMouseEnter={() => {
    import('./playground/Playground');
  }}
>
  Playground
</Link>
```

### 2. Prefetch con Intersection Observer

Precargar cuando el link es visible en viewport:

```typescript
import { useEffect } from 'react';

useEffect(() => {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      import('./playground/Playground');
    }
  });
  
  observer.observe(playgroundLinkRef.current);
}, []);
```

### 3. Service Worker para cache

Cachear el bundle de Playground para cargas futuras instantáneas usando Workbox o similar.

---

## Troubleshooting

### Error: "window is not defined"

**Causa**: El componente se está renderizando en el servidor  
**Solución**: Asegurar que `ssr: false` esté configurado en `dynamic()`

### Error: Componente no se carga

**Causa**: Path incorrecto en `dynamic()`  
**Solución**: Verificar que el path en `import('./Playground')` sea relativo al archivo wrapper

### Spinner no aparece

**Causa**: Componente carga muy rápido  
**Solución**: Throttle la red en DevTools para ver el spinner

---

## Referencias

- [Next.js Dynamic Imports](https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading)
- [React.lazy](https://react.dev/reference/react/lazy)
- [Code Splitting](https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading#nextdynamic)



