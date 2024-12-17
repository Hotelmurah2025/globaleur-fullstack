import { Trip } from '../types/trip'

export const mockTrip: Trip = {
  id: '4338178672065241586',
  city: 'Jakarta',
  startDate: new Date('2024-12-18'),
  endDate: new Date('2024-12-19'),
  days: [
    {
      number: 1,
      locations: [
        {
          id: '1',
          name: 'National Monument',
          description: 'The National Monument is a 132m obelisk in the center of Merdeka Square, Central Jakarta, symbolizing the fight for Indonesia.',
          image: 'https://images.unsplash.com/photo-1555899434-94d1368aa7af',
          address: 'Gambir, Central Jakarta City, Jakarta, Indonesia',
          rating: 4.5,
          coordinates: [-6.1754, 106.8272],
          hours: '8:00 AM - 4:00 PM',
          travelTime: {
            duration: '20 min',
            mode: 'walking'
          }
        },
        {
          id: '2',
          name: 'Istiqlal Mosque',
          description: 'The Istiqlal Mosque is the largest mosque in Southeast Asia, accommodating up to 200,000 worshippers.',
          image: 'https://images.unsplash.com/photo-1590517865249-f2efe3b0d8ba',
          address: 'Gambir, Central Jakarta City, Jakarta, Indonesia',
          rating: 4.7,
          coordinates: [-6.1701, 106.8309],
          hours: '9:00 AM - 5:00 PM',
          travelTime: {
            duration: '15 min',
            mode: 'walking'
          }
        }
      ]
    },
    {
      number: 2,
      locations: [
        {
          id: '3',
          name: 'Ancol Dreamland',
          description: 'Ancol Dreamland is an integrated tourism area in Jakarta, consisting of theme parks, beaches, and recreational facilities.',
          image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482',
          address: 'North Jakarta, Jakarta, Indonesia',
          rating: 4.3,
          coordinates: [-6.1261, 106.8451],
          hours: '10:00 AM - 6:00 PM',
          travelTime: {
            duration: '30 min',
            mode: 'driving'
          }
        }
      ]
    }
  ]
}
