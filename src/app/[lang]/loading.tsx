// ============================================================================
// COMPONENTE DE CARGA
// ============================================================================

/**
 * Loading - Componente de carga para rutas localizadas
 * 
 * Este componente se muestra automáticamente por Next.js mientras:
 * - Se cargan las traducciones del diccionario
 * - Se renderizan los Server Components
 * - Se obtienen datos de APIs
 * 
 * Muestra un spinner centrado con un mensaje de "Cargando..."
 * para indicar al usuario que el contenido está siendo preparado.
 * 
 * Next.js usa este componente como fallback de Suspense para toda
 * la ruta /[lang]/* cuando hay operaciones asíncronas pendientes.
 * 
 * @returns Componente JSX del estado de carga
 */
export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0D0D0D]">
      <div className="text-center">
        {/* Spinner animado */}
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#8900C3] border-r-transparent" />
        
        {/* Texto de carga */}
        <p className="mt-4 text-[#A6A6A6] text-sm">Cargando...</p>
      </div>
    </div>
  )
}
