'use client'

// ============================================================================
// WRAPPER PARA THREADS CON LAZY LOADING
// ============================================================================

import dynamic from 'next/dynamic'

/**
 * ThreadsWrapper - Wrapper con lazy loading para Threads
 * 
 * Threads es pesado (WebGL/OGL), así que lo cargamos dinámicamente
 * solo cuando sea necesario. Esto reduce el bundle inicial.
 */
const Threads = dynamic(() => import('./Threads'), {
  ssr: false,
  loading: () => null, // No mostrar nada mientras carga (es un fondo)
})

interface ThreadsWrapperProps {
  color?: [number, number, number]
  amplitude?: number
  distance?: number
  enableMouseInteraction?: boolean
}

export default function ThreadsWrapper(props: ThreadsWrapperProps) {
  return <Threads {...props} />
}



