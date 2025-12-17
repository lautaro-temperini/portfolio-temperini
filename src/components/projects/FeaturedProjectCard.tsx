"use client"

import Link from "next/link"
import Image from "next/image"
import { sendGAEvent } from '@next/third-parties/google'

interface FeaturedProjectCardProps {
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
 * FeaturedProjectCard - Card destacada full-width
 */
export default function FeaturedProjectCard({ project, dict, lang }: FeaturedProjectCardProps) {
  const projectData = dict?.projects?.items?.[project.slug]
  const title = projectData?.title || project.title
  const subtitle = projectData?.subtitle || project.subtitle
  const tags: string[] = projectData?.tags ? (Object.values(projectData.tags) as string[]) : project.tags

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

  return (
    <Link href={`/${lang}/${project.slug}`} className="block w-full group" onClick={handleProjectClick}>
      <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl border border-[#333] transition-all duration-300 hover:border-[#8900C3] hover:shadow-[0px_8px_35px_rgba(115,0,165,0.18)] cursor-pointer overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          <Image
            src={project.previewImage || "/images/projects/placeholder.jpg"}
            alt={title}
            fill
            sizes="100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            priority
          />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/90 via-black/50 to-black/20" />

        {/* Content Container */}
        <div className="absolute inset-0 p-6 md:p-8 lg:p-10 flex flex-col justify-between">
          {/* Top - Tags */}
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 4).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs font-medium rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Bottom - Logo + Title/Subtitle */}
          <div className="flex items-end justify-between gap-6">
            {/* Logo */}
            <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 relative flex-shrink-0">
              <Image
                src={project.image || "/images/projects/placeholder-logo.png"}
                alt={`${title} logo`}
                fill
                className="object-contain drop-shadow-2xl"
              />
            </div>

            {/* Title + Subtitle */}
            <div className="text-right flex-1">
              <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-1 md:mb-2">
                {title}
              </h2>
              <p className="text-white/70 text-sm md:text-base lg:text-lg">{subtitle}</p>
            </div>
          </div>
        </div>

        {/* Featured Badge */}
        <div className="absolute top-6 right-6 md:top-8 md:right-8">
          <span className="px-3 py-1.5 text-xs font-semibold rounded-full bg-[#8900C3] text-white">Featured</span>
        </div>
      </div>
    </Link>
  )
}
