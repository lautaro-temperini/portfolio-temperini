import { getDictionary } from '@/lib/getDictionary'
import Navbar from "@/components/navbar/Navbar"
import ScrollToTop from "@/components/fxscripts/scroll-to-top"
import Footer from "@/components/footer/Footer"
import CaseStudyLayout from "@/components/case-study/CaseStudyLayout"
import ProseSection from "@/components/case-study/ProseSection"
import ImageBreakout from "@/components/case-study/ImageBreakout"
import InsightCard from "@/components/sections/InsightCard"

export const metadata = {
  title: "LevelUp | Rediseño editorial gamer | Lautaro R. Temperini",
  description:
    "Rediseñé la experiencia editorial de LevelUp con personalización y geosegmentación inteligente. Transformé un portal genérico en una experiencia relevante para el público gamer de Latinoamérica.",
  keywords:
    "LevelUp, rediseño editorial, personalización, geosegmentación, UX/UI, gaming, Latinoamérica, Lautaro Temperini, caso de estudio",
  openGraph: {
    title: "LevelUp | Rediseño editorial gamer | Lautaro R. Temperini",
    description:
      "Rediseño de portal editorial con personalización por preferencias y geografía. Experiencia adaptada para el público gamer de Latinoamérica.",
    url: "https://temperini.vercel.app/levelup",
    siteName: "Temperini Portfolio",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: "https://temperini.vercel.app/images/levelup-logo.png",
        width: 800,
        height: 600,
        alt: "Logo de LevelUp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LevelUp | Rediseño editorial gamer | Lautaro R. Temperini",
    description:
      "Rediseño editorial con personalización y geosegmentación para el público gamer de Latinoamérica.",
    images: ["https://temperini.vercel.app/images/levelup-logo.png"],
  },
}

