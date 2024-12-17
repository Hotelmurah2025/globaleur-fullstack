import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { LocationCard } from "./LocationCard"
import { TripMap } from "./TripMap"

interface Location {
  name: string
  description: string
  address: string
  rating: number
  hours?: string
  image: string
  coordinates: [number, number]
  travelTime?: {
    duration: string
    mode: 'walking' | 'driving'
  }
}

interface TripDayProps {
  days: {
    number: number
    locations: Location[]
  }[]
}

export const TripDay = ({ days }: TripDayProps) => {
  return (
    <Tabs defaultValue="1" className="w-full">
      <TabsList>
        {days.map((day) => (
          <TabsTrigger
            key={day.number}
            value={day.number.toString()}
            className="px-4 py-2"
          >
            Day {day.number}
          </TabsTrigger>
        ))}
      </TabsList>
      {days.map((day) => (
        <TabsContent
          key={day.number}
          value={day.number.toString()}
          className="mt-6"
        >
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-6">
              {day.locations.map((location, idx) => (
                <LocationCard
                  key={idx}
                  {...location}
                  travelTime={idx > 0 ? location.travelTime : undefined}
                />
              ))}
            </div>
            <div className="sticky top-6">
              <TripMap
                locations={day.locations.map((loc, idx) => ({
                  name: loc.name,
                  coordinates: loc.coordinates,
                  index: idx
                }))}
              />
            </div>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}
