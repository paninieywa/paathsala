'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getMockTest } from '@/data/mockTests';
import { getAttempts } from '@/lib/mockAttempts';

type TopicAggregate = {
  topicId: string;
  correct: number;
  wrong: number;
  skipped: number;
};

export default function AnalyticsPage() {
  const params = useParams<{ examId: string }>();
  const examId = params.examId;
  const mock = getMockTest(examId, 'mock1');

  const [aggregates, setAggregates] = useState<TopicAggregate[]>([]);
  const [attemptCount, setAttemptCount] = useState(0);

  useEffect(() => {
    if (!mock) return;
    const attempts = getAttempts(examId, 'mock1');
    setAttemptCount(attempts.length);

    const map: Record<string, TopicAggregate> = {};
    for (const attempt of attempts) {
      for (const t of attempt.topicBreakdown) {
        if (!map[t.topicId]) {
          map[t.topicId] = { topicId: t.topicId, correct: 0, wrong: 0, skipped: 0 };
        }
        map[t.topicId].correct += t.correct;
        map[t.topicId].wrong += t.wrong;
        map[t.topicId].skipped += t.skipped;
      }
    }
    setAggregates(Object.values(map));
  }, [examId, mock]);

  if (!mock) return <main style={{ padding: '48px' }}>No mock test data for this exam yet.</main>;

  if (attemptCount === 0) {
    return (
      <main style={{ padding: '48px' }}>
        <h1 className="font-display text-2xl mb-2" style={{ color: 'var(--indigo)' }}>
          Performance Analytics
        </h1>
        <p style={{ color: '#5B665F', fontSize: '14px' }}>
          Take a mock test first — analytics build up from your attempts.
        </p>
      </main>
    );
  }

  const sorted = [...aggregates].sort((a, b) => {
    const pctA = a.correct / (a.correct + a.wrong + a.skipped || 1);
    const pctB = b.correct / (b.correct + b.wrong + b.skipped || 1);
    return pctA - pctB;
  });

  return (
    <main style={{ padding: '48px', maxWidth: '640px' }}>
      <h1 className="font-display text-2xl mb-2" style={{ color: 'var(--indigo)' }}>
        Performance Analytics
      </h1>
      <p style={{ color: '#5B665F', fontSize: '14px', marginBottom: '24px' }}>
        Based on {attemptCount} mock test attempt{attemptCount === 1 ? '' : 's'} — weakest topics shown first.
      </p>

      <div className="flex flex-col gap-3">
        {sorted.map((t) => {
          const total = t.correct + t.wrong + t.skipped;
          const pct = total ? Math.round((t.correct / total) * 100) : 0;
          return (
            <div key={t.topicId}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                <span style={{ color: 'var(--ink)' }}>{t.topicId}</span>
                <span style={{ color: '#5B665F' }}>
                  {t.correct} correct · {t.wrong} wrong · {t.skipped} skipped
                </span>
              </div>
              <div style={{ background: '#E4DCC6', height: '10px' }}>
                <div
                  style={{
                    background: pct >= 60 ? 'var(--leaf)' : pct >= 35 ? 'var(--marigold)' : 'var(--kumkum)',
                    width: `${pct}%`,
                    height: '100%',
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
