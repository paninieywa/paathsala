export type Note = {
  id: string;
  topicId: string;
  title: string;
  body: string;
};

export const notesByExam: Record<string, Note[]> = {
  'ssc-cgl': [
    {
      id: 'n1',
      topicId: 'quant',
      title: 'Percentage — Quick Method',
      body: 'To find x% of y, multiply x by y and divide by 100. Example: 15% of 200 = (15 × 200) / 100 = 30. For quick mental math, break percentages into 10%, 5%, and 1% chunks and add them.',
    },
    {
      id: 'n2',
      topicId: 'reasoning',
      title: 'Series Completion Basics',
      body: 'Look for a consistent pattern: constant difference (arithmetic), constant ratio (geometric), or a difference that itself follows a pattern (like +4, +6, +8...). Always test your rule on at least two consecutive pairs before picking an answer.',
    },
  ],
  neet: [
    {
      id: 'n1',
      topicId: 'physics',
      title: 'Electric Current — Basics',
      body: 'Current is the rate of flow of charge, measured in Amperes. I = Q/t, where Q is charge in Coulombs and t is time in seconds. Conventional current flows from positive to negative terminal.',
    },
    {
      id: 'n2',
      topicId: 'botany',
      title: 'Cell Organelles Overview',
      body: 'Mitochondria produce ATP (energy) via cellular respiration. Chloroplasts (in plant cells) conduct photosynthesis. The nucleus houses genetic material and controls cell activities.',
    },
  ],
};

export function getNotes(examId: string): Note[] {
  return notesByExam[examId] ?? [];
}
