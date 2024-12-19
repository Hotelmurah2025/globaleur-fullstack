import React, { useState } from 'react'
import { cities, countries } from '../data/cities'
import { CityCard } from '../components/CityCard'
import { CountryFilter } from '../components/CountryFilter'

export default function CitiesPage() {
  const [selectedCountry, setSelectedCountry] = useState('All countries')

  const filteredCities = selectedCountry === 'All countries'
    ? cities
    : cities.filter(city => city.country === selectedCountry)

  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">What's your next destination?</h1>

        <div className="mb-8">
          <CountryFilter
            selected={selectedCountry}
            onSelect={setSelectedCountry}
            countries={countries}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCities.map((city, index) => (
            <CityCard
              key={`${city.name}-${index}`}
              city={city.name}
              country={city.country}
              imageUrl={city.imageUrl}
            />
          ))}
        </div>
      </div>
    </main>
  )
}
