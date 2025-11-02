import { Menu, X, Accessibility, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
// ✅ CHANGE 1: Import 'Link' from react-router-dom
import { useNavigate, Link } from "react-router-dom"; 
import dtcLogo from "@/assets/dtc-logo.png";
import govtEmblem from "@/assets/govt-emblem.png";


export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Helper function to generate URL path from item name
  const getPath = (item) => {
      // Home ke liye root path '/'
      if (item === "Home") return "/";
      // Baki items ke liye slug-style path (e.g., "About Us" -> "/about-us")
      return `/${item.toLowerCase().replace(/\s/g, "-")}`;
  };

  const navItems = ["Home", "About Us", "Services", "Routes", "Fares", "Notice Board", "Contact Us"];

  return (
    <header className="sticky top-0 z-50 w-full bg-primary shadow-lg">
      {/* Top Bar */}
      <div className="border-b border-primary-foreground/20 bg-[hsl(var(--gov-header))]">
        <div className="container mx-auto flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-4">
            <button className="text-primary-foreground/90 hover:text-primary-foreground transition-colors">
              <Accessibility className="h-5 w-5" />
            </button>
            <span className="text-xs text-primary-foreground/70">
              Skip to main content
            </span>
          </div>
          <div className="flex items-center gap-4">
            {/* Login Button uses useNavigate */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/login")} 
              className="text-primary-foreground hover:bg-primary-foreground/10"
            >
              <User className="h-4 w-4 mr-2" />
              Login
            </Button>

            <select className="bg-transparent border border-primary-foreground/30 text-primary-foreground text-sm px-2 py-1 rounded">
              <option>English</option>
              <option>हिंदी</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title - Logo should also link to Home */}
          {/* Logo ko Link se wrap kar diya, 'to' prop mein Home ka path '/' */}
          <Link to="/" className="flex items-center gap-4"> 
            <img src={dtcLogo} alt="DTC Logo" className="h-16 w-16" />
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-primary-foreground">
                Delhi Integrated Transport
              </h1>
              <p className="text-sm text-primary-foreground/80">
                DTC & DMRC | Government of NCT of Delhi
              </p>
            </div>
          </Link>

          {/* Right side logos */}
          <div className="hidden md:flex items-center gap-4">
            <img src={govtEmblem} alt="Government Emblem" className="h-16 w-16" />
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-primary-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav
        className={`bg-primary border-t border-primary-foreground/20 ${
          mobileMenuOpen ? "block" : "hidden md:block"
        }`}
      >
        <div className="container mx-auto px-4">
          <ul className="flex flex-col md:flex-row md:items-center md:gap-1">
            {navItems.map((item) => (
              <li key={item}>
                {/* ✅ CHANGE 2: Replace <a> with <Link> */}
                <Link 
                  to={getPath(item)}
                  className="block px-4 py-3 text-sm text-primary-foreground hover:bg-secondary hover:text-secondary-foreground transition-colors"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};