import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { RouteSearch } from './RouteSearch';
import { LiveTracking } from './LiveTracking';
import { MyTickets } from './MyTickets';
import { MyPasses } from './MyPasses';
import { NearestStops } from './NearestStops';
import { AnnouncementList } from './AnnouncementList';
import {
  Bus,
  MapPin,
  Ticket,
  CreditCard,
  Bell,
  LogOut,
  Search,
  Navigation,
} from 'lucide-react';

type TabType = 'search' | 'tracking' | 'tickets' | 'passes' | 'stops' | 'announcements';

export function Dashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('search');

  const tabs = [
    { id: 'search' as TabType, label: 'Search Routes', icon: Search },
    { id: 'tracking' as TabType, label: 'Live Tracking', icon: MapPin },
    { id: 'tickets' as TabType, label: 'My Tickets', icon: Ticket },
    { id: 'passes' as TabType, label: 'My Passes', icon: CreditCard },
    { id: 'stops' as TabType, label: 'Nearby Stops', icon: Navigation },
    { id: 'announcements' as TabType, label: 'Announcements', icon: Bell },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bus size={32} />
              <div>
                <h1 className="text-2xl font-bold">DTC Bus Service</h1>
                <p className="text-sm text-blue-100">Welcome, {user?.fullName}</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-800 px-4 py-2 rounded-lg transition"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <nav className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto no-scrollbar">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-4 border-b-2 transition whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600 font-semibold'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon size={18} />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {activeTab === 'search' && <RouteSearch />}
        {activeTab === 'tracking' && <LiveTracking />}
        {activeTab === 'tickets' && <MyTickets />}
        {activeTab === 'passes' && <MyPasses />}
        {activeTab === 'stops' && <NearestStops />}
        {activeTab === 'announcements' && <AnnouncementList />}
      </main>
    </div>
  );
}
