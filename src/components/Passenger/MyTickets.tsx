import { useState, useEffect } from 'react';
import { Ticket as TicketIcon, Plus, QrCode, Calendar, MapPin, DollarSign } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Ticket } from '../../types';
import { BookTicketModal } from './BookTicketModal';

export function MyTickets() {
  const { user } = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [showBookModal, setShowBookModal] = useState(false);

  useEffect(() => {
    const storedTickets = localStorage.getItem(`tickets_${user?.id}`);
    if (storedTickets) {
      setTickets(JSON.parse(storedTickets));
    }
  }, [user]);

  const handleTicketBooked = (newTicket: Ticket) => {
    const updatedTickets = [newTicket, ...tickets];
    setTickets(updatedTickets);
    localStorage.setItem(`tickets_${user?.id}`, JSON.stringify(updatedTickets));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">My Tickets</h2>
        <button
          onClick={() => setShowBookModal(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center gap-2"
        >
          <Plus size={20} />
          Book Ticket
        </button>
      </div>

      {tickets.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <TicketIcon size={64} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Tickets Yet</h3>
          <p className="text-gray-600 mb-6">Book your first ticket to get started</p>
          <button
            onClick={() => setShowBookModal(true)}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition inline-flex items-center gap-2"
          >
            <Plus size={20} />
            Book Ticket
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      )}

      {showBookModal && (
        <BookTicketModal
          onClose={() => setShowBookModal(false)}
          onBooked={handleTicketBooked}
        />
      )}
    </div>
  );
}

function TicketCard({ ticket }: { ticket: Ticket }) {
  const [showQR, setShowQR] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <TicketIcon size={24} />
            <div>
              <h3 className="font-bold text-lg">Journey Ticket</h3>
              <p className="text-sm text-blue-100">
                {ticket.route?.routeName || 'Route not found'}
              </p>
            </div>
          </div>
          {ticket.isFree && (
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              FREE
            </span>
          )}
        </div>
      </div>

      <div className="p-6">
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">From</p>
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-green-600" />
              <span className="font-semibold text-gray-900">
                {ticket.fromStop?.stopName || 'Unknown'}
              </span>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">To</p>
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-red-600" />
              <span className="font-semibold text-gray-900">
                {ticket.toStop?.stopName || 'Unknown'}
              </span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">Journey Date</p>
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-gray-400" />
              <span className="font-semibold text-gray-900">
                {new Date(ticket.journeyDate).toLocaleDateString()}
              </span>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Fare</p>
            <div className="flex items-center gap-2">
              <DollarSign size={16} className="text-gray-400" />
              <span className="font-semibold text-gray-900">
                ₹{ticket.fareAmount.toFixed(2)}
              </span>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Status</p>
            <span
              className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                ticket.isValidated
                  ? 'bg-gray-100 text-gray-700'
                  : 'bg-green-100 text-green-700'
              }`}
            >
              {ticket.isValidated ? 'Used' : 'Valid'}
            </span>
          </div>
        </div>

        <button
          onClick={() => setShowQR(!showQR)}
          className="w-full bg-blue-50 text-blue-700 py-3 rounded-lg font-semibold hover:bg-blue-100 transition flex items-center justify-center gap-2"
        >
          <QrCode size={20} />
          {showQR ? 'Hide QR Code' : 'Show QR Code'}
        </button>

        {showQR && (
          <div className="mt-4 p-6 bg-gray-50 rounded-lg text-center">
            <div className="bg-white inline-block p-4 rounded-lg">
              <div className="w-48 h-48 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                <QrCode size={120} className="text-blue-600" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-4 font-mono">{ticket.qrCode}</p>
          </div>
        )}
      </div>
    </div>
  );
}
