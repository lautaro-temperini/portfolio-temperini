import type React from "react"

interface CaseStudyLayoutProps {
  children: React.ReactNode
  className?: string
}

const CaseStudyLayout: React.FC<CaseStudyLayoutProps> = ({
  children,
  className = "",
}) => {
  return (
    <article className={`w-full ${className}`}>
      {children}
    </article>
  )
}

export default CaseStudyLayout
