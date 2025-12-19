import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

export interface FeatureCardProps {
  icon?: ReactNode
  title: string
  description?: string
  variant?: "dark" | "light"
  className?: string
}

// FeatureCard: Tarjeta individual con icono, título y descripción
export function FeatureCard({ icon, title, description, variant = "dark", className }: FeatureCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 p-5 md:p-6 rounded-2xl transition-all",
        variant === "dark" &&
          "bg-neutral-900 text-white shadow-[0_0.7px_0.7px_-0.7px_rgba(20,20,20,0.21),0_1.8px_1.8px_-1.4px_rgba(20,20,20,0.2),0_3.6px_3.6px_-2.1px_rgba(20,20,20,0.19),0_6.9px_6.9px_-2.8px_rgba(20,20,20,0.17),0_13.6px_13.6px_-3.5px_rgba(20,20,20,0.13)]",
        variant === "light" && "bg-white text-neutral-900 border border-neutral-200/60",
        className,
      )}
    >
      {icon && <figure className="w-6 h-6 text-neutral-400">{icon}</figure>}
      <div className="flex flex-col gap-1.5">
        <h3
          className={cn(
            "text-base md:text-lg font-semibold leading-tight",
            variant === "dark" ? "text-white" : "text-neutral-900",
          )}
        >
          {title}
        </h3>
        {description && (
          <p className={cn("text-sm leading-relaxed", variant === "dark" ? "text-neutral-400" : "text-neutral-500")}>
            {description}
          </p>
        )}
      </div>
    </div>
  )
}
