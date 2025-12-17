import { getDictionary } from '@/lib/getDictionary'
import Navbar from "@/components/navbar/Navbar"
import ScrollToTop from "@/components/fxscripts/scroll-to-top"
import Footer from "@/components/footer/Footer"
import CaseStudyLayout from "@/components/case-study/CaseStudyLayout"
import ProseSection from "@/components/case-study/ProseSection"
import ImageBreakout from "@/components/case-study/ImageBreakout"
import InsightCard from "@/components/sections/InsightCard"
import Image from "next/image"

export const metadata = {
  title: "Recto Final | Videojuego físico-digital | Lautaro R. Temperini",
  description:
    "Recto Final es un videojuego físico-digital donde la única salida es por el final. Proyecto académico que combina Unity 2D con hardware modificado para crear una experiencia inmersiva.",
  keywords:
    "Recto Final, videojuego físico-digital, Unity 2D, instalación interactiva, UNLP, Lautaro Temperini, hardware modificado, experiencia inmersiva",
  openGraph: {
    title: "Recto Final | Videojuego físico-digital | Lautaro R. Temperini",
    description:
      "Videojuego físico-digital donde la única salida es por el final. Instalación interactiva con Unity 2D y hardware modificado.",
    url: "https://temperini.vercel.app/rectofinal",
    siteName: "Temperini Portfolio",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: "https://temperini.vercel.app/images/rectofinal-logo.png",
        width: 800,
        height: 600,
        alt: "Logo de Recto Final",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Recto Final | Videojuego físico-digital | Lautaro R. Temperini",
    description:
      "Videojuego físico-digital donde la única salida es por el final. Instalación interactiva con Unity 2D y hardware modificado.",
    images: ["https://temperini.vercel.app/images/rectofinal-logo.png"],
  },
}

