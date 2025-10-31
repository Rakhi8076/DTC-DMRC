import { useState } from 'react';
import { Users, MapPin, TrendingUp, AlertCircle } from 'lucide-react';
import { mockBusStops } from '../../data/mockData';

interface CrowdDataItem {
  id: string;
  stopId: string;
  crowdLevel: 'low' | 'medium' | 'high' | 'critical';
  passengerCount: number;
  recommendedFrequency: number;
}

export function ManageCrowd() {
  const [crowdData] = useState<CrowdDataItem[]>([
    {
      id: '1',
      stopId: '1',
      crowdLevel: 'high',
      passengerCount: 120,
      recommendedFrequency: 6,
    },
    {
      id: '2',
      stopId: '5',
      crowdLevel: 'critical',
      passengerCount: 180,
      recommendedFrequency: 8,
    },
    {
      id: '3',
      stopId: '10',
      crowdLevel: 'medium',
      passengerCount: 80,
      recommendedFrequency: 4,
    },
    {
      id: '4',
      stopId: '14',
      crowdLevel: 'low',
      passengerCount: 35,
      recommendedFrequency: 3,
    },
  ]);

  const getCrowdLevelColor = (level: string) => {
    switch (level) {
      case 'critical':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default:
        return 'bg-green-100 text-green-700 border-green-200';
    }
  };

  const getCrowdIcon = (level: string) => {
    switch (level) {
      case 'critical':
      case 'high':
        return <AlertCircle size={24} className="text-red-600" />;
      default:
        return <Users size={24} className="text-blue-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Crowd Management</h2>
        <p className="text-gray-600">Monitor and manage overcrowded areas</p>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        {['low', 'medium', 'high', 'critical'].map((level) => {
          const count = crowdData.filter((d) => d.crowdLevel === level).length;
          return (
            <div key={level} className="bg-white rounded-xl shadow-lg p-6">
              <div className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold uppercase mb-3 ${getCrowdLevelColor(level)}`}>
                {level}
              </div>
              <p className="text-3xl font-bold text-gray-900">{count}</p>
              <p className="text-sm text-gray-600">Areas</p>
            </div>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {crowdData
          .sort((a, b) => {
            const order = { critical: 0, high: 1, medium: 2, low: 3 };
            return order[a.crowdLevel] - order[b.crowdLevel];
          })
          .map((data) => {
            const stop = mockBusStops.find((s) => s.id === data.stopId);
            return (
              <div
                key={data.id}
                className={`rounded-xl shadow-lg overflow-hidden border-2 ${getCrowdLevelColor(
                  data.crowdLevel
                )}`}
              >
                <div className="bg-white p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0">{getCrowdIcon(data.crowdLevel)}</div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <h3 className="font-bold text-lg text-gray-900">
                            {stop?.stopName || 'Unknown Stop'}
                          </h3>
                          <p className="text-sm text-gray-600">{stop?.area}</p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${getCrowdLevelColor(
                            data.crowdLevel
                          )}`}
                        >
                          {data.crowdLevel}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Users size={16} className="text-gray-600" />
                        <p className="text-xs text-gray-600">Passengers</p>
                      </div>
                      <p className="text-2xl font-bold text-gray-900">{data.passengerCount}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingUp size={16} className="text-gray-600" />
                        <p className="text-xs text-gray-600">Frequency</p>
                      </div>
                      <p className="text-2xl font-bold text-gray-900">
                        {data.recommendedFrequency}/hr
                      </p>
                    </div>
                  </div>

                  {(data.crowdLevel === 'high' || data.crowdLevel === 'critical') && (
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-4">
                      <p className="text-sm text-orange-800 font-semibold">
                        ⚠ Action Required: Increase bus frequency to {data.recommendedFrequency}{' '}
                        buses per hour
                      </p>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
                      Update Data
                    </button>
                    <button className="px-4 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition">
                      <MapPin size={18} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="font-bold text-gray-900 mb-3">Crowd Management Guidelines</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-green-600 font-bold">Low:</span>
            <span>Normal operations, 3-4 buses per hour</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-600 font-bold">Medium:</span>
            <span>Monitor closely, 4-5 buses per hour</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-orange-600 font-bold">High:</span>
            <span>Increase frequency, 6-7 buses per hour</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-600 font-bold">Critical:</span>
            <span>Immediate action required, 8+ buses per hour</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
