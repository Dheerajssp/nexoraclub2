import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, LogIn, LogOut, LayoutDashboard } from "lucide-react";
import { useState, useEffect } from "react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Events", path: "/events" },
    { name: "Team", path: "/team" },
    { name: "Resources", path: "/resources" },
    { name: "Join Us", path: "/join" }
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="dark-header">
      <Link to="/" className="flex items-center gap-3">
        <img 
          src="/logo.png" 
          alt="Nexora Club" 
          className="h-10 w-10 object-contain"
        />
        <div className="text-2xl font-bold text-white">
          <span className="text-brand-primary">Nexora</span> Club
        </div>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`dark-nav-link ${isActive(link.path) ? "active" : ""}`}
          >
            {link.name}
          </Link>
        ))}
        
        {/* Auth Buttons */}
        {isLoggedIn ? (
          <div className="flex items-center gap-4">
            <Link
              to="/dashboard"
              className={`dark-nav-link flex items-center gap-2 ${isActive("/dashboard") ? "active" : ""}`}
            >
              <LayoutDashboard size={18} />
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-text-muted hover:text-white transition-colors"
              data-testid="logout-btn"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="btn-primary flex items-center gap-2 px-4 py-2"
            data-testid="login-btn"
          >
            <LogIn size={18} />
            Login
          </Link>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-white"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="absolute top-20 left-0 w-full bg-black border-t border-border-subtle md:hidden z-50">
          <div className="flex flex-col p-6 gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`dark-nav-link text-xl ${
                  isActive(link.path) ? "active" : ""
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Mobile Auth Links */}
            {isLoggedIn ? (
              <>
                <Link
                  to="/dashboard"
                  className={`dark-nav-link text-xl flex items-center gap-2 ${isActive("/dashboard") ? "active" : ""}`}
                  onClick={() => setIsOpen(false)}
                >
                  <LayoutDashboard size={20} />
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="dark-nav-link text-xl flex items-center gap-2 text-left"
                >
                  <LogOut size={20} />
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="btn-primary flex items-center justify-center gap-2 mt-2"
                onClick={() => setIsOpen(false)}
              >
                <LogIn size={20} />
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
