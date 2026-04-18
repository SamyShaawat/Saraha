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

export function RegistrationPage() {
  useRedirectIfAuthenticated('/dashboard');
  const navigate = useNavigate();

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
      const data = await register(formData);
      if (!data.success) {
        throw new Error(getAuthError(data.error, 'Registration failed'));
      }

      toast.success('Registration successful! Please login.');
      navigate('/login');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignup = async (provider: 'google' | 'facebook') => {
    const token = window.prompt(`Paste your ${provider} access token`);
    if (!token) {
      return;
    }

    setLoading(true);
    setError('');
    try {
      const data = await socialSignup(provider, token.trim());
      if (!data.success) {
        throw new Error(getAuthError(data.error, `Failed to signup with ${provider}`));
      }

      saveSession(data.data);
      toast.success(`Signed up with ${provider}`);
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
    <PageShell pageName="RegistrationPage" contentName="RegistrationPage.Container" centered maxWidth="560px">
        <AuthCard
          title="Join the community"
          subtitle="Create your account in seconds"
          error={error}
          footerText="Already have an account?"
          footerLinkText="Login"
          footerLinkTo="/login"
        >
          <form {...inspectProps('RegistrationPage.Form')} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
            <div {...inspectProps('RegistrationPage.NameRow')} className="card-grid-2">
              <AuthInput
                label="First Name"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Jane"
              />
              <AuthInput
                label="Last Name"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Doe"
              />
            </div>

            <AuthInput
              label="Unique Username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              placeholder="jane_doe"
            />
            <AuthInput
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="jane@example.com"
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

            <button {...inspectProps('RegistrationPage.SubmitButton')} type="submit" className="btn btn-primary" disabled={loading} style={{ marginTop: '0.5rem', padding: '1rem' }}>
              {loading ? 'Creating...' : 'Create Account'}
            </button>

            <button
              {...inspectProps('RegistrationPage.GoogleButton')}
              type="button"
              className="btn btn-glass"
              disabled={loading}
              style={{ padding: '1rem' }}
              onClick={() => void handleSocialSignup('google')}
            >
              Signup with Google
            </button>

            <button
              {...inspectProps('RegistrationPage.FacebookButton')}
              type="button"
              className="btn btn-glass"
              disabled={loading}
              style={{ padding: '1rem' }}
              onClick={() => void handleSocialSignup('facebook')}
            >
              Signup with Facebook
            </button>
          </form>
        </AuthCard>
    </PageShell>
  );
}

export default RegistrationPage;
