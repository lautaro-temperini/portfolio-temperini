import { getDictionary } from "@/lib/getDictionary"
import Navbar from "@/components/navbar/Navbar"
import ScrollToTop from "@/components/fxscripts/scroll-to-top"
import Footer from "@/components/footer/Footer"
import { GridContainer } from "@/components/sections/GridContainer"
import { Block } from "@/components/sections/Block"
import { BentoGrid, BentoItem } from "@/components/sections/BentoGrid"
import FadeOnScroll from "@/components/fxscripts/FadeOnScroll"
import SectionNav from "@/components/case-study/SectionNav"
import DevImage from "@/components/DevImage"

export const metadata = {
  title: "Manijapp | Discovery de eventos alternativos | Lautaro R. Temperini",
  description:
    "MVP independiente para discovery de eventos en CABA y La Plata: cómo pasé de 'centralizar eventos' a resolver un problema de curaduría y confianza.",
  keywords:
    "Manijapp, MVP, product design, discovery de eventos, UX/UI, validación, Lautaro Temperini, caso de estudio, startup, Buenos Aires",
  alternates: {
    canonical: "/manijapp",
  },
  openGraph: {
    title: "Manijapp | Discovery de eventos alternativos | Lautaro R. Temperini",
    description:
      "Descubrir eventos no es el problema. El problema es saber cuáles valen la pena.",
    url: "https://temperini.vercel.app/manijapp",
    siteName: "Temperini Portfolio",
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Manijapp | Discovery de eventos alternativos | Lautaro R. Temperini",
    description:
      "Descubrir eventos no es el problema. El problema es saber cuáles valen la pena.",
  },
}

