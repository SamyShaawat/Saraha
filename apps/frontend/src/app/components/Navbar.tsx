import { Link } from 'react-router-dom';

export function Navbar() {
  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '1.5rem 5%', 
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      borderBottom: '1px solid var(--glass-border)',
      background: 'rgba(15, 23, 42, 0.7)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)'
    }}>
      <div style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.5px' }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
           <span className="gradient-text">Saraha</span>
        </Link>
      </div>
      
      <ul style={{ display: 'flex', gap: '2rem', alignItems: 'center', margin: 0, padding: 0 }}>
        <li><Link to="/contact" style={{ fontWeight: 500, color: 'var(--text-main)', transition: 'color 0.2s', textDecoration: 'none' }}>Contact Us</Link></li>
        <li><a href="#" style={{ fontWeight: 500, color: 'var(--text-main)', transition: 'color 0.2s', textDecoration: 'none' }}>English</a></li>
        <li style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/login" className="btn btn-glass" style={{ textDecoration: 'none' }}>Login</Link>
          <Link to="/register" className="btn btn-primary" style={{ textDecoration: 'none' }}>Register</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
