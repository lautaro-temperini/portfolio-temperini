import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

// Tipos para los spans dinámicos por breakpoint
export interface SpanConfig {
  default?: number
  md?: number
  lg?: number
}

export interface BlockProps {
  children: ReactNode
  colSpan?: SpanConfig | number
  rowSpan?: SpanConfig | number
  className?: string
}

// Mapeo de valores numéricos a clases de Tailwind
const colSpanClasses: Record<number, string> = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-3",
  4: "col-span-4",
  5: "col-span-5",
  6: "col-span-6",
}

const rowSpanClasses: Record<number, string> = {
  1: "row-span-1",
  2: "row-span-2",
  3: "row-span-3",
  4: "row-span-4",
  5: "row-span-5",
  6: "row-span-6",
}

const mdColSpanClasses: Record<number, string> = {
  1: "md:col-span-1",
  2: "md:col-span-2",
  3: "md:col-span-3",
  4: "md:col-span-4",
  5: "md:col-span-5",
  6: "md:col-span-6",
}

const mdRowSpanClasses: Record<number, string> = {
  1: "md:row-span-1",
  2: "md:row-span-2",
  3: "md:row-span-3",
  4: "md:row-span-4",
  5: "md:row-span-5",
  6: "md:row-span-6",
}

const lgColSpanClasses: Record<number, string> = {
  1: "lg:col-span-1",
  2: "lg:col-span-2",
  3: "lg:col-span-3",
  4: "lg:col-span-4",
  5: "lg:col-span-5",
  6: "lg:col-span-6",
}

const lgRowSpanClasses: Record<number, string> = {
  1: "lg:row-span-1",
  2: "lg:row-span-2",
  3: "lg:row-span-3",
  4: "lg:row-span-4",
  5: "lg:row-span-5",
  6: "lg:row-span-6",
}

// Genera las clases de span basándose en la configuración
function getSpanClasses(colSpan: SpanConfig | number = 1, rowSpan: SpanConfig | number = 1): string {
  const colConfig = typeof colSpan === "number" ? { default: colSpan } : colSpan
  const rowConfig = typeof rowSpan === "number" ? { default: rowSpan } : rowSpan

  const classes: string[] = []

  // Column spans
  if (colConfig.default) classes.push(colSpanClasses[colConfig.default] || "")
  if (colConfig.md) classes.push(mdColSpanClasses[colConfig.md] || "")
  if (colConfig.lg) classes.push(lgColSpanClasses[colConfig.lg] || "")

  // Row spans
  if (rowConfig.default) classes.push(rowSpanClasses[rowConfig.default] || "")
  if (rowConfig.md) classes.push(mdRowSpanClasses[rowConfig.md] || "")
  if (rowConfig.lg) classes.push(lgRowSpanClasses[rowConfig.lg] || "")

  return classes.filter(Boolean).join(" ")
}

// Componente Block genérico y flexible
export function Block({ children, colSpan = 1, rowSpan = 1, className }: BlockProps) {
  return <div className={cn(getSpanClasses(colSpan, rowSpan), className)}>{children}</div>
}

// Presets para compatibilidad con el código original
export function Block4x4({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <Block colSpan={{ default: 1, md: 2, lg: 4 }} rowSpan={{ default: 4, md: 4, lg: 4 }} className={className}>
      {children}
    </Block>
  )
}

export function Block2x2({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <Block colSpan={{ default: 1, md: 2 }} rowSpan={{ default: 2, md: 2 }} className={className}>
      {children}
    </Block>
  )
}

export function Block4x2({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <Block colSpan={{ default: 1, md: 2, lg: 4 }} rowSpan={{ default: 2, md: 2, lg: 2 }} className={className}>
      {children}
    </Block>
  )
}

export function Block2x4({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <Block colSpan={{ default: 1, md: 2 }} rowSpan={{ default: 4, md: 4 }} className={className}>
      {children}
    </Block>
  )
}
