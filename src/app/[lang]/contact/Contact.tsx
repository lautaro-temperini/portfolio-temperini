// ============================================================================
// IMPORTS
// ============================================================================

import ContactForm from "./ContactForm"
import SpotlightCard from "./SpotlightCard"
import { socialLinks } from "@/data/socialLinks"
import Image from "next/image"
import type { Dictionary } from '@/lib/dictionary-types'

// ============================================================================
// TIPOS E INTERFACES
// ============================================================================

/**
 * Props del componente Contact
 * 
 * @property dict - Diccionario de traducciones con los textos del formulario
 */
interface ContactProps {
  dict: Dictionary
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

/**
 * Contact - Sección de contacto con formulario
 * 
 * Muestra una tarjeta centrada con:
 * - Un título de bienvenida
 * - El formulario de contacto
 * - Iconos de redes sociales (solo en móvil/tablet)
 * 
 * El componente SpotlightCard añade un efecto de "spotlight" que
 * sigue el cursor del mouse, creando una experiencia interactiva.
 * 
 * @param dict - Diccionario con las traducciones
 * @returns Componente JSX de la sección de contacto
 */
const Contact: React.FC<ContactProps> = ({ dict }) => {
  return (
    <section className="flex flex-col items-center px-4 md:px-6 lg:px-8 relative pt-28">
      
      {/* ==================== TARJETA PRINCIPAL ==================== */}
      {/* SpotlightCard crea el efecto de luz que sigue el cursor */}
      <SpotlightCard
  className="
    w-full
    max-w-xl md:max-w-2xl
    flex items-center justify-center
    px-s md:px-8
    py-4 md:py-6
  "
>
<div className="w-full max-w-none mx-auto">
          {/* Título de la sección */}
          <h2 
            className="fluid-text-2xl md:fluid-text-3xl lg:fluid-text-4xl font-bold mb-6 md:mb-8 text-[#F2F2F2] text-center" 
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            {dict.contact.title}
          </h2>
          
          {/* Formulario de contacto */}
          <ContactForm dict={dict} />
        </div>
      </SpotlightCard>
      
      {/* ==================== REDES SOCIALES - MÓVIL/TABLET ==================== */}
      {/* Solo visible en pantallas menores a lg (1024px) */}
      {/* En pantallas grandes, los iconos aparecen en el Navbar */}
      <div className="flex lg:hidden items-center justify-center gap-3 md:gap-4 mt-6 md:mt-8">
        {socialLinks.map((socialNetwork, index) => (
          <a
            key={index}
            href={socialNetwork.url}
            target="_blank"
            rel="noopener noreferrer"
            className="min-w-[44px] min-h-[44px] w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all duration-200"
            aria-label={socialNetwork.name}
          >
            <Image
              src={socialNetwork.icon}
              alt={socialNetwork.name}
              width={24}
              height={24}
              className="object-contain md:w-7 md:h-7"
            />
          </a>
        ))}
      </div>
    </section>
  )
}

export default Contact
