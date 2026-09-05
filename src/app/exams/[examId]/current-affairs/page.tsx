'use client';

import { useParams } from 'next/navigation';
import { getCurrentAffairs } from '@/data/currentAffairs';

export default function CurrentAffairsPage() {
  const params = useParams<{ examId: string }>();
  const items = getCurrentAffairs(params.examId);

  return (
    <main style={{ padding: 'clamp(20px, 5vw, 48px)', maxWidth: '640px' }}>
      <h1 className="font-display text-2xl mb-6" style={{ color: 'var(--indigo)' }}>
        Current Affairs
      </h1>
      {items.length === 0 ? (
        <p style={{ color: '#5B665F', fontSize: '14px' }}>Nothing posted for this exam yet — check back soon.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {items.map((item, i) => (
            <div key={i} style={{ borderLeft: '3px solid var(--indigo)', padding: '10px 16px' }}>
              <p style={{ fontSize: '12px', color: '#5B665F' }}>
                {new Date(item.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
              </p>
              <p style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--indigo)', margin: '4px 0' }}>{item.headline}</p>
              <p style={{ fontSize: '14px', color: 'var(--ink)' }}>{item.summary}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
