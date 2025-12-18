"use client"

// ============================================================================
// IMPORTS - Importaciones de librerías y componentes
// ============================================================================

import type React from "react"
import Image from "next/image"
import { useRef, useState, useEffect } from "react"

// ============================================================================
// CONSTANTES DE CONFIGURACIÓN
// ============================================================================

/**
 * Valores de configuración para la animación tipo "spring" (resorte)
 * Estos valores controlan cómo la tarjeta vuelve a su posición original
 * 
 * @property damping - Amortiguación: qué tan rápido se detiene el movimiento
 * @property stiffness - Rigidez: qué tan "duro" es el resorte
 * @property mass - Masa: qué tan "pesado" se siente el elemento
 */
const SPRING_ANIMATION_CONFIG = {
  damping: 50,
  stiffness: 80,
  mass: 1.5,
}

// ============================================================================
// TIPOS E INTERFACES
// ============================================================================

/**
 * Props del componente TiltedCard
 * 
 * @property imageSrc - Ruta de la imagen a mostrar
 * @property altText - Texto alternativo para accesibilidad
 * @property captionText - Texto opcional que aparece como tooltip o caption
 * @property className - Clases CSS adicionales
 * @property aspectRatio - Proporción de la imagen (ancho/alto, ej: 16/9 = 1.77)
 * @property scaleOnHover - Factor de escala al hacer hover (ej: 1.02 = 2% más grande)
 * @property rotateAmplitude - Qué tanto puede rotar la tarjeta en grados
 * @property showMobileWarning - Si mostrar advertencia en móvil (no usado actualmente)
 * @property showTooltip - Si mostrar el tooltip con el captionText
 */
