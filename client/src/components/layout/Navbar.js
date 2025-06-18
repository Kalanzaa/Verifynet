import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isAuthenticated = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { path: '/dashboard', label: 'Dashboard', auth: true },
    { path: '/crisis-map', label: 'Crisis Map', auth: false },
    { path: '/submit-tip', label: 'Submit Tip', auth: true },
    { path: '/verify', label: 'Verify', auth: true }
  ];

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">VerifiNet</Link>
      </div>

      <button className="menu-toggle" onClick={toggleMenu}>
        <span className="hamburger"></span>
      </button>

      <div className={`navbar-menu ${isMenuOpen ? 'is-open' : ''}`}>
        <div className="nav-links">
          {navLinks.map((link) => (
            (!link.auth || (link.auth && isAuthenticated)) && (
              <Link
                key={link.path}
                to={link.path}
                className={location.pathname === link.path ? 'active' : ''}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            )
          ))}
        </div>

        <div className="auth-buttons">
          {isAuthenticated ? (
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="login-btn">
                Login
              </Link>
              <Link to="/register" className="register-btn">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 