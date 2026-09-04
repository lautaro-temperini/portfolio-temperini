// ============================================================================
// PROJECT DATA - Awwwards Style
// ============================================================================

export interface ProjectData {
  id: number
  slug: string
  image: string // Logo del proyecto
  previewImage: string // Imagen grande para preview
  previewObjectFit?: "cover" | "contain" // Controla cómo se muestra la preview (default: cover)
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
    previewImage: "/images/projects/digito-preview.webp",
    title: "Dígito",
    subtitle: "Módulo Operativo",
    description: "Case Study",
    shortDescription: "Diseñé el módulo de time tracking que transformó la resistencia en adopción. De herramienta de control a aliado de productividad.",
    tags: ["Time Tracking UX", "B2B SaaS", "MVP Validation", "Workflow Integration", "User Adoption Strategy"],
    featured: true,
  },
  {
    id: 6,
    slug: "estoyai",
    image: "/images/estoyai-logo.webp",
    previewImage: "/images/projects/estoyai-preview.webp",
    previewObjectFit: "cover",
    title: "EstoyAi",
    subtitle: "Registro de campo por voz",
    description: "Case Study",
    shortDescription: "Sistema offline-first para ONGs: el promotor dicta la visita, la IA local genera el informe y coordinación lo ve priorizado por criticidad. Halketon 2026.",
    tags: ["Offline-First PWA", "Local AI (Whisper + Ollama)", "Social Impact", "Voice-to-Report", "Multi-Tenant", "Data Sovereignty"],
  },
  {
    id: 2,
    slug: "manijapp",
    image: "/images/manijapp-logo.webp",
    previewImage: "/images/projects/manijapp-preview.webp",
    title: "Manijapp",
    subtitle: "MVP Validation",
    description: "Case Study",
    shortDescription: "MVP independiente para discovery de eventos alternativos. Tres ciclos de validación en producción, validación comunitaria visible y geolocalización.",
    tags: ["Product Strategy", "MVP Validation", "Problem Discovery", "Community Validation", "Spec-Driven Development"],
  },
  {
    id: 3,
    slug: "gloryfit",
    image: "/images/gloryfit-logo.webp",
    previewImage: "/images/projects/gloryfit-preview.webp",
    title: "Glory Fit",
    subtitle: "App Redesign",
    description: "Mobile App Redesign",
    shortDescription: "Rediseño completo de la experiencia móvil para wearables. Biométricas claras, onboarding progresivo, personalización real.",
    tags: ["Wearable UX", "Biometric Data Design", "Android Material Design", "Progressive Onboarding", "Health App Personalization"],
  },
  {
    id: 4,
    slug: "levelup",
    image: "/images/levelup-logo.webp",
    previewImage: "/images/projects/levelup-preview.webp",
    title: "Level Up",
    subtitle: "Web & Content Redesign",
    description: "Editorial Redesign",
    shortDescription: "Portal editorial gamer con personalización por región y preferencias. México ≠ Argentina en gaming.",
    tags: ["Editorial Redesign", "Geosegmentation UX", "Content Curation System", "Regional Personalization", "Gaming Media Design"],
  },
  {
    id: 5,
    slug: "vorterix",
    image: "/images/vorterix-logo.webp",
    previewImage: "/images/projects/vorterix-preview.webp",
    title: "Vorterix",
    subtitle: "Landing Page",
    description: "Conversion Landing Page",
    shortDescription: "Landing de conversión para Paren la Mano. Criterio sobre data, tono sobre templates.",
    tags: ["Conversion Landing Page", "FOMO Design Strategy", "HTML/CSS/JS", "Audience-Specific Design", "Performance-Optimized"],
  },
]

// Helper para obtener proyecto destacado
export const getFeaturedProject = () => projectsData.find(p => p.featured)

// Helper para obtener proyectos no destacados
export const getRegularProjects = () => projectsData.filter(p => !p.featured)
