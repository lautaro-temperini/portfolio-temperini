'use client'

// ============================================================================
// IMPORTS
// ============================================================================

import React, { useRef, useState } from "react"

// ============================================================================
// TIPOS E INTERFACES
// ============================================================================

/**
 * Tipo para la posición del efecto spotlight
 */
interface SpotlightPosition {
  x: number
  y: number
}

/**
 * Props del componente SpotlightCard
 * 
 * @property children - Contenido de la tarjeta
 * @property className - Clases CSS adicionales
 * @property spotlightColor - Color del efecto spotlight en formato RGBA
 */
interface SpotlightCardProps extends React.PropsWithChildren {
  className?: string
  spotlightColor?: `rgba(${number}, ${number}, ${number}, ${number})`
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

/**
 * SpotlightCard - Tarjeta con efecto de luz que sigue el cursor
 * 
 * Este componente crea una tarjeta con un efecto de "spotlight" (foco de luz)
 * que sigue la posición del cursor del mouse, creando una experiencia interactiva.
 * 
 * Funcionamiento:
 * 1. Al mover el mouse, se actualiza la posición del gradiente radial
 * 2. El gradiente crea un efecto de luz circular en la posición del cursor
 * 3. Al hacer focus (teclado), se muestra una versión más sutil del efecto
 * 4. Al salir, el efecto desaparece gradualmente
 * 
 * La tarjeta tiene estilos de glassmorphism (efecto vidrio) con:
 * - Fondo semi-transparente
 * - Borde semi-transparente
 * - Backdrop blur para el efecto de vidrio esmerilado
 * 
 * @param children - Contenido de la tarjeta
 * @param className - Clases CSS adicionales
 * @param spotlightColor - Color del spotlight (por defecto un gris muy claro)
 * @returns Componente JSX de la tarjeta con efecto spotlight
 */
const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = "",
  spotlightColor = "rgba(245, 245, 245, 0.04)"
}) => {
  // ============================================================================
  // REFERENCIAS Y ESTADOS
  // ============================================================================

  /**
   * Referencia al elemento div de la tarjeta
   * Necesaria para calcular la posición relativa del mouse
   */
  const cardRef = useRef<HTMLDivElement>(null)
  
  /**
   * Estado que indica si la tarjeta tiene focus (navegación por teclado)
   */
  const [isFocused, setIsFocused] = useState<boolean>(false)
  
  /**
   * Posición actual del efecto spotlight
   */
  const [spotlightPosition, setSpotlightPosition] = useState<SpotlightPosition>({ 
    x: 0, 
    y: 0 
  })
  
  /**
   * Opacidad del efecto spotlight (0 = invisible, 1 = máximo)
   */
  const [spotlightOpacity, setSpotlightOpacity] = useState<number>(0)

  // ============================================================================
  // MANEJADORES DE EVENTOS
  // ============================================================================

  /**
   * Actualiza la posición del spotlight cuando el mouse se mueve
   */
  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (event) => {
    if (!cardRef.current || isFocused) return

    const cardBounds = cardRef.current.getBoundingClientRect()
    setSpotlightPosition({ 
      x: event.clientX - cardBounds.left, 
      y: event.clientY - cardBounds.top 
    })
  }

  /**
   * Muestra una versión sutil del spotlight cuando se hace focus
   * Útil para usuarios que navegan con teclado
   */
  const handleFocus = () => {
    setIsFocused(true)
    setSpotlightOpacity(0.2)
  }

  /**
   * Oculta el spotlight cuando se pierde el focus
   */
  const handleBlur = () => {
    setIsFocused(false)
    setSpotlightOpacity(0)
  }

  /**
   * Muestra el spotlight cuando el mouse entra a la tarjeta
   */
  const handleMouseEnter = () => {
    setSpotlightOpacity(0.9)
  }

  /**
   * Oculta el spotlight cuando el mouse sale de la tarjeta
   */
  const handleMouseLeave = () => {
    setSpotlightOpacity(0)
  }

  // ============================================================================
  // RENDERIZADO
  // ============================================================================

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md shadow-lg overflow-hidden p-8 ${className}`}
      style={{
        // Estilos de glassmorphism para el efecto de vidrio
        WebkitBackdropFilter: 'blur(12px) saturate(180%)',
        backdropFilter: 'blur(12px) saturate(180%)',
        border: '1px solid rgba(255,255,255,0.18)',
      }}
    >
      {/* ==================== CAPA DEL EFECTO SPOTLIGHT ==================== */}
      {/* Gradiente radial que crea el efecto de luz */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out"
        style={{
          opacity: spotlightOpacity,
          background: `radial-gradient(circle at ${spotlightPosition.x}px ${spotlightPosition.y}px, ${spotlightColor}, transparent 80%)`,
        }}
      />
      
      {/* Contenido de la tarjeta */}
      {children}
    </div>
  )
}

export default SpotlightCard
