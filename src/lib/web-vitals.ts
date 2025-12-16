// ============================================================================
// WEB VITALS - Monitoreo de Core Web Vitals
// ============================================================================
// Este módulo proporciona funciones para reportar métricas de rendimiento
// a diferentes destinos (consola, analytics, etc.)

import type { Metric } from 'web-vitals'

// ============================================================================
// TIPOS
// ============================================================================

/**
 * Opciones de configuración para el reporte de Web Vitals
 */
interface WebVitalsOptions {
  /** Si mostrar métricas en la consola (solo desarrollo) */
  debug?: boolean
  /** URL del endpoint para enviar métricas */
  analyticsEndpoint?: string
  /** Threshold para considerar una métrica como "buena" */
  thresholds?: {
    LCP?: number  // Largest Contentful Paint (ms)
    CLS?: number  // Cumulative Layout Shift
    FCP?: number  // First Contentful Paint (ms)
    TTFB?: number // Time to First Byte (ms)
    INP?: number  // Interaction to Next Paint (ms)
  }
}

// ============================================================================
// THRESHOLDS POR DEFECTO (según Google)
// ============================================================================

const DEFAULT_THRESHOLDS = {
  LCP: 2500,   // Good: < 2.5s, Needs improvement: < 4s, Poor: > 4s
  CLS: 0.1,    // Good: < 0.1, Needs improvement: < 0.25, Poor: > 0.25
  FCP: 1800,   // Good: < 1.8s, Needs improvement: < 3s, Poor: > 3s
  TTFB: 800,   // Good: < 800ms, Needs improvement: < 1.8s, Poor: > 1.8s
  INP: 200,    // Good: < 200ms, Needs improvement: < 500ms, Poor: > 500ms
}

// ============================================================================
// FUNCIONES DE UTILIDAD
// ============================================================================

/**
 * Determina si una métrica está en el rango "bueno"
 */
function isGoodMetric(metric: Metric, thresholds: typeof DEFAULT_THRESHOLDS): boolean {
  const threshold = thresholds[metric.name as keyof typeof thresholds]
  if (!threshold) return true
  return metric.value <= threshold
}

/**
 * Obtiene el color para la consola según la calidad de la métrica
 */
function getMetricColor(metric: Metric, thresholds: typeof DEFAULT_THRESHOLDS): string {
  const threshold = thresholds[metric.name as keyof typeof thresholds]
  if (!threshold) return '#888'
  
  if (metric.value <= threshold) return '#0cce6b' // Verde - Good
  if (metric.value <= threshold * 1.5) return '#ffa400' // Amarillo - Needs improvement
  return '#ff4e42' // Rojo - Poor
}

/**
 * Formatea el valor de la métrica para mostrar
 */
function formatMetricValue(metric: Metric): string {
  if (metric.name === 'CLS') {
    return metric.value.toFixed(3)
  }
  return `${Math.round(metric.value)}ms`
}

// ============================================================================
// FUNCIONES PRINCIPALES
// ============================================================================

/**
 * Reporta una métrica a la consola (solo en desarrollo)
 */
function reportToConsole(metric: Metric, thresholds: typeof DEFAULT_THRESHOLDS): void {
  const color = getMetricColor(metric, thresholds)
  const value = formatMetricValue(metric)
  const status = isGoodMetric(metric, thresholds) ? '✓' : '⚠'
  
  console.log(
    `%c${status} ${metric.name}: ${value}`,
    `color: ${color}; font-weight: bold;`
  )
}

/**
 * Envía métricas a un endpoint de analytics
 */
async function reportToAnalytics(metric: Metric, endpoint: string): Promise<void> {
  try {
    const body = JSON.stringify({
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
      id: metric.id,
      navigationType: metric.navigationType,
      timestamp: Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent,
    })

    // Usar sendBeacon si está disponible (no bloquea la navegación)
    if (navigator.sendBeacon) {
      navigator.sendBeacon(endpoint, body)
    } else {
      await fetch(endpoint, {
        method: 'POST',
        body,
        headers: { 'Content-Type': 'application/json' },
        keepalive: true,
      })
    }
  } catch (error) {
    console.warn('Error reporting web vitals:', error)
  }
}

/**
 * Envía métricas a Vercel Analytics (si está disponible)
 */
function reportToVercelAnalytics(metric: Metric): void {
  // Vercel Analytics captura automáticamente las métricas
  // Esta función está disponible si usas @vercel/analytics
  if (typeof window !== 'undefined' && (window as any).va) {
    (window as any).va('event', {
      name: metric.name,
      value: metric.value,
    })
  }
}

// ============================================================================
// FUNCIÓN PRINCIPAL EXPORTADA
// ============================================================================

/**
 * onWebVitals - Callback para reportar Web Vitals
 * 
 * Esta función se puede usar directamente con next/web-vitals o
 * con la librería web-vitals.
 * 
 * @param metric - La métrica de Web Vitals
 * @param options - Opciones de configuración
 * 
 * @example
 * // En _app.tsx o app/layout.tsx
 * import { onWebVitals } from '@/lib/web-vitals'
 * 
 * export function reportWebVitals(metric: Metric) {
 *   onWebVitals(metric, { debug: process.env.NODE_ENV === 'development' })
 * }
 */
export function onWebVitals(metric: Metric, options: WebVitalsOptions = {}): void {
  const {
    debug = process.env.NODE_ENV === 'development',
    analyticsEndpoint,
    thresholds: customThresholds,
  } = options

  // Combinar thresholds por defecto con los personalizados
  const thresholds = { ...DEFAULT_THRESHOLDS, ...customThresholds }

  // Reportar a la consola en desarrollo
  if (debug) {
    reportToConsole(metric, thresholds)
  }

  // Reportar a endpoint personalizado si está configurado
  if (analyticsEndpoint) {
    reportToAnalytics(metric, analyticsEndpoint)
  }

  // Reportar a Vercel Analytics
  reportToVercelAnalytics(metric)
}

// ============================================================================
// INICIALIZACIÓN AUTOMÁTICA
// ============================================================================

/**
 * initWebVitals - Inicializa el monitoreo de Web Vitals
 * 
 * Esta función carga la librería web-vitals dinámicamente y configura
 * el reporte de métricas.
 * 
 * @param options - Opciones de configuración
 * 
 * @example
 * // En un useEffect o en el cliente
 * import { initWebVitals } from '@/lib/web-vitals'
 * 
 * useEffect(() => {
 *   initWebVitals({ debug: true })
 * }, [])
 */
export async function initWebVitals(options: WebVitalsOptions = {}): Promise<void> {
  if (typeof window === 'undefined') return

  try {
    // FID fue reemplazado por INP en web-vitals v4+
    const { onCLS, onFCP, onINP, onLCP, onTTFB } = await import('web-vitals')
    
    const reportMetric = (metric: Metric) => onWebVitals(metric, options)

    onCLS(reportMetric)
    onFCP(reportMetric)
    onINP(reportMetric)
    onLCP(reportMetric)
    onTTFB(reportMetric)
  } catch (error) {
    console.warn('Error initializing web vitals:', error)
  }
}

// ============================================================================
// EXPORTACIONES
// ============================================================================

export { DEFAULT_THRESHOLDS }
export type { WebVitalsOptions }

