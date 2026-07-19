import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useState } from "react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(false);

  const isLanding = location.pathname === "/";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">

        {/* Logo */}

        <Link to="/" className="navbar-brand">
          <span className="brand-dot"></span>
          CivicConnect
        </Link>

        {/* Center Navigation */}

        <div className="navbar-center">

          {!user && isLanding && (
            <>
              <a href="#home" className="nav-link">Home</a>
              <a href="#about" className="nav-link">About</a>
              <a href="#how" className="nav-link">How It Works</a>
              <a href="#impact" className="nav-link">Impact</a>
              <Link to="/contact" className="nav-link">
  Contact
</Link>
            </>
          )}

          {user?.role === "admin" && (
            <>
              <Link to="/admin" className="nav-link">Dashboard</Link>
              <Link to="/admin/tickets" className="nav-link">Tickets</Link>
              <Link to="/admin/analytics" className="nav-link">Analytics</Link>
              <Link to="/users" className="nav-link">Community</Link>
            </>
          )}

          {user?.role === "citizen" && (
            <>
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              <Link to="/users" className="nav-link">Community</Link>
            </>
          )}

        </div>

        {/* Right */}

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
                onClick={() => setOpen(!open)}
              >
                👤 {user.name.split(" ")[0]} ▼
              </button>

              {open && (
                <div className="dropdown">

                  <Link
                    to="/profile"
                    className="dropdown-item"
                    onClick={() => setOpen(false)}
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