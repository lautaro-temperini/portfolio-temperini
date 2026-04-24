// src/components/analytics/GlobalTracker.tsx
"use client"

import { usePathname } from "next/navigation"
import CaseStudyTracker from "./CaseStudyTracker"

const SECCIONES: Record<string, string[]> = {
  manijapp: ["contexto", "decisiones", "validacion", "supply", "ia", "cierre"],
  digito:   [],   // agregá los IDs cuando tengas esa page
  gloryfit: [],
  levelup:  [],
  vorterix: [],
}

export default function GlobalTracker({ lang }: { lang: string }) {
  const pathname = usePathname()
  const slug = pathname.split("/").filter(Boolean)[1] ?? "home"
  const sectionIds = SECCIONES[slug] ?? []

  return <CaseStudyTracker slug={slug} lang={lang} sectionIds={sectionIds} />
}