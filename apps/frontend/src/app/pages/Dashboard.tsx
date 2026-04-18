import React from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { inspectProps } from '../features/shared/utils/inspect';

const MOCK_MESSAGES = [
  { id: '1', content: 'You are doing a great job! Keep it up.', date: '2 hours ago', isFavorite: false },
  { id: '2', content: 'I really appreciate your helping hand yesterday. You are the best.', date: '5 hours ago', isFavorite: true },
  { id: '3', content: 'Could you be more punctual in meetings? That would help a lot.', date: '1 day ago', isFavorite: false },
];

export function Dashboard() {
  return (
    <div {...inspectProps('DashboardPage')}>
      <Navbar />
      <div {...inspectProps('DashboardPage.Layout')} style={{ display: 'flex', minHeight: '100vh', paddingTop: '6rem' }}>
        
        {/* Sidebar */}
        <div {...inspectProps('DashboardPage.Sidebar')} style={{ 
          width: '300px', 
          borderRight: '1px solid var(--glass-border)', 
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem'
        }}>
          <div>
            <h3 style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Your Link</h3>
            <div className="glass-panel" style={{ padding: '1rem', fontSize: '0.9rem', wordBreak: 'break-all' }}>
               saraha.com/samy
            </div>
            <button className="btn btn-glass" style={{ width: '100%', marginTop: '0.5rem', padding: '0.5rem' }}>Copy Link</button>
          </div>

          <nav {...inspectProps('DashboardPage.SidebarNav')} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
             <Link to="/dashboard" style={{ padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary-color)', fontWeight: 600 }}>Inbox</Link>
             <Link to="/favorites" style={{ padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', color: 'var(--text-main)' }}>Favorites</Link>
             <Link to="/public-messages" style={{ padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', color: 'var(--text-main)' }}>Public Wall</Link>
             <Link to="/settings" style={{ padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', color: 'var(--text-main)' }}>Settings</Link>
          </nav>
        </div>

        {/* Main Content */}
        <div {...inspectProps('DashboardPage.Content')} style={{ flex: 1, padding: '2rem 4rem' }}>
          <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
             <h1 style={{ fontSize: '2.5rem' }}>My <span className="gradient-text">Messages</span></h1>
             <div style={{ color: 'var(--text-muted)' }}>{MOCK_MESSAGES.length} Messages received</div>
          </header>

          <div {...inspectProps('DashboardPage.MessageList')} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {MOCK_MESSAGES.map((msg) => (
              <div {...inspectProps('DashboardPage.MessageCard', { messageId: msg.id })} key={msg.id} className="glass-panel animate-fade-in-up" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                   <p style={{ fontSize: '1.1rem', marginBottom: '1rem', lineHeight: '1.5' }}>{msg.content}</p>
                   <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{msg.date}</span>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                   <button className="btn btn-glass" style={{ padding: '0.5rem' }}>❤️</button>
                   <button className="btn btn-glass" style={{ padding: '0.5rem' }}>📢</button>
                   <button className="btn btn-glass" style={{ padding: '0.5rem' }}>🗑️</button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
