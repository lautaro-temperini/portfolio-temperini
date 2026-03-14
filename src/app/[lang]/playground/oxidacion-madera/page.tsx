// ============================================================================
// PÁGINA: Creación/Destrucción — Oxidación en Madera
// ============================================================================

import { Suspense } from 'react'
import { getDictionary } from '@/lib/getDictionary'
import Navbar from '@/components/navbar/Navbar'
import Footer from '@/components/footer/Footer'
import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: 'Creación/Destrucción | Playground | Lautaro R. Temperini',
  description: 'Oxidación y contrastes en madera. Acetato férrico sobre roble, acrílico azul cobalto y exposición solar. El deterioro como método de creación.',
}

export default async function OxidacionMaderaPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang: languageParam } = await params
  const lang = languageParam === 'es' || languageParam === 'en' ? languageParam : 'es'
  const dictionary = await getDictionary(lang)

  const galleryImages = [
    { src: '/images/playground/oxidacion-madera.webp', caption: 'Resultado Final' },
    { src: '/images/playground/posterizado-a4.webp', caption: 'Posterizado A4' },
    { src: '/images/playground/original-a4.webp', caption: 'Original A4' },
    { src: '/images/playground/linea-homogenea-a4.webp', caption: 'Línea Homogénea A4' },
  ]

  const tags = ['Técnica mixta', 'Madera', 'Oxidación', 'Acetato Férrico', 'Acrílico']

  return (
    <>
      <Navbar dict={dictionary} lang={lang} />
      <main className="min-h-screen pt-16 md:pt-20 lg:pt-24 w-full bg-background">
        <div className="w-full max-w-5xl mx-auto px-4 md:px-6 lg:px-8 pb-20">
          {/* Hero: imagen full width con overlay */}
          <section className="relative w-full -mx-4 md:-mx-6 lg:-mx-8 mb-10 md:mb-12">
            <div className="relative w-full aspect-[16/9] md:aspect-[21/9] min-h-[240px]">
              <Image
                src="/images/playground/oxidacion-madera.webp"
                alt="Creación/Destrucción — Oxidación en madera"
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
              <div className="absolute inset-0 bg-black/50" />
            </div>
          </section>

          {/* Título y subtítulo */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
            Creación/Destrucción
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-8">
            Oxidación y Contrastes en Madera
          </p>

          {/* Descripción poética */}
          <p className="text-white/90 text-lg leading-relaxed mb-12 max-w-3xl">
            La oxidación de la madera no solo resalta un proceso de deterioro, sino que simboliza el valor que puede surgir de la transformación natural. Esta obra invita a reflexionar sobre los procesos de cambio, donde el paso del tiempo, aunque a menudo tormentoso, puede resultar en algo profundo y significativo.
          </p>

          {/* Objetivo y Materiales */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-4">Objetivo y Materiales</h2>
            <p className="text-white/85 mb-6">
              Explorar el contraste entre luz y sombra, y entre frío y calor, mediante una solución de acetato férrico sobre madera.
            </p>
            <p className="text-white/70 text-sm font-medium mb-2">Materiales:</p>
            <ul className="list-disc list-inside text-white/85 space-y-1">
              <li>Madera de roble o pino</li>
              <li>Vinagre</li>
              <li>Lana de acero</li>
              <li>Pincel</li>
              <li>Lápiz</li>
              <li>Acrílico azul cobalto</li>
            </ul>
          </section>

          {/* Proceso */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-6">Proceso</h2>

            <h3 className="text-lg font-medium text-white/90 mb-3">Preparación</h3>
            <ol className="list-decimal list-inside text-white/85 space-y-2 mb-8">
              <li>Seleccionar la madera (roble o pino) y lijar suavemente si es necesario.</li>
              <li>Preparar la solución de acetato férrico: sumergir lana de acero en vinagre y dejar reposar varios días.</li>
              <li>Filtrar la solución y aplicarla con pincel sobre la madera en las zonas deseadas.</li>
              <li>Dejar secar y, opcionalmente, exponer al sol para intensificar la oxidación.</li>
              <li>Dibujar o marcar con lápiz antes de aplicar capas adicionales para definir el diseño.</li>
            </ol>

            <h3 className="text-lg font-medium text-white/90 mb-3">Oxidación y Tratamiento</h3>
            <ol className="list-decimal list-inside text-white/85 space-y-4">
              <li>
                <strong>Primera capa:</strong> Aplicar acetato férrico en tres concentraciones distintas (diluido, medio, concentrado) en zonas diferentes para generar gradientes de tono.
              </li>
              <li>
                <strong>Contraste:</strong> Una vez seca la oxidación, aplicar acrílico azul cobalto en áreas seleccionadas para contrastar con los tonos cálidos de la madera oxidada.
              </li>
              <li>
                <strong>Exposición solar:</strong> Dejar la pieza al sol para que la luz acentúe los contrastes y modifique levemente los tonos con el tiempo.
              </li>
            </ol>
          </section>

          {/* Galería 2x2 */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-6">Galería</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {galleryImages.map((img) => (
                <figure key={img.src} className="rounded-xl overflow-hidden border border-white/10">
                  <Image
                    src={img.src}
                    alt={img.caption}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover aspect-[4/3]"
                  />
                  <figcaption className="p-3 bg-white/5 text-white/80 text-sm text-center">
                    {img.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>

          {/* Tags */}
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

          {/* Botón volver */}
          <Link
            href={`/${lang}/playground`}
            className="inline-flex items-center gap-2 text-white/90 hover:text-white font-medium"
          >
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
