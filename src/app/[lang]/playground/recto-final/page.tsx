// ============================================================================
// PÁGINA STUB: Recto Final
// ============================================================================

import { getDictionary } from '@/lib/getDictionary'
import PlaygroundStubPage from '@/components/playground/PlaygroundStubPage'

export const metadata = {
  title: 'Recto Final | Playground | Lautaro R. Temperini',
  description: 'Juego de carreras desarrollado en Unity. Jugable en el navegador vía WebGL.',
}

export default async function RectoFinalPage({
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
      slug="recto-final"
      title="Recto Final"
      description="TODO"
      embedKind="webgl"
      embedHeading="Jugar"
      iframeTitle="Recto Final — Unity WebGL"
      iframeSrc=""
      embedPlaceholderText="URL del build WebGL por definir"
    />
  )
}
