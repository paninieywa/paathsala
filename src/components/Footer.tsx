'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer style={{ background: 'var(--ink)', padding: 'clamp(32px, 6vw, 56px) clamp(20px, 5vw, 48px) clamp(20px, 4vw, 32px)', marginTop: '60px' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '32px', marginBottom: '32px' }}>
          <div style={{ maxWidth: '360px' }}>
            <p className="font-dev" style={{ fontSize: '24px', color: 'var(--marigold)', marginBottom: '12px' }}>
              पाठशाला
            </p>
            <p style={{ fontSize: '13.5px', color: '#B9C4BC', lineHeight: 1.7 }}>
              {t('footerAbout')}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap' }}>
            <div>
              <p style={{ fontSize: '11.5px', color: '#7C8B83', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {t('ourWork')}
              </p>
              <a href="https://jagatmanthan.vercel.app/" target="_blank" rel="noopener noreferrer" style={{ fontSize: '13.5px', color: 'var(--marigold)' }}>Jagat Manthan</a>
            </div>

            <div>
              <p style={{ fontSize: '11.5px', color: '#7C8B83', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Legal
              </p>
              <div className="flex flex-col gap-2">
                <Link href="/privacy" style={{ fontSize: '13.5px', color: '#D8E0DA' }}>{t('privacyPolicy')}</Link>
                <Link href="/terms" style={{ fontSize: '13.5px', color: '#D8E0DA' }}>{t('termsOfService')}</Link>
              </div>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #2A3A35', paddingTop: '20px' }}>
          <p style={{ fontSize: '12.5px', color: '#7C8B83' }}>
            {t('builtBy')}
          </p>
        </div>
      </div>
    </footer>
  );
}
