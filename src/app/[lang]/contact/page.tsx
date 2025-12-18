import { Suspense } from 'react'
import { getDictionary } from '@/lib/getDictionary'
import dynamic from 'next/dynamic'
import Navbar from "@/components/navbar/Navbar"
import PageTransition from "@/components/fxscripts/PageTransition"
import DelayedSkeleton from '@/components/ui/DelayedSkeleton'
import { ContactPageSkeleton, LoadingFallback } from '@/components/ui/PageSkeletons'

// Code splitting: Cargar Contact dinámicamente
const Contact = dynamic(() => import("./Contact"), {
  loading: () => (
    <DelayedSkeleton
      skeleton={<ContactPageSkeleton />}
      delay={300}
      fallbackDelay={3000}
      fallback={<LoadingFallback />}
    />
  ),
})

export const metadata = {
  title: "Contacto | Lautaro R. Temperini",
  description: "Contacta con Lautaro R. Temperini para proyectos de diseño de producto, UX/UI y desarrollo front-end. Disponible para colaboraciones y oportunidades freelance.",
  keywords: "contacto, Lautaro Temperini, diseño multimedia, desarrollo web, UX/UI, experiencias digitales",
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: "Contacto | Lautaro R. Temperini",
    description: "Ponte en contacto con Lautaro R. Temperini para proyectos de diseño multimedia, desarrollo web y experiencias digitales.",
    url: "https://temperini.vercel.app/contact",
    siteName: "Temperini Portfolio",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: "https://temperini.vercel.app/images/foto-lautaro.png",
        width: 800,
        height: 600,
        alt: "Foto de Lautaro Temperini"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Contacto | Lautaro R. Temperini",
    description: "Ponte en contacto con Lautaro R. Temperini para proyectos de diseño multimedia, desarrollo web y experiencias digitales.",
    images: ["https://temperini.vercel.app/images/foto-lautaro.png"]
  }
};

/**
 * Página de contacto localizada
 * @param params - Parámetros de la ruta, incluye lang (es | en)
 */
export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  // Await params en Next.js 15
  const { lang: langParam } = await params
  
  // Validar y convertir el idioma a 'es' o 'en'
  const lang = (langParam === 'es' || langParam === 'en') ? langParam : 'es'
  
  // Obtener diccionario de traducciones
  const dict = await getDictionary(lang)
  
  return (
    <PageTransition>
      <Navbar dict={dict} lang={lang} />
      <main id="main-content" role="main">
        <Suspense fallback={
          <DelayedSkeleton
            skeleton={<ContactPageSkeleton />}
            delay={300}
            fallbackDelay={3000}
            fallback={<LoadingFallback />}
          />
        }>
          <Contact dict={dict} />
        </Suspense>
      </main>
    </PageTransition>
  );
}
