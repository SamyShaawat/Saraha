import React from 'react';
import { Link } from 'react-router-dom';
import { inspectProps } from '../../features/shared/utils/inspect';
import { useI18n } from '../../i18n';

export function DashboardSidebar() {
  const { t } = useI18n();

  return (
    <aside {...inspectProps('DashboardPage.Sidebar')} className="sidebar-panel responsive-stack">
      <div className="responsive-stack">
        <h3 style={{ fontSize: '1rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
          {t('dashboard.sidebar.yourLink')}
        </h3>
        <div className="glass-panel" style={{ padding: '1rem', fontSize: '0.9rem', wordBreak: 'break-all' }}>
          saraha.com/samy
        </div>
        <button className="btn btn-glass" style={{ width: '100%', padding: '0.5rem' }}>
          {t('dashboard.sidebar.copyLink')}
        </button>
      </div>

      <nav {...inspectProps('DashboardPage.SidebarNav')} className="responsive-stack">
          <Link to="/dashboard" style={{ padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary-color)', fontWeight: 600 }}>
            {t('dashboard.sidebar.inbox')}
          </Link>
          <Link to="/favorites" style={{ padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)' }}>
            {t('dashboard.sidebar.favorites')}
          </Link>
          <Link to="/public-messages" style={{ padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)' }}>
            {t('dashboard.sidebar.publicWall')}
          </Link>
          <Link to="/settings" style={{ padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)' }}>
            {t('dashboard.sidebar.settings')}
          </Link>
        </nav>
    </aside>
  );
}

export default DashboardSidebar;
