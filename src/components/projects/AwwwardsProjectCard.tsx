"use client"

import Link from "next/link"
import Image from "next/image"
import GlareHover from "@/components/fxscripts/GlareHover"

interface AwwwardsProjectCardProps {
  project: {
    slug: string
    image: string
    previewImage: string
    title: string
    subtitle: string
    shortDescription: string
    tags: string[]
  }
  dict: any
  lang: "es" | "en"
}

/**
 * AwwwardsProjectCard - Card de proyecto con GlareHover
 *
 * Layout:
 * - Arriba: Tags
 * - Abajo izquierda: Logo
 * - Abajo derecha: Título + Subtítulo
 */
export default function AwwwardsProjectCard({ project, dict, lang }: AwwwardsProjectCardProps) {
  const projectData = dict?.projects?.items?.[project.slug]
  const title = projectData?.title || project.title
  const subtitle = projectData?.subtitle || project.subtitle
  const tags = projectData?.tags ? Object.values(projectData.tags) : project.tags

  return (
    <Link href={`/${lang}/${project.slug}`} className="block w-full group">
      <GlareHover
        className="relative w-full h-[300px] md:h-[350px] lg:h-[400px] rounded-2xl border border-[#333] transition-all duration-300 hover:border-[#8900C3] hover:shadow-[0px_8px_35px_rgba(115,0,165,0.18)] cursor-pointer"
        glareColor="#f2f2f2"
        glareOpacity={0.07}
        glareAngle={-30}
        glareSize={200}
        transitionDuration={700}
        playOnce={true}
        style={{ borderRadius: "1rem" }}
      >
        {/* Background Image */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          <Image
            src={project.previewImage || "/placeholder.svg"}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>

        {/* Gradient Overlay - Siempre visible */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/90 via-black/50 to-black/20" />

        {/* Content Container */}
        <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-between">
          {/* Top - Tags */}
          <div className="flex flex-wrap gap-2">
            {(tags as string[]).slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2.5 py-1 text-xs font-medium rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Bottom - Logo (izquierda) + Title/Subtitle (derecha) */}
          <div className="flex items-end justify-between gap-4">
            {/* Logo */}
            <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 relative flex-shrink-0">
              <Image
                src={project.image || "/placeholder.svg"}
                alt={`${title} logo`}
                fill
                sizes="64px"
                className="object-contain drop-shadow-2xl"
              />
            </div>

            {/* Title + Subtitle */}
            <div className="text-right flex-1 min-w-0">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-1 truncate">{title}</h3>
              <p className="text-white/70 text-sm md:text-base truncate">{subtitle}</p>
            </div>
          </div>
        </div>
      </GlareHover>
    </Link>
  )
}
