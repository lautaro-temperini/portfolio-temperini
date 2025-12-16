\# Manual Portfolio – Referencia Rápida



\## 📁 Estructura

```

app/

&nbsp; \[lang]/          # Rutas localizadas (en, es)

&nbsp;   projects/      # Casos de estudio

&nbsp;   page.tsx       # Home

&nbsp; layout.tsx       # Layout raíz

components/

&nbsp; ui/              # Componentes base

&nbsp; features/        # Específicos del portfolio

lib/

&nbsp; utils.ts         # Funciones utilitarias

&nbsp; constants.ts     # Constantes del proyecto

public/            # Assets estáticos

```



\## ⚡ Reglas de Performance



\### Server vs Client Components

```tsx

// ✅ Server (por defecto)

export default function ProjectCard({ title, image }) {

&nbsp; return <div>...</div>

}



// ✅ Client (solo si necesario)

'use client'

export default function InteractiveButton() {

&nbsp; const \[clicked, setClicked] = useState(false)

&nbsp; return <button onClick={() => setClicked(true)}>...</button>

}

```



\### Imágenes

```tsx

// ✅ CORRECTO

<Image 

&nbsp; src="/project.jpg" 

&nbsp; alt="Dashboard mostrando análisis de usuarios"

&nbsp; width={1200} 

&nbsp; height={800}

&nbsp; priority={isHero}

/>



// ❌ INCORRECTO

<img src="/project.jpg" alt="imagen" />

```



\### Lazy Loading

```tsx

// ✅ Para componentes pesados

const Playground = dynamic(() => import('@/components/Playground'), {

&nbsp; loading: () => <PlaygroundSkeleton />,

&nbsp; ssr: false

})

```



\## 🌐 i18n Básico

```tsx

// app/\[lang]/page.tsx

export default function Home({ params }: { params: { lang: string } }) {

&nbsp; const t = translations\[params.lang]

&nbsp; return <h1>{t.hero.title}</h1>

}

```



\## 🎨 Accesibilidad

\- `alt` descriptivos (no "imagen", sino qué muestra)

\- Contraste 4.5:1 mínimo

\- Navegación por teclado funcional

\- `aria-label` en iconos sin texto



\## 🚀 Scripts

```bash

npm run dev      # Desarrollo local

npm run build    # Build de producción

npm run lint     # Revisar errores

npm run lint:fix # Fix automático

```



\## 🚫 NUNCA

\- `<img>` en vez de `<Image>`

\- `'use client'` sin razón

\- Importar librerías completas

\- Alt genéricos ("imagen", "foto")

```

