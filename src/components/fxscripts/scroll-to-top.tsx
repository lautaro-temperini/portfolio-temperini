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
    
    // Detectar el contenedor de scroll principal
    let scrollContainer: HTMLElement | Window = window
    
    if (typeof window !== 'undefined') {
      // Primero, intentar usar el scrollingElement estándar
      const documentScrollElement = document.scrollingElement || document.documentElement
      
      if (documentScrollElement.scrollHeight > documentScrollElement.clientHeight + 10) {
        scrollContainer = window
      } else {
        // Si el documento no tiene scroll, buscar contenedores con overflow
        const allElements = Array.from(document.querySelectorAll('*')) as HTMLElement[]
        const scrollableElements = allElements.filter(element => {
          const computedStyle = window.getComputedStyle(element)
          const hasVerticalScroll = 
            (computedStyle.overflowY === 'auto' || computedStyle.overflowY === 'scroll') && 
            element.scrollHeight > element.clientHeight + 10
          return hasVerticalScroll
        })
        
        if (scrollableElements.length > 0) {
          scrollContainer = scrollableElements[0]
        }
      }
    }

    /**
     * Función que obtiene la posición actual de scroll
     * Funciona tanto con window como con elementos HTML
     */
    const getCurrentScrollPosition = () => {
      if (scrollContainer === window) {
        return window.pageYOffset
      } else if (scrollContainer instanceof HTMLElement) {
        return scrollContainer.scrollTop
      }
      return 0
    }

    /**
     * Función que se ejecuta en cada evento de scroll
     * Determina si el botón debe estar visible
     */
    const handleScrollEvent = () => {
      const currentPosition = getCurrentScrollPosition()
      
      // Mostrar si el scroll es mayor a 50px
      if (currentPosition > 50) {
        setIsButtonVisible(true)
      } else {
        setIsButtonVisible(false)
      }
    }

    // Agregar listener de scroll
    scrollContainer.addEventListener("scroll", handleScrollEvent)
    
    // Limpiar al desmontar
    return () => scrollContainer.removeEventListener("scroll", handleScrollEvent)
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
    // Detectar el contenedor de scroll (misma lógica que arriba)
    let scrollContainer: HTMLElement | Window = window
    
    if (typeof window !== 'undefined') {
      const documentScrollElement = document.scrollingElement || document.documentElement
      
      if (documentScrollElement.scrollHeight > documentScrollElement.clientHeight + 10) {
        scrollContainer = window
      } else {
        const allElements = Array.from(document.querySelectorAll('*')) as HTMLElement[]
        const scrollableElements = allElements.filter(element => {
          const computedStyle = window.getComputedStyle(element)
          return (
            (computedStyle.overflowY === 'auto' || computedStyle.overflowY === 'scroll') && 
            element.scrollHeight > element.clientHeight + 10
          )
        })
        
        if (scrollableElements.length > 0) {
          scrollContainer = scrollableElements[0]
        }
      }
    }

    // Configuración de la animación
    const animationDuration = 300 // milisegundos
    const startPosition = scrollContainer === window 
      ? window.scrollY 
      : (scrollContainer as HTMLElement).scrollTop
    const totalDistance = -startPosition // Distancia negativa (hacia arriba)
    const animationStartTime = performance.now()

    /**
     * Función de curva de animación ease-in-out cubic
     * 
     * @param t - Progreso de la animación (0 a 1)
     * @returns Valor transformado con la curva
     */
    function easeInOutCubic(t: number) {
      return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2
    }

    /**
     * Función que ejecuta cada frame de la animación
     * 
     * @param currentTime - Tiempo actual proporcionado por requestAnimationFrame
     */
    function animateScroll(currentTime: number) {
      const elapsedTime = currentTime - animationStartTime
      const animationProgress = Math.min(elapsedTime / animationDuration, 1)
      const newPosition = startPosition + totalDistance * easeInOutCubic(animationProgress)
      
      // Aplicar la nueva posición de scroll
      if (scrollContainer === window) {
        window.scrollTo(0, newPosition)
      } else if (scrollContainer instanceof HTMLElement) {
        scrollContainer.scrollTop = newPosition
      }
      
      // Continuar animación si no ha terminado
      if (animationProgress < 1) {
        requestAnimationFrame(animateScroll)
      }
    }

    // Iniciar la animación
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
        style={{ 
          width: Math.max(size, 44), // Mínimo 44px para accesibilidad
          height: Math.max(size, 44) 
        }}
        className="fixed bottom-2 md:bottom-4 right-6 md:right-12 z-[99999] min-w-touch min-h-touch bg-white/10 backdrop-blur-sm flex items-center justify-center rounded-full hover:bg-white/20 transition-all duration-200 hover:scale-105"
        aria-label="Scroll to top"
      >
        <ArrowUp size={size * 0.42} color="#f2f2f2" />
      </button>
    ),
    document.body
  )
}
