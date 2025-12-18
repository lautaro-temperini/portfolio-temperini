import { getDictionary } from '@/lib/getDictionary'
import Navbar from "@/components/navbar/Navbar"
import Footer from "@/components/footer/Footer"
import Link from "next/link"

// ============================================================================
// METADATA
// ============================================================================

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  
  return {
    title: lang === 'es' 
      ? "Sobre mí - Lautaro R. Temperini | Product Designer" 
      : "About - Lautaro R. Temperini | Product Designer",
    description: lang === 'es'
      ? "Product Designer especializado en diseño end-to-end: research, prototipado y desarrollo front-end. Buenos Aires, Argentina."
      : "Product Designer specializing in end-to-end design: research, prototyping, and front-end development. Buenos Aires, Argentina.",
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: '/about',
      languages: {
        'es': 'https://temperini.vercel.app/es/about',
        'en': 'https://temperini.vercel.app/en/about',
        'x-default': 'https://temperini.vercel.app/es/about',
      },
    },
    openGraph: {
      title: lang === 'es' ? "Sobre mí - Lautaro R. Temperini" : "About - Lautaro R. Temperini",
      description: lang === 'es'
        ? "Product Designer especializado en diseño end-to-end"
        : "Product Designer specializing in end-to-end design",
      url: `https://temperini.vercel.app/${lang}/about`,
      type: 'profile',
    },
  }
}

