'use client'

import { useEffect, useState, ReactNode } from 'react'

interface DelayedSkeletonProps {
  skeleton: ReactNode
  delay?: number // Delay antes de mostrar skeleton (default: 300ms)
  fallbackDelay?: number // Delay antes de mostrar fallback (default: 3000ms)
  fallback?: ReactNode // Fallback para cargas muy lentas
}

/**
 * DelayedSkeleton - Componente que muestra skeleton con delay inteligente
 * 
 * Comportamiento:
 * - Si la carga es < delay: No muestra nada (carga instantánea)
 * - Si la carga es >= delay y < fallbackDelay: Muestra skeleton
 * - Si la carga es >= fallbackDelay: Muestra fallback (ej: "Cargando...")
 * 
 * @param skeleton - Componente skeleton a mostrar
 * @param delay - Delay en ms antes de mostrar skeleton (default: 300ms)
 * @param fallbackDelay - Delay en ms antes de mostrar fallback (default: 3000ms)
 * @param fallback - Componente fallback para cargas muy lentas
 */
export default function DelayedSkeleton({
  skeleton,
  delay = 300,
  fallbackDelay = 3000,
  fallback,
}: DelayedSkeletonProps) {
  const [showSkeleton, setShowSkeleton] = useState(false)
  const [showFallback, setShowFallback] = useState(false)

  useEffect(() => {
    // Timer para mostrar skeleton después del delay
    const skeletonTimer = setTimeout(() => {
      setShowSkeleton(true)
    }, delay)

    // Timer para mostrar fallback después del fallbackDelay
    const fallbackTimer = setTimeout(() => {
      setShowFallback(true)
    }, fallbackDelay)

    return () => {
      clearTimeout(skeletonTimer)
      clearTimeout(fallbackTimer)
    }
  }, [delay, fallbackDelay])

  // Si pasó el fallbackDelay, mostrar fallback
  if (showFallback && fallback) {
    return <>{fallback}</>
  }

  // Si pasó el delay, mostrar skeleton
  if (showSkeleton) {
    return <>{skeleton}</>
  }

  // Si no pasó el delay, no mostrar nada (carga rápida)
  return null
}

