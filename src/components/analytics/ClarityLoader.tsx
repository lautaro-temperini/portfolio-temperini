"use client"

import { useEffect } from "react"

declare global {
  interface Window {
    clarity: ((...args: unknown[]) => void) & { q?: unknown[] }
  }
}

/**
 * Carga Microsoft Clarity de forma diferida (después del load event).
 * No afecta LCP ni FCP porque se inyecta con requestIdleCallback.
 *
 * Variables requeridas en .env.local:
 *   NEXT_PUBLIC_CLARITY_PROJECT_ID=tu_id_aqui
 */
export default function ClarityLoader() {
  const projectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID

  useEffect(() => {
    if (!projectId) return

    const inject = () => {
      // Evitar doble inyección
      if (document.querySelector('script[data-clarity]')) return

      // Snippet oficial de Clarity (minificado)
      window.clarity =
        window.clarity ||
        function (...args: unknown[]) {
          ;(window.clarity.q = window.clarity.q || []).push(args)
        }

      const s = document.createElement("script")
      s.setAttribute("data-clarity", projectId)
      s.async = true
      s.src = `https://www.clarity.ms/tag/${projectId}`
      document.head.appendChild(s)
    }

    // Cargar después de que el navegador esté libre (no bloquea LCP)
   if (typeof requestIdleCallback !== "undefined") {
  requestIdleCallback(inject, { timeout: 3000 })
} else {
  (window as Window).addEventListener("load", inject, { once: true })
}
  }, [projectId])

  return null
}
