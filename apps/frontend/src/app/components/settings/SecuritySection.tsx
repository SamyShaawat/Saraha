import React from 'react';

export function SecuritySection() {
  return (
    <section className="glass-panel" style={{ padding: '1.5rem' }}>
      <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Security</h2>
      <button className="btn btn-glass">Change Password</button>
    </section>
  );
}

export default SecuritySection;
