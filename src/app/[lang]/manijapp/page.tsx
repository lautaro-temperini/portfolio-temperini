import { headers } from "next/headers"
import { getDictionary } from "@/lib/getDictionary"
import Navbar from "@/components/navbar/Navbar"
import ScrollToTop from "@/components/fxscripts/scroll-to-top"
import Footer from "@/components/footer/Footer"
import { GridContainer } from "@/components/sections/GridContainer"
import { Block } from "@/components/sections/Block"
import FadeOnScroll from "@/components/fxscripts/FadeOnScroll"
import SectionNav from "@/components/case-study/SectionNav"
import DevImage from "@/components/DevImage"
import NextCaseStudy from "@/components/case-study/NextCaseStudy"

const SITE_URL = "https://temperini.vercel.app"
const PUBLISHED_DATE = "2026-04-24"

export const metadata = {
  title: "Manijapp: Underground Event Discovery MVP | Validation Case Study | Lautaro Temperini",
  description:
    "MVP independiente para discovery de eventos alternativos en CABA y La Plata. Tres ciclos de validación en producción, validación comunitaria visible y geolocalización. Product design case study, 2026.",
  keywords: [
    "product design case study",
    "event discovery UX",
    "marketplace design validation",
    "two-sided marketplace design",
    "spec-driven AI development",
    "wizard of oz prototyping",
    "product designer Buenos Aires",
  ],
  authors: [{ name: "Lautaro Temperini", url: SITE_URL }],
  creator: "Lautaro Temperini",
  alternates: {
    canonical: `${SITE_URL}/manijapp`,
    languages: {
      es: `${SITE_URL}/es/manijapp`,
      en: `${SITE_URL}/en/manijapp`,
      "x-default": `${SITE_URL}/es/manijapp`,
    },
  },
  openGraph: {
    title: "Manijapp: Underground Event Discovery MVP | Case Study by Lautaro Temperini",
    description:
      "Discovery de eventos alternativos en CABA y La Plata. Tres ciclos de validación en producción. Buenos Aires, 2026.",
    url: `${SITE_URL}/manijapp`,
    siteName: "Temperini Portfolio",
    locale: "es_AR",
    type: "article",
    publishedTime: `${PUBLISHED_DATE}T00:00:00Z`,
    modifiedTime: `${PUBLISHED_DATE}T00:00:00Z`,
    authors: ["Lautaro Temperini"],
    images: [
      {
        url: `${SITE_URL}/images/manijappImages/manijapp-hero.webp`,
        width: 1200,
        height: 630,
        alt: "Manijapp case study: underground event discovery MVP in Buenos Aires",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Manijapp: Underground Event Discovery MVP | Case Study",
    description:
      "MVP independiente para discovery de eventos alternativos. Validación comunitaria visible, tres ciclos en producción.",
    images: [`${SITE_URL}/images/manijappImages/manijapp-hero.webp`],
  },
}

const jsonLdManijapp = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TechArticle",
      "@id": `${SITE_URL}/manijapp#article`,
      headline: "Manijapp: MVP de Discovery para Eventos Alternativos en CABA y La Plata",
      description:
        "MVP independiente con validación comunitaria visible y geolocalización. Tres ciclos de validación en producción para discovery de eventos alternativos.",
      author: {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: "Lautaro Temperini",
        url: SITE_URL,
        jobTitle: "Product Designer",
        sameAs: [
          "https://www.linkedin.com/in/lautaro-temperini/",
          "https://github.com/lautaro-temperini",
        ],
      },
      datePublished: PUBLISHED_DATE,
      dateModified: PUBLISHED_DATE,
      url: `${SITE_URL}/manijapp`,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${SITE_URL}/manijapp`,
      },
      image: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/manijappImages/manijapp-hero.webp`,
        width: 1200,
        height: 630,
      },
      inLanguage: "es-AR",
      keywords: [
        "product design",
        "case study",
        "event discovery",
        "marketplace design",
        "UX validation",
        "spec-driven development",
        "wizard of oz",
        "Argentina",
      ],
      about: {
        "@type": "SoftwareApplication",
        name: "Manijapp",
        description:
          "MVP independiente para discovery de eventos alternativos en CABA y La Plata, con validación comunitaria visible y geolocalización",
        applicationCategory: "EntertainmentApplication",
        operatingSystem: "Web",
        url: "https://manijapp.vercel.app",
      },
      mentions: [
        {
          "@type": "Thing",
          name: "Spec-Driven AI Development",
          description:
            "Proceso de escribir una especificación de producto antes de ejecutar con agentes de IA, para evitar que la IA tome decisiones de diseño por defecto.",
        },
        {
          "@type": "Thing",
          name: "Wizard of Oz Prototyping",
          description:
            "Metodología de validación donde el backend se simula manualmente (Google Sheets) mientras los usuarios interactúan con un frontend real.",
        },
        {
          "@type": "Thing",
          name: "Community Validation UX Pattern",
          description:
            "Patrón UI que separa reputación de venue (estrellas) de calidad de evento (pulgares) como señales de confianza en marketplaces de discovery.",
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Lautaro Temperini Portfolio",
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Manijapp Case Study",
          item: `${SITE_URL}/manijapp`,
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "¿Qué es Manijapp?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Manijapp es un MVP independiente para discovery de eventos alternativos en CABA y La Plata. Combina validación comunitaria visible (estrellas para venue, pulgares para evento) y geolocalización, con foco en eventos fuera del circuito tradicional que hoy solo circulan por Instagram, WhatsApp y boca a boca.",
          },
        },
        {
          "@type": "Question",
          name: "¿Cuál es el insight central del producto?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "El problema no es encontrar más eventos. Es identificar cuáles valen la pena. La fricción está en la curaduría y la confianza, no en la disponibilidad. Eso redefine el producto: deja de ser un problema de aggregation y pasa a ser uno de curaduría con validación comunitaria.",
          },
        },
        {
          "@type": "Question",
          name: "¿Qué metodología de validación se usó?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Tres ciclos encadenados de validación en producción. Ciclo 1: 17 contactos, 5 sesiones, señal invalidada por variables cambiantes. Ciclo 2: 89 usuarios activos con variables fijas, primer evento orgánico publicado, retención 7.9% a 7 días. Ciclo 3: experimento de seeding (13% vs 6.25% interacción con/sin), saturación de canal pero mejora cualitativa (4 páginas/sesión, 78% scroll, 1m 30s).",
          },
        },
        {
          "@type": "Question",
          name: "¿Qué es Spec-Driven Development en este contexto?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Es el proceso de escribir una especificación clara antes de ejecutar con agentes de IA. Sin esa capa, la IA completa los vacíos y define el producto en lugar del diseñador: copy que no comunica, jerarquía sin lógica, estados indefinidos. La especificación permite dirigir al agente en lugar de dejar que el agente dirija — y evita contaminar los datos de validación con defaults del generador.",
          },
        },
        {
          "@type": "Question",
          name: "¿Por qué empezar sin backend?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Para no escalar infraestructura sin validación. El formulario de publicación existía desde el día uno: los eventos llegaban a un Google Sheet y la publicación la hacía Lautaro manualmente (Wizard of Oz). El trigger para construir backend real fue concreto: aparecieron eventos de organizadores reales y los datos simulados dejaron de ser neutrales.",
          },
        },
        {
          "@type": "Question",
          name: "¿Quién diseñó y construyó Manijapp?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Lautaro Temperini, Product Designer en Buenos Aires. Lideró estrategia, UX/UI, discovery y métricas a través del ciclo de vida del MVP. Su contexto previo como DJ con red directa en la escena underground de CABA y La Plata redujo la fricción inicial del lado oferta del marketplace.",
          },
        },
      ],
    },
  ],
}

