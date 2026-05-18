import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

function Navbar() {
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const { darkMode, toggleTheme, theme } = useTheme();

  return (
    <nav style={{ ...styles.nav, backgroundColor: theme.navBg }}>
      <Link to="/" style={styles.logo}>🛒 SuperCart</Link>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/cart" style={styles.link}>
          Cart {totalItems > 0 && (
            <span style={styles.badge}>{totalItems}</span>
          )}
        </Link>
        {user ? (
          <>
            <span style={styles.link}>Hi, {user.name}!</span>
            <button style={styles.logoutBtn} onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to="/login" style={styles.link}>Login</Link>
        )}
        {/* Dark Mode Toggle */}
        <button style={styles.themeBtn} onClick={toggleTheme}>
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'center', padding: '12px 24px',
    color: 'white',
  },
  logo: { color: 'white', textDecoration: 'none', fontSize: '20px', fontWeight: 'bold' },
  links: { display: 'flex', gap: '16px', alignItems: 'center' },
  link: { color: 'white', textDecoration: 'none' },
  badge: {
    backgroundColor: '#e44d26', color: 'white',
    borderRadius: '50%', padding: '2px 7px',
    fontSize: '12px', marginLeft: '4px',
  },
  logoutBtn: {
    backgroundColor: 'transparent', border: '1px solid white',
    color: 'white', padding: '4px 10px',
    borderRadius: '4px', cursor: 'pointer',
  },
  themeBtn: {
    backgroundColor: 'transparent', border: '1px solid white',
    borderRadius: '4px', padding: '4px 8px',
    cursor: 'pointer', fontSize: '16px',
  },
};

export default Navbar;