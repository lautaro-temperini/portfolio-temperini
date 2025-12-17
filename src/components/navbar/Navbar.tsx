"use client"

import { useState, useEffect, useRef } from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { socialLinks } from "@/data/socialLinks"
import Image from "next/image"
import LanguageSelector from "@/components/LanguageSelector"
import type { Dictionary } from '@/lib/getDictionary'
import { sendGAEvent } from '@next/third-parties/google'

interface NavbarProps {
  dict: Dictionary
  lang: 'es' | 'en'
}

export default function Navbar({ dict, lang }: NavbarProps) {
  const [isVisible, setIsVisible] = useState(true)
  const lastScrollY = useRef(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    // Inicializar con el valor actual del scroll
    if (typeof window !== 'undefined') {
      lastScrollY.current = window.scrollY || document.documentElement.scrollTop || 0
    }

    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Obtener la posición actual del scroll de forma robusta
          const currentScrollY = window.scrollY || 
                                window.pageYOffset || 
                                document.documentElement.scrollTop || 
                                0

          // Threshold mínimo para evitar cambios muy pequeños que puedan causar flickering
          const scrollThreshold = 5

          // Si estamos cerca del top, siempre mostrar el navbar
          if (currentScrollY < 100) {
            setIsVisible(true)
            lastScrollY.current = currentScrollY
            ticking = false
            return
          }

          // Calcular la diferencia de scroll
          const scrollDifference = currentScrollY - lastScrollY.current

          // Solo procesar si hay un cambio significativo
          if (Math.abs(scrollDifference) > scrollThreshold) {
            // Si scrolleamos hacia abajo (scroll aumentó)
            if (scrollDifference > 0) {
              setIsVisible(false)
              setMobileMenuOpen(false)
            } 
            // Si scrolleamos hacia arriba (scroll disminuyó)
            else {
              setIsVisible(true)
            }

            lastScrollY.current = currentScrollY
          }

          ticking = false
        })
        ticking = true
      }
    }

    // Registrar el listener inmediatamente
    window.addEventListener("scroll", handleScroll, { passive: true })
    // También escuchar en document para máxima compatibilidad
    document.addEventListener("scroll", handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener("scroll", handleScroll)
      document.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const isActive = (path: string) => pathname === path

  function smoothScrollToElement(element: HTMLElement, duration = 300) {
    const start = window.scrollY
    const end = element.getBoundingClientRect().top + window.scrollY
    const change = end - start
    const startTime = performance.now()

    function animateScroll(currentTime: number) {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      window.scrollTo(0, start + change * easeInOutCubic(progress))
      if (progress < 1) {
        requestAnimationFrame(animateScroll)
      }
    }

    function easeInOutCubic(t: number) {
      return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2
    }

    requestAnimationFrame(animateScroll)
  }

  const handleProjectsClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const isHomePage = pathname === `/${lang}` || pathname === `/${lang}/`
    
    if (isHomePage) {
      e.preventDefault()
      const section = document.getElementById("projects")
      if (section) {
        smoothScrollToElement(section, 300)
      }
    } else {
      e.preventDefault()
      router.push(`/${lang}/#projects`)
    }
  }

  // 🎯 EVENTO GA4: Click en botón de contacto del navbar
  const handleContactClick = () => {
    sendGAEvent('event', 'cta_click', {
      event_category: 'engagement',
      event_label: 'navbar_contact_button',
      button_location: 'navbar'
    })
  }

  // 🎯 EVENTO GA4: Click en redes sociales del navbar
  const handleSocialClick = (platform: string) => {
    sendGAEvent('event', 'social_click', {
      event_category: 'engagement',
      event_label: platform,
      platform: platform,
      click_location: 'navbar'
    })
  }
  
  return (
    <nav
      role="navigation"
      className={`fixed top-0 left-0 right-0 w-full h-16 md:h-20 lg:h-24 z-[9999] flex items-center justify-between px-4 md:px-6 lg:px-10 bg-[#0D0D0D] border-b border-[#333]/50 transition-transform duration-300 ${
        !isVisible ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <Link href={`/${lang}`} className="flex items-center justify-center group cursor-pointer">
        <h1
          className={`fluid-text-xl md:fluid-text-3xl lg:fluid-text-4xl xl:fluid-text-5xl font-medium tracking-[0.15em] transition-all duration-200
            ${(pathname === `/${lang}` || pathname === `/${lang}/`) ? 'underline underline-offset-8 decoration-[#666973]' : ''}
            group-hover:animate-flip
          `}
          style={{
            fontFamily: "var(--font-manrope)",
            WebkitTextStroke: "3px #A6A6A6",
            WebkitTextFillColor: "transparent",
            color: "transparent",
          }}
        >
          TEMPERINI
        </h1>
      </Link>

      <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex items-center gap-8 lg:gap-16">
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-4 relative z-10">
        <div className="hidden md:block">
          <LanguageSelector currentLang={lang} />
        </div>
        
        {!pathname.includes('/contact') && (
          <Link
            href={`/${lang}/contact`}
            className="hidden sm:flex items-center justify-center px-6 h-10 md:h-[40px] rounded-full transition-all duration-200 hover:shadow-lg btn-primary cursor-pointer"
            style={{
              background: "linear-gradient(180deg, #8900C3 72%, #595959 100%)",
              border: "1px solid rgba(156, 150, 164, 0.5)",
              borderRadius: "100px",
            }}
          >
            <span
              className="fluid-text-sm font-semibold text-[#F2F2F2] whitespace-nowrap relative"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {dict.nav.connect}
              {pathname.includes('/contact') && (
                <span className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-[#B277D1] rounded-full" />
              )}
            </span>
          </Link>
        )}
        
        {pathname.includes('/contact') && (
          <div className="hidden lg:flex items-center gap-2 ml-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="min-w-[44px] min-h-[44px] w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all duration-200"
                aria-label={social.name}
              >
                <Image
                  src={social.icon}
                  alt={social.name}
                  width={18}
                  height={18}
                  className="object-contain"
                />
              </a>
            ))}
          </div>
        )}
        
        <button
          className="md:hidden min-w-[44px] min-h-[44px] p-2 text-[#F2F2F2] transition-transform duration-200 cursor-pointer flex items-center justify-center"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="navbar-mobile-menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div
          id="navbar-mobile-menu"
          className="absolute top-full left-0 w-full bg-[#0D0D0D]/95 backdrop-blur-sm border-t border-[#333]/50 md:hidden"
        >
          <div className="flex flex-col p-4 space-y-4">
            <div className="flex justify-start py-2">
              <LanguageSelector currentLang={lang} />
            </div>
            
            {!pathname.includes('/contact') && (
              <Link
                href={`/${lang}/contact`}
                className="flex items-center justify-center px-6 h-10 rounded-full mt-4 transition-all cursor-pointer"
                style={{
                  background: "linear-gradient(180deg, #8900C3 72%, #595959 100%)",
                  border: "1px solid rgba(156, 150, 164, 0.5)",
                  borderRadius: "100px",
                }}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span
                  className="fluid-text-base font-semibold text-[#F2F2F2] relative"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {dict.nav.connect}
                  {pathname.includes('/contact') && (
                    <span className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-[#666973] rounded-full" />
                  )}
                </span>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}