/**
 * ProjectCardSkeleton - Skeleton loader para ProjectCard
 * 
 * Simula la estructura de ProjectCard mientras carga:
 * - Imagen circular
 * - Título, subtítulo y descripción
 * - Tags
 * - Flecha de navegación
 */

import Skeleton from '@/components/ui/skeleton'

export default function ProjectCardSkeleton() {
  return (
    <div className="w-full">
      <div className="group bg-[#0D0D0D] border border-[#9C96A4] rounded-2xl transition-all duration-300">
        <div className="p-6">
          {/* Mobile Layout Skeleton */}
          <div className="flex flex-row items-center md:hidden gap-4">
            {/* Image Skeleton */}
            <Skeleton className="w-16 h-16 rounded-full flex-shrink-0" variant="circular" />
            
            {/* Content Skeleton */}
            <div className="flex-1 text-left space-y-2">
              <Skeleton className="h-5 w-3/4" variant="text" />
              <Skeleton className="h-4 w-2/3" variant="text" />
              <Skeleton className="h-3 w-full" variant="text" />
            </div>
            
            {/* Arrow Skeleton */}
            <Skeleton className="w-10 h-10 rounded-full flex-shrink-0" />
          </div>

          {/* Desktop Layout Skeleton */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {/* Image Skeleton */}
            <Skeleton className="w-32 h-32 lg:w-40 lg:h-40 xl:w-48 xl:h-48 rounded-full flex-shrink-0" variant="circular" />
            
            {/* Content Skeleton */}
            <div className="flex-1 min-w-0 space-y-3">
              <Skeleton className="h-8 lg:h-10 w-3/4" variant="text" />
              <Skeleton className="h-6 lg:h-7 w-2/3" variant="text" />
              <Skeleton className="h-5 lg:h-6 w-full" variant="text" />
              
              {/* Tags Skeleton */}
              <div className="flex gap-2 lg:gap-3 xl:gap-4 pt-2">
                <Skeleton className="h-7 w-20 rounded-full" />
                <Skeleton className="h-7 w-24 rounded-full" />
                <Skeleton className="h-7 w-16 rounded-full" />
                <Skeleton className="h-7 w-22 rounded-full hidden lg:block" />
                <Skeleton className="h-7 w-18 rounded-full hidden xl:block" />
              </div>
            </div>
            
            {/* Arrow Skeleton */}
            <Skeleton className="w-16 h-16 lg:w-20 lg:h-20 xl:w-[136px] xl:h-[118px] rounded-full flex-shrink-0" />
          </div>
        </div>
      </div>
    </div>
  )
}

