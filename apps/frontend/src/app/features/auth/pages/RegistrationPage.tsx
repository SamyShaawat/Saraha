import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import PageShell from '../../../components/PageShell';
import { useRedirectIfAuthenticated } from '../../shared/hooks/useRedirectIfAuthenticated';
import { AuthCard } from '../components/AuthCard';
import { AuthInput } from '../components/AuthInput';
import { getAuthError } from '../utils/getAuthError';
import { register, socialSignup } from '../services/auth.service';
import { inspectProps } from '../../shared/utils/inspect';
import { useI18n } from '../../../i18n';

export function RegistrationPage() {
  useRedirectIfAuthenticated('/dashboard');
  const navigate = useNavigate();
  const { t, setLanguage } = useI18n();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const saveSession = (data: {
    accessToken: string;
    refreshToken: string;
    user: { preferredLanguage?: 'en' | 'ar' };
  }) => {
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    localStorage.setItem('user', JSON.stringify(data.user));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await register(formData);
      if (!data.success) {
        throw new Error(getAuthError(data.error, t('auth.register.failed')));
      }

      toast.success(t('auth.register.success'));
      navigate('/login');
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : t('common.unexpectedError');
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignup = async (provider: 'google' | 'facebook') => {
    const token = window.prompt(
      t('auth.login.socialPrompt', { provider }),
    );
    if (!token) {
      return;
    }

    setLoading(true);
    setError('');
    try {
      const data = await socialSignup(provider, token.trim());
      if (!data.success) {
        throw new Error(
          getAuthError(data.error, t('auth.register.socialFailed', { provider })),
        );
      }

      saveSession(data.data);
      if (data.data.user.preferredLanguage) {
        await setLanguage(data.data.user.preferredLanguage);
      }
      toast.success(t('auth.register.socialSuccess', { provider }));
      navigate('/dashboard');
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : t('common.unexpectedError');
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageShell pageName="RegistrationPage" contentName="RegistrationPage.Container" centered maxWidth="560px">
        <AuthCard
          title={t('auth.register.title')}
          subtitle={t('auth.register.subtitle')}
          error={error}
          footerText={t('auth.register.footerText')}
          footerLinkText={t('auth.register.footerLink')}
          footerLinkTo="/login"
        >
          <form {...inspectProps('RegistrationPage.Form')} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
            <div {...inspectProps('RegistrationPage.NameRow')} className="card-grid-2">
              <AuthInput
                label={t('auth.register.firstName')}
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Jane"
              />
              <AuthInput
                label={t('auth.register.lastName')}
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Doe"
              />
            </div>

            <AuthInput
              label={t('auth.register.username')}
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              placeholder="jane_doe"
            />
            <AuthInput
              label={t('auth.register.email')}
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="jane@example.com"
            />
            <AuthInput
              label={t('auth.register.password')}
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              canTogglePassword
              passwordVisible={showPassword}
              onTogglePasswordVisibility={() => setShowPassword((prev) => !prev)}
              showPasswordLabel={t('auth.input.showPassword')}
              hidePasswordLabel={t('auth.input.hidePassword')}
            />

            <button {...inspectProps('RegistrationPage.SubmitButton')} type="submit" className="btn btn-primary" disabled={loading} style={{ marginTop: '0.5rem', padding: '1rem' }}>
              {loading ? t('auth.register.submitting') : t('auth.register.submit')}
            </button>

            <button
              {...inspectProps('RegistrationPage.GoogleButton')}
              type="button"
              className="btn btn-glass"
              disabled={loading}
              style={{ padding: '1rem' }}
              onClick={() => void handleSocialSignup('google')}
            >
              {t('auth.register.google')}
            </button>

            <button
              {...inspectProps('RegistrationPage.FacebookButton')}
              type="button"
              className="btn btn-glass"
              disabled={loading}
              style={{ padding: '1rem' }}
              onClick={() => void handleSocialSignup('facebook')}
            >
              {t('auth.register.facebook')}
            </button>
          </form>
        </AuthCard>
    </PageShell>
  );
}

export default RegistrationPage;
