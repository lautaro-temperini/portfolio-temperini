'use client'

import Image from 'next/image'
import Link from 'next/link'
import { BentoItem } from '@/data/playgroundData'

interface BentoCardProps {
  item: BentoItem
}

// Mapeo estático de colores - sin lógica dinámica
const borderColorMap: Record<string, string> = {
  purple: 'rgba(168, 85, 247, 0.3)',
  green: 'rgba(16, 185, 129, 0.3)',
  orange: 'rgba(249, 115, 22, 0.3)',
  pink: 'rgba(236, 72, 153, 0.3)',
  gray: 'rgba(107, 114, 128, 0.3)',
  blue: 'rgba(59, 130, 246, 0.3)',
}

export default function BentoCard({ item }: BentoCardProps) {
  const borderColor = borderColorMap[item.variant] || 'rgba(107, 114, 128, 0.3)'

  const cardContent = (
    <>
      <div className="absolute inset-0">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          unoptimized={item.image.startsWith('data:')}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30" />
      </div>

      <div className="relative z-10 flex flex-col justify-between h-full p-4 md:p-6">
        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag, index) => (
            <span
              key={`${item.id}-tag-${index}`}
              className="px-2 py-1 text-xs font-medium rounded-full bg-white/10 border border-white/20 text-white"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto">
          <h3 className="text-lg md:text-xl font-semibold text-white mb-2 line-clamp-2">
            {item.title}
          </h3>
          <p className="text-white/80 text-sm leading-relaxed line-clamp-3">
            {item.description}
          </p>
        </div>
      </div>
    </>
  )

  const cardClassName = "relative overflow-hidden rounded-xl bg-[#0D0D0D] border flex flex-col"
  const cardStyle = {
    borderColor,
    aspectRatio: '1 / 1' as const,
    minHeight: '280px'
  }

  if (item.href) {
    return (
      <Link href={item.href} className="block">
        <div className={cardClassName} style={cardStyle}>
          {cardContent}
        </div>
      </Link>
    )
  }
  
  return (
    <div className={cardClassName} style={cardStyle}>
      {cardContent}
    </div>
  )
}
