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
    <section className={`w-3/5 mx-auto px-8 md:px-10 lg:px-12 ${className}`}>
      {children}
    </section>
  )
}

export default ProseSection
