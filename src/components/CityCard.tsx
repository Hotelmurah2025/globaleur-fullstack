import React from 'react'

interface CityCardProps {
  city: string
  country: string
  imageUrl: string
}

export function CityCard({ city, country, imageUrl }: CityCardProps) {
  const citySlug = city.replace(' ', '_')

  return (
    <a
      href={`/cities/${citySlug}`}
      className="group relative overflow-hidden rounded-lg aspect-[16/9]"
    >
      <img
        src={imageUrl}
        alt={`${city}, ${country}`}
        className="w-full h-full object-cover transition-transform group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
        <div className="absolute bottom-4 left-4">
          <h2 className="text-sm text-white/80">{country}</h2>
          <h1 className="text-2xl font-bold text-white">{city}</h1>
        </div>
      </div>
    </a>
  )
}
