export type CutoffYear = {
  year: number;
  urCutoff: number;
  scCutoff: number;
  stCutoff: number;
};

export const cutoffsByExam: Record<string, CutoffYear[]> = {
  'ssc-cgl': [
    { year: 2023, urCutoff: 150.05, scCutoff: 126.68, stCutoff: 118.17 },
    { year: 2024, urCutoff: 153.19, scCutoff: 126.46, stCutoff: 111.89 },
  ],
};

export const cutoffSourceNote =
  'SSC CGL Tier 1 cutoff, "all other posts" category — sourced from official SSC result notifications as reported by Careers360 and CollegeDekho.';

export function getCutoffHistory(examId: string): CutoffYear[] {
  return cutoffsByExam[examId] ?? [];
}

export function estimateNextCutoff(history: CutoffYear[]): number | null {
  if (history.length < 2) return null;
  const sorted = [...history].sort((a, b) => a.year - b.year);
  const deltas = [];
  for (let i = 1; i < sorted.length; i++) {
    deltas.push(sorted[i].urCutoff - sorted[i - 1].urCutoff);
  }
  const avgDelta = deltas.reduce((a, b) => a + b, 0) / deltas.length;
  return Math.round((sorted[sorted.length - 1].urCutoff + avgDelta) * 100) / 100;
}
