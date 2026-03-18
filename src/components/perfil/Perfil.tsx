// ============================================================================
// IMPORTS - Importaciones de librerías y componentes
// ============================================================================

import { getDictionary } from '@/lib/getDictionary'
import TiltedCard from "./TiltedCard"
import RevealOnScroll from "../fxscripts/reveal-on-scroll"
import PerfilAboutTitle from './PerfilAboutTitle'

// ============================================================================
// TIPOS E INTERFACES
// ============================================================================

/**
 * Props del componente Perfil
 * 
 * @property lang - Código de idioma ('es' para español, 'en' para inglés)
 *                  Se usa para obtener las traducciones correspondientes
 */
interface PerfilProps {
  lang: 'es' | 'en'
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

/**
 * Perfil - Sección "Sobre mí" del portfolio
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
 * @returns Componente JSX de la sección Perfil
 */
export default async function Perfil({ lang }: PerfilProps) {
  // Obtener diccionario de traducciones para el idioma especificado
  const dictionary = await getDictionary(lang)

  return (
    <section
      id="about"
      className="relative w-full min-h-screen flex items-center px-4 md:px-6 lg:px-10 perfil-bg"
    >
      <div className="w-full h-full flex flex-col justify-center">

        {/* CONTENEDOR PRINCIPAL - 2 columnas */}
        <div className="flex flex-col md:flex-row items-start gap-8 w-full">

          {/* COLUMNA IZQUIERDA: título + texto */}
          <div className="w-full md:w-1/2 flex flex-col">
            <div className="mb-2">
              <PerfilAboutTitle text={dictionary.about.title} />
            </div>
            <RevealOnScroll delay={100}>
              <p
                className="mb-6 mt-0 text-base sm:text-lg md:text-xl xl:text-2xl font-semibold leading-relaxed text-light font-manrope"
              >
                {dictionary.about.text1}
                <br />
                <br />
                {dictionary.about.text2}
              </p>
              {/* IMAGEN MÓVIL */}
              <div className="block md:hidden w-full my-12">
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
              <p
                className="text-base sm:text-lg md:text-xl xl:text-2xl font-semibold leading-relaxed text-light font-manrope"
              >
                {dictionary.about.text3}
              </p>
            </RevealOnScroll>
          </div>

          {/* COLUMNA DERECHA: imagen desktop */}
          <div className="hidden md:block w-1/2">
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
    </section>
  )}

