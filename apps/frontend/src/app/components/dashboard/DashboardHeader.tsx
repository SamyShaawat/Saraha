import React from 'react';

export function DashboardHeader({ totalMessages }: { totalMessages: number }) {
  return (
    <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
      <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}>
        My <span className="gradient-text">Messages</span>
      </h1>
      <div style={{ color: 'var(--text-muted)' }}>{totalMessages} Messages received</div>
    </header>
  );
}

export default DashboardHeader;
