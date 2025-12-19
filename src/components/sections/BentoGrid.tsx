import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

export interface BentoItemProps {
  children: ReactNode
  colSpan?: 1 | 2 | { default?: 1 | 2; md?: 1 | 2; lg?: 1 | 2 }
  rowSpan?: 1 | 2
  className?: string
}

export interface BentoGridProps {
  children: ReactNode
  cols?: {
    default?: 1 | 2 | 3
    md?: 2 | 3
    lg?: 3 | 4
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
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
}

const colsLgClasses: Record<number, string> = {
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
}

const gapClasses: Record<string, string> = {
  sm: "gap-2 md:gap-3",
  md: "gap-3 md:gap-4",
  lg: "gap-4 md:gap-5",
}

const colSpanDefaultClasses: Record<number, string> = {
  1: "col-span-1",
  2: "col-span-2",
}

const colSpanMdClasses: Record<number, string> = {
  1: "md:col-span-1",
  2: "md:col-span-2",
}

const colSpanLgClasses: Record<number, string> = {
  1: "lg:col-span-1",
  2: "lg:col-span-2",
}

const rowSpanClasses: Record<number, string> = {
  1: "row-span-1",
  2: "row-span-1 md:row-span-2",
}

// BentoItem: Item individual con spans configurables
export function BentoItem({ children, colSpan = 1, rowSpan = 1, className }: BentoItemProps) {
  let colSpanClass = ""
  if (typeof colSpan === "number") {
    colSpanClass = colSpanDefaultClasses[colSpan] || ""
  } else {
    if (colSpan.default) colSpanClass += colSpanDefaultClasses[colSpan.default] + " "
    if (colSpan.md) colSpanClass += colSpanMdClasses[colSpan.md] + " "
    if (colSpan.lg) colSpanClass += colSpanLgClasses[colSpan.lg] + " "
  }
  return <div className={cn(colSpanClass, rowSpanClasses[rowSpan], className)}>{children}</div>
}

// BentoGrid: Grid estilo bento con items de tamaños variados
export function BentoGrid({ children, cols = { default: 1, md: 2, lg: 3 }, gap = "md", className }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid auto-rows-fr",
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
