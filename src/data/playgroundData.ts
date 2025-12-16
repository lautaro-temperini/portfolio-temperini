// ============================================================================
// PLAYGROUND DATA - Bento Grid Items
// ============================================================================

/**
 * Variantes de color para las cards del Bento Grid
 */
export type BentoVariant = 'purple' | 'green' | 'orange' | 'pink' | 'gray' | 'blue'

export const variantStyles: Record<BentoVariant, {
  border: string
  shadow: string
  accent: string
  gradient: string
}> = {
  purple: {
    border: 'border-purple-500/30',
    shadow: 'shadow-purple-500/20',
    accent: 'text-purple-400',
    gradient: 'from-purple-500/10 to-transparent'
  },
  green: {
    border: 'border-emerald-500/30',
    shadow: 'shadow-emerald-500/20',
    accent: 'text-emerald-400',
    gradient: 'from-emerald-500/10 to-transparent'
  },
  orange: {
    border: 'border-orange-500/30',
    shadow: 'shadow-orange-500/20',
    accent: 'text-orange-400',
    gradient: 'from-orange-500/10 to-transparent'
  },
  pink: {
    border: 'border-pink-500/30',
    shadow: 'shadow-pink-500/20',
    accent: 'text-pink-400',
    gradient: 'from-pink-500/10 to-transparent'
  },
  gray: {
    border: 'border-gray-500/30',
    shadow: 'shadow-gray-500/20',
    accent: 'text-gray-400',
    gradient: 'from-gray-500/10 to-transparent'
  },
  blue: {
    border: 'border-blue-500/30',
    shadow: 'shadow-blue-500/20',
    accent: 'text-blue-400',
    gradient: 'from-blue-500/10 to-transparent'
  }
}

/**
 * Tipos de filtro disponibles
 */
export type PlaygroundType = 'all' | 'motion' | 'generative' | 'airenders' | 'interactive'

/**
 * Interface para cada item del Bento Grid
 */
export interface BentoItem {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  type: PlaygroundType
  variant: BentoVariant
  href?: string
}

/**
 * Opciones de filtro para el Playground
 */
export const playgroundFilters = [
  { label: "Todo", value: "all" as PlaygroundType },
  { label: "Motion", value: "motion" as PlaygroundType },
  { label: "Generativo", value: "generative" as PlaygroundType },
  { label: "IA Renders", value: "airenders" as PlaygroundType },
  { label: "Interactivo", value: "interactive" as PlaygroundType },
]

/**
 * Helper para generar placeholders de imagen con gradientes
 */
const getPlaceholderImage = (color: string) => {
  return `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600'><defs><linearGradient id='grad' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' style='stop-color:%23${color};stop-opacity:0.3'/><stop offset='100%' style='stop-color:%230d0d0d;stop-opacity:1'/></linearGradient></defs><rect width='100%' height='100%' fill='%230d0d0d'/><rect width='100%' height='100%' fill='url(%23grad)'/></svg>`
}

/**
 * Items del Bento Grid - Grid uniforme, todas las cards cuadradas
 */
export const playgroundItems: BentoItem[] = [
  {
    id: 1,
    title: "Fluid Simulation",
    description: "Simulación de fluidos interactiva con WebGL. Experimenta con física de partículas en tiempo real.",
    image: getPlaceholderImage("a855f7"),
    tags: ["WebGL", "GLSL", "Physics"],
    type: "generative",
    variant: "purple",
    href: "#"
  },
  {
    id: 2,
    title: "Kinetic Typography",
    description: "Animaciones tipográficas reactivas al audio con Motion.",
    image: getPlaceholderImage("10b981"),
    tags: ["Motion", "Typography"],
    type: "motion",
    variant: "green",
    href: "#"
  },
  {
    id: 3,
    title: "AI Portrait Generator",
    description: "Generador de retratos con Stable Diffusion y estilos custom.",
    image: getPlaceholderImage("ec4899"),
    tags: ["AI", "Stable Diffusion"],
    type: "airenders",
    variant: "pink",
    href: "#"
  },
  {
    id: 4,
    title: "Particle System",
    description: "Sistema de partículas GPU-accelerated con Three.js.",
    image: getPlaceholderImage("f97316"),
    tags: ["Three.js", "GPGPU"],
    type: "generative",
    variant: "orange",
    href: "#"
  },
  {
    id: 5,
    title: "Shader Gallery",
    description: "Colección de shaders experimentales y efectos visuales.",
    image: getPlaceholderImage("6b7280"),
    tags: ["GLSL", "Fragment Shaders"],
    type: "generative",
    variant: "gray",
    href: "#"
  },
  {
    id: 6,
    title: "Interactive Canvas",
    description: "Lienzo interactivo donde tu mouse genera arte generativo único.",
    image: getPlaceholderImage("a855f7"),
    tags: ["Canvas", "Generative Art"],
    type: "interactive",
    variant: "purple",
    href: "#"
  },
  {
    id: 7,
    title: "3D Scene Builder",
    description: "Constructor de escenas 3D interactivo con Three.js y controles intuitivos.",
    image: getPlaceholderImage("3b82f6"),
    tags: ["Three.js", "3D", "WebGL"],
    type: "interactive",
    variant: "blue",
    href: "#"
  }
]