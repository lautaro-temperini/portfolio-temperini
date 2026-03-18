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
  const [inProjectsSection, setInProjectsSection] = useState(false)
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

  // Detectar si #projects está en viewport (solo en home)
  useEffect(() => {
    const isHomePage = pathname === `/${lang}` || pathname === `/${lang}/`
    if (!isHomePage || typeof window === "undefined") {
      setInProjectsSection(false)
      return
    }

    const section = document.getElementById("projects")
    if (!section) {
      setInProjectsSection(false)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === section) {
            setInProjectsSection(entry.isIntersecting)
          }
        })
      },
      {
        // margin negativo arriba para que "cuente" apenas la sección entra,
        // incluso cuando hacemos scroll con offset hacia arriba
        root: null,
        rootMargin: "-120px 0px -40% 0px",
        threshold: 0.1,
      }
    )

    observer.observe(section)

    return () => {
      observer.disconnect()
    }
  }, [pathname, lang])

  const isActive = (path: string) => pathname === path

  function smoothScrollToElement(element: HTMLElement, duration = 300, offset = 0) {
    const start = window.scrollY
    const end = element.getBoundingClientRect().top + window.scrollY + offset
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

  // Si entramos a la home con #projects en la URL, aplicar scroll con offset
  useEffect(() => {
    if (typeof window === "undefined") return

    const isHomePage = pathname === `/${lang}` || pathname === `/${lang}/`
    if (!isHomePage) return

    if (window.location.hash === "#projects") {
      const timeout = setTimeout(() => {
        const section = document.getElementById("projects")
        if (section) {
          const isDesktop = window.innerWidth >= 768
          const offset = isDesktop ? -80 : 0
          smoothScrollToElement(section, 300, offset)
          // Limpiar el hash sin agregar entrada al historial
          window.history.replaceState(null, "", window.location.pathname)
        }
      }, 100)

      return () => clearTimeout(timeout)
    }
  }, [pathname, lang])

  const handleProjectsClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const isHomePage = pathname === `/${lang}` || pathname === `/${lang}/`

    if (isHomePage) {
      e.preventDefault()
      const section = document.getElementById("projects")
      if (section) {
        // En desktop aplicamos un pequeño offset para que la sección respire bajo el navbar.
        // En mobile scrolleamos directo sin offset.
        const isDesktop = typeof window !== "undefined" && window.innerWidth >= 768
        const offset = isDesktop ? 0 : 0
        smoothScrollToElement(section, 300, offset)
      }
    } else {
      // Desde otras páginas usamos un anchor clásico a #projects
      // para evitar condiciones raras de sincronización.
      // Next gestionará el scroll automáticamente.
      // No prevenimos el default para que el navegador haga el scroll.
    }
  }

  const handlePlaygroundClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault()
    router.push("/playground")
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
  
  const projectsLabel = lang === 'es' ? 'Proyectos' : 'Projects'
  const playgroundLabel = lang === 'es' ? 'Playground' : 'Playground'
  const isPlaygroundPage = pathname === "/playground" || pathname === `/${lang}/playground`

  return (
    <nav
      role="navigation"
      aria-label="Navegación principal"
      className={`fixed top-0 left-0 right-0 w-full h-16 md:h-20 lg:h-24 z-[9999] flex items-center justify-between px-4 md:px-6 lg:px-10 bg-background border-b border-subtle/50 transition-transform duration-300 ${
        !isVisible ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <Link href={`/${lang}`} className="flex items-center justify-center group cursor-pointer" aria-label="Ir al inicio">
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
        <div className="flex items-center gap-6 lg:gap-10">
          {false && (
            <Link
              href={`/${lang}/#projects`}
              onClick={handleProjectsClick}
              className={`text-sm md:text-base font-medium transition-colors cursor-pointer ${
                inProjectsSection ? "text-light" : "text-light/50 hover:text-light"
              }`}
            >
              {projectsLabel}
            </Link>
          )}
          {/* Playground oculto en desktop, se mantiene el código para uso futuro */}
          {/*
          <Link
            href="/playground"
            onClick={handlePlaygroundClick}
            className={`text-sm md:text-base font-medium underline-offset-8 transition-colors cursor-pointer ${
              isPlaygroundPage ? "text-light underline" : "text-light/50 hover:text-light"
            }`}
          >
            {playgroundLabel}
          </Link>
          */}
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-4 relative z-10">
        {/* Proyectos solo en mobile, alineado a la derecha antes del menú */}
        <div className="md:hidden">
          {false && (
            <Link
              href={`/${lang}/#projects`}
              onClick={(e) => {
                handleProjectsClick(e)
                setMobileMenuOpen(false)
              }}
              className={`text-sm font-medium transition-colors cursor-pointer ${
                inProjectsSection ? "text-light" : "text-light/70"
              }`}
            >
              {projectsLabel}
            </Link>
          )}
        </div>

        <div className="hidden md:block">
          <LanguageSelector currentLang={lang} />
        </div>
        
        {!pathname.includes('/contact') && (
          <Link
            href={`/${lang}/contact`}
            onClick={handleContactClick}
            className="hidden md:flex items-center justify-center gap-3 px-4 py-1 min-h-touch rounded-full active:scale-100 transition-all duration-200 btn-primary group overflow-hidden relative cursor-pointer"
            style={{
              background: "linear-gradient(180deg, #BF5AF2 0%, rgb(90, 6, 146) 100%)",
              boxShadow: "inset 0 1px 0 0 rgba(255, 255, 255, 0.2)",
            }}
          >
            <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-full bg-gradient-to-b from-white/5 to-transparent" />
            <span className="pointer-events-none absolute inset-0 animate-btn-shine bg-gradient-to-r from-transparent via-white/5 to-transparent w-1/2" />
            <span className="relative z-10 fluid-text-sm font-semibold text-white/75 group-hover:text-white transition-colors duration-200 whitespace-nowrap" style={{ fontFamily: "var(--font-manrope)" }}>
              {dict.nav.connect}
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
                className="min-w-touch min-h-touch w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all duration-200"
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
          className="md:hidden min-w-touch min-h-touch p-2 text-light transition-transform duration-200 cursor-pointer flex items-center justify-center"
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
          className="absolute top-full left-0 w-full bg-background/95 backdrop-blur-sm border-t border-subtle/50 md:hidden"
        >
          <div className="flex flex-col px-4 py-3 space-y-4">
            {/* Fila inferior: solo idioma + contacto (Playground oculto en mobile) */}
            <div className="flex flex-row items-center gap-3 pt-1 w-full justify-end">
              {/*
              <div className="flex-1 flex justify-center">
                <Link
                  href="/playground"
                  onClick={(e) => {
                    handlePlaygroundClick(e)
                    setMobileMenuOpen(false)
                  }}
                  className={`text-sm font-medium underline-offset-8 transition-colors cursor-pointer ${
                    isPlaygroundPage ? "text-light underline" : "text-light/60 hover:text-light"
                  }`}
                >
                  {playgroundLabel}
                </Link>
              </div>
              */}

              <div className="flex flex-row items-center gap-3">
                <div>
                  <LanguageSelector currentLang={lang} />
                </div>
                
                {!pathname.includes('/contact') && (
                  <Link
                    href={`/${lang}/contact`}
                    onClick={() => {
                      handleContactClick()
                      setMobileMenuOpen(false)
                    }}
                    className="flex items-center justify-center gap-3 px-4 py-1 min-h-touch rounded-full active:scale-100 transition-all duration-200 group overflow-hidden relative cursor-pointer"
                    style={{
                      background: "linear-gradient(180deg, #BF5AF2 0%, rgb(90, 6, 146) 100%)",
                      boxShadow: "inset 0 1px 0 0 rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-full bg-gradient-to-b from-white/5 to-transparent" />
                    <span className="pointer-events-none absolute inset-0 animate-btn-shine bg-gradient-to-r from-transparent via-white/5 to-transparent w-1/2" />
                    <span className="relative z-10 fluid-text-base font-bold text-white/75 group-hover:text-white transition-colors duration-200 whitespace-nowrap" style={{ fontFamily: "var(--font-manrope)" }}>
                      {dict.nav.connect}
                    </span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}