import React from 'react';
import { inspectProps } from '../../features/shared/utils/inspect';

function LegalSection({ title, body }: { title: string; body: string }) {
  return (
    <>
      <h2 style={{ fontSize: '1.25rem', margin: '1.25rem 0 0.75rem 0' }}>{title}</h2>
      <p style={{ color: 'var(--text-muted)' }}>{body}</p>
    </>
  );
}

export function PrivacyPolicyContent() {
  return (
    <>
      <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '1.25rem' }}>
        Privacy <span className="gradient-text">Policy</span>
      </h1>
      <article {...inspectProps('PrivacyPage.Content')} className="glass-panel" style={{ padding: 'clamp(1.25rem, 3vw, 2.5rem)', lineHeight: '1.8' }}>
        <p style={{ marginBottom: '1.25rem' }}>
          At Saraha, we take your privacy seriously. This policy describes how we collect, use, and handle your information.
        </p>
        <LegalSection title="1. Data Collection" body="We collect minimal data required to provide our services, including your email and username." />
        <LegalSection
          title="2. Anonymity"
          body="Messages sent through Saraha are intended to be anonymous. We do not share sender identities with recipients unless required by law."
        />
      </article>
    </>
  );
}

export default PrivacyPolicyContent;
