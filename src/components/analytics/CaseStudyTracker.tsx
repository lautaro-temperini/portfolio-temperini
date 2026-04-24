"use client"

import { useEffect, useRef } from "react"
import {
  trackCaseStudyView,
  trackScrollDepth,
  trackSectionView,
  parseTrafficSource,
} from "@/lib/analytics"

interface CaseStudyTrackerProps {
  slug: string
  lang: string
  /** IDs de las sections a observar para section_view events */
  sectionIds?: string[]
}

/**
 * Tracker invisible para case study pages.
 * Registra en GA4:
 *  - case_study_view (con fuente de tráfico detectada: ChatGPT, Google, Direct, etc.)
 *  - scroll_depth (25% / 50% / 75% / 100%)
 *  - section_view (cada vez que una section entra al viewport)
 *
 * Uso en Server Component:
 *   <CaseStudyTracker slug="manijapp" lang={lang} sectionIds={["contexto", "validacion"]} />
 */
export default function CaseStudyTracker({
  slug,
  lang,
  sectionIds = [],
}: CaseStudyTrackerProps) {
  const firedDepths = useRef(new Set<number>())
  const firedSections = useRef(new Set<string>())

  // ── case_study_view ────────────────────────────────────────────────────────
  useEffect(() => {
    const source = parseTrafficSource()
    trackCaseStudyView({
      slug,
      lang,
      referrer: document.referrer,
      source,
    })
  }, [slug, lang])

  // ── scroll_depth ───────────────────────────────────────────────────────────
  useEffect(() => {
    const checkDepth = () => {
      const scrolled = window.scrollY + window.innerHeight
      const total = document.documentElement.scrollHeight
      const pct = (scrolled / total) * 100

      const thresholds = [25, 50, 75, 100] as const
      for (const depth of thresholds) {
        if (pct >= depth && !firedDepths.current.has(depth)) {
          firedDepths.current.add(depth)
          trackScrollDepth({ slug, depth, lang })
        }
      }
    }

    window.addEventListener("scroll", checkDepth, { passive: true })
    return () => window.removeEventListener("scroll", checkDepth)
  }, [slug, lang])

  // ── section_view ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (!sectionIds.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id
          if (entry.isIntersecting && id && !firedSections.current.has(id)) {
            firedSections.current.add(id)
            trackSectionView({ slug, section: id, lang })
          }
        }
      },
      { threshold: 0.3 } // 30% visible = se considera "visto"
    )

    for (const id of sectionIds) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [slug, lang, sectionIds])

  return null
}
