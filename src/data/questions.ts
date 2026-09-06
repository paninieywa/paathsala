import { reasoningQuestions } from './sharedReasoning';

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
  ...reasoningQuestions],
  neet: [
    { id: 'q1', topicId: 'physics', text: 'SI unit of electric current is:', options: ['Volt', 'Ohm', 'Ampere', 'Watt'], correctIndex: 2 },
    { id: 'q2', topicId: 'botany', text: 'Powerhouse of the cell is:', options: ['Ribosome', 'Mitochondria', 'Nucleus', 'Golgi body'], correctIndex: 1 },
  ],
  'jee-main': [
    { id: 'q1', topicId: 'physics', text: 'Unit of force is:', options: ['Joule', 'Newton', 'Pascal', 'Watt'], correctIndex: 1 },
    { id: 'q2', topicId: 'maths', text: 'Value of sin(90°)?', options: ['0', '1', '-1', 'undefined'], correctIndex: 1 },
    { id: 'q3', topicId: 'chemistry', text: 'Atomic number of Oxygen is:', options: ['6', '7', '8', '9'], correctIndex: 2 },
  ],
  'jee-adv': [
    { id: 'q1', topicId: 'maths', text: 'The derivative of x³ is:', options: ['x²', '2x²', '3x²', '3x'], correctIndex: 2 },
    { id: 'q2', topicId: 'physics', text: 'Dimensional formula of work is same as:', options: ['Force', 'Energy', 'Power', 'Pressure'], correctIndex: 1 },
  ],
  'upsc-cse': [
    { id: 'q1', topicId: 'polity', text: 'How many fundamental rights does the Indian Constitution guarantee?', options: ['5', '6', '7', '8'], correctIndex: 1 },
    { id: 'q2', topicId: 'history', text: 'Who founded the Indian National Congress in 1885?', options: ['Mahatma Gandhi', 'A.O. Hume', 'Jawaharlal Nehru', 'B.R. Ambedkar'], correctIndex: 1 },
    { id: 'q3', topicId: 'geography', text: 'Which is the longest river in India?', options: ['Yamuna', 'Godavari', 'Ganga', 'Brahmaputra'], correctIndex: 2 },
  ],
  'ibps-po': [
    { id: 'q1', topicId: 'quant', text: 'If the simple interest on Rs. 1000 for 2 years is Rs. 200, what is the rate?', options: ['5%', '10%', '15%', '20%'], correctIndex: 1 },
    { id: 'q2', topicId: 'ga-banking', text: 'RBI was established in which year?', options: ['1935', '1947', '1950', '1969'], correctIndex: 0 },
  ...reasoningQuestions],
  'sbi-po': [
    { id: 'q1', topicId: 'ga-banking', text: 'What does "NPA" stand for in banking?', options: ['Net Profit Account', 'Non-Performing Asset', 'National Pension Account', 'New Payment Approval'], correctIndex: 1 },
    { id: 'q2', topicId: 'reasoning', text: 'If A is B\'s sister and B is C\'s father, how is A related to C?', options: ['Mother', 'Aunt', 'Sister', 'Grandmother'], correctIndex: 1 },
  ...reasoningQuestions],
  'rrb-ntpc': [
    { id: 'q1', topicId: 'ga-railway', text: 'Indian Railways headquarters is located in:', options: ['Mumbai', 'New Delhi', 'Kolkata', 'Chennai'], correctIndex: 1 },
    { id: 'q2', topicId: 'maths', text: 'What is the LCM of 4 and 10?', options: ['20', '40', '14', '10'], correctIndex: 0 },
  ...reasoningQuestions],
  nda: [
    { id: 'q1', topicId: 'maths', text: 'What is the value of (2+3)²?', options: ['10', '25', '13', '20'], correctIndex: 1 },
    { id: 'q2', topicId: 'gat', text: 'The national bird of India is:', options: ['Sparrow', 'Peacock', 'Eagle', 'Crow'], correctIndex: 1 },
  ],
  cds: [
    { id: 'q1', topicId: 'ga-defence', text: 'Who is the Supreme Commander of the Indian Armed Forces?', options: ['Prime Minister', 'President', 'Defence Minister', 'Army Chief'], correctIndex: 1 },
    { id: 'q2', topicId: 'maths', text: 'What is 12 × 12?', options: ['124', '144', '134', '154'], correctIndex: 1 },
  ],
};

export function getQuestions(examId: string): Question[] {
  return questionsByExam[examId] ?? [];
}
