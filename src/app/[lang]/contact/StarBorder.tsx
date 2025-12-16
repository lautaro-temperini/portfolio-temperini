// ============================================================================
// TIPOS E INTERFACES
// ============================================================================

/**
 * Props del componente StarBorder
 * 
 * @property className - Clases CSS adicionales para estilizar el SVG
 */
interface StarBorderProps {
  className?: string
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

/**
 * StarBorder - Ícono SVG de una estrella con borde
 * 
 * Este componente renderiza un ícono de estrella de 5 puntas
 * con solo el borde (sin relleno), en el color morado de la marca.
 * 
 * El SVG usa:
 * - stroke: Para dibujar el borde
 * - strokeWidth: Grosor del borde (2px)
 * - strokeLinejoin: Cómo se unen las líneas (rounded)
 * 
 * @param className - Clases CSS para personalizar tamaño, color, etc.
 * @returns Componente JSX del ícono SVG
 */
const StarBorder: React.FC<StarBorderProps> = ({ className }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Path de la estrella de 5 puntas */}
    <path
      d="M12 2L14.09 8.26L20.97 8.27L15.45 12.14L17.54 18.4L12 14.53L6.46 18.4L8.55 12.14L3.03 8.27L9.91 8.26L12 2Z"
      stroke="#8900C3"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
)

export default StarBorder
