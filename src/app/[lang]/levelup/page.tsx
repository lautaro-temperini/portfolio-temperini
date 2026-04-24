import { headers } from "next/headers"
import { getDictionary } from '@/lib/getDictionary'
import Navbar from "@/components/navbar/Navbar"
import ScrollToTop from "@/components/fxscripts/scroll-to-top"
import Footer from "@/components/footer/Footer"
import CaseStudyLayout from "@/components/case-study/CaseStudyLayout"
import ProseSection from "@/components/case-study/ProseSection"
import ImageBreakout from "@/components/sections/ImageBreakout"
import InsightCard from "@/components/sections/InsightCard"
import SectionNav from "@/components/case-study/SectionNav"
import FadeOnScroll from "@/components/fxscripts/FadeOnScroll"

const SITE_URL = "https://temperini.vercel.app"
const PUBLISHED_DATE = "2026-01-20"

export const metadata = {
  title: "LevelUp | Gaming Editorial Redesign | Case Study | Lautaro Temperini",
  description:
    "Rediseñé la experiencia editorial de LevelUp con personalización y geosegmentación inteligente. Transformé un portal genérico en experiencia relevante para el público gamer de Latinoamérica. 2026.",
  keywords: [
    "gaming editorial UX",
    "editorial redesign case study",
    "personalization UX",
    "geosegmentation design",
    "product designer Buenos Aires",
    "LatAm gaming design",
    "content platform UX",
  ],
  authors: [{ name: "Lautaro Temperini", url: SITE_URL }],
  creator: "Lautaro Temperini",
  alternates: {
    canonical: `${SITE_URL}/levelup`,
    languages: {
      'es': `${SITE_URL}/es/levelup`,
      'en': `${SITE_URL}/en/levelup`,
      'x-default': `${SITE_URL}/es/levelup`,
    }
  },
  openGraph: {
    title: "LevelUp | Gaming Editorial Redesign | Case Study by Lautaro Temperini",
    description:
      "Rediseño de portal editorial gamer con personalización por preferencias y geosegmentación. Transformé un portal genérico en experiencia relevante para Latinoamérica. Buenos Aires, 2026.",
    url: `${SITE_URL}/levelup`,
    siteName: "Temperini Portfolio",
    locale: "es_AR",
    type: "article",
    publishedTime: `${PUBLISHED_DATE}T00:00:00Z`,
    modifiedTime: `${PUBLISHED_DATE}T00:00:00Z`,
    authors: ["Lautaro Temperini"],
    images: [
      {
        url: `${SITE_URL}/images/levelup-logo.png`,
        width: 800,
        height: 600,
        alt: "LevelUp gaming editorial redesign case study",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LevelUp | Gaming Editorial Redesign | Case Study",
    description:
      "Rediseño editorial con personalización y geosegmentación para el público gamer de Latinoamérica.",
    images: [`${SITE_URL}/images/levelup-logo.png`],
  },
}

const jsonLdLevelup = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TechArticle",
      "@id": `${SITE_URL}/levelup#article`,
      "headline": "LevelUp: Rediseño Editorial con Personalización y Geosegmentación",
      "description": "Transformé un portal editorial genérico en una experiencia relevante para el público gamer de Latinoamérica mediante personalización y geosegmentación.",
      "author": {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        "name": "Lautaro Temperini",
        "url": SITE_URL,
        "jobTitle": "Product Designer",
        "sameAs": [
          "https://www.linkedin.com/in/lautaro-temperini/",
          "https://github.com/lautaro-temperini",
        ],
      },
      "datePublished": PUBLISHED_DATE,
      "dateModified": PUBLISHED_DATE,
      "url": `${SITE_URL}/levelup`,
      "mainEntityOfPage": { "@type": "WebPage", "@id": `${SITE_URL}/levelup` },
      "inLanguage": "es-AR",
      "keywords": ["gaming", "editorial design", "personalization", "UX design", "product design", "case study"],
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Portfolio", "item": SITE_URL },
        { "@type": "ListItem", "position": 2, "name": "LevelUp", "item": `${SITE_URL}/levelup` },
      ],
    },
  ],
}

