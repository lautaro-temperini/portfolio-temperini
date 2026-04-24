import { sendGAEvent } from "@next/third-parties/google"

// ─── Existing events ─────────────────────────────────────────────────────────

export function trackProjectClick(params: {
  slug: string
  title: string
  location: "featured" | "card" | "awwwards"
  lang: string
}) {
  sendGAEvent("event", "project_click", params)
}

export function trackCTAClick(params: {
  label: string
  location: "navbar" | "footer" | "hero" | "case_study"
  lang: string
}) {
  sendGAEvent("event", "cta_click", params)
}

export function trackFormEvent(params: {
  status: "submit" | "success" | "error"
  lang: string
}) {
  sendGAEvent("event", "form_contact", params)
}

// ─── Case study engagement ────────────────────────────────────────────────────

export function trackCaseStudyView(params: {
  slug: string          // "manijapp" | "digito" | etc.
  lang: string
  referrer: string      // document.referrer — detecta ChatGPT, Google, etc.
  source: string        // UTM source o parsed referrer
}) {
  sendGAEvent("event", "case_study_view", params)
}

export function trackScrollDepth(params: {
  slug: string
  depth: 25 | 50 | 75 | 100
  lang: string
}) {
  sendGAEvent("event", "scroll_depth", params)
}

export function trackSectionView(params: {
  slug: string
  section: string       // id del section: "contexto" | "decisiones" | "validacion" etc.
  lang: string
}) {
  sendGAEvent("event", "section_view", params)
}

// ─── Conversion events ────────────────────────────────────────────────────────

export function trackContactClick(params: {
  method: "email" | "linkedin" | "contact_page"
  location: "navbar" | "footer" | "case_study" | "hero"
  source_case_study?: string   // si el click viene desde un case study
  lang: string
}) {
  sendGAEvent("event", "contact_click", params)
}

export function trackCVDownload(params: {
  lang: string
  location: "navbar" | "footer" | "hero"
}) {
  sendGAEvent("event", "cv_download", params)
}

export function trackExternalLinkClick(params: {
  url: string           // "manijapp.vercel.app", "linkedin.com", etc.
  label: string         // texto del link
  location: string      // en qué parte de la página
  slug?: string         // case study actual si aplica
  lang: string
}) {
  sendGAEvent("event", "external_link_click", params)
}

// ─── Source detection helpers ─────────────────────────────────────────────────

type TrafficSource =
  | "chatgpt"
  | "perplexity"
  | "claude"
  | "gemini"
  | "google"
  | "linkedin"
  | "direct"
  | "other"

/**
 * Parsea el referrer y los UTM params para identificar la fuente de tráfico.
 * Llamar en el cliente (useEffect) — no disponible en Server Components.
 *
 * Uso: const source = parseTrafficSource()
 */
export function parseTrafficSource(): TrafficSource {
  if (typeof window === "undefined") return "direct"

  const ref = document.referrer.toLowerCase()
  const params = new URLSearchParams(window.location.search)
  const utmSource = params.get("utm_source")?.toLowerCase() ?? ""

  // Prioridad 1: UTM source explícito (cuando ChatGPT linkea con utm)
  if (utmSource.includes("chatgpt") || utmSource.includes("openai")) return "chatgpt"
  if (utmSource.includes("perplexity")) return "perplexity"
  if (utmSource.includes("claude") || utmSource.includes("anthropic")) return "claude"
  if (utmSource.includes("gemini") || utmSource.includes("google_ai")) return "gemini"

  // Prioridad 2: Referrer del dominio
  if (ref.includes("chatgpt.com") || ref.includes("chat.openai.com")) return "chatgpt"
  if (ref.includes("perplexity.ai")) return "perplexity"
  if (ref.includes("claude.ai")) return "claude"
  if (ref.includes("gemini.google.com") || ref.includes("bard.google.com")) return "gemini"
  if (ref.includes("google.")) return "google"
  if (ref.includes("linkedin.com")) return "linkedin"
  if (ref === "") return "direct"

  return "other"
}

