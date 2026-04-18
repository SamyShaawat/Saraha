import React from 'react';
import { useI18n } from '../../i18n';

export function DangerZoneSection() {
  const { t } = useI18n();

  return (
    <section className="glass-panel" style={{ padding: '1.5rem', borderColor: 'rgba(239, 68, 68, 0.2)' }}>
      <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#ef4444' }}>
        {t('settings.danger.title')}
      </h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.9rem' }}>
        {t('settings.danger.description')}
      </p>
      <button
        className="btn"
        style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)' }}
      >
        {t('settings.danger.delete')}
      </button>
    </section>
  );
}

export default DangerZoneSection;
