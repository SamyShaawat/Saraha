import React from 'react';

export function DangerZoneSection() {
  return (
    <section className="glass-panel" style={{ padding: '1.5rem', borderColor: 'rgba(239, 68, 68, 0.2)' }}>
      <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#ef4444' }}>Danger Zone</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.9rem' }}>
        Once you delete your account, there is no going back. Please be certain.
      </p>
      <button
        className="btn"
        style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)' }}
      >
        Delete Account
      </button>
    </section>
  );
}

export default DangerZoneSection;
