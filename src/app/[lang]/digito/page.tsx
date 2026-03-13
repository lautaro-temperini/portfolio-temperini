import { getDictionary } from "@/lib/getDictionary"
import Navbar from "@/components/navbar/Navbar"
import ScrollToTop from "@/components/fxscripts/scroll-to-top"
import Footer from "@/components/footer/Footer"
import ImageBreakout from "@/components/sections/ImageBreakout"
import { GridContainer } from "@/components/sections/GridContainer"
import { Block } from "@/components/sections/Block"
import { BentoGrid, BentoItem } from "@/components/sections/BentoGrid"
import { FeatureCard } from "@/components/sections/FeatureCard"
import FadeOnScroll from "@/components/fxscripts/FadeOnScroll"
import Image from "next/image"

export const metadata = {
  title: "DÍGITO | Módulo Operativo | Lautaro R. Temperini",
  description:
    "Rediseño UX/UI del módulo operativo de Dígito: transformé el registro de horas de una tarea olvidada en parte natural del flujo diario.",
  keywords:
    "Dígito, UX/UI, time tracking, módulo operativo, registro de horas, B2B SaaS, Lautaro Temperini, caso de estudio, productividad, business intelligence",
  alternates: {
    canonical: '/digito',
  },
  openGraph: {
    title: "DÍGITO | Módulo Operativo | Lautaro R. Temperini",
    description: "Dígito es una empresa de Business Intelligence y RPA. Su plataforma SaaS B2B incluía facturación, reportes y administración, pero el módulo operativo para consultores tenía baja adopción y uso inconsistente.",
    url: "https://temperini.vercel.app/digito",
    siteName: "Temperini Portfolio",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: "https://temperini.vercel.app/images/digito-logo.webp",
        width: 1200,
        height: 630,
        alt: "DÍGITO - Módulo Operativo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DÍGITO | Módulo Operativo | Lautaro R. Temperini",
    description: "Transformé el registro de horas de una tarea adicional en parte natural del flujo de trabajo.",
    images: ["https://temperini.vercel.app/images/digito-logo.webp"],
  },
}

/**
 * Página de Dígito localizada - Reestructurada con componentes reutilizables
 * @param params - Parámetros de la ruta, incluye lang (es | en)
 */
