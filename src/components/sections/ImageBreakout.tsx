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
  imageClassName?: string
  shadow?: boolean
  border?: boolean
  priority?: boolean
  full?: boolean
  noPadding?: boolean
  caption?: string
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
  imageClassName = "",
  shadow = false,
  border = true,
  priority = false,
  full = false,
  noPadding = false,
  caption,
}) => {
  // Determinar el padding según las props
  let paddingClasses = ''
  if (!noPadding) {
    paddingClasses = full ? 'px-8 md:px-12 lg:px-20' : 'px-4 md:px-6 lg:px-12'
  }
  
  const containerClasses = `
    w-full ${full ? '' : 'lg:w-3/5 lg:mx-auto'} ${paddingClasses}
    mb-16
  `

  const imageWrapperClasses = `
    rounded-lg overflow-hidden bg-[#F2F2F2]
    ${shadow ? "shadow-2xl" : ""}
    ${border ? "border-2 border-[#A6A6A6]" : ""}
    w-full ${className.includes('h-') ? '' : 'aspect-video md:h-[60vh] lg:h-[70vh]'}
    flex items-center justify-center
    ${className}
  `

  const imageClasses = `w-full h-full object-contain ${imageClassName}`

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
      {caption && (
        <figcaption className="mt-4 text-sm text-light/70 text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

export default ImageBreakout


