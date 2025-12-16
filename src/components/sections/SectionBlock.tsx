// ============================================================================
// TIPOS E INTERFACES
// ============================================================================

/**
 * Props del componente SectionBlock
 * 
 * @property layout - Tipo de layout para el contenido
 * @property className - Clases CSS adicionales
 * @property children - Contenido de la sección
 */
interface SectionBlockProps {
  layout?: "full" | "twocol" | "grid" | "centered"
  className?: string
  children: React.ReactNode
}

// ============================================================================
// CONSTANTES
// ============================================================================

/**
 * Clases CSS para cada tipo de layout
 * 
 * - full: Ancho completo, sin estructura de grid
 * - twocol: Grid de 2 columnas para contenido lado a lado
 * - grid: Grid de 4 columnas para múltiples items
 * - centered: Contenido centrado vertical y horizontalmente
 */
const LAYOUT_CLASSES: Record<string, string> = {
  full: "w-full",
  twocol: "grid grid-cols-1 md:grid-cols-2 gap-12 items-center",
  grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8",
  centered: "flex flex-col items-center justify-center text-center",
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

/**
 * SectionBlock - Bloque de sección con layouts predefinidos
 * 
 * Proporciona diferentes estructuras de layout para organizar contenido:
 * 
 * - full: Sin estructura específica, el contenido ocupa todo el ancho
 * - twocol: Ideal para contenido con imagen + texto lado a lado
 * - grid: Para mostrar múltiples items en una cuadrícula
 * - centered: Para contenido que debe estar centrado (CTAs, títulos)
 * 
 * @param layout - Tipo de layout (por defecto "full")
 * @param className - Clases adicionales
 * @param children - Contenido del bloque
 * @returns Componente JSX del bloque de sección
 */
const SectionBlock: React.FC<SectionBlockProps> = ({ 
  layout = "full", 
  className = "", 
  children 
}) => (
  <section 
    className={`max-w-7xl mx-auto px-6 lg:px-12 py-12 md:py-20 ${LAYOUT_CLASSES[layout]} ${className}`}
  >
    {children}
  </section>
)

export default SectionBlock
