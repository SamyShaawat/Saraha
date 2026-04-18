import React from 'react';
import { inspectProps } from '../../features/shared/utils/inspect';

export type DashboardMessage = {
  id: string;
  content: string;
  date: string;
};

function MessageCard({ content, date, id }: DashboardMessage) {
  return (
    <div
      {...inspectProps('DashboardPage.MessageCard', { messageId: id })}
      className="glass-panel animate-fade-in-up"
      style={{ padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}
    >
      <div style={{ flex: 1, minWidth: '220px' }}>
        <p style={{ fontSize: '1.05rem', marginBottom: '0.75rem', lineHeight: '1.5' }}>{content}</p>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{date}</span>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button className="btn btn-glass" style={{ padding: '0.5rem' }}>
          ❤️
        </button>
        <button className="btn btn-glass" style={{ padding: '0.5rem' }}>
          📢
        </button>
        <button className="btn btn-glass" style={{ padding: '0.5rem' }}>
          🗑️
        </button>
      </div>
    </div>
  );
}

export function DashboardMessageList({ messages }: { messages: DashboardMessage[] }) {
  return (
    <section {...inspectProps('DashboardPage.MessageList')} className="responsive-stack">
      {messages.map((msg) => (
        <MessageCard key={msg.id} id={msg.id} content={msg.content} date={msg.date} />
      ))}
    </section>
  );
}

export default DashboardMessageList;
