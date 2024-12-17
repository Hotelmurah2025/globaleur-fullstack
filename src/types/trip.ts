export interface Location {
  id: string
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

export interface TripDay {
  number: number
  locations: Location[]
}

export interface Trip {
  id: string
  city: string
  startDate: Date
  endDate: Date
  days: TripDay[]
}

export type TripView = 'map' | 'table'

export interface TripLocation extends Location {
  dayNumber: number
  orderInDay: number
}

export interface TravelMode {
  mode: 'walking' | 'driving'
  duration: string
  distance: string
}

export interface TripRoute {
  origin: Location
  destination: Location
  travelMode: TravelMode
}
