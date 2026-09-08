'use client';

import { useState } from 'react';
import Hero3D from '@/components/Hero3D';
import ExamSelector from '@/components/ExamSelector';
import { getUpcomingDeadlines } from '@/data/deadlines'
import { exams } from '@/data/exams';
import Link from 'next/link';
import { Swords } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export default function Home() {
  const { t } = useLanguage();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const upcoming = getUpcomingDeadlines(selectedIds);

  return (
    <main>
      <section style={{ background: 'var(--hero-bg)', height: '70vh', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <Hero3D />
        </div>
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            padding: 'clamp(40px, 8vw, 80px) clamp(20px, 5vw, 48px)',
            color: 'var(--paper)',
            pointerEvents: 'none',
          }}
        >
          <h1 className="font-dev hero-title" style={{ fontSize: '56px', color: 'var(--marigold)' }}>
            पाठशाला
          </h1>
          <p className="font-display hero-tagline" style={{ fontSize: '20px', maxWidth: '480px', color: 'var(--hero-text)' }}>
            {t('tagline')}
          </p>
        </div>
      </section>

      <section style={{ padding: 'clamp(24px, 6vw, 64px) clamp(20px, 5vw, 48px)' }}>
        <ExamSelector onChange={setSelectedIds} />
      </section>

      {selectedIds.length > 0 && (
        <section style={{ padding: `0 clamp(20px, 5vw, 48px) 40px` }}>
          <h2 className="font-display text-xl mb-3" style={{ color: 'var(--indigo)' }}>
            {t('upcomingDeadlines')}
          </h2>
          {upcoming.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>No upcoming deadlines for your chosen exams.</p>
          ) : (
            <div className="flex flex-col gap-2">
              {upcoming.map((d, i) => {
                const exam = exams.find((e) => e.id === d.examId);
                return (
                  <div key={i} style={{ border: '1px solid var(--border)', background: 'var(--surface)', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                    <span style={{ fontSize: '14px', color: 'var(--ink)' }}>
                      {exam?.name} — {d.label}
                    </span>
                    <span style={{ fontSize: '13px', color: 'var(--kumkum)' }}>
                      {new Date(d.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      )}

      <section style={{ padding: `0 clamp(20px, 5vw, 48px) 64px` }}>
  <Link
    href="/arena"
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '16px',
      border: '1px solid var(--hero-border)',
      background: 'var(--hero-bg)',
      padding: '24px',
      textDecoration: 'none',
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
      <Swords size={28} color="var(--marigold)" />
      <div>
        <p className="font-display" style={{ fontSize: '18px', color: 'var(--hero-text)' }}>Challenge Arena</p>
        <p style={{ fontSize: '13px', color: 'var(--hero-text)', opacity: 0.8 }}>
          Race a friend head-to-head — first to answer 10 questions wins the tug of war.
        </p>
      </div>
    </div>
    <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--marigold)' }}>Play now →</span>
  </Link>
</section>
    </main>
  );
}
