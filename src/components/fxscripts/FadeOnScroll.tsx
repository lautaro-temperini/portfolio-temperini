'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface FadeOnScrollProps {
  children: ReactNode
  delay?: number // Ahora es un delay relativo al grupo, no absoluto
  className?: string
}

/**
 * FadeOnScroll - Fade-in optimizado para scroll
 * 
 * - Si el elemento ya está en viewport: aplica el delay (efecto cascada)
 * - Si el elemento entra después por scroll: aparece inmediatamente
 * 
 * Esto crea un efecto secuencial natural en la carga inicial,
 * pero no penaliza el scroll rápido del usuario.
 */
export default function FadeOnScroll({ 
  children, 
  delay = 0, 
  className = '' 
}: FadeOnScrollProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ 
        once: true,
        // Margen negativo = trigger antes de entrar completamente
        // Esto hace que elementos cercanos se animen juntos (cascada)
        margin: '-150px 0px -150px 0px',
        amount: 0.1 // Solo necesita 10% visible para activar
      }}
      transition={{
        duration: 0.5,
        // El delay solo afecta si el elemento ya está en viewport
        // Si entra después, whileInView lo activa inmediatamente
        delay: delay / 1000,
        ease: [0.25, 0.46, 0.45, 0.94], // easeOutQuad
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}