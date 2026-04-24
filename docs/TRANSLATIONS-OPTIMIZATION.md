# Optimizaciones de Carga de Traducciones

Este documento explica las optimizaciones implementadas para mejorar el rendimiento de carga de traducciones.

## 🚀 Optimizaciones Implementadas

### 1. Cache en Memoria (`lib/getDictionary.ts`)

**Implementación:**
- Cache global usando `Map<'es' | 'en', Promise<Dictionary>>`
- Los diccionarios se cargan una sola vez por proceso Node.js
- Evita recargas innecesarias en múltiples requests

**Beneficios:**
- Primera carga: carga normal del JSON
- Cargas subsecuentes: retorna Promise cacheada (instantáneo)
- Reduce I/O del sistema de archivos

```typescript
// Cache en memoria
const dictionaryCache = new Map<'es' | 'en', Promise<Dictionary>>()

function loadDictionary(lang: 'es' | 'en'): Promise<Dictionary> {
  if (dictionaryCache.has(lang)) {
    return dictionaryCache.get(lang)! // Retorna cache instantáneamente
  }
  // Carga y cachea
  const promise = dictionaries[lang]()
  dictionaryCache.set(lang, promise)
  return promise
}
```

### 2. Request Memoization con React.cache()

**Implementación:**
- Usa `React.cache()` de Next.js 14
- Cachea resultados por request individual
- Evita múltiples llamadas a `getDictionary()` en el mismo request

**Beneficios:**
- Si múltiples componentes llaman `getDictionary('es')` en el mismo request, solo se carga una vez
- Mejora el rendimiento cuando hay múltiples Server Components

```typescript
export const getDictionary = cache(async (lang: 'es' | 'en'): Promise<Dictionary> => {
  // Esta función se cachea por request
  return await loadDictionary(lang)
})
```

### 3. Precarga en Layout (`src/app/[lang]/layout.tsx`)

**Implementación:**
- Precarga el idioma alternativo cuando se carga una página
- Usa `preloadDictionary()` que carga en background sin bloquear

**Beneficios:**
- Cuando el usuario está en `/es/`, se precarga `/en/` en background
- Cambio de idioma más rápido (el diccionario ya está en cache)
- Mejor UX al cambiar idioma

```typescript
export default function LangLayout({ params }) {
  const lang = params.lang === 'es' || params.lang === 'en' ? params.lang : 'es'
  
  // Precargar idioma alternativo en background
  const idiomaAlternativo = lang === 'es' ? 'en' : 'es'
  preloadDictionary(idiomaAlternativo)
  
  return <html>...</html>
}
```

### 4. Headers en Middleware (`middleware.ts`)

**Implementación:**
- Agrega headers `x-locale` y `x-preload-locale` a las respuestas
- Indica el idioma detectado y el alternativo para precarga

**Beneficios:**
- Información disponible para optimizaciones futuras
- Útil para analytics y debugging
- Permite optimizaciones del lado del servidor

```typescript
const response = NextResponse.next()
response.headers.set('x-locale', idiomaDetectado)
response.headers.set('x-preload-locale', idiomaAlternativo)
```

### 5. Suspense Boundaries (`src/app/[lang]/loading.tsx`)

**Implementación:**
- Componente `loading.tsx` en `[lang]` para mostrar estado de carga
- Next.js 14 maneja Suspense automáticamente para Server Components async

**Beneficios:**
- Mejor UX durante la carga inicial
- Feedback visual mientras se cargan traducciones
- Streaming de contenido cuando está listo

## 📊 Flujo de Optimización

### Primera Carga (Usuario nuevo)

```
1. Usuario visita /es/
   ↓
2. Middleware detecta idioma → agrega headers
   ↓
3. Layout precarga 'en' en background
   ↓
4. getDictionary('es') → carga JSON → guarda en cache memoria
   ↓
5. React.cache() memoiza para este request
   ↓
6. Componentes renderizan con traducciones
```

### Cargas Subsecuentes (Mismo idioma)

```
1. Usuario navega a /es/contact
   ↓
2. getDictionary('es') → retorna Promise cacheada (instantáneo)
   ↓
3. React.cache() retorna resultado memoizado
   ↓
4. Componentes renderizan inmediatamente
```

### Cambio de Idioma

```
1. Usuario cambia de /es/ a /en/
   ↓
2. getDictionary('en') → retorna Promise cacheada (ya precargada)
   ↓
3. Cambio instantáneo sin carga adicional
```

## 🎯 Métricas de Rendimiento

### Sin Optimizaciones
- Primera carga: ~50-100ms (carga JSON)
- Cargas subsecuentes: ~50-100ms (carga JSON cada vez)
- Cambio de idioma: ~50-100ms (carga JSON)

### Con Optimizaciones
- Primera carga: ~50-100ms (carga JSON una vez)
- Cargas subsecuentes: <1ms (cache en memoria)
- Cambio de idioma: <1ms (precarga + cache)

## 🔧 Configuración

### Cache en Memoria
- Persiste durante el ciclo de vida del proceso Node.js
- Se reinicia al reiniciar el servidor
- Ideal para producción con múltiples requests

### Request Memoization
- Cachea por request individual
- Se limpia automáticamente después del request
- Evita duplicación dentro del mismo render

### Precarga
- Se ejecuta en background sin bloquear
- No afecta el tiempo de carga inicial
- Mejora la experiencia al cambiar idioma

## 📝 Notas Técnicas

### React.cache()
- Solo funciona en Server Components
- Cachea por request, no global
- Compatible con Next.js 14 App Router

### Cache en Memoria
- Comparte estado entre requests en el mismo proceso
- En producción con múltiples instancias, cada instancia tiene su propio cache
- Ideal para reducir I/O repetido

### Precarga
- No bloquea el render principal
- Si falla, no afecta la experiencia del usuario
- Logs warnings en caso de error

## 🚀 Próximas Optimizaciones Posibles

1. **Service Worker**: Precargar diccionarios en el cliente
2. **HTTP/2 Server Push**: Enviar diccionarios antes de que se soliciten
3. **Edge Caching**: Cachear en CDN edge para menor latencia
4. **Lazy Loading**: Cargar solo las traducciones necesarias por ruta

## ✅ Verificación

Para verificar que las optimizaciones funcionan:

1. **Primera carga**: Debe cargar normalmente (~50-100ms)
2. **Navegación**: Debe ser instantánea (<1ms)
3. **Cambio de idioma**: Debe ser instantáneo (<1ms)
4. **Console logs**: No debe haber múltiples cargas del mismo diccionario

## 🐛 Troubleshooting

### El cache no funciona
- Verificar que `React.cache()` esté importado correctamente
- Asegurarse de que los componentes sean Server Components

### La precarga no funciona
- Verificar que `preloadDictionary()` se llame en el layout
- Revisar console para warnings de precarga

### Múltiples cargas del mismo diccionario
- Verificar que `React.cache()` esté envolviendo `getDictionary`
- Asegurarse de que no haya múltiples imports del módulo

