"use client"

// ============================================================================
// IMPORTS - Importaciones de bibliotecas
// ============================================================================

import type React from "react"
import { useRef, useState } from "react"

// ============================================================================
// TIPOS E INTERFACES
// ============================================================================

/**
 * Props del componente GlareHover
 *
 * @property children - Contenido hijo que tendrá el efecto de brillo
 * @property glareColor - Color del brillo en formato hexadecimal (ej: "#f2f2f2")
 * @property glareOpacity - Opacidad del brillo (0 a 1)
 * @property glareAngle - Ángulo del gradiente de brillo en grados
 * @property glareSize - Tamaño del efecto de brillo en porcentaje
 * @property transitionDuration - Duración de la animación en milisegundos
 * @property playOnce - Si el efecto solo se reproduce una vez por hover
 * @property className - Clases CSS adicionales
 * @property style - Estilos inline adicionales
 */
interface GlareHoverProps {
  children?: React.ReactNode
  glareColor?: string
  glareOpacity?: number
  glareAngle?: number
  glareSize?: number
  transitionDuration?: number
  playOnce?: boolean
  className?: string
  style?: React.CSSProperties
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

/**
 * GlareHover - Efecto de brillo que se mueve al hacer hover
 */
const GlareHover: React.FC<GlareHoverProps> = ({
  children,
  glareColor = "#f2f2f2",
  glareOpacity = 0.3,
  glareAngle = -45,
  glareSize = 200,
  transitionDuration = 900,
  playOnce = true,
  className = "",
  style = {},
}) => {
  // ============================================================================
  // PROCESAMIENTO DEL COLOR
  // ============================================================================

  const hexWithoutHash = glareColor.replace("#", "")
  let glareColorRgba = glareColor

  if (/^[\dA-Fa-f]{6}$/.test(hexWithoutHash)) {
    const red = Number.parseInt(hexWithoutHash.slice(0, 2), 16)
    const green = Number.parseInt(hexWithoutHash.slice(2, 4), 16)
    const blue = Number.parseInt(hexWithoutHash.slice(4, 6), 16)
    glareColorRgba = `rgba(${red}, ${green}, ${blue}, ${glareOpacity})`
  } else if (/^[\dA-Fa-f]{3}$/.test(hexWithoutHash)) {
    const red = Number.parseInt(hexWithoutHash[0] + hexWithoutHash[0], 16)
    const green = Number.parseInt(hexWithoutHash[1] + hexWithoutHash[1], 16)
    const blue = Number.parseInt(hexWithoutHash[2] + hexWithoutHash[2], 16)
    glareColorRgba = `rgba(${red}, ${green}, ${blue}, ${glareOpacity})`
  }

  // ============================================================================
  // REFERENCIAS Y ESTADOS
  // ============================================================================

  const glareOverlayRef = useRef<HTMLDivElement | null>(null)
  const [hasAnimationPlayed, setHasAnimationPlayed] = useState(false)

  // ============================================================================
  // FUNCIONES DE ANIMACIÓN
  // ============================================================================

  const animateGlareIn = () => {
    if (playOnce && hasAnimationPlayed) return

    const overlayElement = glareOverlayRef.current
    if (!overlayElement) return

    overlayElement.style.transition = "none"
    overlayElement.style.backgroundPosition = "-100% -100%, 0 0"

    void overlayElement.offsetHeight

    overlayElement.style.transition = `${transitionDuration}ms ease`
    overlayElement.style.backgroundPosition = "100% 100%, 0 0"

    setHasAnimationPlayed(true)
  }

  const animateGlareOut = () => {
    const overlayElement = glareOverlayRef.current
    if (!overlayElement) return

    overlayElement.style.transition = "none"
    overlayElement.style.backgroundPosition = "-100% -100%, 0 0"

    setHasAnimationPlayed(false)
  }

  // ============================================================================
  // ESTILOS DEL OVERLAY
  // ============================================================================

  const glareOverlayStyles: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    background: `linear-gradient(${glareAngle}deg,
        hsla(0,0%,0%,0) 60%,
        ${glareColorRgba} 70%,
        hsla(0,0%,0%,0) 100%)`,
    backgroundSize: `${glareSize}% ${glareSize}%, 100% 100%`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "-100% -100%, 0 0",
    pointerEvents: "none",
    zIndex: 2,
    borderRadius: style?.borderRadius,
  }

  // ============================================================================
  // RENDERIZADO
  // ============================================================================

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={style}
      onMouseEnter={animateGlareIn}
      onMouseLeave={animateGlareOut}
      aria-hidden="true"
    >
      <div ref={glareOverlayRef} style={glareOverlayStyles} aria-hidden="true" />

      {children}
    </div>
  )
}

export default GlareHover
