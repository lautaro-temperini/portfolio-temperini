// ============================================================================
// IMPORTS
// ============================================================================

import type React from "react"
import { Inter, Manrope } from "next/font/google"
import { preloadDictionary } from '@/lib/getDictionary'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "../styles/globals.css"

// ============================================================================
// CONFIGURACIÓN DE FUENTES
// ============================================================================

/**
 * Precargar ambos diccionarios en background para mejor performance
 * Esto se ejecuta una sola vez cuando el layout se carga
 */
preloadDictionary('es')
preloadDictionary('en')

/**
 * Fuente Inter - Usada para textos de interfaz y botones
 * 
 * Es una fuente sans-serif diseñada para pantallas,
 * con excelente legibilidad en todos los tamaños.
 */
const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap", // Muestra fallback mientras carga la fuente
  preload: true,
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
})

/**
 * Fuente Manrope - Usada para títulos y textos destacados
 * 
 * Es una fuente sans-serif moderna con caracteres geométricos,
 * ideal para encabezados y texto de display.
 */
const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  variable: "--font-manrope",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
})

// ============================================================================
// METADATA DEL SITIO
// ============================================================================

/**
 * metadata - Metadatos SEO del sitio web
 * 
 * Estos metadatos se usan para:
 * - Título de la pestaña del navegador
 * - Descripción en resultados de búsqueda
 * - Previews en redes sociales (Open Graph)
 * - Previews en Twitter/X
 */
export const metadata = {
  title: "Lautaro R. Temperini - Diseñador Multimedia",
  description:
    "Transformo ideas en experiencias digitales reales. Diseñador multimedia especializado en UX/UI, desarrollo y experiencias interactivas.",
  keywords: "diseño multimedia, UX/UI, desarrollo web, experiencias digitales, diseño interactivo",
  authors: [{ name: "Lautaro R. Temperini" }],
  creator: "Lautaro R. Temperini",

   // Google Search Console
  other: {
    "google-site-verification": "D3RvMWTjZPYnfxRHFO_0n2hETBVHXaKKNT9hbQlN0D8"
  },

  // Open Graph - Para previews en Facebook, LinkedIn, etc.
  openGraph: {
    title: "Lautaro R. Temperini - Diseñador Multimedia",
    description: "Transformo ideas en experiencias digitales reales.",
    url: "https://temperini.dev",
    siteName: "Temperini Portfolio",
    locale: "es_AR",
    type: "website",
  },
  
  // Twitter Card - Para previews en Twitter/X
  twitter: {
    card: "summary_large_image",
    title: "Lautaro R. Temperini - Diseñador Multimedia",
    description: "Transformo ideas en experiencias digitales reales.",
  },
  
  // Instrucciones para robots de búsqueda
  robots: {
    index: true,  // Permitir indexación
    follow: true, // Permitir seguir links
  },
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

/**
 * RootLayout - Layout raíz de la aplicación
 * 
 * Este componente envuelve TODA la aplicación y se encarga de:
 * - Definir la estructura HTML básica (<html> y <body>)
 * - Aplicar las fuentes globales
 * - Definir los estilos de fondo y overlay
 * - Agregar los metadatos de favicons
 * 
 * IMPORTANTE: El idioma se maneja vía middleware y los params de cada página.
 * Este layout NO recibe el idioma como prop porque es el layout raíz.
 * 
 * @param children - Los componentes hijos (las páginas)
 * @returns El layout HTML completo
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    
   <html
  lang="es"
  className={`${inter.variable} ${manrope.variable}`}
  style={{ backgroundColor: '#0D0D0D' }}
>
  
      <head>
        {/* Viewport para responsive design y evitar zoom no deseado */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        
        {/* Theme color para navegadores móviles */}
        <meta name="theme-color" content="#0D0D0D" />
        
        {/* URL canónica para SEO */}
        <link rel="canonical" href="https://temperini.vercel.app/" />
        
        {/* Nombre de la app para iOS cuando se agrega a home screen */}
        <meta name="apple-mobile-web-app-title" content="Temperini" />
        
        {/* Favicons en diferentes formatos y tamaños */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/svg+xml" href="/favicon-temperini/icon0.svg" />
        <link rel="apple-touch-icon" href="/favicon-temperini/apple-icon.png" />
      </head>
      
      <body
        className="text-white antialiased"
        style={{
          backgroundColor: '#0D0D0D',
          // Gradiente cónico de fondo que crea un efecto de luz sutil
          background: "conic-gradient(from 203.7deg at 63.78% 39.65%, #0D0D0D 0deg, #0D0D0D 114.23deg, #666973 238.85deg, #0D0D0D 360deg)",
          backgroundAttachment: "fixed", // El fondo no se mueve con el scroll
        }}
      >
        {/* Overlay con blur para suavizar el fondo */}
        <div className="fixed inset-0 -z-10 pointer-events-none bg-black/40 backdrop-blur-[100px]" />
        
        {/* Contenido de la aplicación */}
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
