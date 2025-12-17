'use client'

import { useEffect, useRef, useState } from 'react'

interface Props {
  children: React.ReactNode
  delay?: number
  className?: string
}

export default function RevealOnScroll({ children, delay = 0, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [revealed, setRevealed] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setRevealed(true), delay)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay, mounted])

  // ✅ CRÍTICO: className debe ser string vacío, NO undefined
  const baseClassName = className || ''
  
  if (!mounted) {
    return (
      <div ref={ref} className={baseClassName}>
        {children}
      </div>
    )
  }

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      } ${baseClassName}`}
    >
      {children}
    </div>
  )
}