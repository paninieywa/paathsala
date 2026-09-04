export type Question = {
  id: string;
  topicId: string;
  text: string;
  options: string[];
  correctIndex: number;
};

export const questionsByExam: Record<string, Question[]> = {
  'ssc-cgl': [
    { id: 'q1', topicId: 'quant', text: 'What is 15% of 200?', options: ['20', '30', '35', '40'], correctIndex: 1 },
    { id: 'q2', topicId: 'quant', text: 'Find the next number: 2, 6, 12, 20, ?', options: ['28', '30', '26', '32'], correctIndex: 1 },
    { id: 'q3', topicId: 'english', text: 'Synonym of "Abundant":', options: ['Scarce', 'Plentiful', 'Rare', 'Limited'], correctIndex: 1 },
    { id: 'q4', topicId: 'reasoning', text: 'Odd one out: Circle, Square, Triangle, Sphere', options: ['Circle', 'Square', 'Triangle', 'Sphere'], correctIndex: 3 },
    { id: 'q5', topicId: 'ga', text: 'Capital of India?', options: ['Mumbai', 'New Delhi', 'Kolkata', 'Chennai'], correctIndex: 1 },
  ],
  neet: [
    { id: 'q1', topicId: 'physics', text: 'SI unit of electric current is:', options: ['Volt', 'Ohm', 'Ampere', 'Watt'], correctIndex: 2 },
    { id: 'q2', topicId: 'botany', text: 'Powerhouse of the cell is:', options: ['Ribosome', 'Mitochondria', 'Nucleus', 'Golgi body'], correctIndex: 1 },
  ],
};

export function getQuestions(examId: string): Question[] {
  return questionsByExam[examId] ?? [];
}
