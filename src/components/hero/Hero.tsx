// ============================================================================
// IMPORTS - Importaciones de librerías y componentes
// ============================================================================

import { getDictionary } from '@/lib/getDictionary'
import HeroContent from './HeroContent'
import ThreadsWrapper from '../ThreadsWrapper'

// ============================================================================
// TIPOS E INTERFACES
// ============================================================================

/**
 * Props del componente Hero
 * 
 * @property lang - Código de idioma ('es' para español, 'en' para inglés)
 *                  Se usa para obtener las traducciones correspondientes
 */
interface HeroProps {
  lang: 'es' | 'en'
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

/**
 * Hero - Sección principal de bienvenida de la página
 * 
 * Este es un Server Component que:
 * 1. Obtiene las traducciones usando getDictionary()
 * 2. Renderiza el fondo animado con hilos (Threads)
 * 3. Pasa las traducciones al componente cliente HeroContent
 * 
 * El fondo de hilos tiene dos versiones:
 * - Desktop: Más amplitud y distancia, con interacción del mouse
 * - Móvil: Menos amplitud y distancia, sin interacción del mouse (mejor rendimiento)
 * 
 * @param lang - Código del idioma actual ('es' o 'en')
 * @returns Componente JSX de la sección hero
 */
export default async function Hero({ lang }: HeroProps) {
  // Obtener diccionario de traducciones para el idioma especificado
  const dictionary = await getDictionary(lang)

  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      
      {/* ==================== EFECTO DE FONDO - DESKTOP ==================== */}
      {/* 
        Threads es un componente WebGL que dibuja líneas animadas
        - color: Color de las líneas en formato RGB normalizado (0-1)
        - amplitude: Qué tan alto se mueven las líneas
        - distance: Separación entre las líneas
        - enableMouseInteraction: Si el mouse afecta el movimiento
      */}
      <div className="absolute pointer-events-none hidden md:block left-0 right-0 bottom-0 h-1/2 w-full">
        <div className="absolute inset-0 w-full h-full">
          <ThreadsWrapper 
            color={[0.4, 0.4, 0.45]} 
            amplitude={0.8} 
            distance={0.1} 
            enableMouseInteraction={true}
          />
        </div>
      </div>

      {/* ==================== EFECTO DE FONDO - MÓVIL ==================== */}
      {/* 
        Versión simplificada para móviles:
        - Menos amplitud y distancia para mejor rendimiento
        - Sin interacción del mouse (táctil no funciona igual)
        - Opacidad reducida para no distraer
      */}
      <div className="absolute pointer-events-none md:hidden left-0 right-0 bottom-0 h-1/2 w-full opacity-20">
        <div className="absolute inset-0 w-full h-full">
          <ThreadsWrapper 
            color={[0.4, 0.4, 0.45]} 
            amplitude={0.6} 
            distance={0.05} 
            enableMouseInteraction={false}
          />
        </div>
      </div>

      {/* ==================== CONTENIDO DEL HERO ==================== */}
      {/* Pasar el diccionario de traducciones al componente cliente */}
      <HeroContent dict={dictionary} />
    </section>
  )
}
