import { Bus, Route, MapPin, Users, Ticket, CreditCard, TrendingUp, AlertTriangle } from 'lucide-react';
import { mockBuses, mockBusRoutes, mockBusStops, mockAnnouncements } from '../../data/mockData';

export function Statistics() {
  const activeBuses = mockBuses.filter((b) => b.isActive).length;
  const totalBuses = mockBuses.length;
  const activeRoutes = mockBusRoutes.filter((r) => r.isActive).length;
  const totalRoutes = mockBusRoutes.length;
  const totalStops = mockBusStops.length;
  const activeAnnouncements = mockAnnouncements.filter((a) => a.isActive).length;

  const stats = [
    {
      label: 'Active Buses',
      value: activeBuses,
      total: totalBuses,
      icon: Bus,
      color: 'blue',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600',
    },
    {
      label: 'Active Routes',
      value: activeRoutes,
      total: totalRoutes,
      icon: Route,
      color: 'green',
      bgColor: 'bg-green-100',
      textColor: 'text-green-600',
    },
    {
      label: 'Bus Stops',
      value: totalStops,
      icon: MapPin,
      color: 'orange',
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-600',
    },
    {
      label: 'Announcements',
      value: activeAnnouncements,
      icon: AlertTriangle,
      color: 'red',
      bgColor: 'bg-red-100',
      textColor: 'text-red-600',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">System Overview</h2>
        <p className="text-gray-600">Real-time statistics and system status</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <Icon size={24} className={stat.textColor} />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">
                {stat.value}
                {stat.total && <span className="text-lg text-gray-400">/{stat.total}</span>}
              </h3>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp size={24} className="text-blue-600" />
            Bus Type Distribution
          </h3>
          <div className="space-y-4">
            {['AC', 'Non-AC', 'Electric'].map((type) => {
              const count = mockBuses.filter((b) => b.busType === type).length;
              const percentage = (count / totalBuses) * 100;
              return (
                <div key={type}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-700">{type}</span>
                    <span className="text-sm text-gray-600">
                      {count} ({percentage.toFixed(0)}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        type === 'AC'
                          ? 'bg-blue-600'
                          : type === 'Electric'
                          ? 'bg-green-600'
                          : 'bg-gray-600'
                      }`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Users size={24} className="text-green-600" />
            Recent Activity
          </h3>
          <div className="space-y-4">
            <ActivityItem
              icon={Bus}
              title="Bus DL-1PC-7845 now active"
              time="5 minutes ago"
              color="blue"
            />
            <ActivityItem
              icon={Ticket}
              title="247 tickets validated today"
              time="1 hour ago"
              color="green"
            />
            <ActivityItem
              icon={CreditCard}
              title="89 new passes issued"
              time="2 hours ago"
              color="orange"
            />
            <ActivityItem
              icon={AlertTriangle}
              title="New announcement posted"
              time="3 hours ago"
              color="red"
            />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg p-8 text-white">
        <h3 className="text-2xl font-bold mb-2">System Status: Operational</h3>
        <p className="text-blue-100 mb-6">
          All systems are running smoothly. {activeBuses} buses currently on routes with
          real-time tracking enabled.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <p className="text-sm text-blue-100 mb-1">Average Bus Speed</p>
            <p className="text-2xl font-bold">32 km/h</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <p className="text-sm text-blue-100 mb-1">On-Time Performance</p>
            <p className="text-2xl font-bold">87%</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <p className="text-sm text-blue-100 mb-1">Daily Passengers</p>
            <p className="text-2xl font-bold">24.5K</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActivityItem({ icon: Icon, title, time, color }) {
  const colors = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    orange: 'bg-orange-100 text-orange-600',
    red: 'bg-red-100 text-red-600',
  };

  return (
    <div className="flex items-center gap-3">
      <div className={`p-2 rounded-lg ${colors[color]}`}>
        <Icon size={16} />
      </div>
      <div className="flex-1">
        <p className="font-semibold text-gray-900 text-sm">{title}</p>
        <p className="text-xs text-gray-500">{time}</p>
      </div>
    </div>
  );
}
