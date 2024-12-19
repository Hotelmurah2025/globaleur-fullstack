import React from 'react'

interface CountryFilterProps {
  selected: string
  onSelect: (country: string) => void
  countries: string[]
}

export function CountryFilter({ selected, onSelect, countries }: CountryFilterProps) {
  return (
    <div className="mb-8">
      <label className="block text-sm font-normal text-gray-600 mb-2">Filter by country name</label>
      <div className="relative">
        <select
          value={selected}
          onChange={(e) => onSelect(e.target.value)}
          className="appearance-none w-full max-w-xs px-4 py-2.5 bg-white rounded-lg border border-gray-200 shadow-sm text-base font-normal text-gray-900 cursor-pointer hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
        >
          <option value="All countries">All countries</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M7 7l3-3 3 3m0 6l-3 3-3-3" />
          </svg>
        </div>
      </div>
    </div>
  )
}
