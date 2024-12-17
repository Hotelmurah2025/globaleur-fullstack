import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { MapPin, Clock, Star } from "lucide-react"

interface LocationCardProps {
  name: string
  description: string
  address: string
  rating: number
  hours?: string
  image: string
  category: string
}

export const LocationCard = ({
  name,
  description,
  address,
  rating,
  hours,
  image,
  category,
}: LocationCardProps) => {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-video relative">
        <img
          src={image}
          alt={name}
          className="object-cover w-full h-full"
        />
        <div className="absolute top-4 right-4 bg-white/90 px-2 py-1 rounded-full">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
        </div>
      </div>
      <CardHeader>
        <div className="space-y-1">
          <CardTitle className="text-xl">{name}</CardTitle>
          <p className="text-sm text-muted-foreground">{category}</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <CardDescription className="line-clamp-2">
          {description}
        </CardDescription>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 mt-1 shrink-0" />
            <span>{address}</span>
          </div>
          {hours && (
            <div className="flex items-start gap-2">
              <Clock className="h-4 w-4 mt-1 shrink-0" />
              <span>{hours}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
