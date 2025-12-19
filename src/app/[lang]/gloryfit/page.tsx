  import { getDictionary } from '@/lib/getDictionary'
  import Navbar from "@/components/navbar/Navbar";
  import ScrollToTop from "@/components/fxscripts/scroll-to-top";
  import Footer from "@/components/footer/Footer";
  import CaseStudyLayout from "@/components/case-study/CaseStudyLayout";
  import ProseSection from "@/components/case-study/ProseSection";
  import ImageBreakout from "@/components/sections/ImageBreakout";
  import InsightCard from "@/components/sections/InsightCard";
    
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
        <div className="page-transition">
          <main className="pt-16 md:pt-20 lg:pt-24">
          <CaseStudyLayout>
          {/* Hero Section - 60vh */}
          <section className="w-full h-[60vh] flex items-center justify-center">
            <div className="w-full lg:w-3/5 lg:mx-auto px-4 md:px-6 lg:px-12">
              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold leading-tight text-light mb-6">
                {t.hero.title}
              </h1>
              <p className="text-xl md:text-2xl font-semibold text-light mb-4">
                {t.hero.subtitle}
              </p>
              <p className="text-base md:text-lg text-[#F1F1F1] leading-relaxed">
                {t.hero.description}
              </p>
            </div>
          </section>

          {/* Mi rol - Sin contenedor */}
          <div className="w-full lg:w-3/5 lg:mx-auto px-4 md:px-6 lg:px-12 mb-16">
            <div className="prose prose-invert max-w-none text-[#F1F1F1] leading-relaxed">
              <p>{t.myRole.description}</p>
            </div>
          </div>

            {/* El reto */}
            <ProseSection className="mb-16">
              <h2 className="text-3xl font-bold text-light mb-6">
                {t.challenge.title}
              </h2>
              <div className="prose prose-invert max-w-none text-[#F1F1F1] leading-relaxed">
                <p className="mb-4">{t.challenge.text1}</p>
                <p className="mb-4">{t.challenge.text2}</p>
                <p>{t.challenge.text3}</p>
              </div>
            </ProseSection>

            {/* Investigación */}
            <ProseSection className="mb-16">
              <h2 className="text-3xl font-bold text-light mb-6">
                {t.research.title}
              </h2>
              <div className="prose prose-invert max-w-none text-[#F1F1F1] leading-relaxed">
                <p className="mb-4">{t.research.text1}</p>
                <p>{t.research.text2}</p>
              </div>
            </ProseSection>

            {/* Estrategia de diseño */}
            <ProseSection className="mb-16">
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

            {/* User Flow */}
            <ImageBreakout
              src="/images/gloryfitImages/UserFlow.webp"
              alt="User Flow de GloryFit: diagrama del proceso de configuración y personalización de rutinas en la app"
              width={1200}
              height={800}
              border={false}
            />

            {/* El sistema detrás */}
            <ProseSection className="mb-16">
              <h2 className="text-3xl font-bold text-light mb-6">
                {t.system.title}
              </h2>
              <div className="prose prose-invert max-w-none text-[#F1F1F1] leading-relaxed">
                <p className="mb-4">{t.system.text1}</p>
                <ul className="list-disc pl-5 space-y-2 mb-4">
                  {t.system.examples.map((example: string, index: number) => (
                    <li key={index}>{example}</li>
                  ))}
                </ul>
                <p>{t.system.text2}</p>
              </div>
            </ProseSection>

            {/* Diseño de experiencia */}
            <ProseSection className="mb-16">
              <h2 className="text-3xl font-bold text-light mb-6">
                {t.experience.title}
              </h2>
              <div className="prose prose-invert max-w-none text-[#F1F1F1] leading-relaxed">
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
            </ProseSection>

            {/* Style Guide */}
            <ImageBreakout
              src="/images/gloryfitImages/StyleTile.webp"
              alt="Style Tile de GloryFit: paleta de colores, tipografía, componentes de interfaz e iconografía de la app"
              width={1200}
              height={800}
              shadow={true}
            />

            {/* Iteraciones y validación */}
            <ProseSection className="mb-16">
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

            {/* Cards GloryFit */}
            <ImageBreakout
              src="/images/gloryfitImages/CardsGloryfit.webp"
              alt="Pantallas de selección y detalles de rutina personalizada en GloryFit"
              width={1200}
              height={800}
              border={false}
              shadow={true}
            />

            {/* Aprendizajes clave */}
            <ProseSection className="mb-16">
              <h2 className="text-3xl font-bold text-light mb-8">
                Aprendizajes clave
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {t.learnings.map((learning: { title: string; text: string }, index: number) => (
                  <InsightCard key={index} title={learning.title}>
                    {learning.text}
                  </InsightCard>
                ))}
              </div>
            </ProseSection>

            {/* Validación y feedback */}
            <ProseSection className="mb-16">
              <h2 className="text-3xl font-bold text-light mb-6">
                {t.validation.title}
              </h2>
              <div className="prose prose-invert max-w-none text-[#F1F1F1] leading-relaxed">
                <p>{t.validation.text}</p>
              </div>
            </ProseSection>

            {/* Conclusión */}
            <ProseSection className="mb-16">
              <h2 className="text-3xl font-bold text-light mb-6">
                {t.conclusion.title}
              </h2>
              <div className="prose prose-invert max-w-none text-[#F1F1F1] leading-relaxed">
                <p className="text-lg font-semibold text-light mb-4">
                  {t.conclusion.subtitle}
                </p>
                <p className="text-xl">{t.conclusion.text}</p>
              </div>
            </ProseSection>
          </CaseStudyLayout>
        </main>
        <Footer dict={dict} lang={lang} />
        <ScrollToTop size={48} />
        </div>
      </>
    );
  }
