import React from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

export function SettingsPage() {
  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex', minHeight: '100vh', paddingTop: '6rem' }}>
        
        {/* Sidebar (Shared with Dashboard) */}
        <div style={{ 
          width: '300px', 
          borderRight: '1px solid var(--glass-border)', 
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem'
        }}>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
             <Link to="/dashboard" style={{ padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', color: 'var(--text-main)' }}>Inbox</Link>
             <Link to="/favorites" style={{ padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', color: 'var(--text-main)' }}>Favorites</Link>
             <Link to="/settings" style={{ padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary-color)', fontWeight: 600 }}>Settings</Link>
          </nav>
        </div>

        {/* Settings Content */}
        <div style={{ flex: 1, padding: '2rem 4rem', maxWidth: '800px' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '3rem' }}>Account <span className="gradient-text">Settings</span></h1>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            
            <section className="glass-panel" style={{ padding: '2rem' }}>
               <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Profile Information</h2>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Display Name</label>
                    <input type="text" style={{ 
                      width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-md)', 
                      background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--glass-border)', color: '#fff', outline: 'none'
                    }} defaultValue="Samy Shaawat" />
                  </div>
                  <button className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>Update Name</button>
               </div>
            </section>

            <section className="glass-panel" style={{ padding: '2rem' }}>
               <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Security</h2>
               <button className="btn btn-glass">Change Password</button>
            </section>

            <section className="glass-panel" style={{ padding: '2rem', borderColor: 'rgba(239, 68, 68, 0.2)' }}>
               <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#ef4444' }}>Danger Zone</h2>
               <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>Once you delete your account, there is no going back. Please be certain.</p>
               <button className="btn" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)' }}>Delete Account</button>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