export default async function RectoFinalPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  // Await params en Next.js 15
  const { lang: langParam } = await params
  const lang = (langParam === 'es' || langParam === 'en') ? langParam : 'es'
  const dict = await getDictionary(lang)

  return (
    <div className="page-transition">
      <Navbar dict={dict} lang={lang} />
      <main className="pt-16 md:pt-20 lg:pt-24">
        <CaseStudyLayout>
          {/* Hero Section - 60vh */}
          <section className="w-full h-[60vh] flex items-center justify-center">
            <div className="w-full lg:w-3/5 lg:mx-auto px-4 md:px-6 lg:px-12">
              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold leading-tight text-[#F2F2F2] mb-6">
                RECTO FINAL
              </h1>
              <p className="text-xl md:text-2xl font-semibold text-[#F2F2F2] mb-4">
                Videojuego físico-digital donde la única salida… es por el final
              </p>
              <div className="text-base md:text-lg text-[#F1F1F1] leading-relaxed">
                <p className="mb-2">
                  Proyecto académico UNLP que combina Unity 2D con hardware modificado para crear una experiencia inmersiva.
                </p>
                <p>
                  El objetivo fue claro: desarrollar una instalación que sobreviviera 3+ horas de público general sin colapsar.
                </p>
              </div>
            </div>
          </section>

          {/* Mi rol - Sin contenedor */}
          <div className="w-full lg:w-3/5 lg:mx-auto px-4 md:px-6 lg:px-12 mb-16">
            <div className="prose prose-invert max-w-none text-[#F1F1F1] leading-relaxed">
              <p>Mi aporte específico en el proyecto: • Programador principal en Unity 2D con C#. • Integrador técnico de hardware modificado (volante PC + teclado hackeado). • Co-director creativo y desarrollador de narrativa.</p>
            </div>
          </div>

          {/* Contexto del Proyecto */}
          <ProseSection className="mb-16">
            <h2 className="text-3xl font-bold text-[#F2F2F2] mb-6">Contexto del Proyecto</h2>
            <div className="prose prose-invert max-w-none text-[#F1F1F1] leading-relaxed">
              <p className="mb-4">Proyecto académico UNLP - Taller de Experiencias Interactivas</p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>Duración: 1 cuatrimestre</li>
                <li>Equipo: 10 personas multidisciplinarias</li>
                <li>Año: 2024</li>
                <li>Contexto: Feria estudiantil con público general</li>
              </ul>
              <p>El brief académico era brutal: desarrollar un videojuego físico-digital para feria estudiantil que operara sin técnicos constantemente reiniciando el sistema.</p>
            </div>
          </ProseSection>

          {/* Especificaciones Técnicas */}
          <ProseSection className="mb-16">
            <h2 className="text-3xl font-bold text-[#F2F2F2] mb-6">Especificaciones Técnicas</h2>
            <div className="prose prose-invert max-w-none text-[#F1F1F1] leading-relaxed space-y-4">
              <div>
                <h4 className="font-semibold text-[#F2F2F2] mb-2">Motor y Lenguaje:</h4>
                <p>Unity 2D con input personalizado • C#</p>
              </div>
              <div>
                <h4 className="font-semibold text-[#F2F2F2] mb-2">Hardware:</h4>
                <p>Volante PC modificado + teclado hackeado + botones pulsadores</p>
              </div>
              <div>
                <h4 className="font-semibold text-[#F2F2F2] mb-2">Software:</h4>
                <p>Visual Studio Code, Photoshop</p>
              </div>
              <div>
                <h4 className="font-semibold text-[#F2F2F2] mb-2">Operación:</h4>
                <p>3 minutos por partida • Adaptabilidad en tiempo real durante 3+ horas</p>
              </div>
            </div>
          </ProseSection>

          {/* El Desafío Real */}
          <ProseSection className="mb-16">
            <h2 className="text-3xl font-bold text-[#F2F2F2] mb-6">El Desafío Real</h2>
            <div className="prose prose-invert max-w-none text-[#F1F1F1] leading-relaxed">
              <h3 className="text-2xl font-semibold text-[#F2F2F2] mb-4">
                Crear una instalación que sobreviva 3+ horas de público general sin colapsar
              </h3>
              <p className="mb-4">El brief académico era brutal: desarrollar un videojuego físico-digital para feria estudiantil que operara sin técnicos constantemente reiniciando el sistema. Además, los elementos narrativos llegaron por sorteo obligatorio: un pirata, un dimetrodón, un martillo oxidado y ecofuturismo.</p>
              <p className="mb-4">La decisión clave: No resistir el absurdo, sino transformarlo en un mundo visceralmente coherente.</p>
              <p className="text-[#F2F2F2] font-semibold">Mi propuesta narrativa fue seleccionada entre más de 20 ideas, pero no por su creatividad libre, sino por su viabilidad técnica bajo restricciones absurdas.</p>
            </div>
          </ProseSection>

          {/* Transformar el Absurdo en Coherencia */}
          <ProseSection className="mb-16">
            <h2 className="text-3xl font-bold text-[#F2F2F2] mb-6">Transformar el Absurdo en Coherencia</h2>
            <div className="prose prose-invert max-w-none text-[#F1F1F1] leading-relaxed">
              <p className="mb-4">Los elementos impuestos: Pirata + dimetrodón + martillo oxidado + ecofuturismo.</p>
              <p className="mb-4">Mi solución narrativa: El Pelusa, un pirata, es tragado por un dimetrodón. Desde el estómago ácido del dinosaurio, defiende su barco golpeando esqueletos piratas con su martillo mientras el entorno se vuelve progresivamente más visceral y repugnante.</p>
              <p className="text-[#F2F2F2] font-semibold mb-4">El twist que lo cierra: La "luz al final del túnel" de escape es, literalmente, la salida del tracto digestivo. De ahí Recto Final: chiste, metáfora y cierre narrativo en una sola frase.</p>
              <p className="mb-4">La solución visual del ecofuturismo: El equipo de arte resolvió brillantemente la contradicción con un barco con forma de tiburón, vegetación real integrada a la instalación y un pirata ciborg. La UI navegaba entre steampunk y dieselpunk, logrando coherencia estética donde el concepto inicial parecía imposible.</p>
              <p>Mi rol: Desarrollé la lógica narrativa que hiciera funcionar elementos inconexos como un universo jugable coherente. El humor absurdo no fue una elección creativa libre, fue ingeniería narrativa bajo restricciones.</p>
            </div>
          </ProseSection>

          {/* Placeholder para imagen de instalación */}
          <ImageBreakout
            src="/images/placeholder-instalacion.jpg"
            alt="Instalación completa con público"
            width={1200}
            height={800}
            border={false}
          />

          {/* Placeholder para moodboard */}
          <ImageBreakout
            src="/images/placeholder-moodboard.jpg"
            alt="Moodboard visual — paleta ácida, texturas orgánicas, tipografía retro-pirata"
            width={1200}
            height={800}
            border={false}
          />

          {/* Del Cuerpo al Código: Mecánicas Físicas */}
          <ProseSection className="mb-16">
            <h2 className="text-3xl font-bold text-[#F2F2F2] mb-6">Del Cuerpo al Código: Mecánicas Físicas</h2>
            <div className="prose prose-invert max-w-none text-[#F1F1F1] leading-relaxed">
              <p className="mb-4">Combiné Whac-A-Mole (golpear puntos fijos) + Subway Surfers (cambiar carriles) pero con interfaces físicas reales:</p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>Calaveras golpeables: Teclado hackeado con botones embebidos en estructuras 3D</li>
                <li>Timón de navegación: Volante de PC modificado usando su giroscopio interno</li>
                <li>Flujo autónomo: Pantalla de Inicio → Intro → Tutorial → Juego → Game Over → Reinicio automático</li>
              </ul>
              <p>Decisión técnica estratégica: Probamos TouchOSC y Arduino: ambos descartados por latencia o complejidad. Elegí el volante como solución robusta y plug & play. El volante, aunque medio roto, tenía algo que ninguno de los otros sistemas ofrecía: estabilidad sin necesidad de conexión inalámbrica ni drivers adicionales.</p>
            </div>
          </ProseSection>

          {/* Decisiones Técnicas Críticas */}
          <ProseSection className="mb-16">
            <h2 className="text-3xl font-bold text-[#F2F2F2] mb-6">Decisiones Técnicas Críticas</h2>
            <div className="prose prose-invert max-w-none text-[#F1F1F1] leading-relaxed">
              <p className="mb-4">Responsabilidad directa: Programación completa del sistema de juego en Unity</p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>Sistema de vidas y oleadas crecientes con HUD responsivo a cada golpe físico</li>
                <li>Flujo de interacción sin botones ni espera: golpe para iniciar, tutorial automático, reinicio desde win/lose</li>
                <li>Duración fija de 3 minutos: Calculada para mantener engagement sin fatiga y permitir flujo constante de jugadores</li>
                <li>Calibración de dificultad: Ajustada para que el 80% de jugadores ganara, maximizando satisfacción emocional</li>
              </ul>
              <p className="text-[#F2F2F2] font-semibold">Todo estaba orientado a una sola meta: que el sistema no requiriera explicación, ni asistencia humana, ni reinicios manuales.</p>
            </div>
          </ProseSection>

          {/* Placeholder para proceso técnico */}
          <ImageBreakout
            src="/images/placeholder-proceso-tecnico.jpg"
            alt="Proceso técnico — soldadura, volante, sensores"
            width={1200}
            height={800}
            border={false}
          />

          {/* Momentos de Tensión Real */}
          <ProseSection className="mb-16">
            <h2 className="text-3xl font-bold text-[#F2F2F2] mb-6">Momentos de Tensión Real</h2>
            <div className="prose prose-invert max-w-none text-[#F1F1F1] leading-relaxed">
              <p className="mb-4">El día previo a la muestra, el volante comenzó a generar input involuntario hacia la derecha. Lo recalibré desde código, ajustando los umbrales de detección. Además, tuvimos que salir casi de urgencia a comprar un extensor USB porque el cable original no alcanzaba la nueva configuración del stand.</p>
              <p className="mb-4">Durante la feria, una nena de 7 años le dio tan fuerte al martillo que lo desarmó en dos. Tomé la decisión en caliente: reprogramé el input para permitir golpes directos con la mano. Mientras tanto, organizamos la soldadura del cable roto y restituí la jugabilidad completa sin detener la partida. Los jugadores no notaron la transición.</p>
              <p className="text-[#F2F2F2] font-semibold mb-4">Ese momento me confirmó que no se trataba solo de saber programar. Se trataba de pensar en tiempo real, liderar bajo presión y mantener la jugabilidad viva sin importar lo que fallara.</p>
              <p>Crisis de equipo a mitad del proyecto: Cuando una integrante clave se desinteresó y hubo conflictos internos, asumí coordinar la redistribución de tareas según habilidades reales: quién soldaba mejor, quién ejecutaba diseño, quién podía programar bajo presión.</p>
            </div>
          </ProseSection>

          {/* Resistencia del Sistema en Condiciones Reales */}
          <ProseSection className="mb-16">
            <h2 className="text-3xl font-bold text-[#F2F2F2] mb-6">Resistencia del Sistema en Condiciones Reales</h2>
            <div className="prose prose-invert max-w-none text-[#F1F1F1] leading-relaxed">
              <p className="mb-4">Métricas de Éxito Internas:</p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>Flujo constante de jugadores durante más de 3 horas consecutivas</li>
                <li>Alto reconocimiento visual que generaba colas espontáneas</li>
                <li>Adaptabilidad en tiempo real ante imprevistos técnicos menores</li>
              </ul>
              <p className="text-[#F2F2F2] font-semibold mb-4">No fue la más tecnológica, fue la más resistente. Y eso, en un entorno real, vale más que cualquier shader.</p>
              <p className="mb-4">Mi Aporte Visual-Técnico: Implementé efectos que emulaban texturas de carne y ácido, colaborando con ilustradores para lograr un resultado visceral convincente. No era solo código: era programación con criterio estético para reforzar la inmersión.</p>
              <p className="mb-4">El Momento Emocional: El Outro Sorprendente: La mayoría de jugadores no esperaba el remate narrativo. Ver sus caras cuando El Pelusa finalmente "salía" del dinosaurio era genuinamente satisfactorio. Ahí entendían el chiste del título. "¿¡Salió de ahí!?", decían. No tenías que explicarlo. Se entendía en silencio.</p>
              <p className="mb-4">Era el tipo de final que no necesitaba explicación, solo una sonrisa incómoda. Eso es diseño emocional.</p>
              <p className="text-[#F2F2F2] font-semibold">El aprendizaje: Los mejores sistemas no son los más complejos, sino los que sobreviven a golpes, cables sueltos… y niños entusiasmados.</p>
            </div>
          </ProseSection>

          {/* Placeholders para capturas y fotos */}
          <div className="w-full lg:w-3/5 lg:mx-auto px-4 md:px-6 lg:px-12 mb-16">
            <div className="grid md:grid-cols-2 gap-6">
              <figure className="w-full h-[70vh] flex items-center justify-center rounded-lg overflow-hidden bg-[#F2F2F2]">
                <Image
                  src="/images/placeholder-hud-outro.jpg"
                  alt="Captura de HUD, outro, golpe físico"
                  width={600}
                  height={400}
                  className="w-full h-full object-contain"
                />
              </figure>
              <figure className="w-full h-[70vh] flex items-center justify-center rounded-lg overflow-hidden bg-[#F2F2F2]">
                <Image
                  src="/images/placeholder-volante-recalibrado.jpg"
                  alt="Foto del volante siendo recalibrado"
                  width={600}
                  height={400}
                  className="w-full h-full object-contain"
                />
              </figure>
            </div>
          </div>

          {/* Placeholders para instalación y reparación */}
          <div className="w-full lg:w-3/5 lg:mx-auto px-4 md:px-6 lg:px-12 mb-16">
            <div className="grid md:grid-cols-2 gap-6">
              <figure className="w-full h-[70vh] flex items-center justify-center rounded-lg overflow-hidden bg-[#F2F2F2]">
                <Image
                  src="/images/placeholder-instalacion-publico.jpg"
                  alt="Instalación funcionando con público diverso"
                  width={600}
                  height={400}
                  className="w-full h-full object-contain"
                />
              </figure>
              <figure className="w-full h-[70vh] flex items-center justify-center rounded-lg overflow-hidden bg-[#F2F2F2]">
                <Image
                  src="/images/placeholder-reparacion-vivo.jpg"
                  alt="Momento de reparación en vivo"
                  width={600}
                  height={400}
                  className="w-full h-full object-contain"
                />
              </figure>
            </div>
          </div>

          {/* El Casi-Colapso Final */}
          <ProseSection className="mb-16">
            <h2 className="text-3xl font-bold text-[#F2F2F2] mb-6">El Casi-Colapso Final</h2>
            <div className="prose prose-invert max-w-none text-[#F1F1F1] leading-relaxed">
              <p className="mb-4">El drama real: Casi no llegamos. El equipo de ilustración estaba muy atrasado a 48 horas de la muestra. Todos intervinimos para salvar el proyecto: yo parcheando assets provisorios, el equipo de escenografía construyendo el barco en menos de una semana tras devoluciones duras, programadores ajustando efectos visuales en tiempo real.</p>
              <p className="mb-4">Las calaveras golpeables: Terminaron siendo pelotas de papel y cinta, soldadas con cables de teclado. Funcional, resistente y completamente artesanal.</p>
              <p className="mb-4">La tensión: No era solo un proyecto académico. Era la diferencia entre mostrar algo funcional o presentarse con pantallas en blanco.</p>
              <p className="text-[#F2F2F2] font-semibold">El resultado: Teníamos calaveras de papel, cartapesta, código, voluntad... y un poco de delirio técnico. No fue magia: fue resiliencia organizada.</p>
            </div>
          </ProseSection>

          {/* Visión Personal: Más Allá del Proyecto */}
          <ProseSection className="mb-16">
            <h2 className="text-3xl font-bold text-[#F2F2F2] mb-6">Visión Personal: Más Allá del Proyecto</h2>
            <div className="prose prose-invert max-w-none text-[#F1F1F1] leading-relaxed">
              <p className="mb-4">Este proyecto me marcó porque me enseñó que lo importante no es el realismo técnico, sino la conexión visceral con el jugador. Y que los mejores sistemas no son los más complejos, sino los que sobreviven al mundo real.</p>
              <p className="mb-4">Hoy sigo diseñando experiencias físico-digitales, pero Recto Final sigue siendo mi referencia: cómo transformar limitaciones absurdas en coherencia jugable, cómo programar sistemas que se adapten cuando todo falla, y cómo liderar decisiones técnicas críticas bajo presión extrema.</p>
              <p className="text-[#F2F2F2] font-semibold">La lección más valiosa: La mejor tecnología es la que se hace invisible cuando el usuario está completamente inmerso en golpear calaveras dentro del estómago de un dinosaurio.</p>
            </div>
          </ProseSection>

          {/* Documentación Técnica */}
          <ProseSection className="mb-16">
            <h2 className="text-3xl font-bold text-[#F2F2F2] mb-6">Documentación Técnica</h2>
            <div className="prose prose-invert max-w-none text-[#F1F1F1] leading-relaxed">
              <p>Link a PDF técnico o GDD (si corresponde)</p>
            </div>
          </ProseSection>

          {/* Aprendizajes clave */}
          <ProseSection className="mb-16">
            <h2 className="text-3xl font-bold text-[#F2F2F2] mb-8">
              Aprendizajes clave
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InsightCard title="Los mejores sistemas no son los más complejos, sino los que sobreviven al mundo real.">
                La tecnología más elegante es inútil si no puede manejar niños entusiasmados, cables sueltos y hardware roto.
              </InsightCard>
              <InsightCard title="Transformar limitaciones absurdas en coherencia jugable requiere ingeniería narrativa.">
                El humor absurdo no fue una elección creativa libre, fue ingeniería narrativa bajo restricciones impuestas.
              </InsightCard>
              <InsightCard title="Liderar bajo presión significa mantener la jugabilidad viva sin importar lo que falle.">
                La capacidad de adaptar el sistema en tiempo real es más valiosa que cualquier shader o efecto visual.
              </InsightCard>
              <InsightCard title="La mejor tecnología se hace invisible cuando el usuario está completamente inmerso.">
                El éxito se mide por la conexión visceral con el jugador, no por la complejidad técnica del código.
              </InsightCard>
            </div>
          </ProseSection>

          {/* Conclusión - Sin contenedor */}
          <div className="w-full lg:w-3/5 lg:mx-auto px-4 md:px-6 lg:px-12 mb-16">
            <div className="prose prose-invert max-w-none text-[#F1F1F1] leading-relaxed">
              <h2 className="text-3xl font-bold text-[#F2F2F2] mb-6 text-center">Conclusión</h2>
              <div className="space-y-4 text-center">
                <p className="text-lg font-semibold text-[#F2F2F2]">Recto Final demostró que la ingeniería creativa puede transformar el caos en coherencia:</p>
                <p className="text-xl">La combinación de programación robusta, hardware modificado y narrativa absurda puede crear experiencias que no solo funcionan, sino que sobreviven y emocionan en condiciones reales.</p>
              </div>
            </div>
          </div>

          {/* Demo del Juego */}
          <ProseSection className="mb-16">
            <h2 className="text-3xl font-bold text-[#F2F2F2] mb-6">Demo del Juego</h2>
            <div className="prose prose-invert max-w-none text-[#F1F1F1] leading-relaxed">
              <p>Botón Jugar o video de demo en caso de versión digital</p>
            </div>
          </ProseSection>
        </CaseStudyLayout>
      </main>
      <Footer dict={dict} lang={lang} />
      <ScrollToTop size={48} />
    </div>
  )
}