export default async function ManijappPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang: langParam } = await params
  const lang = langParam === "es" || langParam === "en" ? langParam : "es"
  const dict = await getDictionary(lang)
  const headersList = await headers()
  const nonce = headersList.get("x-nonce") || ""

  const es = lang === "es"

  return (
    <>
      <script
        nonce={nonce}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdManijapp) }}
        suppressHydrationWarning
      />
      <Navbar dict={dict} lang={lang} />
      <div className="relative z-[20]">
        <main className="[&>*]:!transform-none">
          {/* ---- Navegación lateral con puntos ---- */}
          <SectionNav
            sections={[
              { id: "problema", label: es ? "El problema" : "The problem" },
              { id: "metodologia", label: es ? "Metodología" : "Methodology" },
              { id: "backend", label: es ? "Del Concierge al backend" : "From Concierge to backend" },
              { id: "benchmarking", label: "Benchmarking" },
              { id: "validacion", label: es ? "Validación" : "Validation" },
              { id: "supply", label: "Supply" },
              { id: "cierre", label: es ? "Qué sigue" : "What's next" },
            ]}
          />

          {/* ==================== HERO ==================== */}
          <FadeOnScroll>
            <section className="w-full px-8 md:px-12 lg:px-20 pt-28 md:pt-32 lg:pt-36 mb-12">
              <div className="w-full max-w-7xl">
                <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold leading-tight text-light mb-4">
                  MANIJAPP
                </h1>
                <p className="text-xl md:text-2xl font-semibold text-light mb-3">
                  {es
                    ? "Descubrir eventos no es el problema. El problema es saber cuáles valen la pena."
                    : "Discovering events isn't the problem. The problem is knowing which ones are worth it."}
                </p>
                <p className="text-base md:text-lg text-light leading-relaxed mb-6 max-w-5xl">
                  {es
                    ? "MVP independiente para discovery de eventos alternativos en CABA y La Plata, con validación comunitaria visible y geolocalización."
                    : "Independent MVP for alternative event discovery in Buenos Aires and La Plata, with visible community validation and geolocation."}
                </p>
                <div className="mt-6">
                  <a
                    href="https://manijapp.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-[#2DD4BF] hover:text-[#5EEAD4] underline underline-offset-4 transition-colors"
                  >
                    {es ? "• Ir a Manijapp ↗" : "• Visit Manijapp ↗"}
                  </a>
                </div>
              </div>
            </section>
          </FadeOnScroll>

          {/* ==================== BANNER ==================== */}
          <FadeOnScroll delay={80}>
            <section className="w-full px-8 md:px-12 lg:px-20 mb-16">
              <DevImage
  src="/images/manijappImages/manijapp-hero.webp"
                    alt={es ? "Banner Manijapp" : "Manijapp banner"}
                    width={1200}
                    height={300}
                    priority
                   className="w-full overflow-hidden rounded-lg"
  imageClassName="object-cover scale-105"
