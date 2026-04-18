import React from 'react';
import PageShell from '../../components/PageShell';
import { TermsOfUseContent } from '../../components/static/TermsOfUseContent';

export function TermsPage() {
  return (
    <PageShell pageName="TermsPage" contentName="TermsPage.Container" maxWidth="900px">
      <TermsOfUseContent />
    </PageShell>
  );
}

export default TermsPage;
