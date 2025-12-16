// ============================================================================
// IMPORTS
// ============================================================================

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// ============================================================================
// CONSTANTES DE CONFIGURACIÓN
// ============================================================================

/**
 * RUTAS_BLOQUEADAS - Rutas que requieren la cookie 'bypass-construccion' para acceder
 * 
 * Estas rutas están en construcción o deshabilitadas temporalmente.
 * Si un usuario intenta acceder sin la cookie especial, será redirigido
 * a la página /under-construction
 */
const RUTAS_BLOQUEADAS: string[] = []  // Playground desbloqueado

/**
 * IDIOMAS_SOPORTADOS - Lista de códigos de idioma que la aplicación soporta
 * 
 * Actualmente soportamos:
 * - 'es': Español (idioma por defecto)
 * - 'en': Inglés
 */
const IDIOMAS_SOPORTADOS = ['es', 'en'] as const
type IdiomaSoportado = typeof IDIOMAS_SOPORTADOS[number]

/**
 * IDIOMA_POR_DEFECTO - Idioma que se usa cuando no se puede detectar otro
 * Configurado como 'en' (inglés) para audiencia internacional
 */
const IDIOMA_POR_DEFECTO: IdiomaSoportado = 'en'

/**
 * RUTAS_EXCLUIDAS - Rutas que el middleware debe ignorar completamente
 * 
 * Estas son rutas de archivos estáticos o APIs que no necesitan
 * procesamiento de internacionalización.
 */
const RUTAS_EXCLUIDAS = [
  '/_next/',      // Archivos estáticos de Next.js (JS, CSS)
  '/favicon.ico', // Ícono del sitio
  '/api/',        // Endpoints de API
  '/images/',     // Imágenes estáticas
  '/fonts/',      // Fuentes tipográficas
  '/robots.txt',  // Archivo para robots de búsqueda
]

// ============================================================================
// FUNCIONES AUXILIARES
// ============================================================================

/**
 * detectarIdioma - Detecta el idioma preferido del usuario
 * 
 * Orden de prioridad:
 * 1. Cookie NEXT_LOCALE (el usuario ya eligió un idioma antes)
 * 2. Header Accept-Language (preferencia del navegador)
 * 3. Idioma por defecto (español)
 * 
 * @param request - El objeto de la request de Next.js
 * @returns El código de idioma detectado ('es' o 'en')
 */
function detectarIdioma(request: NextRequest): IdiomaSoportado {
  // 1. Verificar si hay una cookie con la preferencia guardada
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value
  
  if (cookieLocale && IDIOMAS_SOPORTADOS.includes(cookieLocale as IdiomaSoportado)) {
    return cookieLocale as IdiomaSoportado
  }

  // 2. Analizar el header Accept-Language del navegador
  const acceptLanguage = request.headers.get('accept-language')
  
  if (acceptLanguage) {
    // El header tiene formato: "es-AR,es;q=0.9,en;q=0.8"
    // Parseamos para obtener solo los códigos de idioma principales
    const languages = acceptLanguage
      .split(',')
      .map(lang => {
        const [code] = lang.trim().split(';')
        return code.split('-')[0].toLowerCase() // "es-AR" → "es"
      })
      .filter(lang => IDIOMAS_SOPORTADOS.includes(lang as IdiomaSoportado))
    
    if (languages.length > 0) {
      return languages[0] as IdiomaSoportado
    }
  }

  // 3. Usar el idioma por defecto
  return IDIOMA_POR_DEFECTO
}

/**
 * esRutaExcluida - Verifica si una ruta debe ser excluida del middleware
 * 
 * @param pathname - La ruta a verificar
 * @returns true si la ruta debe ser ignorada
 */
function esRutaExcluida(pathname: string): boolean {
  return RUTAS_EXCLUIDAS.some(excluida => pathname.startsWith(excluida))
}

/**
 * tienePrefijoIdioma - Verifica si la ruta ya tiene un prefijo de idioma válido
 * 
 * @param pathname - La ruta a verificar
 * @returns true si la ruta empieza con /es/ o /en/
 */
function tienePrefijoIdioma(pathname: string): boolean {
  const primerSegmento = pathname.split('/')[1]
  return IDIOMAS_SOPORTADOS.includes(primerSegmento as IdiomaSoportado)
}

/**
 * extraerIdiomaDeRuta - Extrae el código de idioma de una ruta
 * 
 * @param pathname - La ruta de donde extraer el idioma
 * @returns El código de idioma si existe, o null si no
 * 
 * @example
 * extraerIdiomaDeRuta("/es/contact") // "es"
 * extraerIdiomaDeRuta("/about") // null
 */
function extraerIdiomaDeRuta(pathname: string): IdiomaSoportado | null {
  const primerSegmento = pathname.split('/')[1]
  if (IDIOMAS_SOPORTADOS.includes(primerSegmento as IdiomaSoportado)) {
    return primerSegmento as IdiomaSoportado
  }
  return null
}

/**
 * construirRutaConIdioma - Construye una ruta con el prefijo de idioma
 * 
 * @param pathname - La ruta original
 * @param idioma - El código de idioma a agregar
 * @returns La ruta con el prefijo de idioma
 * 
 * @example
 * construirRutaConIdioma("/", "es") // "/es/"
 * construirRutaConIdioma("/contact", "en") // "/en/contact"
 */
function construirRutaConIdioma(pathname: string, idioma: IdiomaSoportado): string {
  if (pathname === '/') {
    return `/${idioma}/`
  }
  
  // Si ya tiene prefijo, no agregar otro
  if (tienePrefijoIdioma(pathname)) {
    return pathname
  }
  
  return `/${idioma}${pathname}`
}

