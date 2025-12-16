import { getDictionary } from '@/lib/getDictionary'
import Navbar from "@/components/navbar/Navbar"
import ScrollToTop from "@/components/fxscripts/scroll-to-top"
import Footer from "@/components/footer/Footer"
import CaseStudyLayout from "@/components/case-study/CaseStudyLayout"
import ProseSection from "@/components/case-study/ProseSection"
import ImageBreakout from "@/components/case-study/ImageBreakout"
import Image from "next/image"

export const metadata = {
  title: "Paren la Mano | Landing que convierte audiencia en comunidad | Lautaro R. Temperini",
  description:
    "Diseñé una landing de conversión para Paren la Mano (Vorterix), alineando tono, identidad visual y propuesta de valor. Sin frameworks. Sin métricas. Con decisiones de diseño real.",
  keywords:
    "Vorterix - Landing Page, Vorterix, Paren la Mano, UX/UI, landing page, FOMO, comunidad, suscripciones, identidad visual, Lautaro Temperini, diseño web",
  openGraph: {
    title: "Paren la Mano | Landing que convierte audiencia en comunidad | Lautaro R. Temperini",
    description:
      "Diseñé una landing de conversión para Paren la Mano (Vorterix), alineando tono, identidad visual y propuesta de valor. Sin frameworks. Sin métricas. Con decisiones de diseño real.",
    url: "https://temperini.vercel.app/level-up",
    siteName: "Temperini Portfolio",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: "https://temperini.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Vorterix - Landing Page",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vorterix - Landing Page | Landing que convierte oyentes en comunidad | Lautaro R. Temperini",
    description:
      "Experiencia digital que transforma oyentes en comunidad activa. Diseño enfocado en FOMO, identidad visual y conversión.",
    images: ["https://temperini.vercel.app/og-image.jpg"],
  },
}

