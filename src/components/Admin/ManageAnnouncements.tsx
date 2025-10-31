import { useState } from 'react';
import { Bell, Plus, CreditCard as Edit, Trash2, AlertCircle } from 'lucide-react';
import { mockAnnouncements } from '../../data/mockData';

export function ManageAnnouncements() {
  const [announcements] = useState(mockAnnouncements);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-700';
      case 'high':
        return 'bg-orange-100 text-orange-700';
      case 'medium':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Manage Announcements</h2>
          <p className="text-gray-600">Create and manage system-wide announcements</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center gap-2"
        >
          <Plus size={20} />
          New Announcement
        </button>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        {['urgent', 'high', 'medium', 'low'].map((priority) => {
          const count = announcements.filter((a) => a.priority === priority && a.isActive).length;
          return (
            <div key={priority} className="bg-white rounded-xl shadow-lg p-6">
              <div className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold uppercase mb-3 ${getPriorityColor(priority)}`}>
                {priority}
              </div>
              <p className="text-3xl font-bold text-gray-900">{count}</p>
              <p className="text-sm text-gray-600">Active</p>
            </div>
          );
        })}
      </div>

      <div className="space-y-4">
        {announcements.map((announcement) => (
          <div
            key={announcement.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Bell size={24} className="text-blue-600" />
                    <h3 className="font-bold text-xl text-gray-900">
                      {announcement.title}
                    </h3>
                  </div>
                  <p className="text-gray-700 mb-3">{announcement.message}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${getPriorityColor(
                      announcement.priority
                    )}`}
                  >
                    {announcement.priority}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      announcement.isActive
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {announcement.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>
                    Created: {new Date(announcement.createdAt).toLocaleDateString()}
                  </span>
                  {announcement.expiresAt && (
                    <span>
                      Expires: {new Date(announcement.expiresAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition">
                    <Edit size={16} />
                    Edit
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition">
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
          <AlertCircle size={20} className="text-blue-600" />
          Announcement Guidelines
        </h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>• Use URGENT priority for critical service disruptions</li>
          <li>• Use HIGH priority for important updates affecting multiple routes</li>
          <li>• Use MEDIUM priority for general service updates</li>
          <li>• Use LOW priority for informational messages</li>
          <li>• Set expiry dates for time-sensitive announcements</li>
        </ul>
      </div>
    </div>
  );
}
