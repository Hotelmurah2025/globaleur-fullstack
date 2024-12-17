import type { Trip } from '../types/trip'
import { mockTrip } from '../data/mockTrip'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.globaleur.com'
// Use mock data for development
const isDevelopment = true

export const fetchTrip = async (tripId: string): Promise<Trip> => {
  if (isDevelopment) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500))
    return mockTrip
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/trips/${tripId}`)
    if (!response.ok) {
      throw new Error(`Failed to fetch trip: ${response.statusText}`)
    }
    const data = await response.json()
    return {
      ...data,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate)
    }
  } catch (error) {
    console.error('Error fetching trip:', error)
    throw error
  }
}

export const createTrip = async (trip: Omit<Trip, 'id'>): Promise<Trip> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/trips`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(trip)
    })
    if (!response.ok) {
      throw new Error(`Failed to create trip: ${response.statusText}`)
    }
    const data = await response.json()
    return {
      ...data,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate)
    }
  } catch (error) {
    console.error('Error creating trip:', error)
    throw error
  }
}

export const updateTrip = async (tripId: string, trip: Partial<Trip>): Promise<Trip> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/trips/${tripId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(trip)
    })
    if (!response.ok) {
      throw new Error(`Failed to update trip: ${response.statusText}`)
    }
    const data = await response.json()
    return {
      ...data,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate)
    }
  } catch (error) {
    console.error('Error updating trip:', error)
    throw error
  }
}

export const deleteTrip = async (tripId: string): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/trips/${tripId}`, {
      method: 'DELETE'
    })
    if (!response.ok) {
      throw new Error(`Failed to delete trip: ${response.statusText}`)
    }
  } catch (error) {
    console.error('Error deleting trip:', error)
    throw error
  }
}
