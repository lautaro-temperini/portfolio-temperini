// ============================================================================
// PÁGINA STUB: Galería Visual (con grid y lightbox nativo)
// ============================================================================

import { Suspense } from 'react'
import { getDictionary } from '@/lib/getDictionary'
import Navbar from '@/components/navbar/Navbar'
import Footer from '@/components/footer/Footer'
import Link from 'next/link'
import GaleriaClient from './GaleriaClient'

export const metadata = {
  title: 'Galería Visual | Playground | Lautaro R. Temperini',
  description: 'Archivo de flyers de diseño gráfico y modelos 3D.',
}

export default async function GaleriaPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang: languageParam } = await params
  const lang = languageParam === 'es' || languageParam === 'en' ? languageParam : 'es'
  const dictionary = await getDictionary(lang)

  // AGREGAR IMÁGENES AQUÍ — array de { src, alt? }
  const galleryImages: { src: string; alt?: string }[] = []

  return (
    <>
      <Navbar dict={dictionary} lang={lang} />
      <main className="min-h-screen pt-16 md:pt-20 lg:pt-24 w-full bg-background">
        <div className="w-full max-w-6xl mx-auto px-4 md:px-6 lg:px-8 pb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Galería Visual</h1>

          <GaleriaClient images={galleryImages} />

          <div className="mt-10">
            <Link href={`/${lang}/playground`} className="inline-flex items-center gap-2 text-white/90 hover:text-white font-medium">
              ← Volver al Playground
            </Link>
          </div>
        </div>
      </main>
      <Suspense fallback={<footer className="h-32 bg-background/80" />}>
        <Footer dict={dictionary} />
      </Suspense>
    </>
  )
}
