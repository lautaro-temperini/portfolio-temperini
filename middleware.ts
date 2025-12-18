// ============================================================================
// IMPORTS
// ============================================================================

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { randomBytes } from 'crypto'

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

  // 2. Si hay idioma en la ruta, usarlo (y se guardará en cookie después)
  const idiomaEnRuta = extraerIdiomaDeRuta(request.nextUrl.pathname)
  if (idiomaEnRuta) {
    return idiomaEnRuta
  }

  // 3. Analizar Accept-Language header
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

  // 4. Usar idioma por defecto (inglés)
  return IDIOMA_POR_DEFECTO
}

function esRutaExcluida(pathname: string): boolean {
  return RUTAS_EXCLUIDAS.some(excluida => pathname.startsWith(excluida))
}

function tienePrefijoIdioma(pathname: string): boolean {
  const primerSegmento = pathname.split('/')[1]
  return IDIOMAS_SOPORTADOS.includes(primerSegmento as IdiomaSoportado)
}

function extraerIdiomaDeRuta(pathname: string): IdiomaSoportado | null {
  const primerSegmento = pathname.split('/')[1]
  if (IDIOMAS_SOPORTADOS.includes(primerSegmento as IdiomaSoportado)) {
    return primerSegmento as IdiomaSoportado
  }
  return null
}

