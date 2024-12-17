import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { MapPin, Clock, Star } from "lucide-react"

interface LocationCardProps {
  name: string
  description: string
  address: string
  rating: number
  hours?: string
  image: string
  travelTime?: {
    duration: string
    mode: 'walking' | 'driving'
  }
}

export const LocationCard = ({
  name,
  description,
  address,
  rating,
  hours = 'All day',
  image,
  travelTime
}: LocationCardProps) => {
  return (
    <div className="space-y-4">
      {travelTime && (
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <img
            src={travelTime.mode === 'walking' ? '/assets/pedestrian.svg' : '/assets/car.svg'}
            alt={travelTime.mode}
            className="w-4 h-4"
          />
          <span>{travelTime.duration}</span>
        </div>
      )}
      <Card className="overflow-hidden">
        <div className="relative aspect-video">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">{name}</CardTitle>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span>{rating}</span>
            </div>
          </div>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-gray-500" />
            <span>{hours}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span className="truncate">{address}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
