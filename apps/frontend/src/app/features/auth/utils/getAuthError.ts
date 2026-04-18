export function getAuthError(error: string | string[] | null | undefined, fallback: string) {
  if (Array.isArray(error) && error.length > 0) return error.join(', ');
  if (typeof error === 'string' && error.trim().length > 0) return error;
  return fallback;
}
