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
  'neet': [
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
  'upsc-cse': [
    { id: 'polity', name: 'Indian Polity' },
    { id: 'history', name: 'Indian History' },
    { id: 'geography', name: 'Geography' },
    { id: 'economy', name: 'Indian Economy' },
    { id: 'ethics', name: 'Ethics & Integrity' },
  ],
};

export function getSyllabus(examId: string): SyllabusTopic[] {
  return syllabusByExam[examId] ?? [];
}
