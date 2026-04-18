import React from 'react';
import { inspectProps } from '../../features/shared/utils/inspect';
import { useI18n } from '../../i18n';

function LegalSection({ title, body }: { title: string; body: string }) {
  return (
    <>
      <h2 style={{ fontSize: '1.25rem', margin: '1.25rem 0 0.75rem 0' }}>{title}</h2>
      <p style={{ color: 'var(--text-muted)' }}>{body}</p>
    </>
  );
}

export function PrivacyPolicyContent() {
  const { t } = useI18n();

  return (
    <>
      <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '1.25rem' }}>
        {t('privacy.titlePrefix')} <span className="gradient-text">{t('privacy.titleEmphasis')}</span>
      </h1>
      <article {...inspectProps('PrivacyPage.Content')} className="glass-panel" style={{ padding: 'clamp(1.25rem, 3vw, 2.5rem)', lineHeight: '1.8' }}>
        <p style={{ marginBottom: '1.25rem' }}>
          {t('privacy.intro')}
        </p>
        <LegalSection title={t('privacy.section1.title')} body={t('privacy.section1.body')} />
        <LegalSection
          title={t('privacy.section2.title')}
          body={t('privacy.section2.body')}
        />
      </article>
    </>
  );
}

export default PrivacyPolicyContent;
