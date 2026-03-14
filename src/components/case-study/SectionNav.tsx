'use client'

import React, { useEffect, useState } from "react"

interface Section {
  id: string
  /** Etiqueta opcional para el índice (p. ej. para secciones sin h2 o con texto por idioma) */
  label?: string
}

interface SectionNavProps {
  sections: Section[]
}

const SectionNav: React.FC<SectionNavProps> = ({ sections }) => {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [labels, setLabels] = useState<Record<string, string>>({})

  useEffect(() => {
    const map: Record<string, string> = {}
    sections.forEach(({ id, label }) => {
      if (label) {
        map[id] = label
      } else {
        const el = document.getElementById(id)
        const h2 = el?.querySelector('h2')
        if (h2) {
          map[id] = h2.textContent || id
        }
      }
    })
    setLabels(map)
  }, [sections])

  useEffect(() => {
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        root: null,
        threshold: 0.3,
      }
    )

    sections.forEach((section) => {
      const el = document.getElementById(section.id)
      if (el) observer.observe(el)
    })

    return () => {
      observer.disconnect()
    }
  }, [sections])

  const handleClick = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  if (sections.length === 0) return null

  return (
    <nav className="hidden lg:flex fixed right-6 top-0 h-screen z-30 items-center">
      <div className="flex flex-col items-end gap-4">
        {sections.map((section) => {
          const isActive = activeId === section.id
          const label = labels[section.id] || section.id
          return (
            <div
              key={section.id}
              className="group relative flex items-center justify-end w-fit ml-auto"
            >
              {/* Tooltip absolutely positioned: no layout impact */}
              <span className="absolute right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-sm text-light/80 whitespace-nowrap pointer-events-none bg-black/60 backdrop-blur-sm rounded px-2 py-0.5">
                {label}
              </span>
              {/* Dot: only hover/click target */}
              <span
                className={`w-2 h-2 rounded-full cursor-pointer transition-colors duration-200 ${
                  isActive ? "bg-light" : "bg-light/20"
                }`}
                onClick={() => handleClick(section.id)}
                aria-label={label}
              />
            </div>
          )
        })}
      </div>
    </nav>
  )
}

export default SectionNav

