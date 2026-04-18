import React from 'react';

export function ProfileSection() {
  return (
    <section className="glass-panel" style={{ padding: '1.5rem' }}>
      <h2 style={{ fontSize: '1.25rem', marginBottom: '1.25rem' }}>Profile Information</h2>
      <div className="responsive-stack">
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Display Name</label>
          <input
            type="text"
            style={{
              width: '100%',
              padding: '0.8rem',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--glass-border)',
              color: '#fff',
              outline: 'none',
            }}
            defaultValue="Samy Shaawat"
          />
        </div>
        <button className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
          Update Name
        </button>
      </div>
    </section>
  );
}

export default ProfileSection;
