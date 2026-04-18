import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      navigate('/dashboard');
    }
  }, [navigate]);
  return (
    <div>
      <Navbar />
      
      {/* Hero Section */}
      <section style={{ 
        paddingTop: '8rem', 
        paddingBottom: '4rem', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        textAlign: 'center',
        paddingLeft: '1rem',
        paddingRight: '1rem'
      }}>
        <h1 className="animate-fade-in-up" style={{ 
          fontSize: '3.5rem', 
          fontWeight: 800, 
          lineHeight: 1.2, 
          marginBottom: '1.5rem',
          maxWidth: '800px'
        }}>
          Are you ready to face the <span className="gradient-text">truth?</span>
        </h1>
        <p className="animate-fade-in-up delay-100" style={{ 
          fontSize: '1.25rem', 
          color: 'var(--text-muted)', 
          maxWidth: '600px', 
          marginBottom: '3rem'
        }}>
          Get honest feedback from your friends and coworkers anonymously, discover your strengths, and address your weaknesses.
        </p>

        <div className="animate-fade-in-up delay-200" style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/register" className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>Register Now</Link>
          <Link to="/login" className="btn btn-glass" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>Login</Link>
        </div>
      </section>

      {/* Feature Cards Section ... */}
      <section style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '4rem 2rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem'
      }}>
        <div className="glass-panel animate-fade-in-up delay-300" style={{ padding: '2.5rem', textAlign: 'center' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(99, 102, 241, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
             <span style={{ fontSize: '1.5rem' }}>💼</span>
          </div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>At Work</h2>
          <ul style={{ color: 'var(--text-muted)', textAlign: 'left', lineHeight: 2, margin: '0 auto', display: 'inline-block' }}>
            <li>✨ Enhance your strengths</li>
            <li>🛠 Address your weaknesses</li>
            <li>📈 Build professional transparency</li>
          </ul>
        </div>

        <div className="glass-panel animate-fade-in-up delay-300" style={{ padding: '2.5rem', textAlign: 'center' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(192, 132, 252, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
             <span style={{ fontSize: '1.5rem' }}>🌟</span>
          </div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>With Friends</h2>
          <ul style={{ color: 'var(--text-muted)', textAlign: 'left', lineHeight: 2, margin: '0 auto', display: 'inline-block' }}>
            <li>🤝 Strengthen your friendships</li>
            <li>🎭 Let your friends be honest</li>
            <li>💬 Know what people really think</li>
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ 
        borderTop: '1px solid var(--glass-border)', 
        padding: '3rem 2rem', 
        textAlign: 'center', 
        color: 'var(--text-muted)' 
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <Link to="/contact" style={{ transition: 'color 0.2s' }}>Feedback</Link>
          <Link to="/privacy" style={{ transition: 'color 0.2s' }}>Privacy & Terms</Link>
          <a href="#" style={{ transition: 'color 0.2s' }}>Facebook Group</a>
          <Link to="/contact" style={{ transition: 'color 0.2s' }}>Contact Us</Link>
        </div>
        <p>© Saraha 2026. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default LandingPage;
