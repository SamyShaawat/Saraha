import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export function LoginPage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    email_or_username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json() as any;

      if (!response.ok) {
        const errorMsg = Array.isArray(data.error) ? data.error.join(', ') : (data.error || data.message || 'Login failed');
        throw new Error(errorMsg);
      }

      console.log('Logged in:', data);
      
      // Store tokens in localStorage
      localStorage.setItem('accessToken', data.data.accessToken);
      localStorage.setItem('refreshToken', data.data.refreshToken);
      localStorage.setItem('user', JSON.stringify(data.data.user));

      toast.success('Login successful! Welcome back.');
      navigate('/dashboard');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        padding: '2rem'
      }}>
        <div className="glass-panel animate-fade-in-up" style={{ 
          maxWidth: '450px', 
          width: '100%', 
          padding: '3rem',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Welcome Back</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem' }}>Login to check your messages</p>
          
          {error && <p style={{ color: '#ff4d4d', marginBottom: '1rem' }}>{error}</p>}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Email or Username</label>
              <input 
                type="text" 
                name="email_or_username"
                required
                value={formData.email_or_username}
                onChange={handleChange}
                style={{ 
                  width: '100%', 
                  padding: '1rem', 
                  borderRadius: 'var(--radius-md)', 
                  background: 'rgba(255, 255, 255, 0.05)', 
                  border: '1px solid var(--glass-border)',
                  color: '#fff',
                  outline: 'none'
                }} placeholder="Enter your email" />
            </div>
            
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <label style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Password</label>
                <Link to="/forgot-password" style={{ fontSize: '0.8rem', color: 'var(--primary-color)' }}>Forgot?</Link>
              </div>
              <input 
                type="password" 
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                style={{ 
                  width: '100%', 
                  padding: '1rem', 
                  borderRadius: 'var(--radius-md)', 
                  background: 'rgba(255, 255, 255, 0.05)', 
                  border: '1px solid var(--glass-border)',
                  color: '#fff',
                  outline: 'none'
                }} placeholder="••••••••" />
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading} style={{ marginTop: '1rem', padding: '1rem' }}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
            
            <div style={{ position: 'relative', textAlign: 'center', margin: '1rem 0' }}>
              <hr style={{ border: '0', borderTop: '1px solid var(--glass-border)' }} />
              <span style={{ 
                position: 'absolute', 
                top: '50%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)', 
                background: '#161d31', 
                padding: '0 10px', 
                color: 'var(--text-muted)',
                fontSize: '0.8rem'
              }}>OR</span>
            </div>

            <button type="button" className="btn btn-glass" style={{ display: 'flex', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.2rem' }}>f</span> Login with Facebook
            </button>
          </form>

          <p style={{ marginTop: '2.5rem', color: 'var(--text-muted)' }}>
            Don't have an account? <Link to="/register" style={{ color: 'var(--primary-color)', fontWeight: 600 }}>Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
