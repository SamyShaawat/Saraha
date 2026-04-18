import React from 'react';
import PageShell from '../components/PageShell';
import { inspectProps } from '../features/shared/utils/inspect';
import { SettingsSidebar } from '../components/settings/SettingsSidebar';
import { ProfileSection } from '../components/settings/ProfileSection';
import { SecuritySection } from '../components/settings/SecuritySection';
import { DangerZoneSection } from '../components/settings/DangerZoneSection';
import { useI18n } from '../i18n';

export function SettingsPage() {
  const { t } = useI18n();

  return (
    <PageShell pageName="SettingsPage" contentName="SettingsPage.Layout" maxWidth="1200px">
      <div className="dashboard-layout">
        <SettingsSidebar />
        <section {...inspectProps('SettingsPage.Content')} className="responsive-stack" style={{ minWidth: 0 }}>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}>
            {t('settings.page.titlePrefix')}{' '}
            <span className="gradient-text">{t('settings.page.titleEmphasis')}</span>
          </h1>
          <ProfileSection />
          <SecuritySection />
          <DangerZoneSection />
        </section>
      </div>
    </PageShell>
  );
}

export default SettingsPage;
