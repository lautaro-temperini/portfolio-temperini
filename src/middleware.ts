// ============================================================================
// IMPORTS
// ============================================================================

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// ============================================================================
// CONSTANTES DE CONFIGURACIÓN
// ============================================================================

const RUTAS_BLOQUEADAS: string[] = []  // Playground desbloqueado

const IDIOMAS_SOPORTADOS = ['es', 'en'] as const
type IdiomaSoportado = typeof IDIOMAS_SOPORTADOS[number]

// Idioma por defecto: inglés
const IDIOMA_POR_DEFECTO: IdiomaSoportado = 'en'

const RUTAS_EXCLUIDAS = [
    '/_next/',
    '/favicon.ico',
    '/api/',
    '/images/',
    '/fonts/',
    '/robots.txt',
    '/favicon-temperini/',
    '/.well-known/',  // ← AGREGAR ESTA LÍNEA
  ]

// ============================================================================
// FUNCIONES AUXILIARES
// ============================================================================

function detectarIdioma(request: NextRequest): IdiomaSoportado {
  // 1. PRIORIDAD: Verificar cookie NEXT_LOCALE (persistencia)
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value
  
  if (cookieLocale && IDIOMAS_SOPORTADOS.includes(cookieLocale as IdiomaSoportado)) {
    return cookieLocale as IdiomaSoportado
  }

  // 2. Analizar Accept-Language header
  const acceptLanguage = request.headers.get('accept-language')
  
  if (acceptLanguage) {
    const languages = acceptLanguage
      .split(',')
      .map(lang => {
        const [code] = lang.trim().split(';')
        return code.split('-')[0].toLowerCase()
      })
      .filter(lang => IDIOMAS_SOPORTADOS.includes(lang as IdiomaSoportado))
    
    if (languages.length > 0) {
      return languages[0] as IdiomaSoportado
    }
  }

  // 3. Usar idioma por defecto (inglés)
  return IDIOMA_POR_DEFECTO
}

function esRutaExcluida(pathname: string): boolean {
  return RUTAS_EXCLUIDAS.some(excluida => pathname.startsWith(excluida))
}

function tienePrefijoIdioma(pathname: string): boolean {
  const segmentos = pathname.split('/').filter(Boolean)
  if (segmentos.length === 0) return false
  
  const primerSegmento = segmentos[0]
  return IDIOMAS_SOPORTADOS.includes(primerSegmento as IdiomaSoportado)
}

function extraerIdiomaDeRuta(pathname: string): IdiomaSoportado | null {
  const segmentos = pathname.split('/').filter(Boolean)
  if (segmentos.length === 0) return null
  
  const primerSegmento = segmentos[0]
  if (IDIOMAS_SOPORTADOS.includes(primerSegmento as IdiomaSoportado)) {
    return primerSegmento as IdiomaSoportado
  }
  return null
}

function construirRutaConIdioma(pathname: string, idioma: IdiomaSoportado): string {
  // Si ya tiene prefijo de idioma, no hacer nada
  if (tienePrefijoIdioma(pathname)) {
    return pathname
  }
  
  // Si es la raíz, agregar idioma
  if (pathname === '/') {
    return `/${idioma}`
  }
  
  // Agregar idioma al inicio de la ruta
  return `/${idioma}${pathname}`
}

function esRutaBloqueada(pathname: string): boolean {
  const idiomaEnRuta = extraerIdiomaDeRuta(pathname)
  const rutaSinIdioma = idiomaEnRuta 
    ? pathname.replace(`/${idiomaEnRuta}`, '') || '/'
    : pathname
  
  return RUTAS_BLOQUEADAS.some(ruta => rutaSinIdioma.startsWith(ruta))
}

/**
 * Genera un nonce único para CSP (Content Security Policy)
 */
/**
 * Genera un nonce único para CSP (Content Security Policy)
 * Usa Web Crypto API que funciona en Edge Runtime
 */
