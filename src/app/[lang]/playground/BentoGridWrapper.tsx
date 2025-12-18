'use client'

import dynamic from 'next/dynamic'

// Skeleton IDÉNTICO al layout final
const BentoGridSkeleton = () => (
  <section className="relative w-full min-h-screen py-12 md:py-16 lg:py-20 bg-background">
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
      <div className="text-center mb-12 md:mb-16">
        <div className="h-12 md:h-16 lg:h-20 w-64 md:w-80 mx-auto mb-6 bg-[#1A1A1A] rounded-lg animate-pulse" />
        <div className="h-6 md:h-8 w-full max-w-3xl mx-auto bg-[#1A1A1A] rounded-lg animate-pulse" />
      </div>
      <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12 md:mb-16">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-11 w-24 md:w-32 rounded-full bg-[#1A1A1A] animate-pulse" />
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div 
            key={i} 
            className="relative overflow-hidden rounded-xl bg-[#1A1A1A] border border-[#1A1A1A] flex flex-col animate-pulse"
            style={{
              aspectRatio: '1 / 1',
              minHeight: '280px'
            }}
          />
        ))}
      </div>
    </div>
  </section>
)

// Dynamic import con ssr: false - NO renderizar en servidor
const BentoGridDynamic = dynamic(() => import('@/components/playground/BentoGrid'), {
  ssr: false,
  loading: () => <BentoGridSkeleton />,
})

export default function BentoGridWrapper() {
  return <BentoGridDynamic />
}
