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
  'jee-main': [
    { id: 'q1', topicId: 'physics', text: 'Unit of force is:', options: ['Joule', 'Newton', 'Pascal', 'Watt'], correctIndex: 1 },
    { id: 'q2', topicId: 'maths', text: 'Value of sin(90°)?', options: ['0', '1', '-1', 'undefined'], correctIndex: 1 },
    { id: 'q3', topicId: 'chemistry', text: 'Atomic number of Oxygen is:', options: ['6', '7', '8', '9'], correctIndex: 2 },
  ],
  'upsc-cse': [
    { id: 'q1', topicId: 'polity', text: 'How many fundamental rights does the Indian Constitution guarantee?', options: ['5', '6', '7', '8'], correctIndex: 1 },
    { id: 'q2', topicId: 'history', text: 'Who founded the Indian National Congress in 1885?', options: ['Mahatma Gandhi', 'A.O. Hume', 'Jawaharlal Nehru', 'B.R. Ambedkar'], correctIndex: 1 },
    { id: 'q3', topicId: 'geography', text: 'Which is the longest river in India?', options: ['Yamuna', 'Godavari', 'Ganga', 'Brahmaputra'], correctIndex: 2 },
  ],
};

export function getQuestions(examId: string): Question[] {
  return questionsByExam[examId] ?? [];
}
