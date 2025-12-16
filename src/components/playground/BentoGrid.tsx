'use client'

import { useState } from 'react'
import BentoCard from './BentoCard'
import { playgroundItems, playgroundFilters, PlaygroundType } from '@/data/playgroundData'

export default function BentoGrid() {
  const [activeFilter, setActiveFilter] = useState<PlaygroundType>('all')

  const filteredItems = activeFilter === 'all' 
    ? playgroundItems 
    : playgroundItems.filter(item => item.type === activeFilter)

  return (
    <section className="relative w-full min-h-screen py-12 md:py-16 lg:py-20 bg-[#0D0D0D]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Playground
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
            Experimentos, prototipos y exploraciones creativas
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12 md:mb-16">
          {playgroundFilters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={`px-6 py-1.5 rounded-full text-sm font-medium ${
                activeFilter === filter.value
                  ? 'bg-white text-black'
                  : 'bg-white/10 text-white'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredItems.map((item) => (
            <BentoCard key={item.id} item={item} />
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <p className="text-white/60 text-lg">
              No hay proyectos en esta categoría aún.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
