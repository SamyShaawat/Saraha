import React from 'react';
import PageShell from '../../components/PageShell';
import { ContactFormCard } from '../../components/static/ContactFormCard';

export function ContactPage() {
  return (
    <PageShell pageName="ContactPage" contentName="ContactPage.Container" centered maxWidth="700px">
      <ContactFormCard />
    </PageShell>
  );
}

export default ContactPage;
