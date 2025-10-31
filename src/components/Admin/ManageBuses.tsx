import { useState } from 'react';
import { Bus, Search, Plus, CreditCard as Edit, Trash2, MapPin } from 'lucide-react';
import { mockBuses, mockBusRoutes } from '../../data/mockData';

export function ManageBuses() {
  const [searchTerm, setSearchTerm] = useState('');
  const [buses] = useState(mockBuses);

  const filteredBuses = buses.filter((bus) =>
    bus.busNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Manage Buses</h2>
          <p className="text-gray-600">Monitor and manage all DTC buses</p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center gap-2">
          <Plus size={20} />
          Add Bus
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by bus number..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Bus Number</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Route</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Type</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Capacity</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Location</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBuses.map((bus) => {
                const route = mockBusRoutes.find((r) => r.id === bus.routeId);
                return (
                  <tr key={bus.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Bus size={18} className="text-blue-600" />
                        <span className="font-semibold">{bus.busNumber}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      {route ? (
                        <div>
                          <p className="font-semibold text-sm">{route.routeNumber}</p>
                          <p className="text-xs text-gray-600">{route.routeName}</p>
                        </div>
                      ) : (
                        <span className="text-gray-400 text-sm">Not assigned</span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          bus.busType === 'AC'
                            ? 'bg-blue-100 text-blue-700'
                            : bus.busType === 'Electric'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {bus.busType}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-700">{bus.capacity}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          bus.isActive
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {bus.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      {bus.currentLatitude && bus.currentLongitude ? (
                        <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm">
                          <MapPin size={14} />
                          <span>View</span>
                        </button>
                      ) : (
                        <span className="text-gray-400 text-sm">N/A</span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition">
                          <Edit size={16} />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
