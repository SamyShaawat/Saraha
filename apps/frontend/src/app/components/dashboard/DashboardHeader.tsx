import React from 'react';
import { useI18n } from '../../i18n';

export function DashboardHeader({ totalMessages }: { totalMessages: number }) {
  const { t } = useI18n();

  return (
    <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
      <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}>
        {t('dashboard.header.titlePrefix')}{' '}
        <span className="gradient-text">{t('dashboard.header.titleEmphasis')}</span>
      </h1>
      <div style={{ color: 'var(--text-muted)' }}>
        {t('dashboard.header.received', { count: totalMessages })}
      </div>
    </header>
  );
}

export default DashboardHeader;
