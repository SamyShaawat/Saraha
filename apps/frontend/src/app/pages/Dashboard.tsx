import React from 'react';
import PageShell from '../components/PageShell';
import { inspectProps } from '../features/shared/utils/inspect';
import { DashboardSidebar } from '../components/dashboard/DashboardSidebar';
import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import { DashboardMessageList } from '../components/dashboard/MessageList';

const MOCK_MESSAGES = [
  { id: '1', content: 'You are doing a great job! Keep it up.', date: '2 hours ago' },
  { id: '2', content: 'I really appreciate your helping hand yesterday. You are the best.', date: '5 hours ago' },
  { id: '3', content: 'Could you be more punctual in meetings? That would help a lot.', date: '1 day ago' },
];

export function Dashboard() {
  return (
    <PageShell pageName="DashboardPage" contentName="DashboardPage.Layout" maxWidth="1280px">
      <div className="dashboard-layout">
        <DashboardSidebar />
        <section {...inspectProps('DashboardPage.Content')} style={{ minWidth: 0 }}>
          <DashboardHeader totalMessages={MOCK_MESSAGES.length} />
          <DashboardMessageList messages={MOCK_MESSAGES} />
        </section>
      </div>
    </PageShell>
  );
}

export default Dashboard;
