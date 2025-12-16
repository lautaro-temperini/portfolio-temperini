"use client"

// ============================================================================
// IMPORTS - Importaciones de librerías
// ============================================================================

import type React from "react"
import { useEffect, useRef, useState } from "react"

// ============================================================================
// TIPOS E INTERFACES
// ============================================================================

/**
 * Props del componente RevealOnScroll
 * 
 * @property children - Contenido que se revelará con la animación
 * @property delay - Retraso en milisegundos antes de iniciar la animación
 * @property className - Clases CSS adicionales
 */
interface RevealOnScrollProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

/**
 * RevealOnScroll - Componente que revela su contenido con animación al hacer scroll
 * 
 * Utiliza la Intersection Observer API para detectar cuando el elemento
 * entra en el viewport (área visible de la pantalla). Cuando esto ocurre,
 * añade una clase CSS que activa la animación de revelado.
 * 
 * Funcionamiento:
 * 1. El componente comienza invisible (controlado por CSS)
 * 2. Cuando el usuario hace scroll y el elemento entra en el viewport
 * 3. Después del delay especificado, se añade la clase "revealed"
 * 4. La animación solo ocurre una vez (el observer se desconecta)
 * 
 * La animación real se define en los estilos CSS con las clases:
 * - ".reveal" - Estado inicial (invisible)
 * - ".revealed" - Estado final (visible)
 * 
 * @param children - Contenido a animar
 * @param delay - Retraso antes de la animación (por defecto 0ms)
 * @param className - Clases CSS adicionales
 * @returns Componente JSX con el contenido envuelto en el efecto de revelado
 */
export default function RevealOnScroll({ 
  children, 
  delay = 0, 
  className = "" 
}: RevealOnScrollProps) {
  // ============================================================================
  // ESTADOS Y REFERENCIAS
  // ============================================================================

  /**
   * Estado que controla si el elemento está visible
   * Cuando es true, se añade la clase "revealed" al elemento
   */
  const [isElementVisible, setIsElementVisible] = useState(false)
  
  /**
   * Referencia al elemento del DOM que estamos observando
   * Necesaria para conectar el Intersection Observer
   */
  const elementRef = useRef<HTMLDivElement>(null)

  // ============================================================================
  // EFECTO DE INTERSECTION OBSERVER
  // ============================================================================

  /**
   * useEffect que configura el Intersection Observer
   * 
   * El Intersection Observer es una API del navegador que permite
   * detectar cuando un elemento entra o sale del viewport de forma eficiente,
   * sin necesidad de escuchar eventos de scroll constantemente.
   */
  useEffect(() => {
    // Guardar referencia para usar en el cleanup
    const currentElement = elementRef.current
    
    /**
     * Crear el Intersection Observer con las opciones:
     * - threshold: 0.1 = se activa cuando el 10% del elemento es visible
     * - rootMargin: Margen adicional (negativo = activa antes de que sea completamente visible)
     */
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        // Procesar cada entrada observada
        entries.forEach((entry) => {
          // Si el elemento está intersectando (entrando en el viewport)
          if (entry.isIntersecting) {
            // Aplicar el delay antes de revelar
            setTimeout(() => {
              setIsElementVisible(true)
            }, delay)
            
            // Dejar de observar este elemento (la animación solo ocurre una vez)
            intersectionObserver.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1, // 10% del elemento visible
        rootMargin: "0px 0px -50px 0px", // Activar 50px antes de que llegue al borde inferior
      },
    )

    // Empezar a observar el elemento si existe
    if (currentElement) {
      intersectionObserver.observe(currentElement)
    }

    // ============================================================================
    // FUNCIÓN DE LIMPIEZA
    // ============================================================================
    
    /**
     * Cleanup: dejar de observar cuando el componente se desmonte
     * Esto es importante para evitar memory leaks
     */
    return () => {
      if (currentElement) {
        intersectionObserver.unobserve(currentElement)
      }
    }
  }, [delay]) // Re-ejecutar si el delay cambia

  // ============================================================================
  // RENDERIZADO
  // ============================================================================

  return (
    <div 
      ref={elementRef} 
      className={`reveal ${isElementVisible ? "revealed" : ""} ${className}`} 
      aria-hidden="true" // El efecto es puramente visual
    >
      {children}
    </div>
  )
}
