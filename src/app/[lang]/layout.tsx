import type React from "react"
import { preloadDictionary } from "@/lib/getDictionary"

type Lang = "es" | "en"

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const validLang: Lang = lang === "en" || lang === "es" ? lang : "es"

  // Precarga del diccionario para el segmento [lang]
  preloadDictionary(validLang)

  // En App Router, SOLO el root layout (`src/app/layout.tsx`) debe renderizar <html>/<body>.
  return <>{children}</>
}

