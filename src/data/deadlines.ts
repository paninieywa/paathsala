export type Deadline = {
  examId: string;
  label: string;
  date: string; // ISO date
};

export const deadlines: Deadline[] = [
  { examId: 'ssc-cgl', label: 'SSC CGL application closes', date: '2026-10-15' },
  { examId: 'ssc-cgl', label: 'SSC CGL Tier 1 exam', date: '2026-12-05' },
  { examId: 'neet', label: 'NEET application closes', date: '2027-03-10' },
  { examId: 'neet', label: 'NEET exam date', date: '2027-05-03' },
  { examId: 'ibps-po', label: 'IBPS PO application closes', date: '2026-09-30' },
];

export function getUpcomingDeadlines(examIds: string[]): Deadline[] {
  return deadlines
    .filter((d) => examIds.includes(d.examId))
    .filter((d) => new Date(d.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}
