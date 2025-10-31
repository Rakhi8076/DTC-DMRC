import { useState } from 'react';
import { Search, MapPin, Clock, DollarSign, ArrowRight, Bus } from 'lucide-react';
import { mockBusRoutes, mockBusStops, getRouteStops, getStopById } from '../../data/mockData';
import { BusRoute } from '../../types';

export function RouteSearch() {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [searchResults, setSearchResults] = useState<BusRoute[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = () => {
    if (!source || !destination) return;

    const results = mockBusRoutes.filter((route) => {
      const routeText = `${route.source} ${route.destination} ${route.routeName}`.toLowerCase();
      return routeText.includes(source.toLowerCase()) && routeText.includes(destination.toLowerCase());
    });

    setSearchResults(results);
    setShowResults(true);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Find Your Bus Route</h2>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Source
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                placeholder="Enter starting point"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                list="source-stops"
              />
              <datalist id="source-stops">
                {mockBusStops.map((stop) => (
                  <option key={stop.id} value={stop.stopName} />
                ))}
              </datalist>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Destination
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Enter destination"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                list="destination-stops"
              />
              <datalist id="destination-stops">
                {mockBusStops.map((stop) => (
                  <option key={stop.id} value={stop.stopName} />
                ))}
              </datalist>
            </div>
          </div>
        </div>

        <button
          onClick={handleSearch}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
        >
          <Search size={20} />
          Search Routes
        </button>
      </div>

      {showResults && (
        <div className="space-y-4">
          {searchResults.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <Bus size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Routes Found</h3>
              <p className="text-gray-600">Try searching with different locations</p>
            </div>
          ) : (
            <>
              <h3 className="text-xl font-bold text-gray-900">
                Available Routes ({searchResults.length})
              </h3>
              {searchResults.map((route) => (
                <RouteCard key={route.id} route={route} />
              ))}
            </>
          )}
        </div>
      )}

      {!showResults && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bus size={32} className="text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">All Routes</h3>
            <p className="text-3xl font-bold text-blue-600">{mockBusRoutes.length}</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin size={32} className="text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Bus Stops</h3>
            <p className="text-3xl font-bold text-green-600">{mockBusStops.length}</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center md:col-span-2 lg:col-span-1">
            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock size={32} className="text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Avg Duration</h3>
            <p className="text-3xl font-bold text-orange-600">55 min</p>
          </div>
        </div>
      )}
    </div>
  );
}

function RouteCard({ route }: { route: BusRoute }) {
  const routeStops = getRouteStops(route.id);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
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
      </div>

      <div className="flex items-center gap-4 mb-4 text-gray-700">
        <div className="flex items-center gap-2">
          <MapPin size={18} className="text-green-600" />
          <span className="font-semibold">{route.source}</span>
        </div>
        <ArrowRight size={20} className="text-gray-400" />
        <div className="flex items-center gap-2">
          <MapPin size={18} className="text-red-600" />
          <span className="font-semibold">{route.destination}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock size={16} />
          <span>{route.estimatedDuration} min</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin size={16} />
          <span>{route.distanceKm} km</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <DollarSign size={16} />
          <span>₹{route.farePerKm}/km</span>
        </div>
      </div>

      {routeStops.length > 0 && (
        <div className="border-t pt-4">
          <p className="text-sm font-semibold text-gray-700 mb-2">
            Major Stops ({routeStops.length})
          </p>
          <div className="flex flex-wrap gap-2">
            {routeStops.slice(0, 4).map((rs) => {
              const stop = getStopById(rs.stopId);
              return stop ? (
                <span
                  key={rs.id}
                  className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
                >
                  {stop.stopName}
                </span>
              ) : null;
            })}
            {routeStops.length > 4 && (
              <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                +{routeStops.length - 4} more
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
