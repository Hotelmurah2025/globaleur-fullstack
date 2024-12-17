import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Plus } from "lucide-react";

interface RoomFormProps {
  onSuccess: () => void;
}

export const RoomForm = ({ onSuccess }: RoomFormProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/rooms`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          number: formData.get('number'),
          floor: parseInt(formData.get('floor') as string),
          type_id: parseInt(formData.get('type_id') as string),
          status: formData.get('status')
        })
      });

      if (response.ok) {
        setOpen(false);
        onSuccess();
      }
    } catch (error) {
      console.error('Error creating room:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2" size={16} />
          Add Room
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Room</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input name="number" placeholder="Room Number" required />
          <Input name="floor" type="number" placeholder="Floor" required />
          <Select name="type_id" required>
            <SelectTrigger>
              <SelectValue placeholder="Room Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Standard</SelectItem>
              <SelectItem value="2">Deluxe</SelectItem>
              <SelectItem value="3">Suite</SelectItem>
            </SelectContent>
          </Select>
          <Select name="status" required>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="occupied">Occupied</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
            </SelectContent>
          </Select>
          <Button type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create Room'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
