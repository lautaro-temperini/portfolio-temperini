// ============================================================================
// ITEMS DEL PLAYGROUND
// ============================================================================

import type { BentoItem } from '@/data/playgroundData'

/**
 * playgroundItems - Lista de proyectos/experimentos del Playground
 * Interfaz BentoItem: { id, title, description, image, tags, type, variant, href? }
 * Tipos: 'motion' | 'generative' | 'airenders' | 'interactive'
 * Variants: 'purple' | 'green' | 'orange' | 'pink' | 'gray' | 'blue'
 */
export const playgroundItems: BentoItem[] = [
  {
    id: 1,
    title: "Creación/Destrucción",
    description: "Oxidación y contrastes en madera. Acetato férrico sobre roble: tres concentraciones, acrílico azul cobalto y exposición solar. El deterioro como método de creación.",
    image: "/images/playground/oxidacion-madera.webp",
    tags: ["Técnica mixta", "Madera", "Oxidación"],
    type: "generative",
    variant: "orange",
    href: "/playground/oxidacion-madera",
  },
  {
    id: 2,
    title: "Cars — Página Web",
    description: "Sitio web estático desarrollado para PMIW. HTML, CSS y JavaScript vanilla.",
    image: "/images/playground/cars-web.webp",
    tags: ["HTML", "CSS", "JavaScript"],
    type: "interactive",
    variant: "blue",
    // TODO: reemplazar con la URL real del sitio PMIW
    href: "#",
  },
  {
    id: 3,
    title: "Obra Generativa",
    description: "Exploración generativa desarrollada con Processing y p5.js. Sistema de reglas visuales que produce patrones únicos.",
    image: "/images/playground/obra-generativa.webp",
    tags: ["Processing", "p5.js", "Generativo"],
    type: "generative",
    variant: "purple",
    href: "/playground/obra-generativa",
  },
  {
    id: 4,
    title: "Galería Visual",
    description: "Archivo de flyers de diseño gráfico y modelos 3D. Exploración entre lo digital plano y el volumen tridimensional.",
    image: "/images/playground/galeria-preview.webp",
    tags: ["Diseño Gráfico", "3D", "Flyers"],
    type: "motion",
    variant: "pink",
    href: "/playground/galeria",
  },
  {
    id: 5,
    title: "Dibujar con la Voz",
    description: "Experimento en p5.js donde la voz del usuario genera trazos visuales en tiempo real. Interface de audio como herramienta de dibujo.",
    image: "/images/playground/voz-dibujo.webp",
    tags: ["p5.js", "Audio", "Interactivo"],
    type: "interactive",
    variant: "green",
    href: "/playground/dibujar-voz",
  },
  {
    id: 6,
    title: "Light The Byte",
    description: "Juego desarrollado en Unity. Jugable directamente en el navegador vía WebGL.",
    image: "/images/playground/light-byte.webp",
    tags: ["Unity", "WebGL", "Juego"],
    type: "interactive",
    variant: "gray",
    href: "/playground/light-the-byte",
  },
  {
    id: 7,
    title: "Recto Final",
    description: "Juego de carreras desarrollado en Unity. Jugable en el navegador vía WebGL build.",
    image: "/images/playground/rectofinal.webp",
    tags: ["Unity", "WebGL", "Juego"],
    type: "interactive",
    variant: "blue",
    href: "/playground/rectofinal",
  },
]
