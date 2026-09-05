export type Note = {
  id: string;
  topicId: string;
  title: string;
  body: string;
};

export const notesByExam: Record<string, Note[]> = {
  'ssc-cgl': [
    { id: 'n1', topicId: 'quant', title: 'Percentage — Quick Method', body: 'To find x% of y, multiply x by y and divide by 100. Example: 15% of 200 = (15 × 200) / 100 = 30.' },
    { id: 'n2', topicId: 'reasoning', title: 'Series Completion Basics', body: 'Look for a consistent pattern: constant difference, constant ratio, or a difference that follows its own pattern.' },
  ],
  neet: [
    { id: 'n1', topicId: 'physics', title: 'Electric Current — Basics', body: 'Current is the rate of flow of charge, measured in Amperes. I = Q/t.' },
    { id: 'n2', topicId: 'botany', title: 'Cell Organelles Overview', body: 'Mitochondria produce ATP. Chloroplasts conduct photosynthesis. The nucleus houses genetic material.' },
  ],
  'jee-main': [
    { id: 'n1', topicId: 'maths', title: 'Trigonometric Values to Memorize', body: 'sin(0°)=0, sin(30°)=1/2, sin(45°)=1/√2, sin(60°)=√3/2, sin(90°)=1.' },
    { id: 'n2', topicId: 'physics', title: "Newton's Laws — Quick Recap", body: '1st law: inertia. 2nd law: F=ma. 3rd law: action-reaction pairs.' },
  ],
  'jee-adv': [
    { id: 'n1', topicId: 'maths', title: 'Differentiation Rules', body: 'Power rule: d/dx(xⁿ) = nxⁿ⁻¹. Product rule and chain rule are the two most tested in JEE Advanced-level problems.' },
  ],
  'upsc-cse': [
    { id: 'n1', topicId: 'polity', title: 'Fundamental Rights Overview', body: 'Six categories: Equality, Freedom, against Exploitation, Freedom of Religion, Cultural/Educational Rights, Constitutional Remedies.' },
    { id: 'n2', topicId: 'economy', title: 'Fiscal vs Monetary Policy', body: 'Fiscal policy is spending/taxation, run by the Finance Ministry. Monetary policy is money supply/interest rates, run by the RBI.' },
  ],
  'ibps-po': [
    { id: 'n1', topicId: 'ga-banking', title: 'Key Banking Terms', body: 'NPA: a loan where payments are overdue 90+ days. Repo rate: rate at which RBI lends to banks. Reverse repo: rate at which RBI borrows from banks.' },
  ],
  'sbi-po': [
    { id: 'n1', topicId: 'quant', title: 'Data Interpretation Tip', body: 'Always read the units and scale on a graph/table before calculating — a common trap is misreading "in lakhs" vs "in thousands".' },
  ],
  'rrb-ntpc': [
    { id: 'n1', topicId: 'ga-railway', title: 'Indian Railways Basics', body: 'Indian Railways is divided into 17 zones. It is one of the largest railway networks in the world by route length.' },
  ],
  nda: [
    { id: 'n1', topicId: 'gat', title: 'GAT Preparation Tip', body: 'The General Ability Test covers English plus General Knowledge across Physics, Chemistry, History, Geography, and Current Affairs — breadth matters more than depth.' },
  ],
  cds: [
    { id: 'n1', topicId: 'ga-defence', title: 'Defence GK Basics', body: 'Know the current Chiefs of Army, Navy, and Air Staff, plus recent defence exercises and acquisitions — these are frequently asked.' },
  ],
};

export function getNotes(examId: string): Note[] {
  return notesByExam[examId] ?? [];
}
