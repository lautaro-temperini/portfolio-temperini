import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

export interface CardGridProps {
  children: ReactNode
  cols?: {
    default?: 1 | 2 | 3
    md?: 1 | 2 | 3
    lg?: 1 | 2 | 3 | 4
  }
  gap?: "sm" | "md" | "lg"
  className?: string
}

const colsDefaultClasses: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
}

const colsMdClasses: Record<number, string> = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
}

const colsLgClasses: Record<number, string> = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
}

const gapClasses: Record<string, string> = {
  sm: "gap-2 md:gap-3",
  md: "gap-3 md:gap-4",
  lg: "gap-4 md:gap-5",
}

// CardGrid: Grid uniforme para tarjetas del mismo tamaño
export function CardGrid({ children, cols = { default: 1, md: 2, lg: 3 }, gap = "md", className }: CardGridProps) {
  return (
    <div
      className={cn(
        "grid",
        cols.default && colsDefaultClasses[cols.default],
        cols.md && colsMdClasses[cols.md],
        cols.lg && colsLgClasses[cols.lg],
        gapClasses[gap],
        className,
      )}
    >
      {children}
    </div>
  )
}
