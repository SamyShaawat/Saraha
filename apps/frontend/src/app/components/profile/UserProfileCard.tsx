import React from 'react';
import { inspectProps } from '../../features/shared/utils/inspect';
import { useI18n } from '../../i18n';

function ProfileAvatar({ username }: { username?: string }) {
  return (
    <div
      style={{
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        background: 'linear-gradient(45deg, #6366f1, #c084fc)',
        margin: '0 auto 1.5rem auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '2.5rem',
        color: '#fff',
        fontWeight: 800,
        boxShadow: '0 0 20px rgba(99, 102, 241, 0.4)',
      }}
    >
      {username?.charAt(0).toUpperCase() ?? '?'}
    </div>
  );
}

function AnonymousMessageForm() {
  const { t } = useI18n();

  return (
    <form {...inspectProps('UserProfilePage.Form')} className="responsive-stack">
      <textarea
        rows={6}
        style={{
          width: '100%',
          padding: '1rem',
          borderRadius: 'var(--radius-lg)',
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid var(--glass-border)',
          color: '#fff',
          outline: 'none',
          resize: 'vertical',
          minHeight: '140px',
          lineHeight: '1.6',
          fontSize: '1rem',
        }}
        placeholder={t('profile.placeholder')}
      />
      <button type="submit" className="btn btn-primary" style={{ padding: '1rem 2rem', alignSelf: 'center', fontSize: '1rem' }}>
        {t('profile.send')}
      </button>
    </form>
  );
}

function ProfileFooter() {
  const { t } = useI18n();

  return (
    <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--glass-border)' }}>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
        {t('profile.footer.prompt')}{' '}
        <a href="/register" style={{ color: 'var(--primary-color)' }}>
          {t('profile.footer.link')}
        </a>
      </p>
    </div>
  );
}

export function UserProfileCard({ username }: { username?: string }) {
  const { t } = useI18n();

  return (
    <section
      {...inspectProps('UserProfilePage.Card')}
      className="glass-panel animate-fade-in-up"
      style={{ width: '100%', padding: 'clamp(1.25rem, 3vw, 2.5rem)', textAlign: 'center' }}
    >
      <ProfileAvatar username={username} />
      <h1 style={{ fontSize: 'clamp(1.4rem, 3.5vw, 2rem)', marginBottom: '0.5rem' }}>
        {t('profile.title')} <span className="gradient-text">@{username}</span>
      </h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        {t('profile.subtitle')}
      </p>
      <AnonymousMessageForm />
      <ProfileFooter />
    </section>
  );
}

export default UserProfileCard;
