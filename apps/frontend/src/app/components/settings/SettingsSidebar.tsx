import React from 'react';
import { Link } from 'react-router-dom';
import { inspectProps } from '../../features/shared/utils/inspect';

export function SettingsSidebar() {
  return (
    <aside {...inspectProps('SettingsPage.Sidebar')} className="sidebar-panel">
      <nav {...inspectProps('SettingsPage.SidebarNav')} className="responsive-stack">
        <Link to="/dashboard" style={{ padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)' }}>
          Inbox
        </Link>
        <Link to="/favorites" style={{ padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)' }}>
          Favorites
        </Link>
        <Link to="/settings" style={{ padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary-color)', fontWeight: 600 }}>
          Settings
        </Link>
      </nav>
    </aside>
  );
}

export default SettingsSidebar;
