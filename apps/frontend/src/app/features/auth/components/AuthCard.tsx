import { Link } from 'react-router-dom';
import type React from 'react';

type AuthCardProps = {
  title: string;
  subtitle: string;
  footerText: string;
  footerLinkText: string;
  footerLinkTo: string;
  error?: string;
  children: React.ReactNode;
};

export function AuthCard({
  title,
  subtitle,
  footerText,
  footerLinkText,
  footerLinkTo,
  error,
  children,
}: AuthCardProps) {
  return (
    <div
      className="glass-panel animate-fade-in-up"
      style={{
        maxWidth: '480px',
        width: '100%',
        padding: '3rem',
        textAlign: 'center',
      }}
    >
      <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{title}</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>{subtitle}</p>

      {error && <p style={{ color: '#ff4d4d', marginBottom: '1rem' }}>{error}</p>}

      {children}

      <p style={{ marginTop: '2rem', color: 'var(--text-muted)' }}>
        {footerText}{' '}
        <Link to={footerLinkTo} style={{ color: 'var(--primary-color)', fontWeight: 600 }}>
          {footerLinkText}
        </Link>
      </p>
    </div>
  );
}
