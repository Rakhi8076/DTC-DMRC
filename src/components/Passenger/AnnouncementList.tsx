import { Bell, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { mockAnnouncements } from '../../data/mockData';

export function AnnouncementList() {
  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return <AlertCircle size={24} className="text-red-600" />;
      case 'high':
        return <AlertTriangle size={24} className="text-orange-600" />;
      case 'medium':
        return <Bell size={24} className="text-blue-600" />;
      default:
        return <Info size={24} className="text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-50 border-red-200';
      case 'high':
        return 'bg-orange-50 border-orange-200';
      case 'medium':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getPriorityBadge = (priority: string) => {
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

  const activeAnnouncements = mockAnnouncements.filter((a) => a.isActive);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Bell size={32} className="text-blue-600" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Announcements & Alerts</h2>
            <p className="text-sm text-gray-600">
              Stay updated with latest news and service updates
            </p>
          </div>
        </div>
      </div>

      {activeAnnouncements.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <Bell size={64} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No Active Announcements
          </h3>
          <p className="text-gray-600">Check back later for updates</p>
        </div>
      ) : (
        <div className="space-y-4">
          {activeAnnouncements
            .sort((a, b) => {
              const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 };
              return priorityOrder[a.priority] - priorityOrder[b.priority];
            })
            .map((announcement) => (
              <div
                key={announcement.id}
                className={`rounded-xl shadow-lg overflow-hidden border-2 ${getPriorityColor(
                  announcement.priority
                )}`}
              >
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      {getPriorityIcon(announcement.priority)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <h3 className="font-bold text-xl text-gray-900">
                          {announcement.title}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold uppercase whitespace-nowrap ${getPriorityBadge(
                            announcement.priority
                          )}`}
                        >
                          {announcement.priority}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-4 leading-relaxed">
                        {announcement.message}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>
                          Posted: {new Date(announcement.createdAt).toLocaleDateString()}
                        </span>
                        {announcement.expiresAt && (
                          <span>
                            Expires: {new Date(announcement.expiresAt).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
          <Info size={20} className="text-blue-600" />
          How to stay updated
        </h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">•</span>
            <span>Check this page regularly for important service updates</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">•</span>
            <span>Urgent announcements will be highlighted at the top</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">•</span>
            <span>Follow DTC official channels for real-time updates</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
