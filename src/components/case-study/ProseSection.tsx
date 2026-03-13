import type React from "react"

interface ProseSectionProps {
  children: React.ReactNode
  className?: string
  contained?: boolean
  id?: string
}

const ProseSection: React.FC<ProseSectionProps> = ({
  children,
  className = "",
  contained = true,
  id,
}) => {
  if (!contained) {
    return (
      <section id={id} className={`w-full ${className}`}>
        {children}
      </section>
    )
  }

  return (
    <section id={id} className={`w-full px-8 md:px-12 lg:px-20 ${className}`}>
      {children}
    </section>
  )
}

export default ProseSection
