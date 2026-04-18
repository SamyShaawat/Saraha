import { apiRequest } from '../../../utils/api';
import type { AppLanguage } from '../../../i18n/translations';

type ApiEnvelope<T> = {
  success: boolean;
  data: T;
  error: string | string[] | null;
};

type LanguageResponse = {
  preferredLanguage: AppLanguage;
};

export async function getLanguagePreference(): Promise<AppLanguage | null> {
  const response = await apiRequest('/users/me/language');
  if (!response.ok) {
    return null;
  }

  const payload = (await response.json()) as ApiEnvelope<LanguageResponse>;
  if (!payload.success || !payload.data.preferredLanguage) {
    return null;
  }

  return payload.data.preferredLanguage;
}

export async function updateLanguagePreference(
  language: AppLanguage,
): Promise<boolean> {
  const response = await apiRequest('/users/me/language', {
    method: 'PUT',
    body: JSON.stringify({ language }),
  });

  if (!response.ok) {
    return false;
  }

  const payload = (await response.json()) as ApiEnvelope<LanguageResponse>;
  return payload.success && payload.data.preferredLanguage === language;
}
