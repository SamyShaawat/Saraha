import React from 'react';
import { Link } from 'react-router-dom';
import { inspectProps } from '../../features/shared/utils/inspect';
import { useI18n } from '../../i18n';

export function SettingsSidebar() {
  const { t } = useI18n();

  return (
    <aside {...inspectProps('SettingsPage.Sidebar')} className="sidebar-panel">
      <nav {...inspectProps('SettingsPage.SidebarNav')} className="responsive-stack">
        <Link to="/dashboard" style={{ padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)' }}>
          {t('dashboard.sidebar.inbox')}
        </Link>
        <Link to="/favorites" style={{ padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)' }}>
          {t('dashboard.sidebar.favorites')}
        </Link>
        <Link to="/settings" style={{ padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary-color)', fontWeight: 600 }}>
          {t('dashboard.sidebar.settings')}
        </Link>
      </nav>
    </aside>
  );
}

export default SettingsSidebar;
