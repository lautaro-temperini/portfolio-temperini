// ============================================================================
// IMPORTS
// ============================================================================

import Link from "next/link"
import Image from "next/image"
import { socialLinks } from "@/data/socialLinks"
import type { Dictionary } from '@/lib/dictionary-types'
import { sendGAEvent } from '@next/third-parties/google'

// ============================================================================
// TIPOS E INTERFACES
// ============================================================================

/**
 * Props del componente Footer
 * 
 * @property onlyIcons - Si mostrar solo los iconos de redes sociales
 * @property dict - Diccionario de traducciones (opcional)
 * @property lang - Idioma actual para el link de contacto
 */
interface FooterProps {
  onlyIcons?: boolean
  dict?: Dictionary
  lang?: 'es' | 'en'
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

/**
 * Footer - Pie de página del sitio web
 * 
 * Muestra un título con CTA y los iconos de redes sociales.
 * Si onlyIcons es true, solo muestra los iconos.
 * 
 * @param onlyIcons - Si solo mostrar iconos
 * @param dict - Diccionario de traducciones
 */
export default function Footer({ onlyIcons = false, dict, lang = 'es' }: FooterProps = {}) {
 
 // 🎯 EVENTO GA4: Click en "Creemos juntos"
 const handleTalkButtonClick = () => {
  sendGAEvent('event', 'cta_click', {
    event_category: 'engagement',
    event_label: 'footer_talk_button',
    button_location: 'footer',
    button_text: dict?.footer?.cta || 'creemos_juntos'
  })
}

// 🎯 EVENTO GA4: Click en redes sociales del footer
const handleSocialClick = (platform: string) => {
  sendGAEvent('event', 'social_click', {
    event_category: 'engagement',
    event_label: platform,
    platform: platform,
    click_location: 'footer'
  })
}

 
  return (
    <footer
      role="contentinfo"
      className="relative w-full h-auto min-h-[80px] md:min-h-[120px] overflow-hidden py-4 md:py-6 bg-background/80"
      style={{ width: "100%" }}
    >
      <div className="w-full px-4 md:px-6 lg:px-10 mx-auto flex flex-col md:flex-row items-center justify-between py-4 md:py-6 gap-8 md:gap-4">
        {/* Contenido izquierdo - Título y CTA */}
        {!onlyIcons && (
          <div className="flex flex-col gap-4 md:gap-6 text-left">
            <h3
              className="text-sm min-[381px]:text-xl md:text-2xl lg:text-[28px] font-semibold leading-tight md:leading-[38px] text-white max-w-full md:max-w-[600px] lg:max-w-[50vw] px-2 min-[381px]:px-0"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              {dict?.footer?.title || "¿Tenés una idea o desafío en mente?"}
            </h3>
            <Link
              href={`/${lang}/contact`}
              className="flex items-center justify-center w-full max-w-sm md:w-[180px] min-h-touch md:h-10 rounded-full px-6 active:scale-100 transition-all duration-200 btn-primary group overflow-hidden relative"
              style={{
                background: "linear-gradient(180deg, #BF5AF2 0%, rgb(90, 6, 146) 100%)",
                boxShadow: "inset 0 1px 0 0 rgba(255, 255, 255, 0.2)",
              }}
            >
              <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-full bg-gradient-to-b from-white/10 to-transparent" />
              <span className="pointer-events-none absolute inset-0 animate-btn-shine bg-gradient-to-r from-transparent via-white/5 to-transparent w-1/2" />
              <span className="relative z-10 text-sm md:text-[15px] font-semibold text-white/90 group-hover:text-white transition-colors duration-200 whitespace-nowrap">
                {dict?.footer?.cta || "Creemos juntos"}
              </span>
            </Link>
          </div>
        )}
        
        {/* Redes sociales */}
        <div className="flex items-center gap-4 md:gap-6 lg:gap-[36px] flex-nowrap justify-center">
          {socialLinks.map((socialNetwork, index) => (
            <a
              key={index}
              href={socialNetwork.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 md:w-12 md:h-12 lg:w-[48px] lg:h-[48px] rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all duration-200"
              aria-label={socialNetwork.name}
            >
              <Image src={socialNetwork.icon} alt={socialNetwork.name} width={24} height={24} className="object-contain" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
