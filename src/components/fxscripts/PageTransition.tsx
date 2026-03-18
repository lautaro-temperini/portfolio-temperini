'use client'

import { usePathname } from 'next/navigation'
import { ReactNode, useEffect, useRef } from 'react'

interface PageTransitionProps {
  children: ReactNode
}

/**
 * PageTransition - fade + re-trigger on route change
 * Sin framer-motion: usa CSS transition + reflow trick
 */
export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.classList.remove('page-enter-visible')
    void el.offsetHeight // forzar reflow para re-disparar la transición
    el.classList.add('page-enter-visible')
  }, [pathname])

  return (
    <div ref={ref} className="page-enter w-full min-h-screen">
      {children}
    </div>
  )
}

