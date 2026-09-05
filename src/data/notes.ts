export type Note = {
  id: string;
  topicId: string;
  title: string;
  body: string;
};

export const notesByExam: Record<string, Note[]> = {
  'ssc-cgl': [
    { id: 'n1', topicId: 'quant', title: 'Percentage — Quick Method', body: 'To find x% of y, multiply x by y and divide by 100. Example: 15% of 200 = (15 × 200) / 100 = 30. For quick mental math, break percentages into 10%, 5%, and 1% chunks and add them.' },
    { id: 'n2', topicId: 'reasoning', title: 'Series Completion Basics', body: 'Look for a consistent pattern: constant difference (arithmetic), constant ratio (geometric), or a difference that itself follows a pattern (like +4, +6, +8...). Always test your rule on at least two consecutive pairs before picking an answer.' },
  ],
  neet: [
    { id: 'n1', topicId: 'physics', title: 'Electric Current — Basics', body: 'Current is the rate of flow of charge, measured in Amperes. I = Q/t, where Q is charge in Coulombs and t is time in seconds. Conventional current flows from positive to negative terminal.' },
    { id: 'n2', topicId: 'botany', title: 'Cell Organelles Overview', body: 'Mitochondria produce ATP (energy) via cellular respiration. Chloroplasts (in plant cells) conduct photosynthesis. The nucleus houses genetic material and controls cell activities.' },
  ],
  'jee-main': [
    { id: 'n1', topicId: 'maths', title: 'Trigonometric Values to Memorize', body: 'sin(0°)=0, sin(30°)=1/2, sin(45°)=1/√2, sin(60°)=√3/2, sin(90°)=1. Cosine values are the same list in reverse order.' },
    { id: 'n2', topicId: 'physics', title: 'Newton\'s Laws — Quick Recap', body: '1st law: an object stays at rest or in motion unless acted on by a net force. 2nd law: F = ma. 3rd law: every action has an equal and opposite reaction.' },
  ],
  'upsc-cse': [
    { id: 'n1', topicId: 'polity', title: 'Fundamental Rights Overview', body: 'Six categories: Right to Equality, Right to Freedom, Right against Exploitation, Right to Freedom of Religion, Cultural and Educational Rights, and Right to Constitutional Remedies. Right to Property was removed as a fundamental right by the 44th Amendment.' },
    { id: 'n2', topicId: 'economy', title: 'Fiscal Policy vs Monetary Policy', body: 'Fiscal policy (government spending and taxation) is controlled by the Ministry of Finance. Monetary policy (money supply and interest rates) is controlled by the RBI. Both aim to manage inflation and growth but through different levers.' },
  ],
};

export function getNotes(examId: string): Note[] {
  return notesByExam[examId] ?? [];
}