export default async function LevelUpPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  // Await params en Next.js 15
  const { lang: langParam } = await params
  const lang = (langParam === 'es' || langParam === 'en') ? langParam : 'es'
  const dict = await getDictionary(lang)

  return (
    <>
      <Navbar dict={dict} lang={lang} />
      <div className="page-transition">
        <main className="pt-16 md:pt-20 lg:pt-24">
        <CaseStudyLayout>
          {/* Hero Section - 60vh */}
          <section className="w-full h-[60vh] flex items-center justify-center">
            <div className="w-full lg:w-3/5 lg:mx-auto px-4 md:px-6 lg:px-12">
              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold leading-tight text-[#F2F2F2] mb-6">
                LEVEL UP
              </h1>
              <p className="text-xl md:text-2xl font-semibold text-[#F2F2F2] mb-4">
                Rediseñando la experiencia editorial gamer
              </p>
              <div className="text-base md:text-lg text-[#F1F1F1] leading-relaxed">
                <p className="mb-2">
                  Transformé un portal de noticias genérico en una experiencia personalizada, relevante y escalable para
                  el público gamer de Latinoamérica.
                </p>
                <p>
                  El objetivo fue claro: crear una experiencia editorial que se adaptara a las preferencias regionales y personales de cada usuario.
                </p>
              </div>
            </div>
          </section>

          {/* Mi rol - Sin contenedor */}
          <div className="w-full lg:w-3/5 lg:mx-auto px-4 md:px-6 lg:px-12 mb-16">
            <div className="prose prose-invert max-w-none text-[#F1F1F1] leading-relaxed">
              <p>Mi aporte específico en el proyecto: • Investigación sobre preferencias regionales de gaming. • Diseño del sistema de personalización y filtros. • Propuesta de geosegmentación automática. • Diseño de interfaz con arquitectura editorial escalable. • Estrategia de segmentación activa y pasiva.</p>
            </div>
          </div>

          {/* El Desafío */}
          <ProseSection className="mb-16">
            <h2 className="text-3xl font-bold text-[#F2F2F2] mb-6">El Desafío</h2>
            <div className="prose prose-invert max-w-none text-[#F1F1F1] leading-relaxed">
              <p className="mb-4">Transformar un portal de noticias genérico en una experiencia personalizada, relevante y escalable para el público gamer de Latinoamérica.</p>
              <p>El reto principal era crear un sistema que respetara las diferencias regionales mientras mantuviera la escala del negocio editorial.</p>
            </div>
          </ProseSection>

          {/* El Problema */}
          <ProseSection className="mb-16">
            <h2 className="text-3xl font-bold text-[#F2F2F2] mb-6">El Problema</h2>
            <div className="prose prose-invert max-w-none text-[#F1F1F1] leading-relaxed">
              <h3 className="text-2xl font-semibold text-[#F2F2F2] mb-4">
                Una única vista editorial genera fricción para todos.
              </h3>
              <p className="mb-4">Level Up publicaba más de 20 noticias diarias sin filtros ni curaduría personalizada. Los usuarios se perdían entre contenido irrelevante: noticias de consolas que no usan, juegos que no les interesan, eventos de otros países.</p>
              <blockquote className="text-[#F1F1F1] italic border-l-4 border-red-500 pl-4">
                "Yo juego en PlayStation, así que lo de Xbox o Nintendo no me sirve. Me pierdo entre tanta información."
                <br />
                <span className="text-[#F2F2F2] font-semibold">— Usuario entrevistado</span>
              </blockquote>
            </div>
          </ProseSection>

          {/* Insight Estratégico */}
          <ProseSection className="mb-16">
            <h2 className="text-3xl font-bold text-[#F2F2F2] mb-6">Insight Estratégico</h2>
            <div className="prose prose-invert max-w-none text-[#F1F1F1] leading-relaxed">
              <h3 className="text-2xl font-semibold text-[#F2F2F2] mb-4">
                Las preferencias de gaming varían por región.
              </h3>
              <p className="mb-4">Durante el research identifiqué un patrón: mientras México prefiere Xbox, Argentina tiende a PlayStation o PC. Este insight dio lugar a una propuesta de valor más robusta.</p>
              <div className="bg-[#F2F2F2]/10 backdrop-blur-sm rounded-lg p-4 border border-[#F2F2F2]/20">
                <p className="text-[#F2F2F2] font-semibold text-xl text-center">
                  Una experiencia editorial personalizada por preferencias y por geografía.
                </p>
              </div>
            </div>
          </ProseSection>

          {/* Visión del Sistema */}
          <ProseSection className="mb-16">
            <h2 className="text-3xl font-bold text-[#F2F2F2] mb-6">Visión del Sistema</h2>
            <div className="prose prose-invert max-w-none text-[#F1F1F1] leading-relaxed">
              <p className="mb-4">Proyecté una solución de segmentación activa + pasiva:</p>
              <div className="space-y-4">
                <div className="bg-[#F2F2F2]/10 backdrop-blur-sm rounded-lg p-4 border border-[#F2F2F2]/20">
                  <h4 className="font-semibold text-[#F2F2F2] mb-2">Segmentación pasiva:</h4>
                  <p className="text-[#F1F1F1] text-sm">
                    Filtros configurables por consola y género, guardados automáticamente vía localStorage.
                  </p>
                </div>
                <div className="bg-[#F2F2F2]/10 backdrop-blur-sm rounded-lg p-4 border border-[#F2F2F2]/20">
                  <h4 className="font-semibold text-[#F2F2F2] mb-2">Segmentación activa (roadmap):</h4>
                  <p className="text-[#F1F1F1] text-sm">
                    Integración de API de geolocalización para mostrar contenido regional sin intervención del usuario.
                  </p>
                </div>
              </div>
            </div>
          </ProseSection>

          {/* Mi Rol */}
          <ProseSection className="mb-16">
            <h2 className="text-3xl font-bold text-[#F2F2F2] mb-6">Mi Rol</h2>
            <div className="prose prose-invert max-w-none text-[#F1F1F1] leading-relaxed">
              <h3 className="text-xl font-semibold text-[#F2F2F2] mb-4">
                Diseño de sistema + Dirección estratégica + Diseño de interfaz
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-[#F2F2F2] mb-2">System Design:</h4>
                  <p className="text-[#F1F1F1] text-sm">
                    Diseñé la lógica de personalización, filtros y comportamiento contextual.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-[#F2F2F2] mb-2">UX Strategy:</h4>
                  <p className="text-[#F1F1F1] text-sm">
                    Propuse la integración futura de geosegmentación automática y recomendaciones híbridas.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-[#F2F2F2] mb-2">UI Design:</h4>
                  <p className="text-[#F1F1F1] text-sm">
                    Realicé la primera versión de la home con arquitectura editorial escalable.
                  </p>
                </div>
              </div>
            </div>
          </ProseSection>

          {/* Mi propuesta inicial */}
          <ProseSection className="mb-16">
            <h2 className="text-3xl font-bold text-[#F2F2F2] mb-6">Mi propuesta inicial</h2>
            <div className="prose prose-invert max-w-none text-[#F1F1F1] leading-relaxed">
              <p className="mb-6">Diseñé una interfaz más alineada a un producto digital real:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Menú sidebar con dropdowns: navegación más profunda sin saturación.</li>
                <li>Sistema de tags dinámicos: consola, género, tipo de publicación, trending.</li>
                <li>Columna lateral de anuncios: manteniendo el modelo de negocio viable.</li>
                <li>Personalización persistente sin login: experiencia más fluida.</li>
              </ul>
            </div>
          </ProseSection>

          {/* La versión final implementada */}
          <ProseSection className="mb-16">
            <h2 className="text-3xl font-bold text-[#F2F2F2] mb-6">La versión final implementada</h2>
            <div className="prose prose-invert max-w-none text-[#F1F1F1] leading-relaxed">
              <p className="mb-6">El equipo decidió simplificar la interfaz:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Menú horizontal con filtros visibles</li>
                <li>Eliminación de anuncios laterales</li>
                <li>Etiquetas contextualizadas dentro de secciones</li>
                <li>Estética limpia, modo oscuro, acento rojo</li>
              </ul>
            </div>
          </ProseSection>

          {/* Aprendizajes clave */}
          <ProseSection className="mb-16">
            <h2 className="text-3xl font-bold text-[#F2F2F2] mb-8">
              Aprendizajes clave
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InsightCard title="La personalización debe ser progresiva, no invasiva.">
                Los usuarios están dispuestos a compartir preferencias si ven valor inmediato. El timing es crucial para la adopción.
              </InsightCard>
              <InsightCard title="Las diferencias regionales son datos de diseño, no solo demográficos.">
                México prefiere Xbox, Argentina PlayStation. Estas preferencias deben informar la arquitectura de contenido.
              </InsightCard>
              <InsightCard title="La UX editorial no puede desentenderse de la realidad del negocio.">
                La monetización y la experiencia de usuario deben coexistir sin comprometer ninguna de las dos.
              </InsightCard>
              <InsightCard title="El momento de pedir personalización es tan importante como la personalización misma.">
                Mostrar valor antes de pedir datos aumenta significativamente la tasa de adopción.
              </InsightCard>
            </div>
          </ProseSection>

          {/* Reflexión Final */}
          <ProseSection className="mb-16">
            <h2 className="text-3xl font-bold text-[#F2F2F2] mb-6">
              Reflexión Final
            </h2>
            <div className="prose prose-invert max-w-none text-[#F1F1F1] leading-relaxed">
              <p>Este proyecto fue más que un rediseño: fue una propuesta estratégica sobre cómo un medio editorial puede adaptarse a su audiencia sin perder escala. Planteé una solución modular, contextual y sustentable, lista para evolucionar con datos reales.</p>
            </div>
          </ProseSection>

          {/* Conclusión - Sin contenedor */}
          <div className="w-full lg:w-3/5 lg:mx-auto px-4 md:px-6 lg:px-12 mb-16">
            <div className="prose prose-invert max-w-none text-[#F1F1F1] leading-relaxed">
              <h2 className="text-3xl font-bold text-[#F2F2F2] mb-6 text-center">Conclusión</h2>
              <div className="space-y-4 text-center">
                <p className="text-lg font-semibold text-[#F2F2F2]">LevelUp demostró que la personalización editorial puede ser poderosa:</p>
                <p className="text-xl">La combinación de datos regionales, preferencias personales y diseño centrado en el usuario puede crear experiencias editoriales que no solo son relevantes, sino también verdaderamente útiles.</p>
              </div>
            </div>
          </div>
        </CaseStudyLayout>
      </main>
      <Footer dict={dict} lang={lang} />
      <ScrollToTop size={48} />
      </div>
    </>
  )
}
