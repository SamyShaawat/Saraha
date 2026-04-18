import React from 'react';
import { Link } from 'react-router-dom';
import { inspectProps } from '../../features/shared/utils/inspect';

export function LandingFooter() {
  return (
    <footer
      {...inspectProps('LandingPage.Footer')}
      style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}
    >
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem 2rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <Link to="/contact" style={{ transition: 'color 0.2s' }}>
          Feedback
        </Link>
        <Link to="/privacy" style={{ transition: 'color 0.2s' }}>
          Privacy & Terms
        </Link>
        <a href="#" style={{ transition: 'color 0.2s' }}>
          Facebook Group
        </a>
        <Link to="/contact" style={{ transition: 'color 0.2s' }}>
          Contact Us
        </Link>
      </div>
      <p>© Saraha 2026. All rights reserved.</p>
    </footer>
  );
}

export default LandingFooter;
