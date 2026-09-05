export type CurrentAffair = {
  examId: string;
  date: string;
  headline: string;
  summary: string;
};

export const currentAffairs: CurrentAffair[] = [
  { examId: 'ssc-cgl', date: '2026-09-01', headline: 'Union Budget allocations for skill development increased', summary: 'Relevant for GA section — note the ministry names and allocation changes year-over-year.' },
  { examId: 'upsc-cse', date: '2026-09-02', headline: 'Supreme Court ruling on federal-state water disputes', summary: 'Useful for both Polity and Mains GS2 — understand the constitutional articles involved.' },
  { examId: 'ibps-po', date: '2026-09-03', headline: 'RBI revises repo rate in latest monetary policy review', summary: 'Common banking-awareness question — know the current repo, reverse repo, and CRR rates.' },
];

export function getCurrentAffairs(examId: string): CurrentAffair[] {
  return currentAffairs
    .filter((c) => c.examId === examId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
