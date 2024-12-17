import { GoogleMap, Marker, DirectionsRenderer, useJsApiLoader } from '@react-google-maps/api'
import { useState, useCallback, useEffect } from 'react'

interface MapLocation {
  name: string
  coordinates: [number, number]
  index: number
}

interface TripMapProps {
  locations: MapLocation[]
}

const mapContainerStyle = {
  width: '100%',
  height: '100%'
}

const createMarkerLabel = (index: number) => ({
  text: `${index + 1}`,
  className: 'bg-primary rounded-full w-6 h-6 flex items-center justify-center text-white'
})

export const TripMap = ({ locations }: TripMapProps) => {
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null)
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  })

  const fetchDirections = useCallback(async () => {
    if (!locations.length) return

    const directionsService = new google.maps.DirectionsService()
    const waypoints = locations.slice(1, -1).map(location => ({
      location: { lat: location.coordinates[0], lng: location.coordinates[1] },
      stopover: true
    }))

    try {
      const result = await directionsService.route({
        origin: { lat: locations[0].coordinates[0], lng: locations[0].coordinates[1] },
        destination: {
          lat: locations[locations.length - 1].coordinates[0],
          lng: locations[locations.length - 1].coordinates[1]
        },
        waypoints,
        travelMode: google.maps.TravelMode.WALKING,
        optimizeWaypoints: true
      })
      setDirections(result)
    } catch (error) {
      console.error('Error fetching directions:', error)
    }
  }, [locations])

  useEffect(() => {
    if (isLoaded) {
      fetchDirections()
    }
  }, [isLoaded, fetchDirections])

  if (!isLoaded) return <div>Loading...</div>

  return (
    <div className="relative aspect-square w-full">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={{ lat: locations[0]?.coordinates[0] || -6.2104477, lng: locations[0]?.coordinates[1] || 106.8224768 }}
        zoom={13}
      >
        {locations.map((location) => (
          <Marker
            key={location.index}
            position={{ lat: location.coordinates[0], lng: location.coordinates[1] }}
            label={createMarkerLabel(location.index)}
          />
        ))}
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
      <button
        className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-lg shadow-md"
        onClick={fetchDirections}
      >
        View route
      </button>
    </div>
  )
}
