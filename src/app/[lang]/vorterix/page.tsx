import { getDictionary } from '@/lib/getDictionary'
import Navbar from "@/components/navbar/Navbar"
import ScrollToTop from "@/components/fxscripts/scroll-to-top"
import Footer from "@/components/footer/Footer"
import ProseSection from "@/components/case-study/ProseSection"
import Image from "next/image"
import SectionNav from "@/components/case-study/SectionNav"
import FadeOnScroll from "@/components/fxscripts/FadeOnScroll"
import { GridContainer } from "@/components/sections/GridContainer"
import { Block } from "@/components/sections/Block"

export const metadata = {
  title: "Paren la Mano | Landing que convierte audiencia en comunidad | Lautaro R. Temperini",
  description:
    "Diseñé una landing de conversión para Paren la Mano (Vorterix), alineando tono, identidad visual y propuesta de valor. Sin frameworks. Sin métricas. Con decisiones de diseño real.",
  keywords:
    "Vorterix - Landing Page, Vorterix, Paren la Mano, UX/UI, landing page, FOMO, comunidad, suscripciones, identidad visual, Lautaro Temperini, diseño web",
  alternates: {
    canonical: '/vorterix',
  },
  openGraph: {
    title: "Paren la Mano | Landing que convierte audiencia en comunidad | Lautaro R. Temperini",
    description:
      "Diseñé una landing de conversión para Paren la Mano (Vorterix), alineando tono, identidad visual y propuesta de valor. Sin frameworks. Sin métricas. Con decisiones de diseño real.",
    url: "https://temperini.vercel.app/vorterix",
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
  const t = (dict as any).projectPages?.vorterix || {
    hero: { title: "VORTERIX", subtitle: "", description: "" },
    snapshotTop: {
      companyLabel: "",
      companyValue: "",
      roleLabel: "",
      roleValue: "",
      timelineLabel: "",
      timelineValue: "",
      scopeLabel: "",
      scopeValue: "",
      problemLabel: "",
      problemValue: "",
    },
    brief: { title: "", quote: "", description: "" },
    why: { title: "", reasons: [] as string[] },
    audience: { title: "", description: "", wants: [] as string[] },
    insights: {
      title: "",
      items: [] as { title: string; text: string }[],
    },
    persona: { text: "" },
    conversion: {
      title: "",
      decisions: [] as { title: string; text: string }[],
    },
    iterations: {
      title: "",
      items: [] as string[],
      resolution: "",
      learning: "",
    },
    ux: { title: "", text: "" },
    conclusion: { title: "", text1: "", text2: "" },
  }

  return (
    <>
      <Navbar dict={dict} lang={lang} />
      <div className="relative z-[20]">
        <main style={{ transform: 'none' }} className="[&>*]:!transform-none">
          <SectionNav sections={[
            { id: "brief" },
            { id: "diseno" },
            { id: "conversion" },
            { id: "decisiones", label: "Decisiones de diseño" },
            { id: "iteraciones", label: "Iteraciones y UX" },
          ]} />

          {/* 1. Hero */}
          <FadeOnScroll>
            <section className="w-full px-8 md:px-12 lg:px-20 pt-28 md:pt-32 lg:pt-36 mb-12">
              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold leading-tight text-light mb-6">
                {t.hero.title}
              </h1>
              <p className="text-xl md:text-2xl font-semibold text-light mb-4">
                {t.hero.subtitle}
              </p>
              <div className="text-base md:text-lg text-[#F1F1F1] leading-relaxed">
                <p>{t.hero.description}</p>
              </div>
            </section>
          </FadeOnScroll>

          {/* 2. Banner logo */}
          <FadeOnScroll delay={80}>
            <section className="w-full px-8 md:px-12 lg:px-20 mb-16">
              <div className="relative w-full h-[150px] md:h-[200px] rounded-lg overflow-hidden bg-[#121212]">
                <Image
                  src="/images/vorterixImages/VorterixLogo.webp"
                  alt={lang === "es" ? "Logo de Vorterix para la campaña Paren la Mano" : "Vorterix logo for the Paren la Mano campaign"}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 1200px"
                  priority={true}
                />
              </div>
            </section>
          </FadeOnScroll>

          {/* 3. Snapshot */}
          <FadeOnScroll delay={150}>
            <section className="w-full px-8 md:px-12 lg:px-20 mb-16">
              <div className="text-sm text-light/80 space-y-2">
                <div>
                  <span className="text-light/70 font-semibold">{t.snapshotTop.companyLabel}</span> · {t.snapshotTop.companyValue}
                </div>
                <div>
                  <span className="text-light/70 font-semibold">{t.snapshotTop.roleLabel}</span> · {t.snapshotTop.roleValue}
                </div>
                <div>
                  <span className="text-light/70 font-semibold">{t.snapshotTop.timelineLabel}</span> · {t.snapshotTop.timelineValue}
                </div>
                <div>
                  <span className="text-light/70 font-semibold">{t.snapshotTop.scopeLabel}</span> · {t.snapshotTop.scopeValue}
                </div>
                <div>
                  <span className="text-light/70 font-semibold">{t.snapshotTop.problemLabel}</span> · {t.snapshotTop.problemValue}
                </div>
              </div>
            </section>
          </FadeOnScroll>

          {/* 4. Brief + Por qué en 2 columnas */}
          <FadeOnScroll>
            <ProseSection id="brief" className="mb-20">
              <GridContainer cols={{ default: 1, md: 2 }} gap="lg" className="!px-0">
                <Block colSpan={1}>
                  <h2 className="text-3xl font-bold text-light mb-6">{t.brief.title}</h2>
                  {t.brief.quote && (
                    <blockquote className="text-[#F1F1F1] italic mb-6 text-lg border-l-4 border-purple-500 pl-4">
                      {t.brief.quote}
                    </blockquote>
                  )}
                  <p className="mb-2">{t.brief.description}</p>
                </Block>
                <div id="por-que">
                  <Block colSpan={1}>
                    <h2 className="text-3xl font-bold text-light mb-6">{t.why.title}</h2>
                    <ul className="list-disc pl-5 space-y-3 mb-6">
                      {t.why.reasons.map((reason: string, idx: number) => (
                        <li key={idx}>{reason}</li>
                      ))}
                    </ul>
                  </Block>
                </div>
              </GridContainer>
            </ProseSection>
          </FadeOnScroll>

          {/* 6. Divider */}
          <FadeOnScroll>
            <div className="w-full px-8 md:px-12 lg:px-20 mb-28">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>
          </FadeOnScroll>

          {/* 7. Audiencia + Insights */}
          <FadeOnScroll>
            <ProseSection id="diseno" className="mb-28">
              <h2 className="text-3xl font-bold text-light mb-6">{t.audience.title}</h2>
              <div className="prose prose-invert max-w-none text-[#F1F1F1] leading-relaxed">
                <p className="mb-6">{t.audience.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex-1 rounded-2xl p-8 bg-[#9C96A4]/10 border-2 border-[#F1F1F1]/10">
                    <h3 className="text-light font-semibold text-xl mb-4">La audiencia no quería "algo lindo"</h3>
                    <p className="text-[#F1F1F1] mb-4">Quería algo que hablara como ellos:</p>
                    <ul className="text-[#F1F1F1] space-y-2">
                      {t.audience.wants.map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-gray-400 mr-3">🡆</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex-1 rounded-2xl p-8 bg-[#9C96A4]/10 border-2 border-[#F1F1F1]/10">
                    <h3 className="text-light font-semibold text-xl mb-4">{t.insights.title}</h3>
                    <ul className="text-[#F1F1F1] space-y-3">
                      {t.insights.items.map(
                        (item: { title: string; text: string }, idx: number) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-gray-400 mr-3">🡆</span>
                            <div>
                              <strong className="text-light">{item.title}</strong> {item.text}
                            </div>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </ProseSection>
          </FadeOnScroll>

          {/* 8. Persona quote */}
          <FadeOnScroll>
            <div className="w-full px-8 md:px-12 lg:px-20 mb-28">
              <p className="text-[#F1F1F1] text-lg lg:text-xl leading-relaxed">
                {t.persona.text}
              </p>
            </div>
          </FadeOnScroll>

          {/* 9. Colores y Tipografía */}
          <FadeOnScroll>
            <section className="w-full px-8 md:px-12 lg:px-20 mb-28">
              <GridContainer cols={{ default: 1, md: 2 }} gap="md" className="!px-0">
                <Block colSpan={1}>
                  <div className="w-full aspect-[4/3] rounded-lg overflow-hidden bg-light">
                    <Image
                      src="/images/vorterixImages/VorterixColors.webp"
                      alt={lang === "es" ? "Paleta de colores del proyecto Vorterix Paren la Mano" : "Vorterix Paren la Mano project color palette"}
                      width={600}
                      height={400}
                      sizes="(max-width: 768px) 100vw, 700px"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Block>
                <Block colSpan={1} className="hidden md:block">
                  <div className="w-full aspect-[4/3] rounded-lg overflow-hidden bg-light">
                    <Image
                      src="/images/vorterixImages/VorterixFont.webp"
                      alt={lang === "es" ? "Tipografía y jerarquía visual del proyecto Vorterix" : "Vorterix project typography and visual hierarchy"}
                      width={600}
                      height={400}
                      sizes="(max-width: 768px) 100vw, 700px"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Block>
              </GridContainer>
            </section>
          </FadeOnScroll>

          {/* 10. VorterixHero + Refes */}
          <FadeOnScroll>
            <section className="w-full px-8 md:px-12 lg:px-20 mb-28">
              <GridContainer cols={{ default: 1, md: 2 }} gap="md" className="!px-0">
                <Block colSpan={1}>
                  <div className="w-full aspect-[4/3] rounded-lg overflow-hidden bg-[#1b1e26] ">
                    <video
                      src="/images/vorterixImages/VorterixHero.webm"
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      aria-label={lang === "es" ? "Video hero de la landing Vorterix Paren la Mano" : "Vorterix Paren la Mano landing hero video"}
                      className="w-full h-full object-cover scale-105 transition-none"
                    />
                  </div>
                </Block>
                <Block colSpan={1}>
                  <div className="w-full aspect-[4/3] rounded-lg overflow-hidden bg-[#000000]">
                    <Image
                      src="/images/vorterixImages/VorterixRefes.webp"
                      alt={lang === "es" ? "Referencias de diseño e inspiración visual para la landing Vorterix" : "Design references and visual inspiration for the Vorterix landing"}
                      width={600}
                      height={400}
                      sizes="(max-width: 768px) 100vw, 700px"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </Block>
              </GridContainer>
            </section>
          </FadeOnScroll>

          {/* 11. Divider */}
          <FadeOnScroll>
            <div className="w-full px-8 md:px-12 lg:px-20 mb-28">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>
          </FadeOnScroll>

          {/* 12. VorterixFeedback + VorterixMockup lado a lado, decisiones e iteraciones alineadas */}
          <FadeOnScroll>
            <section id="conversion" className="w-full px-8 md:px-12 lg:px-20 mb-28">
              <h2 className="text-3xl font-bold text-light mb-6">{t.conversion.title}</h2>
              <GridContainer cols={{ default: 1, md: 2 }} gap="md" className="!px-0 mb-12">
                <Block colSpan={1}>
                  <div className="w-full aspect-[1/1] rounded-2xl overflow-hidden bg-[#1A1F26]">
                    <video
                      src="/images/vorterixImages/VorterixFeedback.webm"
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      aria-label={lang === "es" ? "Video de feedback y decisiones de diseño de la landing Vorterix" : "Vorterix landing feedback and design decisions video"}
                      className="w-full h-full object-cover object-top -translate-y-8 md:-translate-y-24 scale-105 transition-none"
                    />
                  </div>
                </Block>
                <Block colSpan={1}>
                  <div className="w-full aspect-[1/1] rounded-2xl overflow-hidden bg-[#181818]/40 border-2 border-[#F1F1F1]/10">
                    <Image
                      src="/images/vorterixImages/VorterixMockup.webp"
                      alt={lang === "es" ? "Mockup final de la landing Paren la Mano (Vorterix) en dispositivo" : "Final mockup of Paren la Mano (Vorterix) landing on device"}
                      width={800}
                      height={600}
                      sizes="(max-width: 768px) 100vw, 1200px"
                      className="w-full h-full object-cover"
                      priority={false}
                      quality={75}
                    />
                  </div>
                </Block>
              </GridContainer>
              <section id="decisiones">
              <GridContainer cols={{ default: 1, md: 2 }} gap="lg" className="!px-0">
                <Block colSpan={1}>
                  <div className="space-y-3">
                    <h2 className="text-2xl md:text-3xl font-bold text-light">Decisiones de diseño</h2>
                    <ul className="space-y-3">
                      {t.conversion.decisions.map(
                        (dec: { title: string; text: string }, idx: number) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-green-400 mr-3 mt-1">•</span>
                            <span>
                              <strong className="text-light">{dec.title}</strong> {dec.text}
                            </span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </Block>
                <Block colSpan={1} className="md:-mt-1">
                  <div className="space-y-4 text-[#F1F1F1]">
                    <h2 className="text-2xl md:text-3xl font-bold text-light">{t.iterations.title}</h2>
                    <p className="text-sm italic text-[#F1F1F1]/60">(basadas en conflicto real)</p>
                    <ul className="space-y-3 mb-4">
                      {t.iterations.items.slice(0, 2).map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-red-400 mr-3 mt-1">×</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <p className="text-[#F1F1F1]">
                      {t.iterations.items[2]} {t.iterations.resolution}
                    </p>
                  </div>
                </Block>
              </GridContainer>
              </section>
            </section>
          </FadeOnScroll>

{/* 13. VorterixReel */}
<FadeOnScroll>
  <div className="w-full px-8 md:px-12 lg:px-20 mb-28">
    <div className="w-full aspect-[2/1] rounded-2xl overflow-hidden bg-[#000000]">
      <video
        src="/images/vorterixImages/VorterixReel.webm"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-label={lang === "es" ? "Reel del proyecto de landing Vorterix Paren la Mano" : "Vorterix Paren la Mano landing project reel"}
        className="w-full h-full object-contain"
      />
    </div>
  </div>
</FadeOnScroll>


          {/* Divider antes de UX + Conclusión */}
          <FadeOnScroll>
            <div className="w-full px-8 md:px-12 lg:px-20 mb-28">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>
          </FadeOnScroll>

          {/* 14. UX + Conclusión en grid de 2 columnas */}
          <FadeOnScroll>
            <section id="iteraciones" className="w-full px-8 md:px-12 lg:px-20 mb-28">
              <GridContainer cols={{ default: 1, md: 2 }} gap="lg" className="!px-0">
                <Block colSpan={1}>
                  <div id="ux">
                    <h2 className="text-3xl font-bold text-light mb-6">{t.ux.title}</h2>
                    <p className="text-[#F1F1F1] leading-relaxed mb-4">{t.iterations.learning}</p>
                    <p className="text-lg text-[#F1F1F1] leading-relaxed">{t.ux.text}</p>
                  </div>
                </Block>
                <Block colSpan={1}>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-light mb-6">{t.conclusion.title}</h2>
                    <div className="space-y-4">
                      <p className="text-lg text-[#F1F1F1] leading-relaxed">{t.conclusion.text1}</p>
                      <p className="text-xl font-semibold text-light">{t.conclusion.text2}</p>
                    </div>
                  </div>
                </Block>
              </GridContainer>
            </section>
          </FadeOnScroll>
        </main>
        <Footer dict={dict} lang={lang} />
        <ScrollToTop size={48} />
      </div>
    </>
  )
}
