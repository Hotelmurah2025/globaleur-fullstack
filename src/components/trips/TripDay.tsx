import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { LocationCard } from "./LocationCard"
import { TripMap } from "./TripMap"

interface TripDayLocation {
  name: string
  description: string
  address: string
  rating: number
  hours?: string
  image: string
  category: string
  coordinates: {
    lat: number
    lng: number
  }
}

interface TripDayProps {
  days: {
    number: number
    locations: TripDayLocation[]
  }[]
  selectedDay: number
  onDayChange: (day: number) => void
}

export const TripDay = ({ days, selectedDay, onDayChange }: TripDayProps) => {
  return (
    <Tabs value={selectedDay.toString()} onValueChange={(value) => onDayChange(parseInt(value))}>
      <TabsList className="grid grid-cols-3 lg:grid-cols-7 gap-2">
        {days.map((day) => (
          <TabsTrigger
            key={day.number}
            value={day.number.toString()}
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Day {day.number}
          </TabsTrigger>
        ))}
      </TabsList>
      {days.map((day) => (
        <TabsContent key={day.number} value={day.number.toString()}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              {day.locations.map((location, index) => (
                <LocationCard
                  key={index}
                  name={location.name}
                  description={location.description}
                  address={location.address}
                  rating={location.rating}
                  hours={location.hours}
                  image={location.image}
                  category={location.category}
                />
              ))}
            </div>
            <div className="lg:sticky lg:top-24 h-96 lg:h-[calc(100vh-12rem)]">
              <TripMap locations={day.locations} />
            </div>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}
