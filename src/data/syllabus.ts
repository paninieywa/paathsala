export type SyllabusTopic = {
  id: string;
  name: string;
};

export const syllabusByExam: Record<string, SyllabusTopic[]> = {
  'ssc-cgl': [
    { id: 'quant', name: 'Quantitative Aptitude' },
    { id: 'reasoning', name: 'General Reasoning' },
    { id: 'english', name: 'English Comprehension' },
    { id: 'ga', name: 'General Awareness' },
  ],
  neet: [
    { id: 'physics', name: 'Physics' },
    { id: 'chemistry', name: 'Chemistry' },
    { id: 'botany', name: 'Botany' },
    { id: 'zoology', name: 'Zoology' },
  ],
  'jee-main': [
    { id: 'physics', name: 'Physics' },
    { id: 'chemistry', name: 'Chemistry' },
    { id: 'maths', name: 'Mathematics' },
  ],
  'jee-adv': [
    { id: 'physics', name: 'Physics (Advanced)' },
    { id: 'chemistry', name: 'Chemistry (Advanced)' },
    { id: 'maths', name: 'Mathematics (Advanced)' },
  ],
  'upsc-cse': [
    { id: 'polity', name: 'Indian Polity' },
    { id: 'history', name: 'Indian History' },
    { id: 'geography', name: 'Geography' },
    { id: 'economy', name: 'Indian Economy' },
    { id: 'ethics', name: 'Ethics & Integrity' },
  ],
  'ibps-po': [
    { id: 'reasoning', name: 'Reasoning Ability' },
    { id: 'quant', name: 'Quantitative Aptitude' },
    { id: 'english', name: 'English Language' },
    { id: 'ga-banking', name: 'General/Banking Awareness' },
  ],
  'sbi-po': [
    { id: 'reasoning', name: 'Reasoning Ability' },
    { id: 'quant', name: 'Data Analysis & Interpretation' },
    { id: 'english', name: 'English Language' },
    { id: 'ga-banking', name: 'General/Economy/Banking Awareness' },
  ],
  'rrb-ntpc': [
    { id: 'maths', name: 'Mathematics' },
    { id: 'reasoning', name: 'General Intelligence & Reasoning' },
    { id: 'ga-railway', name: 'General Awareness' },
  ],
  nda: [
    { id: 'maths', name: 'Mathematics' },
    { id: 'gat', name: 'General Ability Test' },
  ],
  cds: [
    { id: 'english', name: 'English' },
    { id: 'ga-defence', name: 'General Knowledge' },
    { id: 'maths', name: 'Elementary Mathematics' },
  ],
};

export function getSyllabus(examId: string): SyllabusTopic[] {
  return syllabusByExam[examId] ?? [];
}
