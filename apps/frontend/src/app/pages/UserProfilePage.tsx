import React from 'react';
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';
import { inspectProps } from '../features/shared/utils/inspect';

export function UserProfilePage() {
  const { username } = useParams();

  return (
    <div {...inspectProps('UserProfilePage', { username })}>
      <Navbar />
      <div {...inspectProps('UserProfilePage.Container')} style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        padding: '2rem'
      }}>
        <div {...inspectProps('UserProfilePage.Card')} className="glass-panel animate-fade-in-up" style={{ 
          maxWidth: '600px', 
          width: '100%', 
          padding: '3rem',
          textAlign: 'center'
        }}>
          {/* User Avatar */}
          <div style={{ 
            width: '100px', 
            height: '100px', 
            borderRadius: '50%', 
            background: 'linear-gradient(45deg, #6366f1, #c084fc)', 
            margin: '0 auto 1.5rem auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2.5rem',
            color: '#fff',
            fontWeight: 800,
            boxShadow: '0 0 20px rgba(99, 102, 241, 0.4)'
          }}>
            {username?.charAt(0).toUpperCase()}
          </div>

          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Send message to <span className="gradient-text">@{username}</span></h1>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem' }}>Leave a constructive message anonymously</p>
          
          <form {...inspectProps('UserProfilePage.Form')} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <textarea 
              rows={6} 
              style={{ 
                width: '100%', 
                padding: '1.5rem', 
                borderRadius: 'var(--radius-lg)', 
                background: 'rgba(255, 255, 255, 0.05)', 
                border: '1px solid var(--glass-border)',
                color: '#fff',
                outline: 'none',
                resize: 'none',
                lineHeight: '1.6',
                fontSize: '1.1rem'
              }} 
              placeholder="Type your anonymous message here..."
            />
            
            <button type="submit" className="btn btn-primary" style={{ padding: '1rem 3rem', alignSelf: 'center', fontSize: '1.1rem' }}>
              Send Message Anonymously
            </button>
          </form>

          <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--glass-border)' }}>
             <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Want to receive anonymous messages? <a href="/register" style={{ color: 'var(--primary-color)' }}>Create your account</a>
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfilePage;
