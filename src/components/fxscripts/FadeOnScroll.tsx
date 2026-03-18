'use client'

import { ReactNode, useEffect, useRef } from 'react'

interface FadeOnScrollProps {
  children: ReactNode
  delay?: number // mantenemos la API, pero el delay ya no se usa en CSS
  className?: string
}

export default function FadeOnScroll({
  children,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  delay = 0,
  className = '',
}: FadeOnScrollProps) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('fade-visible')
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={`fade-on-scroll ${className}`}>
      {children}
    </div>
  )
}