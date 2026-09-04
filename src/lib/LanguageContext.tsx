'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from './supabase';
import { translations, Locale, TranslationKey } from './i18n';

type LanguageContextType = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: TranslationKey) => string;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

const LOCAL_KEY = 'paathsala_locale';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');

  useEffect(() => {
    async function load() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data } = await supabase
          .from('profiles')
          .select('locale')
          .eq('id', session.user.id)
          .single();
        if (data?.locale) {
          setLocaleState(data.locale as Locale);
          return;
        }
      }
      const saved = localStorage.getItem(LOCAL_KEY) as Locale | null;
      if (saved) setLocaleState(saved);
    }
    load();
  }, []);

  async function setLocale(l: Locale) {
    setLocaleState(l);
    localStorage.setItem(LOCAL_KEY, l);

    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      await supabase.from('profiles').update({ locale: l }).eq('id', session.user.id);
    }
  }

  function t(key: TranslationKey): string {
    return translations[locale][key];
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
