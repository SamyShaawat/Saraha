import React from 'react';
import PageShell from '../components/PageShell';
import { inspectProps } from '../features/shared/utils/inspect';
import { DashboardSidebar } from '../components/dashboard/DashboardSidebar';
import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import { DashboardMessageList } from '../components/dashboard/MessageList';
import { useI18n } from '../i18n';

export function Dashboard() {
  const { t } = useI18n();
  const mockMessages = [
    {
      id: '1',
      content: 'You are doing a great job! Keep it up.',
      date: t('dashboard.message.date2Hours'),
    },
    {
      id: '2',
      content: 'I really appreciate your helping hand yesterday. You are the best.',
      date: t('dashboard.message.date5Hours'),
    },
    {
      id: '3',
      content: 'Could you be more punctual in meetings? That would help a lot.',
      date: t('dashboard.message.date1Day'),
    },
  ];

  return (
    <PageShell pageName="DashboardPage" contentName="DashboardPage.Layout" maxWidth="1280px">
      <div className="dashboard-layout">
        <DashboardSidebar />
        <section {...inspectProps('DashboardPage.Content')} style={{ minWidth: 0 }}>
          <DashboardHeader totalMessages={mockMessages.length} />
          <DashboardMessageList messages={mockMessages} />
        </section>
      </div>
    </PageShell>
  );
}

export default Dashboard;
