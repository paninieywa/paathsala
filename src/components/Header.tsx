'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useLanguage } from '@/lib/LanguageContext';
import { localeNames, Locale } from '@/lib/i18n';

export default function Header() {
  const [userId, setUserId] = useState<string | null>(null);
  const { locale, setLocale, t } = useLanguage();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserId(session?.user.id ?? null);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserId(session?.user.id ?? null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 32px',
        borderBottom: '1px solid #E4DCC6',
        background: 'var(--paper)',
        flexWrap: 'wrap',
        gap: '10px',
      }}
    >
      <Link href="/" className="font-dev" style={{ fontSize: '22px', color: 'var(--marigold)', textDecoration: 'none' }}>
        पाठशाला
      </Link>

      <nav style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
        <Link href="/" style={{ fontSize: '14px', color: 'var(--indigo)', textDecoration: 'none' }}>
          {t('home')}
        </Link>
        <Link href="/leaderboard" style={{ fontSize: '14px', color: 'var(--indigo)', textDecoration: 'none' }}>
          Leaderboard
        </Link>
        {userId ? (
          <Link href="/profile" style={{ fontSize: '14px', color: 'var(--indigo)', textDecoration: 'none' }}>
            {t('profile')}
          </Link>
        ) : (
          <Link href="/login" style={{ fontSize: '14px', color: 'var(--indigo)', textDecoration: 'none' }}>
            {t('login')}
          </Link>
        )}
        <select
          value={locale}
          onChange={(e) => setLocale(e.target.value as Locale)}
          style={{ fontSize: '13px', border: '1px solid var(--indigo)', color: 'var(--indigo)', background: 'var(--paper)', padding: '4px 8px' }}
        >
          {Object.entries(localeNames).map(([code, name]) => (
            <option key={code} value={code}>{name}</option>
          ))}
        </select>
      </nav>
    </header>
  );
}
