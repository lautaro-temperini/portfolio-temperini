// ============================================================================
// SKELETONS PARA PÁGINAS
// ============================================================================

import Skeleton from './skeleton'

/**
 * HomePageSkeleton - Skeleton que simula la estructura de la página Home
 * 
 * Incluye:
 * - Hero section (título grande + CTA)
 * - Projects section (título + cards de proyectos)
 * - Perfil section (título + contenido)
 */
export function HomePageSkeleton() {
  return (
    <div className="min-h-screen w-full">
      {/* Hero Section Skeleton */}
      <section className="relative w-full min-h-screen flex items-center justify-center px-4 md:px-6 lg:px-10">
        <div className="w-full max-w-4xl mx-auto space-y-8">
          {/* Título principal */}
          <div className="space-y-4">
            <Skeleton className="h-12 md:h-16 lg:h-20 w-full max-w-3xl mx-auto" variant="text" />
            <Skeleton className="h-6 md:h-8 w-full max-w-2xl mx-auto" variant="text" />
            <Skeleton className="h-6 md:h-8 w-3/4 max-w-xl mx-auto" variant="text" />
          </div>
          
          {/* CTA Button */}
          <div className="flex justify-center">
            <Skeleton className="h-10 w-64 rounded-full" />
          </div>
        </div>
      </section>

      {/* Projects Section Skeleton */}
      <section className="w-full py-16 px-4 md:px-6 lg:px-10">
        <div className="w-full max-w-7xl mx-auto space-y-12">
          {/* Header */}
          <div className="space-y-4">
            <Skeleton className="h-10 md:h-12 lg:h-14 w-full max-w-2xl" variant="text" />
            <Skeleton className="h-6 md:h-8 w-full max-w-3xl" variant="text" />
          </div>

          {/* Project Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-48 md:h-64 rounded-2xl" />
                <Skeleton className="h-6 w-3/4" variant="text" />
                <Skeleton className="h-4 w-full" variant="text" />
                <Skeleton className="h-4 w-2/3" variant="text" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Perfil Section Skeleton */}
      <section className="w-full py-16 px-4 md:px-6 lg:px-10">
        <div className="w-full max-w-4xl mx-auto space-y-8">
          <Skeleton className="h-10 md:h-12 w-full max-w-xl" variant="text" />
          <div className="space-y-4">
            <Skeleton className="h-6 w-full" variant="text" />
            <Skeleton className="h-6 w-full" variant="text" />
            <Skeleton className="h-6 w-5/6" variant="text" />
          </div>
        </div>
      </section>
    </div>
  )
}

/**
 * ContactPageSkeleton - Skeleton que simula la estructura de la página Contact
 * 
 * Incluye:
 * - Título de la sección
 * - Formulario (campos de input + textarea + botón)
 * - Iconos de redes sociales
 */
export function ContactPageSkeleton() {
  return (
    <section className="flex flex-col items-center px-4 md:px-6 lg:px-8 relative pt-28 min-h-screen">
      {/* Card Container - Simula SpotlightCard */}
      <div className="w-full max-w-xl md:max-w-2xl">
        {/* Card con efecto spotlight simulado */}
        <div className="w-full flex items-center justify-center px-4 md:px-8 py-4 md:py-6 rounded-3xl bg-background/80 border border-subtle/50 backdrop-blur-sm">
          <div className="w-full max-w-none mx-auto space-y-8">
            {/* Título */}
            <div className="text-center space-y-4">
              <Skeleton className="h-10 md:h-12 lg:h-14 w-full max-w-md mx-auto" variant="text" />
            </div>

            {/* Formulario Skeleton */}
            <div className="space-y-6">
              {/* Campo Name */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" variant="text" />
                <Skeleton className="h-10 w-full rounded-lg" />
              </div>

              {/* Campo Email */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" variant="text" />
                <Skeleton className="h-10 w-full rounded-lg" />
              </div>

              {/* Campo Message */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" variant="text" />
                <Skeleton className="h-32 w-full rounded-lg" />
              </div>

              {/* Botón Submit */}
              <Skeleton className="h-10 w-full rounded-full" />
            </div>
          </div>
        </div>

        {/* Social Links Skeleton (móvil) */}
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
 * LoadingFallback - Componente de fallback para cargas muy lentas
 * 
 * Muestra un spinner con mensaje "Cargando..." cuando la carga
 * tarda más de 3 segundos.
 */
export function LoadingFallback() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
      <div className="text-center space-y-4">
        {/* Spinner animado */}
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent" />
        
        {/* Texto de carga */}
        <p className="text-accent text-sm font-medium">Cargando...</p>
      </div>
    </div>
  )
}

