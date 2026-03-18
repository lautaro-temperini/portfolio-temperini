'use client'

import { useEffect, useRef } from 'react'

interface PerfilAboutTitleProps {
  text: string
}

export default function PerfilAboutTitle({ text }: PerfilAboutTitleProps) {
  const ref = useRef<HTMLHeadingElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('fade-visible', 'about-slide-in-visible')
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <h2
      ref={ref}
      className="w-full overflow-hidden text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[160px] 2xl:text-[200px] font-semibold leading-tight text-accent font-neue-haas fade-on-scroll about-slide-in"
    >
      {text}
    </h2>
  )
}