/**
 * esRutaBloqueada - Verifica si una ruta requiere bypass para acceder
 * 
 * Analiza la ruta sin el prefijo de idioma y verifica si está en RUTAS_BLOQUEADAS
 * 
 * @param pathname - La ruta a verificar
 * @returns true si la ruta está bloqueada
 */
function esRutaBloqueada(pathname: string): boolean {
  // Remover el prefijo de idioma si existe
  const idiomaEnRuta = extraerIdiomaDeRuta(pathname)
  const rutaSinIdioma = idiomaEnRuta 
    ? pathname.replace(`/${idiomaEnRuta}`, '') || '/'
    : pathname
  
  return RUTAS_BLOQUEADAS.some(ruta => rutaSinIdioma.startsWith(ruta))
}

// ============================================================================
// MIDDLEWARE PRINCIPAL
// ============================================================================

/**
 * middleware - Función principal del middleware de Next.js
 * 
 * Este middleware se ejecuta ANTES de que la request llegue a la página.
 * Se encarga de:
 * 
 * 1. Excluir rutas de assets estáticos (imágenes, fuentes, etc.)
 * 2. Redirigir la raíz (/) al idioma detectado (/es/ o /en/)
 * 3. Verificar que las rutas tengan el prefijo de idioma correcto
 * 4. Bloquear el acceso a rutas en construcción sin cookie especial
 * 
 * @param request - El objeto de la request de Next.js
 * @returns NextResponse (redireccion o continuar normalmente)
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Debug: Log para verificar que el middleware se ejecuta
  console.log('[Middleware] Ruta recibida:', pathname)

  // ==================== 1. EXCLUIR ASSETS Y APIs ====================
  // Estas rutas no necesitan procesamiento de i18n
  if (esRutaExcluida(pathname)) {
    console.log('[Middleware] Ruta excluida, continuando:', pathname)
    return NextResponse.next()
  }

  // ==================== 2. REDIRIGIR RUTA RAÍZ ====================
  // "/" debe redirigir a "/es/" o "/en/" según el idioma del usuario
  if (pathname === '/') {
    const idioma = detectarIdioma(request)
    console.log('[Middleware] Redirigiendo ruta raíz a /', idioma, '/')
    const urlRedireccion = new URL(`/${idioma}/`, request.url)
    return NextResponse.redirect(urlRedireccion)
  }

  // ==================== 3. RUTAS CON PREFIJO DE IDIOMA VÁLIDO ====================
  // Si la ruta ya tiene /es/ o /en/, verificar acceso y continuar
  const idiomaEnRuta = extraerIdiomaDeRuta(pathname)
  const tienePrefijoValido = idiomaEnRuta !== null

  if (tienePrefijoValido) {
    const idioma = idiomaEnRuta!
    
    // Verificar si la ruta está bloqueada
    const rutaSinIdioma = pathname.replace(`/${idioma}`, '') || '/'
    const rutaBloqueada = RUTAS_BLOQUEADAS.some(ruta => rutaSinIdioma.startsWith(ruta))
    const tieneBypass = request.cookies.get('bypass-construccion') !== undefined

    // Si está bloqueada y no tiene bypass, redirigir a under-construction
    if (rutaBloqueada && !tieneBypass) {
      const urlRedireccion = new URL(`/${idioma}/under-construction`, request.url)
      return NextResponse.redirect(urlRedireccion)
    }

    // Continuar normalmente, añadiendo headers para la precarga
    const response = NextResponse.next()
    response.headers.set('x-locale', idioma)
    
    // Indicar qué idioma alternativo precargar
    const idiomaAlternativo = idioma === 'es' ? 'en' : 'es'
    response.headers.set('x-preload-locale', idiomaAlternativo)
    
    return response
  }

  // ==================== 4. RUTAS SIN PREFIJO DE IDIOMA ====================
  // Detectar idioma y redirigir a la versión con prefijo
  const idiomaDetectado = detectarIdioma(request)

  // Verificar si la ruta está bloqueada antes de redirigir
  const rutaBloqueada = esRutaBloqueada(pathname)
  const tieneBypass = request.cookies.get('bypass-construccion') !== undefined

  if (rutaBloqueada && !tieneBypass) {
    const urlRedireccion = new URL(`/${idiomaDetectado}/under-construction`, request.url)
    return NextResponse.redirect(urlRedireccion)
  }

  // Redirigir a la ruta con el prefijo de idioma
  const nuevaRuta = construirRutaConIdioma(pathname, idiomaDetectado)
  const urlRedireccion = new URL(nuevaRuta, request.url)
  return NextResponse.redirect(urlRedireccion)
}

// ============================================================================
// CONFIGURACIÓN DEL MIDDLEWARE
// ============================================================================

/**
 * config - Configuración que le dice a Next.js en qué rutas ejecutar el middleware
 * 
 * El matcher usa una expresión regular que excluye:
 * - Archivos estáticos de Next.js (_next/static, _next/image)
 * - Favicon
 * - Archivos con extensiones comunes de imágenes y fuentes
 * 
 * Esto es necesario porque el middleware puede afectar el rendimiento
 * si se ejecuta en cada request.
 */
export const config = {
  matcher: [
    /*
     * Matcher que captura todas las rutas excepto archivos estáticos.
     * 
     * IMPORTANTE: El patrón debe capturar explícitamente '/' y todas las demás rutas.
     * 
     * Excluye:
     * - api (rutas de API)
     * - _next/static y _next/image (archivos estáticos de Next.js)
     * - favicon.ico
     * - Archivos con extensiones de imagen, fuente, etc.
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|eot)).*)',
  ],
}
