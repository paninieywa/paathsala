export type CutoffYear = {
  year: number;
  generalCutoff: number;
  obcCutoff: number;
  scstCutoff: number;
};

export const cutoffsByExam: Record<string, CutoffYear[]> = {
  'ssc-cgl': [
    { year: 2023, generalCutoff: 145, obcCutoff: 138, scstCutoff: 120 },
    { year: 2024, generalCutoff: 150, obcCutoff: 142, scstCutoff: 124 },
    { year: 2025, generalCutoff: 153, obcCutoff: 145, scstCutoff: 127 },
  ],
};

export function getCutoffHistory(examId: string): CutoffYear[] {
  return cutoffsByExam[examId] ?? [];
}

export function estimateNextCutoff(history: CutoffYear[]): number | null {
  if (history.length < 2) return null;
  const sorted = [...history].sort((a, b) => a.year - b.year);
  const deltas = [];
  for (let i = 1; i < sorted.length; i++) {
    deltas.push(sorted[i].generalCutoff - sorted[i - 1].generalCutoff);
  }
  const avgDelta = deltas.reduce((a, b) => a + b, 0) / deltas.length;
  return Math.round(sorted[sorted.length - 1].generalCutoff + avgDelta);
}
