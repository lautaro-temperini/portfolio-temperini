// ============================================================================
// PÁGINA STUB: Light The Byte
// ============================================================================

import { getDictionary } from '@/lib/getDictionary'
import PlaygroundStubPage from '@/components/playground/PlaygroundStubPage'

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
    <PlaygroundStubPage
      lang={lang}
      dictionary={dictionary}
      slug="light-the-byte"
      title="Light The Byte"
      description="TODO"
      embedKind="webgl"
      embedHeading="Jugar"
      iframeTitle="Light The Byte — Unity WebGL"
      iframeSrc=""
      embedPlaceholderText="URL del build WebGL por definir"
    />
  )
}
