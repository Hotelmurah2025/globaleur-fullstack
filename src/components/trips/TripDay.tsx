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
  activeDay: number
  onDayChange: (day: number) => void
}

export const TripDay = ({ days, activeDay, onDayChange }: TripDayProps) => {
  return (
    <div className="mt-6">
      <Tabs value={activeDay.toString()} onValueChange={onDayChange as any}>
        <TabsList className="mb-6">
          {days.map((day) => (
            <TabsTrigger
              key={day.number}
              value={day.number.toString()}
              className="px-6"
            >
              Day {day.number}
            </TabsTrigger>
          ))}
        </TabsList>
        {days.map((day) => (
          <TabsContent
            key={day.number}
            value={day.number.toString()}
          >
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6">
                {day.locations.map((location, idx) => (
                  <LocationCard
                    key={idx}
                    {...location}
                    index={idx + 1}
                    travelTime={idx > 0 ? location.travelTime : undefined}
                  />
                ))}
              </div>
              <div className="sticky top-6 h-[calc(100vh-12rem)]">
                <TripMap
                  locations={day.locations.map((loc, idx) => ({
                    name: loc.name,
                    coordinates: loc.coordinates,
                    index: idx + 1
                  }))}
                />
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
