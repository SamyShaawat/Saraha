import React from 'react';
import { Link } from 'react-router-dom';
import { inspectProps } from '../../features/shared/utils/inspect';

export function LandingHero() {
  return (
    <section
      {...inspectProps('LandingPage.Hero')}
      className="responsive-stack"
      style={{ alignItems: 'center', textAlign: 'center', padding: '1rem 0 2rem' }}
    >
      <h1
        className="animate-fade-in-up"
        style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', fontWeight: 800, lineHeight: 1.2, maxWidth: '800px' }}
      >
        Are you ready to face the <span className="gradient-text">truth?</span>
      </h1>
      <p
        className="animate-fade-in-up delay-100"
        style={{ fontSize: 'clamp(1rem, 3vw, 1.25rem)', color: 'var(--text-muted)', maxWidth: '640px' }}
      >
        Get honest feedback from your friends and coworkers anonymously, discover your strengths, and address your
        weaknesses.
      </p>
      <div className="animate-fade-in-up delay-200" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link to="/register" className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
          Register Now
        </Link>
        <Link to="/login" className="btn btn-glass" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
          Login
        </Link>
      </div>
    </section>
  );
}

export default LandingHero;
