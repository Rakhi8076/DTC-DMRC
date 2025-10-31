import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ManageBuses } from './ManageBuses';
import { ManageRoutes } from './ManageRoutes';
import { ManageCrowd } from './ManageCrowd';
import { ValidateTickets } from './ValidateTickets';
import { ManageAnnouncements } from './ManageAnnouncements';
import { Statistics } from './Statistics';
import {
  LayoutDashboard,
  Bus,
  Route,
  Users,
  Ticket,
  Bell,
  LogOut,
} from 'lucide-react';

type TabType = 'dashboard' | 'buses' | 'routes' | 'crowd' | 'tickets' | 'announcements';

export function AdminDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');

  const tabs = [
    { id: 'dashboard' as TabType, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'buses' as TabType, label: 'Manage Buses', icon: Bus },
    { id: 'routes' as TabType, label: 'Manage Routes', icon: Route },
    { id: 'crowd' as TabType, label: 'Crowd Management', icon: Users },
    { id: 'tickets' as TabType, label: 'Validate Tickets', icon: Ticket },
    { id: 'announcements' as TabType, label: 'Announcements', icon: Bell },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-blue-700 to-blue-900 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bus size={32} />
              <div>
                <h1 className="text-2xl font-bold">DTC Admin Portal</h1>
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
        {activeTab === 'dashboard' && <Statistics />}
        {activeTab === 'buses' && <ManageBuses />}
        {activeTab === 'routes' && <ManageRoutes />}
        {activeTab === 'crowd' && <ManageCrowd />}
        {activeTab === 'tickets' && <ValidateTickets />}
        {activeTab === 'announcements' && <ManageAnnouncements />}
      </main>
    </div>
  );
}
