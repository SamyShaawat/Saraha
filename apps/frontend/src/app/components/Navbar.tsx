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
        <span className="gradient-text">Saraha</span>
      </div>
      
      <ul style={{ display: 'flex', gap: '2rem', alignItems: 'center', margin: 0, padding: 0 }}>
        <li><a href="#" style={{ fontWeight: 500, color: 'var(--text-main)', transition: 'color 0.2s', textDecoration: 'none' }}>Contact Us</a></li>
        <li><a href="#" style={{ fontWeight: 500, color: 'var(--text-main)', transition: 'color 0.2s', textDecoration: 'none' }}>English</a></li>
        <li style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-glass">Login</button>
          <button className="btn btn-primary">Register</button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
