import React from 'react';
import { Link } from 'react-router-dom';
import { inspectProps } from '../../features/shared/utils/inspect';
import { useI18n } from '../../i18n';

export function LandingFooter() {
  const { t } = useI18n();

  return (
    <footer
      {...inspectProps('LandingPage.Footer')}
      style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}
    >
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem 2rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <Link to="/contact" style={{ transition: 'color 0.2s' }}>
          {t('landing.footer.feedback')}
        </Link>
        <Link to="/privacy" style={{ transition: 'color 0.2s' }}>
          {t('landing.footer.privacy')}
        </Link>
        <a href="#" style={{ transition: 'color 0.2s' }}>
          {t('landing.footer.facebookGroup')}
        </a>
        <Link to="/contact" style={{ transition: 'color 0.2s' }}>
          {t('landing.footer.contact')}
        </Link>
      </div>
      <p>{t('landing.footer.copyright')}</p>
    </footer>
  );
}

export default LandingFooter;
