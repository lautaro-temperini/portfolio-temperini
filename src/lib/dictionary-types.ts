// ============================================================================
// TIPOS DE DICCIONARIO
// ============================================================================

/**
 * Tipo Dictionary - Estructura del diccionario de traducciones
 * 
 * Este archivo contiene solo los tipos, sin lógica de servidor.
 * Puede ser importado tanto en Server Components como en Client Components.
 * 
 * Se infiere automáticamente del archivo JSON de traducciones en español.
 */
export type Dictionary = typeof import('../../dictionaries/es.json')

