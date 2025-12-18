import Link from "next/link"
import { getDictionary } from '@/lib/getDictionary'
import Navbar from "@/components/navbar/Navbar"
import ScrollToTop from "@/components/fxscripts/scroll-to-top"
import Footer from "@/components/footer/Footer"

export const metadata = {
  title: "En Construcción | Lautaro R. Temperini",
  description: "Esta sección está en desarrollo. Vuelve pronto para descubrir nuevos proyectos y experimentos creativos.",
  keywords: "en construcción, próximamente, Lautaro Temperini, portfolio",
  openGraph: {
    title: "En Construcción | Lautaro R. Temperini",
    description: "Esta sección está en desarrollo. Vuelve pronto para descubrir nuevos proyectos y experimentos creativos.",
    url: "https://temperini.vercel.app/under-construction",
    siteName: "Temperini Portfolio",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: "https://temperini.vercel.app/images/foto-lautaro.png",
        width: 1200,
        height: 630,
        alt: "Lautaro R. Temperini - En Construcción"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "En Construcción | Lautaro R. Temperini",
    description: "Esta sección está en desarrollo. Vuelve pronto para descubrir nuevos proyectos y experimentos creativos.",
    images: ["https://temperini.vercel.app/images/foto-lautaro.png"]
  }
};

/**
 * Página de "Under Construction" localizada
 * @param params - Parámetros de la ruta, incluye lang (es | en)
 */
export default async function UnderConstruction({
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
  
  // Dividir el texto en líneas si contiene \n
  const textLines = dict.construction.text.split('\n')
  
  return (
    <div className="page-transition">
      <header>
        <Navbar dict={dict} lang={lang} />
      </header>
      <main className="min-h-screen pt-16 md:pt-20 lg:pt-24 flex items-center justify-center px-4 md:px-6 lg:px-10">
        <div className="text-center space-y-6 md:space-y-8 max-w-xl md:max-w-2xl mx-auto">
          <div className="space-y-3 md:space-y-4">
            <h1 className="fluid-text-3xl md:fluid-text-5xl lg:fluid-text-6xl font-bold text-light">
              {dict.construction.title}
            </h1>
            <p className="fluid-text-base md:fluid-text-lg lg:fluid-text-xl text-accent leading-relaxed">
              {textLines.map((line, index) => (
                <span key={index}>
                  {line}
                  {index < textLines.length - 1 && <br />}
                </span>
              ))}
            </p>
          </div>
          
          <div className="pt-4 md:pt-8">
            <Link 
              href={`/${lang}`}
              className="inline-flex items-center min-h-touch md:h-10 px-6 md:px-8 py-3 bg-[#F2F2F2] text-[#181818] font-semibold rounded-full hover:bg-[#E0E0E0] transition-colors duration-200"
            >
              {dict.construction.backToHome}
            </Link>
          </div>
        </div>
      </main>
      <footer>
        <Footer dict={dict} />
      </footer>
      <ScrollToTop size={48} />
    </div>
  )
}

