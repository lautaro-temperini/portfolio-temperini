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
        url: "https://temperini.vercel.app/images/digito-logo.png",
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
    images: ["https://temperini.vercel.app/images/digito-logo.png"],
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
      {/* Fondo sólido oscuro para sobrescribir el gradiente */}
      <div className="fixed inset-0 bg-[#0D0D0D] z-[5] pointer-events-none" style={{ backgroundAttachment: 'fixed' }} />
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
            <section className="w-full px-8 md:px-12 lg:px-20 mb-20">
  <div className="relative w-full h-[150px] md:h-[200px] rounded-lg overflow-hidden bg-[#0A1628]">
    <Image
      src="/images/digitoImages/DigitoRender3d.jpg"
      alt="Render3D de Logo de Dígito"
      width={1198}
      height={206}
      className="w-full h-full object-contain scale-110"
    />
  </div>
</section>
            </FadeOnScroll>

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

          {/* ==================== 3. MI ROL - Título y subtítulo ==================== */}
            <FadeOnScroll>
            <section className="w-full px-8 md:px-12 lg:px-20 mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-light mb-6">{t.myRole?.title}</h2>
            <p className="text-lg text-light mb-8">{t.myRole?.description}</p>
            <BentoGrid cols={{ default: 1, md: 2, lg: 4 }} gap="md" className="[&>*]:h-full">
              {t.myRole?.sections?.map((section: any, index: number) => (
                <BentoItem key={index} colSpan={1}>
                  <FeatureCard
                    title={section.subtitle}
                    description={section.items.slice(0, 2).join(". ")}
                    variant="dark"
                    className="h-full"
                  />
                </BentoItem>
              ))}
            </BentoGrid>
          </section>
            </FadeOnScroll>

          {/* ==================== 5. HIPÓTESIS INICIAL ==================== */}
            <FadeOnScroll>
            <section className="w-full px-8 md:px-12 lg:px-20 mb-20">
            <div className="max-w-4xl mb-6">
              <h2 className="text-3xl md:text-4xl font-bold text-light mb-6">{t.problem?.title}</h2>
            </div>
            <GridContainer cols={{ default: 1, md: 2 }} gap="lg" className="!px-0 [&>*]:h-full">
              <Block colSpan={1}>
                <div className="bg-container/80 rounded-lg p-6 border border-container-light/10 h-full">
                  <h3 className="text-2xl font-semibold text-light mb-4">{t.problem?.businessImpact}</h3>
                  <div className="text-light leading-relaxed space-y-4">
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
                <div className="bg-container/80 rounded-lg p-6 border border-container-light/10 h-full">
                  <h3 className="text-2xl font-semibold text-light mb-4">Hipótesis inicial vs. realidad</h3>
                  <blockquote className="text-light italic border-l-4 border-red-500 pl-4 mb-4">
                    Hipótesis del CEO: {t.problem?.hypothesis}
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
    src="/images/digitoImages/flujo-usuario-degradacion-progresiva-timetracking.png"
    alt="Diagrama de flujo mostrando cómo la experiencia del usuario se degradaba progresivamente desde la ejecución hasta el registro"
    width={1376}
    height={768}
     imageClassName="object-cover object-[center_80%]" 
    caption="La experiencia se degradaba progresivamente. Lo que comenzaba fluido terminaba generando resistencia activa al registro."
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
            <ImageBreakout
              src="/tabla-comparativa-de-desk-research--entrevistas-y-.jpg"
              alt="Tabla comparativa - Desk Research"
              width={1920}
              height={1080}
              border={false}
              full={true}
              noPadding={true}
            />
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
            <section className="w-full px-8 md:px-12 lg:px-20 mb-20">
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
                  <div className="space-y-3 text-light text-sm leading-relaxed">
                    <div>
                      <h4 className="font-semibold text-light mb-1">Dolor:</h4>
                      <p className="text-sm leading-relaxed">{t.frictions.friction1.pain}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-light mb-1">Decisión:</h4>
                      <p className="text-light text-sm leading-relaxed">{t.frictions.friction1.decision}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-light mb-1">Por qué funciona:</h4>
                      <p className="text-sm leading-relaxed">{t.frictions.friction1.whyWorks}</p>
                    </div>
                  </div>
                </div>
              </BentoItem>
              <BentoItem colSpan={1}>
                <div className="bg-container/80 rounded-lg p-6 border border-container-light/10 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl font-bold text-light">{t.frictions.friction2.number}</span>
                    <h3 className="text-xl font-bold text-light">{t.frictions.friction2.title}</h3>
                  </div>
                  <div className="space-y-3 text-light text-sm leading-relaxed">
                    <div>
                      <h4 className="font-semibold text-light mb-1">Dolor:</h4>
                      <p className="text-sm leading-relaxed">{t.frictions.friction2.pain}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-light mb-1">Decisión:</h4>
                      <p className="text-light text-sm leading-relaxed">{t.frictions.friction2.decision}</p>
                    </div>
                  </div>
                </div>
              </BentoItem>
              <BentoItem colSpan={1}>
                <div className="bg-container/80 rounded-lg p-6 border border-container-light/10 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl font-bold text-light">{t.frictions.friction3.number}</span>
                    <h3 className="text-xl font-bold text-light">{t.frictions.friction3.title}</h3>
                  </div>
                  <div className="space-y-3 text-light text-sm leading-relaxed">
                    <div>
                      <h4 className="font-semibold text-light mb-1">Dolor:</h4>
                      <p className="text-sm leading-relaxed">{t.frictions.friction3.pain}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-light mb-1">Decisión:</h4>
                      <p className="text-light text-sm leading-relaxed">{t.frictions.friction3.decision}</p>
                    </div>
                  </div>
                </div>
              </BentoItem>
              <BentoItem colSpan={1}>
                <div className="bg-container/80 rounded-lg p-6 border border-container-light/10 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl font-bold text-light">{t.frictions.friction4.number}</span>
                    <h3 className="text-xl font-bold text-light">{t.frictions.friction4.title}</h3>
                  </div>
                  <div className="space-y-3 text-light text-sm leading-relaxed">
                    <div>
                      <h4 className="font-semibold text-light mb-1">Dolor:</h4>
                      <p className="text-sm leading-relaxed">{t.frictions.friction4.pain}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-light mb-1">Decisión:</h4>
                      <p className="text-light text-sm leading-relaxed">{t.frictions.friction4.decision}</p>
                    </div>
                  </div>
                </div>
              </BentoItem>
              <BentoItem colSpan={1}>
                <div className="bg-container/80 rounded-lg p-6 border border-container-light/10 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl font-bold text-light">{t.frictions.friction5.number}</span>
                    <h3 className="text-xl font-bold text-light">{t.frictions.friction5.title}</h3>
                  </div>
                  <div className="space-y-3 text-light text-sm leading-relaxed">
                    <div>
                      <h4 className="font-semibold text-light mb-1">Dolor:</h4>
                      <p className="text-sm leading-relaxed">{t.frictions.friction5.pain}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-light mb-1">Decisión:</h4>
                      <p className="text-light text-sm leading-relaxed">{t.frictions.friction5.decision}</p>
                    </div>
                  </div>
                </div>
              </BentoItem>
            </BentoGrid>
          </section>
            </FadeOnScroll>

          {/* ==================== 12. DIAGRAMA DE ARQUITECTURA FULL (Full width 16:9) ==================== */}
            <FadeOnScroll>
            <ImageBreakout
            src="/diagrama-de-arquitectura-mostrando-tres-ejes--estr.jpg"
            alt="Diagrama de arquitectura - Tres ejes"
            width={1920}
            height={1080}
            border={false}
            full={true}
          />
            </FadeOnScroll>

          {/* ==================== 13. PANEL UNIFICADO - Texto izquierda, mockup derecha ==================== */}
            <FadeOnScroll>
            <section className="w-full px-8 md:px-12 lg:px-20 mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-light mb-2">{t.architecture.unifiedPanel.title}</h2>
            <p className="text-lg text-light mb-6">{t.architecture.unifiedPanel.axis}</p>
            <GridContainer cols={{ default: 1, md: 2 }} gap="lg" className="!px-0 [&>*]:h-full">
              <Block colSpan={1}>
                <div className="bg-container/80 rounded-lg p-6 border border-container-light/10 h-full">
                  <div className="space-y-4 text-light">
                    <div>
                      <h4 className="font-semibold text-light mb-2">Problema detectado:</h4>
                      <p>{t.architecture.unifiedPanel.problem}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-light mb-2">Solución:</h4>
                      <p>{t.architecture.unifiedPanel.solution}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-light mb-2">Componentes:</h4>
                      <ul className="list-disc pl-5 space-y-2">
                        {(t.architecture.unifiedPanel.components || []).map((component: string, index: number) => (
                          <li key={index}>
                            <span className="text-light">{component.split(":")[0]}:</span>
                            {component.split(":")[1]}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-[#081730]/30 backdrop-blur-sm rounded-lg p-4 border border-[#3282A9]/30">
                      <h4 className="font-semibold text-light mb-2">{t.architecture.unifiedPanel.syncTitle}</h4>
                      <p className="text-light text-sm leading-relaxed">{t.architecture.unifiedPanel.syncText}</p>
                    </div>
                  </div>
                </div>
              </Block>
              <Block colSpan={1}>
                <div className="relative w-full h-full rounded-lg overflow-hidden bg-white flex items-center">
                  <Image
                    src="/panel-unificado-con-tabs-kanban--gantt-y-calendari.jpg"
                    alt="Mockup - Panel unificado"
                    width={1200}
                    height={800}
                    className="w-full h-auto object-contain"
                  />
                </div>
              </Block>
            </GridContainer>
          </section>
            </FadeOnScroll>

          {/* ==================== 14. AUTOMATIZACIÓN LIGERA - Texto derecha, mockup izquierda ==================== */}
            <FadeOnScroll delay={80}>
            <section className="w-full px-8 md:px-12 lg:px-20 mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-light mb-2">{t.architecture.automation.title}</h2>
            <p className="text-lg text-light mb-6">{t.architecture.automation.axis}</p>
            <GridContainer cols={{ default: 1, md: 2 }} gap="lg" className="!px-0 [&>*]:h-full">
              <Block colSpan={1}>
                <div className="relative w-full h-full rounded-lg overflow-hidden bg-white flex items-center">
                  <Image
                    src="/fab-con-sugerencias-contextuales--duplicar-d-a-ant.jpg"
                    alt="Mockup - FAB con sugerencias"
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
                      <h4 className="font-semibold text-light mb-2">Problema detectado:</h4>
                      <p>{t.architecture.automation.problem}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-light mb-2">Solución:</h4>
                      <p>{t.architecture.automation.solution}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-light mb-2">Funcionalidades principales:</h4>
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
                      <h4 className="font-semibold text-light mb-2">Problema detectado:</h4>
                      <p>{t.architecture.social.problem}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-light mb-2">Solución:</h4>
                      <p className="mb-2">{t.architecture.social.solution}</p>
                      <ul className="list-disc pl-5 space-y-2">
                        {(t.architecture.social.solutionItems || []).map((item: string, index: number) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-container-light/10 backdrop-blur-sm rounded-lg p-4 border border-container-light/20">
                      <h4 className="font-semibold text-light mb-2">Resultado:</h4>
                      <p className="text-light text-sm leading-relaxed">{t.architecture.social.result}</p>
                    </div>
                  </div>
                </div>
              </Block>
              <Block colSpan={1}>
                <div className="relative w-full h-full rounded-lg overflow-hidden bg-white flex items-center">
                  <Image
                    src="/dashboard-con-indicadores-de-progreso-social-y-se-.jpg"
                    alt="Mockup - Dashboard con indicadores"
                    width={1200}
                    height={800}
                    className="w-full h-auto object-contain"
                  />
                </div>
              </Block>
            </GridContainer>
          </section>
            </FadeOnScroll>

          {/* ==================== 16. MOCKUP (Full width 16:9) ==================== */}
            <FadeOnScroll>
            <ImageBreakout
            src="/dashboard-completo-mostrando-tareas--reuniones--pr.jpg"
            alt="Mockup - Dashboard completo"
            width={1920}
            height={1080}
            border={false}
            full={true}
          />
            </FadeOnScroll>

          {/* ==================== 17. DASHBOARD REFINADO ==================== */}
            <FadeOnScroll>
            <section className="w-full px-8 md:px-12 lg:px-20 mb-20">
            <div className="bg-gradient-to-br from-[#081730]/30 to-[#3282A9]/30 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-[#08A4E1]/30">
              <h2 className="text-3xl md:text-4xl font-bold text-light mb-6">{t.architecture.dashboard.title}</h2>
              <p className="text-light mb-4">{t.architecture.dashboard.subtitle}</p>
              <p className="text-light mb-6">{t.architecture.dashboard.text}</p>
              <h4 className="text-lg font-semibold text-light mb-3">Incluye:</h4>
              <div className="grid md:grid-cols-2 gap-4">
                {(t.architecture.dashboard.includes || []).map((item: string, index: number) => (
                  <div
                    key={index}
                    className="bg-container-light/10 backdrop-blur-sm rounded-lg p-4 border border-container-light/20"
                  >
                    <p className="text-light">• {item}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
            </FadeOnScroll>

          {/* ==================== 18. DASHBOARD COMPLETO FULL (Full width 16:9) ==================== */}
            <FadeOnScroll>
            <ImageBreakout
            src="/dashboard-completo-mostrando-tareas--reuniones--pr.jpg"
            alt="Mockup - Dashboard completo"
            width={1920}
            height={1080}
            border={false}
            full={true}
          />
            </FadeOnScroll>

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
                      <h4 className="font-semibold text-light mb-2">Participantes:</h4>
                      <p>{t.testing.participants}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-light mb-2">Método:</h4>
                      <p>{t.testing.method}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-light mb-2">Objetivo:</h4>
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
                    <p className="text-light text-sm leading-relaxed font-semibold">Ajustes:</p>
                    <ul className="list-disc pl-5 text-light text-sm leading-relaxed space-y-1">
                      {(t.testing.iteration1.adjustments || []).map((item: string, index: number) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                    <p className="text-light text-sm leading-relaxed font-semibold mt-2">Resultado:</p>
                    <p className="text-light text-sm leading-relaxed">{t.testing.iteration1.result}</p>
                  </div>
                </div>
              </Block>
              <Block colSpan={1}>
                <div className="bg-container/80 rounded-lg p-6 border border-container-light/10">
                  <h4 className="font-semibold text-light mb-3">{t.testing.iteration2.title}</h4>
                  <div className="space-y-2">
                    <p className="text-light text-sm leading-relaxed font-semibold">Ajustes:</p>
                    <ul className="list-disc pl-5 text-light text-sm leading-relaxed space-y-1">
                      {(t.testing.iteration2.adjustments || []).map((item: string, index: number) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                    <p className="text-light text-sm leading-relaxed font-semibold mt-2">Aprendizaje:</p>
                    <p className="text-light text-sm leading-relaxed">{t.testing.iteration2.learning}</p>
                  </div>
                </div>
              </Block>
            </GridContainer>
          </section>
            </FadeOnScroll>

          {/* ==================== 20. ANTES/DESPUÉS - Vertical ==================== */}
            <FadeOnScroll delay={80}>
            <section className="w-full px-8 md:px-12 lg:px-20 mb-20">
            <div className="space-y-8">
              <div className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden bg-white">
                <Image
                  src="/antes-despu-s-del-dashboard-iterado-mostrando-reor.jpg"
                  alt="Antes/Después - Dashboard iterado"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden bg-white">
                <Image
                  src="/antes-despu-s-tooltips-y-se-ales-contextuales-most.jpg"
                  alt="Antes/Después - Tooltips"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </section>
            </FadeOnScroll>

          {/* ==================== 21. RESULTADOS ==================== */}
            <FadeOnScroll delay={150}>
            <section className="w-full px-8 md:px-12 lg:px-20 mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-light mb-8">{t.results.title}</h2>
            <GridContainer cols={{ default: 1, md: 2 }} gap="lg" className="!px-0 mb-8 [&>*]:h-full">
              <Block colSpan={1}>
                <div className="bg-container/80 rounded-lg p-6 border border-container-light/10 h-full">
                  <h3 className="text-2xl font-bold text-light mb-4">{t.results.qualitative.title}</h3>
                  <div className="bg-[#081730]/30 backdrop-blur-sm rounded-lg p-4 border border-[#3282A9]/30 mb-4">
                    <p className="text-light text-sm leading-relaxed mb-2">{t.results.qualitative.before}</p>
                    <p className="text-light italic">{t.results.qualitative.beforeQuote}</p>
                  </div>
                  <div className="bg-[#081730]/30 backdrop-blur-sm rounded-lg p-4 border border-[#3282A9]/30 mb-4">
                    <p className="text-light text-sm leading-relaxed mb-2">{t.results.qualitative.after}</p>
                    <p className="text-light italic">{t.results.qualitative.afterQuote}</p>
                  </div>
                  <p className="text-light font-semibold text-lg mb-2">{t.results.qualitative.impact}</p>
                  <p className="text-light">{t.results.qualitative.impactText}</p>
                </div>
              </Block>
              <Block colSpan={1}>
                <div className="bg-container/80 rounded-lg p-6 border border-container-light/10 h-full">
                  <h3 className="text-2xl font-bold text-light mb-4">{t.results.learnings.title}</h3>
                  <h4 className="text-lg font-semibold text-light mb-2">{t.results.learnings.subtitle}</h4>
                  <p className="mb-4 text-light">{t.results.learnings.text1}</p>
                  <p className="mb-4 text-light">{t.results.learnings.text2}</p>
                  <div className="bg-gradient-to-br from-[#081730]/30 to-[#3282A9]/30 backdrop-blur-sm rounded-lg p-4 border border-[#08A4E1]/30 mb-4">
                    <p className="text-light font-semibold mb-2">Aprendizaje:</p>
                    <p className="text-light text-sm leading-relaxed">{t.results.learnings.learning}</p>
                  </div>
                  <p className="text-light">{t.results.learnings.text3}</p>
                </div>
              </Block>
            </GridContainer>
            
            {/* Evolución hacia IA - Full width */}
            <div className="bg-[#081730]/30 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-[#3282A9]/30">
              <h2 className="text-2xl md:text-3xl font-bold text-light mb-4">{t.results.aiEvolution.title}</h2>
              <p className="text-light mb-6 text-lg">{t.results.aiEvolution.text}</p>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-light mb-3">{t.results.aiEvolution.componentsTitle}</h4>
                  <ul className="list-disc pl-5 text-light space-y-2 text-sm leading-relaxed">
                    {(t.results.aiEvolution.components || []).map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-light mb-3">{t.results.aiEvolution.benefitsTitle}</h4>
                  <ul className="list-disc pl-5 text-light space-y-2 text-sm leading-relaxed">
                    {(t.results.aiEvolution.benefits || []).map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="bg-container-light/10 backdrop-blur-sm rounded-lg p-4 border border-container-light/20">
                <p className="text-light text-sm leading-relaxed">{t.results.aiEvolution.note}</p>
              </div>
            </div>
          </section>
            </FadeOnScroll>

          {/* ==================== 22. PRÓXIMOS PASOS ==================== */}
            <FadeOnScroll>
            <section className="w-full px-8 md:px-12 lg:px-20 mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-light mb-8">{t.results.nextSteps.title}</h2>
            
            {/* FASE 1 Y EXPERIENCIA MÓVIL - GridContainer 2 cols */}
            <GridContainer cols={{ default: 1, md: 2 }} gap="lg" className="!px-0 [&>*]:h-full">
              <Block colSpan={1}>
                <div className="bg-container/80 rounded-lg p-6 border border-container-light/10 h-full">
                  <h3 className="text-2xl font-bold text-light mb-4">{t.results.nextSteps.onboarding.title}</h3>
                  <p className="mb-4 text-light">{t.results.nextSteps.onboarding.text}</p>
                  <h4 className="font-semibold text-light mb-2">{t.results.nextSteps.onboarding.flows}</h4>
                  <ul className="list-disc pl-5 text-light space-y-2 text-sm leading-relaxed mb-4">
                    {(t.results.nextSteps.onboarding.flowItems || []).map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                  <p className="text-light text-sm leading-relaxed mb-4">{t.results.nextSteps.onboarding.note}</p>
                  <div className="bg-[#081730]/30 backdrop-blur-sm rounded-lg p-4 border border-[#3282A9]/30">
                    <p className="text-light font-semibold mb-2">{t.results.nextSteps.onboarding.impact}</p>
                    <p className="text-light text-sm leading-relaxed">{t.results.nextSteps.onboarding.impactText}</p>
                  </div>
                </div>
              </Block>
              <Block colSpan={1}>
                <div className="bg-container/80 rounded-lg p-6 border border-container-light/10 h-full">
                  <h3 className="text-2xl font-bold text-light mb-4">{t.results.nextSteps.mobile.title}</h3>
                  <p className="mb-4 text-light">{t.results.nextSteps.mobile.text1}</p>
                  <p className="mb-4 text-light">{t.results.nextSteps.mobile.text2}</p>
                  <div className="bg-[#081730]/30 backdrop-blur-sm rounded-lg p-4 border border-[#3282A9]/30">
                    <p className="text-light text-sm leading-relaxed">{t.results.nextSteps.mobile.note}</p>
                  </div>
                </div>
              </Block>
            </GridContainer>
          </section>
            </FadeOnScroll>

          {/* ==================== 24. PRINCIPIOS FASE 2 - 3 bloques ==================== */}
            <FadeOnScroll delay={80}>
            <section className="w-full px-8 md:px-12 lg:px-20 mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-light mb-6">{t.results.phase2Principles.title}</h2>
            <BentoGrid cols={{ default: 1, md: 3 }} gap="md" className="[&>*]:h-full">
              {(t.results.phase2Principles.items || []).map((item: { title: string; text: string }, index: number) => (
                <BentoItem key={index} colSpan={1}>
                  <FeatureCard
                    title={item.title}
                    description={item.text}
                    variant="dark"
                    className="h-full"
                  />
                </BentoItem>
              ))}
            </BentoGrid>
          </section>
            </FadeOnScroll>

          {/* ==================== 25. CIERRE ==================== */}
            <FadeOnScroll delay={150}>
            <section className="w-full px-8 md:px-12 lg:px-20 mb-20">
            <div className="bg-gradient-to-br from-[#081730]/30 to-[#3282A9]/30 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-[#08A4E1]/30">
              <h2 className="text-3xl md:text-4xl font-bold text-light mb-6 text-center">{t.results.closing.title}</h2>
              <div className="space-y-6 text-center max-w-3xl mx-auto">
                <p className="text-xl text-light leading-relaxed">{t.results.closing.text1}</p>
                <p className="text-xl text-light leading-relaxed">{t.results.closing.text2}</p>
                <p className="text-2xl text-light font-bold mt-8">{t.results.closing.highlight}</p>
              </div>
            </div>
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
