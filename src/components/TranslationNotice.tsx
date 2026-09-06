'use client';

import { useLanguage } from '@/lib/LanguageContext';
import { reviewedLocales } from '@/lib/i18n';

export default function TranslationNotice() {
  const { locale } = useLanguage();

  if (reviewedLocales.includes(locale)) return null;

  return (
    <div style={{ background: 'var(--notice-bg)', borderBottom: '1px solid var(--marigold)', padding: '8px 16px', textAlign: 'center' }}>
      <p style={{ fontSize: '12.5px', color: 'var(--indigo)', margin: 0 }}>
        This language is an early AI-drafted translation and hasn&apos;t been reviewed by a native speaker yet.
      </p>
    </div>
  );
}
