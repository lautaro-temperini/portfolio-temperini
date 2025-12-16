// ============================================================================
// IMPORTS
// ============================================================================

import Image from "next/image"
import type React from "react"

// ============================================================================
// TIPOS E INTERFACES
// ============================================================================

interface ImageBreakoutProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  shadow?: boolean
  border?: boolean
  priority?: boolean
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

const ImageBreakout: React.FC<ImageBreakoutProps> = ({
  src,
  alt,
  width,
  height,
  className = "",
  shadow = false,
  border = true,
  priority = false,
}) => {
  const containerClasses = `
    w-3/5 mx-auto px-8 md:px-10 lg:px-12
    mb-16
  `

  const imageWrapperClasses = `
    rounded-lg overflow-hidden bg-[#F2F2F2]
    ${shadow ? "shadow-2xl" : ""}
    ${border ? "border-2 border-[#A6A6A6]" : ""}
    w-full h-[70vh]
    flex items-center justify-center
    ${className}
  `

  const imageClasses = "w-full h-full object-contain"

  return (
    <figure className={containerClasses}>
      <div className={imageWrapperClasses}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={imageClasses}
          priority={priority}
          quality={90}
        />
      </div>
    </figure>
  )
}

export default ImageBreakout


