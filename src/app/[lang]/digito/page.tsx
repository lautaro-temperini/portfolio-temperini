import { getDictionary } from "@/lib/getDictionary"
import Navbar from "@/components/navbar/Navbar"
import ScrollToTop from "@/components/fxscripts/scroll-to-top"
import ScrollToSection from "@/components/fxscripts/scroll-to-section"
import Footer from "@/components/footer/Footer"
import ImageBreakout from "@/components/sections/ImageBreakout"
import { GridContainer } from "@/components/sections/GridContainer"
import { Block } from "@/components/sections/Block"
import { BentoGrid, BentoItem } from "@/components/sections/BentoGrid"
import { FeatureCard } from "@/components/sections/FeatureCard"
import FadeOnScroll from "@/components/fxscripts/FadeOnScroll"
import Image from "next/image"
import SectionNav from "@/components/case-study/SectionNav"

export const metadata = {
  title: "Dígito | Módulo Operativo | Lautaro R. Temperini",
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
          <SectionNav sections={[
            { id: "contexto" },
            { id: "problema" },
            { id: "research" },
            { id: "fricciones" },
            { id: "arquitectura" },
            { id: "tradeoffs", label: "Trade offs" },
            { id: "testing" },
            { id: "prototipo", label: lang === "es" ? "Prototipo" : "Prototype" },
            { id: "cierre", label: lang === "es" ? "Conclusión" : "Conclusion" },
          ]} />
            {/* ==================== 1. HERO SECTION ==================== */}
            <FadeOnScroll>
              <section className="w-full px-8 md:px-12 lg:px-20 pt-28 md:pt-32 lg:pt-36 mb-12">
                <div className="w-full max-w-7xl">
                  <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold leading-tight text-light mb-4">
                    {t.hero?.title || "DÍGITO"}
                  </h1>
                  <p className="text-xl md:text-2xl font-semibold text-light mb-3">{t.hero?.subtitle}</p>
                  <p className="text-base md:text-lg text-light leading-relaxed mb-6">{t.hero?.description}</p>
                  <div className="mt-6">
                    <ScrollToSection
                      href="#prototipo"
                      offset={60}
                      duration={400}
                      className="inline-flex items-center gap-1 text-sm  text-light/80 hover:text-light underline underline-offset-4 transition-colors"
                    >
                      {lang === "es" ? "• Ir al prototipo ↓" : "Go to prototype ↓"}
                    </ScrollToSection>
                  </div>
                </div>
              </section>
            </FadeOnScroll>

            {/* ==================== BANNER HERO ==================== */}
            <FadeOnScroll delay={80}>
            <section className="w-full px-8 md:px-12 lg:px-20 mb-16">
  <div className="relative w-full h-[150px] md:h-[200px] rounded-lg overflow-hidden bg-[#0A1628]">
    <Image
      src="/images/digitoImages/DigitoRender3d.webp"
      alt="Render3D de Logo de Dígito"
      width={1198}
      height={206}
      className="w-full h-full object-cover"
      sizes="(max-width: 768px) 100vw, 1200px"
    />
  </div>
</section>
            </FadeOnScroll>

          {/* ==================== PROJECT SNAPSHOT ==================== */}
          <section className="w-full px-8 md:px-12 lg:px-20 mb-16">
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
            <section id="contexto" className="w-full px-8 md:px-12 lg:px-20 mb-20">
              <GridContainer cols={{ default: 1, md: 2 }} gap="lg" className="!px-0 [&>*]:h-full">
                <Block colSpan={1}>
                  <h2 className="text-3xl md:text-4xl font-bold text-light mb-6">
                    {lang === "es" ? "Contexto" : "Context"}
                  </h2>
                  <div className="text-light leading-relaxed space-y-4 max-w-4xl">
                    <p className="text-lg">
                      {lang === "es"
                        ? "Dígito es una empresa de Business Intelligence y RPA. Su plataforma SaaS B2B incluía facturación, reportes y administración, pero el módulo operativo para consultores tenía baja adopción."
                        : "Dígito is a Business Intelligence and RPA company. Its B2B SaaS platform included billing, reporting, and administration, but the operational module for consultants had low adoption."}
                    </p>
                    <p className="text-lg">
                      {lang === "es"
                        ? "Esto generaba fricción en el día a día del consultor y baja calidad en los datos operativos."
                        : "This created daily friction for consultants and reduced the quality of operational data."}
                    </p>
                    <p className="text-lg">
                      {lang === "es"
                        ? "El objetivo fue claro: convertir el registro de horas en parte natural del flujo de trabajo, no en una tarea adicional."
                        : "The goal was clear: make time logging a natural part of the work flow, not an additional task."}
                    </p>
                  </div>
                </Block>

                <Block colSpan={1}>
                  <div className="text-light leading-relaxed space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-light mb-6">
                      {lang === "es" ? "Scope: módulo operativo del consultor" : "Scope: consultant operational module"}
                    </h2>
                    <p className="text-lg">
                      {lang === "es"
                        ? "El brief original incluía 8 áreas de mejora. Rediseñar toda la plataforma era inviable en 3.5 meses."
                        : "The original brief included 8 areas of improvement. Redesigning the entire platform was not feasible in 3.5 months."}
                    </p>

                    <p className="text-lg font-semibold">
                      {lang === "es" ? "Esto permitió:" : "This enabled:"}
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                      {[
                        lang === "es"
                          ? "Atacar directamente el problema detectado"
                          : "Address the detected problem directly",
                        lang === "es"
                          ? "Proponer una solución completa y validable"
                          : "Propose a complete, testable solution",
                        lang === "es"
                          ? "Sentar bases para futuras integraciones"
                          : "Lay the groundwork for future integrations",
                      ].map((item, index) => (
                        <li key={index} className="text-light">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Block>
              </GridContainer>
          </section>
            </FadeOnScroll>


{/* ==================== DIVIDER ==================== */}
<div className="w-full px-8 md:px-12 lg:px-20 mb-28">
  <div className="h-px w-full bg-gradient-to-r from-transparent via-[#08A4E1]/40 to-transparent" />
</div>

          {/* ==================== 5. HIPÓTESIS INICIAL ==================== */}
            <FadeOnScroll>
            <section id="problema" className="w-full px-8 md:px-12 lg:px-20 mb-20">
            <div className="max-w-4xl mb-6">
              <h2 className="text-3xl md:text-4xl font-bold text-light mb-6">{t.problem?.title}</h2>
            </div>
            <GridContainer cols={{ default: 1, md: 2 }} gap="lg" className="!px-0 [&>*]:h-full">
              <Block colSpan={1}>
                <div
                  className="bg-container/80 rounded-lg p-6 md:h-full"
                  style={{
                    boxShadow:
                      "0 0 0 1px rgba(255, 255, 255, 0.06), 0 4px 12px rgba(0, 0, 0, 0.5)",
                  }}
                >
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
                    <div
                      className="bg-container/80 rounded-lg p-6 md:h-full"
                      style={{
                        boxShadow:
                          "0 0 0 1px rgba(255, 255, 255, 0.06), 0 4px 12px rgba(0, 0, 0, 0.5)",
                      }}
                    >
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
  imageClassName="object-cover object-center" 
  caption={
    lang === "es"
      ? "La experiencia se degradaba progresivamente. Lo que comenzaba fluido terminaba generando resistencia activa al registro."
      : "The experience progressively degraded: what started smooth ended up creating active resistance to logging."
  }
  border={false}
/>
</FadeOnScroll>

          {/* ==================== 7. RESEARCH ==================== */}
            <FadeOnScroll>
            <section id="research" className="w-full px-8 md:px-12 lg:px-20 mb-20">
            {/* Mobile: título + subtítulo + stats ocupando 1 viewport, fondo negro fullwidth */}
            <div className="block md:hidden -mx-8">
            <div className="px-8 py-16 flex flex-col gap-12">
                <div className="max-w-4xl mb-8">
                  <h2 className="text-3xl font-bold text-light mb-4">{t.research.title}</h2>
                  <p className="text-light text-lg">{t.research.subtitle}</p>
                </div>
                <div className="space-y-8">
                  <div>
                    <p className="text-5xl font-bold text-light">
                      {t.research.stats.stat1.value}
                    </p>
                    <p className="text-base text-light/80 mt-1 max-w-xs">
                      {t.research.stats.stat1.description}
                    </p>
                  </div>
                  <div>
                    <p className="text-5xl font-bold text-light">
                      {t.research.stats.stat2.value}
                    </p>
                    <p className="text-base text-light/80 mt-1 max-w-xs">
                      {t.research.stats.stat2.description}
                    </p>
                    <p className="text-xs text-light/40 italic mt-6">
                      {t.research.stats.source}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop: título + subtítulo + BentoGrid con 2 stats */}
            <div className="hidden md:block">
              <div className="max-w-4xl mb-6">
                <h2 className="text-3xl md:text-4xl font-bold text-light mb-6">{t.research.title}</h2>
                <p className="text-light mb-6 text-lg">{t.research.subtitle}</p>
              </div>
              <div className="mb-8">
                <BentoGrid cols={{ default: 1, md: 2 }} gap="md">
                  <BentoItem colSpan={1}>
                    <div
                      className="bg-container/80 rounded-lg p-6 h-full"
                      style={{
                        boxShadow:
                          "0 0 0 1px rgba(255, 255, 255, 0.06), 0 4px 12px rgba(0, 0, 0, 0.5)",
                      }}
                    >
                      <p className="text-4xl font-bold text-light">
                        {t.research.stats.stat1.value}
                      </p>
                      <p className="text-sm text-light/80 mt-2">
                        {t.research.stats.stat1.description}
                      </p>
                      <p className="text-xs text-light/40 italic mt-4">
                        {t.research.stats.source}
                      </p>
                    </div>
                  </BentoItem>
                  <BentoItem colSpan={1}>
                    <div
                      className="bg-container/80 rounded-lg p-6 h-full"
                      style={{
                        boxShadow:
                          "0 0 0 1px rgba(255, 255, 255, 0.06), 0 4px 12px rgba(0, 0, 0, 0.5)",
                      }}
                    >
                      <p className="text-4xl font-bold text-light">
                        {t.research.stats.stat2.value}
                      </p>
                      <p className="text-sm text-light/80 mt-2">
                        {t.research.stats.stat2.description}
                      </p>
                      <p className="text-xs text-light/40 italic mt-4">
                        {t.research.stats.source}
                      </p>
                    </div>
                  </BentoItem>
                </BentoGrid>
              </div>
            </div>
          </section>
            </FadeOnScroll>

          {/* ==================== 8. CITAS E INSIGHT ==================== */}
            <FadeOnScroll delay={80}>
            <section className="w-full px-8 md:px-12 lg:px-20 mb-28">
            <h2 className="text-3xl md:text-4xl font-bold text-light mb-8">{t.research.quotesTitle}</h2>

            {/* Mobile: citas en stack simple alineadas a la izquierda */}
            <div className="mb-16 space-y-8 md:hidden">
              <div className="text-left">
                <p className="text-light italic mb-2 text-sm leading-relaxed">{t.research.quotes.perception.label}</p>
                <p className="text-light">{t.research.quotes.perception.text}</p>
                <p className="text-xs italic text-light/50 mt-3">- Usuario entrevistado</p>
              </div>
              <div className="text-left">
                <p className="text-light italic mb-2 text-sm leading-relaxed">{t.research.quotes.postponement.label}</p>
                {t.research.quotes.postponement.text1 && (
                  <p className="text-light mb-2">
                    {t.research.quotes.postponement.text1}
                  </p>
                )}
                {t.research.quotes.postponement.text2 && (
                  <p className="text-light">
                    {t.research.quotes.postponement.text2}
                  </p>
                )}
                <p className="text-xs italic text-light/50 mt-3">- Usuario entrevistado</p>
              </div>
            </div>

            {/* Desktop: BentoGrid de 2 columnas */}
            <div className="hidden md:block">
              <BentoGrid cols={{ default: 1, md: 2 }} gap="md" className="mb-28">
                <BentoItem colSpan={1}>
                  <div className="p-6 h-full text-left md:bg-container-light/10 md:backdrop-blur-sm md:rounded-lg md:border md:border-container-light/20">
                    <p className="text-light italic mb-2 text-sm leading-relaxed">{t.research.quotes.perception.label}</p>
                    <p className="text-light">{t.research.quotes.perception.text}</p>
                    <p className="text-xs italic text-light/50 mt-3">- Usuario entrevistado</p>
                  </div>
                </BentoItem>
                <BentoItem colSpan={1}>
                  <div className="p-6 h-full text-left md:bg-container-light/10 md:backdrop-blur-sm md:rounded-lg md:border md:border-container-light/20">
                    <p className="text-light italic mb-2 text-sm leading-relaxed">{t.research.quotes.postponement.label}</p>
                    {t.research.quotes.postponement.text1 && (
                      <p className="text-light mb-2">
                        {t.research.quotes.postponement.text1}
                      </p>
                    )}
                    {t.research.quotes.postponement.text2 && (
                      <p className="text-light">
                        {t.research.quotes.postponement.text2}
                      </p>
                    )}
                    <p className="text-xs italic text-light/50 mt-3">- Usuario entrevistado</p>
                  </div>
                </BentoItem>
              </BentoGrid>
            </div>

            {/* Insight Emergente */}
            <div className="w-full bg-gradient-to-r from-[#081730]/30 via-[#3282A9]/30 to-[#081730]/30 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-[#08A4E1]/30">
              <div className="text-center mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-light mb-4">{t.insight.title}</h3>
                <p className="text-xl md:text-2xl text-light mb-6">{t.insight.mainText}</p>
                <p className="text-light leading-relaxed text-lg">{t.insight.explanation}</p>
              </div>
              <div className="mt-8 pt-6 border-t border-container-light/20">
                <p className="text-light font-semibold mb-2">{t.insight.pivotTitle}</p>
                <p className="text-light mb-2">{t.insight.pivotFrom}</p>
                <p className="text-light text-lg">{t.insight.pivotTo}</p>
              </div>
            </div>
          </section>
            </FadeOnScroll>

{/* ==================== DIVIDER ==================== */}
<div className="w-full px-8 md:px-12 lg:px-20 mb-28">
  <div className="h-px w-full bg-gradient-to-r from-transparent via-[#08A4E1]/40 to-transparent" />
</div>

          {/* ==================== PRINCIPIOS DE DISEÑO ==================== */}
            <FadeOnScroll>
            <section className="w-full px-8 md:px-12 lg:px-20 mb-28 hidden md:block">
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
            <section id="fricciones" className="w-full px-8 md:px-12 lg:px-20 mb-20">
            <div className="max-w-4xl mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-light mb-6">{t.frictions.title}</h2>
              <p className="text-light mb-8 text-lg">{t.frictions.subtitle}</p>
            </div>
            <BentoGrid cols={{ default: 1, md: 2, lg: 3 }} gap="md">
              <BentoItem colSpan={{ default: 1, md: 2 }}>
                <div
                  className="bg-container/80 rounded-lg p-6 md:h-full"
                  style={{
                    boxShadow:
                      "0 0 0 1px rgba(255, 255, 255, 0.06), 0 4px 12px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl font-bold text-light">{t.frictions.friction1.number}</span>
                    <h3 className="text-xl font-bold text-light">{t.frictions.friction1.title}</h3>
                  </div>
                  <div className="space-y-2 text-light text-sm leading-relaxed">
                    <div>
                      <h4 className="font-semibold text-light mb-1">
                        {lang === "es" ? "Solución:" : "Solution:"}
                      </h4>
                      <p className="text-light text-sm leading-relaxed">{t.frictions.friction1.decision}</p>
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
                <div
                  className="bg-container/80 rounded-lg p-6 md:h-full"
                  style={{
                    boxShadow:
                      "0 0 0 1px rgba(255, 255, 255, 0.06), 0 4px 12px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl font-bold text-light">{t.frictions.friction2.number}</span>
                    <h3 className="text-xl font-bold text-light">{t.frictions.friction2.title}</h3>
                  </div>
                  <div className="space-y-2 text-light text-sm leading-relaxed">
                    <div>
                      <h4 className="font-semibold text-light mb-1">
                        {lang === "es" ? "Solución:" : "Solution:"}
                      </h4>
                      <p className="text-light text-sm leading-relaxed">{t.frictions.friction2.decision}</p>
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
                <div
                  className="bg-container/80 rounded-lg p-6 md:h-full"
                  style={{
                    boxShadow:
                      "0 0 0 1px rgba(255, 255, 255, 0.06), 0 4px 12px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl font-bold text-light">{t.frictions.friction3.number}</span>
                    <h3 className="text-xl font-bold text-light">{t.frictions.friction3.title}</h3>
                  </div>
                  <div className="space-y-2 text-light text-sm leading-relaxed">
                    <div>
                      <h4 className="font-semibold text-light mb-1">
                        {lang === "es" ? "Solución:" : "Solution:"}
                      </h4>
                      <p className="text-light text-sm leading-relaxed">{t.frictions.friction3.decision}</p>
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
                <div
                  className="bg-container/80 rounded-lg p-6 md:h-full"
                  style={{
                    boxShadow:
                      "0 0 0 1px rgba(255, 255, 255, 0.06), 0 4px 12px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl font-bold text-light">{t.frictions.friction4.number}</span>
                    <h3 className="text-xl font-bold text-light">{t.frictions.friction4.title}</h3>
                  </div>
                  <div className="space-y-2 text-light text-sm leading-relaxed">
                    <div>
                      <h4 className="font-semibold text-light mb-1">
                        {lang === "es" ? "Solución:" : "Solution:"}
                      </h4>
                      <p className="text-light text-sm leading-relaxed">{t.frictions.friction4.decision}</p>
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
                <div
                  className="bg-container/80 rounded-lg p-6 md:h-full"
                  style={{
                    boxShadow:
                      "0 0 0 1px rgba(255, 255, 255, 0.06), 0 4px 12px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl font-bold text-light">{t.frictions.friction5.number}</span>
                    <h3 className="text-xl font-bold text-light">{t.frictions.friction5.title}</h3>
                  </div>
                  <div className="space-y-2 text-light text-sm leading-relaxed">
                    <div>
                      <h4 className="font-semibold text-light mb-1">
                        {lang === "es" ? "Solución:" : "Solution:"}
                      </h4>
                      <p className="text-light text-sm leading-relaxed">{t.frictions.friction5.decision}</p>
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
<div className="w-full px-8 md:px-12 lg:px-20 mb-28">
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
            className="bg-[#F2F2F2]"
            imageClassName="object-cover object-top"
            caption={t.mvpOriginalImageCaption}
            figureClassName="mb-8 md:mb-28"
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
              className="bg-[#E4E4E4] "
              imageClassName="object-contain"
              caption={t.designTokensImageCaption}
            />
            </FadeOnScroll>

            {/* ==================== DIVIDER ==================== */}
<div className="w-full px-8 md:px-12 lg:px-20 mb-28">
  <div className="h-px w-full bg-gradient-to-r from-transparent via-[#08A4E1]/40 to-transparent" />
</div>

          {/* ==================== Intro Arquitectura ==================== */}
            <FadeOnScroll>
              <section id="arquitectura" className="w-full px-8 md:px-12 lg:px-20 mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-light mb-3">
                  {lang === "es" ? "Los tres ejes de arquitectura" : "The three architecture axes"}
                </h2>
                <p className="text-lg text-light/70">
                  {lang === "es" 
                    ? "Cada eje responde a una fricción específica identificada en el research." 
                    : "Each axis addresses a specific friction identified during research."}
                </p>
              </section>
            </FadeOnScroll>

          {/* ==================== 13. PANEL UNIFICADO - Snapshot de dashboard ==================== */}
            <FadeOnScroll>
              <section className="w-full px-8 md:px-12 lg:px-20 mb-28">
                <div className="bg-gradient-to-br from-[#081730]/30 to-[#3282A9]/30 backdrop-blur-sm rounded-2xl overflow-hidden p-8 md:p-12 border border-[#08A4E1]/30">
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
                        <div key={index}>
                          {/* Mobile: plain text */}
                          <p className="md:hidden text-light text-sm leading-relaxed py-1">• {item}</p>
                          {/* Desktop: card */}
                          <div className="hidden md:block bg-container-light/10 backdrop-blur-sm rounded-lg p-4 border border-container-light/20">
                            <p className="text-light text-sm leading-relaxed">• {item}</p>
                          </div>
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

                  {/* Desktop-only dashboard inside card */}
                  <div className="hidden md:block mt-8 -mx-12 [&_figure]:!mb-0">
                    <ImageBreakout
                      src="/images/digitoImages/dashboard-digito-en-uso-real.webp"
                      alt="Dashboard principal de Dígito en uso real: consultor revisando estado de proyectos y horas registradas"
                      width={1920}
                      height={1080}
                      border={false}
                      className="bg-[#F2F2F2]"
                      imageClassName="image-swing-dashboard"
                    />
                  </div>
                </div>

                {/* Mobile-only dashboard below card, full-width */}
                <div className="mt-4 md:hidden -mx-8 [&_figure]:!mb-0">
                  <ImageBreakout
                    src="/images/digitoImages/dashboard-digito-en-uso-real.webp"
                    alt="Dashboard principal de Dígito en uso real: consultor revisando estado de proyectos y horas registradas"
                    width={1920}
                    height={1080}
                    border={false}
                    className="bg-[#F2F2F2]"
                    imageClassName="image-swing-dashboard"
                  />
                </div>
              </section>
            </FadeOnScroll>
            
          {/* ==================== 14. ANIMACIÓN FAB CON SUGERENCIAS CONTEXTUALES (Full width 16:9) ==================== */}
            <FadeOnScroll delay={80}>
              <section className="w-full px-8 md:px-12 lg:px-20 mb-28">
                <div className="bg-gradient-to-br from-[#081730]/30 to-[#2D6B4A]/30 backdrop-blur-sm rounded-2xl overflow-hidden p-8 md:p-12 border border-[#08A4E1]/20">
                  <h2 className="text-3xl md:text-4xl font-bold text-light mb-4">{t.architecture.automation.title}</h2>
                  <p className="text-lg text-light mb-6">{t.architecture.automation.axis}</p>
                  <GridContainer cols={{ default: 1, md: 2 }} gap="lg" className="!px-0 [&>*]:h-full items-stretch">
                    {/* Desktop-only video inside card */}
                    <Block colSpan={1} className="hidden md:flex md:order-1">
                      <div className="w-full flex items-center justify-center">
                        <div className="relative w-full aspect-video rounded-xl shadow-lg overflow-hidden">
                          <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="metadata"
                            className="w-full h-full object-contain object-top bg-[#000000]"
                          >
                            <source
                              src="/images/digitoImages/animacion-fab-con-sugerencias-contextuales-desktop.webm"
                              type="video/webm"
                            />
                          </video>
                        </div>
                      </div>
                    </Block>
                    <Block colSpan={1} className="order-1 md:order-2">
                      <div className="space-y-4 text-light h-full flex flex-col justify-start pt-4 md:pt-0">
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
                          <div className="hidden md:grid md:grid-cols-1 gap-3 mt-2">
                            {(t.architecture.automation.features || []).map((feature: string, index: number) => (
                              <div
                                key={index}
                                className="bg-container-light/10 backdrop-blur-sm rounded-lg p-3 border border-container-light/20"
                              >
                                <p className="text-light text-sm leading-relaxed">• {feature}</p>
                              </div>
                            ))}
                          </div>
                          <ul className="md:hidden list-none space-y-1 text-light text-sm leading-relaxed">
                            {(t.architecture.automation.features || []).map((feature: string, index: number) => (
                              <li key={index} className="flex items-start gap-2">
                                <span className="text-light/50 mt-0.5">•</span>
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </Block>
                  </GridContainer>
                </div>

                {/* Mobile-only video below card */}
                <div className="mt-4 md:hidden">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className="w-full h-auto object-contain rounded-xl bg-[#000000]"
                  >
                    <source
                      src="/images/digitoImages/animacion-fab-con-sugerencias-contextuales.webm"
                      type="video/webm"
                    />
                  </video>
                </div>
              </section>
            </FadeOnScroll>

          {/* ==================== 15. CAPA SOCIAL - Texto izquierda, mockup derecha ==================== */}
            <FadeOnScroll delay={150}>
              <section className="w-full px-8 md:px-12 lg:px-20 mb-28">
                <div className="bg-gradient-to-br from-[#081730]/30 to-[#4A2D6B]/30 backdrop-blur-sm rounded-2xl overflow-hidden p-8 md:p-12 border border-[#08A4E1]/20">
                  <h2 className="text-3xl md:text-4xl font-bold text-light mb-4">{t.architecture.social.title}</h2>
                  <p className="text-lg text-light mb-6">{t.architecture.social.axis}</p>
                  <GridContainer cols={{ default: 1, md: 2 }} gap="lg" className="!px-0 [&>*]:h-full items-stretch">
                    <Block colSpan={1}>
                      <div className="space-y-4 text-light h-full flex flex-col justify-start pt-4 md:pt-0">
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
                          <div className="hidden md:grid md:grid-cols-1 gap-3 mt-2">
                            {(t.architecture.social.solutionItems || []).map((item: string, index: number) => (
                              <div
                                key={index}
                                className="bg-container-light/10 backdrop-blur-sm rounded-lg p-3 border border-container-light/20"
                              >
                                <p className="text-light text-sm leading-relaxed">• {item}</p>
                              </div>
                            ))}
                          </div>
                          <ul className="md:hidden list-none space-y-1 text-light text-sm leading-relaxed">
                            {(t.architecture.social.solutionItems || []).map((item: string, index: number) => (
                              <li key={index} className="flex items-start gap-2">
                                <span className="text-light/50 mt-0.5">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-light mb-2">
                            {lang === "es" ? "Resultado:" : "Result:"}
                          </h4>
                          <p className="text-light text-sm leading-relaxed">{t.architecture.social.result}</p>
                        </div>
                      </div>
                    </Block>

                    {/* Desktop-only video inside card */}
                    <Block colSpan={1} className="hidden md:flex md:order-2">
                      <div className="relative w-full h-full rounded-lg overflow-hidden bg-white flex items-start">
                        <video
                          autoPlay
                          loop
                          muted
                          playsInline
                          preload="metadata"
                          className="w-full h-full object-contain bg-[#000000]"
                        >
                          <source
                            src="/images/digitoImages/animacion-proyectos-gantt-kanban.webm"
                            type="video/webm"
                          />
                        </video>
                      </div>
                    </Block>
                  </GridContainer>
                </div>

                {/* Mobile-only video below card, fuera del contenedor */}
                <div className="mt-4 md:hidden">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className="w-full h-auto object-contain rounded-xl bg-[#000000]"
                  >
                    <source
                      src="/images/digitoImages/animacion-proyectos-gantt-kanban.webm"
                      type="video/webm"
                    />
                  </video>
                </div>
              </section>
            </FadeOnScroll>

          {/* ==================== TRADE-OFFS CLAVE ==================== */}
          <FadeOnScroll delay={80}>
            <section id="tradeoffs" className="w-full px-8 md:px-12 lg:px-20 mb-28">
              <h2 className="text-3xl md:text-4xl font-bold text-light mb-6">
                {lang === "es" ? "Lo que decidimos NO hacer" : "Key trade-offs"}
              </h2>
              <GridContainer cols={{ default: 1, md: 2 }} gap="lg" className="!px-0 [&>*]:h-full">
                <Block colSpan={1}>
                  <div
                    className="bg-container/80 rounded-lg p-6 h-full"
                    style={{
                      boxShadow:
                        "0 0 0 1px rgba(255, 255, 255, 0.06), 0 4px 12px rgba(0, 0, 0, 0.5)",
                    }}
                  >
                    <h3 className="text-2xl font-semibold text-light mb-4">{t.strategy.aiTradeoffTitle}</h3>
                    <div className="space-y-3 text-light leading-relaxed">
                      <p>{t.strategy.aiTradeoffText1}</p>
                      <p>{t.strategy.aiTradeoffText2}</p>
                      <p>{t.strategy.aiTradeoffText3}</p>
                      <p>{t.strategy.aiTradeoffText4}</p>
                    </div>
                  </div>
                </Block>
                <Block colSpan={1}>
                  <div
                    className="bg-container/80 rounded-lg p-6 h-full"
                    style={{
                      boxShadow:
                        "0 0 0 1px rgba(255, 255, 255, 0.06), 0 4px 12px rgba(0, 0, 0, 0.5)",
                    }}
                  >
                    <h3 className="text-2xl font-semibold text-light mb-4">{t.strategy.alternativeTitle}</h3>
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
              </GridContainer>
            </section>
          </FadeOnScroll>

{/* ==================== 20. EVOLUCIÓN DEL DISEÑO - MVP → Wireframe → HiFi ==================== */}
<FadeOnScroll delay={80}>
  <section className="w-full px-8 md:px-12 lg:px-20 mb-28">
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-[#0D0D0D]">
      <Image
        src="/images/digitoImages/comparativa-mvp-wireframe-hifi.webp"
        alt="Evolución del diseño: MVP original, wireframe de baja fidelidad y prototipo de alta fidelidad"
        fill
        className="object-contain"
        sizes="(max-width: 768px) 100vw, 1200px"
      />
    </div>
  </section>
</FadeOnScroll>

            {/* ==================== DIVIDER ==================== */}
<div className="w-full px-8 md:px-12 lg:px-20 mb-28">
  <div className="h-px w-full bg-gradient-to-r from-transparent via-[#08A4E1]/40 to-transparent" />
</div>

          {/* ==================== 19. TESTING ==================== */}
            <FadeOnScroll>
            <section id="testing" className="w-full px-8 md:px-12 lg:px-20 mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-light mb-6">{t.testing.title}</h2>
            <GridContainer cols={{ default: 1, md: 2 }} gap="lg" className="!px-0 [&>*]:h-full">
              <Block colSpan={1}>
                <div
                  className="bg-container/80 rounded-lg p-6 h-full"
                  style={{
                    boxShadow:
                      "0 0 0 1px rgba(255, 255, 255, 0.06), 0 4px 12px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  <h3 className="text-2xl font-bold text-light mb-4">{t.testing.subtitle}</h3>
                  <div className="bg-container/60 rounded-lg p-4 space-y-4 text-light">
                    <div>
                      <h5 className="font-medium text-light mb-2">
                        {lang === "es" ? "Participantes:" : "Participants:"}
                      </h5>
                      <p className="text-sm text-light leading-relaxed">{t.testing.participants}</p>
                    </div>
                    <div>
                      <h5 className="font-medium text-light mb-2">
                        {lang === "es" ? "Método:" : "Method:"}
                      </h5>
                      <p className="text-sm text-light leading-relaxed">{t.testing.method}</p>
                    </div>
                    <div>
                      <h5 className="font-medium text-light mb-2">
                        {lang === "es" ? "Objetivo:" : "Objective:"}
                      </h5>
                      <p className="text-sm text-light leading-relaxed">{t.testing.objective}</p>
                    </div>
                  </div>
                </div>
              </Block>
              <Block colSpan={1}>
                <div
                  className="bg-container/80 rounded-lg p-6 h-full"
                  style={{
                    boxShadow:
                      "0 0 0 1px rgba(255, 255, 255, 0.06), 0 4px 12px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  <h3 className="text-2xl font-bold text-light mb-4">{t.testing.frictionsTitle}</h3>
                  <div className="space-y-4">
                    <div className="bg-red-500/10 backdrop-blur-sm rounded-lg p-4 border border-red-400/30">
                      <h4 className="font-semibold text-light mb-2">{t.testing.friction1.title}</h4>
                      <p className="text-light text-sm leading-relaxed">{t.testing.friction1.text}</p>
                      <p className="text-light text-sm mt-2">
                        <strong className="font-semibold">
                          {lang === "es" ? "Iteración:" : "Iteration:"}
                        </strong>{" "}
                        {(t.testing.iteration1.adjustments || []).join(" · ")}
                      </p>
                    </div>
                    <div className="bg-red-500/10 backdrop-blur-sm rounded-lg p-4 border border-red-400/30">
                      <h4 className="font-semibold text-light mb-2">{t.testing.friction2.title}</h4>
                      <p className="text-light text-sm leading-relaxed">{t.testing.friction2.text}</p>
                      <p className="text-light text-sm mt-2">
                        <strong className="font-semibold">
                          {lang === "es" ? "Iteración:" : "Iteration:"}
                        </strong>{" "}
                        {(t.testing.iteration2.adjustments || []).join(" · ")}
                      </p>
                    </div>
                  </div>
                </div>
              </Block>
            </GridContainer>
          </section>
            </FadeOnScroll>

            {/* ==================== DIVIDER ==================== */}
<div className="w-full px-8 md:px-12 lg:px-20 mb-28">
  <div className="h-px w-full bg-gradient-to-r from-transparent via-[#08A4E1]/40 to-transparent" />
</div>

          {/* ==================== FIGMA PROTOTYPE EMBED ==================== */}
          <section id="prototipo" className="w-full px-8 md:px-12 lg:px-20 mb-28 scroll-mt-24">
            <div className="w-full mb-4">
              <h2 className="text-3xl md:text-4xl font-bold text-light">
                {lang === "es" ? "Prototipo hi-fi" : "Hi-fi prototype"}
              </h2>
            </div>
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
            <div className="mt-3 w-full flex justify-start">
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
  <section id="cierre" className="w-full px-8 md:px-12 lg:px-20 mb-20">
    <h2 className="text-3xl md:text-4xl font-bold text-light mb-8">
      {t.snapshot?.impactTitle}
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full">

      {/* ANTES */}
      <div className="text-left">
        <p className="text-light font-semibold mb-3 pl-3 border-l-2 border-light/30">
          {t.snapshot?.impactBeforeLabel}
        </p>

        <p className="text-light italic text-lg leading-relaxed pl-3">
          {t.snapshot?.impactBeforeQuote}
        </p>
      </div>

      {/* DESPUÉS */}
      <div className="text-left pt-8 md:pt-0">
        <p className="text-light font-semibold mb-3 pl-3 border-l-2 border-[#08A4E1]/60">
          {t.snapshot?.impactAfterLabel}
        </p>

        <p className="text-light italic text-lg leading-relaxed pl-3">
          {t.snapshot?.impactAfterQuote}
        </p>
      </div>

    </div>

  </section>
</FadeOnScroll>

{/* ==================== DIVIDER ==================== */}
<div className="w-full px-8 md:px-12 lg:px-20 mb-28">
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