export default async function LevelUpPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang: langParam } = await params
  const lang = (langParam === 'es' || langParam === 'en') ? langParam : 'es'
  const dict = await getDictionary(lang)
  const headersList = await headers()
  const nonce = headersList.get("x-nonce") || ""
  const t = (dict as any).projectPages?.levelup || {
    hero: { title: "LEVEL UP", subtitle: "", description: "" },
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
    myRole: { title: "Mi rol", description: "" },
    challenge: { title: "El Desafío", text1: "", text2: "" },
    problem: { title: "El Problema", text: "", quote: "", quoteAuthor: "" },
    insight: { title: "Insight Estratégico", text: "", proposal: "" },
    vision: {
      title: "Visión del Sistema",
      text: "",
      passive: { title: "", text: "" },
      active: { title: "", text: "" },
    },
    proposal: { title: "Mi propuesta inicial", items: [] as string[] },
    finalVersion: { title: "La versión final implementada", items: [] as string[] },
    learnings: [] as { title: string; text: string }[],
    reflection: { title: "Reflexión Final", text: "" },
    conclusion: { title: "Conclusión", subtitle: "", text: "" },
    decisionsTitle: "Decisiones de diseño",
    proposalIntro: "",
    finalVersionIntro: "",
  }

  return (
    <>
      <script
        nonce={nonce}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdLevelup) }}
        suppressHydrationWarning
      />
      <Navbar dict={dict} lang={lang} />
      <div className="relative z-[20]">
        <main className="[&>*]:!transform-none">
          <SectionNav
            sections={[
              { id: "desafio", label: t.challenge.title },
              { id: "problema", label: t.problem.title },
              { id: "insight", label: t.insight.title },
              { id: "sistema", label: t.vision.title },
              { id: "propuesta", label: t.decisionsTitle },
              {
                id: "aprendizajes",
                label:
                  lang === "es" ? "Aprendizajes clave" : "Key learnings",
              },
              { id: "reflexion", label: t.reflection.title },
            ]}
          />
          <CaseStudyLayout>
            {/* Hero Section - mismo padding top que Dígito */}
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

            {/* Snapshot top (una columna, estilo Dígito) */}
            <FadeOnScroll delay={80}>
            <section className="w-full px-8 md:px-12 lg:px-20 mb-20">
              <div className="text-sm text-light/80 space-y-2">
                <div>
                  <span className="text-light/70 font-semibold">
                    {t.snapshotTop.companyLabel}
                  </span>{" "}
                  · {t.snapshotTop.companyValue}
                </div>

                <div>
                  <span className="text-light/70 font-semibold">
                    {t.snapshotTop.roleLabel}
                  </span>{" "}
                  · {t.snapshotTop.roleValue}
                </div>

                <div>
                  <span className="text-light/70 font-semibold">
                    {t.snapshotTop.timelineLabel}
                  </span>{" "}
                  · {t.snapshotTop.timelineValue}
                </div>

                <div>
                  <span className="text-light/70 font-semibold">
                    {t.snapshotTop.scopeLabel}
                  </span>{" "}
                  · {t.snapshotTop.scopeValue}
                </div>

                <div>
                  <span className="text-light/70 font-semibold">
                    {t.snapshotTop.problemLabel}
                  </span>{" "}
                  · {t.snapshotTop.problemValue}
                </div>
              </div>
            </section>
            </FadeOnScroll>

            {/* El Desafío + Mi rol en grid */}
            <FadeOnScroll>
            <ProseSection id="desafio" className="mb-20">
              <h2 className="text-3xl font-bold text-light mb-6">{t.challenge.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-10 md:gap-6">
                <div className="prose prose-invert max-w-none text-[#F1F1F1] leading-relaxed">
                  <h3 className="text-2xl font-semibold text-light mb-4">
                    {t.myRole.title}
                  </h3>
                  <ul className="space-y-2 text-[#F1F1F1]">
                    {t.myRole.description.split(" • ").filter(Boolean).map((item: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-light/40 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="prose prose-invert max-w-none text-[#F1F1F1] leading-relaxed">
                  <h3 className="text-2xl font-semibold text-light mb-4">
                    {t.challenge.title}
                  </h3>
                  <p className="mb-4">{t.challenge.text1}</p>
                  <p>{t.challenge.text2}</p>
                </div>
              </div>
            </ProseSection>
            </FadeOnScroll>

            {/* El Problema */}
            <FadeOnScroll>
            <ProseSection id="problema" className="mb-20">
              <h2 className="text-3xl font-bold text-light mb-6">{t.problem.title}</h2>
              <div className="prose prose-invert max-w-none text-[#F1F1F1] leading-relaxed">
                <h3 className="text-2xl font-semibold text-light mb-4">
                  {t.problem.text}
                </h3>
                {t.problem.quote && (
                  <blockquote className="text-[#F1F1F1] italic border-l-4 border-red-500 pl-4">
                    {t.problem.quote}
                    {t.problem.quoteAuthor && (
                      <>
                        <br />
                        <span className="text-light font-semibold">{t.problem.quoteAuthor}</span>
                      </>
                    )}
                  </blockquote>
                )}
              </div>
            </ProseSection>
            </FadeOnScroll>

            {/* Insight Estratégico */}
            <FadeOnScroll>
            <ProseSection id="insight" className="mb-20">
              <h2 className="text-3xl font-bold text-light mb-6">{t.insight.title}</h2>
              <div className="prose prose-invert max-w-none text-[#F1F1F1] leading-relaxed">
                <h3 className="text-2xl font-semibold text-light mb-4">
                  {t.insight.text}
                </h3>
                <div className="bg-[#EA580C]/10 backdrop-blur-sm rounded-lg p-4 border border-[#EA580C]/30">
                  <p className="text-light font-semibold text-xl text-center">
                    {t.insight.proposal}
                  </p>
                </div>
              </div>
            </ProseSection>
            </FadeOnScroll>

            <FadeOnScroll>
            <div className="w-full px-8 md:px-12 lg:px-20 mb-20">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-[#EA580C]/50 to-transparent" />
            </div>
            </FadeOnScroll>

            {/* Visión del Sistema */}
            <FadeOnScroll>
            <ProseSection id="sistema" className="mb-20">
              <h2 className="text-3xl font-bold text-light mb-6">{t.vision.title}</h2>
              <div className="prose prose-invert max-w-none text-[#F1F1F1] leading-relaxed">
                <p className="mb-4">{t.vision.text}</p>
                <div className="space-y-4">
                  <div className="bg-[#EA580C]/10 backdrop-blur-sm rounded-lg p-4 border border-[#EA580C]/30">
                    <h4 className="font-semibold text-light mb-2">{t.vision.passive.title}</h4>
                    <p className="text-[#F1F1F1] text-sm">
                      {t.vision.passive.text}
                    </p>
                  </div>
                  <div className="bg-[#EA580C]/10 backdrop-blur-sm rounded-lg p-4 border border-[#EA580C]/30">
                    <h4 className="font-semibold text-light mb-2">{t.vision.active.title}</h4>
                    <p className="text-[#F1F1F1] text-sm">
                      {t.vision.active.text}
                    </p>
                  </div>
                </div>
              </div>
            </ProseSection>
            </FadeOnScroll>

            {/* Decisiones de diseño: propuesta inicial + versión final */}
            <FadeOnScroll>
            <ProseSection id="propuesta" className="mb-20">
              <h2 className="text-3xl font-bold text-light mb-6">{t.decisionsTitle}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Mi propuesta inicial */}
                <div className="prose prose-invert max-w-none text-[#F1F1F1] leading-relaxed">
                  <h3 className="text-2xl font-semibold text-light mb-4">
                    {t.proposal.title}
                  </h3>
                  <p className="mb-6">
                    {t.proposalIntro}
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    {t.proposal.items.map((item: string, idx: number) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>

                {/* La versión final implementada */}
                <div className="prose prose-invert max-w-none text-[#F1F1F1] leading-relaxed">
                  <h3 className="text-2xl font-semibold text-light mb-4">
                    {t.finalVersion.title}
                  </h3>
                  <p className="mb-6">
                    {t.finalVersionIntro}
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    {t.finalVersion.items.map((item: string, idx: number) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </ProseSection>
            </FadeOnScroll>

            <FadeOnScroll>
            <div className="w-full px-8 md:px-12 lg:px-20 mb-20">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-[#EA580C]/50 to-transparent" />
            </div>
            </FadeOnScroll>

            {/* Aprendizajes clave */}
            <FadeOnScroll>
            <ProseSection id="aprendizajes" className="mb-20">
              <h2 className="text-3xl font-bold text-light mb-8">
                Aprendizajes clave
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {t.learnings.map(
                  (learning: { title: string; text: string }, idx: number) => (
                    <InsightCard key={idx} title={learning.title}>
                      {learning.text}
                    </InsightCard>
                  )
                )}
              </div>
            </ProseSection>
            </FadeOnScroll>

            {/* Reflexión Final */}
            <FadeOnScroll>
            <ProseSection id="reflexion" className="mb-20">
              <h2 className="text-3xl font-bold text-light mb-6">
                {t.reflection.title}
              </h2>
              <div className="prose prose-invert max-w-none text-[#F1F1F1] leading-relaxed">
                <p>{t.reflection.text}</p>
              </div>
            </ProseSection>
            </FadeOnScroll>

            {/* Conclusión - bloque destacado como GloryFit */}
            <FadeOnScroll>
            <div className="w-full px-8 md:px-12 lg:px-20 mb-20">
              <div className="bg-[#EA580C]/10 backdrop-blur-sm rounded-lg p-4 md:p-6 border border-[#EA580C]/30">
                <div className="prose prose-invert max-w-none text-[#F1F1F1] leading-relaxed">
                  <h2 className="text-3xl font-bold text-light mb-6">
                    {t.conclusion.title}
                  </h2>
                  <div className="space-y-4">
                    <p className="text-lg font-semibold text-light">
                      {t.conclusion.subtitle}
                    </p>
                    <p className="text-xl">
                      {t.conclusion.text}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            </FadeOnScroll>
          </CaseStudyLayout>
        </main>
        <Footer dict={dict} lang={lang} />
        <ScrollToTop size={48} />
      </div>
    </>
  )
}
