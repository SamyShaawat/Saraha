import React from 'react';
import { Link } from 'react-router-dom';
import { inspectProps } from '../../features/shared/utils/inspect';

export function DashboardSidebar() {
  return (
    <aside {...inspectProps('DashboardPage.Sidebar')} className="sidebar-panel responsive-stack">
      <div className="responsive-stack">
        <h3 style={{ fontSize: '1rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Your Link</h3>
        <div className="glass-panel" style={{ padding: '1rem', fontSize: '0.9rem', wordBreak: 'break-all' }}>
          saraha.com/samy
        </div>
        <button className="btn btn-glass" style={{ width: '100%', padding: '0.5rem' }}>
          Copy Link
        </button>
      </div>

      <nav {...inspectProps('DashboardPage.SidebarNav')} className="responsive-stack">
        <Link to="/dashboard" style={{ padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary-color)', fontWeight: 600 }}>
          Inbox
        </Link>
        <Link to="/favorites" style={{ padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)' }}>
          Favorites
        </Link>
        <Link to="/public-messages" style={{ padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)' }}>
          Public Wall
        </Link>
        <Link to="/settings" style={{ padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)' }}>
          Settings
        </Link>
      </nav>
    </aside>
  );
}

export default DashboardSidebar;
