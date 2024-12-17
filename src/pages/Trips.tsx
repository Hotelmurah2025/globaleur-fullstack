import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MapPin, List } from 'lucide-react'
import { fetchTrip } from '../services/trip'
import type { Trip } from '../types/trip'
import { TripMap } from '../components/trips/TripMap'
import { TripActions } from '../components/trips/TripActions'
import { format } from 'date-fns'

export const Trips = () => {
  const { tripId } = useParams<{ tripId: string }>()
  const navigate = useNavigate()
  const [trip, setTrip] = useState<Trip | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeDay, setActiveDay] = useState(1)
  const [viewMode, setViewMode] = useState<'map' | 'list'>('list')

  useEffect(() => {
    if (!tripId) {
      navigate('/trips/4338178672065241586')
      return
    }

    const loadTrip = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchTrip(tripId)
        setTrip(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load trip')
      } finally {
        setLoading(false)
      }
    }

    loadTrip()
  }, [tripId, navigate])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h2 className="text-red-800 font-semibold">Error loading trip</h2>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    )
  }

  if (!trip) return null

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold font-inter text-gray-900">{trip.city}</h1>
          <p className="text-gray-600 font-inter mt-1">
            {format(trip.startDate, 'd MMM yyyy')} - {format(trip.endDate, 'd MMM yyyy')}
          </p>
        </div>
        <TripActions city={trip.city} />
      </div>

      <div className="flex justify-end mb-8">
        <Button
          variant={viewMode === 'list' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setViewMode('list')}
          className={`rounded-r-none border-r-0 font-inter ${
            viewMode === 'list'
              ? 'bg-gray-900 text-white hover:bg-gray-800'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <List className="w-4 h-4 mr-2" />
          List
        </Button>
        <Button
          variant={viewMode === 'map' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setViewMode('map')}
          className={`rounded-l-none font-inter ${
            viewMode === 'map'
              ? 'bg-gray-900 text-white hover:bg-gray-800'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <MapPin className="w-4 h-4 mr-2" />
          Map
        </Button>
      </div>

      <Tabs value={activeDay.toString()} onValueChange={(value) => setActiveDay(parseInt(value))} className="mb-8">
        <TabsList className="mb-8 space-x-6 border-b border-gray-200 w-full px-0">
          {trip.days.map((day) => (
            <TabsTrigger
              key={day.number}
              value={day.number.toString()}
              className="px-8 py-3 font-medium text-gray-600 hover:text-gray-900 font-inter data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-gray-900 data-[state=active]:font-semibold"
            >
              Day {day.number}
            </TabsTrigger>
          ))}
        </TabsList>

        {trip.days.map((day) => (
          <TabsContent key={day.number} value={day.number.toString()}>
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-12">
                {day.locations.map((location, index) => (
                  <div key={location.id}>
                    <Card className="overflow-hidden hover:shadow-md transition-shadow">
                      <div className="aspect-[16/9] relative">
                        <img
                          src={location.image}
                          alt={location.name}
                          className="object-cover w-full h-full"
                        />
                        <div className="absolute top-4 left-4 z-10 bg-primary text-white text-sm font-medium rounded-full w-8 h-8 flex items-center justify-center shadow-md font-inter">
                          {index + 1}
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-lg font-semibold font-inter text-gray-900">{location.name}</h3>
                          <div className="flex items-center gap-1">
                            <span className="text-amber-400">★</span>
                            <span className="font-medium text-gray-700">{location.rating}</span>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-4 font-inter leading-relaxed">{location.description}</p>
                        <div className="space-y-2 text-sm text-gray-500 font-inter">
                          <p className="flex items-center gap-2">
                            <span>🕒</span>
                            {location.hours}
                          </p>
                          <p className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            {location.address}
                          </p>
                        </div>
                      </div>
                    </Card>
                    {index < day.locations.length - 1 && (
                      <div className="flex items-center gap-2 text-gray-500 text-sm font-inter py-4 pl-4">
                        {index === 0 ? (
                          <>
                            <span className="text-lg">🚶</span>
                            <span>5 mins walk to next location</span>
                          </>
                        ) : index === 1 ? (
                          <>
                            <span className="text-lg">🚶</span>
                            <span>10 mins walk to next location</span>
                          </>
                        ) : (
                          <>
                            <span className="text-lg">🚗</span>
                            <span>5 mins drive to next location</span>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {viewMode === 'map' && (
                <div className="sticky top-24 h-[calc(100vh-12rem)] rounded-lg overflow-hidden shadow-md">
                  <TripMap
                    locations={day.locations.map((loc, idx) => ({
                      name: loc.name,
                      coordinates: loc.coordinates,
                      index: idx + 1
                    }))}
                  />
                </div>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

export default Trips
