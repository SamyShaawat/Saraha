const BASE_URL = 'http://localhost:3000/api';

export const apiRequest = async (url: string, options: RequestInit = {}) => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    ...(options.headers as Record<string, string> || {}),
  };

  let response = await fetch(`${BASE_URL}${url}`, { ...options, headers });

  if (response.status === 401 && refreshToken) {
    // Try refreshing
    const refreshRes = await fetch(`${BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (refreshRes.ok) {
      const resData = await refreshRes.json() as any;
      const { accessToken: newAccess, refreshToken: newRefresh } = resData.data;
      
      localStorage.setItem('accessToken', newAccess);
      localStorage.setItem('refreshToken', newRefresh);
      
      // Retry original request
      headers['Authorization'] = `Bearer ${newAccess}`;
      response = await fetch(`${BASE_URL}${url}`, { ...options, headers });
    } else {
      // Refresh failed, logout
      localStorage.clear();
      window.location.href = '/login';
    }
  }

  return response;
};
