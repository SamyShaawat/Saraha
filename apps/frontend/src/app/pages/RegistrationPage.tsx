import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export function RegistrationPage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
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
      const response = await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json() as any;

      if (!response.ok) {
        const errorMsg = Array.isArray(data.error) ? data.error.join(', ') : (data.error || data.message || 'Registration failed');
        throw new Error(errorMsg);
      }

      console.log('User created:', data);
      toast.success('Registration successful! Please login.');
      navigate('/login');
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
        padding: '2rem',
        marginTop: '2rem'
      }}>
        <div className="glass-panel animate-fade-in-up" style={{ 
          maxWidth: '500px', 
          width: '100%', 
          padding: '3rem',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Join the community</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Create your account in seconds</p>
          
          {error && <p style={{ color: '#ff4d4d', marginBottom: '1rem' }}>{error}</p>}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', textAlign: 'left' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>First Name</label>
                <input 
                  type="text" 
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  style={{ 
                    width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-md)', 
                    background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--glass-border)', color: '#fff', outline: 'none'
                  }} placeholder="Jane" />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>Last Name</label>
                <input 
                  type="text" 
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  style={{ 
                    width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-md)', 
                    background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--glass-border)', color: '#fff', outline: 'none'
                  }} placeholder="Doe" />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>Unique Username</label>
              <input 
                type="text" 
                name="username"
                required
                value={formData.username}
                onChange={handleChange}
                style={{ 
                  width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-md)', 
                  background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--glass-border)', color: '#fff', outline: 'none'
                }} placeholder="jane_doe" />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>Email Address</label>
              <input 
                type="email" 
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                style={{ 
                  width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-md)', 
                  background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--glass-border)', color: '#fff', outline: 'none'
                }} placeholder="jane@example.com" />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>Password</label>
              <input 
                type="password" 
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                style={{ 
                  width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-md)', 
                  background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--glass-border)', color: '#fff', outline: 'none'
                }} placeholder="••••••••" />
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading} style={{ marginTop: '1rem', padding: '1rem' }}>
              {loading ? 'Creating...' : 'Create Account'}
            </button>
            
            <button type="button" className="btn btn-glass" style={{ display: 'flex', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.2rem' }}>f</span> Sign up with Facebook
            </button>
          </form>

          <p style={{ marginTop: '2.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Already have an account? <Link to="/login" style={{ color: 'var(--primary-color)', fontWeight: 600 }}>Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegistrationPage;
