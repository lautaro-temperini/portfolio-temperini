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
  sizes?: string
  figureClassName?: string
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
  sizes,
  figureClassName = "",
}) => {
  // Determinar el padding según las props (full = ancho completo sin padding lateral)
  let paddingClasses = ''
  if (!noPadding && !full) {
    paddingClasses = 'px-8 md:px-12 lg:px-20'
  }
  
  const containerClasses = `w-full ${paddingClasses} mb-20 ${figureClassName}`

  const imageWrapperClasses = `
    rounded-lg overflow-hidden
    ${shadow ? "shadow-2xl" : ""}
    ${border ? "border-2 border-accent" : ""}
    w-full ${className.includes('h-') ? '' : 'aspect-video md:h-[60vh] lg:h-[70vh]'}
    flex items-center justify-center
    ${className}
  `

  const imageClasses = `w-full h-full ${imageClassName || 'object-contain'}`

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
          sizes={sizes ?? (full ? "100vw" : "(max-width: 768px) 100vw, 1200px")}
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