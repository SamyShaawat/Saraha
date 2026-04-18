import React from 'react';
import { useI18n } from '../../i18n';

export function SecuritySection() {
  const { t } = useI18n();

  return (
    <section className="glass-panel" style={{ padding: '1.5rem' }}>
      <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>
        {t('settings.security.title')}
      </h2>
      <button className="btn btn-glass">{t('settings.security.changePassword')}</button>
    </section>
  );
}

export default SecuritySection;
