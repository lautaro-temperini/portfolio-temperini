import { Suspense } from "react"
import Link from "next/link"
import type { Dictionary } from "@/lib/dictionary-types"
import Navbar from "@/components/navbar/Navbar"
import Footer from "@/components/footer/Footer"

type EmbedKind = "webgl" | "youtube"

interface PlaygroundStubPageProps {
  lang: "es" | "en"
  dictionary: Dictionary
  slug: string
  title: string
  description: string
  embedKind: EmbedKind
  embedHeading: string
  iframeTitle: string
  iframeSrc: string
  embedPlaceholderText: string
  showSketch?: boolean
  sketchHeading?: string
  sketchPlaceholderText?: string
  tags?: string[]
}

export default function PlaygroundStubPage({
  lang,
  dictionary,
  slug,
  title,
  description,
  embedKind,
  embedHeading,
  iframeTitle,
  iframeSrc,
  embedPlaceholderText,
  showSketch = false,
  sketchHeading = "Sketch interactivo",
  sketchPlaceholderText = "TODO",
  tags,
}: PlaygroundStubPageProps) {
  return (
    <>
      <Navbar dict={dictionary} lang={lang} />

      <main className="min-h-screen pt-16 md:pt-20 lg:pt-24 w-full bg-background">
        <div className="w-full max-w-5xl mx-auto px-4 md:px-6 lg:px-8 pb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">{title}</h1>

          {/* Embed placeholder */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4">{embedHeading}</h2>

            <div className="relative aspect-video rounded-xl overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center">
              <iframe
                src={iframeSrc}
                title={iframeTitle}
                className="w-full h-full"
                allowFullScreen
              />

              <span className="absolute inset-0 flex items-center justify-center text-white/50 text-sm pointer-events-none">
                {embedPlaceholderText}
              </span>
            </div>
          </section>

          {/* Descripción placeholder */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4">Descripción del proyecto</h2>
            <p className="text-white/80">{description}</p>
          </section>

          {/* Sketch placeholder (si aplica) */}
          {showSketch && (
            <section className="mb-10">
              <h2 className="text-xl font-semibold text-white mb-4">{sketchHeading}</h2>
              <div className="rounded-xl overflow-hidden bg-white/5 border border-white/10 min-h-[320px] flex items-center justify-center">
                <span className="text-white/50 text-sm">{sketchPlaceholderText}</span>
              </div>
            </section>
          )}

          {/* Tags (si aplica) */}
          {tags && tags.length > 0 && (
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
          )}

          <Link
            href={`/${lang}/playground`}
            className="inline-flex items-center gap-2 text-white/90 hover:text-white font-medium"
          >
            ← Volver al Playground
          </Link>
        </div>
      </main>

      <Suspense fallback={<footer className="h-32 bg-background/80" />}>
        <Footer dict={dictionary} lang={lang} />
      </Suspense>
    </>
  )
}

