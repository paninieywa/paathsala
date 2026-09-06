'use client';

import { useParams } from 'next/navigation';
import { getCutoffHistory, estimateNextCutoff, cutoffSourceNote } from '@/data/cutoffs';

export default function CutoffPage() {
  const params = useParams<{ examId: string }>();
  const history = getCutoffHistory(params.examId);
  const estimate = estimateNextCutoff(history);

  return (
    <main style={{ padding: 'clamp(20px, 5vw, 48px)', maxWidth: '640px' }}>
      <h1 className="font-display text-2xl mb-2" style={{ color: 'var(--indigo)' }}>
        Cutoff Trends
      </h1>

      {history.length === 0 ? (
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>No cutoff data available for this exam yet.</p>
      ) : (
        <>
          <p style={{ color: 'var(--text-muted)', fontSize: '12.5px', marginBottom: '24px' }}>
            {cutoffSourceNote}
          </p>

          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '24px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <th style={{ textAlign: 'left', padding: '8px', fontSize: '13px', color: 'var(--indigo)' }}>Year</th>
                <th style={{ textAlign: 'left', padding: '8px', fontSize: '13px', color: 'var(--indigo)' }}>UR</th>
                <th style={{ textAlign: 'left', padding: '8px', fontSize: '13px', color: 'var(--indigo)' }}>SC</th>
                <th style={{ textAlign: 'left', padding: '8px', fontSize: '13px', color: 'var(--indigo)' }}>ST</th>
              </tr>
            </thead>
            <tbody>
              {history.map((h) => (
                <tr key={h.year} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '8px', fontSize: '14px' }}>{h.year}</td>
                  <td style={{ padding: '8px', fontSize: '14px' }}>{h.urCutoff}</td>
                  <td style={{ padding: '8px', fontSize: '14px' }}>{h.scCutoff}</td>
                  <td style={{ padding: '8px', fontSize: '14px' }}>{h.stCutoff}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {estimate && (
            <div style={{ border: '1px solid var(--marigold)', padding: '16px' }}>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Rough trend-based estimate for next year (UR):</p>
              <p className="font-display" style={{ fontSize: '28px', color: 'var(--marigold)' }}>~{estimate}</p>
              <p style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '6px' }}>
                A simple linear projection from 2 years of data — treat as a rough guide, not a guarantee.
              </p>
            </div>
          )}
        </>
      )}
    </main>
  );
}
