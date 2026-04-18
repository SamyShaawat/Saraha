import React from 'react';
import { inspectProps } from '../../features/shared/utils/inspect';
import { useI18n } from '../../i18n';

function TermsSection({ title, body }: { title: string; body: string }) {
  return (
    <>
      <h2 style={{ fontSize: '1.25rem', margin: '1.25rem 0 0.75rem 0' }}>{title}</h2>
      <p style={{ color: 'var(--text-muted)' }}>{body}</p>
    </>
  );
}

export function TermsOfUseContent() {
  const { t } = useI18n();

  return (
    <>
      <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '1.25rem' }}>
        {t('terms.titlePrefix')} <span className="gradient-text">{t('terms.titleEmphasis')}</span>
      </h1>
      <article {...inspectProps('TermsPage.Content')} className="glass-panel" style={{ padding: 'clamp(1.25rem, 3vw, 2.5rem)', lineHeight: '1.8' }}>
        <p style={{ marginBottom: '1.25rem' }}>{t('terms.intro')}</p>
        <TermsSection title={t('terms.section1.title')} body={t('terms.section1.body')} />
        <TermsSection
          title={t('terms.section2.title')}
          body={t('terms.section2.body')}
        />
      </article>
    </>
  );
}

export default TermsOfUseContent;
