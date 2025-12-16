import { Suspense } from 'react'
import { getDictionary } from '@/lib/getDictionary'
import ProjectCard from "./Project-card"
import ProjectCardSkeleton from "./ProjectCardSkeleton"
import { projectsData } from "@/data/projectsData"

/**
 * Props del componente Projects
 */
interface ProjectsProps {
  lang: 'es' | 'en'
}

/**
 * Componente Projects - Server Component
 * Obtiene el diccionario y lo pasa a cada ProjectCard
 */
export default async function Projects({ lang }: ProjectsProps) {
  // Obtener diccionario de traducciones
  const dict = await getDictionary(lang)

  return (
    <section
      id="projects"
      className="relative w-full overflow-hidden py-16"
    >
      {/* Header - Static */}
      <div className="w-full flex flex-col items-start text-left mb-8 md:mb-12 lg:mb-16 px-4 md:px-6 lg:px-10">
        <div className="space-y-2">
          <h2
            className="fluid-text-3xl md:fluid-text-4xl lg:fluid-text-5xl font-semibold leading-tight text-light mb-4 md:mb-6"
            style={{ fontFamily: "var(--font-neue-haas)" }}
          >
            {dict.projects.title}
          </h2>
          <p
            className="fluid-text-base md:fluid-text-lg font-semibold leading-relaxed text-accent max-w-full md:max-w-2xl lg:max-w-3xl"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            {dict.projects.description}
          </p>
        </div>
      </div>

      {/* Projects Container */}
      <div className="w-full">
        <div className="flex flex-col gap-2 md:gap-4 lg:gap-6 px-4 md:px-6 lg:px-10">
          <Suspense
            fallback={
              <>
                {projectsData.map((project) => (
                  <ProjectCardSkeleton key={project.id} />
                ))}
              </>
            }
          >
            {projectsData.map((project) => (
              <ProjectCard
                key={project.id}
                image={project.image}
                slug={project.slug}
                dict={dict}
                lang={lang}
                className="w-full"
              />
            ))}
          </Suspense>
        </div>
      </div>
    </section>
  )
}
