# Ejemplos de Uso de getDictionary en Server Components

Esta guía muestra cómo usar `getDictionary` en Server Components para traducir contenido.

## 📋 Índice

1. [Hero Component](#1-hero-component)
2. [ProjectCard Component](#2-projectcard-component)
3. [About Component](#3-about-component)
4. [Página Principal](#4-página-principal)

---

## 1. Hero Component

### Ejemplo: Hero como Server Component

```typescript
import { getDictionary, type Dictionary } from '@/lib/getDictionary'
import RevealOnScroll from "../fxscripts/reveal-on-scroll"
import Threads from "../Threads"
import HeroContent from './HeroContent'

/**
 * Props del componente Hero
 */
interface HeroProps {
  lang: 'es' | 'en'
}

/**
 * Componente Hero - Server Component
 * Obtiene las traducciones usando getDictionary y las pasa al componente cliente
 */
export default async function Hero({ lang }: HeroProps) {
  // Obtener diccionario de traducciones para el idioma especificado
  const dict = await getDictionary(lang)

  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      {/* Background Effect - Static */}
      <div className="absolute pointer-events-none hidden md:block left-0 right-0 bottom-0 h-1/2 w-full">
        <div className="absolute inset-0 w-full h-full">
          <Threads 
            color={[0.4, 0.4, 0.45]} 
            amplitude={0.8} 
            distance={0.1} 
            enableMouseInteraction={true}
          />
        </div>
      </div>

      {/* Mobile Background Effect - Static */}
      <div className="absolute pointer-events-none md:hidden left-0 right-0 bottom-0 h-1/2 w-full opacity-20">
        <div className="absolute inset-0 w-full h-full">
          <Threads 
            color={[0.4, 0.4, 0.45]} 
            amplitude={0.6} 
            distance={0.05} 
            enableMouseInteraction={false}
          />
        </div>
      </div>

      {/* Pasar el diccionario al componente cliente */}
      <HeroContent dict={dict} />
    </section>
  )
}
```

### HeroContent como Client Component

```typescript
'use client'

import Link from "next/link"
import RevealOnScroll from "../fxscripts/reveal-on-scroll"
import type { Dictionary } from '@/lib/getDictionary'

/**
 * Props del componente HeroContent
 */
interface HeroContentProps {
  dict: Dictionary
}

/**
 * Componente HeroContent - Client Component
 * Recibe el diccionario como prop desde el Server Component padre
 */
export default function HeroContent({ dict }: HeroContentProps) {
  // Dividir el título en líneas si contiene \n
  const titleLines = dict.hero.title.split('\n')

  function smoothScrollToElement(element: HTMLElement, duration = 300) {
    const start = window.scrollY
    const end = element.getBoundingClientRect().top + window.scrollY
    const change = end - start
    const startTime = performance.now()

    function animateScroll(currentTime: number) {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      window.scrollTo(0, start + change * easeInOutCubic(progress))
      if (progress < 1) {
        requestAnimationFrame(animateScroll)
      }
    }

    function easeInOutCubic(t: number) {
      return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2
    }

    requestAnimationFrame(animateScroll)
  }

  return (
    <div className="w-full h-full flex flex-col items-start justify-center pt-32 md:pt-40 lg:pt-48 px-4 md:px-6 lg:px-10">
      {/* Main Heading */}
      <RevealOnScroll>
        <div className="mb-4 md:mb-6">
          <h1
            className="fluid-text-3xl md:fluid-text-4xl lg:fluid-text-5xl font-semibold leading-tight text-light max-w-full md:max-w-md lg:max-w-lg xl:max-w-[605px]"
            style={{ fontFamily: "var(--font-neue-haas)" }}
          >
            {titleLines.map((line, index) => (
              <React.Fragment key={index}>
                {line}
                {index < titleLines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </h1>
        </div>
      </RevealOnScroll>

      {/* Subtitle */}
      <RevealOnScroll delay={100}>
        <div className="mb-6 md:mb-8">
          <p
            className="fluid-text-base md:fluid-text-lg font-semibold leading-relaxed text-accent max-w-full md:max-w-md lg:max-w-lg xl:max-w-[500px]"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            {dict.hero.subtitle}
          </p>
        </div>
      </RevealOnScroll>

      {/* CTA Button */}
      <RevealOnScroll delay={200}>
        <Link
          href="/#projects"
          className="flex items-center justify-center w-full max-w-xs md:w-auto md:max-w-none md:min-w-[257px] h-10 md:h-[40px] bg-gradient-to-r from-[#F2F2F2] via-[#F2F2F2] to-[#9D00E0] rounded-full px-6 shadow-[0px_4px_25px_rgba(115,0,165,0.25)] transition-all duration-200 hover:shadow-[0px_6px_30px_rgba(115,0,165,0.4)] btn-primary group cursor-pointer"
          onClick={e => {
            e.preventDefault()
            const section = document.getElementById("projects")
            if (section) {
              smoothScrollToElement(section, 300)
            } else {
              window.location.hash = '#projects'
            }
          }}
        >
          <span
            className="fluid-text-sm font-semibold text-background group-hover:text-background transition-colors"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {dict.hero.cta}
          </span>
        </Link>
      </RevealOnScroll>
    </div>
  )
}
```

---

## 2. ProjectCard Component

### Ejemplo: ProjectCard recibiendo diccionario como prop

```typescript
import Link from "next/link"
import OptimizedImage from "../optimized-image"
import GlareHover from '../fxscripts/GlareHover'
import type { Dictionary } from '@/lib/getDictionary'

/**
 * Props del componente ProjectCard
 */
interface ProjectCardProps {
  image: string
  slug: string
  className?: string
  dict: Dictionary
}

/**
 * Componente ProjectCard - Server Component
 * Recibe el diccionario como prop y obtiene los datos del proyecto desde el diccionario
 */
export default function ProjectCard({
  image,
  slug,
  className = "",
  dict,
}: ProjectCardProps) {
  // Obtener los datos del proyecto desde el diccionario usando el slug
  const projectData = dict.projects.items[slug as keyof typeof dict.projects.items]
  
  // Si no existe el proyecto en el diccionario, usar valores por defecto
  if (!projectData) {
    console.warn(`Proyecto '${slug}' no encontrado en el diccionario`)
    return null
  }

  // Extraer tags del objeto de tags del diccionario
  const tags = Object.values(projectData.tags)

  return (
    <div className={`w-full ${className}`}>
      <Link href={`/${slug}`} className="block relative w-full group cursor-pointer">
        <GlareHover
          className="group bg-[#0D0D0D] border border-[#9C96A4] rounded-2xl transition-all duration-300 hover:border-[#8900C3] hover:shadow-[0px_8px_35px_rgba(115,0,165,0.18)] hover:scale-[1.005] cursor-pointer"
          glareColor="#f2f2f2"
          glareOpacity={0.07}
          glareAngle={-30}
          glareSize={200}
          transitionDuration={700}
          playOnce={true}
          style={{ borderRadius: '1rem', boxShadow: undefined }}
        >
          <div className="p-6">
            {/* Mobile Layout */}
            <div className="flex flex-row items-center md:hidden gap-4">
              {/* Project Image */}
              <div className="w-16 h-16 flex-shrink-0 drop-shadow-xs" style={{ filter: 'drop-shadow(0px 4px 12px rgba(115,0,165,0.10))' }}>
                <OptimizedImage src={image} alt={projectData.title} className="w-full h-full rounded-full object-cover" />
              </div>

              {/* Project Info */}
              <div className="flex-1 text-left">
                <h3
                  className="fluid-text-xl font-semibold leading-tight text-[#F2F2F2] mb-1 transition-shadow group-hover:shadow-lg"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {projectData.title}
                </h3>
                <p
                  className="fluid-text-lg font-normal leading-tight mb-1"
                  style={{ fontFamily: "var(--font-inter)", color: '#A6A6A6' }}
                >
                  {projectData.subtitle}
                </p>
                <p
                  className="fluid-text-base font-normal"
                  style={{ fontFamily: "var(--font-inter)", color: '#595959' }}
                >
                  {projectData.description}
                </p>
              </div>
              {/* Arrow for mobile */}
              <div className="flex items-center justify-center w-10 h-10 flex-shrink-0 ml-2">
                <span
                  className="fluid-text-2xl font-bold leading-none text-center transition-transform duration-200 group-hover:translate-x-0.5"
                  style={{
                    fontFamily: "var(--font-manrope)",
                    fontWeight: "bold",
                    background: "linear-gradient(180deg, #f2f2f2 0%, #a6a6a6 88%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  🡆
                </span>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {/* Project Image */}
              <div className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 xl:w-48 xl:h-48 flex-shrink-0 mt-4">
                <OptimizedImage src={image} alt={projectData.title} className="w-full h-full rounded-full object-cover" />
              </div>

              {/* Project Info */}
              <div className="flex-1 min-w-0 mt-4">
                <h3
                  className="fluid-text-xl md:fluid-text-2xl lg:fluid-text-3xl font-semibold leading-tight text-[#F2F2F2] mb-2 md:mb-3 lg:mb-4 transition-shadow group-hover:shadow-lg"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {projectData.title}
                </h3>
                <p
                  className="fluid-text-lg md:fluid-text-xl font-normal leading-tight text-[#A6A6A6] mb-2 md:mb-3"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {projectData.subtitle}
                </p>
                <p
                  className="fluid-text-base md:fluid-text-lg font-normal text-[#A6A6A6] mb-3 md:mb-4"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {projectData.description}
                </p>

                {/* Tags */}
                <div className="flex gap-2 lg:gap-3 xl:gap-4">
                  {tags.slice(0, 3).map((tag, index) => (
                    <div
                      key={index}
                      className="hidden sm:flex lg:hidden items-center justify-center px-3 py-1 md:px-4 md:py-2 border border-[#595959] rounded-full flex-shrink-0"
                    >
                      <span
                        className="fluid-text-xs md:fluid-text-sm font-semibold whitespace-nowrap transition-colors"
                        style={{ fontFamily: "var(--font-inter)", color: '#595959' }}
                      >
                        {tag}
                      </span>
                    </div>
                  ))}
                  {tags.slice(0, 4).map((tag, index) => (
                    <div
                      key={index}
                      className="hidden lg:flex xl:hidden items-center justify-center px-3 py-1 lg:px-4 lg:py-2 border border-[#595959] rounded-full flex-shrink-0"
                    >
                      <span
                        className="fluid-text-xs md:fluid-text-sm font-semibold whitespace-nowrap transition-colors"
                        style={{ fontFamily: "var(--font-inter)", color: '#595959' }}
                      >
                        {tag}
                      </span>
                    </div>
                  ))}
                  {tags.slice(0, 5).map((tag, index) => (
                    <div
                      key={index}
                      className="hidden xl:flex items-center justify-center px-3 py-1 xl:px-4 xl:py-2 border border-[#595959] rounded-full flex-shrink-0"
                    >
                      <span
                        className="fluid-text-xs md:fluid-text-sm font-semibold whitespace-nowrap transition-colors"
                        style={{ fontFamily: "var(--font-inter)", color: '#595959' }}
                      >
                        {tag}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Arrow */}
              <div className="flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 xl:w-[136px] xl:h-[118px] flex-shrink-0">
                <span
                  className="fluid-text-4xl lg:fluid-text-5xl font-bold leading-none text-center transition-transform duration-200 group-hover:translate-x-0.5"
                  style={{
                    fontFamily: "var(--font-manrope)",
                    fontWeight: "bold",
                    background: "linear-gradient(180deg, #f2f2f2 0%, #a6a6a6 88%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  🡆
                </span>
              </div>
            </div>
          </div>
        </GlareHover>
      </Link>
    </div>
  )
}
```

### Uso en SeccionProjects (padre)

```typescript
import { getDictionary } from '@/lib/getDictionary'
import ProjectCard from "./Project-card"
import { projectsData } from "@/data/projectsData"

/**
 * Props del componente Projects
 */
interface ProjectsProps {
  lang: 'es' | 'en'
}

/**
 * Componente Projects - Server Component
 * Obtiene el diccionario y lo pasa a cada ProjectCard
 */
export default async function Projects({ lang }: ProjectsProps) {
  // Obtener diccionario de traducciones
  const dict = await getDictionary(lang)

  return (
    <section
      id="projects"
      className="relative w-full overflow-hidden py-16"
    >
      {/* Header - Static */}
      <div className="w-full flex flex-col items-start text-left mb-8 md:mb-12 lg:mb-16 px-4 md:px-6 lg:px-10">
        <div className="space-y-2">
          <h2
            className="fluid-text-3xl md:fluid-text-4xl lg:fluid-text-5xl font-semibold leading-tight text-light mb-4 md:mb-6"
            style={{ fontFamily: "var(--font-neue-haas)" }}
          >
            {dict.projects.title}
          </h2>
          <p
            className="fluid-text-base md:fluid-text-lg font-semibold leading-relaxed text-accent max-w-full md:max-w-2xl lg:max-w-3xl xl:max-w-[778px]"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            {dict.projects.description}
          </p>
        </div>
      </div>

      {/* Projects Container */}
      <div className="w-full">
        <div className="flex flex-col gap-2 md:gap-4 lg:gap-6 px-4 md:px-6 lg:px-10">
          {projectsData.map((project) => (
            <ProjectCard
              key={project.id}
              image={project.image}
              slug={project.slug}
              dict={dict}
              className="w-full"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
```

---

## 3. About Component

### Ejemplo: About como Server Component

```typescript
import { getDictionary } from '@/lib/getDictionary'
import TiltedCard from "./TiltedCard"
import RevealOnScroll from "../fxscripts/reveal-on-scroll"

/**
 * Props del componente About
 */
interface AboutProps {
  lang: 'es' | 'en'
}

/**
 * Componente About - Server Component
 * Obtiene las traducciones directamente usando getDictionary
 */
export default async function About({ lang }: AboutProps) {
  // Obtener diccionario de traducciones para el idioma especificado
  const dict = await getDictionary(lang)

  return (
    <section
      id="about"
      className="relative w-full min-h-screen flex items-center"
      style={{
        background:
          "conic-gradient(from 203.7deg at 53.78% 39.65%, #0D0D0D 0deg, #0D0D0D 114.23deg, #666973 238.85deg, #0D0D0D 360deg)",
      }}
    >
      <div className="w-full h-full flex flex-col justify-center mb-24 px-4 md:px-6 lg:px-10">
        {/* ABOUT Title */}
        <RevealOnScroll className="about-slide-in">
          <div className="mb-0 mt-6">
            <h2
              className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[160px] 2xl:text-[200px] font-semibold leading-tight text-[#A6A6A6]"
              style={{ 
                fontFamily: "var(--font-neue-haas)",
                filter: "contrast(1.1) brightness(1.05)",
                mixBlendMode: "lighten"
              }}
            >
              {dict.about.title}
            </h2>
          </div>
        </RevealOnScroll>

        {/* Content Container */}
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 lg:gap-12 xl:gap-16 flex-1">
          {/* Left Content - Text */}
          <div className="flex-1 max-w-2xl lg:max-w-xl xl:max-w-2xl mt-0">
            <RevealOnScroll delay={100}>
              <p
                className="mt-0 text-base sm:text-lg md:text-xl xl:text-[24px] 2xl:text-[28px] font-semibold leading-relaxed xl:leading-[32px] 2xl:leading-[38px] text-[#F2F2F2]"
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                {dict.about.text1}
              </p>
              {/* Imagen entre párrafos solo en mobile */}
              <div className="block md:hidden w-full my-6 flex justify-center">
                <div className="w-full max-w-xs sm:max-w-sm">
                  <TiltedCard
                    imageSrc="/images/foto-lautaro.png"
                    altText="Lautaro R. Temperini - Diseñador Multimedia"
                    captionText=""
                    aspectRatio={1}
                    scaleOnHover={1.02}
                    rotateAmplitude={4}
                    showTooltip={false}
                  />
                </div>
              </div>
              <p
                className="text-base sm:text-lg md:text-xl xl:text-[24px] 2xl:text-[28px] font-semibold leading-relaxed xl:leading-[32px] 2xl:leading-[38px] text-[#F2F2F2] mt-4 text-right md:text-left"
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                {dict.about.text2}
              </p>
            </RevealOnScroll>
          </div>

          {/* Right Content - Imagen en md+ */}
          <div className="w-full md:w-1/2 xl:w-[45%] flex-shrink-0 flex justify-center md:justify-end -mt-24 hidden md:block">
            <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl">
              <TiltedCard
                imageSrc="/images/foto-lautaro.png"
                altText="Lautaro R. Temperini - Diseñador Multimedia"
                captionText=""
                aspectRatio={1}
                scaleOnHover={1.02}
                rotateAmplitude={4}
                showTooltip={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
```

---

## 4. Página Principal

### Ejemplo: Usando getDictionary en la página principal

```typescript
import { getDictionary } from '@/lib/getDictionary'
import Navbar from "@/components/1 Navbar/Navbar"
import Hero from "@/components/2 Hero/Hero"
import Projects from "@/components/3 Projects/SeccionProjects"
import About from "@/components/4 About/About"
import Footer from "@/components/5 Footer/Footer"

/**
 * Página principal localizada
 * @param params - Parámetros de la ruta, incluye lang (es | en)
 */
export default async function HomePage({
  params,
}: {
  params: { lang: string }
}) {
  // Validar y convertir el idioma a 'es' o 'en'
  const lang = (params.lang === 'es' || params.lang === 'en') ? params.lang : 'es'
  
  // Obtener diccionario de traducciones (opcional, si necesitas usarlo aquí)
  // const dict = await getDictionary(lang)

  return (
    <>
      <Navbar />
      <div className="page-transition">
        <main>
          {/* Pasar el idioma a cada componente */}
          <Hero lang={lang} />
          <Projects lang={lang} />
          <About lang={lang} />
        </main>
        <Footer />
      </div>
    </>
  )
}
```

---

## 📝 Notas Importantes

### 1. Server Components vs Client Components

- **Server Components**: Pueden usar `getDictionary` directamente con `await`
- **Client Components**: Deben recibir el diccionario como prop desde un Server Component padre

### 2. Manejo de Saltos de Línea

Si el texto contiene `\n`, divídelo así:

```typescript
const titleLines = dict.hero.title.split('\n')
return (
  <h1>
    {titleLines.map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < titleLines.length - 1 && <br />}
      </React.Fragment>
    ))}
  </h1>
)
```

### 3. Validación de Idioma

Siempre valida que el idioma sea válido:

```typescript
const lang = (params.lang === 'es' || params.lang === 'en') ? params.lang : 'es'
```

### 4. TypeScript y Autocompletado

Importa el tipo `Dictionary` para tener autocompletado:

```typescript
import { getDictionary, type Dictionary } from '@/lib/getDictionary'
```

### 5. Manejo de Errores

`getDictionary` tiene fallback automático a 'es', pero puedes manejar errores:

```typescript
try {
  const dict = await getDictionary(lang)
} catch (error) {
  console.error('Error cargando traducciones:', error)
  // Usar traducciones por defecto o mostrar error
}
```

---

## 🚀 Próximos Pasos

1. Convertir componentes a Server Components donde sea posible
2. Pasar `lang` desde `params.lang` en las páginas
3. Reemplazar textos hardcodeados con referencias al diccionario
4. Probar ambos idiomas navegando entre `/es/` y `/en/`

