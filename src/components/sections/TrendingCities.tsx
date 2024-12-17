import { Button } from '@/components/ui/button'

interface City {
  id: number
  name: string
  country: string
  image_url: string
}

const STATIC_CITIES: City[] = [
  { id: 1, name: 'Singapore', country: 'Singapore', image_url: '/assets/cities/singapore.jpg' },
  { id: 2, name: 'Seoul', country: 'South Korea', image_url: '/assets/cities/seoul.jpg' },
  { id: 3, name: 'New York', country: 'United States', image_url: '/assets/cities/newyork.jpg' },
  { id: 4, name: 'London', country: 'United Kingdom', image_url: '/assets/cities/london.jpg' },
  { id: 5, name: 'Istanbul', country: 'Turkey', image_url: '/assets/cities/istanbul.jpg' },
  { id: 6, name: 'Porto', country: 'Portugal', image_url: '/assets/cities/porto.jpg' },
  { id: 7, name: 'Lisbon', country: 'Portugal', image_url: '/assets/cities/lisbon.jpg' },
  { id: 8, name: 'Paris', country: 'France', image_url: '/assets/cities/paris.jpg' },
]

export const TrendingCities = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">Trending Cities</h2>
          <Button
            variant="ghost"
            className="text-indigo-600 hover:text-indigo-700 hover:bg-transparent"
            asChild
          >
            <a href="/cities">See all</a>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {STATIC_CITIES.slice(0, 8).map((city) => (
            <a
              key={city.id}
              href={`/cities/${city.name}`}
              className="group cursor-pointer block"
            >
              <div className="relative rounded-xl overflow-hidden mb-3">
                <div className="aspect-[4/3]">
                  <img
                    src={`https://cdn.globaleur.com/cities/${city.name.toLowerCase()}.jpg`}
                    alt={city.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/60" />
              </div>
              <div className="px-1">
                <p className="text-sm font-medium text-gray-500 mb-1">{city.country}</p>
                <h3 className="text-lg font-semibold text-gray-900">{city.name}</h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
