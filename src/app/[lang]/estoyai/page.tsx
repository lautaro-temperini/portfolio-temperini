import { headers } from "next/headers"
import Image from "next/image"
import { getDictionary } from "@/lib/getDictionary"
import Navbar from "@/components/navbar/Navbar"
import ScrollToTop from "@/components/fxscripts/scroll-to-top"
import ScrollToSection from "@/components/fxscripts/scroll-to-section"
import Footer from "@/components/footer/Footer"
import { GridContainer } from "@/components/sections/GridContainer"
import { Block } from "@/components/sections/Block"
import { BentoGrid, BentoItem } from "@/components/sections/BentoGrid"
import { FeatureCard } from "@/components/sections/FeatureCard"
import FadeOnScroll from "@/components/fxscripts/FadeOnScroll"
import SectionNav from "@/components/case-study/SectionNav"
import DevImage from "@/components/DevImage"
import NextCaseStudy from "@/components/case-study/NextCaseStudy"

const SITE_URL = "https://temperini.vercel.app"
const PUBLISHED_DATE = "2026-08-30"

export const metadata = {
  title:
    "EstoyAi: Registro de Campo por Voz para ONGs | Offline-first + IA Local | Case Study | Lautaro Temperini",
  description:
    "Sistema offline-first para promotores de ONGs: dictan la visita por voz, la IA local (Whisper + Ollama) genera un informe .docx y coordinación lo ve priorizado por criticidad. Ningún dato sale de la sede. Halketon 2026.",
  keywords: [
    "product design case study",
    "offline-first PWA",
    "local AI Whisper Ollama",
    "social impact design",
    "voice to report",
    "data sovereignty design",
    "NGO field reporting",
    "product designer Buenos Aires",
  ],
  authors: [{ name: "Lautaro Temperini", url: SITE_URL }],
  creator: "Lautaro Temperini",
  alternates: {
    canonical: `${SITE_URL}/estoyai`,
    languages: {
      es: `${SITE_URL}/es/estoyai`,
      en: `${SITE_URL}/en/estoyai`,
      "x-default": `${SITE_URL}/es/estoyai`,
    },
  },
  openGraph: {
    title: "EstoyAi: Registro de Campo por Voz para ONGs | Case Study by Lautaro Temperini",
    description:
      "El promotor dicta la visita, la IA local genera el informe y coordinación lo ve priorizado por criticidad. Offline-first, datos que no salen de la sede. Buenos Aires, 2026.",
    url: `${SITE_URL}/estoyai`,
    siteName: "Temperini Portfolio",
    locale: "es_AR",
    type: "article",
    publishedTime: `${PUBLISHED_DATE}T00:00:00Z`,
    modifiedTime: `${PUBLISHED_DATE}T00:00:00Z`,
    authors: ["Lautaro Temperini"],
    images: [
      {
        url: `${SITE_URL}/images/estoyai-logo.webp`,
        width: 1200,
        height: 630,
        alt: "EstoyAi — registro de campo por voz para ONGs, case study",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EstoyAi: Registro de Campo por Voz para ONGs | Case Study",
    description:
      "Offline-first + IA local para ONGs de territorio. El promotor dicta, la IA genera el informe, coordinación prioriza por criticidad.",
    images: [`${SITE_URL}/images/estoyai-logo.webp`],
  },
}

const jsonLdEstoyai = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TechArticle",
      "@id": `${SITE_URL}/estoyai#article`,
      headline: "EstoyAi: Registro de Campo por Voz para ONGs, Offline-first con IA Local",
      description:
        "Sistema offline-first para promotores de ONGs: dictan la visita por voz, la IA local genera un informe .docx y coordinación lo ve priorizado por criticidad. Ningún dato sale de la sede.",
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
      url: `${SITE_URL}/estoyai`,
      mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/estoyai` },
      inLanguage: "es-AR",
      keywords: [
        "product design",
        "case study",
        "offline-first",
        "local AI",
        "social impact",
        "data sovereignty",
        "NGO",
        "Argentina",
      ],
      about: {
        "@type": "SoftwareApplication",
        name: "EstoyAi",
        description:
          "Sistema de registro de campo por voz para ONGs de territorio: offline-first, IA local (Whisper + Ollama), informes .docx y triaje por criticidad. Open source (MIT).",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web, Windows",
        url: "https://estoyai.com",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Portfolio", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "EstoyAi", item: `${SITE_URL}/estoyai` },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "¿Qué es EstoyAi?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "EstoyAi es un sistema de registro de campo por voz para ONGs que trabajan en territorio. El promotor dicta lo que observó en una visita, la inteligencia artificial local transcribe y extrae los datos, y se genera un informe .docx listo para archivar. Cada informe llega a coordinación clasificado por criticidad y con sus puntos accionables. Todo corre en la computadora de la sede: ningún audio ni dato de beneficiarios sale de ahí.",
          },
        },
        {
          "@type": "Question",
          name: "¿Por qué offline-first?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Los promotores visitan familias en zonas sin señal. Un formulario que requiere internet en el momento del registro es un formulario que no se usa. El audio se graba en el celular, se encola en IndexedDB y sube solo cuando hay conexión, sin que el promotor tenga que hacer nada.",
          },
        },
        {
          "@type": "Question",
          name: "¿Por qué los datos no salen de la sede?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Los registros incluyen datos de menores y familias en situación de vulnerabilidad. Ninguna API externa de transcripción o IA debería recibir ese audio. Toda la infraestructura —Whisper, Ollama, el almacenamiento— corre localmente en la PC de la ONG. Si la PC se apaga, el sistema se apaga. Esa es la garantía.",
          },
        },
        {
          "@type": "Question",
          name: "¿De dónde viene EstoyAi?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "La idea se disparó en Halketon (junio 2026), un hackathon para construir herramientas reales para organizaciones sociales argentinas. Los organizadores entrevistaron a 16 ONGs; 13 de esas 16 caían en el Track 3 (impacto y reportes): no logran registrar su trabajo de campo de forma sistemática. En el evento Lautaro Temperini lideró producto y coordinación de un equipo de cuatro; después reconstruyó y continuó EstoyAi por su cuenta. Pequeños Pasos es la organización piloto de referencia.",
          },
        },
      ],
    },
  ],
}

/**
 * Página de EstoyAi localizada — case study (estilo inline bilingüe, sin dictionary keys).
 * @param params - Parámetros de la ruta, incluye lang (es | en)
 */
export default async function EstoyaiPage({
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

  // Pasos del flujo (índice firma)
  const steps = [
    {
      num: "01",
      titleEs: "Dicta",
      titleEn: "Dictate",
      textEs:
        "El promotor termina la visita, abre la app en su celular y dicta en dos minutos lo que observó. Sin señal está bien.",
      textEn:
        "The promoter finishes the visit, opens the app on their phone, and dictates what they observed in two minutes. No signal is fine.",
    },
    {
      num: "02",
      titleEs: "Encola",
      titleEn: "Queue",
      textEs:
        "El audio se guarda en el celular (IndexedDB) y sube solo cuando hay conexión. El promotor no tiene que hacer nada más.",
      textEn:
        "The audio is stored on the phone (IndexedDB) and uploads on its own once there's a connection. The promoter does nothing else.",
    },
    {
      num: "03",
      titleEs: "Procesa",
      titleEn: "Process",
      textEs:
        "En la sede: Whisper transcribe, Ollama extrae los campos relevantes y se genera un informe .docx con estructura fija.",
      textEn:
        "At the office: Whisper transcribes, Ollama extracts the relevant fields, and a .docx report with a fixed structure is generated.",
    },
    {
      num: "04",
      titleEs: "Revisa",
      titleEn: "Review",
      textEs:
        "El promotor revisa el informe, lo descarga y lo envía a coordinación. El documento es editable, imprimible y auditable.",
      textEn:
        "The promoter reviews the report, downloads it, and sends it to coordination. The document is editable, printable, and auditable.",
    },
    {
      num: "05",
      titleEs: "Prioriza",
      titleEn: "Prioritize",
      textEs:
        "Coordinación lo ve en un tablero: clasificado por criticidad y con sus puntos accionables ya extraídos. Qué atender primero, sin leer todo.",
      textEn:
        "Coordination sees it on a board: sorted by criticality with its action points already extracted. What to attend to first, without reading everything.",
    },
  ]

  return (
    <>
      <script
        nonce={nonce}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdEstoyai) }}
        suppressHydrationWarning
      />

      <Navbar dict={dict} lang={lang} />
      <div className="relative z-[20]">
        <main className="[&>*]:!transform-none">
          <SectionNav
            sections={[
              { id: "origen", label: es ? "De dónde viene" : "Origin" },
              { id: "problema", label: es ? "El problema" : "The problem" },
              { id: "solucion", label: es ? "Cómo funciona" : "How it works" },
              { id: "criticidad", label: es ? "Priorización" : "Prioritization" },
              { id: "decisiones", label: es ? "Decisiones" : "Key decisions" },
              { id: "soberania", label: es ? "Soberanía de datos" : "Data sovereignty" },
              { id: "diferencial", label: es ? "Por qué es diferente" : "Why it's different" },
              { id: "config", label: es ? "Multi-ONG" : "Multi-NGO" },
              { id: "cierre", label: es ? "Estado y qué sigue" : "Status & next" },
            ]}
          />

          {/* ==================== HERO ==================== */}
          <FadeOnScroll>
            <section className="w-full px-8 md:px-12 lg:px-20 pt-28 md:pt-32 lg:pt-36 mb-12">
              <div className="w-full max-w-7xl">
                <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold leading-tight text-light mb-4">
                  ESTOYAI
                </h1>
                <p className="text-xl md:text-2xl font-semibold text-light mb-3">
                  {es
                    ? "La ONG hace el trabajo. EstoyAi lo deja escrito."
                    : "The NGO does the work. EstoyAi writes it down."}
                </p>
                <p className="text-base md:text-lg text-light leading-relaxed mb-6 max-w-5xl">
                  {es
                    ? "Sistema de registro de campo por voz para ONGs de territorio: el promotor dicta la visita, la IA local genera un informe .docx y coordinación lo ve priorizado por criticidad. Offline-first. Ningún dato sale de la sede."
                    : "Voice-based field reporting for NGOs working on the ground: the promoter dictates the visit, local AI generates a .docx report, and coordination sees it prioritized by criticality. Offline-first. No data leaves the office."}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
                  <a
                    href="https://estoyai.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-[#4C8DFF] hover:text-[#7FB0FF] underline underline-offset-4 transition-colors"
                  >
                    {es ? "• Ir a estoyai.com ↗" : "• Visit estoyai.com ↗"}
                  </a>
                  <ScrollToSection
                    href="#solucion"
                    offset={60}
                    duration={400}
                    className="inline-flex items-center gap-1 text-sm text-light/80 hover:text-light underline underline-offset-4 transition-colors"
                  >
                    {es ? "Ver cómo funciona ↓" : "See how it works ↓"}
                  </ScrollToSection>
                </div>
              </div>
            </section>
          </FadeOnScroll>

          {/* ==================== BANNER ==================== */}
          <FadeOnScroll delay={80}>
            <section className="w-full px-8 md:px-12 lg:px-20 mb-16">
              <div className="relative w-full overflow-hidden rounded-2xl border border-[#0056d2]/30 bg-gradient-to-br from-[#04173a] via-[#071d47] to-[#0d1c2e] px-8 py-12 md:px-16 md:py-16">
                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                  <div className="flex-shrink-0">
                    <Image
                      src="/images/estoyai-logo.webp"
                      alt={es ? "Ícono de EstoyAi" : "EstoyAi icon"}
                      width={120}
                      height={120}
                      className="h-24 w-24 md:h-32 md:w-32 object-contain"
                    />
                  </div>
                  <div className="text-center md:text-left">
                    <p className="text-2xl md:text-3xl font-semibold text-light mb-4 max-w-2xl">
                      {es
                        ? "Del audio de una visita a un informe archivable, en menos de 5 minutos."
                        : "From a visit's audio to a filable report, in under 5 minutes."}
                    </p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-2">
                      {[
                        es ? "Gratis" : "Free",
                        es ? "Código abierto" : "Open source",
                        es ? "Sin conexión en campo" : "Offline in the field",
                        es ? "IA local" : "Local AI",
                      ].map((pill) => (
                        <span
                          key={pill}
                          className="rounded-full border border-[#4C8DFF]/40 bg-[#0056d2]/20 px-3 py-1 text-xs font-semibold text-light/90"
                        >
                          {pill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </FadeOnScroll>

          {/* ==================== PROJECT SNAPSHOT ==================== */}
          <section className="w-full px-8 md:px-12 lg:px-20 mb-16">
            <div className="text-sm text-light/80 space-y-2">
              <div>
                <span className="text-light/70 font-semibold">{es ? "Tipo" : "Type"}</span>
                {" · "}
                {es
                  ? "Producto social open source — PWA offline-first + IA local"
                  : "Open source social product — offline-first PWA + local AI"}
              </div>
              <div>
                <span className="text-light/70 font-semibold">{es ? "Rol" : "Role"}</span>
                {" · "}
                {es
                  ? "Proyecto propio (solo) — diseño de producto (research, UX/UI, design system) y desarrollo"
                  : "Solo project — product design (research, UX/UI, design system) and development"}
              </div>
              <div>
                <span className="text-light/70 font-semibold">{es ? "Origen" : "Origin"}</span>
                {" · "}
                {es
                  ? "Empezó como proyecto de equipo en el hackathon Halketon (jun 2026, yo en producto y coordinación); lo continué y reconstruí en solitario"
                  : "Started as a team project at the Halketon hackathon (Jun 2026, me on product and coordination); I continued and rebuilt it on my own"}
              </div>
              <div>
                <span className="text-light/70 font-semibold">Stack</span>
                {" · "}Next.js 15 PWA, SQLite, Whisper, Ollama (gemma3:4b), n8n, Docker, Cloudflare Tunnel
              </div>
              <div>
                <span className="text-light/70 font-semibold">{es ? "Estado" : "Status"}</span>
                {" · "}
                {es
                  ? "MVP funcional. No validado en uso real todavía (validé el problema con la dirección, no el flujo con un promotor). Buscando la primera ONG para un piloto."
                  : "Working MVP. Not validated in real use yet (I validated the problem with leadership, not the flow with a promoter). Looking for the first NGO for a pilot."}
              </div>
            </div>
          </section>

          {/* ==================== DIVIDER ==================== */}
          <div className="w-full px-8 md:px-12 lg:px-20 mb-28">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-[#0056d2]/40 to-transparent" />
          </div>

          {/* ==================== TL;DR ==================== */}
          <FadeOnScroll>
            <section className="w-full px-8 md:px-12 lg:px-20 mb-20">
              <h2 className="text-3xl md:text-4xl font-bold text-light mb-6">TL;DR</h2>
              <p className="text-lg md:text-xl text-light font-semibold leading-relaxed mb-8 max-w-4xl">
                {es
                  ? "La tesis: entre una ONG de nutrición y una de tratamiento de consumos, lo único que cambia es el esquema de datos. No estás construyendo una solución para una ONG —estás construyendo infraestructura para el sector."
                  : "The thesis: between a nutrition NGO and a substance-use treatment NGO, the only thing that changes is the data schema. You're not building a solution for one NGO —you're building infrastructure for the sector."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-subtle/60 bg-container/60 p-6 md:p-8">
                  <h3 className="text-lg font-bold text-light mb-3">
                    01. {es ? "Problema" : "Problem"}
                  </h3>
                  <p className="text-light/80 leading-relaxed">
                    {es
                      ? "Las ONGs de territorio registran en cuadernos, WhatsApp y Excel. Alguien tiene que pasar todo a la computadora a mano —horas— y aun así es casi imposible ver qué caso necesita atención primero."
                      : "NGOs in the field record in notebooks, WhatsApp, and Excel. Someone has to transcribe it all by hand —hours— and even then it's nearly impossible to see which case needs attention first."}
                  </p>
                </div>
                <div className="rounded-2xl border border-subtle/60 bg-container/60 p-6 md:p-8">
                  <h3 className="text-lg font-bold text-light mb-3">02. Insight</h3>
                  <p className="text-light/80 leading-relaxed">
                    {es
                      ? "El cuello de botella no está en la intervención, sino en el registro: ocurre donde no hay red, y lo urgente queda enterrado. Resolver la captura destraba todo lo demás."
                      : "The bottleneck isn't the intervention — it's the recording: it happens where there's no signal, and the urgent gets buried. Solving capture unlocks everything else."}
                  </p>
                </div>
                <div className="rounded-2xl border border-subtle/60 bg-container/60 p-6 md:p-8">
                  <h3 className="text-lg font-bold text-light mb-3">
                    03. {es ? "Solución" : "Solution"}
                  </h3>
                  <p className="text-light/80 leading-relaxed">
                    {es
                      ? "Registro por voz offline-first: el promotor dicta, la IA local transcribe y genera un .docx, y coordinación lo ve priorizado por criticidad. Todo corre en la PC de la sede."
                      : "Offline-first voice reporting: the promoter dictates, local AI transcribes and generates a .docx, and coordination sees it prioritized by criticality. Everything runs on the office PC."}
                  </p>
                </div>
                <div className="rounded-2xl border border-subtle/60 bg-container/60 p-6 md:p-8">
                  <h3 className="text-lg font-bold text-light mb-3">
                    04. {es ? "Estado" : "Status"}
                  </h3>
                  <p className="text-light/80 leading-relaxed">
                    {es
                      ? "MVP funcional, diseñado y construido en solitario después del hackathon. Validé el problema con la dirección de la ONG, no el flujo completo con un promotor en un día real. No validado en uso real todavía: ese es el próximo paso, no un dato que ya tenga."
                      : "Working MVP, designed and built solo after the hackathon. I validated the problem with the NGO's leadership, not the full flow with a promoter on a real workday. Not validated in real use yet: that's the next step, not something I already have."}
                  </p>
                </div>
              </div>
            </section>
          </FadeOnScroll>

          {/* ==================== DIVIDER ==================== */}
          <div className="w-full px-8 md:px-12 lg:px-20 mb-28">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-[#0056d2]/40 to-transparent" />
          </div>

          {/* ==================== ORIGEN ==================== */}
          <FadeOnScroll>
            <section id="origen" className="w-full px-8 md:px-12 lg:px-20 mb-16">
              <GridContainer cols={{ default: 1, md: 2 }} gap="lg" className="!px-0 [&>*]:h-full">
                <Block colSpan={1}>
                  <h2 className="text-3xl md:text-4xl font-bold text-light mb-6">
                    {es ? "De dónde viene" : "Where it comes from"}
                  </h2>
                  <div className="text-light leading-relaxed space-y-4 max-w-4xl">
                    <p className="text-lg">
                      {es
                        ? "El punto de partida fue Halketon (jun 2026), un hackathon organizado por Paisanos, Crecimiento, Querido Lunes y Fardo para construir herramientas reales para organizaciones sociales argentinas."
                        : "The starting point was Halketon (Jun 2026), a hackathon organized by Paisanos, Crecimiento, Querido Lunes, and Fardo to build real tools for Argentine social organizations."}
                    </p>
                    <p className="text-lg">
                      {es
                        ? "Los organizadores entrevistaron a 16 ONGs y agruparon los hallazgos en tres tracks. 13 de esas 16 caían en el Track 3 —impacto y reportes—: no logran registrar su trabajo de campo de forma sistemática. El patrón se repetía: cuadernos, WhatsApp y planillas. Mientras la información vive en papel, la coordinación no tiene cómo ver qué pasó en territorio ni detectar a tiempo un caso urgente."
                        : "The organizers interviewed 16 NGOs and grouped the findings into three tracks. 13 of those 16 fell under Track 3 —impact and reporting—: they can't record their fieldwork systematically. The pattern repeated: notebooks, WhatsApp, spreadsheets. While the information lives on paper, coordination has no way to see what happened in the field or catch an urgent case in time."}
                    </p>
                  </div>
                </Block>
                <Block colSpan={1}>
                  <div className="text-light leading-relaxed space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-light mb-6">
                      {es ? "El piloto: Pequeños Pasos" : "The pilot: Pequeños Pasos"}
                    </h2>
                    <p className="text-lg">
                      {es
                        ? "De ahí salió Pequeños Pasos como caso piloto: una ONG con promotores en territorio, múltiples programas de seguimiento de familias, carga administrativa real y una restricción concreta —trabajan en zonas sin señal. Validé el problema con su directora durante el evento: esa conversación confirmó el dolor y definió los límites técnicos."
                        : "From there came Pequeños Pasos as the pilot case: an NGO with field promoters, multiple family follow-up programs, real administrative load, and one concrete constraint —they work in areas with no signal. I validated the problem with its director during the event: that conversation confirmed the pain and defined the technical limits."}
                    </p>
                    <div className="rounded-xl border-l-4 border-[#4C8DFF] bg-container/40 p-5">
                      <p className="text-light/90 leading-relaxed">
                        {es
                          ? "Para ser preciso con el alcance: en Halketon lideré producto y coordinación en un equipo de cuatro que armó un prototipo en 12 horas. El sistema instalable, multi-tenant y offline-first que ves acá lo diseñé y construí solo después del evento —una reconstrucción completa, no una iteración del prototipo. Ese salto es el eje del caso."
                          : "To be precise about scope: at Halketon I led product and coordination in a team of four that built a 12-hour prototype. The installable, multi-tenant, offline-first system you see here I designed and built solo after the event —a full rebuild, not an iteration of the prototype. That leap is the core of the case."}
                      </p>
                    </div>
                  </div>
                </Block>
              </GridContainer>
            </section>
          </FadeOnScroll>

          {/* ==================== FOTOS HALKETON ==================== */}
          <FadeOnScroll delay={80}>
            <section className="w-full px-8 md:px-12 lg:px-20 mb-24">
              {/* Fotos reales del hackathon — soltar en /public/images/estoyaiImages/
                  con estos nombres exactos y avisar para cablear el src:
                  · halketon-equipo.webp        (el equipo)
                  · halketon-pequenospasos.webp (charla con Pequeños Pasos) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DevImage
                  src="/images/estoyaiImages/halketon-equipo.webp"
                  alt={
                    es
                      ? "El equipo de EstoyAi durante el hackathon Halketon (jun 2026)"
                      : "The EstoyAi team during the Halketon hackathon (Jun 2026)"
                  }
                  width={1512}
                  height={1000}
                  caption={es ? "El equipo en Halketon (jun 2026)." : "The team at Halketon (Jun 2026)."}
                  className="w-full"
                  imageClassName="object-cover"
                />
                <DevImage
                  src="/images/estoyaiImages/halketon-pequenospasos.webp"
                  alt={
                    es
                      ? "Validando el problema con un directivo de Pequeños Pasos durante Halketon"
                      : "Validating the problem with a Pequeños Pasos director during Halketon"
                  }
                  width={1280}
                  height={853}
                  caption={
                    es
                      ? "Validando el problema con Pequeños Pasos, en el evento."
                      : "Validating the problem with Pequeños Pasos, at the event."
                  }
                  className="w-full"
                  imageClassName="object-cover"
                />
              </div>
            </section>
          </FadeOnScroll>

          {/* ==================== STATS ==================== */}
          <FadeOnScroll delay={80}>
            <section className="w-full px-8 md:px-12 lg:px-20 mb-28">
              <BentoGrid cols={{ default: 2, lg: 4 }} gap="md">
                {[
                  {
                    value: "16",
                    labelEs: "ONGs entrevistadas en el relevamiento de Halketon",
                    labelEn: "NGOs interviewed in the Halketon research",
                  },
                  {
                    value: "13 de 16",
                    labelEs: "manifestaron el problema del Track 3: registro de campo sin sistematizar",
                    labelEn: "surfaced the Track 3 problem: unsystematized field recording",
                  },
                  {
                    value: "< 5 min",
                    labelEs: "meta de diseño: del audio de la visita al .docx (estimación, no medida)",
                    labelEn: "design goal: from visit audio to .docx (estimate, not measured)",
                  },
                  {
                    value: "$0",
                    labelEs: "gratis y open source (MIT), sin licencias ni nube",
                    labelEn: "free and open source (MIT), no licenses or cloud",
                  },
                ].map((s, i) => (
                  <BentoItem key={i} colSpan={1}>
                    <div
                      className="bg-container/80 rounded-lg p-6 h-full"
                      style={{
                        boxShadow:
                          "0 0 0 1px rgba(255, 255, 255, 0.06), 0 4px 12px rgba(0, 0, 0, 0.5)",
                      }}
                    >
                      <p className="text-3xl md:text-4xl font-bold text-light">{s.value}</p>
                      <p className="text-sm text-light/80 mt-2 leading-relaxed">
                        {es ? s.labelEs : s.labelEn}
                      </p>
                    </div>
                  </BentoItem>
                ))}
              </BentoGrid>
              <p className="text-xs text-light/40 italic mt-4">
                {es
                  ? "Fuente: relevamiento de Halketon (Paisanos · Crecimiento · Querido Lunes · Fardo) a 16 ONGs argentinas, abr–may 2026. El proyecto tomó el Track 3 (impacto y reportes) con Pequeños Pasos."
                  : "Source: Halketon research (Paisanos · Crecimiento · Querido Lunes · Fardo) across 16 Argentine NGOs, Apr–May 2026. The project took Track 3 (impact & reporting) with Pequeños Pasos."}
              </p>
            </section>
          </FadeOnScroll>

          {/* ==================== EL PROBLEMA ==================== */}
          <FadeOnScroll>
            <section id="problema" className="w-full px-8 md:px-12 lg:px-20 mb-16">
              <div className="max-w-4xl mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-light mb-6">
                  {es ? "El problema real" : "The real problem"}
                </h2>
                <p className="text-light text-lg leading-relaxed">
                  {es
                    ? "El cuello de botella de las ONGs de territorio no está en la intervención, sino en el registro de lo que hacen. Cuatro fricciones que se repiten:"
                    : "The bottleneck for field NGOs isn't the intervention — it's recording what they do. Four recurring frictions:"}
                </p>
              </div>
              <BentoGrid cols={{ default: 1, md: 2 }} gap="md" className="[&>*]:h-full">
                {[
                  {
                    titleEs: "El registro ocurre donde no hay red",
                    titleEn: "Recording happens where there's no signal",
                    textEs:
                      "Un promotor que visita a una familia en zona vulnerable no puede abrir un formulario online. Lo que no anota en el momento se reconstruye después de memoria, con sesgo y omisiones.",
                    textEn:
                      "A promoter visiting a family in a vulnerable area can't open an online form. What isn't noted in the moment is reconstructed later from memory, with bias and omissions.",
                  },
                  {
                    titleEs: "El historial del beneficiario está fragmentado",
                    titleEn: "The beneficiary's history is fragmented",
                    textEs:
                      "Una misma persona puede tener datos en un cuaderno, en un grupo de WhatsApp y en una planilla que nadie actualizó hace meses. Seguir su evolución en el tiempo es imposible.",
                    textEn:
                      "One person can have data in a notebook, a WhatsApp group, and a spreadsheet no one has updated in months. Tracking their evolution over time is impossible.",
                  },
                  {
                    titleEs: "Digitalizar lo de campo consume horas",
                    titleEn: "Digitizing fieldwork takes hours",
                    textEs:
                      "Pasar a la computadora lo que se anotó en papel es trabajo manual de alguien que no estuvo en la visita. Horas que se van en transcribir en vez de acompañar.",
                    textEn:
                      "Transcribing paper notes into a computer is manual work by someone who wasn't at the visit. Hours spent transcribing instead of accompanying.",
                  },
                  {
                    titleEs: "Lo urgente queda enterrado",
                    titleEn: "The urgent gets buried",
                    textEs:
                      "Aunque la información se cargue, encontrar el caso que necesita atención inmediata entre decenas de registros es lento y depende de que alguien lo recuerde. La coordinación se entera tarde.",
                    textEn:
                      "Even when the information is loaded, finding the case that needs immediate attention among dozens of records is slow and depends on someone remembering. Coordination finds out too late.",
                  },
                ].map((f, i) => (
                  <BentoItem key={i} colSpan={1}>
                    <div className="bg-container/80 rounded-lg p-6 md:h-full card-elevated">
                      <div className="flex items-start gap-3 mb-3">
                        <span className="text-2xl font-bold text-[#4C8DFF]">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h3 className="text-xl font-bold text-light">
                          {es ? f.titleEs : f.titleEn}
                        </h3>
                      </div>
                      <p className="text-light/80 text-sm leading-relaxed">
                        {es ? f.textEs : f.textEn}
                      </p>
                    </div>
                  </BentoItem>
                ))}
              </BentoGrid>

              <div className="mt-8 rounded-2xl border-l-4 border-[#0056d2] bg-container/40 p-6 md:p-8">
                <p className="text-light text-lg md:text-xl leading-relaxed">
                  {es
                    ? "El resultado: equipos que dedican horas a transcribir en vez de acompañar, y una coordinación sin visibilidad de lo que ocurre en territorio hasta que ya es tarde."
                    : "The result: teams spending hours transcribing instead of accompanying, and a coordination with no visibility of what happens in the field until it's already too late."}
                </p>
              </div>
            </section>
          </FadeOnScroll>

          {/* ==================== DIVIDER ==================== */}
          <div className="w-full px-8 md:px-12 lg:px-20 mb-28">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-[#0056d2]/40 to-transparent" />
          </div>

          {/* ==================== FLOW SCHEMATIC (firma) ==================== */}
          <FadeOnScroll>
            <section id="solucion" className="w-full px-8 md:px-12 lg:px-20 mb-16">
              <div className="max-w-4xl mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-light mb-6">
                  {es ? "Cómo funciona" : "How it works"}
                </h2>
                <p className="text-light text-lg leading-relaxed">
                  {es
                    ? "Del campo a la sede sin que nadie digitalice nada a mano. El audio viaja, la IA local lo procesa, y el trabajo de campo se vuelve una decisión."
                    : "From the field to the office without anyone digitizing anything by hand. The audio travels, local AI processes it, and fieldwork becomes a decision."}
                </p>
              </div>

              {/* Schematic Campo → Sede → .docx → Coordinación */}
              <div className="rounded-2xl border border-[#0056d2]/25 bg-gradient-to-br from-[#04173a]/50 to-[#0d1c2e]/50 p-6 md:p-10">
                <div className="flex flex-col lg:flex-row items-stretch gap-4 lg:gap-2">
                  {[
                    {
                      tag: es ? "CAMPO" : "FIELD",
                      titleEs: "Dicta 2 min",
                      titleEn: "Dictates 2 min",
                      subEs: "Celular, sin señal",
                      subEn: "Phone, no signal",
                      color: "#4C8DFF",
                    },
                    {
                      tag: es ? "OFFLINE" : "OFFLINE",
                      titleEs: "Se encola",
                      titleEn: "Queues up",
                      subEs: "IndexedDB → sube con red",
                      subEn: "IndexedDB → uploads on network",
                      color: "#4C8DFF",
                    },
                    {
                      tag: es ? "SEDE" : "OFFICE",
                      titleEs: "Whisper + Ollama",
                      titleEn: "Whisper + Ollama",
                      subEs: "Transcribe y extrae campos",
                      subEn: "Transcribes and extracts fields",
                      color: "#4C8DFF",
                    },
                    {
                      tag: ".DOCX",
                      titleEs: "Informe generado",
                      titleEn: "Report generated",
                      subEs: "Estructura fija, editable",
                      subEn: "Fixed structure, editable",
                      color: "#34D399",
                    },
                    {
                      tag: es ? "COORDINACIÓN" : "COORDINATION",
                      titleEs: "Triaje",
                      titleEn: "Triage",
                      subEs: "Criticidad + accionables",
                      subEn: "Criticality + action points",
                      color: "#34D399",
                    },
                  ].map((node, i, arr) => (
                    <div key={i} className="flex flex-col lg:flex-row items-center lg:flex-1">
                      <div className="w-full rounded-xl border border-white/10 bg-white/[0.03] p-4 text-center">
                        <span
                          className="text-[10px] font-bold tracking-widest"
                          style={{ color: node.color }}
                        >
                          {node.tag}
                        </span>
                        <p className="text-light font-semibold mt-1 leading-tight">
                          {es ? node.titleEs : node.titleEn}
                        </p>
                        <p className="text-light/60 text-xs mt-1 leading-snug">
                          {es ? node.subEs : node.subEn}
                        </p>
                      </div>
                      {i < arr.length - 1 && (
                        <span
                          className="my-2 lg:my-0 lg:mx-1 text-light/40 select-none"
                          aria-hidden="true"
                        >
                          <span className="lg:hidden">↓</span>
                          <span className="hidden lg:inline">→</span>
                        </span>
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-center text-light/50 text-xs mt-6">
                  {es
                    ? "Todo el procesamiento —transcripción, IA y almacenamiento— corre en la PC de la sede. Sin APIs externas, sin nube, sin GPU."
                    : "All processing —transcription, AI, and storage— runs on the office PC. No external APIs, no cloud, no GPU."}
                </p>
              </div>
            </section>
          </FadeOnScroll>

          {/* ==================== ÍNDICE DE PASOS (firma) ==================== */}
          <FadeOnScroll delay={80}>
            <section className="w-full px-8 md:px-12 lg:px-20 mb-16">
              <div className="border-t border-subtle/40">
                {steps.map((step) => (
                  <div
                    key={step.num}
                    className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-2 md:gap-10 items-baseline border-b border-subtle/40 py-8 md:py-10"
                  >
                    <span className="text-4xl md:text-6xl font-bold text-[#4C8DFF]/80 tabular-nums">
                      {step.num}
                    </span>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-semibold text-light mb-2">
                        {es ? step.titleEs : step.titleEn}
                      </h3>
                      <p className="text-light/80 text-lg leading-relaxed max-w-3xl">
                        {es ? step.textEs : step.textEn}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </FadeOnScroll>

          {/* ==================== DIVIDER ==================== */}
          <div className="w-full px-8 md:px-12 lg:px-20 mb-28">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-[#0056d2]/40 to-transparent" />
          </div>

          {/* ==================== PRIORIZACIÓN POR CRITICIDAD ==================== */}
          <FadeOnScroll>
            <section id="criticidad" className="w-full px-8 md:px-12 lg:px-20 mb-16">
              <div className="max-w-4xl mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-light mb-6">
                  {es ? "Priorización por criticidad" : "Prioritization by criticality"}
                </h2>
                <p className="text-light text-lg leading-relaxed">
                  {es
                    ? "El sistema no se queda en generar el .docx. La IA le asigna a cada informe un nivel de criticidad y extrae el motivo y las acciones pendientes. Ese es el paso que convierte un montón de informes en una decisión: qué atender primero."
                    : "The system doesn't stop at generating the .docx. The AI assigns each report a criticality level and extracts the reason and pending actions. That's the step that turns a pile of reports into a decision: what to attend to first."}
                </p>
              </div>

              {/* El criterio */}
              <h3 className="text-xl font-semibold text-light mb-4">
                {es ? "El criterio" : "The criteria"}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                {[
                  {
                    tag: "ALTA",
                    color: "#F87171",
                    titleEs: "Emergencia o riesgo inminente",
                    titleEn: "Emergency or imminent risk",
                    textEs:
                      "Exige acción el mismo día y activa un protocolo. El eje no es la gravedad en abstracto sino el tiempo para actuar: riesgo de vida por salud aguda, indicios de violencia o abuso, un menor sin adulto responsable presente.",
                    textEn:
                      "Requires same-day action and triggers a protocol. The axis isn't severity in the abstract but time-to-act: acute health risk to life, signs of violence or abuse, a minor with no responsible adult present.",
                  },
                  {
                    tag: "MEDIA",
                    color: "#FB923C",
                    titleEs: "Seguimiento en los próximos días",
                    titleEn: "Follow-up in the coming days",
                    textEs:
                      "Necesita gestión pronta pero no es una emergencia: controles de salud atrasados, ausentismo escolar, riesgo de abandono del programa. Queda una acción pendiente con fecha cercana, no un protocolo.",
                    textEn:
                      "Needs prompt handling but isn't an emergency: overdue health checks, school absenteeism, risk of dropping out of the program. It leaves a near-term pending action, not a protocol.",
                  },
                  {
                    tag: "BAJA",
                    color: "#FBBF24",
                    titleEs: "Rutina, evolución esperada",
                    titleEn: "Routine, expected progress",
                    textEs:
                      "Seguimiento habitual con buena evolución y sin acciones pendientes. Entra igual al sistema —el historial se construye con todo, no solo con lo urgente— pero no compite por la atención del equipo.",
                    textEn:
                      "Regular follow-up with good progress and no pending actions. It still enters the system —the history is built from everything, not only the urgent— but it doesn't compete for the team's attention.",
                  },
                ].map((c) => (
                  <div
                    key={c.tag}
                    className="rounded-lg border border-subtle/60 bg-container/60 p-5"
                    style={{ borderTopColor: c.color, borderTopWidth: 3 }}
                  >
                    <span
                      className="text-xs font-bold tracking-widest"
                      style={{ color: c.color }}
                    >
                      {c.tag}
                    </span>
                    <h4 className="text-light font-semibold mt-1 mb-2">
                      {es ? c.titleEs : c.titleEn}
                    </h4>
                    <p className="text-light/75 text-sm leading-relaxed">
                      {es ? c.textEs : c.textEn}
                    </p>
                  </div>
                ))}
              </div>

              {/* Red de seguridad + tablero */}
              <GridContainer cols={{ default: 1, md: 2 }} gap="lg" className="!px-0 [&>*]:h-full">
                <Block colSpan={1}>
                  <div className="bg-container/80 rounded-lg p-6 md:p-8 h-full card-elevated">
                    <h3 className="text-xl font-semibold text-light mb-3">
                      {es ? "Una red de seguridad sobre la IA" : "A safety net over the AI"}
                    </h3>
                    <p className="text-light/85 leading-relaxed">
                      {es
                        ? "La IA corre local y el modelo es chico: puede omitir algo. Por eso la criticidad no depende solo del modelo. Una red de seguridad por palabras clave fuerza ALTA ante términos de riesgo explícito (violencia, golpes, autolesión, un menor solo). El principio, transferible a cualquier producto con IA: cuando el modelo decide algo con consecuencias reales, el diseño necesita un piso que no dependa del modelo."
                        : "The AI runs locally and the model is small: it can miss something. So criticality doesn't rely on the model alone. A keyword safety net forces ALTA on explicit risk terms (violence, blows, self-harm, a minor left alone). The principle, transferable to any AI product: when the model decides something with real consequences, the design needs a floor that doesn't depend on the model."}
                    </p>
                    <p className="text-light/60 text-sm leading-relaxed mt-3">
                      {es
                        ? "Límite conocido: si el modelo omite una ALTA que no cae en ninguna keyword, puede pasar desapercibida. Por eso la transcripción completa queda siempre disponible y el promotor revisa y ajusta la prioridad antes de enviar a coordinación —la IA propone, una persona confirma."
                        : "Known limit: if the model misses an ALTA that matches no keyword, it can slip through. That's why the full transcript is always available and the promoter reviews and adjusts the priority before sending to coordination —the AI proposes, a person confirms."}
                    </p>
                  </div>
                </Block>
                <Block colSpan={1}>
                  <div className="bg-container/80 rounded-lg p-6 md:p-8 h-full card-elevated">
                    <h3 className="text-xl font-semibold text-light mb-3">
                      {es ? "El tablero de coordinación" : "The coordination board"}
                    </h3>
                    <p className="text-light/85 leading-relaxed">
                      {es
                        ? "En la sede, coordinación abre un tablero mobile-first agrupado por criticidad. Arriba, “necesita atención hoy” separa dos cosas que no son lo mismo: la criticidad clínica (ALTA) de los errores técnicos del pipeline —no es igual llamar a una familia que reintentar un informe que falló. La meta: en 10 segundos, saber qué atender hoy sin leer todo."
                        : "At the office, coordination opens a mobile-first board grouped by criticality. At the top, “needs attention today” separates two things that aren't the same: clinical criticality (ALTA) from technical pipeline errors —calling a family isn't the same as retrying a failed report. The goal: in 10 seconds, know what to attend to today without reading everything."}
                    </p>
                  </div>
                </Block>
              </GridContainer>

              {/* Decisión del modelo (eval) */}
              <div className="mt-6 rounded-2xl border border-[#0056d2]/25 bg-gradient-to-br from-[#04173a]/40 to-[#0d1c2e]/40 p-6 md:p-8">
                <h3 className="text-xl font-semibold text-light mb-3">
                  {es ? "Elegir el modelo fue una decisión de producto" : "Choosing the model was a product decision"}
                </h3>
                <p className="text-light/85 leading-relaxed mb-6 max-w-3xl">
                  {es
                    ? "La tensión real no era “qué modelo es más inteligente”, sino qué calidad de clasificación se puede sostener en el hardware que una sede realmente tiene. Evalué los modelos contra una rúbrica de 9 transcripciones (una por prioridad × programa) y el fallo estaba en el modelo, no en el prompt:"
                    : "The real tension wasn't “which model is smartest”, but what classification quality can be sustained on the hardware an office actually has. I evaluated the models against a rubric of 9 transcripts (one per priority × program), and the failure was in the model, not the prompt:"}
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-light">
                    <thead>
                      <tr className="border-b border-container-light/20 text-left text-light/70">
                        <th className="py-2 pr-6 font-semibold">{es ? "Modelo" : "Model"}</th>
                        <th className="py-2 pr-6 font-semibold">{es ? "Rúbrica" : "Rubric"}</th>
                        <th className="py-2 font-semibold">{es ? "Veredicto" : "Verdict"}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-container-light/10">
                      <tr>
                        <td className="py-2 pr-6 font-semibold">gemma3:1b</td>
                        <td className="py-2 pr-6">4/9</td>
                        <td className="py-2 text-light/80">
                          {es ? "Descartado — se le escaparon casos graves (ej. maltrato infantil)" : "Discarded — missed serious cases (e.g. child abuse)"}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-6 font-semibold text-[#34D399]">gemma3:4b</td>
                        <td className="py-2 pr-6 text-[#34D399]">8/9</td>
                        <td className="py-2 text-light/80">
                          {es ? "Elegido — default de producción; ~16 GB RAM, sin GPU" : "Chosen — production default; ~16 GB RAM, no GPU"}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-6 font-semibold">gemma3:12b</td>
                        <td className="py-2 pr-6">9/9</td>
                        <td className="py-2 text-light/80">
                          {es ? "Mejor calidad, pero pide PC potente (≥ 24 GB)" : "Better quality, but needs a powerful PC (≥ 24 GB)"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-light/70 text-sm leading-relaxed mt-5">
                  {es
                    ? "gemma3:4b quedó como default: es el piso de calidad y corre en una PC de escritorio con ~16 GB de RAM, sin GPU ni nube. Con 8 GB queda chico —el modelo tilda la máquina—; el 12b (9/9) rinde mejor pero pide un equipo más potente (≥24 GB). En hardware más limitado se baja a un modelo liviano (gemma3:1b / qwen3:1.7b), con un costo real de precisión que amortigua la red de keywords. Es un eval chico (9 transcripciones) y todavía sin correr sobre el hardware real de una sede: lo trato como criterio de decisión, no como benchmark cerrado."
                    : "gemma3:4b is the default: it's the quality floor and runs on a desktop PC with ~16 GB of RAM, no GPU or cloud. On 8 GB it's too tight —the model stalls the machine—; the 12b (9/9) performs better but needs a more powerful box (≥24 GB). On more limited hardware it drops to a lighter model (gemma3:1b / qwen3:1.7b), with a real precision cost cushioned by the keyword net. It's a small eval (9 transcripts) and not yet run on a real office's hardware: I treat it as a decision criterion, not a closed benchmark."}
                </p>
              </div>
            </section>
          </FadeOnScroll>

          {/* ==================== DIVIDER ==================== */}
          <div className="w-full px-8 md:px-12 lg:px-20 mb-28">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-[#0056d2]/40 to-transparent" />
          </div>

          {/* ==================== DECISIONES ==================== */}
          <FadeOnScroll>
            <section id="decisiones" className="w-full px-8 md:px-12 lg:px-20 mb-16">
              <div className="max-w-4xl mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-light mb-6">
                  {es ? "Por qué estas decisiones" : "Why these decisions"}
                </h2>
                <p className="text-light text-lg leading-relaxed">
                  {es
                    ? "EstoyAi fue diseñado desde las restricciones de las ONGs de territorio, no a pesar de ellas. Cada decisión responde a una realidad concreta del campo."
                    : "EstoyAi was designed from the constraints of field NGOs, not in spite of them. Each decision answers a concrete reality of the field."}
                </p>
              </div>
              <GridContainer cols={{ default: 1, md: 2 }} gap="lg" className="!px-0 [&>*]:h-full">
                {[
                  {
                    titleEs: "Por qué offline-first",
                    titleEn: "Why offline-first",
                    textEs:
                      "Los promotores visitan familias en zonas sin señal. Un formulario que requiere internet en el momento del registro es un formulario que no se usa. El audio se graba, queda guardado y sube solo cuando hay conexión. El promotor no tiene que hacer nada.",
                    textEn:
                      "Promoters visit families in areas with no signal. A form that requires internet at the moment of recording is a form that goes unused. The audio is recorded, stored, and uploads on its own when there's a connection. The promoter does nothing.",
                  },
                  {
                    titleEs: "Por qué Word y no una app propia",
                    titleEn: "Why Word and not a custom app",
                    textEs:
                      "Coordinadores y trabajadores sociales ya usan Word. No hay capacitación, no hay pantalla nueva que aprender. El .docx es editable, imprimible, archivable y auditable por cualquiera. Una app de visualización propia agregaría una dependencia más y excluiría a quien prefiere el papel.",
                    textEn:
                      "Coordinators and social workers already use Word. No training, no new screen to learn. The .docx is editable, printable, filable, and auditable by anyone. A custom viewer would add one more dependency and exclude those who prefer paper.",
                  },
                  {
                    titleEs: "Por qué no un CRM",
                    titleEn: "Why not a CRM",
                    textEs:
                      "Las ONGs ya lo intentaron: Asana, Notion, Salesforce, Trello. Los abandonaron porque el cuello de botella no está en la coordinación sino en el registro de campo. Si los datos de las visitas no entran de forma simple, el CRM está vacío igual. EstoyAi resuelve la captura; lo que se integre después es decisión de cada organización.",
                    textEn:
                      "NGOs already tried it: Asana, Notion, Salesforce, Trello. They abandoned them because the bottleneck isn't coordination —it's field recording. If visit data doesn't enter simply, the CRM stays empty anyway. EstoyAi solves capture; whatever integrates afterward is each organization's decision.",
                  },
                ].map((d, i) => (
                  <Block key={i} colSpan={1}>
                    <FeatureCard
                      title={es ? d.titleEs : d.titleEn}
                      description={es ? d.textEs : d.textEn}
                      variant="dark"
                      className="h-full"
                    />
                  </Block>
                ))}
              </GridContainer>
            </section>
          </FadeOnScroll>

          {/* ==================== SOBERANÍA DE DATOS (spotlight verde) ==================== */}
          <FadeOnScroll delay={80}>
            <section id="soberania" className="w-full px-8 md:px-12 lg:px-20 mb-28">
              <div className="w-full rounded-2xl border border-[#34D399]/30 bg-gradient-to-br from-[#04231a]/60 to-[#0d1c2e]/60 p-8 md:p-12">
                <span className="text-xs font-bold tracking-widest text-[#34D399]">
                  {es ? "SOBERANÍA DE DATOS" : "DATA SOVEREIGNTY"}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-light mt-3 mb-4">
                  {es ? "Los datos no salen de la sede" : "Data never leaves the office"}
                </h2>
                <p className="text-light text-lg leading-relaxed max-w-3xl mb-8">
                  {es
                    ? "El diferencial no es solo técnico: es una postura ética. Los datos de beneficiarios —muchas veces menores y familias vulnerables— son lo más sensible que maneja una ONG. EstoyAi los trata en consecuencia."
                    : "The differentiator isn't only technical: it's an ethical stance. Beneficiary data —often minors and vulnerable families— is the most sensitive thing an NGO handles. EstoyAi treats it accordingly."}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      titleEs: "Procesamiento local",
                      titleEn: "Local processing",
                      textEs:
                        "Whisper, Ollama y el almacenamiento corren en la PC de la ONG. Ningún audio ni dato pasa por servidores externos.",
                      textEn:
                        "Whisper, Ollama, and storage run on the NGO's PC. No audio or data passes through external servers.",
                    },
                    {
                      titleEs: "Auditable porque es abierto",
                      titleEn: "Auditable because it's open",
                      textEs:
                        "El código es público (MIT): para una ONG, eso no es cosmético, es seguridad. Cualquier persona técnica de confianza puede verificar que los datos no se copian ni se envían a ningún lado. La privacidad no es una promesa, es inspeccionable.",
                      textEn:
                        "The code is public (MIT): for an NGO that isn't cosmetic, it's security. Any trusted technical person can verify that data isn't copied or sent anywhere. Privacy isn't a promise —it's inspectable.",
                    },
                    {
                      titleEs: "Sin dependencias de nube",
                      titleEn: "No cloud dependencies",
                      textEs:
                        "Sin suscripciones a APIs de IA ni de transcripción. Si la PC se apaga, el sistema se apaga: la sede tiene control total (y es también un punto único de falla — ver límites al cierre).",
                      textEn:
                        "No subscriptions to AI or transcription APIs. If the PC turns off, the system turns off: the office has full control (and it's also a single point of failure — see limits at the end).",
                    },
                    {
                      titleEs: "Alineado a la Ley 25.326",
                      titleEn: "Aligned with Law 25.326",
                      textEs:
                        "El modelo de datos y los controles se documentan en función de la ley argentina de protección de datos personales y los derechos de los titulares.",
                      textEn:
                        "The data model and controls are documented around Argentina's personal data protection law and the rights of data subjects.",
                    },
                  ].map((g, i) => (
                    <div
                      key={i}
                      className="rounded-lg border border-[#34D399]/20 bg-white/[0.03] p-5"
                    >
                      <h3 className="text-light font-semibold mb-2">{es ? g.titleEs : g.titleEn}</h3>
                      <p className="text-light/75 text-sm leading-relaxed">
                        {es ? g.textEs : g.textEn}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </FadeOnScroll>

          {/* ==================== POR QUÉ ES DIFERENTE ==================== */}
          <FadeOnScroll>
            <section id="diferencial" className="w-full px-8 md:px-12 lg:px-20 mb-16">
              <div className="max-w-4xl mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-light mb-6">
                  {es ? "Por qué es diferente" : "Why it's different"}
                </h2>
                <p className="text-light text-lg leading-relaxed">
                  {es
                    ? "La mayoría de las soluciones para ONGs asumen conectividad estable, presupuesto para licencias, equipos técnicos y smartphones uniformes. Nada de eso describe a las organizaciones que más necesitan sistematizar."
                    : "Most NGO solutions assume stable connectivity, budget for licenses, technical teams, and uniform smartphones. None of that describes the organizations that most need to systematize."}
                </p>
              </div>

              {/* Comparación patrón / enfoque */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                <div className="rounded-2xl border border-subtle/60 bg-container/40 p-6 md:p-8">
                  <h3 className="text-light/60 font-semibold mb-4">
                    {es ? "El patrón habitual" : "The usual pattern"}
                  </h3>
                  <ul className="space-y-3 text-light/70">
                    {[
                      es ? "Requiere conexión estable en el momento del registro" : "Requires stable connection at recording time",
                      es ? "Licencias, suscripciones y costos por uso" : "Licenses, subscriptions, and usage costs",
                      es ? "Datos de beneficiarios en la nube de un tercero" : "Beneficiary data in a third party's cloud",
                      es ? "Otra pantalla que promotores y coordinación deben aprender" : "Another screen promoters and coordination must learn",
                      es ? "Genera documentos, pero no dice qué es urgente" : "Generates documents, but doesn't say what's urgent",
                      es ? "Requiere setup técnico o alguien de IT para instalarlo" : "Needs technical setup or IT to install",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm leading-relaxed">
                        <span className="text-light/30 mt-0.5">✕</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-[#0056d2]/40 bg-gradient-to-br from-[#04173a]/40 to-[#0d1c2e]/40 p-6 md:p-8">
                  <h3 className="text-[#4C8DFF] font-semibold mb-4">
                    {es ? "El enfoque EstoyAi" : "The EstoyAi approach"}
                  </h3>
                  <ul className="space-y-3 text-light/90">
                    {[
                      es ? "Graba sin señal; sube solo cuando hay red" : "Records with no signal; uploads on its own when networked",
                      es ? "Gratis y open source (MIT), sin nube" : "Free and open source (MIT), no cloud",
                      es ? "Todos los datos quedan en la PC de la sede" : "All data stays on the office PC",
                      es ? "Entrega un .docx en Word, sin pantalla nueva" : "Delivers a .docx in Word, no new screen",
                      es ? "Prioriza por criticidad y extrae accionables" : "Prioritizes by criticality and extracts action points",
                      es ? "Instalable por no técnicos: instalador guiado, sin línea de comandos" : "Installable by non-technical staff: guided installer, no command line",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm leading-relaxed">
                        <span className="text-[#34D399] mt-0.5">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </FadeOnScroll>

          {/* ==================== DIVIDER ==================== */}
          <div className="w-full px-8 md:px-12 lg:px-20 mb-28">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-[#0056d2]/40 to-transparent" />
          </div>

          {/* ==================== MULTI-ONG / CONFIGURABILIDAD ==================== */}
          <FadeOnScroll>
            <section id="config" className="w-full px-8 md:px-12 lg:px-20 mb-16">
              <div className="max-w-4xl mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-light mb-6">
                  {es ? "Un sistema, muchas ONGs" : "One system, many NGOs"}
                </h2>
                <p className="text-light text-lg leading-relaxed">
                  {es
                    ? "EstoyAi no está atado a un tipo de intervención. Los programas, los campos del informe y la estructura de los datos se configuran por organización —multi-tenant por subdominio. Se cambia configuración, no código. El piloto de referencia es Pequeños Pasos; además armé una segunda configuración muy distinta como prueba de concepto de la tesis:"
                    : "EstoyAi isn't tied to one type of intervention. Programs, report fields, and data structure are configured per organization —multi-tenant by subdomain. You change configuration, not code. The reference pilot is Pequeños Pasos; I also built a very different second configuration as a proof of concept for the thesis:"}
                </p>
              </div>

              <div className="mb-10 rounded-2xl border-l-4 border-[#4C8DFF] bg-container/40 p-6 md:p-8">
                <span className="text-xs font-bold tracking-widest text-[#4C8DFF]">
                  {es ? "LA TESIS" : "THE THESIS"}
                </span>
                <p className="text-light text-lg md:text-xl leading-relaxed mt-3">
                  {es
                    ? "Entre una ONG de nutrición y una de tratamiento de consumos, lo único que cambia es el esquema de datos. Si eso es cierto, no estás construyendo una solución para una ONG: estás construyendo infraestructura para el sector."
                    : "Between a nutrition NGO and a substance-use treatment NGO, the only thing that changes is the data schema. If that's true, you're not building a solution for one NGO: you're building infrastructure for the sector."}
                </p>
                <p className="text-light/70 leading-relaxed mt-4">
                  {es
                    ? "Esa observación redefinió el alcance del proyecto. La validé contra mi propia experiencia en el modelo SEDRONAR de tratamiento de consumos —una intervención en las antípodas de una visita de nutrición— y se sostuvo: la captura por voz y el triaje por criticidad son los mismos; cambian los programas y los campos del informe."
                    : "That observation redefined the project's scope. I validated it against my own experience with the SEDRONAR substance-use treatment model —an intervention at the opposite end from a nutrition visit— and it held: voice capture and criticality triage are the same; only the programs and report fields change."}
                </p>
              </div>

              <GridContainer cols={{ default: 1, md: 2 }} gap="lg" className="!px-0 [&>*]:h-full">
                <Block colSpan={1}>
                  <div className="bg-container/80 rounded-lg p-6 md:p-8 h-full card-elevated">
                    <div className="flex items-center gap-2 mb-3">
                      <h3 className="text-2xl font-semibold text-light">Pequeños Pasos</h3>
                      <span className="rounded-full bg-[#0056d2]/20 border border-[#4C8DFF]/40 px-2 py-0.5 text-[10px] font-semibold text-light/80">
                        {es ? "PILOTO" : "PILOT"}
                      </span>
                    </div>
                    <p className="text-light/70 text-sm mb-4">
                      {es
                        ? "ONG de intervención territorial · pequenospasos.estoyai.com"
                        : "Territorial-intervention NGO · pequenospasos.estoyai.com"}
                    </p>
                    <p className="text-light/85 leading-relaxed mb-4">
                      {es
                        ? "La organización con la que se diseñó el sistema, alrededor de tres programas de seguimiento de familias:"
                        : "The organization the system was designed with, around three family follow-up programs:"}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        es ? "Primera Infancia" : "Early Childhood",
                        es ? "Niñez y Adolescencia" : "Childhood & Adolescence",
                        es ? "Oficios" : "Trades",
                      ].map((p) => (
                        <span
                          key={p}
                          className="rounded-full border border-subtle/60 bg-white/[0.03] px-3 py-1 text-xs text-light/80"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </Block>
                <Block colSpan={1}>
                  <div className="bg-container/80 rounded-lg p-6 md:p-8 h-full card-elevated">
                    <div className="flex items-center gap-2 mb-3">
                      <h3 className="text-2xl font-semibold text-light">DTC Villatranquila</h3>
                      <span className="rounded-full bg-[#34D399]/15 border border-[#34D399]/40 px-2 py-0.5 text-[10px] font-semibold text-light/80">
                        {es ? "PRUEBA DE CONCEPTO" : "PROOF OF CONCEPT"}
                      </span>
                    </div>
                    <p className="text-light/70 text-sm mb-4">
                      {es ? "Modelo SEDRONAR de tratamiento de consumos" : "SEDRONAR model for substance-use treatment"}
                    </p>
                    <p className="text-light/85 leading-relaxed">
                      {es
                        ? "No es una segunda ONG a bordo: es una configuración que armé yo para una intervención en las antípodas —tratamiento de consumos problemáticos— y la validé contra mi propia experiencia en el modelo SEDRONAR. Prueba que el sistema se adapta solo con configuración: la captura por voz y el triaje por criticidad son los mismos; cambian los programas y los campos del informe."
                        : "It isn't a second NGO on board: it's a configuration I built for an intervention at the opposite end —problematic substance-use treatment— and validated against my own experience with the SEDRONAR model. It proves the system adapts through configuration alone: voice capture and criticality triage are the same; only the programs and report fields change."}
                    </p>
                  </div>
                </Block>
              </GridContainer>
            </section>
          </FadeOnScroll>

          {/* ==================== DIVIDER ==================== */}
          <div className="w-full px-8 md:px-12 lg:px-20 mb-28">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-[#0056d2]/40 to-transparent" />
          </div>

          {/* ==================== ESTADO Y QUÉ SIGUE ==================== */}
          <FadeOnScroll delay={80}>
            <section id="cierre" className="w-full px-8 md:px-12 lg:px-20 mb-20 pb-16">
              <div className="max-w-3xl mx-auto mb-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-light mb-4">
                  {es ? "Estado y qué sigue" : "Status and what's next"}
                </h2>
                <p className="text-light text-lg leading-relaxed">
                  {es
                    ? "Hoy EstoyAi es un MVP funcional, diseñado y construido en solitario después del hackathon. Validé el problema con la dirección de Pequeños Pasos, pero todavía nadie de una ONG usó el flujo completo en un día laboral real. El sistema está disponible para cualquier organización que quiera adoptarlo."
                    : "Today EstoyAi is a working MVP, designed and built solo after the hackathon. I validated the problem with the leadership of Pequeños Pasos, but no one from an NGO has yet used the full flow on a real workday. The system is available for any organization that wants to adopt it."}
                </p>
              </div>

              {/* Límites conocidos + próximo paso */}
              <GridContainer cols={{ default: 1, md: 2 }} gap="lg" className="!px-0 [&>*]:h-full mb-12">
                <Block colSpan={1}>
                  <div className="bg-container/80 rounded-lg p-6 md:p-8 h-full card-elevated">
                    <h3 className="text-xl font-semibold text-light mb-3">
                      {es ? "Límites conocidos" : "Known limits"}
                    </h3>
                    <ul className="space-y-2 text-light/80 text-sm leading-relaxed list-disc pl-5">
                      <li>
                        {es
                          ? "Validé el problema con coordinación, no el comportamiento con un promotor: todo el producto depende de que efectivamente dicte 2 min al terminar la visita, y eso todavía no lo observé con nadie."
                          : "I validated the problem with coordination, not the behavior with a promoter: the whole product depends on them actually dictating 2 min after the visit, and I haven't observed that with anyone yet."}
                      </li>
                      <li>
                        {es
                          ? "Calidad de transcripción en campo: audio de celular, ruido y tonada rioplatense son el mayor riesgo técnico. Es un frente abierto que hay que medir con audio real."
                          : "Field transcription quality: phone audio, noise, and Rioplatense accent are the biggest technical risk. It's an open front to measure with real audio."}
                      </li>
                      <li>
                        {es
                          ? "Punto único de falla: todo corre en la PC de la sede. Es lo que da la soberanía, pero sin IT en la sede, si esa PC muere, no hay sistema. Mitigación hoy: backup manual a disco externo."
                          : "Single point of failure: everything runs on the office PC. That's what gives sovereignty, but with no IT on site, if that PC dies there's no system. Current mitigation: manual backup to an external disk."}
                      </li>
                    </ul>
                  </div>
                </Block>
                <Block colSpan={1}>
                  <div className="bg-container/80 rounded-lg p-6 md:p-8 h-full card-elevated">
                    <h3 className="text-xl font-semibold text-light mb-3">
                      {es ? "Próximo paso real" : "Real next step"}
                    </h3>
                    <p className="text-light/80 text-sm leading-relaxed mb-3">
                      {es
                        ? "Poner el flujo completo en manos de un promotor y una coordinadora durante un día de trabajo, y medir lo único que valida el producto: ¿se usa sin mí al lado?, ¿el .docx es lo que el financiador pide?, ¿cuánto tiempo ahorra de verdad frente al cuaderno?"
                        : "Put the full flow in the hands of a promoter and a coordinator during a real workday, and measure the only thing that validates the product: is it used without me next to it? is the .docx what the funder asks for? how much time does it really save versus the notebook?"}
                    </p>
                    <p className="text-light/80 text-sm leading-relaxed">
                      {es
                        ? "Qué haría distinto: llegar antes a esa sesión con la ONG, sin esperar a “tenerlo todo”. La lección de este proyecto es que el validador no es un examen final al que llegar listo —es una dependencia del roadmap."
                        : "What I'd do differently: get to that session with the NGO sooner, without waiting to “have it all”. The lesson of this project is that the validator isn't a final exam you show up ready for —it's a dependency of the roadmap."}
                    </p>
                  </div>
                </Block>
              </GridContainer>

              <div className="max-w-3xl mx-auto mb-12">
                <p className="text-xl md:text-2xl text-light font-semibold leading-relaxed text-center">
                  {es
                    ? "Diseñar desde las restricciones —sin señal, sin presupuesto, sin equipo técnico, con datos que no pueden salir— no fue una limitación. Fue el producto."
                    : "Designing from the constraints —no signal, no budget, no technical team, with data that can't leave— wasn't a limitation. It was the product."}
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://estoyai.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-full border border-[#4C8DFF]/50 bg-[#0056d2]/15 px-6 py-2.5 text-sm font-semibold text-light hover:bg-[#0056d2]/30 transition-colors"
                >
                  {es ? "Visitar estoyai.com ↗" : "Visit estoyai.com ↗"}
                </a>
                <a
                  href="https://github.com/lautaro-temperini"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-full border border-subtle/60 px-6 py-2.5 text-sm font-semibold text-light/90 hover:text-light hover:border-light/40 transition-colors"
                >
                  {es ? "Ver el código (MIT) ↗" : "View the code (MIT) ↗"}
                </a>
              </div>
            </section>
          </FadeOnScroll>
        </main>
      </div>
      <NextCaseStudy currentSlug="estoyai" lang={lang} />
      <div className="relative z-[20]">
        <Footer dict={dict} lang={lang} />
      </div>
      <ScrollToTop size={48} />
    </>
  )
}
