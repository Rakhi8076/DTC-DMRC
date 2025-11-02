import { Bus, Train, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-800 via-indigo-800 to-red-800 text-white">
      <div className="container mx-auto px-4 py-14">
        <div className="grid md:grid-cols-4 gap-10">
          {/* About */}
          <div>
            <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
              <Bus className="h-5 w-5 text-blue-300" />
              <Train className="h-5 w-5 text-red-300" />
              <span>DTC × DMRC</span>
            </h3>
            <p className="text-sm text-gray-200 leading-relaxed">
              A unified public transport system connecting every corner of Delhi through fast, safe, and sustainable travel — combining the strength of DTC and DMRC.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 border-l-4 border-blue-400 pl-2">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {["About Us", "Services", "Route Maps", "Careers", "Tenders"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-gray-200 hover:text-yellow-300 transition-colors flex items-center gap-1"
                  >
                    <span>›</span> {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4 border-l-4 border-red-400 pl-2">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-1 text-yellow-300" />
                <span>Helpline: 1800-123-4567</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-1 text-yellow-300" />
                <span>info@delhitransport.gov.in</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1 text-yellow-300" />
                <span>IP Estate, New Delhi - 110002</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-semibold text-lg mb-4 border-l-4 border-yellow-400 pl-2">Connect With Us</h3>
            <div className="flex gap-4">
              {[
                { icon: Facebook, color: "hover:text-blue-400" },
                { icon: Twitter, color: "hover:text-sky-400" },
                { icon: Instagram, color: "hover:text-pink-400" },
              ].map((item, i) => (
                <a
                  key={i}
                  href="#"
                  className={`w-10 h-10 bg-white/10 rounded-full flex items-center justify-center transition-transform hover:scale-110 ${item.color}`}
                >
                  <item.icon className="h-5 w-5" />
                </a>
              ))}
            </div>

            <div className="mt-6">
              <p className="text-xs text-gray-300 mb-2">Download Our Apps</p>
              <div className="space-y-2 text-sm">
                <a href="#" className="block hover:text-yellow-300 transition">
                  📱 One Delhi (DTC + Metro)
                </a>
                <a href="#" className="block hover:text-yellow-300 transition">
                  🚍 Track My Bus (DTC)
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 mt-10 pt-6 text-center">
          <p className="text-sm text-gray-300 mb-2">
            © 2025 Delhi Integrated Transport | Government of NCT of Delhi
          </p>
          <p className="text-xs text-gray-400 italic">
            “Connecting the Capital — One Ride at a Time”
          </p>
        </div>
      </div>
    </footer>
  );
};
