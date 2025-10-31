import { useState } from 'react';
import { Route, Search, Plus, CreditCard as Edit, Trash2, MapPin } from 'lucide-react';
import { mockBusRoutes } from '../../data/mockData';

export function ManageRoutes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [routes] = useState(mockBusRoutes);

  const filteredRoutes = routes.filter(
    (route) =>
      route.routeNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.routeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Manage Routes</h2>
          <p className="text-gray-600">Configure and monitor bus routes</p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center gap-2">
          <Plus size={20} />
          Add Route
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by route number or name..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="grid gap-4">
          {filteredRoutes.map((route) => (
            <div
              key={route.id}
              className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-600 text-white font-bold text-xl px-4 py-2 rounded-lg">
                    {route.routeNumber}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{route.routeName}</h3>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mt-1 ${
                        route.busType === 'AC'
                          ? 'bg-blue-100 text-blue-700'
                          : route.busType === 'Electric'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {route.busType}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      route.isActive
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {route.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2 text-gray-700">
                  <MapPin size={18} className="text-green-600" />
                  <div>
                    <p className="text-xs text-gray-500">From</p>
                    <p className="font-semibold">{route.source}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <MapPin size={18} className="text-red-600" />
                  <div>
                    <p className="text-xs text-gray-500">To</p>
                    <p className="font-semibold">{route.destination}</p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Distance</p>
                  <p className="font-semibold text-gray-900">{route.distanceKm} km</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Duration</p>
                  <p className="font-semibold text-gray-900">{route.estimatedDuration} min</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Fare/km</p>
                  <p className="font-semibold text-gray-900">₹{route.farePerKm}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Total Fare</p>
                  <p className="font-semibold text-gray-900">
                    ₹{(route.distanceKm * route.farePerKm).toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t">
                <button className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition">
                  <Edit size={16} />
                  Edit
                </button>
                <button className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition">
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
