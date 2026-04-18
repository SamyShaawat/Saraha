import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Navbar from '../../../components/Navbar';
import { useRedirectIfAuthenticated } from '../../shared/hooks/useRedirectIfAuthenticated';
import { AuthCard } from '../components/AuthCard';
import { AuthInput } from '../components/AuthInput';
import { getAuthError } from '../utils/getAuthError';
import { login, socialLogin } from '../services/auth.service';
import { inspectProps } from '../../shared/utils/inspect';

export function LoginPage() {
  useRedirectIfAuthenticated('/dashboard');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email_or_username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const saveSession = (data: { accessToken: string; refreshToken: string; user: unknown }) => {
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
        throw new Error(getAuthError(data.error, 'Login failed'));
      }

      saveSession(data.data);

      toast.success('Login successful! Welcome back.');
      navigate('/dashboard');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'facebook') => {
    const token = window.prompt(`Paste your ${provider} access token`);
    if (!token) {
      return;
    }

    setLoading(true);
    setError('');
    try {
      const data = await socialLogin(provider, token.trim());
      if (!data.success) {
        throw new Error(getAuthError(data.error, `Failed to login with ${provider}`));
      }

      saveSession(data.data);
      toast.success(`Logged in with ${provider}`);
      navigate('/dashboard');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div {...inspectProps('LoginPage')}>
      <Navbar />
      <div
        {...inspectProps('LoginPage.Container')}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          padding: '2rem',
        }}
      >
        <AuthCard
          title="Welcome Back"
          subtitle="Login to check your messages"
          error={error}
          footerText="Don't have an account?"
          footerLinkText="Register"
          footerLinkTo="/register"
        >
          <form {...inspectProps('LoginPage.Form')} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
            <AuthInput
              label="Email or Username"
              name="email_or_username"
              type="text"
              value={formData.email_or_username}
              onChange={handleChange}
              placeholder="Enter your email"
            />
            <AuthInput
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              canTogglePassword
              passwordVisible={showPassword}
              onTogglePasswordVisibility={() => setShowPassword((prev) => !prev)}
            />

            <div {...inspectProps('LoginPage.ForgotContainer')} style={{ textAlign: 'right' }}>
              <Link {...inspectProps('LoginPage.ForgotLink', { to: '/forgot-password' })} to="/forgot-password" style={{ fontSize: '0.85rem', color: 'var(--primary-color)' }}>
                Forgot?
              </Link>
            </div>

            <button {...inspectProps('LoginPage.SubmitButton')} type="submit" className="btn btn-primary" disabled={loading} style={{ marginTop: '0.5rem', padding: '1rem' }}>
              {loading ? 'Logging in...' : 'Login'}
            </button>

            <button
              {...inspectProps('LoginPage.GoogleButton')}
              type="button"
              className="btn btn-glass"
              disabled={loading}
              style={{ padding: '1rem' }}
              onClick={() => void handleSocialLogin('google')}
            >
              Login with Google
            </button>

            <button
              {...inspectProps('LoginPage.FacebookButton')}
              type="button"
              className="btn btn-glass"
              disabled={loading}
              style={{ padding: '1rem' }}
              onClick={() => void handleSocialLogin('facebook')}
            >
              Login with Facebook
            </button>
          </form>
        </AuthCard>
      </div>
    </div>
  );
}

export default LoginPage;
