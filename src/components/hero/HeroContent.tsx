'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import RevealOnScroll from '../fxscripts/reveal-on-scroll'
import type { Dictionary } from '@/lib/dictionary-types'
import { sendGAEvent } from '@next/third-parties/google'

interface HeroContentProps {
  dict: Dictionary
}

export default function HeroContent({ dict }: HeroContentProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const heroTitleLines = dict.hero.title.split('\n')

  function smoothScrollToElement(target: HTMLElement, duration = 300) {
    const start = window.scrollY
    const end = target.getBoundingClientRect().top + start
    const distance = end - start
    const startTime = performance.now()

    function animate(time: number) {
      const t = Math.min((time - startTime) / duration, 1)
      const eased = t < 0.5 ? 4 * t ** 3 : 1 - Math.pow(-2 * t + 2, 3) / 2
      window.scrollTo(0, start + distance * eased)
      if (t < 1) requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }

  // 🎯 EVENTO GA4: Click en CTA del hero
  const handleCTAClick = (e: React.MouseEvent) => {
    e.preventDefault()
    
    sendGAEvent('event', 'cta_click', {
      event_category: 'engagement',
      event_label: 'hero_view_projects',
      button_location: 'hero',
      button_text: dict.hero.cta
    })
    
    const section = document.getElementById('projects')
    if (section) smoothScrollToElement(section)
    else window.location.hash = '#projects'
  }

  // ✅ Render unificado con estilos correctos desde el inicio
  return (
    <div className="w-full h-full flex flex-col items-start justify-center pt-32 md:pt-40 lg:pt-48 px-4 md:px-6 lg:px-10">
      {/* Título */}
      <RevealOnScroll>
        <div className="mb-4 md:mb-6">
          <h1
            className="fluid-text-3xl md:fluid-text-4xl lg:fluid-text-5xl font-semibold leading-tight text-light max-w-full md:max-w-md lg:max-w-lg xl:max-w-[605px]"
            style={{ fontFamily: 'var(--font-neue-haas)' }}
          >
            {heroTitleLines.map((line, i) => (
              <span key={i}>
                {line}
                {i < heroTitleLines.length - 1 && <br />}
              </span>
            ))}
          </h1>
        </div>
      </RevealOnScroll>

      {/* Subtítulo */}
      <RevealOnScroll delay={100}>
        <div className="mb-6 md:mb-8">
          <p
            className="fluid-text-base md:fluid-text-lg font-semibold leading-relaxed text-accent max-w-full md:max-w-md lg:max-w-lg xl:max-w-[500px]"
            style={{ fontFamily: 'var(--font-manrope)' }}
          >
            {dict.hero.subtitle}
          </p>
        </div>
      </RevealOnScroll>

      {/* CTA Button */}
      <RevealOnScroll delay={200}>
        <Link
          href="/#projects"
          className="flex items-center justify-center w-full max-w-xs md:w-auto md:max-w-none md:min-w-[257px] h-10 md:h-[40px] bg-gradient-to-r from-[#F2F2F2] via-[#F2F2F2] to-[#9D00E0] rounded-full px-6 shadow-[0px_4px_25px_rgba(115,0,165,0.25)] transition-all duration-200 hover:shadow-[0px_6px_30px_rgba(115,0,165,0.4)] btn-primary group cursor-pointer"
          onClick={(e) => {
            e.preventDefault()
            const section = document.getElementById('projects')
            if (section) smoothScrollToElement(section)
            else window.location.hash = '#projects'
          }}
        >
          <span
            className="fluid-text-sm font-semibold text-background group-hover:text-background transition-colors"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            {dict.hero.cta}
          </span>
        </Link>
      </RevealOnScroll>
    </div>
  )
}