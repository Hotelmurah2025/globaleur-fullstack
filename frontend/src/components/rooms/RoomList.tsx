import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { RoomForm } from "./RoomForm";

interface Room {
  id: number;
  number: string;
  status: string;
  type_id: number;
  floor: number;
}

interface ApiResponse {
  status: string;
  message: string;
  data?: {
    rooms: Room[];
  };
}

export const RoomList = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/rooms`);
      const data: ApiResponse = await response.json();

      if (data.status === 'success') {
        setRooms(data.data?.rooms || []);
      } else {
        setError(data.message || 'Failed to fetch rooms');
      }
    } catch (error) {
      setError('Error connecting to the server');
      console.error('Error fetching rooms:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-full">Loading rooms...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Rooms</h2>
        <RoomForm onSuccess={fetchRooms} />
      </div>

      {rooms.length === 0 ? (
        <div className="text-center text-gray-500">No rooms available</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rooms.map((room) => (
            <Card key={room.id}>
              <CardHeader>
                <CardTitle>Room {room.number}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">Floor: {room.floor}</p>
                <p className={`text-sm ${room.status === 'available' ? 'text-green-500' : 'text-red-500'}`}>
                  {room.status}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
