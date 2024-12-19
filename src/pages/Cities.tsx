import React, { useState } from 'react'

// Temporary placeholder components that will be fully implemented in later steps
const CityCard = ({ city, country, imageUrl }: { city: string; country: string; imageUrl: string }) => (
  <div>Placeholder for CityCard</div>
)

const CountryFilter = ({ selected, onSelect }: { selected: string; onSelect: (country: string) => void }) => (
  <div>Placeholder for CountryFilter</div>
)

export default function CitiesPage() {
  const [selectedCountry, setSelectedCountry] = useState('All countries')

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">What's your next destination?</h1>
      <CountryFilter
        selected={selectedCountry}
        onSelect={setSelectedCountry}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* City cards will be populated here once we create the data file */}
      </div>
    </div>
  )
}
