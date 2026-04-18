import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageShell from '../components/PageShell';
import { LandingHero } from '../components/landing/LandingHero';
import { LandingFeatures } from '../components/landing/LandingFeatures';
import { LandingFooter } from '../components/landing/LandingFooter';

export function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <PageShell pageName="LandingPage">
      <LandingHero />
      <LandingFeatures />
      <LandingFooter />
    </PageShell>
  );
}

export default LandingPage;
