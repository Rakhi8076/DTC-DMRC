import { useState, useEffect } from 'react';
import { CreditCard, Plus, QrCode, Calendar, DollarSign } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Pass } from '../../types';
import { CreatePassModal } from './CreatePassModal';

export function MyPasses() {
  const { user } = useAuth();
  const [passes, setPasses] = useState<Pass[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    const storedPasses = localStorage.getItem(`passes_${user?.id}`);
    if (storedPasses) {
      setPasses(JSON.parse(storedPasses));
    }
  }, [user]);

  const handlePassCreated = (newPass: Pass) => {
    const updatedPasses = [newPass, ...passes];
    setPasses(updatedPasses);
    localStorage.setItem(`passes_${user?.id}`, JSON.stringify(updatedPasses));
  };

  const activePasses = passes.filter(
    (p) => p.isActive && new Date(p.validUntil) >= new Date()
  );
  const expiredPasses = passes.filter(
    (p) => !p.isActive || new Date(p.validUntil) < new Date()
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">My Passes</h2>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center gap-2"
        >
          <Plus size={20} />
          Get New Pass
        </button>
      </div>

      {user?.gender === 'female' && (
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-6 mb-6">
          <h3 className="text-xl font-bold mb-2">Free Pass Program</h3>
          <p className="text-green-50">
            As a female passenger, you are eligible for free monthly, quarterly, and annual
            passes. Travel anywhere without any cost!
          </p>
        </div>
      )}

      {passes.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <CreditCard size={64} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Passes Yet</h3>
          <p className="text-gray-600 mb-6">
            Get a pass for unlimited travel on all DTC buses
          </p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition inline-flex items-center gap-2"
          >
            <Plus size={20} />
            Get Pass
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {activePasses.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Active Passes ({activePasses.length})
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {activePasses.map((pass) => (
                  <PassCard key={pass.id} pass={pass} />
                ))}
              </div>
            </div>
          )}

          {expiredPasses.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Expired Passes ({expiredPasses.length})
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {expiredPasses.map((pass) => (
                  <PassCard key={pass.id} pass={pass} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {showCreateModal && (
        <CreatePassModal
          onClose={() => setShowCreateModal(false)}
          onCreated={handlePassCreated}
        />
      )}
    </div>
  );
}

function PassCard({ pass }: { pass: Pass }) {
  const [showQR, setShowQR] = useState(false);
  const isExpired = new Date(pass.validUntil) < new Date() || !pass.isActive;
  const daysLeft = Math.ceil(
    (new Date(pass.validUntil).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className={`rounded-xl shadow-lg overflow-hidden ${isExpired ? 'opacity-75' : ''}`}>
      <div
        className={`${
          pass.isFree
            ? 'bg-gradient-to-r from-green-500 to-green-600'
            : 'bg-gradient-to-r from-blue-600 to-blue-700'
        } text-white p-6`}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <CreditCard size={24} />
            <div>
              <h3 className="font-bold text-lg capitalize">{pass.passType} Pass</h3>
              <p className="text-sm text-white opacity-90">DTC Travel Pass</p>
            </div>
          </div>
          {pass.isFree && (
            <span className="bg-white text-green-600 px-3 py-1 rounded-full text-xs font-semibold">
              FREE
            </span>
          )}
        </div>
      </div>

      <div className="bg-white p-6">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">Valid From</p>
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-gray-400" />
              <span className="font-semibold text-gray-900">
                {new Date(pass.validFrom).toLocaleDateString()}
              </span>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Valid Until</p>
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-gray-400" />
              <span className="font-semibold text-gray-900">
                {new Date(pass.validUntil).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {!isExpired && daysLeft <= 7 && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-4">
            <p className="text-sm text-orange-800 font-semibold">
              Expires in {daysLeft} {daysLeft === 1 ? 'day' : 'days'}
            </p>
          </div>
        )}

        {isExpired && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <p className="text-sm text-red-800 font-semibold">This pass has expired</p>
          </div>
        )}

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <DollarSign size={16} className="text-gray-400" />
            <span className="font-semibold text-gray-900">₹{pass.amountPaid.toFixed(2)}</span>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              isExpired
                ? 'bg-red-100 text-red-700'
                : 'bg-green-100 text-green-700'
            }`}
          >
            {isExpired ? 'Expired' : 'Active'}
          </span>
        </div>

        {!isExpired && (
          <button
            onClick={() => setShowQR(!showQR)}
            className="w-full bg-blue-50 text-blue-700 py-3 rounded-lg font-semibold hover:bg-blue-100 transition flex items-center justify-center gap-2"
          >
            <QrCode size={20} />
            {showQR ? 'Hide QR Code' : 'Show QR Code'}
          </button>
        )}

        {showQR && !isExpired && (
          <div className="mt-4 p-6 bg-gray-50 rounded-lg text-center">
            <div className="bg-white inline-block p-4 rounded-lg">
              <div className="w-48 h-48 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center">
                <QrCode size={120} className="text-green-600" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-4 font-mono">{pass.qrCode}</p>
          </div>
        )}
      </div>
    </div>
  );
}
