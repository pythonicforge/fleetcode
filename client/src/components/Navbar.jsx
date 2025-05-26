import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 600);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 600);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const styles = {
navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    color: 'white',
    borderBottom: '1px solid rgba(192, 192, 192, 0.32)',
    flexWrap: 'nowrap',
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    transition: 'top 0.3s ease',
    zIndex: 1000,
    backgroundColor: 'rgb(24, 24, 24)',
    boxSizing: 'border-box',  // include padding inside width
  },
    logo: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: 'white',
      textDecoration: 'none',
      transition: 'color 0.3s',
    },
   navLinks: {
    display: 'flex',
    gap: '20px',
    flexWrap: 'nowrap',
    marginRight: '10px',  // small right margin to prevent clipping
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    padding: '8px 12px',
    transition: 'background-color 0.3s',
    flexShrink: 0,   // prevent shrinking so button always fully visible
  },
  };

  return (
    <nav style={styles.navbar}>
      <Link to="/" style={styles.logo}>FleetCode</Link>
      <div style={styles.navLinks}>
        <Link to="/auth" style={styles.link}>Login/SignUp</Link>
      </div>
    </nav>
  );
};

export default Navbar;
