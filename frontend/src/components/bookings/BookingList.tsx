import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { format } from 'date-fns';

interface Booking {
  id: number;
  guest_id: number;
  room_id: number;
  check_in_date: string;
  check_out_date: string;
  status: string;
}

interface ApiResponse {
  status: string;
  message: string;
  data?: {
    bookings: Booking[];
  };
}

export const BookingList = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/bookings`);
        const data: ApiResponse = await response.json();

        if (data.status === 'success') {
          setBookings(data.data?.bookings || []);
        } else {
          setError(data.message || 'Failed to fetch bookings');
        }
      } catch (error) {
        setError('Error connecting to the server');
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-full">Loading bookings...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Bookings</h2>
        <Button>
          <Plus className="mr-2" size={16} />
          New Booking
        </Button>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center text-gray-500">No bookings available</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {bookings.map((booking) => (
            <Card key={booking.id}>
              <CardHeader>
                <CardTitle>Booking #{booking.id}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">
                    Check-in: {format(new Date(booking.check_in_date), 'PPP')}
                  </p>
                  <p className="text-sm text-gray-500">
                    Check-out: {format(new Date(booking.check_out_date), 'PPP')}
                  </p>
                  <p className="text-sm font-medium">
                    Status: <span className="capitalize">{booking.status}</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
