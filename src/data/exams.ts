export type Exam = {
  id: string;
  name: string;
  category: string;
};

export const exams: Exam[] = [
  { id: 'ssc-cgl', name: 'SSC CGL', category: 'SSC' },
  { id: 'upsc-cse', name: 'UPSC Civil Services', category: 'UPSC' },
  { id: 'neet', name: 'NEET', category: 'Medical' },
  { id: 'jee-main', name: 'JEE Main', category: 'Engineering' },
  { id: 'jee-adv', name: 'JEE Advanced', category: 'Engineering' },
  { id: 'ibps-po', name: 'IBPS PO', category: 'Banking' },
  { id: 'sbi-po', name: 'SBI PO', category: 'Banking' },
  { id: 'rrb-ntpc', name: 'RRB NTPC', category: 'Railway' },
  { id: 'nda', name: 'NDA', category: 'Defence' },
  { id: 'cds', name: 'CDS', category: 'Defence' },
];
