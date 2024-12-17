import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

interface Location {
  name: string
  coordinates: [number, number]
  index: number
}

interface TripMapProps {
  locations: Location[]
}

// Create custom marker icon with number
const createNumberedIcon = (number: number) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div class="bg-primary rounded-full w-6 h-6 flex items-center justify-center text-white">
        ${number}
      </div>
    `
  })
}

export const TripMap = ({ locations }: TripMapProps) => {
  return (
    <div className="relative aspect-square w-full">
      <MapContainer
        center={[-6.2104477, 106.8224768]} // Jakarta coordinates
        zoom={13}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {locations.map((location, idx) => (
          <Marker
            key={idx}
            position={location.coordinates}
            icon={createNumberedIcon(location.index + 1)}
          >
            <Popup>{location.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
      <button className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-lg shadow-md">
        View route
      </button>
    </div>
  )
}