function generateNonce(): string {
  // Generar 16 bytes aleatorios usando Web Crypto API
  const array = new Uint8Array(16)
  crypto.getRandomValues(array)
  
  // Convertir a base64
  return btoa(String.fromCharCode(...array))
}

/**
 * Genera los headers de CSP con nonce dinámico
 * Solo se usa en producción
 */
function generarHeadersCSP(nonce: string) {
  const cspHeader = [
    "default-src 'self'",
    `script-src 'self' 'strict-dynamic' 'nonce-${nonce}' 'unsafe-eval' https://vercel.live https://vercel.com https://*.vercel-analytics.com https://*.vercel-insights.com https://va.vercel-scripts.com https://www.googletagmanager.com https://www.google-analytics.com`,
    `script-src-elem 'self' 'strict-dynamic' 'nonce-${nonce}' https://vercel.live https://vercel.com https://*.vercel-analytics.com https://*.vercel-insights.com https://va.vercel-scripts.com https://www.googletagmanager.com https://www.google-analytics.com`,
    `style-src 'self' 'nonce-${nonce}' 'unsafe-inline'`,
    "img-src 'self' data: blob: https:",
    "font-src 'self' data:",
    "connect-src 'self' https://*.vercel-analytics.com https://*.vercel-insights.com https://vitals.vercel-insights.com https://api.resend.com https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com",
    "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "require-trusted-types-for 'script'",
    "trusted-types default nextjs nextjs#bundler",
    "upgrade-insecure-requests",
  ].join('; ')
  
  return cspHeader
}

