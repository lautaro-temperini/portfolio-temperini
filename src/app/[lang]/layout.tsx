// src/app/[lang]/layout.tsx
import type React from "react"
import { preloadDictionary } from "@/lib/getDictionary"
import { LanguagePreference } from "@/components/fxscripts/LanguagePreference"
import GlobalTrackerWrapper from "@/components/analytics/GlobalTrackerWrapper"

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

  preloadDictionary(validLang)

  return (
    <>
      <LanguagePreference lang={validLang} />
      <GlobalTrackerWrapper lang={validLang} />
      {children}
    </>
  )
}