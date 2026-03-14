'use client'

import { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'

interface GaleriaClientProps {
  images: { src: string; alt?: string }[]
}

export default function GaleriaClient({ images }: GaleriaClientProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index)
  }, [])

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null)
  }, [])

  const goPrev = useCallback(() => {
    if (lightboxIndex === null) return
    setLightboxIndex(lightboxIndex === 0 ? images.length - 1 : lightboxIndex - 1)
  }, [lightboxIndex, images.length])

  const goNext = useCallback(() => {
    if (lightboxIndex === null) return
    setLightboxIndex(lightboxIndex === images.length - 1 ? 0 : lightboxIndex + 1)
  }, [lightboxIndex, images.length])

  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [lightboxIndex])

  if (images.length === 0) {
    return (
      <div className="rounded-xl bg-white/5 border border-white/10 min-h-[200px] flex items-center justify-center text-white/50 text-sm">
        Agregar imágenes al array en page.tsx
      </div>
    )
  }

  return (
    <>
      {/* Grid 3 columnas / masonry-style */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {images.map((img, index) => (
          <button
            key={`${img.src}-${index}`}
            type="button"
            onClick={() => openLightbox(index)}
            className="relative block w-full rounded-xl overflow-hidden border border-white/10 aspect-[4/5] sm:aspect-auto sm:min-h-[240px] focus:outline-none focus:ring-2 focus:ring-white/30"
          >
            <Image
              src={img.src}
              alt={img.alt ?? `Galería ${index + 1}`}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            />
          </button>
        ))}
      </div>

      {/* Lightbox nativo (sin librería) */}
      {lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Vista ampliada"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={closeLightbox}
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white/90 hover:text-white text-2xl leading-none z-10"
            aria-label="Cerrar"
          >
            ×
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); goPrev() }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/90 hover:text-white text-2xl z-10"
            aria-label="Anterior"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); goNext() }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/90 hover:text-white text-2xl z-10"
            aria-label="Siguiente"
          >
            ›
          </button>
          <div
            className="relative max-w-full max-h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[lightboxIndex].src}
              alt={images[lightboxIndex].alt ?? `Imagen ${lightboxIndex + 1}`}
              width={1200}
              height={800}
              className="max-w-full max-h-[85vh] w-auto h-auto object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  )
}