// ============================================================================
// MIDDLEWARE PRINCIPAL
// ============================================================================

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl

  // ==================== 0. VALIDACIONES DE SEGURIDAD ====================
  // Prevenir path traversal y caracteres peligrosos
  if (pathname.includes('..') || pathname.includes('//') || pathname.includes('\\')) {
    return new NextResponse('Bad Request', { status: 400 })
  }

  // Limitar longitud de pathname para prevenir DoS
  if (pathname.length > 2048) {
    return new NextResponse('URI Too Long', { status: 414 })
  }

  // ==================== 1. EXCLUIR ASSETS Y APIs ====================
  if (esRutaExcluida(pathname)) {
    return NextResponse.next()
  }
  
  // ==================== 1.5. VERIFICAR RUTAS FÍSICAS SIN IDIOMA ====================
  // Lista de rutas que existen en [lang]/ y necesitan redirect
  const RUTAS_CON_IDIOMA = [
    'gloryfit',
    'about',
    'digito',
    'vorterix',
    'playground',
    'levelup',
    'rectofinal',
    'contact',
    'under-construction',
  ]
  
  // Si la ruta es /gloryfit, /about, etc. (sin idioma)
  const primerSegmento = pathname.split('/').filter(Boolean)[0]
  if (primerSegmento && RUTAS_CON_IDIOMA.includes(primerSegmento)) {
    const idioma = detectarIdioma(request)
    const nuevaUrl = new URL(`/${idioma}${pathname}`, request.url)
    
    console.log('[Middleware] Redirigiendo ruta sin idioma:', {
      pathname,
      idioma,
      destino: nuevaUrl.pathname
    })
    
    const response = NextResponse.redirect(nuevaUrl, 307)
    response.cookies.set('NEXT_LOCALE', idioma, {
      path: '/',
      maxAge: 31536000,
      sameSite: 'lax',
    })
    
    return response
  }

  // ==================== 2. REDIRIGIR RUTA RAÍZ ====================
  if (pathname === '/') {
    const idioma = detectarIdioma(request)
    const rutaDestino = `/${idioma}`
    
    const url = new URL(rutaDestino, request.url)
    if (search) url.search = search // Preservar query params
    
    const response = NextResponse.redirect(url)
    
    // Solo aplicar CSP en producción
    if (process.env.NODE_ENV === 'production') {
      const nonce = generateNonce()
      response.headers.set('x-nonce', nonce)
      response.headers.set('Content-Security-Policy', generarHeadersCSP(nonce))
    }
    
    // Establecer cookie para persistencia
    response.cookies.set('NEXT_LOCALE', idioma, {
      path: '/',
      maxAge: 31536000, // 1 año
      sameSite: 'lax',
    })
    
    return response
  }

  // ==================== 3. VERIFICAR SI YA TIENE PREFIJO DE IDIOMA ====================
  const idiomaEnRuta = extraerIdiomaDeRuta(pathname)

  if (idiomaEnRuta) {
    // La ruta YA tiene idioma válido (/en/gloryfit, /es/about, etc)
    
    // Verificar si está bloqueada
    const rutaSinIdioma = pathname.replace(`/${idiomaEnRuta}`, '') || '/'
    const rutaBloqueada = RUTAS_BLOQUEADAS.some(ruta => rutaSinIdioma.startsWith(ruta))
    const tieneBypass = request.cookies.get('bypass-construccion') !== undefined

    if (rutaBloqueada && !tieneBypass) {
      const rutaDestino = `/${idiomaEnRuta}/under-construction`
      if (pathname !== rutaDestino) {
        const url = new URL(rutaDestino, request.url)
        return NextResponse.redirect(url)
      }
    }

    // Continuar normalmente - establecer headers y cookie
    const response = NextResponse.next()
    response.headers.set('x-locale', idiomaEnRuta)
    
    // Solo aplicar CSP en producción
    if (process.env.NODE_ENV === 'production') {
      const nonce = generateNonce()
      response.headers.set('x-nonce', nonce)
      response.headers.set('Content-Security-Policy', generarHeadersCSP(nonce))
    }
    
    // Sincronizar cookie con el idioma de la ruta
    const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value
    if (cookieLocale !== idiomaEnRuta) {
      response.cookies.set('NEXT_LOCALE', idiomaEnRuta, {
        path: '/',
        maxAge: 31536000,
        sameSite: 'lax',
      })
    }
    
    return response
  }

  // ==================== 4. RUTAS SIN PREFIJO DE IDIOMA ====================
  // Llega acá si pathname es /gloryfit, /about, /digito, etc.
  
  const idiomaDetectado = detectarIdioma(request)
  const nuevaRuta = construirRutaConIdioma(pathname, idiomaDetectado)
  
  console.log('[Middleware] Ruta sin idioma:', {
    pathname,
    idiomaDetectado,
    nuevaRuta,
    cookie: request.cookies.get('NEXT_LOCALE')?.value,
  })
  
  // Verificar si está bloqueada ANTES de redirigir
  const rutaBloqueada = RUTAS_BLOQUEADAS.some(ruta => pathname.startsWith(ruta))
  const tieneBypass = request.cookies.get('bypass-construccion') !== undefined

  if (rutaBloqueada && !tieneBypass) {
    const rutaDestino = `/${idiomaDetectado}/under-construction`
    const url = new URL(rutaDestino, request.url)
    if (search) url.search = search
    
    const response = NextResponse.redirect(url)
    response.cookies.set('NEXT_LOCALE', idiomaDetectado, {
      path: '/',
      maxAge: 31536000,
      sameSite: 'lax',
    })
    return response
  }

  // Redirigir a la ruta con idioma
  const url = new URL(nuevaRuta, request.url)
  if (search) url.search = search // Preservar query params
  
  const response = NextResponse.redirect(url)
  
  // Solo aplicar CSP en producción
  if (process.env.NODE_ENV === 'production') {
    const nonce = generateNonce()
    response.headers.set('x-nonce', nonce)
    response.headers.set('Content-Security-Policy', generarHeadersCSP(nonce))
  }
  
  response.cookies.set('NEXT_LOCALE', idiomaDetectado, {
    path: '/',
    maxAge: 31536000,
    sameSite: 'lax',
  })
  
  return response
}

// ============================================================================
// CONFIGURACIÓN DEL MIDDLEWARE
// ============================================================================

export const config = {
  matcher: [
    '/',
    '/:path*', // Captura TODAS las rutas
  ],
}