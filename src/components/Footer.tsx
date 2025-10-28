import { Bus, Train, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Bus className="h-5 w-5" />
              Delhi Transport
            </h3>
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              Integrated public transport services connecting Delhi through reliable bus and metro networks.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors">About Us</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors">Services</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors">Route Maps</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors">Careers</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors">Tenders</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-1 flex-shrink-0" />
                <span className="text-primary-foreground/80">Helpline: 1800-123-4567</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-1 flex-shrink-0" />
                <span className="text-primary-foreground/80">info@delhitransport.gov.in</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                <span className="text-primary-foreground/80">IP Estate, New Delhi - 110002</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-bold text-lg mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
            <div className="mt-6">
              <p className="text-xs text-primary-foreground/60 mb-2">Download Mobile Apps</p>
              <div className="space-y-2">
                <a href="#" className="block text-sm text-primary-foreground/80 hover:text-secondary transition-colors">
                  📱 DTC Bus App
                </a>
                <a href="#" className="block text-sm text-primary-foreground/80 hover:text-secondary transition-colors">
                  📱 Delhi Metro App
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-sm text-primary-foreground/60">
            © 2025 Delhi Integrated Transport | Government of NCT of Delhi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
