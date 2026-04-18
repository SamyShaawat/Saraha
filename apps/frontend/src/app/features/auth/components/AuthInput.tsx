import type React from 'react';
import { inspectProps } from '../../shared/utils/inspect';

type AuthInputProps = {
  label: string;
  name: string;
  type: string;
  value: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function AuthInput({ label, name, type, value, placeholder, onChange }: AuthInputProps) {
  return (
    <div {...inspectProps('AuthInput', { name, type })}>
      <label {...inspectProps('AuthInput.Label', { name })} style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
        {label}
      </label>
      <input
        {...inspectProps('AuthInput.Field', { name, type })}
        type={type}
        name={name}
        required
        value={value}
        onChange={onChange}
        style={{
          width: '100%',
          padding: '1rem',
          borderRadius: 'var(--radius-md)',
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid var(--glass-border)',
          color: '#fff',
          outline: 'none',
        }}
        placeholder={placeholder}
      />
    </div>
  );
}
