import { Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import dtcLogo from "@/assets/images (3).jpeg";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  // Scroll shadow effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getPath = (item) => {
    if (item === "Home") return "/";
    return `/${item.toLowerCase().replace(/\s/g, "-")}`;
  };

  const navItems = ["Home", "About Us", "Services", "Notice Board", "Contact Us"];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "shadow-lg" : ""
      }`}
    >
      {/* Top Section */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-red-900">
  <div className="w-full px-0 py-4 flex items-center justify-between">
    {/* Logo + Title */}
    <div className="flex items-center justify-start space-x-4 pl-4">
      <img
        src={dtcLogo}
        alt="DTC Logo"
        className="h-14 w-14 rounded-lg shadow-md"
      />
      <div className="text-left leading-tight">
        <h1 className="text-xl md:text-2xl font-bold text-white">
          Delhi Integrated Transport
        </h1>
        <p className="text-sm text-gray-200">
          DTC × DMRC | Government of NCT of Delhi
        </p>
      </div>
    </div>

    {/* Right Section */}
    <div className="flex items-center gap-4 pr-4">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate("/login")}
        className="text-white border border-white/20 hover:bg-white/10 hidden md:flex items-center"
      >
        <User className="h-4 w-4 mr-2" />
        Login
      </Button>

      <select className="bg-transparent border border-white/30 text-white text-sm px-2 py-1 rounded hidden md:block">
        <option>English</option>
        <option>हिंदी</option>
      </select>

      {/* Mobile Toggle */}
      <button
        className="md:hidden text-white"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>
    </div>
  </div>
</div>

      {/* Nav Section */}
      <nav
        className={`bg-gradient-to-r from-blue-800 to-red-800 border-t border-white/10 ${
          mobileMenuOpen ? "block" : "hidden md:block"
        }`}
      >
        <div className="container mx-auto px-4 mr-0">
          <ul className="flex flex-col md:flex-row md:items-center md:justify-end">
            {navItems.map((item) => (
              <li key={item} className="relative group">
                <Link
                  to={getPath(item)}
                  className="block px-4 py-3 text-sm text-white hover:text-yellow-300 transition-colors"
                >
                  {item}
                </Link>
                {/* Hover underline animation */}
                <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-yellow-400 group-hover:w-3/3 group-hover:left-0 transition-all"></span>
              </li>
            ))}

            {/* Mobile Login + Language */}
            <li className="flex gap-2 p-3 md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/login")}
                className="text-white border border-white/20 hover:bg-white/10 w-full"
              >
                <User className="h-4 w-4 mr-2" />
                Login
              </Button>
              <select className="bg-transparent border border-white/30 text-white text-sm px-2 py-1 rounded w-full">
                <option>English</option>
                <option>हिंदी</option>
              </select>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};
