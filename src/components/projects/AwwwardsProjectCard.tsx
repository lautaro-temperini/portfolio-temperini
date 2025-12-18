"use client"

import Link from "next/link"
import Image from "next/image"
import GlareHover from "@/components/fxscripts/GlareHover"
import { sendGAEvent } from '@next/third-parties/google'

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
  variant?: "featured" | "secondary"
}

/**
 * AwwwardsProjectCard - Card de proyecto con GlareHover
 *
 * Layout:
 * - Arriba: Tags
 * - Abajo izquierda: Logo
 * - Abajo derecha: Título + Subtítulo
 */
export default function AwwwardsProjectCard({ project, dict, lang, variant = "secondary" }: AwwwardsProjectCardProps) {
  const projectData = dict?.projects?.items?.[project.slug]
  const title = projectData?.title || project.title
  const subtitle = projectData?.subtitle || project.subtitle
  const tags = projectData?.tags ? Object.values(projectData.tags) : project.tags

  const isFeatured = variant === "featured"

  // 🎯 EVENTO GA4: Click en proyecto
  const handleProjectClick = () => {
    sendGAEvent('event', 'project_click', {
      event_category: 'engagement',
      event_label: title,
      project_name: title,
      project_slug: project.slug,
      click_location: 'home_grid'
    })
  }

  // Tags según breakpoint (igual para featured y secondary):
  // Mobile: 1 tag
  // Tablet: 2 tags
  // Desktop: 3 tags
  const maxTags = 3 // Máximo 3 tags para desktop
  const allTags = (tags as string[]).slice(0, maxTags)

  // Alturas según variante:
  // Featured: Mobile card normal (aspect-square), Desktop aspect-video 16:9, 70-85vh
  // Secondary: Mobile mitad del featured, Desktop 220-260px
  const heightClasses = isFeatured
    ? "aspect-square md:aspect-video md:h-auto md:max-h-[85vh]" // Featured: mobile cuadrado, desktop 16:9 con max 85vh
    : "h-[150px] md:h-[240px] lg:h-[260px]" // Secondary: mobile mitad, desktop 220-260px

  return (
    <Link href={`/${lang}/${project.slug}`} className="block w-full group" onClick={handleProjectClick}>
      <GlareHover
        className={`relative w-full ${heightClasses} rounded-2xl border border-subtle transition-all duration-300 hover:border-primary hover:shadow-[0px_8px_35px_rgba(115,0,165,0.18)] cursor-pointer`}
        glareColor="#f2f2f2"
        glareOpacity={0.07}
        glareAngle={-30}
        glareSize={200}
        transitionDuration={700}
        playOnce={true}
      >
        {/* Background Image */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          <Image
            src={project.previewImage || "/placeholder.svg"}
            alt={title}
            fill
            sizes={isFeatured ? "(max-width: 768px) 100vw, 100vw" : "(max-width: 768px) 100vw, 50vw"}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>

        {/* Gradient Overlay - Siempre visible */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/90 via-black/50 to-black/20" />

        {/* Content Container */}
        <div className={`absolute inset-0 ${isFeatured ? "p-5 md:p-8 lg:p-10" : "p-4 md:p-6"} flex flex-col justify-between`}>
          {/* Top - Tags */}
          {/* Mobile: 1 tag, Tablet: 2 tags, Desktop: 3 tags (igual para featured y secondary) */}
          <div className="flex flex-nowrap gap-2 overflow-hidden w-full">
            {allTags.map((tag, index) => {
              // Clases de visibilidad según breakpoint (igual para todos)
              let visibilityClass = ''
              
              if (index === 1) {
                // Tag 2: oculto en mobile, visible desde tablet (md)
                visibilityClass = 'hidden md:inline-block'
              } else if (index === 2) {
                // Tag 3: oculto hasta desktop (lg)
                visibilityClass = 'hidden lg:inline-block'
              }
              // Tag 0 siempre visible
              
              return (
                <span
                  key={index}
                  className={`px-2.5 py-1 text-xs font-medium rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white whitespace-nowrap flex-shrink-0 ${visibilityClass}`}
                >
                  {tag}
                </span>
              )
            })}
          </div>

          {/* Bottom - Logo (izquierda) + Title/Subtitle (derecha del logo) */}
          <div className={`flex items-end ${isFeatured ? "gap-4 md:gap-6 lg:gap-8" : "gap-3 md:gap-4"}`}>
            {/* Logo - Featured más grande, Secondary más pequeño */}
            <div className={`relative flex-shrink-0 ${
              project.slug === "digito" 
                ? isFeatured 
                  ? "w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 rounded-full overflow-hidden"
                  : "w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full overflow-hidden"
                : isFeatured
                  ? "w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20"
                  : "w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14"
            }`}>
              <Image
                src={project.image || "/placeholder.svg"}
                alt={`${title} logo`}
                fill
                sizes={isFeatured ? "96px" : "56px"}
                className={project.slug === "digito" ? "object-cover drop-shadow-2xl" : "object-contain drop-shadow-2xl"}
              />
            </div>

            {/* Title + Subtitle - Featured dominante, Secondary menor */}
            <div className="text-left flex-1 min-w-0">
              <h3 className={`${
                isFeatured 
                  ? "text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold" 
                  : "text-lg md:text-xl lg:text-2xl font-bold"
              } text-white mb-1 ${isFeatured ? "" : "truncate"}`}>{title}</h3>
              <p className={`${
                isFeatured 
                  ? "text-base md:text-lg lg:text-xl" 
                  : "text-xs md:text-sm"
              } text-white/70 ${isFeatured ? "" : "truncate"}`}>{subtitle}</p>
            </div>
          </div>
        </div>
      </GlareHover>
    </Link>
  )
}
