import { useState, useEffect } from 'react';
import { MapPin, Clock, Navigation, Search } from 'lucide-react';
import { mockBuses, mockBusRoutes, getRouteById } from '../../data/mockData';
import { Bus } from '../../types';

export function LiveTracking() {
  const [searchBusNumber, setSearchBusNumber] = useState('');
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
  const [eta, setEta] = useState<number>(0);

  useEffect(() => {
    if (selectedBus) {
      setEta(Math.floor(Math.random() * 15) + 5);
    }
  }, [selectedBus]);

  const handleSearchBus = () => {
    const bus = mockBuses.find(
      (b) => b.busNumber.toLowerCase().includes(searchBusNumber.toLowerCase())
    );
    setSelectedBus(bus || null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Live Bus Tracking</h2>

        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              value={searchBusNumber}
              onChange={(e) => setSearchBusNumber(e.target.value)}
              placeholder="Enter bus number (e.g., DL-1PC-7845)"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && handleSearchBus()}
            />
          </div>
          <button
            onClick={handleSearchBus}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>

        {selectedBus && (
          <div className="border-t pt-6">
            <BusTrackingCard bus={selectedBus} eta={eta} />
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <h3 className="text-xl font-bold text-gray-900 md:col-span-2">
          Active Buses ({mockBuses.filter((b) => b.isActive).length})
        </h3>
        {mockBuses
          .filter((b) => b.isActive)
          .map((bus) => (
            <BusCard
              key={bus.id}
              bus={bus}
              onTrack={() => setSelectedBus(bus)}
            />
          ))}
      </div>
    </div>
  );
}

function BusTrackingCard({ bus, eta }: { bus: Bus; eta: number }) {
  const route = bus.routeId ? getRouteById(bus.routeId) : null;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{bus.busNumber}</h3>
          <p className="text-sm text-gray-600">
            {route ? route.routeName : 'No route assigned'}
          </p>
        </div>
        <div className="bg-green-500 text-white px-4 py-2 rounded-full font-semibold flex items-center gap-2">
          <Navigation size={18} />
          Live
        </div>
      </div>

      <div className="bg-white rounded-lg p-4 mb-4">
        <div className="flex items-center gap-3 mb-3">
          <Clock size={24} className="text-blue-600" />
          <div>
            <p className="text-sm text-gray-600">Estimated Time of Arrival</p>
            <p className="text-2xl font-bold text-blue-600">{eta} minutes</p>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${Math.max(10, 100 - eta * 5)}%` }}
          ></div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-1">Capacity</p>
          <p className="text-xl font-bold text-gray-900">{bus.capacity} seats</p>
        </div>
        <div className="bg-white rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-1">Bus Type</p>
          <p className="text-xl font-bold text-gray-900">{bus.busType}</p>
        </div>
      </div>

      {bus.currentLatitude && bus.currentLongitude && (
        <div className="mt-4 bg-white rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-2">Current Location</p>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <MapPin size={16} className="text-red-500" />
            <span>
              {bus.currentLatitude.toFixed(4)}°N, {bus.currentLongitude.toFixed(4)}°E
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

function BusCard({ bus, onTrack }: { bus: Bus; onTrack: () => void }) {
  const route = bus.routeId ? getRouteById(bus.routeId) : null;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-bold text-lg text-gray-900">{bus.busNumber}</h3>
          <p className="text-sm text-gray-600">{route?.routeNumber || 'N/A'}</p>
        </div>
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
      </div>

      {route && (
        <p className="text-sm text-gray-600 mb-4">{route.routeName}</p>
      )}

      <button
        onClick={onTrack}
        className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
      >
        <Navigation size={18} />
        Track Bus
      </button>
    </div>
  );
}
