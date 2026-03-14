// ============================================================================
// PÁGINA STUB: Obra Generativa
// ============================================================================

import { Suspense } from 'react'
import { getDictionary } from '@/lib/getDictionary'
import Navbar from '@/components/navbar/Navbar'
import Footer from '@/components/footer/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'Obra Generativa | Playground | Lautaro R. Temperini',
  description: 'Exploración generativa con Processing y p5.js. Sistema de reglas visuales que produce patrones únicos.',
}

export default async function ObraGenerativaPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang: languageParam } = await params
  const lang = languageParam === 'es' || languageParam === 'en' ? languageParam : 'es'
  const dictionary = await getDictionary(lang)

  const tags = ['Processing', 'p5.js']

  return (
    <>
      <Navbar dict={dictionary} lang={lang} />
      <main className="min-h-screen pt-16 md:pt-20 lg:pt-24 w-full bg-background">
        <div className="w-full max-w-5xl mx-auto px-4 md:px-6 lg:px-8 pb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Obra Generativa</h1>

          {/* Embed YouTube placeholder */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4">Video</h2>
            {/* REEMPLAZAR CON URL DE YOUTUBE */}
            <div className="aspect-video rounded-xl overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center">
              <iframe
                src=""
                title="Obra Generativa"
                className="w-full h-full"
                allowFullScreen
              />
              <span className="text-white/50 text-sm">URL de YouTube por definir</span>
            </div>
          </section>

          {/* Descripción placeholder */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4">Descripción del proyecto</h2>
            <p className="text-white/80">
              {/* TODO: agregar descripción del proyecto */}
              Descripción del proyecto — contenido pendiente.
            </p>
          </section>

          {/* Código interactivo p5.js placeholder */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4">Sketch interactivo</h2>
            <div className="rounded-xl overflow-hidden bg-white/5 border border-white/10 min-h-[320px] flex items-center justify-center">
              {/* INCRUSTAR SKETCH DE P5.JS AQUÍ */}
              <span className="text-white/50 text-sm">Sketch p5.js por incrustar</span>
            </div>
          </section>

          <div className="flex flex-wrap gap-2 mb-10">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 text-sm font-medium rounded-full bg-white/10 border border-white/20 text-white"
              >
                {tag}
              </span>
            ))}
          </div>

          <Link href={`/${lang}/playground`} className="inline-flex items-center gap-2 text-white/90 hover:text-white font-medium">
            ← Volver al Playground
          </Link>
        </div>
      </main>
      <Suspense fallback={<footer className="h-32 bg-background/80" />}>
        <Footer dict={dictionary} />
      </Suspense>
    </>
  )
}
