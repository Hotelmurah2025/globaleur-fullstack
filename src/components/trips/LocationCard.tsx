import { Card } from "../ui/card"
import { MapPin, Clock } from "lucide-react"

interface LocationCardProps {
  name: string
  description: string
  address: string
  rating: number
  hours?: string
  image: string
  index: number
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
  index,
  travelTime
}: LocationCardProps) => {
  return (
    <div className="space-y-3">
      {travelTime && (
        <div className="flex items-center gap-2 text-sm text-gray-600 pl-20 py-2">
          <img
            src={`/assets/${travelTime.mode === 'walking' ? 'pedestrian' : 'car'}.svg`}
            alt={travelTime.mode}
            className="w-4 h-4 text-gray-600"
          />
          <span>{travelTime.duration}</span>
        </div>
      )}
      <Card className="flex gap-6 p-4 hover:bg-gray-50 transition-colors">
        <div className="relative shrink-0">
          <img
            src={image}
            alt={name}
            className="w-40 h-28 object-cover rounded-lg"
          />
          <div className="absolute top-2 left-2 bg-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium shadow-sm">
            {index}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium text-gray-900 font-inter">{name}</h3>
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium text-gray-900">{rating}</span>
              <svg
                className="w-4 h-4 text-amber-400 fill-current"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{description}</p>
          <div className="flex flex-col gap-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{hours}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span className="truncate">{address}</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
