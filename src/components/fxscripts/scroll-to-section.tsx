"use client"

import { ReactNode } from "react"

interface ScrollToSectionProps {
  href: string
  offset?: number
  duration?: number
  children: ReactNode
  className?: string
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

/**
 * Enlace que hace scroll animado hasta la sección indicada por el hash,
 * con la misma animación que el botón "subir arriba" y un desfase opcional.
 */
export default function ScrollToSection({
  href,
  offset = 80,
  duration = 400,
  children,
  className,
}: ScrollToSectionProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const id = href.replace(/^#/, "")
    if (!id) return
    const el = document.getElementById(id)
    if (!el) return
    e.preventDefault()

    const animationDuration = duration
    const startPosition = window.scrollY ?? window.pageYOffset
    const elTop = el.getBoundingClientRect().top + startPosition
    const targetPosition = Math.max(0, elTop - offset)
    const totalDistance = targetPosition - startPosition
    const animationStartTime = performance.now()

    function animateScroll(currentTime: number) {
      const elapsedTime = currentTime - animationStartTime
      const progress = Math.min(elapsedTime / animationDuration, 1)
      const newPosition = startPosition + totalDistance * easeInOutCubic(progress)
      window.scrollTo(0, newPosition)
      if (progress < 1) requestAnimationFrame(animateScroll)
    }

    requestAnimationFrame(animateScroll)
  }

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  )
}
