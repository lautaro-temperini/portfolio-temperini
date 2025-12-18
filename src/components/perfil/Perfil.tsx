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
    <section id="about" className="relative w-full min-h-screen flex items-center" style={{ background: "conic-gradient(...)" }}>
  <div className="w-full h-full flex flex-col justify-center mb-24 px-4 md:px-6 lg:px-10">

{/* TÍTULO "ABOUT" */}
<div className="mb-8 sm:mb-10 md:-mb-12 lg:-mb-16 mt-8">
  <PerfilAboutTitle text={dictionary.about.title} />
</div>

    {/* CONTENEDOR DE CONTENIDO */}
    <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 lg:gap-12 xl:gap-16 flex-1">

      {/* TEXTO */}
      <div className="flex-1 max-w-2xl lg:max-w-xl xl:max-w-2xl mt-0">
        <RevealOnScroll delay={100}>
          <p className="mb-10 md:mb-12 mt-0 text-lg sm:text-xl md:text-2xl xl:text-[28px] 2xl:text-[32px] font-semibold leading-relaxed xl:leading-[36px] 2xl:leading-[40px] text-light" style={{ fontFamily: "var(--font-manrope)" }}>
            {dictionary.about.text1}
          </p>

          {/* IMAGEN MÓVIL */}
          <div className="block md:hidden w-full my-12 flex justify-center">
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

          <p className="text-lg sm:text-xl md:text-2xl xl:text-[28px] 2xl:text-[32px] font-semibold leading-relaxed xl:leading-[36px] 2xl:leading-[40px] text-light mt-0 text-right md:text-left"  style={{ fontFamily: "var(--font-manrope)" }}>
            {dictionary.about.text2}
          </p>
        </RevealOnScroll>
      </div>

      {/* IMAGEN DESKTOP */}
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
  )}

