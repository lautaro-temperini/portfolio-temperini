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
  preloadDictionary(validLang)

  const jsonLdGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://temperini.vercel.app",
        inLanguage: validLang,
      },
    ],
  }

  return (
    <html lang={validLang}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}

