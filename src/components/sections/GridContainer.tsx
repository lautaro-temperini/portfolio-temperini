import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

export interface GridContainerProps {
  children: ReactNode
  cols?: {
    default?: number
    md?: number
    lg?: number
  }
  gap?: "sm" | "md" | "lg"
  className?: string
}

const colsClasses: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
}

const mdColsClasses: Record<number, string> = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
  5: "md:grid-cols-5",
  6: "md:grid-cols-6",
}

const lgColsClasses: Record<number, string> = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
  6: "lg:grid-cols-6",
}

const gapClasses: Record<string, string> = {
  sm: "gap-2 md:gap-3 lg:gap-4",
  md: "gap-4 md:gap-6 lg:gap-8",
  lg: "gap-6 md:gap-8 lg:gap-10",
}

// GridContainer flexible con columnas configurables por breakpoint
export function GridContainer({
  children,
  cols = { default: 1, md: 2, lg: 4 },
  gap = "md",
  className,
}: GridContainerProps) {
  const colClasses: string[] = []

  if (cols.default) colClasses.push(colsClasses[cols.default] || "")
  if (cols.md) colClasses.push(mdColsClasses[cols.md] || "")
  if (cols.lg) colClasses.push(lgColsClasses[cols.lg] || "")

  return (
    <div className={cn("grid auto-rows-auto", colClasses.filter(Boolean).join(" "), gapClasses[gap], className)}>
      {children}
    </div>
  )
}
