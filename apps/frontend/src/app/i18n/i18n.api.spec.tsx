import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { act } from 'react-dom/test-utils';
import { createRoot, type Root } from 'react-dom/client';
import { I18nProvider, useI18n } from './index';
import { getDirection, parseLanguage, translate } from './translations';

function I18nProbe() {
  const { t, setLanguage, direction } = useI18n();

  return (
    <div>
      <span data-testid="label">{t('navbar.login')}</span>
      <span data-testid="direction">{direction}</span>
      <button
        type="button"
        data-testid="switch"
        onClick={() => {
          void setLanguage('ar');
        }}
      >
        switch
      </button>
    </div>
  );
}

describe('frontend i18n', () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    localStorage.clear();
    document.documentElement.lang = '';
    document.documentElement.dir = '';
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    root.unmount();
    container.remove();
  });

  it('should resolve language utility helpers using AAA', () => {
    // Arrange
    const unknownLanguage = 'fr';

    // Act
    const parsedLanguage = parseLanguage(unknownLanguage);
    const translatedText = translate('ar', 'dashboard.header.received', { count: 5 });
    const direction = getDirection('ar');

    // Assert
    expect(parsedLanguage).toBe('en');
    expect(translatedText).toContain('5');
    expect(direction).toBe('rtl');
  });

  it('should update language, text, localStorage, and document direction using AAA', async () => {
    // Arrange
    await act(async () => {
      root.render(
        <I18nProvider>
          <I18nProbe />
        </I18nProvider>,
      );
    });

    const labelBefore = container.querySelector('[data-testid="label"]');
    const switchButton = container.querySelector(
      '[data-testid="switch"]',
    ) as HTMLButtonElement | null;

    // Act
    await act(async () => {
      switchButton?.click();
    });
    const labelAfter = container.querySelector('[data-testid="label"]');

    // Assert
    expect(labelBefore?.textContent).toBe('Login');
    expect(labelAfter?.textContent).toBe('تسجيل الدخول');
    expect(localStorage.getItem('preferredLanguage')).toBe('ar');
    expect(document.documentElement.lang).toBe('ar');
    expect(document.documentElement.dir).toBe('rtl');
  });
});
