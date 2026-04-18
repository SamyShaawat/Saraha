import React from 'react';
import { inspectProps } from '../../features/shared/utils/inspect';

function ContactField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>{label}</label>
      {children}
    </div>
  );
}

function ContactForm() {
  const fieldStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.8rem',
    border: '1px solid var(--glass-border)',
    borderRadius: 'var(--radius-md)',
    background: 'transparent',
    color: '#fff',
  };

  return (
    <form {...inspectProps('ContactPage.Form')} className="responsive-stack">
      <ContactField label="Name">
        <input type="text" className="glass-panel" style={fieldStyle} />
      </ContactField>
      <ContactField label="Email">
        <input type="email" className="glass-panel" style={fieldStyle} />
      </ContactField>
      <ContactField label="Message">
        <textarea rows={4} className="glass-panel" style={{ ...fieldStyle, resize: 'vertical', minHeight: '120px' }} />
      </ContactField>
      <button type="submit" className="btn btn-primary">
        Send Message
      </button>
    </form>
  );
}

export function ContactFormCard() {
  return (
    <section {...inspectProps('ContactPage.Card')} className="glass-panel animate-fade-in-up" style={{ width: '100%', padding: 'clamp(1.25rem, 3vw, 2.5rem)' }}>
      <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', marginBottom: '1rem', textAlign: 'center' }}>
        Contact <span className="gradient-text">Us</span>
      </h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', textAlign: 'center' }}>
        Have questions or feedback? We'd love to hear from you.
      </p>
      <ContactForm />
    </section>
  );
}

export default ContactFormCard;
