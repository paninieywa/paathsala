'use client';

import { useState } from 'react';
import Hero3D from '@/components/Hero3D';
import ExamSelector from '@/components/ExamSelector';
import { getUpcomingDeadlines } from '@/data/deadlines';
import { getFactsForExams } from '@/data/facts';
import { exams } from '@/data/exams';
import { useLanguage } from '@/lib/LanguageContext';

export default function Home() {
  const { t } = useLanguage();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const upcoming = getUpcomingDeadlines(selectedIds);
  const relevantFacts = getFactsForExams(selectedIds);

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

      {selectedIds.length > 0 && relevantFacts.length > 0 && (
        <section style={{ padding: `0 clamp(20px, 5vw, 48px) 64px` }}>
          <h2 className="font-display text-xl mb-3" style={{ color: 'var(--indigo)' }}>
            Facts &amp; tricks for you
          </h2>
          <div className="flex flex-col gap-2">
            {relevantFacts.map((f, i) => (
              <div key={i} style={{ borderLeft: '3px solid var(--marigold)', background: 'var(--surface)', padding: '10px 16px' }}>
                <p style={{ fontSize: '14px', color: 'var(--ink)' }}>{f.text}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
