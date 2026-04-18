import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import PageShell from '../../../components/PageShell';
import { useRedirectIfAuthenticated } from '../../shared/hooks/useRedirectIfAuthenticated';
import { AuthCard } from '../components/AuthCard';
import { AuthInput } from '../components/AuthInput';
import { getAuthError } from '../utils/getAuthError';
import { login, socialLogin } from '../services/auth.service';
import { inspectProps } from '../../shared/utils/inspect';
import { useI18n } from '../../../i18n';

export function LoginPage() {
  useRedirectIfAuthenticated('/dashboard');
  const navigate = useNavigate();
  const { t, setLanguage } = useI18n();

  const [formData, setFormData] = useState({
    email_or_username: '',
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
      const data = await login(formData);
      if (!data.success) {
        throw new Error(getAuthError(data.error, t('auth.login.failed')));
      }

      saveSession(data.data);
      if (data.data.user.preferredLanguage) {
        await setLanguage(data.data.user.preferredLanguage);
      }

      toast.success(t('auth.login.success'));
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

  const handleSocialLogin = async (provider: 'google' | 'facebook') => {
    const token = window.prompt(
      t('auth.login.socialPrompt', { provider }),
    );
    if (!token) {
      return;
    }

    setLoading(true);
    setError('');
    try {
      const data = await socialLogin(provider, token.trim());
      if (!data.success) {
        throw new Error(
          getAuthError(data.error, t('auth.login.socialFailed', { provider })),
        );
      }

      saveSession(data.data);
      if (data.data.user.preferredLanguage) {
        await setLanguage(data.data.user.preferredLanguage);
      }
      toast.success(t('auth.login.socialSuccess', { provider }));
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
    <PageShell pageName="LoginPage" contentName="LoginPage.Container" centered maxWidth="520px">
        <AuthCard
          title={t('auth.login.title')}
          subtitle={t('auth.login.subtitle')}
          error={error}
          footerText={t('auth.login.footerText')}
          footerLinkText={t('auth.login.footerLink')}
          footerLinkTo="/register"
        >
          <form {...inspectProps('LoginPage.Form')} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
            <AuthInput
              label={t('auth.login.emailOrUsername')}
              name="email_or_username"
              type="text"
              value={formData.email_or_username}
              onChange={handleChange}
              placeholder={t('auth.login.emailPlaceholder')}
            />
            <AuthInput
              label={t('auth.login.password')}
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

            <div {...inspectProps('LoginPage.ForgotContainer')} style={{ textAlign: 'right' }}>
              <Link {...inspectProps('LoginPage.ForgotLink', { to: '/forgot-password' })} to="/forgot-password" style={{ fontSize: '0.85rem', color: 'var(--primary-color)' }}>
                {t('auth.login.forgot')}
              </Link>
            </div>

            <button {...inspectProps('LoginPage.SubmitButton')} type="submit" className="btn btn-primary" disabled={loading} style={{ marginTop: '0.5rem', padding: '1rem' }}>
              {loading ? t('auth.login.submitting') : t('auth.login.submit')}
            </button>

            <button
              {...inspectProps('LoginPage.GoogleButton')}
              type="button"
              className="btn btn-glass"
              disabled={loading}
              style={{ padding: '1rem' }}
              onClick={() => void handleSocialLogin('google')}
            >
              {t('auth.login.google')}
            </button>

            <button
              {...inspectProps('LoginPage.FacebookButton')}
              type="button"
              className="btn btn-glass"
              disabled={loading}
              style={{ padding: '1rem' }}
              onClick={() => void handleSocialLogin('facebook')}
            >
              {t('auth.login.facebook')}
            </button>
          </form>
        </AuthCard>
    </PageShell>
  );
}

export default LoginPage;
