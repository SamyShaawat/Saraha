import React from 'react';
import PageShell from '../../components/PageShell';
import { PrivacyPolicyContent } from '../../components/static/PrivacyPolicyContent';

export function PrivacyPage() {
  return (
    <PageShell pageName="PrivacyPage" contentName="PrivacyPage.Container" maxWidth="900px">
      <PrivacyPolicyContent />
    </PageShell>
  );
}

export default PrivacyPage;
