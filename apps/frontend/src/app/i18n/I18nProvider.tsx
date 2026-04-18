import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { toast } from 'react-hot-toast';
import {
  getDirection,
  parseLanguage,
  translate,
  type AppLanguage,
} from './translations';
import {
  getLanguagePreference,
  updateLanguagePreference,
} from '../features/shared/services/language.service';

type TranslationParams = Record<string, string | number>;

type I18nContextValue = {
  language: AppLanguage;
  direction: 'ltr' | 'rtl';
  t: (key: string, params?: TranslationParams) => string;
  setLanguage: (language: AppLanguage) => Promise<void>;
};

const STORAGE_KEY = 'preferredLanguage';

const I18nContext = createContext<I18nContextValue | null>(null);

function applyDocumentLocale(language: AppLanguage) {
  if (typeof document === 'undefined') {
    return;
  }

  document.documentElement.lang = language;
  document.documentElement.dir = getDirection(language);
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<AppLanguage>(() => {
    if (typeof window === 'undefined') {
      return 'en';
    }
    return parseLanguage(localStorage.getItem(STORAGE_KEY));
  });

  useEffect(() => {
    applyDocumentLocale(language);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, language);
    }
  }, [language]);

  useEffect(() => {
    const accessToken =
      typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    if (!accessToken) {
      return;
    }

    void getLanguagePreference().then((storedLanguage) => {
      if (storedLanguage) {
        setLanguageState((currentLanguage) =>
          currentLanguage === storedLanguage ? currentLanguage : storedLanguage,
        );
      }
    });
  }, []);

  const setLanguage = async (nextLanguage: AppLanguage) => {
    const previousLanguage = language;
    setLanguageState(nextLanguage);

    const accessToken =
      typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    if (!accessToken) {
      return;
    }

    const isSaved = await updateLanguagePreference(nextLanguage);
    if (!isSaved) {
      setLanguageState(previousLanguage);
      toast.error(translate(previousLanguage, 'common.unexpectedError'));
    }
  };

  const value = useMemo<I18nContextValue>(() => {
    return {
      language,
      direction: getDirection(language),
      t: (key, params) => translate(language, key, params),
      setLanguage,
    };
  }, [language]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
}
