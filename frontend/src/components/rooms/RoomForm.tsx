import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";

interface RoomFormProps {
  onSuccess?: () => void;
}

const RoomForm: React.FC<RoomFormProps> = ({ onSuccess }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    number: '',
    floor: '',
    type_id: '1',
    status: 'available'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          number: formData.number,
          floor: parseInt(formData.floor),
          type_id: parseInt(formData.type_id),
          status: formData.status
        }),
      });

      if (response.ok) {
        setFormData({
          number: '',
          floor: '',
          type_id: '1',
          status: 'available'
        });
        setIsOpen(false);
        if (onSuccess) {
          onSuccess();
        }
      } else {
        console.error('Failed to create room');
      }
    } catch (error) {
      console.error('Error creating room:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Room
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Room</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <Input
            name="number"
            placeholder="Room Number"
            value={formData.number}
            onChange={(e) => setFormData({ ...formData, number: e.target.value })}
          />
          <Input
            name="floor"
            type="number"
            placeholder="Floor"
            value={formData.floor}
            onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
          />
          <Select
            name="type_id"
            value={formData.type_id}
            onValueChange={(value) => setFormData({ ...formData, type_id: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Room Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Standard</SelectItem>
              <SelectItem value="2">Deluxe</SelectItem>
              <SelectItem value="3">Suite</SelectItem>
            </SelectContent>
          </Select>
          <Select
            name="status"
            value={formData.status}
            onValueChange={(value) => setFormData({ ...formData, status: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="occupied">Occupied</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
            </SelectContent>
          </Select>
          <Button type="submit">Create Room</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RoomForm;
