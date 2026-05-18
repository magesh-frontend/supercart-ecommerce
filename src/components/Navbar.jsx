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
          🛒 Cart
          {totalItems > 0 && (
            <span style={styles.badge}>{totalItems}</span>
          )}
        </Link>

        {user ? (
          <>
            <span style={styles.link}>Hi, {user.name} 👋</span>
            <button style={styles.logoutBtn} onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" style={styles.link}>Login</Link>
        )}

        <button style={styles.themeBtn} onClick={toggleTheme}>
          {darkMode ? '☀️' : '🌙'}
        </button>

      </div>
    </nav>
  );
}

const styles = {
  nav: { display: 'flex', justifyContent: 'space-between', padding: '14px 28px', color: 'white' },
  logo: { color: 'white', textDecoration: 'none', fontSize: '22px', fontWeight: 'bold' },
  links: { display: 'flex', gap: '18px', alignItems: 'center' },
  link: { color: 'white', textDecoration: 'none' },
  badge: { backgroundColor: '#ff4757', borderRadius: '50%', padding: '4px 8px', marginLeft: '6px' },
  logoutBtn: { border: '1px solid white', background: 'transparent', color: 'white', padding: '5px 12px' },
  themeBtn: { border: '1px solid white', background: 'transparent', padding: '5px 10px' },
};

export default Navbar;