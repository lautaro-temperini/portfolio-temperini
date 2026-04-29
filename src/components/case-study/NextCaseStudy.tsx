import Link from "next/link"
import DevImage from "@/components/DevImage"

type Lang = "es" | "en"

interface ProjectInfo {
  slug: string
  title: string
  subtitleEs: string
  subtitleEn: string
  // Drop screenshots here: /public/images/nextcases/{slug}.webp
  previewImage: string
  labelEs: string
  labelEn: string
}

const ORDER: ProjectInfo[] = [
  {
    slug: "digito",
    title: "DÍGITO",
    subtitleEs: "Rediseño UX/UI de módulo operativo",
    subtitleEn: "UX/UI redesign of operations module",
    previewImage: "/images/nextcases/digito.webp",
    labelEs: "Ver Dígito",
    labelEn: "View Dígito",
  },
  {
    slug: "manijapp",
    title: "MANIJAPP",
    subtitleEs: "MVP independiente para discovery de eventos alternativos",
    subtitleEn: "Independent MVP for alternative event discovery",
    previewImage: "/images/nextcases/manijapp.webp",
    labelEs: "Ver Manijapp",
    labelEn: "View Manijapp",
  },
  {
    slug: "gloryfit",
    title: "GLORYFIT",
    subtitleEs: "Rutinas personalizadas a partir de tus datos",
    subtitleEn: "Personalized routines from your data",
    previewImage: "/images/nextcases/gloryfit.webp",
    labelEs: "Ver Glory Fit",
    labelEn: "View Glory Fit",
  },
  {
    slug: "levelup",
    title: "LEVEL UP",
    subtitleEs: "Rediseñando la experiencia editorial gamer",
    subtitleEn: "Redesigning gaming editorial for Latin America",
    previewImage: "/images/nextcases/levelup.webp",
    labelEs: "Ver Level Up",
    labelEn: "View Level Up",
  },
  {
    slug: "vorterix",
    title: "VORTERIX",
    subtitleEs: "Una landing sin vueltas",
    subtitleEn: "A no-nonsense landing page",
    previewImage: "/images/nextcases/vorterix.webp",
    labelEs: "Ver Vorterix",
    labelEn: "View Vorterix",
  },
]

interface NextCaseStudyProps {
  currentSlug: string
  lang: Lang
}

export default function NextCaseStudy({ currentSlug, lang }: NextCaseStudyProps) {
  const currentIndex = ORDER.findIndex((p) => p.slug === currentSlug)
  const next = ORDER[(currentIndex + 1) % ORDER.length]
  const es = lang === "es"

  return (
    <section className="relative z-[21] w-full bg-container py-16 md:py-24">
      <div className="px-8 md:px-12 lg:px-20">
        <div className="bg-background rounded-2xl border border-subtle p-6 md:p-10 flex flex-col md:flex-row gap-8 md:gap-12 items-center">

          {/* Square preview image */}
          <div className="w-full md:w-[380px] lg:w-[440px] flex-shrink-0">
            <DevImage
              src={next.previewImage}
              alt={`${next.title} preview`}
              width={440}
              height={440}
              imageClassName="object-cover"
              className="rounded-xl overflow-hidden"
            />
          </div>

          {/* Text + CTA */}
          <div className="flex flex-col gap-5 flex-1 min-w-0">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-light leading-tight tracking-tight break-words">
              {es ? "Siguiente caso" : "Next case"}
            </h2>
            <p className="text-accent text-lg leading-relaxed max-w-md">
              {es ? next.subtitleEs : next.subtitleEn}
            </p>
            <Link
              href={`/${lang}/${next.slug}`}
              className="flex items-center justify-center w-full max-w-xs md:w-auto md:max-w-none md:min-w-fit h-10 bg-gradient-to-r from-[#F2F2F2] via-[#F2F2F2] to-[#9D00E0] rounded-full px-6 shadow-[0px_4px_25px_rgba(115,0,165,0.25)] transition-all duration-200 hover:shadow-[0px_6px_30px_rgba(115,0,165,0.4)] btn-primary group cursor-pointer self-start mt-2"
            >
              <span className="text-sm font-semibold text-background group-hover:text-background transition-colors whitespace-nowrap">
                {es ? next.labelEs : next.labelEn}
              </span>
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}
