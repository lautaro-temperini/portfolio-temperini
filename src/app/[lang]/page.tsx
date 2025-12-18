import { getDictionary } from '@/lib/getDictionary'
import Navbar from "@/components/navbar/Navbar";
import Hero from "@/components/hero/Hero";
import Projects from "@/components/projects/SeccionProjects";
import Perfil from "@/components/perfil/Perfil";
import Footer from "@/components/footer/Footer";

export const metadata = {
  title: "Lautaro R. Temperini | Product Designer • UX/UI",
  description: "Portfolio de Lautaro R. Temperini: Product Designer especializado en UX/UI y Frontend Developer. Explora proyectos de diseño digital y desarrollo web.",
  keywords: "Lautaro Temperini, Product Designer, UX/UI, Frontend Developer, diseño digital, desarrollo web, portfolio",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Lautaro R. Temperini | Product Designer • UX/UI",
    description: "Portfolio de Lautaro R. Temperini: Product Designer especializado en UX/UI y Frontend Developer. Explora proyectos de diseño digital y desarrollo web.",
    url: "https://temperini.vercel.app",
    siteName: "Temperini Portfolio",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: "https://temperini.vercel.app/images/foto-lautaro.png",
        width: 1200,
        height: 630,
        alt: "Lautaro R. Temperini - Product Designer & Frontend Developer"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Lautaro R. Temperini | Product Designer & Frontend Developer",
    description: "Portfolio de Lautaro R. Temperini: Product Designer especializado en UX/UI y Frontend Developer. Explora proyectos de diseño digital y desarrollo web.",
    images: ["https://temperini.vercel.app/images/foto-lautaro.png"]
  }
};

/**
 * Página principal localizada
 * @param params - Parámetros de la ruta, incluye lang (es | en)
 */
export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  // Await params en Next.js 15
  const { lang: langParam } = await params
  
  // Validar y convertir el idioma a 'es' o 'en'
  const lang = (langParam === 'es' || langParam === 'en') ? langParam : 'es'
  
  // Obtener diccionario de traducciones
  const dict = await getDictionary(lang)
  
  return (
    <>
      <Navbar dict={dict} lang={lang} />
      <div className="page-transition">
        <main>
          {/* Pasar el idioma a cada componente */}
          <Hero lang={lang} />
          <Projects lang={lang} />
          <Perfil lang={lang} />
        </main>
        <Footer dict={dict} />
      </div>
    </>
  )
} 