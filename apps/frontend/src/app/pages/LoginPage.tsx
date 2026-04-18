import React from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

export function LoginPage() {
  return (
    <div>
      <Navbar />
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        padding: '2rem'
      }}>
        <div className="glass-panel animate-fade-in-up" style={{ 
          maxWidth: '450px', 
          width: '100%', 
          padding: '3rem',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Welcome Back</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem' }}>Login to check your messages</p>
          
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Email or Username</label>
              <input type="text" style={{ 
                width: '100%', 
                padding: '1rem', 
                borderRadius: 'var(--radius-md)', 
                background: 'rgba(255, 255, 255, 0.05)', 
                border: '1px solid var(--glass-border)',
                color: '#fff',
                outline: 'none'
              }} placeholder="Enter your email" />
            </div>
            
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <label style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Password</label>
                <Link to="/forgot-password" style={{ fontSize: '0.8rem', color: 'var(--primary-color)' }}>Forgot?</Link>
              </div>
              <input type="password" style={{ 
                width: '100%', 
                padding: '1rem', 
                borderRadius: 'var(--radius-md)', 
                background: 'rgba(255, 255, 255, 0.05)', 
                border: '1px solid var(--glass-border)',
                color: '#fff',
                outline: 'none'
              }} placeholder="••••••••" />
            </div>

            <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem', padding: '1rem' }}>Login</button>
            
            <div style={{ position: 'relative', textAlign: 'center', margin: '1rem 0' }}>
              <hr style={{ border: '0', borderTop: '1px solid var(--glass-border)' }} />
              <span style={{ 
                position: 'absolute', 
                top: '50%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)', 
                background: '#161d31', 
                padding: '0 10px', 
                color: 'var(--text-muted)',
                fontSize: '0.8rem'
              }}>OR</span>
            </div>

            <button type="button" className="btn btn-glass" style={{ display: 'flex', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.2rem' }}>f</span> Login with Facebook
            </button>
          </form>

          <p style={{ marginTop: '2.5rem', color: 'var(--text-muted)' }}>
            Don't have an account? <Link to="/register" style={{ color: 'var(--primary-color)', fontWeight: 600 }}>Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
