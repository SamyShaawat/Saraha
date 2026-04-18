import React from 'react';
import Navbar from '../../components/Navbar';

export function ContactPage() {
  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '2rem' }}>
        <div className="glass-panel animate-fade-in-up" style={{ maxWidth: '600px', width: '100%', padding: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', textAlign: 'center' }}>Contact <span className="gradient-text">Us</span></h1>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', textAlign: 'center' }}>Have questions or feedback? We'd love to hear from you.</p>
          
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Name</label>
              <input type="text" className="glass-panel" style={{ width: '100%', padding: '0.8rem', border: '1px solid var(--glass-border)', background: 'transparent', color: '#fff' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Email</label>
              <input type="email" className="glass-panel" style={{ width: '100%', padding: '0.8rem', border: '1px solid var(--glass-border)', background: 'transparent', color: '#fff' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Message</label>
              <textarea rows={4} className="glass-panel" style={{ width: '100%', padding: '0.8rem', border: '1px solid var(--glass-border)', background: 'transparent', color: '#fff', resize: 'none' }} />
            </div>
            <button type="submit" className="btn btn-primary">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