export default async function ManijappPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang: langParam } = await params
  const lang = langParam === "es" || langParam === "en" ? langParam : "es"
  const dict = await getDictionary(lang)

  const es = lang === "es"

  return (
    <>
      <Navbar dict={dict} lang={lang} />
      <div className="relative z-[20]">
        <main className="[&>*]:!transform-none">
          {/* ---- Navegación lateral con puntos ---- */}
          <SectionNav
            sections={[
              { id: "contexto",   label: es ? "El problema"      : "The problem"      },
              { id: "decisiones", label: es ? "Decisiones clave"  : "Key decisions"    },
              { id: "validacion", label: es ? "Validación"        : "Validation"       },
              { id: "supply",     label: "Supply"                                      },
              { id: "ia",         label: es ? "Diseñar con IA"    : "Designing with AI"},
              { id: "cierre",     label: es ? "Qué sigue"         : "What's next"      },
            ]}
          />

          {/* ==================== 1. HERO ==================== */}
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
                <p className="text-base md:text-lg text-light leading-relaxed mb-6">
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
                    {es ? "• Ver Manijapp ↗" : "• View Manijapp ↗"}
                  </a>
                </div>
              </div>
            </section>
          </FadeOnScroll>

          {/* ==================== BANNER ==================== */}
          <FadeOnScroll delay={80}>
            <section className="w-full px-8 md:px-12 lg:px-20 mb-16">
              <div className="relative w-full h-[150px] md:h-[200px] rounded-lg overflow-hidden bg-[#1C0900]">
                <DevImage
                  alt="Banner Manijapp"
                  fill
                  imageClassName="object-cover"
                />
              </div>
            </section>
          </FadeOnScroll>

          {/* ==================== PROJECT SNAPSHOT ==================== */}
          <section className="w-full px-8 md:px-12 lg:px-20 mb-16">
            <div className="text-sm text-light/80 space-y-2">
              <div>
                <span className="text-light/70 font-semibold">{es ? "Tipo" : "Type"}</span>
                {" · "}{es ? "MVP independiente, validación en producción" : "Independent MVP, production validation"}
              </div>
              <div>
                <span className="text-light/70 font-semibold">{es ? "Rol" : "Role"}</span>
                {" · "}{es ? "Product Designer — estrategia, UX/UI, discovery, métricas" : "Product Designer — strategy, UX/UI, discovery, metrics"}
              </div>
              <div>
                <span className="text-light/70 font-semibold">Timeline</span>
                {" · "}{es ? "9 días de construcción + 3 ciclos de validación" : "9 days of building + 3 validation cycles"}
              </div>
              <div>
                <span className="text-light/70 font-semibold">Stack</span>
                {" · "}React, Cursor, Vercel, Leaflet, GA4, Microsoft Clarity, Supabase
              </div>
              <div>
                <span className="text-light/70 font-semibold">{es ? "Estado" : "Status"}</span>
                {" · "}{es
                  ? "Validación activa. Próximo ciclo con distribución offline y retención sin estímulo."
                  : "Active validation. Next cycle: offline distribution and unstimulated retention."}
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
              <h2 className="text-3xl md:text-4xl font-bold text-light mb-6">TL;DR</h2>
              <div className="max-w-4xl text-light leading-relaxed space-y-4">
                <p className="text-lg">
                  <span className="font-semibold">{es ? "Problema." : "Problem."}</span>{" "}
                  {es
                    ? "Los eventos independientes en CABA y La Plata no tienen una fuente centralizada confiable. El discovery ocurre de forma fragmentada: Instagram, WhatsApp, boca a boca."
                    : "Independent events in Buenos Aires and La Plata lack a reliable centralized source. Discovery happens in fragmented ways: Instagram, WhatsApp, word of mouth."}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">Insight.</span>{" "}
                  {es
                    ? "El problema no es encontrar más eventos, sino identificar cuáles valen la pena. La fricción está en la curaduría y la confianza, no en la disponibilidad."
                    : "The problem isn't finding more events — it's identifying which ones are worth it. The friction is in curation and trust, not availability."}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">{es ? "Solución." : "Solution."}</span>{" "}
                  {es
                    ? "Plataforma de discovery con validación comunitaria visible, geolocalización y foco en eventos fuera del circuito tradicional."
                    : "A discovery platform with visible community validation, geolocation, and a focus on events outside the mainstream circuit."}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">{es ? "Resultados." : "Results."}</span>{" "}
                  {es
                    ? "Señales tempranas de retención sostenidas en múltiples días, comportamiento real en todo el core loop (exploración, validación, compartir, publicación) y primeros casos de supply sin pedido explícito."
                    : "Early retention signals sustained over multiple days, real behavior across the full core loop (exploration, validation, sharing, publishing) and first cases of organic supply."}
                </p>
                <p className="text-sm text-light/50 italic">
                  {es
                    ? "Estado: Validación activa. Próximo ciclo con distribución offline y retención sin estímulo."
                    : "Status: Active validation. Next cycle: offline distribution and unstimulated retention."}
                </p>
              </div>
            </section>
          </FadeOnScroll>

          {/* ==================== DIVIDER ==================== */}
          <div className="w-full px-8 md:px-12 lg:px-20 mb-28">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-[#08A4E1]/40 to-transparent" />
          </div>

          {/* ==================== EL PROBLEMA Y EL INSIGHT ==================== */}
          <FadeOnScroll delay={150}>
            <section id="contexto" className="w-full px-8 md:px-12 lg:px-20 mb-20">
              <GridContainer cols={{ default: 1, md: 2 }} gap="lg" className="!px-0 [&>*]:h-full">
                <Block colSpan={1}>
                  <h2 className="text-3xl md:text-4xl font-bold text-light mb-6">
                    {es ? "El problema" : "The problem"}
                  </h2>
                  <div className="text-light leading-relaxed space-y-4 max-w-4xl">
                    <p className="text-lg">
                      {es
                        ? "Los fines de semana en La Plata y CABA, la pregunta \"¿qué hay para hacer?\" se resuelve mal. Eventbrite tiene los eventos masivos. CulturaBA tiene la agenda oficial. Instagram tiene todo mezclado."
                        : "On weekends in La Plata and Buenos Aires, the question \"what is there to do?\" gets answered poorly. Eventbrite has the mainstream events. CulturaBA has the official calendar. Instagram has everything mixed together."}
                    </p>
                    <p className="text-lg">
                      {es
                        ? "El show en un lugar sin habilitación, la fiesta que solo circula por WhatsApp, el evento en un bar nuevo sin visibilidad — no aparecen en ninguna plataforma."
                        : "The show at an unlicensed venue, the party that only circulates on WhatsApp, the event at a new bar with no visibility — none of them appear on any platform."}
                    </p>
                    <p className="text-lg">
                      {es
                        ? "La hipótesis inicial era simple: centralizar eventos cerca tuyo. Eso cambió en el primer ciclo de discovery."
                        : "The initial hypothesis was simple: centralize events near you. That changed in the first discovery cycle."}
                    </p>
                  </div>
                </Block>

                <Block colSpan={1}>
                  <div className="text-light leading-relaxed space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-light mb-6">
                      {es ? "El insight que lo redefine" : "The insight that reframes it"}
                    </h2>
                    <p className="text-lg">
                      {es
                        ? "Tres testers sin conexión entre sí llegaron a la misma conclusión sin que nadie se las sugiriera: el diferencial no son todos los eventos, son los que no están en ningún otro lado."
                        : "Three testers with no connection to each other reached the same conclusion without being prompted: the differentiator isn't all the events — it's the ones that aren't anywhere else."}
                    </p>
                    <p className="text-lg">
                      {es
                        ? "No querían otro Eventbrite. Querían el evento informal, verificado, que hoy solo circula por WhatsApp."
                        : "They didn't want another Eventbrite. They wanted the informal, verified event that today only circulates on WhatsApp."}
                    </p>
                    <p className="text-lg font-semibold">
                      {es
                        ? "Eso redefine el producto. No es un problema de aggregation. Es un problema de curaduría y confianza."
                        : "That reframes the product. It's not an aggregation problem. It's a curation and trust problem."}
                    </p>
                  </div>
                </Block>
              </GridContainer>
            </section>
          </FadeOnScroll>

          {/* Mockup Explorar + Mapa */}
          <FadeOnScroll>
            <section className="w-full px-8 md:px-12 lg:px-20 mb-20">
              <DevImage
                alt="Mockup de sección Explorar y mockup de Mapa"
                width={1200}
                height={675}
                caption={es
                  ? "Sección Explorar y vista de Mapa — dos modos de acceso al mismo contenido según el contexto del usuario."
                  : "Explore section and Map view — two access modes for the same content depending on the user's context."}
                className="w-full"
              />
            </section>
          </FadeOnScroll>

          {/* ==================== DIVIDER ==================== */}
          <div className="w-full px-8 md:px-12 lg:px-20 mb-28">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-[#08A4E1]/40 to-transparent" />
          </div>

          {/* ==================== VENTAJA COMPETITIVA ==================== */}
          <FadeOnScroll>
            <section className="w-full px-8 md:px-12 lg:px-20 mb-20">
              <h2 className="text-3xl md:text-4xl font-bold text-light mb-8">
                {es ? "La ventaja de arrancar desde adentro" : "The advantage of starting from the inside"}
              </h2>
              <GridContainer cols={{ default: 1, md: 2 }} gap="lg" className="!px-0 items-start">
                <Block colSpan={1}>
                  <div className="text-light leading-relaxed space-y-6">
                    <p className="text-lg">
                      {es
                        ? "La idea no vino de un análisis de mercado. Fui DJ durante años y tengo red directa con promotores y organizadores de la escena independiente en CABA y La Plata. Eso no es contexto biográfico — es acceso real al lado oferta del marketplace que reduce la fricción inicial que mata a la mayoría de los marketplaces de dos lados antes de llegar al primer evento real."
                        : "The idea didn't come from a market analysis. I was a DJ for years and have direct connections with promoters and organizers from the independent scene in Buenos Aires and La Plata. That's not biographical context — it's real access to the supply side of the marketplace that reduces the cold-start friction that kills most two-sided marketplaces before they reach their first real event."}
                    </p>
                    <p className="text-lg">
                      {es
                        ? "El análisis de competidores lo confirmó desde adentro. El research de Jodify no fue de landing page, fue contacto directo posando como productora. Lo que emergió fue más útil que cualquier benchmarking superficial: Jodify opera como canal B2B con gatekeeping humano, llamada de onboarding, 10% de comisión, posicionamiento adicional pago. Funciona, pero excluye lo verdaderamente underground."
                        : "The competitor analysis confirmed it from the inside. The Jodify research wasn't based on their landing page — it was direct contact posing as a venue. What emerged was more useful than any surface-level benchmarking: Jodify operates as a B2B channel with human gatekeeping, an onboarding call, 10% commission, and paid additional positioning. It works, but it excludes the truly underground."}
                    </p>
                    <div className="bg-gradient-to-br from-[#1C0900]/40 to-[#2D1200]/40 backdrop-blur-sm rounded-2xl p-8 border border-[#C45200]/30">
                      <p className="text-light text-lg">
                        {es ? (
                          <>
                            El contraste con Manijapp no es de features sino de enfoque: dos maneras distintas de construir confianza en un marketplace.{" "}
                            <span className="font-semibold">
                              Jodify valida antes de publicar. Manijapp valida después, vía comunidad.
                            </span>{" "}
                            Son apuestas distintas. Y esa distinción define qué tipo de oferta puede entrar y cuál queda afuera.
                          </>
                        ) : (
                          <>
                            The contrast with Manijapp isn't about features but about approach: two different ways of building trust in a marketplace.{" "}
                            <span className="font-semibold">
                              Jodify validates before publishing. Manijapp validates after, via community.
                            </span>{" "}
                            These are different bets. And that distinction defines what kind of supply can enter and what stays out.
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                </Block>
                <Block colSpan={1}>
                  <DevImage
                    alt="Fiesta electrónica underground en Buenos Aires: DJ mezclando en vinilo y digital frente a una pista densa, con luces rojas y azules entre humo y ambiente cinematográfico."
                    width={600}
                    height={500}
                    className="w-full"
                  />
                </Block>
              </GridContainer>
            </section>
          </FadeOnScroll>

          {/* ==================== DIVIDER ==================== */}
          <div className="w-full px-8 md:px-12 lg:px-20 mb-28">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-[#08A4E1]/40 to-transparent" />
          </div>

          {/* ==================== DECISIONES CLAVE ==================== */}
          <FadeOnScroll delay={80}>
            <section id="decisiones" className="w-full px-8 md:px-12 lg:px-20 mb-20">
              <div className="max-w-4xl mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-light mb-6">
                  {es ? "Decisiones clave" : "Key decisions"}
                </h2>
              </div>
              <BentoGrid cols={{ default: 1, md: 2, lg: 3 }} gap="md">
                {/* 01 — full width en md */}
                <BentoItem colSpan={{ default: 1, md: 2 }}>
                  <div className="bg-container/80 rounded-lg p-6 md:h-full card-elevated">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl font-bold text-light">01</span>
                      <h3 className="text-xl font-bold text-light">
                        {es ? "Construir antes de hacer research formal" : "Build before formal research"}
                      </h3>
                    </div>
                    <p className="text-light text-sm leading-relaxed mb-3">
                      {es
                        ? "No era para tener un producto terminado, sino algo concreto que mostrar a personas reales. Una pantalla genera reacciones que una idea no: cuando alguien ve el mapa, entiende en segundos y ahí aparecen las confusiones, lo que falta y los problemas de copy."
                        : "Not to have a finished product, but something concrete to show real people. A screen generates reactions that an idea doesn't: when someone sees the map, they understand in seconds — and that's where the confusions, missing pieces, and copy problems emerge."}
                    </p>
                    <p className="text-light/70 text-sm italic">
                      {es
                        ? "El trade-off era claro: lanzar un prototipo sin todas las respuestas o perder semanas en research teórico que igual iba a cambiar al usarlo. Elegí lanzar y validar desde el día uno, usando el producto como herramienta de aprendizaje. Cinco conversaciones reales en 48 horas enseñaron más que cualquier encuesta por email."
                        : "The trade-off was clear: launch a prototype without all the answers, or spend weeks on theoretical research that would change anyway once in use. I chose to launch and validate from day one, using the product as a learning tool. Five real conversations in 48 hours taught more than any email survey."}
                    </p>
                  </div>
                </BentoItem>

                {/* 02 */}
                <BentoItem colSpan={1}>
                  <div className="bg-container/80 rounded-lg p-6 md:h-full card-elevated">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl font-bold text-light">02</span>
                      <h3 className="text-xl font-bold text-light">Spec-Driven Development</h3>
                    </div>
                    <div className="space-y-2 text-light text-sm leading-relaxed">
                      <p>
                        {es
                          ? "Sin especificación previa, la IA decide por vos. El criterio del designer se vuelve el input más crítico del sistema."
                          : "Without prior specification, the AI decides for you. The designer's judgment becomes the most critical input in the system."}
                      </p>
                      <p className="text-light/70 italic">
                        {es
                          ? <>Antes de ejecutar con un agente, el producto necesita un{" "}<code className="rounded bg-container-light/10 px-1 text-xs">.md</code>{" "}que defina qué problema resuelve, quién lo usa y qué no puede decidir la IA sola.</>
                          : <>Before executing with an agent, the product needs a{" "}<code className="rounded bg-container-light/10 px-1 text-xs">.md</code>{" "}that defines what problem it solves, who uses it, and what the AI cannot decide alone.</>}
                      </p>
                    </div>
                  </div>
                </BentoItem>

                {/* 03 */}
                <BentoItem colSpan={1}>
                  <div className="bg-container/80 rounded-lg p-6 md:h-full card-elevated">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl font-bold text-light">03</span>
                      <h3 className="text-xl font-bold text-light">
                        {es ? "Wizard of Oz antes que backend" : "Wizard of Oz before backend"}
                      </h3>
                    </div>
                    <div className="space-y-2 text-light text-sm leading-relaxed">
                      <p>
                        {es
                          ? "El formulario existe, los datos llegan a un Google Sheet, la publicación se hace manualmente. El organizador percibe que el flujo existe."
                          : "The form exists, data flows to a Google Sheet, and publishing is done manually. The organizer perceives that the flow exists."}
                      </p>
                      <p className="text-light/70 italic">
                        {es
                          ? "El backend real se construye cuando haya evidencia de intención de carga autónoma, no antes."
                          : "The real backend gets built when there's evidence of autonomous upload intent, not before."}
                      </p>
                    </div>
                  </div>
                </BentoItem>

                {/* 04 */}
                <BentoItem colSpan={1}>
                  <div className="bg-container/80 rounded-lg p-6 md:h-full card-elevated">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl font-bold text-light">04</span>
                      <h3 className="text-xl font-bold text-light">
                        {es ? "Dos sistemas de validación separados" : "Two separate validation systems"}
                      </h3>
                    </div>
                    <div className="space-y-3 text-light text-sm leading-relaxed">
                      <div>
                        <h4 className="font-semibold mb-1">
                          {es ? "⭐ Estrellas → venue" : "⭐ Stars → venue"}
                        </h4>
                        <p>
                          {es
                            ? "Permanentes, reputación acumulada. Ligadas al lugar, no al evento."
                            : "Permanent, accumulated reputation. Tied to the place, not the event."}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">
                          {es ? "👍 Pulgares → evento" : "👍 Thumbs → event"}
                        </h4>
                        <p>
                          {es
                            ? "Contextuales, reversibles. Un voto desde la card es señal de escaneo. Desde el detalle, señal de decisión deliberada."
                            : "Contextual, reversible. A vote from the card signals scanning behavior. From the detail, it signals deliberate decision-making."}
                        </p>
                      </div>
                    </div>
                  </div>
                </BentoItem>

                {/* 05 */}
                <BentoItem colSpan={1}>
                  <div className="bg-container/80 rounded-lg p-6 md:h-full card-elevated">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl font-bold text-light">05</span>
                      <h3 className="text-xl font-bold text-light">
                        {es ? "El botón Guardar como sensor" : "The Save button as a sensor"}
                      </h3>
                    </div>
                    <div className="space-y-2 text-light text-sm leading-relaxed">
                      <p>
                        {es
                          ? "Se mantuvo clickeable con \"Próximamente\". No por deuda técnica, sino como sensor deliberado."
                          : "Kept clickable with \"Coming soon.\" Not as technical debt, but as a deliberate sensor."}
                      </p>
                      <p className="text-light/70 italic">
                        {es
                          ? "Si nadie lo toca, se elimina. Si hay clicks, se prioriza. Esa misma lógica rigió cada decisión de infraestructura del proyecto."
                          : "If no one touches it, cut it. If there are clicks, prioritize it. That same logic drove every infrastructure decision in the project."}
                      </p>
                    </div>
                  </div>
                </BentoItem>
              </BentoGrid>
            </section>
          </FadeOnScroll>

          {/* Wizard of Oz — Form → Sheet → publicación manual */}
          <FadeOnScroll>
            <section className="w-full px-8 md:px-12 lg:px-20 mb-12">
              <DevImage
                alt="Flujo Wizard of Oz: Form → Google Sheet → publicación manual"
                width={1200}
                height={500}
                caption={es
                  ? "Flujo de carga: el organizador percibe que la publicación existe. El backend espera evidencia real de demanda."
                  : "Loading flow: the organizer perceives that publishing exists. The backend waits for real evidence of demand."}
                className="w-full"
              />
            </section>
          </FadeOnScroll>

          {/* Sistema de validación antes/después */}
          <FadeOnScroll delay={80}>
            <section className="w-full px-8 md:px-12 lg:px-20 mb-20">
              <GridContainer cols={{ default: 1, md: 2 }} gap="lg" className="!px-0">
                <Block colSpan={1}>
                  <DevImage
                    alt="Sistema de validación antes: estrellas y recomendación mezcladas, señal ambigua"
                    width={600}
                    height={400}
                    caption={es
                      ? "Antes — estrellas y recomendación mezcladas. Señal ambigua."
                      : "Before — stars and recommendation mixed. Ambiguous signal."}
                    className="w-full"
                  />
                </Block>
                <Block colSpan={1}>
                  <DevImage
                    alt="Sistema de validación después: estrellas para venue, pulgares para evento, tracking diferenciado"
                    width={600}
                    height={400}
                    caption={es
                      ? "Después — sistemas separados. Tracking diferenciado por origen (card vs detalle)."
                      : "After — separate systems. Differentiated tracking by origin (card vs detail)."}
                    className="w-full"
                  />
                </Block>
              </GridContainer>
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
                {es ? "Validación: tres ciclos, decisiones encadenadas" : "Validation: three cycles, chained decisions"}
              </h2>

              {/* Core loop table */}
              <div className="mb-10">
                <h3 className="text-xl font-semibold text-light mb-4">
                  {es ? "Core loop con datos reales" : "Core loop with real data"}
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-light">
                    <thead>
                      <tr className="border-b border-container-light/20">
                        <th className="py-3 pr-6 text-left font-semibold text-light/70">{es ? "Paso" : "Step"}</th>
                        <th className="py-3 pr-6 text-right font-semibold text-light/70">{es ? "Ciclo 2" : "Cycle 2"}</th>
                        <th className="py-3 text-right font-semibold text-light/70">{es ? "Ciclo 3" : "Cycle 3"}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-container-light/10">
                      <tr>
                        <td className="py-3 pr-6">{es ? "Entraron a la app" : "Entered the app"}</td>
                        <td className="py-3 pr-6 text-right">{es ? "77 sesiones" : "77 sessions"}</td>
                        <td className="py-3 text-right">{es ? "~35 sesiones" : "~35 sessions"}</td>
                      </tr>
                      <tr>
                        <td className="py-3 pr-6">{es ? "Abrieron detalle de evento" : "Opened event detail"}</td>
                        <td className="py-3 pr-6 text-right">43%</td>
                        <td className="py-3 text-right">44%</td>
                      </tr>
                      <tr>
                        <td className="py-3 pr-6">{es ? "Interactuaron con pulgares" : "Interacted with thumbs"}</td>
                        <td className="py-3 pr-6 text-right">13%</td>
                        <td className="py-3 text-right">6%</td>
                      </tr>
                      <tr>
                        <td className="py-3 pr-6">{es ? "Compartieron eventos" : "Shared events"}</td>
                        <td className="py-3 pr-6 text-right">5%</td>
                        <td className="py-3 text-right">6%</td>
                      </tr>
                      <tr>
                        <td className="py-3 pr-6">{es ? "Publicaron un evento" : "Published an event"}</td>
                        <td className="py-3 pr-6 text-right">1</td>
                        <td className="py-3 text-right">2</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4 text-xs italic text-light/50">
                  {es
                    ? "El funnel completo existe con comportamiento real en cada paso. Los números son pequeños. La forma es correcta."
                    : "The full funnel exists with real behavior at each step. Numbers are small. The shape is right."}
                </p>
              </div>

              {/* Tres ciclos */}
              <GridContainer cols={{ default: 1, md: 3 }} gap="md" className="!px-0 [&>*]:h-full">
                <Block colSpan={1}>
                  <div className="bg-container/80 rounded-lg p-6 h-full card-elevated">
                    <h3 className="text-lg font-bold text-light mb-3">
                      {es ? "Ciclo 1 · Primera señal, metodología contaminada" : "Cycle 1 · First signal, contaminated methodology"}
                    </h3>
                    <p className="text-light text-sm leading-relaxed mb-3">
                      {es
                        ? "17 contactos, 5 sesiones reales. Un usuario volvió tres veces en el mismo fin de semana sin ser contactado. Pero las variables de medición seguían cambiando. Eso invalida la señal."
                        : "17 contacts, 5 real sessions. One user returned three times in the same weekend without being contacted. But the measurement variables kept changing. That invalidates the signal."}
                    </p>
                    <p className="text-xs italic text-light/50">
                      {es
                        ? "Decisión: freezar el producto y cerrar las condiciones antes del ciclo 2."
                        : "Decision: freeze the product and lock conditions before cycle 2."}
                    </p>
                  </div>
                </Block>
                <Block colSpan={1}>
                  <div className="bg-container/80 rounded-lg p-6 h-full card-elevated">
                    <h3 className="text-lg font-bold text-light mb-3">
                      {es ? "Ciclo 2 · Señales tempranas confirmadas" : "Cycle 2 · Early signals confirmed"}
                    </h3>
                    <p className="text-light text-sm leading-relaxed mb-3">
                      {es
                        ? "Con el outreach rediseñado y las variables fijas, se generó señal interpretable por primera vez: usuarios recurrentes durante cuatro días consecutivos sin contacto."
                        : "With redesigned outreach and fixed variables, interpretable signal was generated for the first time: returning users over four consecutive days without contact."}
                    </p>
                    <p className="text-xs italic text-light/50">
                      {es
                        ? "Un evento publicado por un organizador que llegó desde la historia de una amiga — supply sin contacto directo."
                        : "An event published by an organizer who arrived via a friend's story — supply without direct contact."}
                    </p>
                  </div>
                </Block>
                <Block colSpan={1}>
                  <div className="bg-container/80 rounded-lg p-6 h-full card-elevated">
                    <h3 className="text-lg font-bold text-light mb-3">
                      {es ? "Ciclo 3 · Experimento de seeding y límite de red" : "Cycle 3 · Seeding experiment and network limit"}
                    </h3>
                    <p className="text-light text-sm leading-relaxed mb-3">
                      {es
                        ? "Con seeding: 13% de interacción. Sin seeding: 6,25%. La conversión del canal DM cayó de 77% a 64%, pero la calidad mejoró: 4 páginas/sesión, 78% scroll depth, 1,5 min activos."
                        : "With seeding: 13% interaction. Without seeding: 6.25%. DM channel conversion dropped from 77% to 64%, but quality improved: 4 pages/session, 78% scroll depth, 1.5 active minutes."}
                    </p>
                    <p className="text-xs italic text-light/50">
                      {es
                        ? "No empeoró el producto. Se saturó la audiencia cercana. El canal siguiente: presencia en el ecosistema."
                        : "The product didn't get worse. The close audience was saturated. The next channel: presence in the ecosystem."}
                    </p>
                  </div>
                </Block>
              </GridContainer>
            </section>
          </FadeOnScroll>

          {/* Funnel / métricas reales */}
          <FadeOnScroll>
            <section className="w-full px-8 md:px-12 lg:px-20 mb-20">
              <DevImage
                alt="Funnel de métricas reales: sesiones, detalle de evento, interacción con pulgares, compartir, publicar"
                width={1200}
                height={600}
                caption={es
                  ? "Core loop con datos reales de los ciclos 2 y 3."
                  : "Core loop with real data from cycles 2 and 3."}
                className="w-full"
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
              <h2 className="text-3xl md:text-4xl font-bold text-light mb-8">
                {es ? "Supply: no solo fricción, también incentivo" : "Supply: not just friction, also incentive"}
              </h2>
              <GridContainer cols={{ default: 1, md: 2 }} gap="lg" className="!px-0 items-start">
                <Block colSpan={1}>
                  <div className="text-light leading-relaxed space-y-6">
                    <p className="text-lg">
                      {es
                        ? "La hipótesis inicial era que los organizadores no publicaban por fricción. Eso se rompe con dos señales convergentes. En research, una entrevistada lo dijo directo: \"subir eventos no es hábito, es una tarea más.\" En comportamiento, ningún organizador publicó de forma autónoma sin exposición previa al producto."
                        : "The initial hypothesis was that organizers didn't publish due to friction. That breaks down with two converging signals. In research, one interviewee said it directly: \"posting events isn't a habit, it's just another task.\" In behavior, no organizer published autonomously without prior exposure to the product."}
                    </p>
                    <p className="text-lg">
                      {es
                        ? "La fricción no parece ser la única barrera. El incentivo y la visibilidad emergen como factores críticos. Publicar no ocurre si no hay audiencia que lo vea. Por eso la secuencia importa: primero tracción de usuarios, después escalar el lado oferta. Sin audiencia demostrable no hay propuesta comercial válida para venues ni organizadores."
                        : "Friction alone doesn't seem to be the only barrier. Incentive and visibility emerge as critical factors. Publishing doesn't happen if there's no audience to see it. That's why the sequence matters: user traction first, then scale the supply side. Without demonstrable audience there's no valid commercial proposition for venues or organizers."}
                    </p>
                    <div
                      className="rounded-lg bg-container/80 p-6"
                      style={{ boxShadow: "0 0 0 1px rgba(255, 255, 255, 0.06), 0 4px 12px rgba(0, 0, 0, 0.5)" }}
                    >
                      <p className="font-semibold text-light">
                        {es ? "La decisión concreta:" : "The concrete decision:"}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-light">
                        {es
                          ? "No invertir en automatización de publicación hasta tener supply autónomo confirmado. Construirlo antes es infraestructura sin demanda validada."
                          : "Not investing in publishing automation until autonomous supply is confirmed. Building it before is infrastructure without validated demand."}
                      </p>
                    </div>
                  </div>
                </Block>
                <Block colSpan={1}>
                  <DevImage
                    alt="Formulario de carga de evento con revelación progresiva en 3 bloques y edición inline"
                    width={600}
                    height={500}
                    caption={es
                      ? "Formulario con revelación progresiva en 3 bloques y edición inline. Inspirado en Luma."
                      : "Progressive disclosure form in 3 blocks with inline editing. Inspired by Luma."}
                    className="w-full"
                  />
                </Block>
              </GridContainer>
            </section>
          </FadeOnScroll>

          {/* ==================== DIVIDER ==================== */}
          <div className="w-full px-8 md:px-12 lg:px-20 mb-28">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-[#08A4E1]/40 to-transparent" />
          </div>

          {/* ==================== DISEÑAR CON IA ==================== */}
          <FadeOnScroll delay={80}>
            <section id="ia" className="w-full px-8 md:px-12 lg:px-20 mb-20">
              <h2 className="text-3xl md:text-4xl font-bold text-light mb-8">
                {es ? "Diseñar con IA: lo que este proyecto muestra" : "Designing with AI: what this project shows"}
              </h2>
              <GridContainer cols={{ default: 1, md: 2 }} gap="lg" className="!px-0 items-start">
                <Block colSpan={1}>
                  <div className="text-light leading-relaxed space-y-5">
                    <p className="text-lg">
                      {es
                        ? "La velocidad es real. Un POC funcional deployado en un día cambia qué proyectos son viables de explorar."
                        : "The speed is real. A functional POC deployed in a day changes which projects are worth exploring."}
                    </p>
                    <p className="text-lg">
                      {es
                        ? "Pero la velocidad sin especificación redistribuye el trabajo — lo que no decidís antes lo decidís después, corrigiendo output en lugar de dirigiendo proceso."
                        : "But speed without specification redistributes the work — what you don't decide upfront, you decide later, correcting output instead of directing process."}
                    </p>
                    <p className="text-lg">
                      {es
                        ? "Si el branding y la UX tienen ruido de defaults del generador, los testers reaccionan a decisiones que nunca tomaste. Los datos quedan contaminados antes de empezar. El criterio del designer no desaparece — se vuelve el input más crítico del sistema."
                        : "If branding and UX carry noise from the generator's defaults, testers react to decisions you never made. Data gets contaminated before you even start. The designer's judgment doesn't disappear — it becomes the most critical input in the system."}
                    </p>
                    <p className="text-xl font-semibold">
                      {es
                        ? "Diseñar con IA no es una cuestión de herramientas. Es una cuestión de proceso."
                        : "Designing with AI isn't a question of tools. It's a question of process."}
                    </p>
                  </div>
                </Block>
                <Block colSpan={1}>
                  <DevImage
                    alt="Evolución del producto: POC inicial → v1 rediseñado"
                    width={600}
                    height={450}
                    caption={es
                      ? "Del POC inicial al v1 rediseñado — la diferencia está en las decisiones tomadas antes de ejecutar."
                      : "From initial POC to redesigned v1 — the difference lies in decisions made before executing."}
                    className="w-full"
                  />
                </Block>
              </GridContainer>
            </section>
          </FadeOnScroll>

          {/* ==================== DIVIDER ==================== */}
          <div className="w-full px-8 md:px-12 lg:px-20 mb-28">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-[#08A4E1]/40 to-transparent" />
          </div>

          {/* ==================== QUÉ SIGUE ==================== */}
          <FadeOnScroll delay={150}>
            <section id="cierre" className="w-full px-8 md:px-12 lg:px-20 mb-20">
              <div className="max-w-3xl mx-auto mb-10 text-center text-light">
                <h2 className="text-3xl md:text-4xl font-bold text-light mb-4">
                  {es ? "Qué sigue" : "What's next"}
                </h2>
                <p className="text-lg leading-relaxed">
                  {es
                    ? "El ciclo 4 cambia el canal: de cold outreach digital a presencia en el ecosistema. Las stories de Instagram se formalizan como infraestructura de retención semanal."
                    : "Cycle 4 changes the channel: from cold digital outreach to presence in the ecosystem. Instagram stories are formalized as weekly retention infrastructure."}
                </p>
              </div>
              <GridContainer cols={{ default: 1, md: 2 }} gap="lg" className="!px-0">
                <Block colSpan={1}>
                  <div className="h-full rounded-2xl border border-[#C45200]/30 bg-gradient-to-br from-[#1C0900]/40 to-[#2D1200]/40 p-6 text-light backdrop-blur-sm md:p-8">
                    <h3 className="text-2xl font-semibold mb-4">
                      {es ? "Decisiones pendientes" : "Pending decisions"}
                    </h3>
                    <ul className="space-y-3 text-sm leading-relaxed">
                      {(es
                        ? [
                            "Automatización de publicación: cuando haya supply autónomo confirmado",
                            "Backend de recomendaciones: cuando la retención esté validada semana a semana",
                            "Migración a Next.js para OG tags dinámicos por evento",
                            "Strategy Canvas: cuando los datos lo justifiquen",
                          ]
                        : [
                            "Publishing automation: when autonomous supply is confirmed",
                            "Recommendations backend: when retention is validated week over week",
                            "Migration to Next.js for dynamic OG tags per event",
                            "Strategy Canvas: when the data justifies it",
                          ]
                      ).map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="mt-0.5 text-light/50">→</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Block>
                <Block colSpan={1}>
                  <div className="h-full rounded-2xl border border-[#C45200]/30 bg-gradient-to-br from-[#1C0900]/40 to-[#2D1200]/40 p-6 text-light backdrop-blur-sm md:p-8">
                    <h3 className="text-2xl font-semibold mb-4">
                      {es ? "El principio que guía" : "The guiding principle"}
                    </h3>
                    <p className="text-lg leading-relaxed mb-4">
                      {es
                        ? "Las decisiones pendientes tienen triggers, no fechas."
                        : "Pending decisions have triggers, not dates."}
                    </p>
                    <p className="leading-relaxed">
                      {es
                        ? "La decisión más importante no es qué construir. Es qué medir, con qué criterio, y cuándo la señal es suficiente para actuar."
                        : "The most important decision isn't what to build. It's what to measure, by what criteria, and when the signal is sufficient to act."}
                    </p>
                  </div>
                </Block>
              </GridContainer>
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
      <div className="relative z-[20]">
        <Footer dict={dict} lang={lang} />
      </div>
      <ScrollToTop size={48} />
    </>
  )
}
