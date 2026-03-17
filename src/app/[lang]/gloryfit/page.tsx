  import { getDictionary } from '@/lib/getDictionary'
  import Navbar from "@/components/navbar/Navbar";
  import ScrollToTop from "@/components/fxscripts/scroll-to-top";
  import Footer from "@/components/footer/Footer";
  import CaseStudyLayout from "@/components/case-study/CaseStudyLayout";
import ProseSection from "@/components/case-study/ProseSection";
  import ImageBreakout from "@/components/sections/ImageBreakout";
  import InsightCard from "@/components/sections/InsightCard";
  import SectionNav from "@/components/case-study/SectionNav";
  import FadeOnScroll from "@/components/fxscripts/FadeOnScroll";
    
  export const metadata = {
    title: "GloryFit | App de entrenamiento personalizado | Lautaro R. Temperini",
    description:
      "Rediseño UX/UI de app fitness para smartwatch Q18: rutinas personalizadas basadas en datos biométricos con onboarding que genera confianza.",
    keywords:
      "GloryFit, UX/UI, smartwatch Q18, diseño de experiencia, rutinas personalizadas, datos biométricos, onboarding, confianza, Lautaro Temperini, fitness app, caso de estudio",
    alternates: {
      canonical: '/gloryfit',
    },
    openGraph: {
      title: "GloryFit | App de entrenamiento personalizado | Lautaro R. Temperini",
      description:
        "App de fitness diseñada para personalizar rutinas según datos biométricos. Un enfoque estratégico de UX/UI que reduce fricción y construye confianza desde el primer uso.",
      url: "https://temperini.vercel.app/gloryfit",
      siteName: "Temperini Portfolio",
      locale: "es_AR",
      type: "website",
      images: [
        {
          url: "https://temperini.vercel.app/images/gloryfit-logo.png",
          width: 1200,
          height: 630,
          alt: "GloryFit - App de entrenamiento",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "GloryFit | App de entrenamiento personalizado | Lautaro R. Temperini",
      description:
        "Diseño UX/UI para una app de entrenamiento inteligente. Rutinas adaptadas, onboarding progresivo y decisiones basadas en datos reales de usuarios.",
      images: ["https://temperini.vercel.app/images/gloryfit-logo.png"],
    },
  };

  /**
   * Página de GloryFit localizada - Diseño editorial tipo Medium
   * @param params - Parámetros de la ruta, incluye lang (es | en)
   */
  export default async function GloryFitPage({
    params,
  }: {
    params: Promise<{ lang: string }>
  }) {
    // Await params en Next.js 15
    const { lang: langParam } = await params
    const lang = (langParam === 'es' || langParam === 'en') ? langParam : 'es'
    const dict = await getDictionary(lang)
    const t = (dict as any).projectPages?.gloryfit || {
      hero: { title: "GLORYFIT", subtitle: "Rutinas personalizadas a partir de tus datos", description: "" },
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
      challenge: { title: "El reto", text1: "", text2: "", text3: "" },
      research: { title: "Investigación y descubrimiento", text1: "", text2: "" },
      strategy: { title: "Estrategia de diseño", text1: "", text2: "", moment1: "", moment2: "" },
      system: { title: "El sistema detrás", text1: "", text2: "", examples: [] },
      experience: { title: "Diseño de experiencia", text1: "", visualSystem: "", visualSystemText: "", components: [] },
      iterations: { title: "Iteraciones y validación", text1: "", text2: "", result: "" },
      validation: { title: "Validación y feedback", text: "" },
      conclusion: { title: "Conclusión", subtitle: "", text: "" },
      learnings: []
    }

    return (
      <>
        <Navbar dict={dict} lang={lang} />
        <div className="relative z-[20]">
        <main style={{ transform: 'none' }} className="[&>*]:!transform-none">
          <SectionNav sections={[
            { id: "reto" },
            { id: "investigacion" },
            { id: "estrategia" },
            { id: "sistema" },
            { id: "iteraciones" },
            { id: "conclusion" },
          ]} />
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
              <p className="text-base md:text-lg text-[#F1F1F1] leading-relaxed">
                {t.hero.description}
              </p>
            </section>
          </FadeOnScroll>

          {/* Snapshot top (como en Dígito) */}
          <FadeOnScroll delay={80}>
          <section className="w-full px-8 md:px-12 lg:px-20 mb-28">
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

            {/* El reto + Mi rol en grid 2 columnas */}
            <FadeOnScroll>
            <ProseSection id="reto" className="mb-28">
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
                  <p className="mb-4">{t.challenge.text2}</p>
                  <p>{t.challenge.text3}</p>
                </div>
              </div>
            </ProseSection>

            {/* Investigación - bloque destacado */}
            <ProseSection id="investigacion" className="mb-28">
              <h2 className="text-3xl font-bold text-light mb-6">
                {t.research.title}
              </h2>
              <div className="bg-[#22C55E]/10 backdrop-blur-sm rounded-lg p-4 md:p-6 border border-[#22C55E]/30">
                <div className="prose prose-invert max-w-none text-[#F1F1F1] leading-relaxed">
                  <p className="mb-4">{t.research.text1}</p>
                  <p>{t.research.text2}</p>
                </div>
              </div>
            </ProseSection>
            </FadeOnScroll>

            <FadeOnScroll>
            <div className="w-full px-8 md:px-12 lg:px-20 mb-28">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-[#22C55E]/50 to-transparent" />
            </div>
            </FadeOnScroll>

            {/* Estrategia de diseño */}
            <FadeOnScroll>
            <ProseSection id="estrategia" className="mb-28">
              <h2 className="text-3xl font-bold text-light mb-6">
                {t.strategy.title}
              </h2>
              <div className="prose prose-invert max-w-none text-[#F1F1F1] leading-relaxed">
                <p className="mb-4">{t.strategy.text1}</p>
                <p className="mb-4">{t.strategy.text2}</p>
                <ul className="list-disc pl-5 space-y-2 mb-4">
                  <li>{t.strategy.moment1}</li>
                  <li>{t.strategy.moment2}</li>
                </ul>
              </div>
            </ProseSection>
            </FadeOnScroll>

            {/* User Flow */}
            <FadeOnScroll>
            <ImageBreakout
              src="/images/gloryfitImages/UserFlow.webp"
              alt={lang === "es" ? "User Flow de GloryFit: diagrama del proceso de configuración y personalización de rutinas en la app" : "GloryFit user flow: diagram of the configuration and personalization process for routines in the app"}
              width={1200}
              height={800}
              border={false}
              priority={true}
              imageClassName="object-contain bg-[#F2F2F2]"
            />
            </FadeOnScroll>

            {/* El sistema detrás + Diseño de experiencia en grid */}
            <FadeOnScroll>
            <ProseSection id="sistema" className="mb-28">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="prose prose-invert max-w-none text-[#F1F1F1] leading-relaxed">
                  <h3 className="text-2xl font-semibold text-light mb-4">
                    {t.system.title}
                  </h3>
                  <p className="mb-4">{t.system.text1}</p>
                  <ul className="list-disc pl-5 space-y-2 mb-4">
                    {t.system.examples.map((example: string, index: number) => (
                      <li key={index}>{example}</li>
                    ))}
                  </ul>
                  <p>{t.system.text2}</p>
                </div>
                <div
                  id="experiencia"
                  className="prose prose-invert max-w-none text-[#F1F1F1] leading-relaxed"
                >
                  <h3 className="text-2xl font-semibold text-light mb-4">
                    {t.experience.title}
                  </h3>
                  <p className="mb-4">{t.experience.text1}</p>
                  <ul className="list-disc pl-5 space-y-2 mb-4">
                    {t.experience.components.map((component: string, index: number) => (
                      <li key={index}>{component}</li>
                    ))}
                  </ul>
                  <h4 className="text-lg font-semibold text-light mb-2">
                    {t.experience.visualSystem}
                  </h4>
                  <p>{t.experience.visualSystemText}</p>
                </div>
              </div>
            </ProseSection>
            </FadeOnScroll>

            {/* Style Guide */}
            <FadeOnScroll>
            <ImageBreakout
              src="/images/gloryfitImages/StyleTile.webp"
              alt={lang === "es" ? "Style Tile de GloryFit: paleta de colores, tipografía, componentes de interfaz e iconografía de la app" : "GloryFit style tile: color palette, typography, UI components and app iconography"}
              width={1200}
              height={800}
              shadow={true}
              border={false}
              imageClassName="object-contain bg-[#F2F2F2]"
            />
            </FadeOnScroll>

            {/* Iteraciones y validación */}
            <FadeOnScroll>
            <ProseSection id="iteraciones" className="mb-28">
              <h2 className="text-3xl font-bold text-light mb-6">
                {t.iterations.title}
              </h2>
              <div className="prose prose-invert max-w-none text-[#F1F1F1] leading-relaxed">
                <p className="mb-4">{t.iterations.text1}</p>
                <p className="mb-4">{t.iterations.text2}</p>
                <p className="font-semibold text-light">
                  {t.iterations.result}
                </p>
              </div>
            </ProseSection>
            </FadeOnScroll>

            {/* Validación y feedback */}
            <FadeOnScroll>
            <ProseSection className="mb-28">
              <h2 className="text-3xl font-bold text-light mb-6">
                {t.validation.title}
              </h2>
              <div className="prose prose-invert max-w-none text-[#F1F1F1] leading-relaxed">
                <p>{t.validation.text}</p>
              </div>
            </ProseSection>
            </FadeOnScroll>

            {/* Cards GloryFit */}
            <FadeOnScroll>
            <ImageBreakout
              src="/images/gloryfitImages/CardsGloryfit.webp"
              alt={lang === "es" ? "Pantallas de selección y detalles de rutina personalizada en GloryFit" : "GloryFit selection screens and personalized routine details"}
              width={1200}
              height={800}
              border={false}
              shadow={true}
              imageClassName="object-contain bg-[#F2F1F1]"
            />
            </FadeOnScroll>

            {/* Aprendizajes clave */}
            <FadeOnScroll>
            <ProseSection className="mb-28">
              <h2 className="text-3xl font-bold text-light mb-8">
                {lang === "es" ? "Aprendizajes clave" : "Key learnings"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {t.learnings.map((learning: { title: string; text: string }, index: number) => (
                  <InsightCard key={index} title={learning.title}>
                    {learning.text}
                  </InsightCard>
                ))}
              </div>
            </ProseSection>
            </FadeOnScroll>

            <FadeOnScroll>
            <div className="w-full px-8 md:px-12 lg:px-20 mb-28">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-[#22C55E]/50 to-transparent" />
            </div>
            </FadeOnScroll>

            {/* Conclusión - bloque destacado */}
            <FadeOnScroll>
            <ProseSection id="conclusion" className="mb-28">
              <h2 className="text-3xl font-bold text-light mb-6">
                {t.conclusion.title}
              </h2>
              <div className="bg-[#22C55E]/10 backdrop-blur-sm rounded-lg p-4 md:p-6 border border-[#22C55E]/30">
                <div className="prose prose-invert max-w-none text-[#F1F1F1] leading-relaxed">
                  <p className="text-lg font-semibold text-light mb-4">
                    {t.conclusion.subtitle}
                  </p>
                  <p className="text-xl">{t.conclusion.text}</p>
                </div>
              </div>
            </ProseSection>
            </FadeOnScroll>
          </CaseStudyLayout>
        </main>
        <Footer dict={dict} lang={lang} />
        <ScrollToTop size={48} />
        </div>
      </>
    );
  }
