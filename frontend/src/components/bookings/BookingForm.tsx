import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Plus } from "lucide-react";

interface BookingFormProps {
  onSuccess: () => void;
}

interface Room {
  id: number;
  type: {
    rate: number;
  };
}

export const BookingForm = ({ onSuccess }: BookingFormProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  const calculateTotalAmount = (checkIn: string, checkOut: string, roomRate: number) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return days * roomRate;
  };

  const fetchRoomDetails = async (roomId: number) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/rooms/${roomId}`);
      const data = await response.json();
      if (data.status === 'success') {
        setSelectedRoom(data.data.room);
      }
    } catch (error) {
      console.error('Error fetching room details:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const checkInDate = formData.get('check_in_date') as string;
      const checkOutDate = formData.get('check_out_date') as string;
      const roomId = parseInt(formData.get('room_id') as string);

      if (!selectedRoom || selectedRoom.id !== roomId) {
        await fetchRoomDetails(roomId);
      }

      if (!selectedRoom) {
        throw new Error('Room details not available');
      }

      const totalAmount = calculateTotalAmount(
        checkInDate,
        checkOutDate,
        selectedRoom.type.rate
      );

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          guest_id: parseInt(formData.get('guest_id') as string),
          room_id: roomId,
          check_in_date: new Date(checkInDate).toISOString(),
          check_out_date: new Date(checkOutDate).toISOString(),
          status: formData.get('status'),
          total_amount: totalAmount
        })
      });

      if (response.ok) {
        setOpen(false);
        onSuccess();
      } else {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create booking');
      }
    } catch (error) {
      console.error('Error creating booking:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2" size={16} />
          New Booking
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Booking</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input name="guest_id" type="number" placeholder="Guest ID" required />
          <Input name="room_id" type="number" placeholder="Room ID" required onChange={(e) => fetchRoomDetails(parseInt(e.target.value))} />
          <Input name="check_in_date" type="date" required />
          <Input name="check_out_date" type="date" required />
          <Select name="status" required>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="checked_in">Checked In</SelectItem>
              <SelectItem value="checked_out">Checked Out</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <Button type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create Booking'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
