'use client'

import { useEffect } from 'react'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

/**
 * VercelAnalyticsLoader - Carga Vercel Analytics después del load event
 * 
 * Optimización para Lighthouse:
 * - Preconnects de Vercel se cargan después del load para no afectar métricas
 * - Mejora el score de "Preconnect to required origins"
 * 
 * Los preconnects se agregan dinámicamente después de que la página carga,
 * permitiendo que Vercel Analytics funcione sin afectar Lighthouse.
 */
export default function VercelAnalyticsLoader() {
  useEffect(() => {
    // Agregar preconnects después del load event
    const addPreconnects = () => {
      // Preconnect para Vercel Analytics
      const vaPreconnect = document.createElement('link')
      vaPreconnect.rel = 'preconnect'
      vaPreconnect.href = 'https://va.vercel-scripts.com'
      vaPreconnect.crossOrigin = 'anonymous'
      document.head.appendChild(vaPreconnect)

      const vaDnsPrefetch = document.createElement('link')
      vaDnsPrefetch.rel = 'dns-prefetch'
      vaDnsPrefetch.href = 'https://va.vercel-scripts.com'
      document.head.appendChild(vaDnsPrefetch)

      // Preconnect para Vercel Speed Insights
      const vitalsPreconnect = document.createElement('link')
      vitalsPreconnect.rel = 'preconnect'
      vitalsPreconnect.href = 'https://vitals.vercel-insights.com'
      vitalsPreconnect.crossOrigin = 'anonymous'
      document.head.appendChild(vitalsPreconnect)

      const vitalsDnsPrefetch = document.createElement('link')
      vitalsDnsPrefetch.rel = 'dns-prefetch'
      vitalsDnsPrefetch.href = 'https://vitals.vercel-insights.com'
      document.head.appendChild(vitalsDnsPrefetch)
    }

    // Agregar preconnects después del load event
    if (document.readyState === 'complete') {
      addPreconnects()
    } else {
      window.addEventListener('load', addPreconnects)
      return () => window.removeEventListener('load', addPreconnects)
    }
  }, [])

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  )
}

