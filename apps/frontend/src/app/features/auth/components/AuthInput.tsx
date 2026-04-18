import type React from 'react';
import { inspectProps } from '../../shared/utils/inspect';

type AuthInputProps = {
  label: string;
  name: string;
  type: string;
  value: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  canTogglePassword?: boolean;
  passwordVisible?: boolean;
  onTogglePasswordVisibility?: () => void;
};

export function AuthInput({
  label,
  name,
  type,
  value,
  placeholder,
  onChange,
  canTogglePassword = false,
  passwordVisible = false,
  onTogglePasswordVisibility,
}: AuthInputProps) {
  const inputType = canTogglePassword ? (passwordVisible ? 'text' : 'password') : type;

  return (
    <div {...inspectProps('AuthInput', { name, type })}>
      <label {...inspectProps('AuthInput.Label', { name })} style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
        {label}
      </label>
      <div style={{ position: 'relative' }}>
        <input
          {...inspectProps('AuthInput.Field', { name, type: inputType })}
          type={inputType}
          name={name}
          required
          value={value}
          onChange={onChange}
          style={{
            width: '100%',
            padding: canTogglePassword ? '1rem 3rem 1rem 1rem' : '1rem',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid var(--glass-border)',
            color: '#fff',
            outline: 'none',
          }}
          placeholder={placeholder}
        />
        {canTogglePassword && onTogglePasswordVisibility ? (
          <button
            {...inspectProps('AuthInput.TogglePassword', { visible: passwordVisible })}
            type="button"
            onClick={onTogglePasswordVisibility}
            aria-label={passwordVisible ? 'Hide password' : 'Show password'}
            style={{
              position: 'absolute',
              right: '0.8rem',
              top: '50%',
              transform: 'translateY(-50%)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '2rem',
              height: '2rem',
              border: 'none',
              background: 'transparent',
              color: 'var(--text-muted)',
              cursor: 'pointer',
            }}
          >
            {passwordVisible ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M3 3l18 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M6.7 6.7A13.2 13.2 0 0 0 2 12s3.5 6 10 6a9.7 9.7 0 0 0 3.9-.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M9.9 4.3A10 10 0 0 1 12 4c6.5 0 10 6 10 6a16.4 16.4 0 0 1-4.6 5.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z" stroke="currentColor" strokeWidth="1.8" />
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
              </svg>
            )}
          </button>
        ) : null}
      </div>
    </div>
  );
}