// ============================================================================
// COMPONENTE
// ============================================================================

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang: langParam } = await params
  const lang = (langParam === 'es' || langParam === 'en') ? langParam : 'es'
  const dict = await getDictionary(lang)

  const content = lang === 'es' ? {
    title: "Sobre Lautaro R. Temperini — Product Designer",
    intro: "Soy Lautaro R. Temperini, Product Designer con base en Buenos Aires, Argentina. Me especializo en diseño de producto end-to-end: research, prototipado y desarrollo front-end. Mi enfoque combina pensamiento estratégico, diseño funcional y ejecución técnica para transformar problemas complejos en interfaces que las personas entienden.",
    exp_title: "Experiencia y Especialización",
    exp_content: "Trabajo en la intersección entre diseño, código y estrategia de producto. Mi expertise abarca UX research, diseño de UI, prototipado funcional y desarrollo front-end con herramientas como Figma, React, Next.js, Tailwind CSS y Webflow. He desarrollado proyectos que van desde módulos operativos B2B SaaS y rediseños de apps móviles hasta landing pages estratégicas y experiencias interactivas físico-digitales.",
    exp_content2: "Mi proceso cubre el ciclo completo: investigación de usuarios, definición del problema, diseño de soluciones y validación iterativa. Priorizo la claridad, la intención y la coherencia entre las decisiones de diseño y los objetivos del producto.",
    method_title: "Metodología de Trabajo",
    method_intro: "Concibo el diseño como un proceso estratégico, no como un resultado cosmético. Mi trabajo integra:",
    method_list: [
      "User Research y análisis heurístico",
      "Design Systems y arquitectura de UI escalable",
      "Prototipado funcional en Figma y código",
      "Desarrollo front-end con React, Next.js y Three.js",
      "Diseño de workflows para herramientas B2B complejas",
      "Integración de IA en productos digitales"
    ],
    method_footer: "Diseño considerando constraints técnicas, lo que me permite crear soluciones que no solo son visualmente sólidas sino también factibles y eficientes de implementar.",
    interests_title: "Intereses y Proyección",
    interests_content: "Me interesa especialmente el diseño de productos digitales en sectores como Fintech, Healthtech, B2B SaaS y Web3, donde la complejidad técnica requiere soluciones claras y efectivas. Busco colaborar con equipos que entienden el diseño como herramienta de negocio y valoran el rigor metodológico tanto como la ejecución visual.",
    interests_content2: "Actualmente exploro la integración de IA en workflows de diseño, desarrollo web 3D con Three.js, diseño de experiencias Web3 y sistemas backend para ampliar mi capacidad de crear productos end-to-end.",
    contact_title: "Contacto",
    contact_content: "Si tenés un proyecto o desafío en mente, conectemos. Estoy buscando mi primera oportunidad en agencias de producto, estudios de diseño digital y proyectos freelance que prioricen calidad estratégica, criterio y profundidad técnica.",
    back: "Volver al portfolio",
  } : {
    title: "About Lautaro R. Temperini — Product Designer",
    intro: "I'm Lautaro R. Temperini, a Product Designer based in Buenos Aires, Argentina. I specialize in end-to-end product design: research, prototyping, and front-end development. My approach combines strategic thinking, functional design, and technical execution to turn complex problems into interfaces people understand.",
    exp_title: "Experience and Focus",
    exp_content: "I work at the intersection of design, code, and product strategy. My expertise spans UX research, UI design, functional prototyping, and front-end development using tools like Figma, React, Next.js, Tailwind CSS, and Webflow. I've worked on projects ranging from B2B SaaS operations modules and mobile app redesigns to strategic landing pages and phygital interactive experiences.",
    exp_content2: "My process covers the full cycle: user research, problem definition, solution design, and iterative validation. I prioritize clarity, intention, and coherence between design decisions and product goals.",
    method_title: "Methodology",
    method_intro: "I approach design as a strategic process, not a cosmetic result. My work integrates:",
    method_list: [
      "User Research and heuristic analysis",
      "Design Systems and scalable UI architecture",
      "Functional prototyping in Figma and code",
      "Front-end development with React, Next.js, and Three.js",
      "Workflow design for complex B2B tools",
      "AI integration in digital products"
    ],
    method_footer: "I design with technical constraints in mind, which allows me to create solutions that are not only visually solid but also feasible and efficient to implement.",
    interests_title: "Interests and Direction",
    interests_content: "I'm particularly interested in designing digital products for sectors like Fintech, Healthtech, B2B SaaS, and Web3, where technical complexity demands clear and effective solutions. I'm looking to collaborate with teams that understand design as a business tool and value methodological rigor as much as visual execution.",
    interests_content2: "Currently, I'm exploring AI integration in design workflows, 3D web development with Three.js, Web3 experience design, and backend systems to expand my ability to build end-to-end products.",
    contact_title: "Contact",
    contact_content: "If you have a project or challenge in mind, let's connect. I'm looking for my first opportunity at product agencies, digital design studios, and freelance projects that prioritize quality, strategy, and technical depth.",
    back: "Back to portfolio",
  }

  return (
    <>
      <Navbar dict={dict} lang={lang} />
      <div className="page-transition">
        <main className="pt-32 md:pt-40 lg:pt-48">
          <div className="w-full lg:w-3/5 lg:mx-auto px-4 md:px-6 lg:px-12 pb-24">
        <article className="prose prose-invert prose-lg max-w-none">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">
            {content.title}
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-12">
            {content.intro}
          </p>

          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              {content.exp_title}
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">{content.exp_content}</p>
            <p className="text-gray-300 leading-relaxed">{content.exp_content2}</p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              {content.method_title}
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">{content.method_intro}</p>
            <ul className="space-y-3 mb-6 text-gray-300">
              {content.method_list.map((item, i) => (
                <li key={i} className="pl-6 relative before:content-['•'] before:absolute before:left-0 before:text-gray-500">
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-gray-300 leading-relaxed">{content.method_footer}</p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              {content.interests_title}
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">{content.interests_content}</p>
            <p className="text-gray-300 leading-relaxed">{content.interests_content2}</p>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              {content.contact_title}
            </h2>
            <p className="text-gray-300 leading-relaxed mb-0">{content.contact_content}</p>
          </section>
        </article>
          </div>
        </main>
        <Footer dict={dict} lang={lang} />
      </div>
    </>
  )
}