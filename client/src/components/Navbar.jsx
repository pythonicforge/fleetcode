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
      position: 'relative',
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
    },
    link: {
      color: 'white',
      textDecoration: 'none',
      padding: '8px 12px',
      transition: 'background-color 0.3s',
    },
  };

  return (
    <nav style={styles.navbar}>
      <Link to="/hero" style={styles.logo}>FleetCode</Link>
      <div style={styles.navLinks}>
        <Link to="/auth" style={styles.link}>Login/SignUp</Link>
      </div>
    </nav>
  );
};

export default Navbar;
