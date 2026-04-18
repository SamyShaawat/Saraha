import React from 'react';
import { inspectProps } from '../../features/shared/utils/inspect';
import { useI18n } from '../../i18n';

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
  const { t } = useI18n();

  return (
    <section
      {...inspectProps('LandingPage.Features')}
      style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', padding: '1rem 0 2rem' }}
    >
      <FeatureCard
        title={t('landing.features.work.title')}
        icon="💼"
        tint="rgba(99, 102, 241, 0.2)"
        points={[
          `✨ ${t('landing.features.work.point1')}`,
          `🛠 ${t('landing.features.work.point2')}`,
          `📈 ${t('landing.features.work.point3')}`,
        ]}
      />
      <FeatureCard
        title={t('landing.features.friends.title')}
        icon="🌟"
        tint="rgba(192, 132, 252, 0.2)"
        points={[
          `🤝 ${t('landing.features.friends.point1')}`,
          `🎭 ${t('landing.features.friends.point2')}`,
          `💬 ${t('landing.features.friends.point3')}`,
        ]}
      />
    </section>
  );
}

export default LandingFeatures;