interface TiltedCardProps {
  imageSrc: string
  altText?: string
  captionText?: string
  className?: string
  aspectRatio?: number
  scaleOnHover?: number
  rotateAmplitude?: number
  showMobileWarning?: boolean
  showTooltip?: boolean
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

/**
 * TiltedCard - Tarjeta con efecto de inclinación 3D al mover el mouse
 * 
 * Este componente crea un efecto visual donde la tarjeta parece "seguir"
 * el cursor del mouse, rotando ligeramente en el eje X e Y.
 * 
 * Características:
 * - Efecto 3D de inclinación basado en la posición del mouse
 * - Escala al hacer hover
 * - Tooltip opcional que sigue el cursor
 * - Desactivado en móviles para mejor rendimiento
 * - Estado de carga con skeleton mientras monta
 * 
 * @param imageSrc - URL de la imagen
 * @param altText - Texto alternativo
 * @param captionText - Texto del tooltip
 * @param className - Clases CSS adicionales
 * @param aspectRatio - Proporción de aspecto (por defecto 16/9)
 * @param scaleOnHover - Factor de escala (por defecto 1.02)
 * @param rotateAmplitude - Amplitud de rotación en grados (por defecto 6)
 * @param showMobileWarning - Mostrar advertencia en móvil
 * @param showTooltip - Mostrar tooltip (por defecto true)
 * @returns Componente JSX de la tarjeta con efecto de inclinación
 */
export default function TiltedCard({
  imageSrc,
  altText = "Tilted card image",
  captionText = "",
  className = "",
  aspectRatio = 16 / 9,
  scaleOnHover = 1.02,
  rotateAmplitude = 6,
  showMobileWarning = true,
  showTooltip = true,
}: TiltedCardProps) {
  // ============================================================================
  // REFERENCIAS Y ESTADOS
  // ============================================================================
  
  /**
   * useRef para obtener referencia al elemento del DOM
   * Se usa para calcular la posición del mouse relativa a la tarjeta
   */
  const cardRef = useRef<HTMLElement>(null)
  
  /**
   * Estado para la transformación 3D de la tarjeta
   * - rotateX: rotación en el eje X (arriba/abajo)
   * - rotateY: rotación en el eje Y (izquierda/derecha)
   * - scale: factor de escala
   */
  const [cardTransform, setCardTransform] = useState({ 
    rotateX: 0, 
    rotateY: 0, 
    scale: 1 
  })
  
  /**
   * Estado para la posición y visibilidad del tooltip
   * - x, y: coordenadas relativas a la tarjeta
   * - opacity: 0 = oculto, 1 = visible
   */
  const [tooltipPosition, setTooltipPosition] = useState({ 
    x: 0, 
    y: 0, 
    opacity: 0 
  })
  
  /**
   * Estados de control
   * - isMobile: true si el ancho de pantalla es menor a 768px
   * - isMounted: true cuando el componente ya se montó en el cliente
   */
  const [isMobileDevice, setIsMobileDevice] = useState(false)
  const [isComponentMounted, setIsComponentMounted] = useState(false)

  // ============================================================================
  // EFECTOS
  // ============================================================================

  /**
   * useEffect para detectar el tamaño de pantalla y si es móvil
   * Se ejecuta al montar y cuando la ventana cambia de tamaño
   */
  useEffect(() => {
    setIsComponentMounted(true)
    
    /**
     * Función que verifica el tamaño de pantalla
     * Considera "móvil" cualquier pantalla menor a 768px
     */
    const checkScreenSize = () => {
      if (typeof window !== "undefined") {
        setIsMobileDevice(window.innerWidth < 768)
      }
    }
    
    // Verificar tamaño inicial
    checkScreenSize()
    
    // Escuchar cambios de tamaño de ventana
    window.addEventListener("resize", checkScreenSize)
    
    // Limpiar listener al desmontar
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  // ============================================================================
  // FUNCIONES DE MANEJO DE EVENTOS
  // ============================================================================

  /**
   * Maneja el movimiento del mouse sobre la tarjeta
   * Calcula la rotación basándose en la posición del cursor
   * 
   * @param event - Evento del mouse
   */
  function handleMouseMove(event: React.MouseEvent) {
    // No hacer nada si no hay referencia, es móvil, o no está montado
    if (!cardRef.current || isMobileDevice || !isComponentMounted) return

    // Obtener las dimensiones y posición de la tarjeta
    const cardBounds = cardRef.current.getBoundingClientRect()
    
    // Calcular la posición del mouse relativa al centro de la tarjeta
    const mouseOffsetX = event.clientX - cardBounds.left - cardBounds.width / 2
    const mouseOffsetY = event.clientY - cardBounds.top - cardBounds.height / 2

    // Calcular las rotaciones
    // El eje X rota basándose en la posición Y del mouse (invertido)
    // El eje Y rota basándose en la posición X del mouse
    const rotationX = (mouseOffsetY / (cardBounds.height / 2)) * -rotateAmplitude * 0.5
    const rotationY = (mouseOffsetX / (cardBounds.width / 2)) * rotateAmplitude * 0.5

    // Actualizar el estado de transformación
    setCardTransform({
      rotateX: rotationX,
      rotateY: rotationY,
      scale: scaleOnHover,
    })

    // Actualizar la posición del tooltip
    setTooltipPosition({
      x: event.clientX - cardBounds.left,
      y: event.clientY - cardBounds.top,
      opacity: 1,
    })
  }

  /**
   * Maneja cuando el mouse sale de la tarjeta
   * Resetea la rotación y oculta el tooltip
   */
  function handleMouseLeave() {
    if (!isComponentMounted) return
    
    // Resetear transformación a valores iniciales
    setCardTransform({ rotateX: 0, rotateY: 0, scale: 1 })
    
    // Ocultar tooltip manteniendo la posición
    setTooltipPosition((previousPosition) => ({ ...previousPosition, opacity: 0 }))
  }

  // ============================================================================
  // RENDERIZADO CONDICIONAL - ESTADO DE CARGA
  // ============================================================================

  /**
   * Si el componente no está montado, mostrar un skeleton
   * Esto evita problemas de hidratación en SSR
   */
  if (!isComponentMounted) {
    return (
      <figure className={`relative flex flex-col items-center justify-center ${className}`}>
        <div
          className="relative w-full bg-gray-200 rounded-[15px] skeleton"
          style={{
            width: "100%",
            // Calcular el padding-bottom para mantener la proporción de aspecto
            paddingBottom: `${100 / aspectRatio}%`,
          }}
        />
        {captionText && (
          <div className="mt-3 text-center font-medium">{captionText}</div>
        )}
      </figure>
    )
  }

  // ============================================================================
  // RENDERIZADO PRINCIPAL
  // ============================================================================

  return (
    <figure
      ref={cardRef}
      className={`relative flex flex-col items-center justify-center ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "800px" }} // Necesario para el efecto 3D
    >
      {/* Contenedor de la imagen con transformación 3D */}
      <div
        className="relative w-full transition-all duration-500 ease-out"
        style={{
          width: "100%",
          // Mantener proporción de aspecto
          paddingBottom: `${100 / aspectRatio}%`,
          // Aplicar transformación solo en desktop
          transform: isMobileDevice
            ? "none"
            : `rotateX(${cardTransform.rotateX}deg) rotateY(${cardTransform.rotateY}deg) scale(${cardTransform.scale})`,
          // Necesario para que los hijos respeten el espacio 3D
          transformStyle: "preserve-3d",
        }}
      >
        <Image
          src={imageSrc || "/images/foto-lautaro.png"}
          alt={altText}
          fill
          className="object-cover rounded-[15px]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* ==================== TOOLTIP (SOLO DESKTOP) ==================== */}
      {/* Tooltip que sigue el cursor, visible solo si showTooltip es true y hay captionText */}
      {showTooltip && !isMobileDevice && captionText && (
        <div
          className="pointer-events-none absolute left-0 top-0 rounded-sm bg-[#E6DADA] px-2.5 py-1 text-[10px] text-[#2d2d2d] z-[3] transition-opacity duration-200"
          style={{
            left: tooltipPosition.x,
            top: tooltipPosition.y,
            opacity: tooltipPosition.opacity,
          }}
        >
          {captionText}
        </div>
      )}

      {/* ==================== CAPTION (MÓVIL O SIN TOOLTIP) ==================== */}
      {/* Texto fijo debajo de la imagen si es móvil o si showTooltip es false */}
      {captionText && (isMobileDevice || !showTooltip) && (
        <div className="mt-3 text-center font-medium text-white">
          {captionText}
        </div>
      )}
    </figure>
  )
}