export default async function DigitoPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  // Await params en Next.js 15
  const { lang: langParam } = await params
  const lang = langParam === "es" || langParam === "en" ? langParam : "es"
  const dict = await getDictionary(lang)
  const digitoData = (dict as any).projectPages?.digito || {}

  // Confiamos en los dictionaries - sin fallback innecesario
  const t: any = digitoData

  return (
    <>
      <Navbar dict={dict} lang={lang} />
      <div className="relative z-[20]">
        <main style={{ transform: 'none' }} className="[&>*]:!transform-none">
            {/* ==================== 1. HERO SECTION ==================== */}
            <FadeOnScroll>
              <section className="w-full px-8 md:px-12 lg:px-20 pt-28 md:pt-32 lg:pt-36 mb-20">
              <div className="w-full max-w-7xl">
                <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold leading-tight text-light mb-6">
                  {t.hero?.title || "DÍGITO"}
                </h1>
                <p className="text-xl md:text-2xl font-semibold text-light mb-4">{t.hero?.subtitle}</p>
                <p className="text-base md:text-lg text-light leading-relaxed mb-8">{t.hero?.description}</p>
              </div>
            </section>
            </FadeOnScroll>

            {/* ==================== BANNER HERO ==================== */}
            <FadeOnScroll delay={80}>
            <section className="w-full px-8 md:px-12 lg:px-20 mb-8">
  <div className="relative w-full h-[150px] md:h-[200px] rounded-lg overflow-hidden bg-[#0A1628]">
    <Image
      src="/images/digitoImages/DigitoRender3d.webp"
      alt="Render3D de Logo de Dígito"
      width={1198}
      height={206}
      className="w-full h-full object-cover"
    />
  </div>
</section>
            </FadeOnScroll>

          {/* ==================== PROJECT SNAPSHOT ==================== */}
          <section className="w-full px-8 md:px-12 lg:px-20 mb-20">
            <div className="text-sm text-light/80 space-y-2">
              <div>
                <span className="text-light/70 font-semibold">
                  {t.snapshotTop?.companyLabel}
                </span>{" "}
                · {t.snapshotTop?.companyValue}
              </div>

              <div>
                <span className="text-light/70 font-semibold">
                  {t.snapshotTop?.roleLabel}
                </span>{" "}
                · {t.snapshotTop?.roleValue}
              </div>

              <div>
                <span className="text-light/70 font-semibold">
                  {t.snapshotTop?.timelineLabel}
                </span>{" "}
                · {t.snapshotTop?.timelineValue}
              </div>

              <div>
                <span className="text-light/70 font-semibold">
                  {t.snapshotTop?.scopeLabel}
                </span>{" "}
                · {t.snapshotTop?.scopeValue}
              </div>

              <div>
                <span className="text-light/70 font-semibold">
                  {t.snapshotTop?.problemLabel}
                </span>{" "}
                · {t.snapshotTop?.problemValue}
              </div>
            </div>
          </section>

          {/* ==================== 2. CONTEXTO ==================== */}
            <FadeOnScroll delay={150}>
            <section className="w-full px-8 md:px-12 lg:px-20 mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-light mb-6">{t.context?.title}</h2>
            <div className="text-light leading-relaxed space-y-4 max-w-4xl">
              <p className="text-lg">{t.context?.text1}</p>
              <p className="text-lg">{t.context?.text2}</p>
            </div>
          </section>
            </FadeOnScroll>


{/* ==================== DIVIDER ==================== */}
<div className="w-full px-8 md:px-12 lg:px-20 mb-20">
  <div className="h-px w-full bg-gradient-to-r from-transparent via-[#08A4E1]/40 to-transparent" />
</div>

          {/* ==================== 5. HIPÓTESIS INICIAL ==================== */}
            <FadeOnScroll>
            <section className="w-full px-8 md:px-12 lg:px-20 mb-20">
            <div className="max-w-4xl mb-6">
              <h2 className="text-3xl md:text-4xl font-bold text-light mb-6">{t.problem?.title}</h2>
            </div>
            <GridContainer cols={{ default: 1, md: 2 }} gap="lg" className="!px-0 [&>*]:h-full">
              <Block colSpan={1}>
                <div className="bg-container/80 rounded-lg p-6 border border-container-light/10 md:h-full">
                  <h3 className="text-2xl font-semibold text-light mb-4">{t.problem?.businessImpact}</h3>
                  <div className="text-light leading-relaxed space-y-4">
                    {t.problem?.impactSummary && (
                      <blockquote className="text-light italic border-l-4 border-red-500 pl-4 mb-2">
                        {t.problem.impactSummary}
                      </blockquote>
                    )}
                    <p>{t.problem?.impactText}</p>
                    <ul className="list-disc pl-5 space-y-2">
                      {(t.problem?.impactItems || []).map((item: string, index: number) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Block>
              <Block colSpan={1}>
                    <div className="bg-container/80 rounded-lg p-6 border border-container-light/10 md:h-full">
                  <h3 className="text-2xl font-semibold text-light mb-4">
                    {t.problem?.title}
                  </h3>
                  <blockquote className="text-light italic border-l-4 border-red-500 pl-4 mb-4">
                    {t.problem?.hypothesisAuthor} {t.problem?.hypothesis}
                  </blockquote>
                  <p className="text-light font-semibold mb-4">{t.problem?.criticalQuestion}</p>
                  <div className="bg-container-light/10 backdrop-blur-sm rounded-lg p-4 border border-container-light/20">
                    <h4 className="font-semibold text-light mb-2">{t.problem?.scopeTitle}</h4>
                    <p className="text-light text-sm leading-relaxed">{t.problem?.scopeText}</p>
                  </div>
                </div>
              </Block>
            </GridContainer>
          </section>
            </FadeOnScroll>

          {/* ==================== 6. CUSTOMER JOURNEY BANNER (Full width 16:9) ==================== */}
<FadeOnScroll>
  <ImageBreakout
  src="/images/digitoImages/flujo-usuario-degradacion-progresiva-timetracking.webp"
  alt={
    lang === "es"
      ? "Diagrama de flujo mostrando cómo la experiencia del usuario se degradaba progresivamente desde la ejecución hasta el registro"
      : "Flow diagram showing how the user experience progressively degraded from execution to logging"
  }
  width={1376}
  height={768}
  className="bg-[#F2F2F2]"
  imageClassName="object-cover object-center]" 
  caption={
    lang === "es"
      ? "La experiencia se degradaba progresivamente. Lo que comenzaba fluido terminaba generando resistencia activa al registro."
      : "The experience progressively degraded: what started smooth ended up creating active resistance to logging."
  }
  border={false}
  full={true}
/>
</FadeOnScroll>

          {/* ==================== 7. RESEARCH ==================== */}
            <FadeOnScroll>
            <section className="w-full px-8 md:px-12 lg:px-20 mb-20">
            <div className="max-w-4xl mb-6">
              <h2 className="text-3xl md:text-4xl font-bold text-light mb-6">{t.research.title}</h2>
              <p className="text-light mb-6 text-lg">{t.research.subtitle}</p>
            </div>
            <h3 className="text-2xl font-bold text-light mb-6">{t.research.methodsTitle}</h3>
            <div className="mb-8">
              <BentoGrid cols={{ default: 1, md: 3 }} gap="md">
                <BentoItem colSpan={1}>
                  <div className="bg-container/80 rounded-lg p-6 border border-container-light/10 h-full">
                    <h4 className="font-semibold text-light mb-3">{t.research.deskResearch.title}</h4>
                    <p className="mb-2 text-light text-sm leading-relaxed">{t.research.deskResearch.text}</p>
                    <p className="text-xs mb-2 text-light">{t.research.deskResearch.theory}</p>
                    <p className="text-xs text-light">{t.research.deskResearch.benchmark}</p>
                  </div>
                </BentoItem>
                <BentoItem colSpan={1}>
                  <div className="bg-container/80 rounded-lg p-6 border border-container-light/10 h-full">
                    <h4 className="font-semibold text-light mb-3">{t.research.interviews.title}</h4>
                    <p className="mb-2 text-light text-sm leading-relaxed">{t.research.interviews.profiles}</p>
                    <p className="text-light text-sm leading-relaxed">{t.research.interviews.objective}</p>
                  </div>
                </BentoItem>
                <BentoItem colSpan={1}>
                  <div className="bg-container/80 rounded-lg p-6 border border-container-light/10 h-full">
                    <h4 className="font-semibold text-light mb-3">{t.research.audit.title}</h4>
                    <p className="text-light text-sm leading-relaxed">{t.research.audit.text}</p>
                  </div>
                </BentoItem>
              </BentoGrid>
            </div>
          </section>
            </FadeOnScroll>

          {/* ==================== 8. CITAS E INSIGHT ==================== */}
            <FadeOnScroll delay={80}>
            <section className="w-full px-8 md:px-12 lg:px-20 mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-light mb-8">{t.research.quotesTitle}</h2>
            <BentoGrid cols={{ default: 1, md: 2, lg: 3 }} gap="md" className="mb-20">
              <BentoItem colSpan={1}>
                <div className="bg-container-light/10 backdrop-blur-sm rounded-lg p-6 border border-container-light/20 h-full">
                  <p className="text-light italic mb-2 text-sm leading-relaxed">{t.research.quotes.perception.label}</p>
                  <p className="text-light">{t.research.quotes.perception.text}</p>
                </div>
              </BentoItem>
              <BentoItem colSpan={1}>
                <div className="bg-container-light/10 backdrop-blur-sm rounded-lg p-6 border border-container-light/20 h-full">
                  <p className="text-light italic mb-2 text-sm leading-relaxed">{t.research.quotes.postponement.label}</p>
                  <p className="text-light mb-2">{t.research.quotes.postponement.text1}</p>
                  <p className="text-light">{t.research.quotes.postponement.text2}</p>
                </div>
              </BentoItem>
              <BentoItem colSpan={1}>
                <div className="bg-container-light/10 backdrop-blur-sm rounded-lg p-6 border border-container-light/20 h-full">
                  <p className="text-light italic mb-2 text-sm leading-relaxed">{t.research.quotes.friction.label}</p>
                  <p className="text-light">{t.research.quotes.friction.text}</p>
                </div>
              </BentoItem>
            </BentoGrid>

            {/* Insight Emergente */}
            <div className="bg-gradient-to-r from-[#081730]/30 via-[#3282A9]/30 to-[#081730]/30 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-[#08A4E1]/30">
              <h3 className="text-2xl md:text-3xl font-bold text-light mb-4">{t.insight.title}</h3>
              <p className="text-xl md:text-2xl text-light mb-6">{t.insight.mainText}</p>
              <p className="text-light leading-relaxed mb-6 text-lg">{t.insight.explanation}</p>
              <div className="mt-8 pt-6 border-t border-container-light/20">
                <p className="text-light font-semibold mb-2">{t.insight.pivotTitle}</p>
                <p className="text-light mb-2">{t.insight.pivotFrom}</p>
                <p className="text-light text-lg">{t.insight.pivotTo}</p>
              </div>
            </div>
          </section>
            </FadeOnScroll>

{/* ==================== DIVIDER ==================== */}
<div className="w-full px-8 md:px-12 lg:px-20 mb-20">
  <div className="h-px w-full bg-gradient-to-r from-transparent via-[#08A4E1]/40 to-transparent" />
</div>

          {/* ==================== 9. ESTRATEGIA ==================== */}
            <FadeOnScroll delay={150}>
            <section className="w-full px-8 md:px-12 lg:px-20 mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-light mb-6">{t.strategy.title}</h2>
            <div className="text-light leading-relaxed space-y-4 max-w-4xl">
              <p className="text-lg">{t.strategy.text}</p>
            </div>
          </section>
            </FadeOnScroll>

          {/* ==================== 10. ALTERNATIVA Y ALCANCE - GridContainer 2 cols ==================== */}
            <FadeOnScroll>
            <section className="w-full px-8 md:px-12 lg:px-20 mb-20">
            <GridContainer cols={{ default: 1, md: 2 }} gap="lg" className="!px-0 [&>*]:h-full">
              <Block colSpan={1}>
                <div className="bg-container/80 rounded-lg p-6 border border-container-light/10 h-full">
                  <h4 className="text-lg font-semibold text-light mb-4">{t.strategy.alternativeTitle}</h4>
                  <p className="mb-4 text-light">{t.strategy.alternativeText}</p>
                  <p className="text-light font-semibold mb-2">{t.strategy.discardedTitle}</p>
                  <ul className="list-disc pl-5 space-y-2 mb-4">
                    {(t.strategy.discardedReasons || []).map((reason: string, index: number) => (
                      <li key={index} className="text-light">{reason}</li>
                    ))}
                  </ul>
                  <p className="text-light mt-6">{t.strategy.conclusion}</p>
                </div>
              </Block>
              <Block colSpan={1}>
                <div className="bg-container/80 rounded-lg p-6 border border-container-light/10 h-full">
                  <h4 className="text-lg font-semibold text-light mb-4">{t.strategy.scopeTitle}</h4>
                  <p className="mb-4 text-light">{t.strategy.scopeText1}</p>
                  <h4 className="text-lg font-semibold text-light mb-2">{t.strategy.ourDecision}</h4>
                  <p className="mb-4 text-light">{t.strategy.ourDecisionText}</p>
                  <h4 className="text-lg font-semibold text-light mt-4 mb-2">{t.strategy.thisAllowed}</h4>
                  <ul className="list-disc pl-5 space-y-2 mb-4">
                    {(t.strategy.thisAllowedItems || []).map((item: string, index: number) => (
                      <li key={index} className="text-light">{item}</li>
                    ))}
                  </ul>
                  <p className="text-light font-semibold mt-4 mb-2">{t.strategy.whyNotJustScope}</p>
                  <p className="text-light">{t.strategy.whyNotJustScopeText}</p>
                </div>
              </Block>
            </GridContainer>
          </section>
            </FadeOnScroll>

          {/* ==================== PRINCIPIOS DE DISEÑO ==================== */}
            <FadeOnScroll>
            <section className="w-full px-8 md:px-12 lg:px-20 mb-20 hidden md:block">
            <h2 className="text-3xl md:text-4xl font-bold text-light mb-6">{t.principles.title}</h2>
            <BentoGrid cols={{ default: 1, md: 2, lg: 3 }} gap="md" className="mb-6 [&>*]:h-full">
              {Object.values(t.principles.items || {}).map((item: any, index: number) => (
                <BentoItem key={index} colSpan={1}>
                  <FeatureCard
                    title={item.title}
                    description={item.text}
                    variant="dark"
                    className="h-full"
                  />
                </BentoItem>
              ))}
              <BentoItem colSpan={1}>
                <FeatureCard
                  title={t.principles.guidingPrinciple}
                  variant="dark"
                  className="h-full"
                />
              </BentoItem>
            </BentoGrid>
          </section>
            </FadeOnScroll>

          {/* ==================== 11. LOS 5 INSIGHTS EN BENTOGRID ==================== */}
            <FadeOnScroll delay={80}>
            <section className="w-full px-8 md:px-12 lg:px-20 mb-20">
            <div className="max-w-4xl mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-light mb-6">{t.frictions.title}</h2>
              <p className="text-light mb-8 text-lg">{t.frictions.subtitle}</p>
            </div>
            <BentoGrid cols={{ default: 1, md: 2, lg: 3 }} gap="md">
              <BentoItem colSpan={{ default: 1, md: 2 }}>
                <div className="bg-container/80 rounded-lg p-6 border border-container-light/10 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl font-bold text-light">{t.frictions.friction1.number}</span>
                    <h3 className="text-xl font-bold text-light">{t.frictions.friction1.title}</h3>
                  </div>
                  <div className="space-y-2 text-light text-sm leading-relaxed">
                    <div className="hidden md:block">
                      <h4 className="font-semibold text-light mb-1">
                        {lang === "es" ? "Dolor:" : "Pain:"}
                      </h4>
                      <p className="text-sm leading-relaxed">{t.frictions.friction1.pain}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-light mb-1">
                        {lang === "es" ? "Solución:" : "Solution:"}
                      </h4>
                      <p className="text-light text-sm leading-relaxed">{t.frictions.friction1.decision}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-light mb-1">
                        {lang === "es" ? "Por qué funciona:" : "Why it works:"}
                      </h4>
                      <p className="text-sm leading-relaxed">{t.frictions.friction1.whyWorks}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-light mb-1">
                        {lang === "es" ? "Traducido a diseño:" : "Translated to design:"}
                      </h4>
                      <p className="text-light text-sm leading-relaxed">{t.frictions.friction1.translatedTo}</p>
                    </div>
                  </div>
                </div>
              </BentoItem>
              <BentoItem colSpan={1}>
                <div className="bg-container/80 rounded-lg p-6 border border-container-light/10 md:h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl font-bold text-light">{t.frictions.friction2.number}</span>
                    <h3 className="text-xl font-bold text-light">{t.frictions.friction2.title}</h3>
                  </div>
                  <div className="space-y-2 text-light text-sm leading-relaxed">
                    <div className="hidden md:block">
                      <h4 className="font-semibold text-light mb-1">
                        {lang === "es" ? "Dolor:" : "Pain:"}
                      </h4>
                      <p className="text-sm leading-relaxed">{t.frictions.friction2.pain}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-light mb-1">
                        {lang === "es" ? "Solución:" : "Solution:"}
                      </h4>
                      <p className="text-light text-sm leading-relaxed">{t.frictions.friction2.decision}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-light mb-1">
                        {lang === "es" ? "Por qué funciona:" : "Why it works:"}
                      </h4>
                      <p className="text-light text-sm leading-relaxed">{t.frictions.friction2.whyWorks}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-light mb-1">
                        {lang === "es" ? "Traducido a diseño:" : "Translated to design:"}
                      </h4>
                      <p className="text-light text-sm leading-relaxed">{t.frictions.friction2.translatedTo}</p>
                    </div>
                  </div>
                </div>
              </BentoItem>
              <BentoItem colSpan={1}>
                <div className="bg-container/80 rounded-lg p-6 border border-container-light/10 md:h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl font-bold text-light">{t.frictions.friction3.number}</span>
                    <h3 className="text-xl font-bold text-light">{t.frictions.friction3.title}</h3>
                  </div>
                  <div className="space-y-2 text-light text-sm leading-relaxed">
                    <div className="hidden md:block">
                      <h4 className="font-semibold text-light mb-1">
                        {lang === "es" ? "Dolor:" : "Pain:"}
                      </h4>
                      <p className="text-sm leading-relaxed">{t.frictions.friction3.pain}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-light mb-1">
                        {lang === "es" ? "Solución:" : "Solution:"}
                      </h4>
                      <p className="text-light text-sm leading-relaxed">{t.frictions.friction3.decision}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-light mb-1">
                        {lang === "es" ? "Por qué funciona:" : "Why it works:"}
                      </h4>
                      <p className="text-light text-sm leading-relaxed">{t.frictions.friction3.whyWorks}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-light mb-1">
                        {lang === "es" ? "Traducido a diseño:" : "Translated to design:"}
                      </h4>
                      <p className="text-light text-sm leading-relaxed">{t.frictions.friction3.translatedTo}</p>
                    </div>
                  </div>
                </div>
              </BentoItem>
              <BentoItem colSpan={1}>
                <div className="bg-container/80 rounded-lg p-6 border border-container-light/10 md:h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl font-bold text-light">{t.frictions.friction4.number}</span>
                    <h3 className="text-xl font-bold text-light">{t.frictions.friction4.title}</h3>
                  </div>
                  <div className="space-y-2 text-light text-sm leading-relaxed">
                    <div className="hidden md:block">
                      <h4 className="font-semibold text-light mb-1">
                        {lang === "es" ? "Dolor:" : "Pain:"}
                      </h4>
                      <p className="text-sm leading-relaxed">{t.frictions.friction4.pain}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-light mb-1">
                        {lang === "es" ? "Solución:" : "Solution:"}
                      </h4>
                      <p className="text-light text-sm leading-relaxed">{t.frictions.friction4.decision}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-light mb-1">
                        {lang === "es" ? "Por qué funciona:" : "Why it works:"}
                      </h4>
                      <p className="text-light text-sm leading-relaxed">{t.frictions.friction4.whyWorks}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-light mb-1">
                        {lang === "es" ? "Traducido a diseño:" : "Translated to design:"}
                      </h4>
                      <p className="text-light text-sm leading-relaxed">{t.frictions.friction4.translatedTo}</p>
                    </div>
                  </div>
                </div>
              </BentoItem>
              <BentoItem colSpan={1}>
                <div className="bg-container/80 rounded-lg p-6 border border-container-light/10 md:h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl font-bold text-light">{t.frictions.friction5.number}</span>
                    <h3 className="text-xl font-bold text-light">{t.frictions.friction5.title}</h3>
                  </div>
                  <div className="space-y-2 text-light text-sm leading-relaxed">
                    <div className="hidden md:block">
                      <h4 className="font-semibold text-light mb-1">
                        {lang === "es" ? "Dolor:" : "Pain:"}
                      </h4>
                      <p className="text-sm leading-relaxed">{t.frictions.friction5.pain}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-light mb-1">
                        {lang === "es" ? "Solución:" : "Solution:"}
                      </h4>
                      <p className="text-light text-sm leading-relaxed">{t.frictions.friction5.decision}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-light mb-1">
                        {lang === "es" ? "Por qué funciona:" : "Why it works:"}
                      </h4>
                      <p className="text-light text-sm leading-relaxed">{t.frictions.friction5.whyWorks}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-light mb-1">
                        {lang === "es" ? "Traducido a diseño:" : "Translated to design:"}
                      </h4>
                      <p className="text-light text-sm leading-relaxed">{t.frictions.friction5.translatedTo}</p>
                    </div>
                  </div>
                </div>
              </BentoItem>
            </BentoGrid>
          </section>
            </FadeOnScroll>

{/* ==================== DIVIDER ==================== */}
<div className="w-full px-8 md:px-12 lg:px-20 mb-20">
  <div className="h-px w-full bg-gradient-to-r from-transparent via-[#08A4E1]/40 to-transparent" />
</div>

          {/* ==================== 12. Vista general de proyectos en el MVP original de Dígito, antes del rediseño (Full width 16:9) ==================== */}
            <FadeOnScroll>
            <ImageBreakout
            src="/images/digitoImages/modulo-registro-horas-mvp-original.webp"
            alt="Módulo de registro de horas en el MVP original de Dígito, antes del rediseño"
            width={1920}
            height={1080}
            border={false}
            full={true}
            className="bg-[#F2F2F2]"
            imageClassName="object-cover object-top"
            caption={t.mvpOriginalImageCaption}
          />
            </FadeOnScroll>

          {/* ==================== Design tokens (antes de Panel Unificado) ==================== */}
            <FadeOnScroll>
            <ImageBreakout
              src="/images/digitoImages/design-tokens-digito.webp"
              alt={lang === "es" ? "Tokens de diseño del proyecto Dígito: color, tipografía, espaciado y radios." : "Dígito project design tokens: color, typography, spacing, and border radii."}
              width={1920}
              height={1080}
              border={false}
              full={true}
              className="bg-[#E4E4E4] "
              imageClassName="object-contain"
              caption={t.designTokensImageCaption}
            />
            </FadeOnScroll>

            {/* ==================== DIVIDER ==================== */}
<div className="w-full px-8 md:px-12 lg:px-20 mb-20">
  <div className="h-px w-full bg-gradient-to-r from-transparent via-[#08A4E1]/40 to-transparent" />
</div>

          {/* ==================== 13. PANEL UNIFICADO - Snapshot de dashboard ==================== */}
            <FadeOnScroll>
            <section className="w-full px-8 md:px-12 lg:px-20 mb-8">
            <div className="bg-gradient-to-br from-[#081730]/30 to-[#3282A9]/30 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-[#08A4E1]/30">
              <h2 className="text-3xl md:text-4xl font-bold text-light mb-4">
                {t.architecture.unifiedPanel.title}
              </h2>
              <p className="text-light mb-6 text-lg">
                {t.architecture.unifiedPanel.axis}
              </p>

              <div className="space-y-4 text-light mb-6">
                <div>
                  <h4 className="font-semibold text-light mb-2">
                    {lang === "es" ? "Problema detectado:" : "Problem identified:"}
                  </h4>
                  <p>{t.architecture.unifiedPanel.problem}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-light mb-2">
                    {lang === "es" ? "Solución:" : "Solution:"}
                  </h4>
                  <p>{t.architecture.unifiedPanel.solution}</p>
                </div>
              </div>

              <div className="space-y-4 text-light">
                <h4 className="font-semibold text-light mb-2">
                  {lang === "es" ? "Componentes:" : "Components:"}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(t.architecture.unifiedPanel.components || []).map((item: string, index: number) => (
                    <div
                      key={index}
                      className="bg-container-light/10 backdrop-blur-sm rounded-lg p-4 border border-container-light/20"
                    >
                      <p className="text-light text-sm leading-relaxed">
                        • {item}
                      </p>
                    </div>
                  ))}
                </div>
                <div>
                  <h4 className="font-semibold text-light mb-2">
                    {t.architecture.unifiedPanel.syncTitle}:
                  </h4>
                  <p className="text-light text-sm leading-relaxed">
                    {t.architecture.unifiedPanel.syncText}
                  </p>
                </div>
              </div>
            </div>
            </section>
            </FadeOnScroll>

           {/* ==================== 18. DASHBOARD DIGITO EN USO REAL (Full width 16:9) ==================== */}
           <FadeOnScroll>
            <ImageBreakout
            src="/images/digitoImages/dashboard-digito-en-uso-real.webp"
            alt="Dashboard principal de Dígito en uso real: consultor revisando estado de proyectos y horas registradas"
            width={1920}
            height={1080}
            border={false}
            full={true}
            className="bg-[#F2F2F2]"
            imageClassName="image-swing-dashboard"
          />
            </FadeOnScroll>
            
          {/* ==================== 14. ANIMACIÓN FAB CON SUGERENCIAS CONTEXTUALES (Full width 16:9) ==================== */}
            <FadeOnScroll delay={80}>
            <section className="w-full px-8 md:px-12 lg:px-20 mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-light mb-2">{t.architecture.automation.title}</h2>
            <p className="text-lg text-light mb-6">{t.architecture.automation.axis}</p>
            <GridContainer cols={{ default: 1, md: 2 }} gap="lg" className="!px-0 [&>*]:h-full">
              <Block colSpan={1}>
                <div className="relative w-full h-full rounded-lg overflow-hidden bg-white flex items-center">
                  <Image
                    src="/images/digitoImages/animacion-fab-con-sugerencias-contextuales.webp"
                    alt="Animación del botón FAB desplegando sugerencias contextuales para registro rápido de horas"
                    width={1200}
                    height={800}
                    className="w-full h-auto object-contain"
                  />
                </div>
              </Block>
              <Block colSpan={1}>
                <div className="bg-container/80 rounded-lg p-6 border border-container-light/10 h-full">
                  <div className="space-y-4 text-light">
                    <div>
                      <h4 className="font-semibold text-light mb-2">
                        {lang === "es" ? "Problema detectado:" : "Problem identified:"}
                      </h4>
                      <p>{t.architecture.automation.problem}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-light mb-2">
                        {lang === "es" ? "Solución:" : "Solution:"}
                      </h4>
                      <p>{t.architecture.automation.solution}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-light mb-2">
                        {lang === "es" ? "Funcionalidades principales:" : "Key features:"}
                      </h4>
                      <ul className="list-disc pl-5 space-y-2">
                        {(t.architecture.automation.features || []).map((feature: string, index: number) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Block>
            </GridContainer>
          </section>
            </FadeOnScroll>

          {/* ==================== 15. CAPA SOCIAL - Texto izquierda, mockup derecha ==================== */}
            <FadeOnScroll delay={150}>
            <section className="w-full px-8 md:px-12 lg:px-20 mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-light mb-2">{t.architecture.social.title}</h2>
            <p className="text-lg text-light mb-6">{t.architecture.social.axis}</p>
            <GridContainer cols={{ default: 1, md: 2 }} gap="lg" className="!px-0 [&>*]:h-full">
              <Block colSpan={1}>
                <div className="bg-container/80 rounded-lg p-6 border border-container-light/10 h-full">
                  <div className="space-y-4 text-light">
                    <div>
                      <h4 className="font-semibold text-light mb-2">
                        {lang === "es" ? "Problema detectado:" : "Problem identified:"}
                      </h4>
                      <p>{t.architecture.social.problem}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-light mb-2">
                        {lang === "es" ? "Solución:" : "Solution:"}
                      </h4>
                      <p className="mb-2">{t.architecture.social.solution}</p>
                      <ul className="list-disc pl-5 space-y-2">
                        {(t.architecture.social.solutionItems || []).map((item: string, index: number) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-container-light/10 backdrop-blur-sm rounded-lg p-4 border border-container-light/20">
                      <h4 className="font-semibold text-light mb-2">
                        {lang === "es" ? "Resultado:" : "Result:"}
                      </h4>
                      <p className="text-light text-sm leading-relaxed">{t.architecture.social.result}</p>
                    </div>
                  </div>
                </div>
              </Block>
              <Block colSpan={1}>
                <div className="relative w-full h-full rounded-lg overflow-hidden bg-white flex items-center">
                  <Image
                    src="/images/digitoImages//animacion-proyectos-gantt-kanban.webp"
                    alt="Animación del panel de proyectos alternando entre vista Gantt y vista Kanban"
                    width={1200}
                    height={800}
                    className="w-full h-auto object-contain"
                  />
                </div>
              </Block>
            </GridContainer>
          </section>
            </FadeOnScroll>

 {/* ==================== 20. EVOLUCIÓN DEL DISEÑO - MVP → Wireframe → HiFi ==================== */}
 <FadeOnScroll delay={80}>
            <section className="w-full px-8 md:px-12 lg:px-20 mb-20">
            <div className="space-y-8">
              <div className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden bg-white">
                <Image
                  src="/images/digitoImages/comparativa-mvp-wireframe-hifi.webp"
                  alt="Evolución del diseño: MVP original, wireframe de baja fidelidad y prototipo de alta fidelidad"
                  fill
                  className="object-contain bg-[#0D0D0D]"
                  
                />
              </div>
            </div>
          </section>
            </FadeOnScroll>

            {/* ==================== DIVIDER ==================== */}
<div className="w-full px-8 md:px-12 lg:px-20 mb-20">
  <div className="h-px w-full bg-gradient-to-r from-transparent via-[#08A4E1]/40 to-transparent" />
</div>

          {/* ==================== 19. TESTING ==================== */}
            <FadeOnScroll>
            <section className="w-full px-8 md:px-12 lg:px-20 mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-light mb-6">{t.testing.title}</h2>
            <GridContainer cols={{ default: 1, md: 2 }} gap="lg" className="!px-0 [&>*]:h-full mb-8">
              <Block colSpan={1}>
                <div className="bg-container/80 rounded-lg p-6 border border-container-light/10 h-full">
                  <p className="text-light mb-6 text-lg">{t.testing.subtitle}</p>
                  <div className="bg-container/60 rounded-lg p-4 space-y-4 text-light">
                    <div>
                      <h4 className="font-semibold text-light mb-2">
                        {lang === "es" ? "Participantes:" : "Participants:"}
                      </h4>
                      <p>{t.testing.participants}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-light mb-2">
                        {lang === "es" ? "Método:" : "Method:"}
                      </h4>
                      <p>{t.testing.method}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-light mb-2">
                        {lang === "es" ? "Objetivo:" : "Objective:"}
                      </h4>
                      <p>{t.testing.objective}</p>
                    </div>
                  </div>
                </div>
              </Block>
              <Block colSpan={1}>
                <div className="bg-container/80 rounded-lg p-6 border border-container-light/10 h-full">
                  <h3 className="text-2xl font-bold text-light mb-4">{t.testing.frictionsTitle}</h3>
                  <div className="space-y-4">
                    <div className="bg-red-500/10 backdrop-blur-sm rounded-lg p-4 border border-red-400/30">
                      <h4 className="font-semibold text-light mb-2">{t.testing.friction1.title}</h4>
                      <p className="text-light text-sm leading-relaxed">{t.testing.friction1.text}</p>
                    </div>
                    <div className="bg-red-500/10 backdrop-blur-sm rounded-lg p-4 border border-red-400/30">
                      <h4 className="font-semibold text-light mb-2">{t.testing.friction2.title}</h4>
                      <p className="text-light text-sm leading-relaxed">{t.testing.friction2.text}</p>
                    </div>
                  </div>
                </div>
              </Block>
            </GridContainer>
            <h3 className="text-2xl font-bold text-light mb-4">{t.testing.iterationsTitle}</h3>
            <GridContainer cols={{ default: 1, md: 2 }} gap="lg" className="!px-0">
              <Block colSpan={1}>
                <div className="bg-container/80 rounded-lg p-6 border border-container-light/10">
                  <h4 className="font-semibold text-light mb-3">{t.testing.iteration1.title}</h4>
                  <div className="space-y-2">
                    <p className="text-light text-sm leading-relaxed font-semibold">
                      {lang === "es" ? "Ajustes:" : "Adjustments:"}
                    </p>
                    <ul className="list-disc pl-5 text-light text-sm leading-relaxed space-y-1">
                      {(t.testing.iteration1.adjustments || []).map((item: string, index: number) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                    <p className="text-light text-sm leading-relaxed font-semibold mt-2">
                      {lang === "es" ? "Resultado:" : "Result:"}
                    </p>
                    <p className="text-light text-sm leading-relaxed">{t.testing.iteration1.result}</p>
                  </div>
                </div>
              </Block>
              <Block colSpan={1}>
                <div className="bg-container/80 rounded-lg p-6 border border-container-light/10">
                  <h4 className="font-semibold text-light mb-3">{t.testing.iteration2.title}</h4>
                  <div className="space-y-2">
                    <p className="text-light text-sm leading-relaxed font-semibold">
                      {lang === "es" ? "Ajustes:" : "Adjustments:"}
                    </p>
                    <ul className="list-disc pl-5 text-light text-sm leading-relaxed space-y-1">
                      {(t.testing.iteration2.adjustments || []).map((item: string, index: number) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                    <p className="text-light text-sm leading-relaxed font-semibold mt-2">
                      {lang === "es" ? "Aprendizaje:" : "Learning:"}
                    </p>
                    <p className="text-light text-sm leading-relaxed">{t.testing.iteration2.learning}</p>
                  </div>
                </div>
              </Block>
            </GridContainer>
          </section>
            </FadeOnScroll>

            {/* ==================== DIVIDER ==================== */}
<div className="w-full px-8 md:px-12 lg:px-20 mb-20">
  <div className="h-px w-full bg-gradient-to-r from-transparent via-[#08A4E1]/40 to-transparent" />
</div>

          {/* ==================== FIGMA PROTOTYPE EMBED ==================== */}
          <section className="w-full px-0 md:px-8 lg:px-20 mb-20">
            <div className="w-full flex justify-center">
              <div className="w-full rounded-lg overflow-hidden">
                <iframe
                  title={lang === "es" ? "Prototipo interactivo de Dígito" : "Dígito interactive prototype"}
                  style={{
                    border: "1px solid rgba(0, 0, 0, 0.1)",
                    width: "100%",
                    aspectRatio: "800 / 450",
                    maxHeight: "100vh",
                  }}
                  src="https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/proto/CAzpfuJZBHMEaGPytW4kV0/Prototipo-Interactivo---D%C3%ADgito---Lautaro-R.-Temperini?node-id=3063-8285&p=f&t=7YcIkQI6Z52Y1B7L-1&scaling=contain&content-scaling=fixed&page-id=623%3A3290&starting-point-node-id=3063%3A8285"
                  allowFullScreen
                />
              </div>
            </div>
            <div className="mt-3 w-full flex justify-start px-4 md:px-0">
              <a
                href="https://www.figma.com/proto/CAzpfuJZBHMEaGPytW4kV0/Prototipo-Interactivo---D%C3%ADgito---Lautaro-R.-Temperini?node-id=3063-8285&p=f&t=ds4pNYUOG0UNPYhS-1&scaling=scale-down&content-scaling=fixed&page-id=623%3A3290&starting-point-node-id=3063%3A8285"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-light/80 hover:text-light underline underline-offset-4"
              >
                <span>{lang === "es" ? "Ver prototipo en Figma" : "View prototype in Figma"}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.75 6.75h7.5m0 0v7.5m0-7.5L9 15.75M5.25 5.25v13.5h13.5"
                  />
                </svg>
              </a>
            </div>
          </section>

         {/* ==================== 24. IMPACTO CUALITATIVO ==================== */}
<FadeOnScroll delay={150}>
  <section className="w-full px-8 md:px-12 lg:px-20 mb-20">

    <h2 className="text-2xl md:text-3xl font-bold text-light mb-6 text-left">
      {t.snapshot?.impactTitle}
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">

      {/* ANTES */}
      <div className="bg-container-light/10 backdrop-blur-sm rounded-lg p-6 border border-container-light/20 text-left">
        <p className="text-light font-semibold mb-3">
          {t.snapshot?.impactBeforeLabel}
        </p>

        <p className="text-light italic text-lg leading-relaxed">
          {t.snapshot?.impactBeforeQuote}
        </p>
      </div>

      {/* DESPUÉS */}
      <div className="bg-container-light/10 backdrop-blur-sm rounded-lg p-6 border border-container-light/20 text-left">
        <p className="text-light font-semibold mb-3">
          {t.snapshot?.impactAfterLabel}
        </p>

        <p className="text-light italic text-lg leading-relaxed">
          {t.snapshot?.impactAfterQuote}
        </p>
      </div>

    </div>

    <p className="mt-6 text-left text-sm text-light/70 max-w-3xl">
      <span className="font-semibold text-light/80">
        {t.snapshot?.impactLabel}
      </span>{' '}
      {t.snapshot?.impactText}
    </p>

  </section>
</FadeOnScroll>

{/* ==================== DIVIDER ==================== */}
<div className="w-full px-8 md:px-12 lg:px-20 mb-20">
  <div className="h-px w-full bg-gradient-to-r from-transparent via-[#08A4E1]/40 to-transparent" />
</div>

          {/* ==================== 25. CIERRE ==================== */}
<FadeOnScroll delay={150}>
  <section className="w-full px-8 md:px-12 lg:px-20 mb-20">
    <div className="max-w-3xl mx-auto mb-10 text-light">
      <h2 className="text-3xl md:text-4xl font-bold text-light mb-4 text-center">
        {t.snapshot?.reflectionTitle}
      </h2>
      <p className="text-lg leading-relaxed text-center">
        {t.snapshot?.reflectionIntro}
      </p>
    </div>
    <GridContainer cols={{ default: 1, md: 2 }} gap="lg" className="!px-0">
      <Block colSpan={1}>
        <div className="bg-gradient-to-br from-[#081730]/30 to-[#3282A9]/30 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-[#08A4E1]/30 h-full text-light">
          <h3 className="text-2xl font-semibold mb-3">
            {t.snapshot?.testingTitle}
          </h3>
          <p className="text-lg leading-relaxed mb-2">
            {t.snapshot?.testingP1}
          </p>
          <p className="text-lg leading-relaxed mb-2">
            {t.snapshot?.testingP2}
          </p>
          <p className="text-lg leading-relaxed">
            {t.snapshot?.testingP3}
          </p>
        </div>
      </Block>
      <Block colSpan={1}>
        <div className="bg-gradient-to-br from-[#081730]/30 to-[#3282A9]/30 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-[#08A4E1]/30 h-full text-light">
          <h3 className="text-2xl font-semibold mb-3">
            {t.snapshot?.metricTitle}
          </h3>
          <p className="text-lg leading-relaxed mb-2">
            {t.snapshot?.metricP1}
          </p>
          <p className="text-lg leading-relaxed">
            {t.snapshot?.metricP2Prefix}<br /><strong>{t.snapshot?.metricP2Bold}</strong>
          </p>
        </div>
      </Block>
    </GridContainer>
  </section>
</FadeOnScroll>
        </main>
      </div>
      <div className="relative z-[20]">
        <Footer dict={dict} lang={lang} />
      </div>
      <ScrollToTop size={48} />
    </>
  )
}
