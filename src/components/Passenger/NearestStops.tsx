import { useState, useEffect } from 'react';
import { MapPin, Navigation, Bus, ArrowRight } from 'lucide-react';
import { mockBusStops, mockBuses, getRouteById } from '../../data/mockData';

export function NearestStops() {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getUserLocation = () => {
    setLoading(true);
    setError('');

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLoading(false);
      },
      () => {
        setUserLocation({ lat: 28.6139, lng: 77.209 });
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const nearbyStops = userLocation
    ? mockBusStops
        .map((stop) => ({
          ...stop,
          distance: calculateDistance(
            userLocation.lat,
            userLocation.lng,
            stop.latitude,
            stop.longitude
          ),
        }))
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 8)
    : [];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Nearby Bus Stops</h2>
          <button
            onClick={getUserLocation}
            disabled={loading}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            <Navigation size={18} />
            {loading ? 'Locating...' : 'Refresh Location'}
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {userLocation && (
          <div className="bg-blue-50 rounded-lg p-4 mb-4">
            <p className="text-sm text-blue-900 font-semibold mb-1">Your Current Location</p>
            <p className="text-xs text-blue-700">
              {userLocation.lat.toFixed(4)}°N, {userLocation.lng.toFixed(4)}°E
            </p>
          </div>
        )}
      </div>

      {nearbyStops.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <MapPin size={64} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Finding nearby stops...
          </h3>
          <p className="text-gray-600">Please allow location access to continue</p>
        </div>
      ) : (
        <div className="space-y-4">
          {nearbyStops.map((stop) => (
            <StopCard key={stop.id} stop={stop} distance={stop.distance} />
          ))}
        </div>
      )}
    </div>
  );
}

function StopCard({ stop, distance }: { stop: any; distance: number }) {
  const busesAtStop = mockBuses.filter((bus) => {
    if (!bus.currentLatitude || !bus.currentLongitude) return false;
    const dist = Math.sqrt(
      Math.pow(bus.currentLatitude - stop.latitude, 2) +
        Math.pow(bus.currentLongitude - stop.longitude, 2)
    );
    return dist < 0.01;
  });

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-blue-100 p-2 rounded-lg">
              <MapPin size={24} className="text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900">{stop.stopName}</h3>
              <p className="text-sm text-gray-600">{stop.area}</p>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
            <p className="text-sm font-semibold">{distance.toFixed(2)} km</p>
          </div>
        </div>
      </div>

      <div className="border-t pt-4">
        {busesAtStop.length > 0 ? (
          <>
            <p className="text-sm font-semibold text-gray-700 mb-3">
              Buses at this stop ({busesAtStop.length})
            </p>
            <div className="space-y-2">
              {busesAtStop.map((bus) => {
                const route = bus.routeId ? getRouteById(bus.routeId) : null;
                return (
                  <div
                    key={bus.id}
                    className="flex items-center justify-between bg-gray-50 rounded-lg p-3"
                  >
                    <div className="flex items-center gap-3">
                      <Bus size={20} className="text-blue-600" />
                      <div>
                        <p className="font-semibold text-gray-900">{bus.busNumber}</p>
                        {route && (
                          <p className="text-xs text-gray-600">
                            {route.routeNumber} - {route.routeName}
                          </p>
                        )}
                      </div>
                    </div>
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
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
                );
              })}
            </div>
          </>
        ) : (
          <p className="text-sm text-gray-500 text-center py-2">No buses currently at this stop</p>
        )}
      </div>

      <div className="mt-4 pt-4 border-t">
        <button className="w-full bg-blue-50 text-blue-700 py-2 rounded-lg font-semibold hover:bg-blue-100 transition flex items-center justify-center gap-2">
          <ArrowRight size={18} />
          View Routes from here
        </button>
      </div>
    </div>
  );
}
