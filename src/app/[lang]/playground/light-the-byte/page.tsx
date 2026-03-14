// ============================================================================
// PÁGINA STUB: Light The Byte
// ============================================================================

import { Suspense } from 'react'
import { getDictionary } from '@/lib/getDictionary'
import Navbar from '@/components/navbar/Navbar'
import Footer from '@/components/footer/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'Light The Byte | Playground | Lautaro R. Temperini',
  description: 'Juego desarrollado en Unity. Jugable en el navegador vía WebGL.',
}

export default async function LightTheBytePage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang: languageParam } = await params
  const lang = languageParam === 'es' || languageParam === 'en' ? languageParam : 'es'
  const dictionary = await getDictionary(lang)

  return (
    <>
      <Navbar dict={dictionary} lang={lang} />
      <main className="min-h-screen pt-16 md:pt-20 lg:pt-24 w-full bg-background">
        <div className="w-full max-w-5xl mx-auto px-4 md:px-6 lg:px-8 pb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Light The Byte</h1>

          {/* Embed WebGL Unity placeholder */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4">Jugar</h2>
            {/* REEMPLAZAR CON URL DE WEBGL BUILD */}
            <div className="relative aspect-video rounded-xl overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center">
              <iframe
                src=""
                title="Light The Byte — Unity WebGL"
                className="w-full h-full"
                allowFullScreen
              />
              <span className="absolute inset-0 flex items-center justify-center text-white/50 text-sm pointer-events-none">URL del build WebGL por definir</span>
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
