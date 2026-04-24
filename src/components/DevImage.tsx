import Image from "next/image"
import { cn } from "@/lib/utils"

interface DevImageProps {
  src?: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  className?: string
  imageClassName?: string
  sizes?: string
  priority?: boolean
  caption?: string
}

const isDev = process.env.NODE_ENV === "development"

/**
 * Renderiza una imagen real si tiene src, un placeholder visual en dev si no tiene src,
 * o nada en prod si no tiene src.
 *
 * fill=true: sin wrapper, posicionamiento absoluto (para banners con contenedor relativo de altura fija)
 * fill=false (default): wrapper con aspect-ratio calculado desde width/height + caption opcional
 */
export default function DevImage({
  src,
  alt,
  width = 1200,
  height = 675,
  fill = false,
  className,
  imageClassName,
  sizes = "(max-width: 768px) 100vw, 1200px",
  priority,
  caption,
}: DevImageProps) {
  if (fill) {
    if (!src) {
      if (!isDev) return null
      return (
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center bg-container/40 border border-dashed border-container-light/20 font-mono text-sm text-light/30 text-center px-4",
            className
          )}
        >
          [{alt}]
        </div>
      )
    }
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={cn("object-cover", imageClassName)}
        sizes={sizes}
        priority={priority}
      />
    )
  }

  if (!src) {
    if (!isDev) return null
    return (
      <figure className={className}>
        <div
          className="flex w-full items-center justify-center rounded-lg border border-dashed border-container-light/20 bg-container/40 font-mono text-sm text-light/30 text-center px-4"
          style={{ aspectRatio: `${width}/${height}` }}
        >
          [{alt}]
        </div>
        {caption && (
          <figcaption className="mt-2 px-8 text-center text-sm text-light/70">
            {caption}
          </figcaption>
        )}
      </figure>
    )
  }

  return (
    <figure className={className}>
      <div className="relative w-full" style={{ aspectRatio: `${width}/${height}` }}>
        <Image
          src={src}
          alt={alt}
          fill
          className={cn("rounded-lg object-contain", imageClassName)}
          sizes={sizes}
          priority={priority}
        />
      </div>
      {caption && (
        <figcaption className="mt-2 px-8 text-center text-sm text-light/70">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