function construirRutaConIdioma(pathname: string, idioma: IdiomaSoportado): string {
  if (pathname === '/') {
    return `/${idioma}/`
  }
  
  if (tienePrefijoIdioma(pathname)) {
    return pathname
  }
  
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
 * Un nonce es un número aleatorio usado una sola vez que permite
 * ejecutar scripts inline específicos sin usar 'unsafe-inline'.
 */
function generateNonce(): string {
  return randomBytes(16).toString('base64')
}

// ============================================================================
// MIDDLEWARE PRINCIPAL
// ============================================================================

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

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

  // ==================== 2. REDIRIGIR RUTA RAÍZ ====================
  if (pathname === '/') {
    // Priorizar cookie si existe, sino usar inglés por defecto
    const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value
    const idioma = (cookieLocale && IDIOMAS_SOPORTADOS.includes(cookieLocale as IdiomaSoportado))
      ? cookieLocale as IdiomaSoportado
      : IDIOMA_POR_DEFECTO
    
    const rutaDestino = `/${idioma}/`
    const urlRedireccion = new URL(rutaDestino, request.url)
    const response = NextResponse.redirect(urlRedireccion)
    
    // Generar nonce para CSP (aunque es redirect, se aplicará en la siguiente request)
    const nonce = generateNonce()
    response.headers.set('x-nonce', nonce)
    
    // Establecer cookie para persistencia
    response.cookies.set('NEXT_LOCALE', idioma, {
      path: '/',
      maxAge: 31536000, // 1 año
      sameSite: 'lax',
    })
    
    return response
  }

  // ==================== 3. RUTAS CON PREFIJO DE IDIOMA VÁLIDO ====================
  const idiomaEnRuta = extraerIdiomaDeRuta(pathname)
  const tienePrefijoValido = idiomaEnRuta !== null

  if (tienePrefijoValido) {
    const idioma = idiomaEnRuta!
    
    // Verificar si la ruta está bloqueada
    const rutaSinIdioma = pathname.replace(`/${idioma}`, '') || '/'
    const rutaBloqueada = RUTAS_BLOQUEADAS.some(ruta => rutaSinIdioma.startsWith(ruta))
    const tieneBypass = request.cookies.get('bypass-construccion') !== undefined

    if (rutaBloqueada && !tieneBypass) {
      const rutaDestino = `/${idioma}/under-construction`
      // Evitar loop: verificar que no estemos ya en la ruta de destino
      if (pathname !== rutaDestino) {
        const urlRedireccion = new URL(rutaDestino, request.url)
        return NextResponse.redirect(urlRedireccion)
      }
    }

    // IMPORTANTE: Sincronizar cookie con el idioma de la ruta
    const response = NextResponse.next()
    response.headers.set('x-locale', idioma)
    
    // Generar nonce para CSP y pasarlo como header
    const nonce = generateNonce()
    response.headers.set('x-nonce', nonce)
    
    // Configurar CSP con nonce dinámico
    const cspHeader = [
      "default-src 'self'",
      `script-src 'self' 'strict-dynamic' 'nonce-${nonce}' 'unsafe-eval' https://vercel.live https://vercel.com https://*.vercel-analytics.com https://*.vercel-insights.com https://va.vercel-scripts.com https://www.googletagmanager.com https://www.google-analytics.com`,
      `script-src-elem 'self' 'strict-dynamic' 'nonce-${nonce}' https://vercel.live https://vercel.com https://*.vercel-analytics.com https://*.vercel-insights.com https://va.vercel-scripts.com https://www.googletagmanager.com https://www.google-analytics.com`,
      `style-src 'self' 'nonce-${nonce}'`,
      "img-src 'self' data: blob: https:",
      "font-src 'self' data:",
      "connect-src 'self' https://*.vercel-analytics.com https://*.vercel-insights.com https://vitals.vercel-insights.com https://api.resend.com https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com",
      "frame-src 'none'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "require-trusted-types-for 'script'",
      "trusted-types default",
      "upgrade-insecure-requests",
    ].join('; ')
    
    response.headers.set('Content-Security-Policy', cspHeader)
    
    // Actualizar cookie siempre para mantener persistencia
    const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value
    if (!cookieLocale || cookieLocale !== idioma) {
      response.cookies.set('NEXT_LOCALE', idioma, {
        path: '/',
        maxAge: 31536000,
        sameSite: 'lax',
      })
    }
    
    return response
  }

  // ==================== 4. RUTAS SIN PREFIJO DE IDIOMA ====================
  // Detectar idioma (prioriza cookie, luego ruta, luego header, luego default)
  const idiomaDetectado = detectarIdioma(request)
  const nuevaRuta = construirRutaConIdioma(pathname, idiomaDetectado)
  
  // Evitar loop: verificar que no estemos ya en la ruta correcta
  if (pathname === nuevaRuta) {
    const response = NextResponse.next()
    
    // Generar nonce para CSP
    const nonce = generateNonce()
    response.headers.set('x-nonce', nonce)
    
    // Configurar CSP con nonce dinámico
    const cspHeader = [
      "default-src 'self'",
      `script-src 'self' 'strict-dynamic' 'nonce-${nonce}' 'unsafe-eval' https://vercel.live https://vercel.com https://*.vercel-analytics.com https://*.vercel-insights.com https://va.vercel-scripts.com https://www.googletagmanager.com https://www.google-analytics.com`,
      `script-src-elem 'self' 'strict-dynamic' 'nonce-${nonce}' https://vercel.live https://vercel.com https://*.vercel-analytics.com https://*.vercel-insights.com https://va.vercel-scripts.com https://www.googletagmanager.com https://www.google-analytics.com`,
      `style-src 'self' 'nonce-${nonce}'`,
      "img-src 'self' data: blob: https:",
      "font-src 'self' data:",
      "connect-src 'self' https://*.vercel-analytics.com https://*.vercel-insights.com https://vitals.vercel-insights.com https://api.resend.com https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com",
      "frame-src 'none'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "require-trusted-types-for 'script'",
      "trusted-types default",
      "upgrade-insecure-requests",
    ].join('; ')
    
    response.headers.set('Content-Security-Policy', cspHeader)
    
    // Asegurar que la cookie esté establecida
    const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value
    if (!cookieLocale || cookieLocale !== idiomaDetectado) {
      response.cookies.set('NEXT_LOCALE', idiomaDetectado, {
        path: '/',
        maxAge: 31536000,
        sameSite: 'lax',
      })
    }
    return response
  }

  // Verificar si la ruta está bloqueada antes de redirigir
  const rutaBloqueada = esRutaBloqueada(pathname)
  const tieneBypass = request.cookies.get('bypass-construccion') !== undefined

  if (rutaBloqueada && !tieneBypass) {
    const rutaDestino = `/${idiomaDetectado}/under-construction`
    // Evitar loop: verificar que no estemos ya en la ruta de destino
    if (pathname !== rutaDestino) {
      const urlRedireccion = new URL(rutaDestino, request.url)
      const response = NextResponse.redirect(urlRedireccion)
      response.cookies.set('NEXT_LOCALE', idiomaDetectado, {
        path: '/',
        maxAge: 31536000,
        sameSite: 'lax',
      })
      return response
    }
  }

  const urlRedireccion = new URL(nuevaRuta, request.url)
  
  // IMPORTANTE: Establecer cookie en la redirección para persistencia
  const response = NextResponse.redirect(urlRedireccion)
  
  // Generar nonce para CSP
  const nonce = generateNonce()
  response.headers.set('x-nonce', nonce)
  
  // Configurar CSP con nonce dinámico (aunque es redirect, se aplicará en la siguiente request)
  const cspHeader = [
    "default-src 'self'",
    `script-src 'self' 'strict-dynamic' 'nonce-${nonce}' 'unsafe-eval' https://vercel.live https://vercel.com https://*.vercel-analytics.com https://*.vercel-insights.com https://va.vercel-scripts.com https://www.googletagmanager.com https://www.google-analytics.com`,
    `script-src-elem 'self' 'strict-dynamic' 'nonce-${nonce}' https://vercel.live https://vercel.com https://*.vercel-analytics.com https://*.vercel-insights.com https://va.vercel-scripts.com https://www.googletagmanager.com https://www.google-analytics.com`,
    `style-src 'self' 'nonce-${nonce}'`,
    "img-src 'self' data: blob: https:",
    "font-src 'self' data:",
    "connect-src 'self' https://*.vercel-analytics.com https://*.vercel-insights.com https://vitals.vercel-insights.com https://api.resend.com https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com",
    "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "require-trusted-types-for 'script'",
    "trusted-types default",
    "upgrade-insecure-requests",
  ].join('; ')
  
  response.headers.set('Content-Security-Policy', cspHeader)
  
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
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|eot)).*)',
  ],
}