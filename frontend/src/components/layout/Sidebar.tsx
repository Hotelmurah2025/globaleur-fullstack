import { Hotel, Users, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

export const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-4 fixed left-0 top-0">
      <div className="mb-8">
        <h1 className="text-xl font-bold">Hotel PMS</h1>
      </div>

      <nav className="space-y-4">
        <Link to="/rooms" className="flex items-center space-x-2 p-2 hover:bg-gray-800 rounded">
          <Hotel size={20} />
          <span>Rooms</span>
        </Link>

        <Link to="/bookings" className="flex items-center space-x-2 p-2 hover:bg-gray-800 rounded">
          <Calendar size={20} />
          <span>Bookings</span>
        </Link>

        <Link to="/guests" className="flex items-center space-x-2 p-2 hover:bg-gray-800 rounded">
          <Users size={20} />
          <span>Guests</span>
        </Link>
      </nav>
    </div>
  );
};
