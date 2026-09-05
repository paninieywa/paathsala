'use client';

import { useParams } from 'next/navigation';
import { getCutoffHistory, estimateNextCutoff } from '@/data/cutoffs';

export default function CutoffPage() {
  const params = useParams<{ examId: string }>();
  const history = getCutoffHistory(params.examId);
  const estimate = estimateNextCutoff(history);

  return (
    <main style={{ padding: 'clamp(20px, 5vw, 48px)', maxWidth: '640px' }}>
      <h1 className="font-display text-2xl mb-2" style={{ color: 'var(--indigo)' }}>
        Cutoff Trends
      </h1>
      <p style={{ color: 'var(--kumkum)', fontSize: '13px', marginBottom: '24px', fontWeight: 600 }}>
        Illustrative placeholder data — not official figures. Real historical cutoffs need to be sourced per exam before this is trustworthy.
      </p>

      {history.length === 0 ? (
        <p style={{ color: '#5B665F', fontSize: '14px' }}>No cutoff data available for this exam yet.</p>
      ) : (
        <>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '24px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #E4DCC6' }}>
                <th style={{ textAlign: 'left', padding: '8px', fontSize: '13px', color: 'var(--indigo)' }}>Year</th>
                <th style={{ textAlign: 'left', padding: '8px', fontSize: '13px', color: 'var(--indigo)' }}>General</th>
                <th style={{ textAlign: 'left', padding: '8px', fontSize: '13px', color: 'var(--indigo)' }}>OBC</th>
                <th style={{ textAlign: 'left', padding: '8px', fontSize: '13px', color: 'var(--indigo)' }}>SC/ST</th>
              </tr>
            </thead>
            <tbody>
              {history.map((h) => (
                <tr key={h.year} style={{ borderBottom: '1px solid #E4DCC6' }}>
                  <td style={{ padding: '8px', fontSize: '14px' }}>{h.year}</td>
                  <td style={{ padding: '8px', fontSize: '14px' }}>{h.generalCutoff}</td>
                  <td style={{ padding: '8px', fontSize: '14px' }}>{h.obcCutoff}</td>
                  <td style={{ padding: '8px', fontSize: '14px' }}>{h.scstCutoff}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {estimate && (
            <div style={{ border: '1px solid var(--marigold)', padding: '16px' }}>
              <p style={{ fontSize: '13px', color: '#5B665F' }}>Rough trend-based estimate for next year (General):</p>
              <p className="font-display" style={{ fontSize: '28px', color: 'var(--marigold-deep, var(--marigold))' }}>~{estimate}</p>
            </div>
          )}
        </>
      )}
    </main>
  );
}
