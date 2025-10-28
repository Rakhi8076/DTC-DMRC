import { Bell } from "lucide-react";

export const NewsTicker = () => {
  const news = [
    "New EV buses introduced on Route 44A from 1st January 2025",
    "Metro Line Extension: Pink Line extended to Maujpur - Opening February 2025",
    "DTC introduces real-time bus tracking on mobile app",
    "Special shuttle services during Republic Day celebrations",
    "New integrated ticket system for Bus & Metro coming soon",
  ];

  return (
    <div className="bg-secondary text-secondary-foreground py-3 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 font-bold whitespace-nowrap">
            <Bell className="h-5 w-5" />
            <span className="text-sm uppercase">Latest Updates</span>
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="flex gap-8 animate-slide-left whitespace-nowrap">
              {[...news, ...news].map((item, index) => (
                <span key={index} className="text-sm font-medium">
                  • {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
