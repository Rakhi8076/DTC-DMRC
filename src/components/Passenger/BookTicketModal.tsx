import { useState } from 'react';
import { X, MapPin, Calendar, DollarSign } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { mockBusRoutes, mockBusStops, getRouteStops, getStopById } from '../../data/mockData';
import { Ticket } from '../../types';

interface Props {
  onClose: () => void;
  onBooked: (ticket: Ticket) => void;
}

export function BookTicketModal({ onClose, onBooked }: Props) {
  const { user } = useAuth();
  const [routeId, setRouteId] = useState('');
  const [fromStopId, setFromStopId] = useState('');
  const [toStopId, setToStopId] = useState('');
  const [journeyDate, setJourneyDate] = useState(
    new Date().toISOString().split('T')[0]
  );

  const selectedRoute = mockBusRoutes.find((r) => r.id === routeId);
  const routeStops = routeId ? getRouteStops(routeId) : [];

  const calculateFare = () => {
    if (!fromStopId || !toStopId || !selectedRoute) return 0;

    const fromStop = routeStops.find((rs) => rs.stopId === fromStopId);
    const toStop = routeStops.find((rs) => rs.stopId === toStopId);

    if (!fromStop || !toStop) return 0;

    const distance = Math.abs(toStop.distanceFromStart - fromStop.distanceFromStart);
    return distance * selectedRoute.farePerKm;
  };

  const fare = calculateFare();
  const isFree = user?.gender === 'female';

  const handleBookTicket = () => {
    const newTicket: Ticket = {
      id: `ticket-${Date.now()}`,
      userId: user?.id || '',
      routeId,
      fromStopId,
      toStopId,
      fareAmount: isFree ? 0 : fare,
      isFree,
      bookingTime: new Date(),
      journeyDate: new Date(journeyDate),
      qrCode: `QR-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      isValidated: false,
      route: selectedRoute,
      fromStop: getStopById(fromStopId),
      toStop: getStopById(toStopId),
    };

    onBooked(newTicket);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Book Ticket</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {isFree && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800 font-semibold">
                You are eligible for free travel! No payment required.
              </p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Route
            </label>
            <select
              value={routeId}
              onChange={(e) => {
                setRouteId(e.target.value);
                setFromStopId('');
                setToStopId('');
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Choose a route</option>
              {mockBusRoutes.map((route) => (
                <option key={route.id} value={route.id}>
                  {route.routeNumber} - {route.routeName}
                </option>
              ))}
            </select>
          </div>

          {routeId && (
            <>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    From Stop
                  </label>
                  <div className="relative">
                    <MapPin
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <select
                      value={fromStopId}
                      onChange={(e) => setFromStopId(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select boarding stop</option>
                      {routeStops.map((rs) => {
                        const stop = getStopById(rs.stopId);
                        return stop ? (
                          <option key={rs.id} value={stop.id}>
                            {stop.stopName}
                          </option>
                        ) : null;
                      })}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    To Stop
                  </label>
                  <div className="relative">
                    <MapPin
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <select
                      value={toStopId}
                      onChange={(e) => setToStopId(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select destination stop</option>
                      {routeStops.map((rs) => {
                        const stop = getStopById(rs.stopId);
                        return stop ? (
                          <option key={rs.id} value={stop.id}>
                            {stop.stopName}
                          </option>
                        ) : null;
                      })}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Journey Date
                </label>
                <div className="relative">
                  <Calendar
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="date"
                    value={journeyDate}
                    onChange={(e) => setJourneyDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {fromStopId && toStopId && (
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Fare Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Base Fare</span>
                      <span className="font-semibold">₹{fare.toFixed(2)}</span>
                    </div>
                    {isFree && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount (Free Pass)</span>
                        <span className="font-semibold">-₹{fare.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="border-t pt-2 flex justify-between text-lg font-bold">
                      <span>Total Amount</span>
                      <span className="text-blue-600">
                        ₹{isFree ? '0.00' : fare.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <div className="border-t px-6 py-4 flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleBookTicket}
            disabled={!routeId || !fromStopId || !toStopId}
            className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Book Ticket
          </button>
        </div>
      </div>
    </div>
  );
}
