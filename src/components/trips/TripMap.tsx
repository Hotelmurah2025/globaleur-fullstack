import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

interface Location {
  name: string
  coordinates: {
    lat: number
    lng: number
  }
}

interface TripMapProps {
  locations: Location[]
}

export const TripMap = ({ locations }: TripMapProps) => {
  const center = locations[0]?.coordinates || { lat: 0, lng: 0 }

  return (
    <div className="h-full w-full rounded-lg overflow-hidden">
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={13}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {locations.map((location, index) => (
          <Marker
            key={index}
            position={[location.coordinates.lat, location.coordinates.lng]}
          >
            <Popup>{location.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
