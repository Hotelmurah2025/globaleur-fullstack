import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";

interface Guest {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

interface ApiResponse {
  status: string;
  message: string;
  data?: {
    guests: Guest[];
  };
}

export const GuestList = () => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGuests = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/guests`);
        const data: ApiResponse = await response.json();

        if (data.status === 'success') {
          setGuests(data.data?.guests || []);
        } else {
          setError(data.message || 'Failed to fetch guests');
        }
      } catch (error) {
        setError('Error connecting to the server');
        console.error('Error fetching guests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGuests();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-full">Loading guests...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Guests</h2>
        <Button>
          <Plus className="mr-2" size={16} />
          Add Guest
        </Button>
      </div>

      {guests.length === 0 ? (
        <div className="text-center text-gray-500">No guests available</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {guests.map((guest) => (
            <Card key={guest.id}>
              <CardHeader>
                <CardTitle>{guest.first_name} {guest.last_name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">{guest.email}</p>
                <p className="text-sm text-gray-500">{guest.phone}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
