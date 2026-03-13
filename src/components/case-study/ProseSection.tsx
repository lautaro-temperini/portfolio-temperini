import type React from "react"

interface ProseSectionProps {
  children: React.ReactNode
  className?: string
  contained?: boolean
}

const ProseSection: React.FC<ProseSectionProps> = ({
  children,
  className = "",
  contained = true,
}) => {
  if (!contained) {
    return (
      <section className={`w-full ${className}`}>
        {children}
      </section>
    )
  }

  return (
    <section className={`w-full px-8 md:px-12 lg:px-20 ${className}`}>
      {children}
    </section>
  )
}

export default ProseSection
