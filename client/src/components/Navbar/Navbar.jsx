import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Navbar.css'; // 👈 import the CSS file

const Navbar = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 600);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 600);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">FleetCode</Link>
      <div className="navbar-links">
        <Link to="/auth" className="navbar-link">Login/SignUp</Link>
      </div>
    </nav>
  );
};

export default Navbar;
