import React from 'react';
import { inspectProps } from '../../features/shared/utils/inspect';

function TermsSection({ title, body }: { title: string; body: string }) {
  return (
    <>
      <h2 style={{ fontSize: '1.25rem', margin: '1.25rem 0 0.75rem 0' }}>{title}</h2>
      <p style={{ color: 'var(--text-muted)' }}>{body}</p>
    </>
  );
}

export function TermsOfUseContent() {
  return (
    <>
      <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '1.25rem' }}>
        Terms of <span className="gradient-text">Use</span>
      </h1>
      <article {...inspectProps('TermsPage.Content')} className="glass-panel" style={{ padding: 'clamp(1.25rem, 3vw, 2.5rem)', lineHeight: '1.8' }}>
        <p style={{ marginBottom: '1.25rem' }}>By using Saraha, you agree to the following terms and conditions.</p>
        <TermsSection title="1. Acceptable Use" body="You agree not to use the service for harassment, bullying, or any illegal activities." />
        <TermsSection
          title="2. Termination"
          body="We reserve the right to terminate accounts that violate our community guidelines."
        />
      </article>
    </>
  );
}

export default TermsOfUseContent;
