"use client"

// ============================================================================
// IMPORTS - Importaciones de librerías
// ============================================================================

import { useState } from "react"
import Image from "next/image"

// ============================================================================
// TIPOS E INTERFACES
// ============================================================================

/**
 * Props del componente OptimizedImage
 * 
 * @property src - Ruta de la imagen a mostrar
 * @property alt - Texto alternativo para accesibilidad (obligatorio)
 * @property className - Clases CSS adicionales
 * @property priority - Si la imagen debe cargarse con prioridad alta (above-the-fold)
 * @property width - Ancho de la imagen en píxeles (para modo width/height)
 * @property height - Alto de la imagen en píxeles (para modo width/height)
 * @property useFill - Si usar modo "fill" en lugar de width/height (para contenedores responsivos)
 */
interface OptimizedImageProps {
  src: string
  alt: string
  className?: string
  priority?: boolean
  width?: number
  height?: number
  useFill?: boolean
}

// ============================================================================
// CONSTANTES
// ============================================================================

/**
 * Placeholder de blur en formato base64
 * Esta es una imagen diminuta (10x10px) codificada en base64 que se muestra
 * mientras la imagen real se está cargando, creando un efecto de "blur-up"
 * 
 * Se usa con la prop placeholder="blur" de next/image
 */
const BLUR_PLACEHOLDER_DATA_URL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=='

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

/**
 * OptimizedImage - Componente de imagen optimizada con manejo de estados
 * 
 * Este componente envuelve el componente Image de Next.js añadiendo:
 * - Estado de carga con efecto de fade-in
 * - Manejo de errores con mensaje de imagen no encontrada
 * - Placeholder de blur mientras carga
 * - Detección automática de si usar "fill" o "width/height"
 * 
 * Modos de uso:
 * 1. Con useFill=true: La imagen llena su contenedor (necesita position: relative en padre)
 * 2. Con width/height: La imagen tiene dimensiones fijas
 * 
 * @param src - URL de la imagen
 * @param alt - Texto alternativo (importante para accesibilidad)
 * @param className - Clases CSS adicionales
 * @param priority - Si cargar con prioridad (para imágenes above-the-fold)
 * @param width - Ancho en píxeles (por defecto 800)
 * @param height - Alto en píxeles (por defecto 600)
 * @param useFill - Usar modo fill (por defecto false)
 * @returns Componente JSX de imagen optimizada
 */
export default function OptimizedImage({ 
  src, 
  alt, 
  className = "", 
  priority = false,
  width = 800,
  height = 600,
  useFill = false
}: OptimizedImageProps) {
  // ============================================================================
  // ESTADOS
  // ============================================================================

  /**
   * Estado que indica si la imagen terminó de cargar
   * Se usa para aplicar la clase de animación fade-in
   */
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  
  /**
   * Estado que indica si hubo un error al cargar la imagen
   * Se usa para mostrar un mensaje de error en lugar de la imagen
   */
  const [hasLoadError, setHasLoadError] = useState(false)

  // ============================================================================
  // DETECCIÓN DE MODO DE RENDERIZADO
  // ============================================================================

  /**
   * Determinar si necesitamos usar el modo "fill" de Next.js Image
   * 
   * El modo fill es necesario cuando:
   * 1. useFill está explícitamente en true
   * 2. Las clases incluyen w-full, h-full, object-cover u object-contain
   *    (indicando que la imagen debe llenar un contenedor)
   */
  const shouldUseFillMode = useFill || 
    className.includes('w-full') || 
    className.includes('h-full') || 
    className.includes('object-cover') || 
    className.includes('object-contain')

  // ============================================================================
  // RENDERIZADO
  // ============================================================================

  return (
    <div className={`relative ${shouldUseFillMode ? 'w-full h-full' : ''}`}>
      
      {/* ==================== IMAGEN CON MODO FILL ==================== */}
      {/* Se usa cuando la imagen debe llenar su contenedor */}
      {shouldUseFillMode ? (
        <Image
          src={src}
          alt={alt}
          fill
          className={`image-fade-in ${isImageLoaded ? "loaded" : ""} ${className}`}
          onLoad={() => setIsImageLoaded(true)}
          onError={() => {
            setHasLoadError(true)
            setIsImageLoaded(true) // Marcar como cargado para ocultar cualquier estado de carga
          }}
          priority={priority}
          placeholder="blur"
          blurDataURL={BLUR_PLACEHOLDER_DATA_URL}
          style={{ display: hasLoadError ? "none" : "block" }}
          // Tamaños responsivos para optimización automática
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      ) : (
        /* ==================== IMAGEN CON DIMENSIONES FIJAS ==================== */
        /* Se usa cuando la imagen tiene un tamaño específico */
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`image-fade-in ${isImageLoaded ? "loaded" : ""} ${className}`}
          onLoad={() => setIsImageLoaded(true)}
          onError={() => {
            setHasLoadError(true)
            setIsImageLoaded(true)
          }}
          priority={priority}
          placeholder="blur"
          blurDataURL={BLUR_PLACEHOLDER_DATA_URL}
          style={{ display: hasLoadError ? "none" : "block" }}
        />
      )}

      {/* ==================== MENSAJE DE ERROR ==================== */}
      {/* Se muestra si la imagen no pudo cargarse */}
      {hasLoadError && (
        <div className={`bg-gray-200 dark:bg-gray-700 flex items-center justify-center ${className}`}>
          <span className="text-gray-500 dark:text-gray-400 text-sm">
            Image not found
          </span>
        </div>
      )}
    </div>
  )
}
