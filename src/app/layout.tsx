// ============================================================================
// IMPORTS
// ============================================================================
import type React from "react"
import { Inter, Manrope } from "next/font/google"
import { preloadDictionary } from '@/lib/getDictionary'
import { GoogleAnalytics } from '@next/third-parties/google'
import { headers } from 'next/headers'
import VercelAnalyticsLoader from '@/components/analytics/VercelAnalyticsLoader'
import "../styles/globals.css"

preloadDictionary('es')
preloadDictionary('en')

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
})

const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  variable: "--font-manrope",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
})

// ============================================================================
// METADATA
// ============================================================================
export const metadata = {
  title: "Lautaro R. Temperini - Diseñador Multimedia",
  description:
    "Transformo ideas en experiencias digitales reales. Diseñador multimedia especializado en UX/UI, desarrollo y experiencias interactivas.",
  keywords: "diseño multimedia, UX/UI, desarrollo web, experiencias digitales, diseño interactivo",
  authors: [{ name: "Lautaro R. Temperini" }],
  creator: "Lautaro R. Temperini",
  metadataBase: new URL('https://temperini.vercel.app'),
  other: {
    "google-site-verification": "D3RvMWTjZPYnfxRHFO_0n2hETBVHXaKKNT9hbQlN0D8"
  },
  openGraph: {
    title: "Lautaro R. Temperini - Diseñador Multimedia",
    description: "Transformo ideas en experiencias digitales reales.",
    url: "https://temperini.dev",
    siteName: "Temperini Portfolio",
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lautaro R. Temperini - Diseñador Multimedia",
    description: "Transformo ideas en experiencias digitales reales.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Idioma por defecto: español
  // El idioma se maneja vía middleware y los params de cada página
  const validLang = 'es'
  
  // Obtener nonce del header para CSP
  const headersList = await headers()
  const nonce = headersList.get('x-nonce') || ''

  // JSON-LD con @graph para Person + WebPage
  const jsonLdGraph = validLang === 'es' ? {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "name": "Lautaro R. Temperini",
        "alternateName": "Lautaro Temperini",
        "url": "https://temperini.vercel.app",
        "image": "https://temperini.vercel.app/images/foto-lautaro.png",
        "jobTitle": "Product Designer",
        "description": "Product Designer especializado en diseño end-to-end: research, prototipado y desarrollo front-end. Transformo problemas complejos en interfaces que las personas entienden.",
        "knowsAbout": [
          "Product Design",
          "UX Research",
          "UI Design",
          "Prototipado",
          "Desarrollo Front-end",
          "React",
          "Figma",
          "Design Systems",
          "B2B SaaS",
          "Inteligencia Artificial",
          "AI Integration",
          "Web3",
          "Blockchain UX",
          "Three.js",
          "Webflow",
          "Next.js"
        ],
        "sameAs": [
          "https://www.linkedin.com/in/lautaro-temperini/",
          "https://github.com/lautaro-temperini"
        ],
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Buenos Aires",
          "addressCountry": "AR"
        },
        "worksFor": {
          "@type": "Organization",
          "name": "Freelance"
        }
      },
      {
        "@type": "WebPage",
        "@id": "https://temperini.vercel.app",
        "name": "Lautaro R. Temperini - Diseñador Multimedia",
        "inLanguage": "es"
      }
    ]
  } : {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "name": "Lautaro R. Temperini",
        "alternateName": "Lautaro Temperini",
        "url": "https://temperini.vercel.app",
        "image": "https://temperini.vercel.app/images/foto-lautaro.png",
        "jobTitle": "Product Designer",
        "description": "Product Designer specializing in end-to-end design: research, prototyping, and front-end development. I turn complex problems into interfaces people understand.",
        "knowsAbout": [
          "Product Design",
          "UX Research",
          "UI Design",
          "Prototyping",
          "Front-end Development",
          "React",
          "Figma",
          "Design Systems",
          "B2B SaaS",
          "Artificial Intelligence",
          "AI Integration",
          "Web3",
          "Blockchain UX",
          "Three.js",
          "Webflow",
          "Next.js"
        ],
        "sameAs": [
          "https://www.linkedin.com/in/lautaro-temperini/",
          "https://github.com/lautaro-temperini"
        ],
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Buenos Aires",
          "addressCountry": "AR"
        },
        "worksFor": {
          "@type": "Organization",
          "name": "Freelance"
        }
      },
      {
        "@type": "WebPage",
        "@id": "https://temperini.vercel.app",
        "name": "Lautaro R. Temperini - Multimedia Designer",
        "inLanguage": "en"
      }
    ]
  }

  return (
    <html
      lang={validLang}
      className={`${inter.variable} ${manrope.variable}`}
      style={{ backgroundColor: '#0D0D0D' }}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#0D0D0D" />
        <meta name="apple-mobile-web-app-title" content="Temperini" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/svg+xml" href="/favicon-temperini/icon0.svg" />
        <link rel="apple-touch-icon" href="/favicon-temperini/apple-icon.png" />
        
        {/* Preconnect para Google Analytics - Mejora LCP y FCP */}
        <link rel="preconnect" href="https://www.google-analytics.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

        {/* Critical CSS inline */}
        <style 
          nonce={nonce}
          dangerouslySetInnerHTML={{__html: `body{background-color:#0D0D0D;font-family:var(--font-inter)}*,::before,::after{box-sizing:border-box;margin:0;padding:0}`}} 
        />

        {/* JSON-LD Schema con @graph */}
        <script
          nonce={nonce}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
        />
      </head>

      <body
        className="text-white antialiased"
        style={{
          background: "conic-gradient(from 203.7deg at 63.78% 39.65%, #0D0D0D 0deg, #0D0D0D 114.23deg, #666973 238.85deg, #0D0D0D 360deg)",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="fixed inset-0 -z-1 pointer-events-none bg-black/40 backdrop-blur-2xl" />
        {children}
        
        {/* Vercel Analytics - Carga después del load event */}
        <VercelAnalyticsLoader />
        
        {/* Google Analytics - Ya optimizado por @next/third-parties/google con lazy loading */}
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
      </body>
    </html>
  )
}