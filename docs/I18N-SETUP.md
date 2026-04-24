# Guía de Reestructuración i18n - Next.js 14 App Router

## ✅ Reestructuración Completada

El proyecto ha sido reestructurado para soportar i18n nativo con rutas `/[lang]/`. 

### Estructura Final

```
src/app/
├── layout.tsx                    # Layout raíz (solo wrappers globales)
├── [lang]/
│   ├── layout.tsx                # Layout localizado (recibe params.lang)
│   ├── page.tsx                  # Home localizado
│   ├── contact/
│   ├── digito/
│   ├── playground/
│   ├── levelup/
│   ├── rectofinal/
│   ├── vorterix/
│   ├── gloryfit/
│   └── under-construction/
```

## 🔧 Cambios Realizados

### 1. Layout Raíz (`src/app/layout.tsx`)
- Solo contiene wrappers globales: fonts, theme, body
- Mantiene metadata global
- Establece `lang="es"` por defecto en el HTML

### 2. Layout Localizado (`src/app/[lang]/layout.tsx`)
- Recibe `params.lang` de la ruta dinámica
- Envuelve el contenido (no puede tener `<html>` en Next.js 14)

### 3. Todas las Páginas
- Adaptadas para recibir `params: { lang: string }`
- Preparadas para usar `params.lang` en contenido localizado (TODO pendiente)

## 🧪 Cómo Probar las Rutas

### 1. Iniciar el servidor de desarrollo

```powershell
npm run dev
```

### 2. Probar Redirecciones Automáticas

El middleware redirige automáticamente todas las rutas sin prefijo de idioma:

**Pruebas básicas:**
- `http://localhost:3000/` → Redirige a `http://localhost:3000/es/` o `http://localhost:3000/en/`
- `http://localhost:3000/contact` → Redirige a `http://localhost:3000/es/contact` o `http://localhost:3000/en/contact`
- `http://localhost:3000/playground` → Redirige a `http://localhost:3000/es/playground` o `http://localhost:3000/en/playground`

**Detección de idioma:**
- Si tienes cookie `NEXT_LOCALE=es` → Redirige a `/es/...`
- Si tienes cookie `NEXT_LOCALE=en` → Redirige a `/en/...`
- Si no hay cookie, usa `Accept-Language` header del navegador
- Por defecto: `es`

### 3. Probar Rutas Bloqueadas

Las rutas `/playground`, `/levelup`, `/rectofinal` están bloqueadas sin cookie `bypass-construccion`:

**Sin cookie:**
- `http://localhost:3000/es/playground` → Redirige a `http://localhost:3000/es/under-construction`
- `http://localhost:3000/en/playground` → Redirige a `http://localhost:3000/en/under-construction`

**Con cookie (para testing):**
```javascript
// En la consola del navegador:
document.cookie = "bypass-construccion=true; path=/"
```
Luego las rutas bloqueadas funcionarán normalmente.

### 4. Verificar Assets Excluidos

Estos no deben ser redirigidos:
- `http://localhost:3000/_next/static/...` ✅ Funciona
- `http://localhost:3000/favicon.ico` ✅ Funciona
- `http://localhost:3000/images/...` ✅ Funciona
- `http://localhost:3000/api/...` ✅ Funciona

### 5. Probar Cambio de Idioma

**Opción 1: Cookie**
```javascript
// Establecer idioma español
document.cookie = "NEXT_LOCALE=es; path=/"
location.reload()

// Establecer idioma inglés
document.cookie = "NEXT_LOCALE=en; path=/"
location.reload()
```

**Opción 2: Navegación directa**
- `http://localhost:3000/es/contact` → Español
- `http://localhost:3000/en/contact` → Inglés

## 📋 Checklist de Verificación

- [ ] Todas las rutas redirigen correctamente a `/[lang]/ruta`
- [ ] El idioma se detecta correctamente (cookie > header > default)
- [ ] Las rutas bloqueadas redirigen a `/under-construction` sin cookie
- [ ] Las rutas bloqueadas funcionan con cookie `bypass-construccion`
- [ ] Los assets estáticos no son redirigidos
- [ ] Las páginas reciben correctamente `params.lang`
- [ ] No hay errores en la consola del navegador
- [ ] No hay errores de TypeScript

## 🐛 Troubleshooting

### Error: "Cannot find module"
- Verifica que las importaciones usen rutas absolutas con `@/` cuando sea posible
- Ejemplo: `import Navbar from "@/components/1 Navbar/Navbar"`

### Las rutas no redirigen
- Verifica que el middleware esté en la raíz del proyecto (`middleware.ts`)
- Verifica que el matcher del middleware incluya las rutas correctas

### Error de TypeScript con params
- Asegúrate de que todas las páginas tengan la firma correcta:
```typescript
export default function PageName({
  params,
}: {
  params: { lang: string }
}) {
  // ...
}
```

## 📝 Próximos Pasos

1. **Implementar contenido localizado**: Usar `params.lang` en cada página para mostrar contenido en español o inglés
2. **Crear sistema de traducciones**: Considerar usar `next-intl` o un sistema de traducciones propio
3. **Actualizar metadata**: Adaptar `metadata` en cada página según el idioma
4. **Actualizar URLs en metadata**: Incluir el prefijo `/[lang]/` en las URLs de OpenGraph y Twitter

## 📚 Referencias

- [Next.js 14 App Router - Internationalization](https://nextjs.org/docs/app/building-your-application/routing/internationalization)
- [Next.js Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware)

