import { useState } from 'react';
import { X, Calendar, DollarSign } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Pass } from '../../types';

interface Props {
  onClose: () => void;
  onCreated: (pass: Pass) => void;
}

const PASS_PRICES = {
  monthly: { male: 800, female: 0 },
  quarterly: { male: 2100, female: 0 },
  annual: { male: 7500, female: 0 },
};

export function CreatePassModal({ onClose, onCreated }: Props) {
  const { user } = useAuth();
  const [passType, setPassType] = useState<'monthly' | 'quarterly' | 'annual'>('monthly');

  const isFree = user?.gender === 'female';
  const price = isFree ? 0 : PASS_PRICES[passType].male;

  const getValidityDays = (type: string) => {
    switch (type) {
      case 'monthly':
        return 30;
      case 'quarterly':
        return 90;
      case 'annual':
        return 365;
      default:
        return 30;
    }
  };

  const handleCreatePass = () => {
    const validFrom = new Date();
    const validUntil = new Date();
    validUntil.setDate(validUntil.getDate() + getValidityDays(passType));

    const newPass: Pass = {
      id: `pass-${Date.now()}`,
      userId: user?.id || '',
      passType,
      isFree,
      validFrom,
      validUntil,
      amountPaid: price,
      qrCode: `PASS-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      isActive: true,
    };

    onCreated(newPass);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full">
        <div className="border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Get New Pass</h2>
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
                You are eligible for a free pass! Select your preferred duration below.
              </p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Pass Type
            </label>
            <div className="grid md:grid-cols-3 gap-4">
              <PassTypeCard
                type="monthly"
                selected={passType === 'monthly'}
                price={PASS_PRICES.monthly[isFree ? 'female' : 'male']}
                duration="30 days"
                onClick={() => setPassType('monthly')}
              />
              <PassTypeCard
                type="quarterly"
                selected={passType === 'quarterly'}
                price={PASS_PRICES.quarterly[isFree ? 'female' : 'male']}
                duration="90 days"
                onClick={() => setPassType('quarterly')}
              />
              <PassTypeCard
                type="annual"
                selected={passType === 'annual'}
                price={PASS_PRICES.annual[isFree ? 'female' : 'male']}
                duration="365 days"
                onClick={() => setPassType('annual')}
              />
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Pass Summary</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Pass Type</span>
                <span className="font-semibold capitalize">{passType}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Validity Period</span>
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-gray-400" />
                  <span className="font-semibold">{getValidityDays(passType)} days</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Valid From</span>
                <span className="font-semibold">{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Valid Until</span>
                <span className="font-semibold">
                  {new Date(
                    Date.now() + getValidityDays(passType) * 24 * 60 * 60 * 1000
                  ).toLocaleDateString()}
                </span>
              </div>
              {isFree && (
                <div className="flex items-center justify-between text-green-600 pt-3 border-t">
                  <span className="font-semibold">Discount (Free Pass)</span>
                  <span className="font-semibold">
                    -₹{PASS_PRICES[passType].male.toFixed(2)}
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between text-lg font-bold pt-3 border-t">
                <span>Total Amount</span>
                <div className="flex items-center gap-2">
                  <DollarSign size={20} className="text-blue-600" />
                  <span className="text-blue-600">₹{price.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Benefits:</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Unlimited travel on all DTC buses</li>
              <li>• Valid across all routes and bus types</li>
              <li>• Skip ticket queues with digital pass</li>
              <li>• Easy validation with QR code</li>
            </ul>
          </div>
        </div>

        <div className="border-t px-6 py-4 flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleCreatePass}
            className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            {isFree ? 'Get Free Pass' : 'Purchase Pass'}
          </button>
        </div>
      </div>
    </div>
  );
}

interface PassTypeCardProps {
  type: string;
  selected: boolean;
  price: number;
  duration: string;
  onClick: () => void;
}

function PassTypeCard({ type, selected, price, duration, onClick }: PassTypeCardProps) {
  return (
    <button
      onClick={onClick}
      className={`p-6 rounded-xl border-2 transition text-left ${
        selected
          ? 'border-blue-600 bg-blue-50'
          : 'border-gray-200 hover:border-gray-300 bg-white'
      }`}
    >
      <h3 className="font-bold text-lg capitalize mb-2">{type}</h3>
      <p className="text-sm text-gray-600 mb-3">{duration}</p>
      <p className="text-2xl font-bold text-blue-600">
        {price === 0 ? 'FREE' : `₹${price}`}
      </p>
    </button>
  );
}
