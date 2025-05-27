import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useUser } from './../client/Usercontext';

import supabase from './../client/supabaseclient';
import './Navbar.css';

const Navbar = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 600);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 600);
    };

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (location.pathname === '/login' || location.pathname === '/signup') {
    return null;
  }

  const username =
    user?.user_metadata?.username ||
    user?.user_metadata?.full_name ||
    user?.email?.split('@')[0];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const handleEditProfile = () => {
    setShowDropdown(false);
    navigate('/edit-profile');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">FleetCode</Link>
      <div className="navbar-links">
        {user ? (
          <div className="navbar-profile" ref={dropdownRef}>
            <button
              className="navbar-user"
              onClick={() => setShowDropdown(prev => !prev)}
            >
              Hi, {username} ⌄
            </button>
            {showDropdown && (
              <div className="profile-dropdown" style={{color: 'white'}}>
                <button onClick={handleEditProfile}>Edit Profile</button>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="navbar-link">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
