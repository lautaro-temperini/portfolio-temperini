// src/components/analytics/GlobalTrackerWrapper.tsx
"use client"

import dynamic from "next/dynamic"

const GlobalTracker = dynamic(() => import("./GlobalTracker"), { ssr: false })

export default function GlobalTrackerWrapper({ lang }: { lang: string }) {
  return <GlobalTracker lang={lang} />
}