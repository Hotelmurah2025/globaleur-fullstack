import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Plus } from "lucide-react";

interface BookingFormProps {
  onSuccess: () => void;
}

export const BookingForm = ({ onSuccess }: BookingFormProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const checkInDate = formData.get('check_in_date') as string;
      const checkOutDate = formData.get('check_out_date') as string;
      const roomId = parseInt(formData.get('room_id') as string);
      const guestId = parseInt(formData.get('guest_id') as string);

      // Basic validation
      if (!roomId || !guestId || !checkInDate || !checkOutDate) {
        throw new Error('All fields are required');
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          guest_id: guestId,
          room_id: roomId,
          check_in_date: new Date(checkInDate).toISOString(),
          check_out_date: new Date(checkOutDate).toISOString(),
          status: formData.get('status')
        })
      });

      let errorMessage: string;
      if (!response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          errorMessage = data.message || 'Failed to create booking';
        } else {
          errorMessage = await response.text();
        }
        throw new Error(errorMessage);
      }

      await response.json(); // Consume response body
      setOpen(false);
      onSuccess();
    } catch (error) {
      console.error('Error creating booking:', error);
      alert(error instanceof Error ? error.message : 'An error occurred while creating the booking');
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
          <Input name="room_id" type="number" placeholder="Room ID" required />
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
