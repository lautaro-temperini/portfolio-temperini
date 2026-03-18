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
  const content = dict.about.page

  return (
    <>
      <Navbar dict={dict} lang={lang} />
      <div className="page-transition">
        <main id="main-content" role="main" className="pt-32 md:pt-40 lg:pt-48">
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