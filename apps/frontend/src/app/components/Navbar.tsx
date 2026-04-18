import { Link, useNavigate } from 'react-router-dom';
import { inspectProps } from '../features/shared/utils/inspect';

export function Navbar() {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('accessToken');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav
      {...inspectProps('Navbar', { authenticated: isAuthenticated })}
      style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '1.5rem 5%', 
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      boxSizing: 'border-box',
      width: '100%',
      zIndex: 50,
      borderBottom: '1px solid var(--glass-border)',
      background: 'rgba(15, 23, 42, 0.7)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      gap: '0.75rem',
      flexWrap: 'wrap',
    }}
    >
      <div {...inspectProps('Navbar.Brand')} style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.5px' }}>
        <Link {...inspectProps('Navbar.BrandLink', { to: '/' })} to="/" style={{ textDecoration: 'none' }}>
           <span className="gradient-text">Saraha</span>
        </Link>
      </div>
      
      <ul
        {...inspectProps('Navbar.Actions')}
        style={{ display: 'flex', gap: '1rem', alignItems: 'center', margin: 0, padding: 0, listStyle: 'none', flexWrap: 'wrap', justifyContent: 'flex-end' }}
      >
        <li>
          <Link {...inspectProps('Navbar.ContactLink', { to: '/contact' })} to="/contact" style={{ fontWeight: 500, color: 'var(--text-main)', transition: 'color 0.2s', textDecoration: 'none' }}>Contact Us</Link>
        </li>
        <li {...inspectProps('Navbar.AuthActions')} style={{ display: 'flex', gap: '1rem' }}>
          {isAuthenticated ? (
            <>
              <Link {...inspectProps('Navbar.DashboardLink', { to: '/dashboard' })} to="/dashboard" className="btn btn-primary" style={{ textDecoration: 'none' }}>Dashboard</Link>
              <button {...inspectProps('Navbar.LogoutButton')} onClick={handleLogout} className="btn btn-glass" style={{ cursor: 'pointer' }}>Logout</button>
            </>
          ) : (
            <>
              <Link {...inspectProps('Navbar.LoginLink', { to: '/login' })} to="/login" className="btn btn-glass" style={{ textDecoration: 'none' }}>Login</Link>
              <Link {...inspectProps('Navbar.RegisterLink', { to: '/register' })} to="/register" className="btn btn-primary" style={{ textDecoration: 'none' }}>Register</Link>
            </>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
