// ============================================================================
// PÁGINA STUB: Obra Generativa
// ============================================================================

import { getDictionary } from '@/lib/getDictionary'
import PlaygroundStubPage from '@/components/playground/PlaygroundStubPage'

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

  return (
    <PlaygroundStubPage
      lang={lang}
      dictionary={dictionary}
      slug="obra-generativa"
      title="Obra Generativa"
      description="TODO"
      embedKind="youtube"
      embedHeading="Video"
      iframeTitle="Obra Generativa"
      iframeSrc=""
      embedPlaceholderText="URL de YouTube por definir"
      showSketch={true}
      sketchHeading="Sketch interactivo"
      sketchPlaceholderText="Sketch p5.js por incrustar"
      tags={["Processing", "p5.js"]}
    />
  )
}
