'use client'

// ============================================================================
// IMPORTS - Importaciones de librerías
// (Se omite el resto de imports, constantes, y funciones por brevedad)
// ============================================================================
import React, { useEffect, useState, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { ChevronDown } from 'lucide-react'

const LANGUAGE_STORAGE_KEY = 'NEXT_LOCALE'

const LANGUAGES = {
  es: {
    code: 'es',
    label: 'Español',
    acronym: 'ES',
  },
  en: {
    code: 'en',
    label: 'English',
    acronym: 'EN',
  },
} as const

type SupportedLanguage = 'es' | 'en'

// ============================================================================
// COMPONENTE PRINCIPAL
// (Se omite el cuerpo del componente hasta el renderizado)
// ============================================================================

export default function LanguageSelector() {
  const currentPathname = usePathname()
  const router = useRouter()
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>('en')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const extractLanguageFromPath = (path: string): SupportedLanguage => {
    const pathSegments = path.split('/').filter(Boolean)
    const firstSegment = pathSegments[0]
    
    if (firstSegment === 'es' || firstSegment === 'en') {
      return firstSegment as SupportedLanguage
    }
    
    return 'en'
  }

  const buildPathWithLanguage = (newLanguage: SupportedLanguage, currentPath: string): string => {
    const pathSegments = currentPath.split('/').filter(Boolean)
    
    if (pathSegments[0] === 'es' || pathSegments[0] === 'en') {
      pathSegments[0] = newLanguage
      return `/${pathSegments.join('/')}`
    }
    
    return `/${newLanguage}${currentPath === '/' ? '' : currentPath}`
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDropdownOpen])

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isDropdownOpen) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscapeKey)
    return () => {
      document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [isDropdownOpen])

  useEffect(() => {
    const storedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY) as SupportedLanguage | null
    
    if (storedLanguage && (storedLanguage === 'es' || storedLanguage === 'en')) {
      const languageInPath = extractLanguageFromPath(currentPathname)
      
      if (languageInPath !== storedLanguage) {
        const newPath = buildPathWithLanguage(storedLanguage, currentPathname)
        router.replace(newPath)
        setSelectedLanguage(storedLanguage)
      } else {
        setSelectedLanguage(storedLanguage)
      }
    } else {
      const languageInPath = extractLanguageFromPath(currentPathname)
      setSelectedLanguage(languageInPath)
      
      localStorage.setItem(LANGUAGE_STORAGE_KEY, languageInPath)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLanguageChange = (newLanguage: SupportedLanguage) => {
    if (newLanguage === selectedLanguage) {
      setIsDropdownOpen(false)
      return
    }

    const newPath = buildPathWithLanguage(newLanguage, currentPathname)
    
    localStorage.setItem(LANGUAGE_STORAGE_KEY, newLanguage)
    
    setSelectedLanguage(newLanguage)
    
    setIsDropdownOpen(false)
    
    router.push(newPath)
  }

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const handleKeyDown = (event: React.KeyboardEvent, language: SupportedLanguage) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleLanguageChange(language)
    }
  }

  const currentLanguageData = LANGUAGES[selectedLanguage]

  // ============================================================================
  // RENDERIZADO
  // ============================================================================

  return (
    <div ref={dropdownRef} className="relative">
      {/* ==================== BOTÓN PRINCIPAL (Sin cambios) ==================== */}
      <button
        type="button"
        onClick={handleToggleDropdown}
        className={`
          flex items-center gap-3 px-4 py-1 min-h-[44px] rounded-full
          bg-transparent border border-white text-white
          transition-all duration-200 hover:bg-white/10
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D0D0D]
          ${isDropdownOpen ? 'bg-white/10' : ''}
        `}
        style={{ fontFamily: 'var(--font-inter)' }}
        aria-haspopup="menu"
        aria-expanded={isDropdownOpen}
        aria-label={`Idioma actual: ${currentLanguageData.label}. Cambiar idioma`}
        id="language-selector-button"
      >
        {/* Ícono de Globo Terráqueo */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>

        {/* Acrónimo del idioma */}
        <span className="text-sm font-semibold whitespace-nowrap">
          {currentLanguageData.acronym}
        </span>

        {/* Ícono de flecha hacia abajo */}
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

    {/* ==================== MENÚ DROPDOWN (Píldoras consistentes) ==================== */}
    {isDropdownOpen && (
  <div
    role="menu"
    aria-labelledby="language-selector-button"
    className="absolute right-0 top-full mt-1 flex flex-col gap-0.5 z-50"
  >
    {Object.values(LANGUAGES).map((language) => (
      <button
        key={language.code}
        type="button"
        role="menuitem"
        onClick={() => handleLanguageChange(language.code as SupportedLanguage)}
        onKeyDown={(e) => handleKeyDown(e, language.code as SupportedLanguage)}
        className={`
          w-full min-h-[44px] pl-4 pr-4 py-1
          flex items-center
          text-sm font-medium
          rounded-full
          transition-opacity duration-150
          focus:outline-none focus:bg-white/10
          bg-[#0D0D0D]
          border border-white/10
        `}
        style={{
          opacity: selectedLanguage === language.code ? 1 : 0.7,
          color: selectedLanguage === language.code ? '#FFFFFF' : '#A6A6A6',
        }}
      >
        <span 
          className="inline-flex items-center justify-center flex-shrink-0" 
          style={{ width: '16px', height: '16px', marginRight: '8px' }}
        >
          {selectedLanguage === language.code ? (
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <span style={{ width: '16px', height: '16px' }} />
          )}
        </span>
        <span>{language.label}</span>
      </button>
    ))}
  </div>
)}
    </div>
  )
}