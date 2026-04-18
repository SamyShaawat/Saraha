import React from 'react';
import Navbar from '../../components/Navbar';
import { inspectProps } from '../../features/shared/utils/inspect';

export function PrivacyPage() {
  return (
    <div {...inspectProps('PrivacyPage')}>
      <Navbar />
      <div {...inspectProps('PrivacyPage.Container')} style={{ padding: '8rem 2rem 4rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>Privacy <span className="gradient-text">Policy</span></h1>
        <div {...inspectProps('PrivacyPage.Content')} className="glass-panel" style={{ padding: '3rem', lineHeight: '1.8' }}>
          <p style={{ marginBottom: '1.5rem' }}>At Saraha, we take your privacy seriously. This policy describes how we collect, use, and handle your information.</p>
          <h2 style={{ fontSize: '1.5rem', margin: '1.5rem 0 1rem 0' }}>1. Data Collection</h2>
          <p style={{ color: 'var(--text-muted)' }}>We collect minimal data required to provide our services, including your email and username.</p>
          <h2 style={{ fontSize: '1.5rem', margin: '1.5rem 0 1rem 0' }}>2. Anonymity</h2>
          <p style={{ color: 'var(--text-muted)' }}>Messages sent through Saraha are intended to be anonymous. We do not share sender identities with recipients unless required by law.</p>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPage;
