import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * cn - Utility function para combinar clases de Tailwind
 * 
 * Combina clsx (para condicionales) con tailwind-merge (para resolver conflictos)
 * 
 * @example
 * cn('px-4 py-2', isActive && 'bg-blue-500', 'px-6') 
 * // Result: 'py-2 px-6 bg-blue-500' (px-6 wins over px-4)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

