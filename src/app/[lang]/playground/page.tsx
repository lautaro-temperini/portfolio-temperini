// ============================================================================
// IMPORTS
// ============================================================================

import { Suspense } from 'react'
import { getDictionary } from '@/lib/getDictionary'
import Navbar from "@/components/navbar/Navbar"
import Footer from "@/components/footer/Footer"
import BentoGridWrapper from "./BentoGridWrapper"

// ============================================================================
// METADATA SEO
// ============================================================================

/**
 * metadata - Metadatos SEO específicos de la página Playground
 */
export const metadata = {
  title: "Playground | Lautaro R. Temperini",
  description: "Laboratorio creativo donde experimento con código, diseño y tecnología. Explora prototipos interactivos, sketches y experimentos visuales.",
  keywords: "playground, experimentos, prototipos, microproyectos, Lautaro Temperini, diseño, desarrollo web, creative coding",
  alternates: {
    canonical: '/playground',
  },
  
  // Open Graph
  openGraph: {
    title: "Playground | Lautaro R. Temperini",
    description: "Laboratorio creativo donde experimento con código, diseño y tecnología. Explora prototipos interactivos, sketches y experimentos visuales.",
    url: "https://temperini.vercel.app/playground",
    siteName: "Temperini Portfolio",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: "https://temperini.vercel.app/images/foto-lautaro.png",
        width: 1200,
        height: 630,
        alt: "Lautaro R. Temperini - Playground"
      }
    ]
  },
  
  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Playground | Lautaro R. Temperini",
    description: "Laboratorio creativo donde experimento con código, diseño y tecnología. Explora prototipos interactivos, sketches y experimentos visuales.",
    images: ["https://temperini.vercel.app/images/foto-lautaro.png"]
  }
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

/**
 * PlaygroundPage - Página del laboratorio creativo con Bento Grid
 * 
 * Server Component que muestra el playground de experimentos.
 * 
 * El componente BentoGridWrapper usa lazy loading con next/dynamic para:
 * - Cargar videos y animaciones solo cuando se necesitan
 * - Evitar SSR de componentes que requieren window/document
 * - Mostrar un skeleton mientras carga
 * 
 * @param params - Promise con los parámetros de la ruta
 * @returns Componente JSX de la página playground
 */
export default async function PlaygroundPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  // Await params en Next.js 15
  const { lang: languageParam } = await params
  
  // Validar idioma (fallback a 'es')
  const language = (languageParam === 'es' || languageParam === 'en') 
    ? languageParam 
    : 'es'
  
  // Obtener diccionario de traducciones
  const dictionary = await getDictionary(language)
  
  return (
    <>
      {/* Navbar con traducciones y idioma */}
      <Navbar dict={dictionary} lang={language} />
      
      {/* Contenido principal */}
      <main className="min-h-screen pt-16 md:pt-20 lg:pt-24 w-full">
        <BentoGridWrapper />
      </main>
      
      {/* Footer */}
      <Suspense fallback={<footer className="h-32 bg-background/80" />}>
        <Footer dict={dictionary} />
      </Suspense>
    </>
  )
}
