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
    <section className={`w-full lg:w-3/5 lg:mx-auto px-4 md:px-6 lg:px-12 ${className}`}>
      {children}
    </section>
  )
}

export default ProseSection
