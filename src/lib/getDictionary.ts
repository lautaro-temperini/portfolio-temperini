// ============================================================================
// IMPORTS
// ============================================================================

/**
 * 'server-only' es un paquete especial de Next.js que asegura que este módulo
 * solo se ejecute en el servidor. Si se intenta importar en el cliente,
 * lanzará un error en tiempo de build.
 */
import 'server-only'
import { cache } from 'react'
import type { Dictionary } from './dictionary-types'

// ============================================================================
// TIPOS
// ============================================================================

/**
 * Re-exportar el tipo Dictionary desde el archivo de tipos
 * para mantener compatibilidad con imports existentes
 */
export type { Dictionary }

// ============================================================================
// CACHE EN MEMORIA
// ============================================================================

/**
 * dictionaryCache - Cache en memoria para diccionarios cargados
 * 
 * Este Map almacena las Promises de los diccionarios ya cargados.
 * Se mantiene durante todo el ciclo de vida del proceso Node.js,
 * lo que significa que:
 * - En desarrollo: Se resetea cada vez que el servidor se reinicia
 * - En producción: Persiste mientras la instancia del servidor esté activa
 * 
 * Beneficio: Evita cargar el mismo archivo JSON múltiples veces
 */
const dictionaryCache = new Map<'es' | 'en', Promise<Dictionary>>()

// ============================================================================
// DICCIONARIOS DISPONIBLES
// ============================================================================

/**
 * dictionaries - Objeto con las funciones para cargar cada diccionario
 * 
 * Cada propiedad es una función que retorna una Promise del diccionario.
 * Usar import() dinámico permite que Next.js haga "tree-shaking" correctamente,
 * es decir, solo incluir en el bundle el diccionario que realmente se usa.
 */
const dictionaries = {
  es: () => import('../../dictionaries/es.json').then((module) => module.default as Dictionary),
  en: () => import('../../dictionaries/en.json').then((module) => module.default as Dictionary),
}

// ============================================================================
// FUNCIÓN DE CARGA CON CACHE
// ============================================================================

/**
 * loadDictionary - Carga un diccionario con cache en memoria
 * 
 * Esta función implementa el patrón de cache "lazy loading":
 * 1. Primero verifica si el diccionario ya está en cache
 * 2. Si está, retorna la Promise cacheada
 * 3. Si no está, carga el diccionario y lo guarda en cache
 * 
 * @param lang - Código de idioma a cargar ('es' o 'en')
 * @returns Promise que resuelve al diccionario de traducciones
 */
function loadDictionary(lang: 'es' | 'en'): Promise<Dictionary> {
  // Verificar si ya está en cache
  if (dictionaryCache.has(lang)) {
    return dictionaryCache.get(lang)!
  }

  // Cargar el diccionario y guardarlo en cache
  const dictionaryPromise = dictionaries[lang]()
  dictionaryCache.set(lang, dictionaryPromise)
  
  return dictionaryPromise
}

// ============================================================================
// FUNCIÓN PRINCIPAL EXPORTADA
// ============================================================================

/**
 * getDictionary - Obtiene el diccionario de traducciones para un idioma
 * 
 * Esta es la función principal que se debe usar en los componentes.
 * Combina dos niveles de cache para máxima eficiencia:
 * 
 * 1. React.cache() - "Request Memoization"
 *    Cachea el resultado durante una misma request del servidor.
 *    Si varios componentes llaman a getDictionary('es') en la misma request,
 *    solo se ejecuta una vez.
 * 
 * 2. dictionaryCache (Map) - Cache en memoria
 *    Cachea entre diferentes requests mientras el proceso Node.js esté vivo.
 * 
 * También incluye manejo de errores con fallback a español.
 * 
 * @param lang - Código de idioma ('es' o 'en')
 * @returns Promise que resuelve al diccionario de traducciones
 * 
 * @example
 * // En un Server Component:
 * const dict = await getDictionary('es')
 * console.log(dict.hero.title) // "Pensar distinto,\ncrear con intención."
 * 
 * @example
 * // Pasando a un Client Component:
 * <HeroContent dict={dict} />
 */
export const getDictionary = cache(async (lang: 'es' | 'en'): Promise<Dictionary> => {
  try {
    // Intentar cargar el diccionario del idioma solicitado
    return await loadDictionary(lang)
  } catch (error) {
    // Si falla, intentar usar español como fallback
    console.warn(
      `No se pudo cargar el diccionario para '${lang}', usando 'es' como fallback.`, 
      error
    )
    
    try {
      // Cargar el diccionario en español como fallback
      return await loadDictionary('es')
    } catch (fallbackError) {
      // Si incluso el fallback falla, lanzar error
      throw new Error(
        `No se pudo cargar ningún diccionario. Error original: ${error}. Error de fallback: ${fallbackError}`
      )
    }
  }
})

// ============================================================================
// FUNCIÓN DE PRECARGA
// ============================================================================

/**
 * preloadDictionary - Precarga un diccionario en background
 * 
 * Esta función es útil para precargar el idioma alternativo mientras
 * el usuario navega por el sitio. Por ejemplo, si el usuario está en
 * la versión en español, podemos precargar el diccionario en inglés
 * en background para que el cambio de idioma sea instantáneo.
 * 
 * Se llama desde el layout raíz para precargar ambos idiomas al inicio.
 * 
 * @param lang - Código de idioma a precargar ('es' o 'en')
 * 
 * @example
 * // En el layout raíz:
 * preloadDictionary('es')
 * preloadDictionary('en')
 */
export function preloadDictionary(lang: 'es' | 'en'): void {
  // Cargar en background sin esperar el resultado
  // Los errores se loguean pero no se propagan
  loadDictionary(lang).catch((error) => {
    console.warn(`Error al precargar diccionario '${lang}':`, error)
  })
}