/>
            </section>
          </FadeOnScroll>

          {/* ==================== PROJECT SNAPSHOT ==================== */}
          <section className="w-full px-8 md:px-12 lg:px-20 mb-16">
            <div className="text-sm text-light/80 space-y-2">
              <div>
                <span className="text-light/70 font-semibold">{es ? "Tipo" : "Type"}</span>
                {" · "}
                {es
                  ? "MVP independiente, validación en producción"
                  : "Independent MVP, production validation"}
              </div>
              <div>
                <span className="text-light/70 font-semibold">{es ? "Rol" : "Role"}</span>
                {" · "}
                {es
                  ? "Product Designer — estrategia, UX/UI, discovery, métricas"
                  : "Product Designer — strategy, UX/UI, discovery, metrics"}
              </div>
              <div>
                <span className="text-light/70 font-semibold">Timeline</span>
                {" · "}
                {es ? "3 semanas" : "3 weeks"}
              </div>
              <div>
                <span className="text-light/70 font-semibold">Stack</span>
                {" · "}React, Cursor, Vercel, GA4, Clarity, Supabase
              </div>
              <div>
                <span className="text-light/70 font-semibold">{es ? "Estado" : "Status"}</span>
                {" · "}
                {es ? "Validación activa." : "Active validation."}
              </div>
            </div>
          </section>

          {/* ==================== DIVIDER ==================== */}
          <div className="w-full px-8 md:px-12 lg:px-20 mb-28">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-[#08A4E1]/40 to-transparent" />
          </div>

          {/* ==================== TL;DR ==================== */}
          <FadeOnScroll>
            <section className="w-full px-8 md:px-12 lg:px-20 mb-20">
              <h2 className="text-3xl md:text-4xl font-bold text-light mb-8">TL;DR</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-subtle/60 bg-container/60 p-6 md:p-8">
                  <h3 className="text-lg font-bold text-light mb-3">01. {es ? "Problema" : "Problem"}</h3>
                  <p className="text-light/80 leading-relaxed">
                    {es
                      ? "Los eventos independientes en CABA y La Plata no tienen una fuente centralizada confiable. El discovery ocurre de forma fragmentada: Instagram, WhatsApp, boca a boca."
                      : "Independent events in Buenos Aires and La Plata lack a reliable centralized source. Discovery happens in fragmented ways: Instagram, WhatsApp, word of mouth."}
                  </p>
                </div>
                <div className="rounded-2xl border border-subtle/60 bg-container/60 p-6 md:p-8">
                  <h3 className="text-lg font-bold text-light mb-3">02. Insight</h3>
                  <p className="text-light/80 leading-relaxed">
                    {es
                      ? "El problema no es encontrar más eventos, sino identificar cuáles valen la pena. La fricción está en la curaduría y la confianza, no en la disponibilidad."
                      : "The problem isn't finding more events — it's identifying which ones are worth it. The friction is in curation and trust, not availability."}
                  </p>
                </div>
                <div className="rounded-2xl border border-subtle/60 bg-container/60 p-6 md:p-8">
                  <h3 className="text-lg font-bold text-light mb-3">03. {es ? "Solución" : "Solution"}</h3>
                  <p className="text-light/80 leading-relaxed">
                    {es
                      ? "Plataforma de discovery con validación comunitaria visible, geolocalización y foco en eventos fuera del circuito tradicional."
                      : "A discovery platform with visible community validation, geolocation, and a focus on events outside the mainstream circuit."}
                  </p>
                </div>
                <div className="rounded-2xl border border-subtle/60 bg-container/60 p-6 md:p-8">
                  <h3 className="text-lg font-bold text-light mb-3">04. {es ? "Resultados" : "Results"}</h3>
                  <p className="text-light/80 leading-relaxed">
                    {es
                      ? "Señales tempranas de retención sostenidas en múltiples días, comportamiento real en todo el core loop (exploración, validación, compartir, publicación) y primeros casos de supply sin pedido explícito."
                      : "Early retention signals sustained over multiple days, real behavior across the full core loop (exploration, validation, sharing, publishing) and first cases of supply without explicit request."}
                  </p>
                </div>
              </div>
            </section>
          </FadeOnScroll>

          {/* ==================== DIVIDER ==================== */}
          <div className="w-full px-8 md:px-12 lg:px-20 mb-28">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-[#08A4E1]/40 to-transparent" />
          </div>

          {/* ==================== EL PROBLEMA ==================== */}
          <FadeOnScroll>
            <section id="problema" className="w-full px-8 md:px-12 lg:px-20 mb-20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                <div className="text-light leading-relaxed space-y-4">
                  <h2 className="text-3xl md:text-4xl font-bold text-light mb-6">
                    {es ? "El problema" : "The problem"}
                  </h2>
                  <p className="text-lg">
                    {es
                      ? "Los fines de semana en La Plata y CABA, la pregunta \"¿qué hay para hacer?\" se resuelve mal. Eventbrite tiene los eventos masivos. CulturaBA tiene la agenda oficial. Instagram tiene todo mezclado."
                      : "On weekends in La Plata and Buenos Aires, the question \"what is there to do?\" gets answered poorly. Eventbrite has the mainstream events. CulturaBA has the official calendar. Instagram has everything mixed together."}
                  </p>
                  <p className="text-lg">
                    {es
                      ? "El show underground en un espacio alternativo, la fiesta que solo circula por WhatsApp, el evento en un bar nuevo sin visibilidad — no aparecen en ninguna plataforma."
                      : "The underground show at an alternative space, the party that only circulates on WhatsApp, the event at a new bar with no visibility — none of them appear on any platform."}
                  </p>
                  <p className="text-lg">
                    {es
                      ? "La hipótesis inicial era simple: centralizar eventos cerca tuyo. Eso cambió en el primer ciclo de discovery."
                      : "The initial hypothesis was simple: centralize events near you. That changed in the first discovery cycle."}
                  </p>
                </div>

                <div className="text-light leading-relaxed space-y-4">
                  <h2 className="text-3xl md:text-4xl font-bold text-light mb-6">
                    {es ? "El insight que lo redefine" : "The insight that reframes it"}
                  </h2>
                  <p className="text-lg">
                    {es
                      ? "Con el prototipo en producción, la validación arrancó el mismo día. Cinco sesiones de guerrilla research. Tres de ellos llegaron a la misma conclusión sin que nadie se las sugiriera: el diferencial no son todos los eventos, son los que no están en ningún otro lado."
                      : "With the prototype in production, validation started the same day. Five guerrilla research sessions. Three of them reached the same conclusion without anyone suggesting it: the differentiator isn't all the events — it's the ones that aren't anywhere else."}
                  </p>
                  <p className="text-lg">
                    {es
                      ? "No querían otro Eventbrite. Querían acceso a lo que existe cerca pero está invisible, verificado, que hoy solo circula por WhatsApp."
                      : "They didn't want another Eventbrite. They wanted access to what exists nearby but is invisible — verified, currently circulating only on WhatsApp."}
                  </p>
                  <p className="text-lg font-semibold">
                    {es
                      ? "Eso redefine el producto. No es un problema de volumen. Es un problema de curaduría y confianza."
                      : "That reframes the product. It's not a volume problem. It's a curation and trust problem."}
                  </p>
                </div>
              </div>
            </section>
          </FadeOnScroll>

          {/* Mockup Explorar + Mapa */}
          <FadeOnScroll>
            <section className="w-full px-8 md:px-12 lg:px-20 mb-20">
              <DevImage
                src="/images/manijappImages/manijapp-explore-map-mockup.webp"
                alt={
                  es
                    ? "Mockup de la sección Explorar y vista de Mapa de Manijapp"
                    : "Manijapp Explore section and Map view mockup"
                }
                width={1200}
                height={675}
                caption={
                  es
                    ? "Sección Explorar y vista de Mapa"
                    : "Explore section and Map view"
                }
                className="w-full"
                imageClassName="object-cover"
              />
            </section>
          </FadeOnScroll>

          {/* ==================== DIVIDER ==================== */}
          <div className="w-full px-8 md:px-12 lg:px-20 mb-28">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-[#08A4E1]/40 to-transparent" />
          </div>

          {/* ==================== METODOLOGIA ==================== */}
          <FadeOnScroll>
            <section id="metodologia" className="w-full px-8 md:px-12 lg:px-20 mb-20">
              <div className="max-w-5xl mx-auto mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-light text-center">
                  {es
                    ? "Cómo se construyó: metodología antes que stack"
                    : "How it was built: methodology before stack"}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                <div className="text-light leading-relaxed space-y-4">
                  <h3 className="text-2xl font-semibold text-light mb-4">
                    {es ? "Construir antes que research" : "Build before research"}
                  </h3>
                  <p className="text-lg">
                    {es
                      ? "El primer trade-off fue explícito: esperar a tener mayor claridad conceptual o salir a producción con un sistema incompleto."
                      : "The first trade-off was explicit: wait for more conceptual clarity or ship to production with an incomplete system."}
                  </p>
                  <p className="text-lg">
                    {es
                      ? "La decisión fue lanzar. No por velocidad en sí misma, sino porque una interfaz genera un tipo de señal que ningún research previo puede reemplazar. Cinco conversaciones reales en 48 horas aportan más que cualquier encuesta por email."
                      : "The decision was to launch. Not for speed itself, but because an interface generates a kind of signal no prior research can replace. Five real conversations in 48 hours teach more than any email survey."}
                  </p>
                </div>

                <div className="text-light leading-relaxed space-y-4">
                  <h3 className="text-2xl font-semibold text-light mb-4">
                    {es
                      ? "El costo de saltear la especificación"
                      : "The cost of skipping the specification"}
                  </h3>
                  <p className="text-lg">
                    {es
                      ? "Sin un brief previo, la IA tomó miles de micro-decisiones que nunca pedí: copy que no comunicaba, jerarquía visual sin lógica, estados indefinidos. El costo no era solo eficiencia — era metodología. Si la UX tiene ruido de defaults del generador, los testers reaccionan a decisiones que nunca tomaste. Los datos quedan contaminados antes de empezar."
                      : "Without a prior brief, the AI made thousands of micro-decisions I never asked for: copy that didn't communicate, visual hierarchy with no logic, undefined states. The cost wasn't only efficiency — it was methodology. If the UX has noise from generator defaults, testers react to decisions you never made. The data is contaminated before you even start."}
                  </p>
                </div>
              </div>
            </section>
          </FadeOnScroll>
        {/* Spec-Driven Development - destacado */}
          <FadeOnScroll>
            <section className="w-full px-8 md:px-12 lg:px-20 mb-20">
              <div className="w-full rounded-2xl border border-[#C45200]/30 bg-gradient-to-br from-[#1C0900]/40 to-[#2D1200]/40 backdrop-blur-sm p-6 md:p-8 lg:p-10">
                <h3 className="text-2xl font-semibold text-light mb-4">
                  Spec-Driven Development
                </h3>
                <div className="text-light leading-relaxed space-y-4">
                  <p className="text-lg">
                    {es
                      ? "La corrección no fue técnica, sino de proceso. Sin una especificación clara, la IA completa los vacíos y define el producto en lugar del diseñador."
                      : "The fix wasn't technical, it was procedural. Without a clear specification, the AI fills the gaps and defines the product in place of the designer."}
                  </p>
                  <p className="text-lg">
                    {es
                      ? "El paso a un enfoque spec-driven introduce una diferencia clave: permite dirigir al agente en lugar de dejar que el agente dirija. Sin esa capa de control, la velocidad de ejecución amplifica el error y aumenta la superficie de corrección. Ese costo temprano no desaparece; se transforma en deuda técnica."
                      : "Moving to a spec-driven approach introduces a key distinction: it lets you direct the agent instead of letting the agent direct. Without that control layer, execution speed amplifies error and increases the surface to correct. That early cost doesn't disappear; it turns into technical debt."}
                  </p>
                </div>
              </div>
            </section>
          </FadeOnScroll>

          {/* ==================== DIVIDER ==================== */}
          <div className="w-full px-8 md:px-12 lg:px-20 mb-28">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-[#08A4E1]/40 to-transparent" />
          </div>

          {/* ==================== DEL CONCIERGE AL BACKEND ==================== */}
          <FadeOnScroll>
            <section id="backend" className="w-full px-8 md:px-12 lg:px-20 mb-20">
              <h2 className="text-3xl md:text-4xl font-bold text-light mb-8">
                {es ? "Del Concierge al backend" : "From Concierge to backend"}
              </h2>

              <h3 className="text-2xl font-semibold text-light mb-4">
                {es ? "Contexto" : "Context"}
              </h3>
              <div className="text-light leading-relaxed space-y-4">
                <p className="text-lg">
                  {es
                    ? "Un solo criterio rigió cada decisión técnica del proyecto: no construir infraestructura antes de tener evidencia que la justifique."
                    : "A single criterion governed every technical decision in the project: don't build infrastructure before having evidence to justify it."}
                </p>
                <p className="text-lg">
                  {es
                    ? "El formulario de publicación existía desde el día uno. Los eventos que subían los organizadores llegaban a un Google Sheet y la publicación la hacía yo manualmente — era el flujo del lado oferta."
                    : "The publishing form existed from day one. Events submitted by organizers landed in a Google Sheet and I published them manually — that was the supply-side flow."}
                </p>
                <p className="text-lg">
                  {es
                    ? "Los eventos que yo cargaba manualmente (flyers de Instagram, contactos directos) pasaban por asistencia de IA para extraer datos, pero con reglas documentadas, tabla de venues fijos y criterios de geocodificación para validar cada campo de manera sistematizada. La IA aceleraba la extracción pero cada dato requería revisión antes de publicar."
                    : "Events I uploaded manually (Instagram flyers, direct contacts) went through AI-assisted extraction, but with documented rules, a fixed venue table, and geocoding criteria to validate each field systematically. AI accelerated extraction, but every data point still required review before publishing."}
                </p>
                <p className="text-lg">
                  {es
                    ? "El organizador percibía que el flujo funcionaba."
                    : "The organizer perceived that the flow worked."}
                </p>
              </div>
            </section>
          </FadeOnScroll>

          {/* IMAGE: Wizard of Oz flow */}
          <FadeOnScroll>
            <section className="w-full px-8 md:px-12 lg:px-20 mb-12">
              <DevImage
                src="/images/manijappImages/manijapp-wizard-of-oz-flow.webp"
                alt={
                  es
                    ? "Flujo Wizard of Oz: Form → Google Sheet → publicación manual → Mail"
                    : "Wizard of Oz flow: Form → Google Sheet → manual publish → Mail"
                }
                width={1200}
                height={400}
                caption={
                  es
                    ? "Flujo de carga: el organizador percibe que la publicación existe. El backend espera evidencia real de demanda."
                    : "Loading flow: the organizer perceives publishing exists. The backend waits for real evidence of demand."
                }
                className="w-full"
                imageClassName="object-cover"
              />
            </section>
          </FadeOnScroll>

          {/* IMAGE: Ingesta de eventos */}
          <FadeOnScroll>
            <section className="w-full px-8 md:px-12 lg:px-20 mb-20">
              <DevImage
                src="/images/manijappImages/manijapp-ingesta-flow.webp"
                alt={
                  es
                    ? "Flujo de ingesta de eventos: Parseo → IA → Event_spec.md → Array → Ajustes manuales"
                    : "Event ingestion flow: Parsing → AI → Event_spec.md → Array → Manual tuning"
                }
                width={1200}
                height={400}
                caption={
                  es
                    ? "Ingesta de eventos: extracción asistida por IA contra reglas documentadas, con revisión manual antes de publicar."
                    : "Event ingestion: AI-assisted extraction against documented rules, with manual review before publishing."
                }
                className="w-full"
                imageClassName="object-cover"
              />
            </section>
          </FadeOnScroll>

          {/* TRIGGER + APRENDIZAJE */}
          <FadeOnScroll>
            <section className="w-full px-8 md:px-12 lg:px-20 mb-20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 items-start">
                <div className="text-light leading-relaxed space-y-4">
                  <h3 className="text-2xl font-semibold text-light mb-4">
                    {es ? "Trigger y decisión" : "Trigger and decision"}
                  </h3>
                  <p className="text-lg">
                    {es
                      ? "La misma lógica definió cuándo sumar Supabase. Durante las primeras semanas, los contadores de pulgares eran valores simulados — suficientes para validar si alguien tocaba los botones, no para medir comportamiento real. El trigger fue concreto: aparecieron eventos de organizadores reales. En ese momento los datos simulados dejaron de ser neutrales. Los números afectaban la credibilidad. Necesitaba persistencia real."
                      : "The same logic defined when to add Supabase. During the first weeks, thumbs counters were simulated values — enough to validate whether someone tapped the buttons, not to measure real behavior. The trigger was concrete: real organizer events appeared. At that point simulated data stopped being neutral. The numbers affected credibility. I needed real persistence."}
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-light mb-4">
                    {es ? "Aprendizaje" : "Learning"}
                  </h3>
                  <div className="text-light leading-relaxed space-y-4">
                    <p className="text-lg">
                      {es
                        ? "Empecé sin backend para no escalar infraestructura sin validación. El problema: el costo de mantener todo manual fue mayor que el costo de construir persistencia temprana. La regla metodológica era correcta, pero el trade-off cambió — el costo tiende a cero."
                        : "I started without a backend to avoid scaling infrastructure without validation. The problem: the cost of keeping everything manual was higher than the cost of building persistence early. The methodological rule was right, but the trade-off shifted — the cost tends to zero."}
                    </p>
                    <p className="text-lg">
                      {es
                        ? "La dependencia era triple: el interés dependía de la curaduría, la tracción dependía de la distribución, y ambas dependían de mi energía. Eso es sostenible para validar. No es sostenible en el tiempo."
                        : "The dependency was triple: interest depended on curation, traction depended on distribution, and both depended on my energy. That's sustainable for validation. It's not sustainable over time."}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </FadeOnScroll>

          {/* ==================== DIVIDER ==================== */}
          <div className="w-full px-8 md:px-12 lg:px-20 mb-28">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-[#08A4E1]/40 to-transparent" />
          </div>

          {/* ==================== BENCHMARKING ==================== */}
          <FadeOnScroll>
            <section id="benchmarking" className="w-full px-8 md:px-12 lg:px-20 mb-20">
              <h2 className="text-3xl md:text-4xl font-bold text-light mb-8">
                {es
                  ? "Benchmarking y definición del diferencial"
                  : "Benchmarking and defining the differentiator"}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                <div className="text-light leading-relaxed space-y-4">
                  <h3 className="text-2xl font-semibold text-light mb-4">Jodify</h3>
                  <p className="text-lg">
                    {es
                      ? "El benchmark competitivo más útil tampoco vino de research — vino de cargar eventos. Jodify apareció en redes mientras operaba el catálogo. El análisis fue desde adentro: contacto directo posando como productora. Jodify opera como canal B2B con gatekeeping humano — llamada de onboarding, 10% de comisión, posicionamiento pago."
                      : "The most useful competitive benchmark didn't come from research either — it came from loading events. Jodify showed up on social while I was running the catalog. The analysis was from the inside: direct contact posing as a venue. Jodify operates as a B2B channel with human gatekeeping — onboarding call, 10% commission, paid positioning."}
                  </p>
                  <p className="text-lg">
                    {es
                      ? "El contraste con Manijapp es estructural: Jodify valida antes de publicar, Manijapp valida después vía comunidad. Son apuestas distintas sobre cómo se construye confianza."
                      : "The contrast with Manijapp is structural: Jodify validates before publishing, Manijapp validates after via community. They're different bets on how trust is built."}
                  </p>
                </div>

                <div className="text-light leading-relaxed space-y-4">
                  <h3 className="text-2xl font-semibold text-light mb-4">
                    {es
                      ? "El naming: cuando la evidencia no es conclusiva"
                      : "The naming: when the evidence isn't conclusive"}
                  </h3>
                  <p className="text-lg">
                    {es
                      ? "Después del primer ciclo aparecieron dos señales contradictorias sobre el nombre. Una persona con contexto de marketing lo validó. Otra con contexto de producto señaló que \"manija\" puede evocar segunda marca — nombres que priorizan lo fonético sobre lo aspiracional — y que eso podía bajarle el precio al producto."
                      : "After the first cycle, two contradictory signals appeared about the name. Someone with a marketing background validated it. Someone with a product background pointed out that \"manija\" can evoke a second-tier brand — names that prioritize the phonetic over the aspirational — and that this could lower the product's perceived value."}
                  </p>
                  <p className="text-lg">
                    {es
                      ? "La decisión fue no cambiar. No porque una señal pesara más que la otra, sino porque no hay dato de que el nombre frene el uso o genere rechazo en el segmento target. Una opinión bien fundamentada no es evidencia de comportamiento. El trigger para revisarlo está definido: si el reposicionamiento hacia un segmento con mayor capacidad de pago avanza, el naming entra a revisión como parte del sistema de identidad. No antes."
                      : "The decision was not to change it. Not because one signal outweighed the other, but because there's no data that the name slows usage or generates rejection in the target segment. A well-grounded opinion is not behavioral evidence. The trigger for revisiting it is defined: if repositioning toward a higher-paying segment advances, the naming goes into review as part of the identity system. Not before."}
                  </p>
                </div>
              </div>
            </section>
          </FadeOnScroll>

          {/* ==================== DIVIDER ==================== */}
          <div className="w-full px-8 md:px-12 lg:px-20 mb-28">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-[#08A4E1]/40 to-transparent" />
          </div>

          {/* ==================== VALIDACIÓN ==================== */}
          <FadeOnScroll>
            <section id="validacion" className="w-full px-8 md:px-12 lg:px-20 mb-20">
              <h2 className="text-3xl md:text-4xl font-bold text-light mb-6">
                {es
                  ? "Validación: tres ciclos, decisiones encadenadas"
                  : "Validation: three cycles, chained decisions"}
              </h2>

              {/* Tabla de métricas */}
              <div className="overflow-x-auto mb-12">
                <table className="w-full text-sm text-light">
                  <thead>
                    <tr className="border-b border-container-light/20">
                      <th className="py-3 pr-6 text-left font-semibold text-light/70">
                        {es ? "Métrica" : "Metric"}
                      </th>
                      <th className="py-3 pr-6 text-right font-semibold text-light/70">
                        {es ? "Ciclo 2" : "Cycle 2"}
                      </th>
                      <th className="py-3 text-right font-semibold text-light/70">
                        {es ? "Ciclo 3" : "Cycle 3"}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-container-light/10">
                    <tr>
                      <td className="py-3 pr-6 font-semibold">
                        {es ? "Usuarios activos (GA4)" : "Active users (GA4)"}
                      </td>
                      <td className="py-3 pr-6 text-right">89</td>
                      <td className="py-3 text-right">32</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-6 font-semibold">
                        {es ? "Pages / sesión" : "Pages / session"}
                      </td>
                      <td className="py-3 pr-6 text-right">2.45</td>
                      <td className="py-3 text-right">4.02</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-6 font-semibold">Scroll depth</td>
                      <td className="py-3 pr-6 text-right">63.7%</td>
                      <td className="py-3 text-right">78.4%</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-6 font-semibold">Active time</td>
                      <td className="py-3 pr-6 text-right">57s</td>
                      <td className="py-3 text-right">1m 30s</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-6 font-semibold">
                        {es ? "Retención 7 días (cohorte)" : "7-day retention (cohort)"}
                      </td>
                      <td className="py-3 pr-6 text-right">7.9% (7/89)</td>
                      <td className="py-3 text-right">~7.1% (2/28)</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-6 font-semibold">
                        {es ? "Usuarios returning (GA4)" : "Returning users (GA4)"}
                      </td>
                      <td className="py-3 pr-6 text-right">2</td>
                      <td className="py-3 text-right">3</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-6 font-semibold">validation_tap</td>
                      <td className="py-3 pr-6 text-right">13%</td>
                      <td className="py-3 text-right">6.25%</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-6 font-semibold">event_shared</td>
                      <td className="py-3 pr-6 text-right">5.2%</td>
                      <td className="py-3 text-right">6.25%</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-6 font-semibold">event_submitted</td>
                      <td className="py-3 pr-6 text-right">1</td>
                      <td className="py-3 text-right">2</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Tres ciclos */}
              <GridContainer cols={{ default: 1, md: 3 }} gap="md" className="!px-0 [&>*]:h-full">
                <Block colSpan={1}>
                  <div className="bg-container/80 rounded-lg p-6 h-full">
                    <h3 className="text-lg font-bold text-light mb-3">
                      {es
                        ? "Ciclo 1 · Primera señal, metodología contaminada"
                        : "Cycle 1 · First signal, contaminated methodology"}
                    </h3>
                    <div className="text-light text-sm leading-relaxed space-y-3">
                      <p>
                        {es
                          ? "17 contactos activados, 5 sesiones reales. Un usuario regresó tres veces sin intervención, lo que indicaba interés. Sin embargo, las variables del sistema cambiaban mientras se medía, lo que invalidaba la señal."
                          : "17 contacts activated, 5 real sessions. One user returned three times without intervention, which indicated interest. However, system variables kept changing while measuring, which invalidated the signal."}
                      </p>
                      <p>
                        {es
                          ? "La decisión fue aislar condiciones antes de continuar."
                          : "The decision was to isolate conditions before continuing."}
                      </p>
                      <p className="text-light/70">
                        {es
                          ? "Este ciclo expuso una inconsistencia: la validación comunitaria (diferencial clave) no era evidente en la interfaz. Remover los indicadores mejoró lo visual, pero rompió la estrategia. El brief funcionó como herramienta de corrección."
                          : "This cycle also exposed an inconsistency: community validation, defined as a differentiator in the brief, wasn't visible during scanning. Removing the indicators from cards was correct visually but wrong strategically. The brief worked as a correction tool."}
                      </p>
                    </div>
                  </div>
                </Block>
                <Block colSpan={1}>
                  <div className="bg-container/80 rounded-lg p-6 h-full">
                    <h3 className="text-lg font-bold text-light mb-3">
                      {es
                        ? "Ciclo 2 · Señales tempranas confirmadas"
                        : "Cycle 2 · Early signals confirmed"}
                    </h3>
                    <div className="text-light text-sm leading-relaxed space-y-3">
                      <p>
                        {es
                          ? "Con variables controladas y un outreach rediseñado —más contextual y segmentado— comenzaron a aparecer patrones estables."
                          : "With controlled variables and a redesigned outreach — more contextual and segmented — stable patterns started to emerge."}
                      </p>
                      <p>
                        {es
                          ? "Se registraron entre 4 y 6 returning users diarios durante varios días sin contacto directo, superando el umbral definido. Además, apareció un evento publicado por un organizador que llegó a través de una historia de Instagram, sin contacto directo. Eso indicaba que la distribución pasiva —historias, referencias de terceros— generaba supply sin intervención explícita."
                          : "Between 4 and 6 daily returning users were recorded over several days without direct contact, exceeding the defined threshold. An event was also published by an organizer without prior intervention. This showed that passive distribution — Instagram stories, third-party references — generated supply without explicit intervention."}
                      </p>
                      <p className="text-light/70">
                        {es
                          ? "Ambas señales indicaban que el sistema empezaba a sostenerse por sí mismo."
                          : "Both signals indicated the system was starting to sustain itself."}
                      </p>
                    </div>
                  </div>
                </Block>
                <Block colSpan={1}>
                  <div className="bg-container/80 rounded-lg p-6 h-full">
                    <h3 className="text-lg font-bold text-light mb-3">
                      {es
                        ? "Ciclo 3 · Experimento de seeding y límite de red"
                        : "Cycle 3 · Seeding experiment and network limit"}
                    </h3>
                    <div className="text-light text-sm leading-relaxed space-y-3">
                      <p>
                        {es
                          ? "El tercer ciclo introdujo un experimento de seeding. La interacción con validación fue mayor en ese contexto, pero la calidad de sesión mejoró cuando se redujo la intervención."
                          : "The third cycle introduced a seeding experiment. Interaction with validation was higher in that context, but session quality improved when intervention decreased."}
                      </p>
                      <p>
                        {es
                          ? "La retención se mantuvo estable, incluso con menor volumen y una red de distribución más distante. Esto sugiere que el producto no pierde valor; lo que se degrada es la eficiencia del canal."
                          : "Retention stayed stable, even with lower volume and a more distant distribution network. This suggests the product doesn't lose value; what degrades is channel efficiency."}
                      </p>
                      <p className="text-light/70">
                        {es
                          ? "El aprendizaje es claro: el outreach directo tiene retorno decreciente. Escalar no implica insistir en el mismo canal, sino cambiarlo. El siguiente paso es presencia en el ecosistema, no mayor volumen de mensajes."
                          : "The lesson is clear: direct outreach has diminishing returns. Scaling doesn't mean insisting on the same channel — it means changing it. The next step is presence in the ecosystem, not higher message volume."}
                      </p>
                    </div>
                  </div>
                </Block>
              </GridContainer>
            </section>
          </FadeOnScroll>

          {/* IMAGE: Funnel core loop */}
          <FadeOnScroll>
            <section className="w-full px-8 md:px-12 lg:px-20 mb-20">
              <DevImage
                src="/images/manijappImages/manijapp-funnel-core-loop.webp"
                alt={
                  es
                    ? "Funnel de métricas reales en el core loop: sesiones, detalle de evento, interacción con pulgares, compartir, publicar"
                    : "Real metrics funnel across the core loop: sessions, event detail, thumbs interaction, share, publish"
                }
                width={1200}
                height={650}
                caption={
                  es
                    ? "Funnel del core loop con datos reales de los ciclos 2 y 3."
                    : "Core loop funnel with real data from cycles 2 and 3."
                }
                className="w-full"
                imageClassName="object-cover"
              />
            </section>
          </FadeOnScroll>

          {/* ==================== DIVIDER ==================== */}
          <div className="w-full px-8 md:px-12 lg:px-20 mb-28">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-[#08A4E1]/40 to-transparent" />
          </div>

          {/* ==================== SUPPLY ==================== */}
          <FadeOnScroll>
            <section id="supply" className="w-full px-8 md:px-12 lg:px-20 mb-20">
              <div className="max-w-3xl mx-auto mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-light text-center">
                  {es
                    ? "Supply: no solo fricción, también incentivo"
                    : "Supply: not just friction, also incentive"}
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                <div className="text-light leading-relaxed space-y-4">
                  <p className="text-lg">
                    {es
                      ? "La hipótesis inicial era que tener red directa en la escena independiente resolvía el lado oferta. Años como DJ daban acceso a promotores y organizadores — suficiente para arrancar el supply sin depender de que desconocidos publicaran solos."
                      : "The initial hypothesis was that having a direct network in the independent scene solved the supply side. Years as a DJ gave access to promoters and organizers — enough to bootstrap supply without depending on strangers publishing on their own."}
                  </p>
                  <p className="text-lg">
                    {es
                      ? "La señal existe pero no es suficiente. Tres submissions en dos ciclos confirman que la hipótesis de red directa genera alguna tracción, pero está lejos de sostener un catálogo de 40 eventos por fin de semana. El acceso a la escena reduce la fricción del arranque; no reemplaza el incentivo estructural que hace que un organizador publique solo."
                      : "The signal exists but it's not enough. Three submissions across two cycles confirm that the direct-network hypothesis generates some traction, but it's far from sustaining a catalog of 40 events per weekend. Access to the scene reduces cold-start friction; it doesn't replace the structural incentive that makes an organizer publish on their own."}
                  </p>
                </div>

                <div className="text-light leading-relaxed space-y-4">
                  <p className="text-lg">
                    {es
                      ? "La segunda hipótesis fue fricción. Eso también se rompe con dos señales convergentes. En research, una entrevistada lo dijo directo: \"subir eventos no es hábito, es una tarea más.\" El rediseño del formulario reduce fricción para quien ya tiene intención, pero no genera esa intención."
                      : "The second hypothesis was friction. That also breaks down with two converging signals. In research, an interviewee put it directly: \"posting events isn't a habit, it's just another task.\" The form redesign reduces friction for those who already have intent, but doesn't create the intent."}
                  </p>
                  <p className="text-lg font-semibold">
                    {es
                      ? "La conclusión es estructural: sin audiencia, no hay incentivo para publicar."
                      : "The conclusion is structural: without an audience, there's no incentive to publish."}
                  </p>
                  <p className="text-lg">
                    {es
                      ? "Esto define la secuencia del producto. Primero se construye demanda. Luego se escala el supply. Sin una audiencia visible, no existe una propuesta de valor real para organizadores o venues."
                      : "This defines the product sequence. Demand is built first. Then supply scales. Without a visible audience, there's no real value proposition for organizers or venues."}
                  </p>
                  <p className="text-lg">
                    {es
                      ? "Cuando esa masa crítica exista, la conversación cambia: deja de ser pedirle un favor a un organizador y pasa a ser ofrecerle acceso a una audiencia real. El modelo de negocio no se posterga; se secuencia."
                      : "When that critical mass exists, the conversation changes: it stops being asking an organizer for a favor and becomes offering them access to a real audience. The business model isn't postponed; it's sequenced."}
                  </p>
                </div>
              </div>

              <DevImage
                src="/images/manijappImages/dj.webp"
                alt={
                  es
                    ? "Fiesta electrónica underground en Buenos Aires: DJ mezclando en vinilo y digital frente a una pista densa, con luces rojas y azules entre humo y ambiente cinematográfico."
                    : "Underground electronic party in Buenos Aires: a DJ mixing vinyl and digital in front of a dense crowd, red and blue lights cutting through smoke in a cinematic atmosphere."
                }
                width={1200}
                height={675}
                className="w-full mt-12"
                imageClassName="object-cover"
              />
            </section>
          </FadeOnScroll>

          {/* ==================== DIVIDER ==================== */}
          <div className="w-full px-8 md:px-12 lg:px-20 mb-28">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-[#08A4E1]/40 to-transparent" />
          </div>

          {/* ==================== QUÉ SIGUE ==================== */}
          <FadeOnScroll>
            <section id="cierre" className="w-full px-8 md:px-12 lg:px-20 mb-20">
              <h2 className="text-3xl md:text-4xl font-bold text-light mb-8">
                {es ? "Qué sigue" : "What's next"}
              </h2>
              <div className="text-light leading-relaxed space-y-4 mb-10">
                <p className="text-lg">
                  {es
                    ? "El ciclo 4 cambia el canal: de cold outreach digital a presencia en el ecosistema. Las stories de Instagram se formalizan como infraestructura de retención semanal — es la solución más barata disponible antes de construir cualquier feature de notificación."
                    : "Cycle 4 changes the channel: from cold digital outreach to presence in the ecosystem. Instagram stories are formalized as weekly retention infrastructure — it's the cheapest solution available before building any notification feature."}
                </p>
                <p className="text-lg">
                  {es
                    ? "Los avances pendientes tienen triggers, no fechas."
                    : "Pending advances have triggers, not dates."}
                </p>
              </div>

              <p className="text-xl text-light font-semibold leading-relaxed">
                {es
                  ? <>La decisión más importante no es qué construir. <br /> Es qué medir, con qué criterio, y cuándo la señal es suficiente para actuar.</>
                  : <>The most important decision isn't what to build. <br /> It's what to measure, by what criteria, and when the signal is sufficient to act.</>}
              </p>
            </section>
          </FadeOnScroll>

          {/* ==================== NOTA DE PIE ==================== */}
          <div className="w-full px-8 md:px-12 lg:px-20 pb-16">
            <p className="text-xs text-light/40 italic">
              {es ? "Manijapp es un proyecto en curso — " : "Manijapp is an ongoing project — "}
              <a
                href="https://manijapp.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#2DD4BF] underline underline-offset-2 transition-colors hover:text-[#5EEAD4]"
              >
                manijapp.vercel.app
              </a>
            </p>
          </div>
        </main>
      </div>
      <NextCaseStudy currentSlug="manijapp" lang={lang} />
      <div className="relative z-[20]">
        <Footer dict={dict} lang={lang} />
      </div>
      <ScrollToTop size={48} />
    </>
  )
}
