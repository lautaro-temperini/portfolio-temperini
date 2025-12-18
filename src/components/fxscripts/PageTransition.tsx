'use client'

import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { ReactNode, useEffect, useState } from 'react'

interface PageTransitionProps {
  children: ReactNode
}

/**
 * PageTransition - Componente para transiciones de entrada en páginas
 * 
 * Aplica animación de fade + blur cuando se monta el componente.
 * Ideal para animar la entrada a páginas específicas como Contact.
 * 
 * Características:
 * - Detecta cambios de ruta con usePathname
 * - Animación de entrada automática al montar o cambiar de ruta
 * - Fade + blur effect
 * - Duración rápida (~0.8s)
 * - Easing suave
 * - Afecta toda la página (navbar, fondo, contenido)
 */
export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const [key, setKey] = useState(0)

  useEffect(() => {
    // Forzar re-animación cuando cambia la ruta
    setKey(prev => prev + 1)
  }, [pathname])

  return (
    <motion.div
      key={key}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1], // ease-in-out suave (cubic-bezier)
      }}
      style={{
        width: '100%',
        minHeight: '100vh',
      }}
    >
      {children}
    </motion.div>
  )
}

