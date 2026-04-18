import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function useRedirectIfAuthenticated(destination = '/dashboard') {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      navigate(destination);
    }
  }, [destination, navigate]);
}
