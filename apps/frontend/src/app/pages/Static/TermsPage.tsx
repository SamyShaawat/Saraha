import React from 'react';
import Navbar from '../../components/Navbar';
import { inspectProps } from '../../features/shared/utils/inspect';

export function TermsPage() {
  return (
    <div {...inspectProps('TermsPage')}>
      <Navbar />
      <div {...inspectProps('TermsPage.Container')} style={{ padding: '8rem 2rem 4rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>Terms of <span className="gradient-text">Use</span></h1>
        <div {...inspectProps('TermsPage.Content')} className="glass-panel" style={{ padding: '3rem', lineHeight: '1.8' }}>
          <p style={{ marginBottom: '1.5rem' }}>By using Saraha, you agree to the following terms and conditions.</p>
          <h2 style={{ fontSize: '1.5rem', margin: '1.5rem 0 1rem 0' }}>1. Acceptable Use</h2>
          <p style={{ color: 'var(--text-muted)' }}>You agree not to use the service for harassment, bullying, or any illegal activities.</p>
          <h2 style={{ fontSize: '1.5rem', margin: '1.5rem 0 1rem 0' }}>2. Termination</h2>
          <p style={{ color: 'var(--text-muted)' }}>We reserve the right to terminate accounts that violate our community guidelines.</p>
        </div>
      </div>
    </div>
  );
}

export default TermsPage;
