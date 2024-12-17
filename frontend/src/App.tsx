import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';
import { RoomList } from './components/rooms/RoomList';
import { BookingList } from './components/bookings/BookingList';
import { GuestList } from './components/guests/GuestList';
import './App.css';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <main className="flex-1 ml-64 p-8">
          <Routes>
            <Route path="/" element={<div className="text-2xl font-bold">Welcome to Hotel PMS</div>} />
            <Route path="/rooms" element={<RoomList />} />
            <Route path="/bookings" element={<BookingList />} />
            <Route path="/guests" element={<GuestList />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
