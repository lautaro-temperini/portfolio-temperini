'use client'

// ============================================================================
// IMPORTS - Importaciones de librerías y componentes
// ============================================================================

import Link from "next/link"
import RevealOnScroll from "../fxscripts/reveal-on-scroll"
import type { Dictionary } from '@/lib/dictionary-types'

// ============================================================================
// TIPOS E INTERFACES
// ============================================================================

/**
 * Props del componente HeroContent
 * 
 * @property dict - Diccionario de traducciones que contiene los textos del hero
 *                  (título, subtítulo y texto del botón CTA)
 */
interface HeroContentProps {
  dict: Dictionary
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

/**
 * HeroContent - Contenido principal de la sección Hero
 * 
 * Este es un Client Component que recibe las traducciones desde el Server Component padre.
 * Muestra el título principal, subtítulo y botón de llamada a la acción (CTA).
 * 
 * Funcionalidades:
 * - Divide el título en múltiples líneas si contiene saltos de línea (\n)
 * - Animación de revelado al hacer scroll (RevealOnScroll)
 * - Scroll suave hacia la sección de proyectos al hacer clic en el CTA
 * 
 * @param dict - Diccionario con las traducciones del idioma actual
 * @returns Componente JSX con el contenido del hero
 */
export default function HeroContent({ dict }: HeroContentProps) {
  // ============================================================================
  // PROCESAMIENTO DE DATOS
  // ============================================================================
  
  /**
   * Divide el título del hero en líneas separadas
   * El título en el diccionario puede contener "\n" para indicar saltos de línea
   * Ejemplo: "Pensar distinto,\ncrear con intención." → ["Pensar distinto,", "crear con intención."]
   */
  const heroTitleLines = dict.hero.title.split('\n')

  // ============================================================================
  // FUNCIONES AUXILIARES
  // ============================================================================

  /**
   * Realiza un scroll suave hacia un elemento específico de la página
   * Usa una animación personalizada con curva de aceleración "ease-in-out"
   * 
   * @param targetElement - El elemento HTML hacia donde hacer scroll
   * @param animationDuration - Duración de la animación en milisegundos (por defecto 300ms)
   */
  function smoothScrollToElement(targetElement: HTMLElement, animationDuration = 300) {
    const startPosition = window.scrollY
    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY
    const totalDistance = targetPosition - startPosition
    const animationStartTime = performance.now()

    /**
     * Función que ejecuta cada frame de la animación de scroll
     * Calcula la posición actual basándose en el tiempo transcurrido
     * 
     * @param currentTime - Tiempo actual proporcionado por requestAnimationFrame
     */
    function animateScroll(currentTime: number) {
      const elapsedTime = currentTime - animationStartTime
      const animationProgress = Math.min(elapsedTime / animationDuration, 1)
      
      // Calcular y aplicar la nueva posición con la curva de animación
      window.scrollTo(0, startPosition + totalDistance * easeInOutCubic(animationProgress))
      
      // Continuar la animación si no ha terminado
      if (animationProgress < 1) {
        requestAnimationFrame(animateScroll)
      }
    }

    /**
     * Función de curva de animación "ease-in-out cubic"
     * Produce una animación que empieza lenta, acelera en el medio y termina lenta
     * 
     * Fórmula matemática:
     * - Primera mitad (t < 0.5): 4t³ (acelera)
     * - Segunda mitad (t >= 0.5): 1 - (-2t + 2)³ / 2 (desacelera)
     * 
     * @param t - Progreso de la animación (valor entre 0 y 1)
     * @returns Valor transformado con la curva de animación
     */
    function easeInOutCubic(t: number) {
      return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2
    }

    // Iniciar la animación
    requestAnimationFrame(animateScroll)
  }

  // ============================================================================
  // RENDERIZADO DEL COMPONENTE
  // ============================================================================

  return (
    <div className="w-full h-full flex flex-col items-start justify-center pt-32 md:pt-40 lg:pt-48 px-4 md:px-6 lg:px-10">
      
      {/* ==================== TÍTULO PRINCIPAL ==================== */}
      {/* El título se revela con animación cuando entra en el viewport */}
      <RevealOnScroll>
        <div className="mb-4 md:mb-6">
          <h1
            className="fluid-text-3xl md:fluid-text-4xl lg:fluid-text-5xl font-semibold leading-tight text-light max-w-full md:max-w-md lg:max-w-lg xl:max-w-sm"
            style={{ fontFamily: "var(--font-neue-haas)" }}
          >
            {/* Mapear cada línea del título y agregar <br> entre ellas */}
            {heroTitleLines.map((line, index) => (
              <span key={index}>
                {line}
                {/* Agregar salto de línea excepto después de la última línea */}
                {index < heroTitleLines.length - 1 && <br />}
              </span>
            ))}
          </h1>
        </div>
      </RevealOnScroll>

      {/* ==================== SUBTÍTULO ==================== */}
      {/* Se revela 100ms después del título para crear un efecto escalonado */}
      <RevealOnScroll delay={100}>
        <div className="mb-6 md:mb-8">
          <p
            className="fluid-text-base md:fluid-text-lg font-semibold leading-relaxed text-accent max-w-full md:max-w-md lg:max-w-lg xl:max-w-md"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            {dict.hero.subtitle}
          </p>
        </div>
      </RevealOnScroll>

      {/* ==================== BOTÓN CTA (CALL TO ACTION) ==================== */}
      {/* Se revela 200ms después del título (100ms después del subtítulo) */}
      <RevealOnScroll delay={200}>
        <Link
          href="/#projects"
          className="flex items-center justify-center w-full max-w-xs md:w-auto md:max-w-none md:min-w-[257px] min-h-[44px] h-8 md:h-[32px] bg-gradient-to-r from-[#F2F2F2] via-[#F2F2F2] to-[#9D00E0] rounded-full px-6 shadow-[0px_4px_25px_rgba(115,0,165,0.25)] transition-all duration-200 hover:shadow-[0px_6px_30px_rgba(115,0,165,0.4)] btn-primary group cursor-pointer"
          onClick={(event) => {
            event.preventDefault()
            
            // Buscar la sección de proyectos
            const projectsSection = document.getElementById("projects")
            
            if (projectsSection) {
              // Si existe, hacer scroll suave
              smoothScrollToElement(projectsSection, 300)
            } else {
              // Si no existe (por algún motivo), navegar con hash
              window.location.hash = '#projects'
            }
          }}
        >
          <span
            className="fluid-text-sm font-semibold text-background group-hover:text-background transition-colors"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {dict.hero.cta}
          </span>
        </Link>
      </RevealOnScroll>
    </div>
  )
}
