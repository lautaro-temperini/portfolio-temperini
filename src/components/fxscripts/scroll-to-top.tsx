"use client"

// ============================================================================
// IMPORTS - Importaciones de librerías
// ============================================================================

import { useState, useEffect } from "react"
import { ArrowUp } from "lucide-react"
import { createPortal } from "react-dom"

// ============================================================================
// TIPOS E INTERFACES
// ============================================================================

/**
 * Props del componente ScrollToTop
 * 
 * @property size - Tamaño del botón en píxeles (por defecto 32)
 */
interface ScrollToTopProps {
  size?: number
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

/**
 * ScrollToTop - Botón flotante que permite volver al inicio de la página
 * 
 * Este componente muestra un botón fijo en la esquina inferior derecha
 * que aparece cuando el usuario hace scroll hacia abajo. Al hacer clic,
 * realiza un scroll suave animado hacia el tope de la página.
 * 
 * Características:
 * - Se muestra solo cuando el usuario ha hecho scroll más de 50px
 * - Se oculta cuando el footer es visible (para no tapar contenido)
 * - Usa createPortal para renderizarse directamente en el body
 * - Animación suave con curva ease-in-out
 * - Detecta automáticamente el contenedor de scroll principal
 * 
 * @param size - Tamaño del botón en píxeles
 * @returns Componente JSX del botón (renderizado via portal)
 */
export default function ScrollToTop({ size = 32 }: ScrollToTopProps) {
  // ============================================================================
  // ESTADOS
  // ============================================================================

  /**
   * Estado que controla si el botón está visible
   * Se muestra cuando el usuario ha hecho scroll más de 50px
   */
  const [isButtonVisible, setIsButtonVisible] = useState(false)
  
  /**
   * Estado que indica si el componente está montado en el cliente
   * Necesario para usar createPortal (que requiere acceso al DOM)
   */
  const [isClientMounted, setIsClientMounted] = useState(false)
  
  /**
   * Estado que indica si el footer está visible
   * Cuando el footer es visible, ocultamos el botón para no taparlo
   */
  const [isFooterVisible, setIsFooterVisible] = useState(false)

  // ============================================================================
  // EFECTO: DETECTAR SCROLL Y MOSTRAR/OCULTAR BOTÓN
  // ============================================================================

  /**
   * useEffect que detecta el scroll y determina si mostrar el botón
   * También detecta cuál es el contenedor de scroll principal
   */
  useEffect(() => {
    setIsClientMounted(true)

    const checkPosition = () => {
      const pos = window.pageYOffset || window.scrollY || document.documentElement.scrollTop || 0
      setIsButtonVisible(pos > 50)
    }

    checkPosition()

    window.addEventListener('scroll', checkPosition, { passive: true })

    return () => {
      window.removeEventListener('scroll', checkPosition)
    }
  }, [])

  // ============================================================================
  // EFECTO: DETECTAR VISIBILIDAD DEL FOOTER
  // ============================================================================

  /**
   * useEffect que usa Intersection Observer para detectar
   * cuando el footer es visible y ocultar el botón
   */
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    // Buscar el elemento footer
    const footerElement = document.querySelector('footer')
    if (!footerElement) return
    
    // Crear observer para detectar visibilidad del footer
    const footerObserver = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsFooterVisible(entry.isIntersecting)
        })
      },
      {
        root: null,
        threshold: 0.1, // Se considera visible cuando el 10% es visible
      }
    )
    
    // Empezar a observar el footer
    footerObserver.observe(footerElement)
    
    // Limpiar al desmontar
    return () => footerObserver.disconnect()
  }, [])

  // ============================================================================
  // FUNCIÓN DE SCROLL AL TOPE
  // ============================================================================

  /**
   * Función que realiza el scroll suave hacia el tope de la página
   * Usa una animación personalizada con curva ease-in-out
   */
  const scrollToTopOfPage = () => {
    const duration = 600
    const startPosition = window.scrollY || window.pageYOffset || 0
    const startTime = performance.now()

    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      window.scrollTo({ top: startPosition * (1 - easeInOutCubic(progress)), behavior: 'instant' as ScrollBehavior })
      if (progress < 1) requestAnimationFrame(animateScroll)
    }

    requestAnimationFrame(animateScroll)
  }

  // ============================================================================
  // RENDERIZADO
  // ============================================================================

  // No renderizar nada si no estamos en el cliente
  if (!isClientMounted) return null
  
  // Usar createPortal para renderizar el botón directamente en el body
  // Esto asegura que el botón esté siempre encima de todo el contenido
  return createPortal(
    isButtonVisible && !isFooterVisible && (
      <button
        onClick={scrollToTopOfPage}
        className="fixed bottom-2 md:bottom-4 right-6 md:right-12 z-[99999] min-w-touch min-h-touch bg-white/10 backdrop-blur-sm flex items-center justify-center rounded-full hover:bg-white/20 scroll-to-top-dynamic-size"
        aria-label="Scroll to top"
      >
        <ArrowUp size={size * 0.42} color="#f2f2f2" />
      </button>
    ),
    document.body
  )
}
