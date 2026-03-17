'use client'

import { motion } from 'framer-motion'

interface PerfilAboutTitleProps {
  text: string
}

export default function PerfilAboutTitle({ text }: PerfilAboutTitleProps) {
  return (
    <motion.h2
      className="w-full overflow-hidden text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[160px] 2xl:text-[200px] font-semibold leading-tight text-accent"
      style={{ fontFamily: "var(--font-neue-haas)" }}
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {text}
    </motion.h2>
  )
}

