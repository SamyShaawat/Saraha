import React from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

export function RegistrationPage() {
  return (
    <div>
      <Navbar />
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        padding: '2rem',
        marginTop: '2rem'
      }}>
        <div className="glass-panel animate-fade-in-up" style={{ 
          maxWidth: '500px', 
          width: '100%', 
          padding: '3rem',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Join the community</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Create your account in seconds</p>
          
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', textAlign: 'left' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>First Name</label>
                <input type="text" style={{ 
                  width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-md)', 
                  background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--glass-border)', color: '#fff', outline: 'none'
                }} placeholder="Jane" />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>Last Name</label>
                <input type="text" style={{ 
                  width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-md)', 
                  background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--glass-border)', color: '#fff', outline: 'none'
                }} placeholder="Doe" />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>Unique Username (For your link)</label>
              <input type="text" style={{ 
                width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-md)', 
                background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--glass-border)', color: '#fff', outline: 'none'
              }} placeholder="jane_doe" />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>Email Address</label>
              <input type="email" style={{ 
                width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-md)', 
                background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--glass-border)', color: '#fff', outline: 'none'
              }} placeholder="jane@example.com" />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>Password</label>
              <input type="password" style={{ 
                width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-md)', 
                background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--glass-border)', color: '#fff', outline: 'none'
              }} placeholder="••••••••" />
            </div>

            <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem', padding: '1rem' }}>Create Account</button>
            
            <button type="button" className="btn btn-glass" style={{ display: 'flex', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.2rem' }}>f</span> Sign up with Facebook
            </button>
          </form>

          <p style={{ marginTop: '2.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Already have an account? <Link to="/login" style={{ color: 'var(--primary-color)', fontWeight: 600 }}>Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegistrationPage;
