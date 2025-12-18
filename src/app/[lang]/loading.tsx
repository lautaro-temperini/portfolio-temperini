// ============================================================================
// COMPONENTE DE CARGA
// ============================================================================

'use client'

import DelayedSkeleton from '@/components/ui/DelayedSkeleton'
import { HomePageSkeleton, LoadingFallback } from '@/components/ui/PageSkeletons'

/**
 * Loading - Componente de carga para rutas localizadas
 * 
 * Este componente se muestra automáticamente por Next.js mientras:
 * - Se cargan las traducciones del diccionario
 * - Se renderizan los Server Components
 * - Se obtienen datos de APIs
 * 
 * Usa DelayedSkeleton para:
 * - No mostrar nada si la carga es < 300ms (instantánea)
 * - Mostrar skeleton si la carga es >= 300ms y < 3s
 * - Mostrar fallback "Cargando..." si la carga es >= 3s
 * 
 * Next.js usa este componente como fallback de Suspense para toda
 * la ruta /[lang]/* cuando hay operaciones asíncronas pendientes.
 * 
 * @returns Componente JSX del estado de carga
 */
export default function Loading() {
  return (
    <DelayedSkeleton
      skeleton={<HomePageSkeleton />}
      delay={300}
      fallbackDelay={3000}
      fallback={<LoadingFallback />}
    />
  )
}
