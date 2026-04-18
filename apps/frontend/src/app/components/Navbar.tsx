import { Link, useNavigate } from 'react-router-dom';
import { inspectProps } from '../features/shared/utils/inspect';
import { useI18n } from '../i18n';

function NavbarBrand() {
  return (
    <div {...inspectProps('Navbar.Brand')} style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.5px' }}>
      <Link {...inspectProps('Navbar.BrandLink', { to: '/' })} to="/" style={{ textDecoration: 'none' }}>
        <span className="gradient-text">Saraha</span>
      </Link>
    </div>
  );
}

function NavbarPrimaryLink() {
  const { t } = useI18n();

  return (
    <li>
      <Link
        {...inspectProps('Navbar.ContactLink', { to: '/contact' })}
        to="/contact"
        style={{ fontWeight: 500, color: 'var(--text-main)', transition: 'color 0.2s', textDecoration: 'none' }}
      >
        {t('navbar.contactUs')}
      </Link>
    </li>
  );
}

function NavbarAuthActions({
  isAuthenticated,
  handleLogout,
}: {
  isAuthenticated: boolean;
  handleLogout: () => void;
}) {
  const { t } = useI18n();

  return (
    <li {...inspectProps('Navbar.AuthActions')} style={{ display: 'flex', gap: '1rem' }}>
      {isAuthenticated ? (
        <>
          <Link {...inspectProps('Navbar.DashboardLink', { to: '/dashboard' })} to="/dashboard" className="btn btn-primary" style={{ textDecoration: 'none' }}>
            {t('navbar.dashboard')}
          </Link>
          <button {...inspectProps('Navbar.LogoutButton')} onClick={handleLogout} className="btn btn-glass" style={{ cursor: 'pointer' }}>
            {t('navbar.logout')}
          </button>
        </>
      ) : (
        <>
          <Link {...inspectProps('Navbar.LoginLink', { to: '/login' })} to="/login" className="btn btn-glass" style={{ textDecoration: 'none' }}>
            {t('navbar.login')}
          </Link>
          <Link {...inspectProps('Navbar.RegisterLink', { to: '/register' })} to="/register" className="btn btn-primary" style={{ textDecoration: 'none' }}>
            {t('navbar.register')}
          </Link>
        </>
      )}
    </li>
  );
}

export function Navbar() {
  const navigate = useNavigate();
  const { language, setLanguage, t } = useI18n();
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
      <NavbarBrand />
      
      <ul
        {...inspectProps('Navbar.Actions')}
        style={{ display: 'flex', gap: '1rem', alignItems: 'center', margin: 0, padding: 0, listStyle: 'none', flexWrap: 'wrap', justifyContent: 'flex-end' }}
      >
        <li>
          <label style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginInlineEnd: '0.35rem' }}>
            {t('common.language')}
          </label>
          <select
            value={language}
            onChange={(event) => void setLanguage(event.target.value === 'ar' ? 'ar' : 'en')}
            className="btn btn-glass"
            style={{ padding: '0.35rem 0.75rem' }}
            aria-label={t('common.language')}
          >
            <option value="en">{t('common.english')}</option>
            <option value="ar">{t('common.arabic')}</option>
          </select>
        </li>
        <NavbarPrimaryLink />
        <NavbarAuthActions isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
      </ul>
    </nav>
  );
}

export default Navbar;
