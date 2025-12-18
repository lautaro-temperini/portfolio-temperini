// ============================================================================
// SKELETONS ARREGLADOS - Coinciden con la estructura real
// ============================================================================

import Skeleton from './skeleton'
import ProjectCardSkeleton from '@/components/projects/ProjectCardSkeleton'

/**
 * HomePageSkeleton - Skeleton que REALMENTE imita tu página Home
 * 
 * Cambios principales:
 * 1. Hero alineado a la IZQUIERDA (no centrado)
 * 2. Projects usa tu ProjectCardSkeleton real
 * 3. Featured project full width + grid 2x2
 */
export function HomePageSkeleton() {
  return (
    <div className="min-h-screen w-full">
      {/* Hero Section - ALINEADO A LA IZQUIERDA como en HeroContent */}
      <section className="relative w-full min-h-screen flex items-center px-4 md:px-6 lg:px-10">
        <div className="w-full flex flex-col items-start justify-center pt-32 md:pt-40 lg:pt-48">
          {/* Título - alineado a la izquierda, NO centrado */}
          <div className="mb-4 md:mb-6">
            <Skeleton className="h-12 md:h-16 lg:h-20 w-full max-w-full md:max-w-md lg:max-w-lg xl:max-w-[605px]" variant="text" />
            <Skeleton className="h-12 md:h-16 lg:h-20 w-3/4 max-w-full md:max-w-md lg:max-w-lg xl:max-w-[605px] mt-2" variant="text" />
          </div>
          
          {/* Subtítulo */}
          <div className="mb-6 md:mb-8">
            <Skeleton className="h-6 md:h-8 w-full max-w-full md:max-w-md lg:max-w-lg xl:max-w-[500px]" variant="text" />
            <Skeleton className="h-6 md:h-8 w-4/5 max-w-full md:max-w-md lg:max-w-lg xl:max-w-[500px] mt-2" variant="text" />
          </div>
          
          {/* CTA Button */}
          <Skeleton className="h-10 w-full max-w-xs md:min-w-[257px] rounded-full" />
        </div>
      </section>

      {/* Projects Section - USA TU ProjectCardSkeleton REAL */}
      <section className="relative w-full py-16">
        {/* Header */}
        <div className="w-full flex flex-col items-start text-left mb-8 md:mb-12 lg:mb-14 px-4 md:px-6 lg:px-10">
          <div className="space-y-2">
            <Skeleton className="h-12 md:h-16 lg:h-20 w-full max-w-md" variant="text" />
            <Skeleton className="h-6 md:h-8 w-full max-w-2xl lg:max-w-3xl mt-4" variant="text" />
            <Skeleton className="h-6 md:h-8 w-3/4 max-w-2xl lg:max-w-3xl" variant="text" />
          </div>
        </div>

        {/* Projects Container */}
        <div className="w-full px-4 md:px-6 lg:px-10">
          <div className="flex flex-col gap-6 md:gap-4 lg:gap-6">
            {/* Featured Project (Full Width) */}
            <ProjectCardSkeleton />
            
            {/* Grid 2x2 de proyectos secundarios */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-4 lg:gap-6">
              <ProjectCardSkeleton />
              <ProjectCardSkeleton />
              <ProjectCardSkeleton />
              <ProjectCardSkeleton />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

/**
 * ContactPageSkeleton - YA ESTÁ BIEN, no cambiar
 */
export function ContactPageSkeleton() {
  return (
    <section className="flex flex-col items-center px-4 md:px-6 lg:px-8 relative pt-28 min-h-screen">
      <div className="w-full max-w-xl md:max-w-2xl">
        <div className="w-full flex items-center justify-center px-4 md:px-8 py-4 md:py-6 rounded-3xl bg-background/80 border border-subtle/50 backdrop-blur-sm">
          <div className="w-full max-w-none mx-auto space-y-8">
            <div className="text-center space-y-4">
              <Skeleton className="h-10 md:h-12 lg:h-14 w-full max-w-md mx-auto" variant="text" />
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" variant="text" />
                <Skeleton className="h-10 w-full rounded-lg" />
              </div>

              <div className="space-y-2">
                <Skeleton className="h-4 w-24" variant="text" />
                <Skeleton className="h-10 w-full rounded-lg" />
              </div>

              <div className="space-y-2">
                <Skeleton className="h-4 w-32" variant="text" />
                <Skeleton className="h-32 w-full rounded-lg" />
              </div>

              <Skeleton className="h-10 w-full rounded-full" />
            </div>
          </div>
        </div>

        <div className="flex lg:hidden items-center justify-center gap-4 mt-6 md:mt-8">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="w-11 h-11 md:w-12 md:h-12 rounded-full" variant="circular" />
          ))}
        </div>
      </div>
    </section>
  )
}

/**
 * LoadingFallback - Spinner para cargas muy lentas (>3s)
 */
export function LoadingFallback() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
      <div className="text-center space-y-4">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent" />
        <p className="text-accent text-sm font-medium">Cargando...</p>
      </div>
    </div>
  )
}