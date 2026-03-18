'use client'

import { useEffect } from 'react'

/**
 * Filtra errores de promesas no manejadas que provienen de iframes/SDKs de terceros
 * (por ejemplo, Figma), para que no contaminen la consola ni los tests.
 */
export default function ThirdPartyErrorFilter() {
  useEffect(() => {
    const handler = (event: PromiseRejectionEvent) => {
      try {
        const reason = event.reason
        const message =
          (typeof reason === 'string' && reason) ||
          (reason && typeof reason.message === 'string' && reason.message) ||
          (reason && typeof reason.toString === 'function' && reason.toString()) ||
          ''

        // Ignorar errores claramente originados en Figma / embeds de terceros
        if (message.includes('figma.com')) {
          event.preventDefault()
        }
      } catch {
        // Si algo falla en el filtro, no interferir con el flujo normal de errores
      }
    }

    window.addEventListener('unhandledrejection', handler)
    return () => window.removeEventListener('unhandledrejection', handler)
  }, [])

  return null
}

