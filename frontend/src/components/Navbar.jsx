import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const isLanding = location.pathname === "/";

  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    setProfileOpen(false);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">

        {/* Logo */}
        <Link
          to="/"
          className="navbar-brand"
          onClick={closeMenu}
        >
          <span className="brand-dot"></span>
          CivicConnect
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <HiX size={30} /> : <HiMenu size={30} />}
        </button>

        {/* Navigation */}
        <div className={`navbar-center ${menuOpen ? "active" : ""}`}>

          {/* Landing */}
          {!user && isLanding && (
            <>
              <a href="#home" className="nav-link" onClick={closeMenu}>
                Home
              </a>

              <a href="#about" className="nav-link" onClick={closeMenu}>
                About
              </a>

              <a href="#how" className="nav-link" onClick={closeMenu}>
                How It Works
              </a>

              <a href="#impact" className="nav-link" onClick={closeMenu}>
                Impact
              </a>

              <Link
                to="/contact"
                className="nav-link"
                onClick={closeMenu}
              >
                Contact
              </Link>
            </>
          )}

          {/* Citizen */}
          {user?.role === "citizen" && (
  <>
    <Link
      to="/dashboard"
      className="nav-link"
      onClick={closeMenu}
    >
      Dashboard
    </Link>
<Link
  to="/analytics"
  className="nav-link"
  onClick={closeMenu}
>
  Analytics
</Link>
    <Link
      to="/profile"
      className="nav-link mobile-only"
      onClick={closeMenu}
    >
      Profile
    </Link>

    <button
      className="mobile-logout mobile-only"
      onClick={handleLogout}
    >
      Logout
    </button>
  </>
)}

          {/* Admin */}
         {user?.role === "admin" && (
  <>
    <Link to="/admin" className="nav-link" onClick={closeMenu}>
      Dashboard
    </Link>

    <Link to="/admin/tickets" className="nav-link" onClick={closeMenu}>
      Tickets
    </Link>
<Link
  to="/analytics"
  className="nav-link"
  onClick={closeMenu}
>
  Analytics
</Link>
    <Link to="/users" className="nav-link" onClick={closeMenu}>
      Community
    </Link>

    <Link to="/profile" className="nav-link mobile-only" onClick={closeMenu}>
      Profile
    </Link>

    <button
      className="mobile-logout mobile-only"
      onClick={handleLogout}
    >
      Logout
    </button>
  </>
)}

          {/* Guest Mobile */}
          {!user && (
            <div className="mobile-only">
              <Link
                to="/login"
                className="nav-link"
                onClick={closeMenu}
              >
                Login
              </Link>

              <Link
                to="/register"
                className="nav-link"
                onClick={closeMenu}
              >
                Register
              </Link>
            </div>
          )}

        </div>

        {/* Desktop Right */}
        <div className="navbar-right">

          {!user ? (
            <>
              <Link to="/login" className="btn btn-outline btn-sm">
                Login
              </Link>

              <Link to="/register" className="btn btn-primary btn-sm">
                Register
              </Link>
            </>
          ) : (
            <div className="profile-menu">

              <button
                className="profile-btn"
                onClick={() => setProfileOpen(!profileOpen)}
              >
                👤 {user.name.split(" ")[0]} ▼
              </button>

              {profileOpen && (
                <div className="dropdown">

                  <Link
                    to="/profile"
                    className="dropdown-item"
                    onClick={() => setProfileOpen(false)}
                  >
                    Profile
                  </Link>

                  <button
                    className="dropdown-item logout-item"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>

                </div>
              )}

            </div>
          )}

        </div>

      </div>
    </nav>
  );
};

export default Navbar;