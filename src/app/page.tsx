'use client';

import { useState } from 'react';
import Hero3D from '@/components/Hero3D';
import ExamSelector from '@/components/ExamSelector';
import { getUpcomingDeadlines } from '@/data/deadlines';
import { exams } from '@/data/exams';

export default function Home() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const upcoming = getUpcomingDeadlines(selectedIds);

  return (
    <main>
      <section style={{ background: 'var(--ink)', height: '70vh', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <Hero3D />
        </div>
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            padding: '80px 48px',
            color: 'var(--paper)',
            pointerEvents: 'none',
          }}
        >
          <h1 className="font-dev" style={{ fontSize: '56px', color: 'var(--marigold)' }}>
            पाठशाला
          </h1>
          <p className="font-display" style={{ fontSize: '20px', maxWidth: '480px' }}>
            One school. Every exam. Your language.
          </p>
        </div>
      </section>

      <section style={{ padding: '64px 48px' }}>
        <ExamSelector onChange={setSelectedIds} />
      </section>

      {selectedIds.length > 0 && (
        <section style={{ padding: '0 48px 64px' }}>
          <h2 className="font-display text-xl mb-3" style={{ color: 'var(--indigo)' }}>
            Upcoming deadlines
          </h2>
          {upcoming.length === 0 ? (
            <p style={{ color: '#5B665F', fontSize: '14px' }}>No upcoming deadlines for your chosen exams.</p>
          ) : (
            <div className="flex flex-col gap-2">
              {upcoming.map((d, i) => {
                const exam = exams.find((e) => e.id === d.examId);
                return (
                  <div key={i} style={{ border: '1px solid #E4DCC6', padding: '12px 16px', display: 'flex', justifyContent: 'space-between' }}>
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
    </main>
  );
}
