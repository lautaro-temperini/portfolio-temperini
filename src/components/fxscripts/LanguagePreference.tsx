'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

type Lang = 'es' | 'en'

const STORAGE_KEY = 'preferred-lang'
const COOKIE_NAME = 'NEXT_LOCALE'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365

function persistLang(lang: Lang) {
  localStorage.setItem(STORAGE_KEY, lang)
  document.cookie = `${COOKIE_NAME}=${lang}; path=/; max-age=${COOKIE_MAX_AGE}; samesite=lax`
}

export function LanguagePreference({ lang }: { lang: Lang }) {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    const stored: Lang | null = raw === 'es' || raw === 'en' ? raw : null

    // La URL siempre es la fuente de verdad (viene del middleware)
    // Solo sincronizar localStorage y cookies con el idioma actual de la URL
    persistLang(lang)
  }, [lang, pathname, router])

  return null
}
