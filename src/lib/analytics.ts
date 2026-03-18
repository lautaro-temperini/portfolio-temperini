import { sendGAEvent } from "@next/third-parties/google"

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
  location: "navbar" | "footer" | "hero"
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

