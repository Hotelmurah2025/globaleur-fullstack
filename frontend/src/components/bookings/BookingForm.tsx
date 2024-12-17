import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { format } from 'date-fns';

interface BookingFormProps {
  onSuccess?: () => void;
  onClose: () => void;
}

const BookingForm = ({ onSuccess, onClose }: BookingFormProps) => {
  const today = format(new Date(), 'yyyy-MM-dd');
  const tomorrow = format(new Date(new Date().setDate(new Date().getDate() + 1)), 'yyyy-MM-dd');

  const [formData, setFormData] = useState({
    guest_id: '',
    room_id: '',
    check_in_date: today,
    check_out_date: tomorrow,
    status: 'confirmed'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const requestData = {
        guest_id: parseInt(formData.guest_id),
        room_id: parseInt(formData.room_id),
        check_in_date: new Date(formData.check_in_date).toISOString(),
        check_out_date: new Date(formData.check_out_date).toISOString(),
        status: formData.status
      };

      console.log('Submitting booking:', requestData);

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.log('Response text:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const result = await response.json();
      console.log('Booking created:', result);

      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('Error creating booking:', error);
    }
  };

  return (
    <Dialog.Root open={true} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg">
          <Dialog.Title className="text-lg font-bold mb-4">Create New Booking</Dialog.Title>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Guest ID</label>
                <input
                  type="number"
                  name="guest_id"
                  value={formData.guest_id}
                  onChange={handleInputChange}
                  placeholder="Guest ID"
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Room ID</label>
                <input
                  type="number"
                  name="room_id"
                  value={formData.room_id}
                  onChange={handleInputChange}
                  placeholder="Room ID"
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Check-in Date</label>
                <input
                  type="date"
                  name="check_in_date"
                  value={formData.check_in_date}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  min={today}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Check-out Date</label>
                <input
                  type="date"
                  name="check_out_date"
                  value={formData.check_out_date}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  min={formData.check_in_date}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="confirmed">Confirmed</option>
                  <option value="checked_in">Checked In</option>
                  <option value="checked_out">Checked Out</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Create Booking
              </button>
            </div>
          </form>
          <Dialog.Description className="sr-only">
            Form for creating a new booking with guest and room details
          </Dialog.Description>
          <Dialog.Close asChild>
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              <span className="sr-only">Close</span>
              ×
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default BookingForm;
