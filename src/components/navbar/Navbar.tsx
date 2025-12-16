"use client"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { socialLinks } from "@/data/socialLinks";
import Image from "next/image";
import LanguageSelector from "@/components/LanguageSelector";
import type { Dictionary } from '@/lib/getDictionary'

/**
 * Props del componente Navbar
 * 
 * @param dict - Diccionario de traducciones obtenido de getDictionary()
 * @param lang - Código de idioma actual ('es' | 'en'), usado para construir rutas
 */
interface NavbarProps {
  dict: Dictionary
  lang: 'es' | 'en'
}

export default function Navbar({ dict, lang }: NavbarProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  // Usar el lang recibido como prop (más confiable que extraer de pathname)
  const currentLang = lang

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY < 100) {
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false)
        setMobileMenuOpen(false)
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const isActive = (path: string) => pathname === path

  function smoothScrollToElement(element: HTMLElement, duration = 300) {
    const start = window.scrollY;
    const end = element.getBoundingClientRect().top + window.scrollY;
    const change = end - start;
    const startTime = performance.now();

    function animateScroll(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      window.scrollTo(0, start + change * easeInOutCubic(progress));
      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    }

    function easeInOutCubic(t: number) {
      return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    requestAnimationFrame(animateScroll);
  }

  const handleProjectsClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    // Verificar si estamos en la página raíz del idioma actual
    const isHomePage = pathname === `/${currentLang}` || pathname === `/${currentLang}/`
    
    if (isHomePage) {
      e.preventDefault();
      const section = document.getElementById("projects");
      if (section) {
        smoothScrollToElement(section, 300);
      }
    } else {
      e.preventDefault();
      // Usar el idioma actual para evitar redirecciones del middleware
      router.push(`/${currentLang}/#projects`);
    }
  };

  return (
    <nav
  role="navigation"
  className={`fixed top-0 left-0 right-0 w-full h-16 md:h-20 lg:h-24 z-[9999] flex items-center justify-between px-4 md:px-6 lg:px-10 bg-[#0D0D0D] border-b border-[#333]/50 ${
    isVisible ? "translate-y-0" : "-translate-y-full"
  }`}
>
      {/* Logo TEMPERINI */}
      <Link href={`/${currentLang}`} className="flex items-center justify-center group cursor-pointer">
        <h1
          className={`fluid-text-xl md:fluid-text-3xl lg:fluid-text-4xl xl:fluid-text-5xl font-medium tracking-[0.15em] transition-all duration-200
            ${pathname === '/' ? 'underline underline-offset-8 decoration-[#666973]' : ''}
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

      {/* Desktop Navigation Links - absolutely centered */}
      <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex items-center gap-8 lg:gap-16">
          {/* Comentado temporalmente - Proyectos */}
          {/*
          <a
            href="#projects"
            onClick={handleProjectsClick}
            className={`fluid-text-sm font-extrabold transition-all duration-150 relative cursor-pointer py-2 px-1 ${
              pathname === "/projects"
                ? "text-[#9D00E0]"
                : pathname === "/playground"
                ? "text-[#595959] hover:text-[#F2F2F2]"
                : pathname === "/"
                ? "text-[#F2F2F2]"
                : "text-[#F2F2F2] hover:text-[#A6A6A6]"
            }`}
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {dict.nav.projects}
            {isActive("/projects") && <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#9D00E0] rounded-full" />}
          </a>
          */}
          {/* Comentado temporalmente - Playground */}
          {/*
          <Link
            href={`/${currentLang}/playground`}
            className={`fluid-text-sm font-extrabold transition-all duration-150 relative cursor-pointer py-2 px-1 ${
              pathname.includes("/playground")
                ? "text-[#A6A6A6]"
                : pathname === `/${currentLang}` || pathname === `/${currentLang}/`
                ? "text-[#595959] hover:text-[#F2F2F2]"
                : "text-[#F2F2F2] hover:text-[#A6A6A6]"
            }`}
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {dict.nav.playground}
            {pathname.includes("/playground") && (
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#666973] rounded-full" />
            )}
          </Link>
          */}
        </div>
      </div>

      {/* CTA + Language Toggle + Hamburguesa alineados derecha */}
      <div className="flex items-center gap-3 md:gap-4 relative z-10">
        {/* Language Toggle - Desktop y Tablet (md+) */}
        <div className="hidden md:block">
          <LanguageSelector />
        </div>
        {/* Desktop CTA Button */}
        {!pathname.includes('/contact') && (
          <Link
            href={`/${currentLang}/contact`}
            className="hidden sm:flex items-center justify-center px-6 min-h-[44px] h-8 md:h-[32px] rounded-full transition-all duration-200 hover:shadow-lg btn-primary cursor-pointer"
            style={{
              background: "linear-gradient(180deg, #8900C3 72%, #595959 100%)",
              border: "1px solid rgba(156, 150, 164, 0.5)",
              borderRadius: "100px",
            }}
          >
            <span
              className={`fluid-text-sm font-semibold text-[#F2F2F2] whitespace-nowrap relative`}
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {dict.nav.connect}
              {pathname.includes('/contact') && (
                <span className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-[#B277D1] rounded-full" />
              )}
            </span>
          </Link>
        )}
        {/* Social icons in navbar only on /contact and lg+ */}
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
        {/* Mobile Menu Button */}
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

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          id="navbar-mobile-menu"
          className="absolute top-full left-0 w-full bg-[#0D0D0D]/95 backdrop-blur-sm border-t border-[#333]/50 md:hidden"
        >
          <div className="flex flex-col p-4 space-y-4">
            {/* Comentado temporalmente - Proyectos Mobile */}
            {/*
            <a
              href="#projects"
              onClick={e => { handleProjectsClick(e); setMobileMenuOpen(false); }}
              className="fluid-text-base font-extrabold text-[#F2F2F2] hover:text-[#A6A6A6] transition-colors py-3 px-2 cursor-pointer min-h-[44px] flex items-center"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {dict.nav.projects}
            </a>
            */}
            {/* Comentado temporalmente - Playground Mobile */}
            {/*
            <Link
              href={`/${currentLang}/playground`}
              className="fluid-text-base font-extrabold text-[#F2F2F2] hover:text-[#A6A6A6] transition-colors py-3 px-2 cursor-pointer min-h-[44px] flex items-center"
              style={{ fontFamily: "var(--font-inter)" }}
              onClick={() => setMobileMenuOpen(false)}
            >
              {dict.nav.playground}
            </Link>
            */}
            {/* Language Toggle - Mobile */}
            <div className="flex justify-start py-2">
              <LanguageSelector />
            </div>
            {/* Mobile Contact Button */}
            {!pathname.includes('/contact') && (
              <Link
                href={`/${currentLang}/contact`}
                className="flex items-center justify-center px-6 min-h-[44px] h-8 rounded-full mt-4 transition-all cursor-pointer"
                style={{
                  background: "linear-gradient(180deg, #8900C3 72%, #595959 100%)",
                  border: "1px solid rgba(156, 150, 164, 0.5)",
                  borderRadius: "100px",
                }}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span
                  className={`fluid-text-base font-semibold text-[#F2F2F2] relative`}
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
