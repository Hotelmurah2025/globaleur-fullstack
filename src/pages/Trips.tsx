import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Share2, BookmarkPlus, MapPin, List } from 'lucide-react';

interface Location {
  id: string;
  name: string;
  rating: number;
  description: string;
  address: string;
  hours: string;
  image: string;
}

interface TripDay {
  number: number;
  locations: Location[];
}

interface TripData {
  id: string;
  city: string;
  startDate: string;
  endDate: string;
  days: TripDay[];
}

const mockTripData: TripData = {
  id: '4338178672065241586',
  city: 'Jakarta',
  startDate: '2024-12-18',
  endDate: '2024-12-20',
  days: [
    {
      number: 1,
      locations: [
        {
          id: '1',
          name: 'Taman Suropati',
          rating: 4.6,
          description: 'Historic park with sculptures',
          address: 'Menteng, Central Jakarta',
          hours: 'All day',
          image: '/assets/locations/taman-suropati.jpg'
        },
        {
          id: '2',
          name: 'Taman Situ Lembang',
          rating: 4.5,
          description: 'Peaceful lake park',
          address: 'Menteng, Central Jakarta',
          hours: '6:00 AM - 6:00 PM',
          image: '/assets/locations/taman-situ-lembang.jpg'
        }
      ]
    },
    {
      number: 2,
      locations: [
        {
          id: '3',
          name: 'Menteng Park',
          rating: 4.4,
          description: 'Modern urban park',
          address: 'Menteng, Central Jakarta',
          hours: 'All day',
          image: '/assets/locations/menteng-park.jpg'
        },
        {
          id: '4',
          name: 'Pacific Place Mall',
          rating: 4.7,
          description: 'Luxury shopping center',
          address: 'SCBD, South Jakarta',
          hours: '10:00 AM - 10:00 PM',
          image: '/assets/locations/pacific-place.jpg'
        }
      ]
    },
    {
      number: 3,
      locations: [
        {
          id: '5',
          name: 'National Monument',
          rating: 4.8,
          description: 'Historic landmark',
          address: 'Central Jakarta',
          hours: '8:00 AM - 4:00 PM',
          image: '/assets/locations/monas.jpg'
        },
        {
          id: '6',
          name: 'Istiqlal Mosque',
          rating: 4.7,
          description: 'Largest mosque in Southeast Asia',
          address: 'Central Jakarta',
          hours: '4:00 AM - 8:00 PM',
          image: '/assets/locations/istiqlal.jpg'
        }
      ]
    }
  ]
};

export const Trips: React.FC = () => {
  const { tripId } = useParams<{ tripId: string }>();
  const navigate = useNavigate();
  const [activeDay, setActiveDay] = useState(1);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('list');

  useEffect(() => {
    if (!tripId) {
      navigate('/trips/4338178672065241586');
    }
  }, [tripId, navigate]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">{mockTripData.city}</h1>
          <p className="text-gray-600">
            {new Date(mockTripData.startDate).toLocaleDateString()} - {new Date(mockTripData.endDate).toLocaleDateString()}
          </p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" size="sm">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <BookmarkPlus className="w-4 h-4 mr-2" />
            Save
          </Button>
        </div>
      </div>

      <div className="flex justify-end mb-4">
        <Button
          variant={viewMode === 'list' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setViewMode('list')}
          className="rounded-r-none"
        >
          <List className="w-4 h-4 mr-2" />
          List
        </Button>
        <Button
          variant={viewMode === 'map' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setViewMode('map')}
          className="rounded-l-none"
        >
          <MapPin className="w-4 h-4 mr-2" />
          Map
        </Button>
      </div>

      <Tabs value={activeDay.toString()} onValueChange={(value) => setActiveDay(parseInt(value))} className="mb-8">
        <TabsList>
          {mockTripData.days.map((day) => (
            <TabsTrigger
              key={day.number}
              value={day.number.toString()}
            >
              Day {day.number}
            </TabsTrigger>
          ))}
        </TabsList>

        {mockTripData.days.map((day) => (
          <TabsContent key={day.number} value={day.number.toString()}>
            <div className="grid gap-4">
              {day.locations.map((location) => (
                <Card key={location.id} className="p-4">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 bg-gray-200 rounded-lg">
                      {/* Image placeholder - will be implemented in later steps */}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{location.name}</h3>
                      <div className="flex items-center gap-1 text-yellow-500">
                        <span>★</span>
                        <span className="text-gray-700">{location.rating}</span>
                      </div>
                      <p className="text-gray-600 text-sm">{location.description}</p>
                      <p className="text-gray-500 text-sm">{location.hours}</p>
                      <p className="text-gray-500 text-sm">{location.address}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {viewMode === 'map' && (
        <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Map integration will be implemented in later steps</p>
        </div>
      )}
    </div>
  );
};

export default Trips;
