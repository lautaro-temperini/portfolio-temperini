# Guía de Uso de Traducciones

## 📁 Estructura

```
dictionaries/
├── es.json    # Traducciones en español
└── en.json    # Traducciones en inglés

lib/
└── getDictionary.ts  # Función helper para obtener traducciones
```

## 🚀 Uso Básico

### En Server Components

```typescript
import { getDictionary } from '@/lib/getDictionary'

export default async function Page({
  params,
}: {
  params: { lang: string }
}) {
  const dict = await getDictionary(params.lang as 'es' | 'en')
  
  return (
    <div>
      <h1>{dict.hero.title}</h1>
      <p>{dict.hero.subtitle}</p>
      <button>{dict.hero.cta}</button>
    </div>
  )
}
```

### En Client Components

Para usar traducciones en componentes cliente, necesitas pasar el diccionario como prop desde un Server Component padre:

```typescript
// Server Component (padre)
import { getDictionary } from '@/lib/getDictionary'
import ClientComponent from './ClientComponent'

export default async function Page({
  params,
}: {
  params: { lang: string }
}) {
  const dict = await getDictionary(params.lang as 'es' | 'en')
  
  return <ClientComponent dict={dict} />
}

// Client Component (hijo)
'use client'

export default function ClientComponent({ dict }: { dict: any }) {
  return <button>{dict.hero.cta}</button>
}
```

## 📋 Estructura del Diccionario

### Hero
```json
{
  "hero": {
    "title": "Pensar distinto,\ncrear con intención.",
    "subtitle": "Transformo ideas en experiencias digitales reales.",
    "cta": "Explorá mis trabajos"
  }
}
```

### Navegación
```json
{
  "nav": {
    "projects": "Proyectos",
    "playground": "Playground",
    "connect": "Conectemos"
  }
}
```

### Proyectos
```json
{
  "projects": {
    "title": "De la idea a la acción",
    "description": "Proyectos donde construyo soluciones digitales robustas...",
    "items": {
      "digito": {
        "title": "Dígito",
        "subtitle": "Módulo Operativo",
        "description": "Case Study",
        "tags": { ... }
      }
    }
  }
}
```

### About
```json
{
  "about": {
    "title": "ABOUT",
    "text1": "Soy Lautaro R. Temperini...",
    "text2": "Me entusiasma jugar el juego..."
  }
}
```

### Contact
```json
{
  "contact": {
    "title": "Get in touch",
    "form": {
      "name": "Nombre",
      "email": "Email",
      "message": "Mensaje",
      "submit": "Enviar 🚀",
      "success": "Excelente, {name}! Mensaje enviado."
    }
  }
}
```

## 💡 Ejemplos de Uso

### Acceder a traducciones anidadas

```typescript
const dict = await getDictionary('es')

// Hero
dict.hero.title
dict.hero.subtitle
dict.hero.cta

// Navegación
dict.nav.projects
dict.nav.playground
dict.nav.connect

// Proyectos
dict.projects.title
dict.projects.description
dict.projects.items.digito.title
dict.projects.items.digito.subtitle
dict.projects.items.digito.tags.productDesign

// About
dict.about.title
dict.about.text1
dict.about.text2

// Contact
dict.contact.title
dict.contact.form.name
dict.contact.form.email
dict.contact.form.message
dict.contact.form.submit
dict.contact.form.success.replace('{name}', userName)

// CTAs
dict.cta.exploreProjects
dict.cta.connect
dict.cta.backToHome

// Construction
dict.construction.title
dict.construction.text
dict.construction.backToHome
```

### Reemplazar variables en strings

```typescript
// En el JSON: "success": "Excelente, {name}! Mensaje enviado."
const userName = "Lautaro"
const successMessage = dict.contact.form.success.replace('{name}', userName)
// Resultado: "Excelente, Lautaro! Mensaje enviado."
```

### Manejar saltos de línea

```typescript
// En el JSON: "title": "Pensar distinto,\ncrear con intención."
const title = dict.hero.title.split('\n').map((line, i) => (
  <React.Fragment key={i}>
    {line}
    {i < dict.hero.title.split('\n').length - 1 && <br />}
  </React.Fragment>
))
```

## 🔧 Próximos Pasos

1. **Actualizar componentes** para usar `getDictionary` y `params.lang`
2. **Reemplazar textos hardcodeados** con referencias al diccionario
3. **Probar ambos idiomas** navegando entre `/es/` y `/en/`
4. **Agregar más traducciones** según sea necesario

## 📝 Notas

- El diccionario se carga solo en Server Components por defecto (usando `'server-only'`)
- Para Client Components, pasar el diccionario como prop desde un Server Component padre
- Los tags de proyectos se mantienen en inglés (estándar de la industria)
- Los nombres propios (Dígito, Glory Fit, etc.) se mantienen iguales en ambos idiomas

