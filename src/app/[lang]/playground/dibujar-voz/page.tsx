// ============================================================================
// PÁGINA STUB: Dibujar con la Voz
// ============================================================================

import { getDictionary } from '@/lib/getDictionary'
import PlaygroundStubPage from '@/components/playground/PlaygroundStubPage'

export const metadata = {
  title: 'Dibujar con la Voz | Playground | Lautaro R. Temperini',
  description: 'Experimento en p5.js donde la voz del usuario genera trazos visuales en tiempo real.',
}

export default async function DibujarVozPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang: languageParam } = await params
  const lang = languageParam === 'es' || languageParam === 'en' ? languageParam : 'es'
  const dictionary = await getDictionary(lang)

  return (
    <PlaygroundStubPage
      lang={lang}
      dictionary={dictionary}
      slug="dibujar-voz"
      title="Dibujar con la Voz"
      description="TODO"
      embedKind="youtube"
      embedHeading="Video"
      iframeTitle="Dibujar con la Voz"
      iframeSrc=""
      embedPlaceholderText="URL de YouTube por definir"
      showSketch={true}
      sketchHeading="Sketch interactivo"
      sketchPlaceholderText="Sketch p5.js por incrustar"
      tags={["p5.js", "Audio", "Interactivo"]}
    />
  )
}
