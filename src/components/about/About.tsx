// ============================================================================
// IMPORTS - Importaciones de librerías y componentes
// ============================================================================

import { getDictionary } from '@/lib/getDictionary'
import TiltedCard from "./TiltedCard"
import RevealOnScroll from "../fxscripts/reveal-on-scroll"

// ============================================================================
// TIPOS E INTERFACES
// ============================================================================

/**
 * Props del componente About
 * 
 * @property lang - Código de idioma ('es' para español, 'en' para inglés)
 *                  Se usa para obtener las traducciones correspondientes
 */
interface AboutProps {
  lang: 'es' | 'en'
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

/**
 * About - Sección "Sobre mí" del portfolio
 * 
 * Este es un Server Component (async) que:
 * 1. Obtiene las traducciones usando getDictionary()
 * 2. Muestra un título grande "ABOUT" o su traducción
 * 3. Muestra dos párrafos de texto sobre el diseñador
 * 4. Incluye una foto del diseñador con efecto de inclinación (TiltedCard)
 * 
 * El layout cambia entre móvil y desktop:
 * - Móvil: Imagen entre los dos párrafos
 * - Desktop: Imagen a la derecha de ambos párrafos
 * 
 * El fondo tiene un gradiente cónico que crea un efecto visual interesante
 * 
 * @param lang - Código del idioma actual ('es' o 'en')
 * @returns Componente JSX de la sección About
 */
export default async function About({ lang }: AboutProps) {
  // Obtener diccionario de traducciones para el idioma especificado
  const dictionary = await getDictionary(lang)

  return (
    <section
      id="about"
      className="relative w-full min-h-screen flex items-center"
      style={{
        // Gradiente cónico que crea un efecto de luz desde una esquina
        background:
          "conic-gradient(from 203.7deg at 53.78% 39.65%, #0D0D0D 0deg, #0D0D0D 114.23deg, #666973 238.85deg, #0D0D0D 360deg)",
      }}
    >
      <div className="w-full h-full flex flex-col justify-center mb-24 px-4 md:px-6 lg:px-10">
        
        {/* ==================== TÍTULO "ABOUT" ==================== */}
        {/* Título muy grande que se revela con animación */}
        <RevealOnScroll className="about-slide-in">
          <div className="mb-0 mt-6">
            <h2
              className="fluid-text-7xl md:fluid-text-8xl lg:fluid-text-9xl font-semibold leading-none text-[#A6A6A6]"
              style={{ 
                fontFamily: "var(--font-neue-haas)",
                // Filtros para mejorar la legibilidad
                filter: "contrast(1.1) brightness(1.05)",
                // Modo de mezcla para integrar mejor con el fondo
                mixBlendMode: "lighten"
              }}
            >
              {dictionary.about.title}
            </h2>
          </div>
        </RevealOnScroll>

        {/* ==================== CONTENEDOR DE CONTENIDO ==================== */}
        {/* Layout flexible que cambia de columna (móvil) a fila (desktop) */}
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 lg:gap-12 xl:gap-16 flex-1">
          
          {/* ==================== CONTENIDO IZQUIERDO - TEXTO ==================== */}
          <div className="flex-1 max-w-2xl lg:max-w-xl xl:max-w-2xl mt-0">
            <RevealOnScroll delay={100}>
              {/* Primer párrafo */}
              <p
                className="mt-0 fluid-text-lg md:fluid-text-xl lg:fluid-text-2xl font-semibold leading-relaxed text-[#F2F2F2]"
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                {dictionary.about.text1}
              </p>
              
              {/* ==================== IMAGEN - SOLO MÓVIL ==================== */}
              {/* En móvil, la imagen aparece entre los dos párrafos */}
              <div className="block md:hidden w-full my-6 flex justify-center">
                <div className="w-full max-w-xs sm:max-w-sm">
                  <TiltedCard
                    imageSrc="/images/foto-lautaro.png"
                    altText="Lautaro R. Temperini - Diseñador Multimedia"
                    captionText=""
                    aspectRatio={1}
                    scaleOnHover={1.02}
                    rotateAmplitude={4}
                    showTooltip={false}
                  />
                </div>
              </div>
              
              {/* Segundo párrafo */}
              <p
                className="fluid-text-base md:fluid-text-lg lg:fluid-text-xl font-semibold leading-relaxed text-[#F2F2F2] mt-4 text-right md:text-left"
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                {dictionary.about.text2}
              </p>
            </RevealOnScroll>
          </div>

          {/* ==================== CONTENIDO DERECHO - IMAGEN DESKTOP ==================== */}
          {/* En desktop (md+), la imagen aparece a la derecha */}
          <div className="w-full md:w-1/2 xl:w-[45%] flex-shrink-0 flex justify-center md:justify-end -mt-24 hidden md:block">
            <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl">
              <TiltedCard
                imageSrc="/images/foto-lautaro.png"
                altText="Lautaro R. Temperini - Diseñador Multimedia"
                captionText=""
                aspectRatio={1}
                scaleOnHover={1.02}
                rotateAmplitude={4}
                showTooltip={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
