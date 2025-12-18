// ============================================================================
// TIPOS E INTERFACES
// ============================================================================

/**
 * Props del componente Skeleton
 * 
 * @property className - Clases CSS adicionales para personalizar tamaño y forma
 * @property variant - Variante visual predefinida del skeleton
 *                    - 'default': Bordes ligeramente redondeados
 *                    - 'circular': Completamente redondo (para avatares)
 *                    - 'text': Para simular líneas de texto
 */
interface SkeletonProps {
  className?: string
  variant?: 'default' | 'circular' | 'text'
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

/**
 * Skeleton - Componente de placeholder animado para estados de carga
 * 
 * Los "skeletons" (esqueletos) son elementos visuales que simulan la estructura
 * del contenido que se está cargando. Proporcionan feedback visual al usuario
 * de que algo se está cargando, mejorando la percepción de rendimiento.
 * 
 * Usa la animación `animate-pulse` de Tailwind CSS que crea un efecto de
 * "pulsación" (fadeIn/fadeOut) para indicar que el contenido está cargando.
 * 
 * Variantes disponibles:
 * - `default`: Skeleton rectangular con esquinas ligeramente redondeadas
 * - `circular`: Skeleton redondo, ideal para avatares o imágenes circulares
 * - `text`: Skeleton para líneas de texto, con altura predefinida
 * 
 * @example
 * // Skeleton rectangular básico
 * <Skeleton className="h-8 w-full" />
 * 
 * // Skeleton circular para avatar
 * <Skeleton className="w-12 h-12" variant="circular" />
 * 
 * // Skeleton para texto
 * <Skeleton className="w-3/4" variant="text" />
 * 
 * @param className - Clases para definir tamaño (h-*, w-*)
 * @param variant - Tipo de skeleton (por defecto 'default')
 * @returns Componente JSX del skeleton
 */
export default function Skeleton({ 
  className = '', 
  variant = 'default' 
}: SkeletonProps) {
  // ============================================================================
  // CLASES CSS
  // ============================================================================
  
  /**
   * Clases base que aplican a todas las variantes:
   * - bg-[#1a1a1a]: Color de fondo oscuro que coincide con el tema
   * - animate-pulse: Animación de pulsación de Tailwind
   */
  const baseClasses = 'bg-[#1a1a1a] animate-pulse'
  
  /**
   * Clases específicas para cada variante
   */
  const variantClasses = {
    default: 'rounded',       // Esquinas ligeramente redondeadas
    circular: 'rounded-full', // Completamente redondo
    text: 'rounded h-4'       // Para texto, con altura predefinida de 1rem
  }

  // ============================================================================
  // RENDERIZADO
  // ============================================================================

  return (
    <div 
      className={combineClasses(
        baseClasses,
        variantClasses[variant],
        className
      )}
    />
  )
}

// ============================================================================
// FUNCIONES AUXILIARES
// ============================================================================

/**
 * combineClasses - Función utilitaria para combinar clases CSS
 * 
 * Filtra valores falsy (undefined, null, false, '') y une
 * las clases restantes con espacios.
 * 
 * Esta es una implementación simple del patrón "cn" (classnames)
 * sin dependencias externas.
 * 
 * @param classes - Lista de clases CSS a combinar (puede incluir undefined o false)
 * @returns String con todas las clases válidas separadas por espacios
 * 
 * @example
 * combineClasses('base', condition && 'conditional', 'always')
 * // Si condition es false: "base always"
 * // Si condition es true: "base conditional always"
 */
function combineClasses(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(' ')
}
