import React from 'react';
import { inspectProps } from '../../features/shared/utils/inspect';

type FeatureCardProps = {
  title: string;
  icon: string;
  tint: string;
  points: string[];
};

function FeatureCard({ title, icon, tint, points }: FeatureCardProps) {
  return (
    <div className="glass-panel animate-fade-in-up delay-300" style={{ padding: '2rem', textAlign: 'center' }}>
      <div
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: tint,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem auto',
        }}
      >
        <span style={{ fontSize: '1.5rem' }}>{icon}</span>
      </div>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{title}</h2>
      <ul style={{ color: 'var(--text-muted)', textAlign: 'left', lineHeight: 2, margin: '0 auto', display: 'inline-block' }}>
        {points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    </div>
  );
}

export function LandingFeatures() {
  return (
    <section
      {...inspectProps('LandingPage.Features')}
      style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', padding: '1rem 0 2rem' }}
    >
      <FeatureCard
        title="At Work"
        icon="💼"
        tint="rgba(99, 102, 241, 0.2)"
        points={['✨ Enhance your strengths', '🛠 Address your weaknesses', '📈 Build professional transparency']}
      />
      <FeatureCard
        title="With Friends"
        icon="🌟"
        tint="rgba(192, 132, 252, 0.2)"
        points={['🤝 Strengthen your friendships', '🎭 Let your friends be honest', '💬 Know what people really think']}
      />
    </section>
  );
}

export default LandingFeatures;
