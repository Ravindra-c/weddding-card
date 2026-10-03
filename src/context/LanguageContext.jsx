import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { translations } from '../data/translations';
import { weddingData } from '../data/weddingData';
import { getGuestName, fmt } from '../utils/helpers';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en'); // default: English ('te' for Telugu)
  const guest = useMemo(() => getGuestName(), []);

  const value = useMemo(() => {
    const t = translations[lang];
    const d = weddingData[lang];
    const greeting = guest ? fmt(t.greeting.guest, { name: guest }) : t.greeting.default;
    return { lang, setLang, t, d, guest, greeting, isTelugu: lang === 'te' };
  }, [lang, guest]);

  // Keep <html lang> and the tab title in sync with the language.
  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = weddingData.siteTitle[lang];
  }, [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used inside <LanguageProvider>');
  return ctx;
}

export function useLocalized() {
  const { lang } = useLang();
  /** pick({en:'a', te:'b'}) → string for current language */
  return useCallback((obj) => (obj && typeof obj === 'object' ? obj[lang] ?? obj.en : obj), [lang]);
}