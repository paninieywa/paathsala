export type ArenaQuestion = {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
};

export const arenaTopics = ['reasoning', 'maths', 'english', 'gs', 'current-affairs'] as const;
export type ArenaTopic = typeof arenaTopics[number];

export const arenaQuestionBank: Record<ArenaTopic, ArenaQuestion[]> = {
  reasoning: [
    { id: 'ar1', text: 'Find the next number: 2, 5, 11, 20, 32, ?', options: ['44', '47', '49', '50'], correctIndex: 1 },
    { id: 'ar2', text: 'Odd one out: Circle, Square, Triangle, Sphere', options: ['Circle', 'Square', 'Triangle', 'Sphere'], correctIndex: 3 },
    { id: 'ar3', text: "If 'STUDENT' is coded as 'TUVEFOU', how is 'TEACHER' coded?", options: ['REHCAET', 'UFBDIFS', 'UFDBFIS', 'ETCAEHR'], correctIndex: 1 },
    { id: 'ar4', text: 'Film is related to Director as Book is related to:', options: ['Writer', 'Publisher', 'Producer', 'Editor'], correctIndex: 1 },
    { id: 'ar5', text: 'Find the wrong term: 5, 9, 15, 23, 34, 45, 59', options: ['34', '45', '59', '23'], correctIndex: 0 },
    { id: 'ar6', text: 'Which letter comes next: C, F, J, O, U, B, ?', options: ['J', 'F', 'K', 'L'], correctIndex: 0 },
    { id: 'ar7', text: 'Horse is related to Herd as Soldier is related to:', options: ['Navy', 'Fleet', 'Regiment', 'None'], correctIndex: 2 },
    { id: 'ar8', text: 'Thermometer measures Temperature; Barometer measures:', options: ['Current', 'Earthquakes', 'Pressure', 'Blood pressure'], correctIndex: 2 },
    { id: 'ar9', text: 'Peace is related to Unrest as Knowledge is related to:', options: ['Ignorance', 'Intelligence', 'Humble', 'Arrogance'], correctIndex: 0 },
    { id: 'ar10', text: 'Find the wrong term: 99, 88, 75, 64, 51, 40, 28, 16', options: ['64', '51', '28', '16'], correctIndex: 2 },
  ],
  maths: [
    { id: 'am1', text: 'What is 15% of 200?', options: ['20', '30', '35', '40'], correctIndex: 1 },
    { id: 'am2', text: 'What is 12 × 12?', options: ['124', '144', '134', '154'], correctIndex: 1 },
    { id: 'am3', text: 'LCM of 4 and 10?', options: ['20', '40', '14', '10'], correctIndex: 0 },
    { id: 'am4', text: 'If SI on Rs. 1000 for 2 years is Rs. 200, the rate is:', options: ['5%', '10%', '15%', '20%'], correctIndex: 1 },
    { id: 'am5', text: 'Value of sin(90°)?', options: ['0', '1', '-1', 'undefined'], correctIndex: 1 },
    { id: 'am6', text: 'What is (2+3)²?', options: ['10', '25', '13', '20'], correctIndex: 1 },
    { id: 'am7', text: 'Square root of 144?', options: ['10', '11', '12', '13'], correctIndex: 2 },
    { id: 'am8', text: 'What is 7 × 8?', options: ['54', '56', '58', '64'], correctIndex: 1 },
    { id: 'am9', text: '20% of 150 is:', options: ['20', '25', '30', '35'], correctIndex: 2 },
    { id: 'am10', text: 'What is the average of 4, 8, 12?', options: ['6', '8', '10', '12'], correctIndex: 1 },
  ],
  english: [
    { id: 'ae1', text: 'Synonym of "Abundant":', options: ['Scarce', 'Plentiful', 'Rare', 'Limited'], correctIndex: 1 },
    { id: 'ae2', text: 'Antonym of "Ancient":', options: ['Old', 'Modern', 'Historic', 'Vintage'], correctIndex: 1 },
    { id: 'ae3', text: 'Choose the correctly spelled word:', options: ['Recieve', 'Receive', 'Receeve', 'Receve'], correctIndex: 1 },
    { id: 'ae4', text: 'Synonym of "Happy":', options: ['Sad', 'Joyful', 'Angry', 'Tired'], correctIndex: 1 },
    { id: 'ae5', text: 'Antonym of "Difficult":', options: ['Hard', 'Easy', 'Complex', 'Tough'], correctIndex: 1 },
    { id: 'ae6', text: 'Fill in the blank: She ___ to school every day.', options: ['go', 'goes', 'going', 'gone'], correctIndex: 1 },
    { id: 'ae7', text: 'Plural of "Child":', options: ['Childs', 'Childes', 'Children', 'Childrens'], correctIndex: 2 },
    { id: 'ae8', text: 'Synonym of "Brave":', options: ['Cowardly', 'Courageous', 'Timid', 'Fearful'], correctIndex: 1 },
    { id: 'ae9', text: 'Choose the correct article: ___ apple a day.', options: ['A', 'An', 'The', 'No article'], correctIndex: 1 },
    { id: 'ae10', text: 'Opposite of "Increase":', options: ['Grow', 'Decrease', 'Rise', 'Expand'], correctIndex: 1 },
  ],
  gs: [
    { id: 'ag1', text: 'Capital of India?', options: ['Mumbai', 'New Delhi', 'Kolkata', 'Chennai'], correctIndex: 1 },
    { id: 'ag2', text: 'How many fundamental rights in the Indian Constitution?', options: ['5', '6', '7', '8'], correctIndex: 1 },
    { id: 'ag3', text: 'Longest river in India?', options: ['Yamuna', 'Godavari', 'Ganga', 'Brahmaputra'], correctIndex: 2 },
    { id: 'ag4', text: 'Who founded the Indian National Congress in 1885?', options: ['Gandhi', 'A.O. Hume', 'Nehru', 'Ambedkar'], correctIndex: 1 },
    { id: 'ag5', text: 'RBI was established in which year?', options: ['1935', '1947', '1950', '1969'], correctIndex: 0 },
    { id: 'ag6', text: 'National bird of India?', options: ['Sparrow', 'Peacock', 'Eagle', 'Crow'], correctIndex: 1 },
    { id: 'ag7', text: 'Which is the smallest state in India by area?', options: ['Sikkim', 'Goa', 'Tripura', 'Nagaland'], correctIndex: 1 },
    { id: 'ag8', text: 'Who is the Supreme Commander of the Indian Armed Forces?', options: ['PM', 'President', 'Defence Minister', 'Army Chief'], correctIndex: 1 },
    { id: 'ag9', text: 'India got independence in which year?', options: ['1945', '1947', '1950', '1952'], correctIndex: 1 },
    { id: 'ag10', text: 'Indian Railways is divided into how many zones?', options: ['15', '16', '17', '18'], correctIndex: 2 },
  ],
  'current-affairs': [
    { id: 'ac1', text: 'Which body regulates repo rate in India?', options: ['SEBI', 'RBI', 'NITI Aayog', 'Finance Ministry'], correctIndex: 1 },
    { id: 'ac2', text: 'Fiscal policy is primarily controlled by:', options: ['RBI', 'Finance Ministry', 'SEBI', 'Election Commission'], correctIndex: 1 },
    { id: 'ac3', text: 'NPA stands for:', options: ['Net Profit Account', 'Non-Performing Asset', 'National Pension Account', 'New Payment Approval'], correctIndex: 1 },
    { id: 'ac4', text: 'The Union Budget is typically presented in which month?', options: ['January', 'February', 'March', 'April'], correctIndex: 1 },
    { id: 'ac5', text: 'Which ministry oversees skill development schemes in India?', options: ['Ministry of Education', 'Ministry of Skill Development', 'Ministry of Labour', 'NITI Aayog'], correctIndex: 1 },
  ],
};

export function getArenaQuestions(topic: ArenaTopic, count: number): ArenaQuestion[] {
  const pool = arenaQuestionBank[topic] ?? [];
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
