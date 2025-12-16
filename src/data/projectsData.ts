// ============================================================================
// PROJECT DATA - Awwwards Style
// ============================================================================

export interface ProjectData {
  id: number
  slug: string
  image: string // Logo del proyecto
  previewImage: string // Imagen grande para preview
  title: string
  subtitle: string
  description: string
  shortDescription: string // Descripción corta para hover
  tags: string[]
  featured?: boolean // Proyecto destacado (full-width)
}

export const projectsData: ProjectData[] = [
  {
    id: 1,
    slug: "digito",
    image: "/images/digito-logo.webp",
    previewImage: "/images/projects/digito-preview.jpg",
    title: "Dígito",
    subtitle: "Módulo Operativo",
    description: "Case Study",
    shortDescription: "Diseñé el módulo de time tracking que transformó la resistencia en adopción. De herramienta de control a aliado de productividad.",
    tags: ["Time Tracking UX", "B2B SaaS", "MVP Validation", "Workflow Integration", "User Adoption Strategy"],
    featured: true,
  },
  {
    id: 2,
    slug: "gloryfit",
    image: "/images/gloryfit-logo.png",
    previewImage: "/images/projects/gloryfit-preview.jpg",
    title: "Glory Fit",
    subtitle: "App Redesign",
    description: "Mobile App Redesign",
    shortDescription: "Rediseño completo de la experiencia móvil para wearables. Biométricas claras, onboarding progresivo, personalización real.",
    tags: ["Wearable UX", "Biometric Data Design", "Android Material Design", "Progressive Onboarding", "Health App Personalization"],
  },
  {
    id: 3,
    slug: "levelup",
    image: "/images/levelup-logo.png",
    previewImage: "/images/projects/levelup-preview.jpg",
    title: "Level Up",
    subtitle: "Web & Content Redesign",
    description: "Editorial Redesign",
    shortDescription: "Portal editorial gamer con personalización por región y preferencias. México ≠ Argentina en gaming.",
    tags: ["Editorial Redesign", "Geosegmentation UX", "Content Curation System", "Regional Personalization", "Gaming Media Design"],
  },
  {
    id: 4,
    slug: "vorterix",
    image: "/images/vorterix-logo.png",
    previewImage: "/images/projects/vorterix-preview.jpg",
    title: "Vorterix",
    subtitle: "Landing Page",
    description: "Conversion Landing Page",
    shortDescription: "Landing de conversión para Paren la Mano. Criterio sobre data, tono sobre templates.",
    tags: ["Conversion Landing Page", "FOMO Design Strategy", "HTML/CSS/JS", "Audience-Specific Design", "Performance-Optimized"],
  },
  {
    id: 5,
    slug: "rectofinal",
    image: "/images/rectofinal-logo.png",
    previewImage: "/images/projects/rectofinal-preview.jpg",
    title: "Recto Final",
    subtitle: "Videojuego físico-digital",
    description: "Physical-Digital Installation",
    shortDescription: "Instalación física-digital que sobrevivió 3+ horas de público sin colapsar. Unity + hardware hackeado.",
    tags: ["Unity 2D + C#", "Physical Computing", "Interactive Installation", "Hardware Integration", "Real-Time Adaptation"],
  },
]

// Helper para obtener proyecto destacado
export const getFeaturedProject = () => projectsData.find(p => p.featured)

// Helper para obtener proyectos no destacados
export const getRegularProjects = () => projectsData.filter(p => !p.featured)
