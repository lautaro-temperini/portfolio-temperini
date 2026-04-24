// src/components/analytics/GlobalTracker.tsx
"use client"

import { usePathname } from "next/navigation"
import CaseStudyTracker from "./CaseStudyTracker"

const SECCIONES: Record<string, string[]> = {
  manijapp: ["contexto", "decisiones", "validacion", "supply", "ia", "cierre"],
  digito:   ["contexto", "problema", "research", "fricciones", "arquitectura", "tradeoffs", "testing", "prototipo", "cierre"],
  gloryfit: ["reto", "investigacion", "estrategia", "sistema", "iteraciones", "conclusion"],
  levelup:  ["desafio", "problema", "insight", "sistema", "propuesta", "aprendizajes", "reflexion"],
  vorterix: ["brief", "diseno", "conversion", "decisiones", "iteraciones"],
}

export default function GlobalTracker({ lang }: { lang: string }) {
  const pathname = usePathname()
  const slug = pathname.split("/").filter(Boolean)[1] ?? "home"
  const sectionIds = SECCIONES[slug] ?? []

  return <CaseStudyTracker slug={slug} lang={lang} sectionIds={sectionIds} />
}