export default async function VorterixLandingPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang: langParam } = await params
  const lang = (langParam === 'es' || langParam === 'en') ? langParam : 'es'
  const dict = await getDictionary(lang)

  return (
    <div className="page-transition">
      <Navbar dict={dict} lang={lang} />
      <main className="pt-16 md:pt-20 lg:pt-24">
        <CaseStudyLayout>
          {/* Hero Section - 60vh */}
          <section className="w-full h-[60vh] flex items-center justify-center">
            <div className="w-3/5 mx-auto px-8 md:px-10 lg:px-12">
              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold leading-tight text-[#F2F2F2] mb-6">
                VORTERIX
              </h1>
              <p className="text-xl md:text-2xl font-semibold text-[#F2F2F2] mb-4">
                Paren la mano - Landing Page
              </p>
              <div className="text-base md:text-lg text-[#F1F1F1] leading-relaxed">
                <p className="mb-2">Una landing sin vueltas.</p>
                <p>Diseñada para captar atención y convertir oyentes en comunidad, en menos de 10 segundos.</p>
              </div>
            </div>
          </section>

          {/* El brief real */}
          <ProseSection className="mb-16">
            <h2 className="text-3xl font-bold text-[#F2F2F2] mb-6">El brief real: un reto con límites claros</h2>
            <div className="prose prose-invert max-w-none text-[#F1F1F1] leading-relaxed">
              <blockquote className="text-[#F1F1F1] italic mb-6 text-lg border-l-4 border-purple-500 pl-4">
                "Tenés que convertir oyentes en leads. Sin métricas. Sin data. Solo criterio y decisiones que funcionen."
              </blockquote>
              <p className="mb-2">Desafío académico, mentalidad profesional.</p>
              <p>Nuestro objetivo fue claro: captar público joven a través de contenido exclusivo y llevarlo a otros streamings de Vorterix.</p>
            </div>
          </ProseSection>

          {/* Por qué hacía falta esta landing */}
          <ProseSection className="mb-16">
            <h2 className="text-3xl font-bold text-[#F2F2F2] mb-6">¿Por qué hacía falta esta landing?</h2>
            <div className="prose prose-invert max-w-none text-[#F1F1F1] leading-relaxed">
              <ul className="list-disc pl-5 space-y-3 mb-6">
                <li>La web de Vorterix no reflejaba el espíritu de Paren la Mano.</li>
                <li>La audiencia joven (16-30) se enganchaba en Twitch o TikTok, pero no se quedaba.</li>
                <li>Había contenido exclusivo, pero sin un canal claro para comunicarlo.</li>
                <li>El sitio general no tenía CTA, ni storytelling, ni sentido de comunidad.</li>
              </ul>
              <p>Esta landing buscó resolver eso: ser una entrada directa, rápida y relevante al universo Vorterix desde PLM.</p>
            </div>
          </ProseSection>

          {/* Logo Vorterix */}
          <ImageBreakout
            src="/images/vorterixImages/VorterixLogo.webp"
            alt="Logo Vorterix"
            width={400}
            height={200}
            border={false}
          />

          {/* El diseño empieza por ellos */}
          <ProseSection className="mb-16">
            <h2 className="text-3xl font-bold text-[#F2F2F2] mb-6">
              El diseño empieza por ellos
            </h2>
            <div className="prose prose-invert max-w-none text-[#F1F1F1] leading-relaxed">
              <p className="mb-6">Estudiamos el tono y contenido del programa, analizamos redes, y observamos qué funcionaba en medios como Olga y LuzuTV.</p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex-1 rounded-2xl p-8 bg-[#9C96A4]/10 border-2 border-[#F1F1F1]/10">
                  <h3 className="text-[#F2F2F2] font-semibold text-xl mb-4">La audiencia no quería "algo lindo"</h3>
                  <p className="text-[#F1F1F1] mb-4">Quería algo que hablara como ellos:</p>
                  <ul className="text-[#F1F1F1] space-y-2">
                    <li className="flex items-start">
                      <span className="text-gray-400 mr-3">🡆</span>
                      Ácido, informal, sin rodeos.
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-400 mr-3">🡆</span>
                      Que no sobreexpliquen.
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-400 mr-3">🡆</span>
                      Que les den algo a cambio.
                    </li>
                  </ul>
                </div>
                <div className="flex-1 rounded-2xl p-8 bg-[#9C96A4]/10 border-2 border-[#F1F1F1]/10">
                  <h3 className="text-[#F2F2F2] font-semibold text-xl mb-4">Insights que guiaron decisiones</h3>
                  <ul className="text-[#F1F1F1] space-y-3">
                    <li className="flex items-start">
                      <span className="text-gray-400 mr-3">🡆</span>
                      <div>
                        <strong className="text-[#F2F2F2]">Paleta vibrante (verde/violeta):</strong> mantiene la energía de PLM.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-400 mr-3">🡆</span>
                      <div>
                        <strong className="text-[#F2F2F2]">Tipografías pesadas:</strong> refleja el tono del show.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-400 mr-3">🡆</span>
                      <div>
                        <strong className="text-[#F2F2F2]">Contenido exclusivo visible:</strong> valor antes de pedir datos.
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </ProseSection>

          {/* Quote destacado */}
          <div className="w-3/5 mx-auto px-8 md:px-10 lg:px-12 mb-16">
            <div className="text-center">
              <p className="text-[#F1F1F1] text-lg lg:text-xl leading-relaxed">
                No diseñamos para una audiencia general. Diseñamos para Agustín, que escucha Twitch mientras edita en
                Premiere, que odia los mails largos y que quiere algo que lo haga reír.
              </p>
            </div>
          </div>

          {/* Colores y Tipografía */}
          <div className="w-3/5 mx-auto px-8 md:px-10 lg:px-12 mb-16">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="w-full h-[70vh] flex items-center justify-center rounded-lg overflow-hidden bg-[#F2F2F2]">
                <Image
                  src="/images/vorterixImages/VorterixColors.webp"
                  alt="Paleta de colores Vorterix"
                  width={600}
                  height={400}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="w-full h-[70vh] flex items-center justify-center rounded-lg overflow-hidden bg-[#F2F2F2]">
                <Image
                  src="/images/vorterixImages/VorterixFont.webp"
                  alt="Tipografía Vorterix"
                  width={600}
                  height={400}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>

          {/* Hero y Referencias */}
          <div className="w-3/5 mx-auto px-8 md:px-10 lg:px-12 mb-16">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="h-full rounded-lg overflow-hidden" style={{backgroundColor: '#1A1F26'}}>
                <video
                  src="/images/vorterixImages/VorterixHero.webm"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-full h-full flex items-center justify-center rounded-lg overflow-hidden bg-[#F2F2F2]">
                <Image
                  src="/images/vorterixImages/VorterixRefes.webp"
                  alt="Referencias de diseño Vorterix"
                  width={600}
                  height={400}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>

          {/* Conversión sin perder identidad */}
          <ProseSection className="mb-16">
            <h2 className="text-3xl font-bold text-[#F2F2F2] mb-6">Conversión sin perder identidad</h2>
            <div className="prose prose-invert max-w-none text-[#F1F1F1] leading-relaxed">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="h-[700px] rounded-2xl overflow-hidden" style={{backgroundColor: '#1A1F26'}}>
                  <video
                    src="/images/vorterixImages/VorterixFeedback.webm"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="flex flex-col h-full justify-start pt-8">
                  <div className="text-lg font-semibold text-[#F2F2F2] mb-1">Decisiones de diseño:</div>
                  <ul className="space-y-1">
                    <li className="flex items-start">
                      <span className="text-green-400 mr-3 mt-1">•</span>
                      <span>
                        <strong className="text-[#F2F2F2]">Hero con GIF + CTA inmediato:</strong> impacto en los primeros 3 segundos.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-3 mt-1">•</span>
                      <span>
                        <strong className="text-[#F2F2F2]">Formulario duplicado:</strong> máxima visibilidad sin repetir visualmente.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-3 mt-1">•</span>
                      <span>
                        <strong className="text-[#F2F2F2]">Carrusel de clips:</strong> muestra el valor antes de pedir el email.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-3 mt-1">•</span>
                      <span>
                        <strong className="text-[#F2F2F2]">Narrativa FOMO:</strong> "Accedé a lo que otros se pierden".
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </ProseSection>

          {/* Video Reel full width */}
          <div className="w-full mb-16">
            <div className="h-[800px] rounded-2xl overflow-hidden" style={{backgroundColor: '#1A1F26'}}>
              <video
                src="/images/vorterixImages/VorterixReel.webm"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Iteraciones clave */}
          <ProseSection className="mb-16">
            <h2 className="text-3xl font-bold text-[#F2F2F2] mb-6">Iteraciones clave</h2>
            <div className="prose prose-invert max-w-none text-[#F1F1F1] leading-relaxed">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <p className="text-sm text-[#595959] italic mb-4">(basadas en conflicto real)</p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-red-400 mr-3 mt-1">×</span>
                      Eliminamos secciones que nos gustaban, pero no aportaban a la conversión.
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-400 mr-3 mt-1">↻</span>
                      Rediseñamos la sección de clips 3 veces hasta que funcionó bien en mobile.
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-400 mr-3 mt-1">?</span>
                      Discutimos si mostrar staff o contenido de otros programas.
                    </li>
                  </ul>
                  <p className="text-[#595959] italic">
                    Ganó la segunda opción. La comunidad no se enamora de nombres: se queda por el contenido.
                  </p>
                  <div className="border-t border-[#333] pt-4 mt-6">
                    <p className="text-[#F2F2F2] font-medium">
                      Este tipo de decisiones no crearon la versión más linda. Crearon la versión que convertía.
                    </p>
                    <p className="text-[#F1F1F1] mt-2">Y entender eso fue una de las mejores lecciones del proyecto.</p>
                  </div>
                </div>
                <div className="h-full flex items-start justify-start rounded-2xl overflow-hidden bg-[#181818]/40 border-2 border-[#F1F1F1]/10">
                  <Image
                    src="/images/vorterixImages/VorterixMockup.webp"
                    alt="Mockup final de la landing Vorterix"
                    width={800}
                    height={600}
                    className="w-full h-full object-cover rounded-2xl"
                    priority={false}
                    quality={85}
                  />
                </div>
              </div>
            </div>
          </ProseSection>

          {/* UX sin narrativa */}
          <ProseSection className="mb-16">
            <h2 className="text-3xl font-bold text-[#F2F2F2] mb-6">
              UX sin narrativa es solo UI
            </h2>
            <div className="prose prose-invert max-w-none text-[#F1F1F1] leading-relaxed">
              <p className="text-lg">
                Aprendí que sin contenido real, el diseño es solo una maqueta. Que sin una narrativa concreta, la
                conversión es suerte. Y que sin reflejar la voz del programa, todo el esfuerzo es invisible.
              </p>
            </div>
          </ProseSection>

          {/* Conclusión - Sin contenedor */}
          <div className="w-3/5 mx-auto px-8 md:px-10 lg:px-12 mb-16">
            <div className="prose prose-invert max-w-none text-[#F1F1F1] leading-relaxed">
              <h2 className="text-4xl font-bold text-[#F2F2F2] mb-6 text-center">¿Qué fue esto realmente?</h2>
              <div className="space-y-6 text-center max-w-3xl mx-auto">
                <p className="text-lg">
                  Un laboratorio de decisiones: diseño, storytelling, contenido, límites técnicos.
                  <br />Y sobre todo, una prueba de cómo convertir atención en comunidad sin recursos, pero con criterio.
                </p>
                <div className="border-t border-[#333] pt-6">
                  <p className="text-xl text-[#F2F2F2] font-medium">
                    Pude confirmar que donde hay límite técnico y poco tiempo, hay lugar para criterio.
                    <br />Y eso es lo que más disfruto diseñando.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CaseStudyLayout>
      </main>
      <Footer dict={dict} lang={lang} />
      <ScrollToTop size={48} />
    </div>
  )
}
