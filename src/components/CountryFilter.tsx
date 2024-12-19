import React from 'react'

interface CountryFilterProps {
  selected: string
  onSelect: (country: string) => void
}

export function CountryFilter({ selected, onSelect }: CountryFilterProps) {
  return (
    <div className="mb-8">
      <label className="block text-sm font-normal text-gray-600 mb-2">Filter by country name</label>
      <div className="relative">
        <select
          value={selected}
          onChange={(e) => onSelect(e.target.value)}
          className="appearance-none w-full max-w-xs px-4 py-2.5 bg-white rounded-lg border border-gray-200 shadow-sm text-base font-normal text-gray-900 cursor-pointer hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
        >
          <option>All countries</option>
          {/* Country options will be populated from data */}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </div>
      </div>
    </div>
  )
}
