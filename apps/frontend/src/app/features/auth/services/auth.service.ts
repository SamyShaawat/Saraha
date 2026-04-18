const BASE_URL = 'http://localhost:3008/api';

type AuthLoginPayload = {
  email_or_username: string;
  password: string;
};

type AuthRegisterPayload = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
};

type SocialProvider = 'google' | 'facebook';

type ApiEnvelope<T> = {
  success: boolean;
  data: T;
  error: string | string[] | null;
  message?: string;
};

type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
  };
};

async function parseResponse<T>(response: Response): Promise<ApiEnvelope<T>> {
  return (await response.json()) as ApiEnvelope<T>;
}

export async function login(payload: AuthLoginPayload): Promise<ApiEnvelope<LoginResponse>> {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return parseResponse<LoginResponse>(response);
}

export async function register(payload: AuthRegisterPayload): Promise<ApiEnvelope<{ id: string }>> {
  const response = await fetch(`${BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return parseResponse<{ id: string }>(response);
}

export async function socialSignup(provider: SocialProvider, accessToken: string): Promise<ApiEnvelope<LoginResponse>> {
  const response = await fetch(`${BASE_URL}/auth/${provider}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ access_token: accessToken }),
  });
  return parseResponse<LoginResponse>(response);
}

export async function socialLogin(provider: SocialProvider, accessToken: string): Promise<ApiEnvelope<LoginResponse>> {
  const response = await fetch(`${BASE_URL}/auth/${provider}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ access_token: accessToken }),
  });
  return parseResponse<LoginResponse>(response);
}
