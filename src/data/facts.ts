export type Fact = {
  examId: string;
  text: string;
};

export const facts: Fact[] = [
  { examId: 'ssc-cgl', text: 'Trick: To quickly find 12.5% of a number, divide it by 8 — since 12.5% = 1/8.' },
  { examId: 'ssc-cgl', text: 'Fact: SSC CGL has 4 tiers, but Tier 3 (descriptive) was merged into Tier 1 scoring in recent cycles — always check the latest notification.' },
  { examId: 'neet', text: 'Trick: Remember "Some Old Man Always Wins" for glycolysis steps? Mnemonics like this can save you seconds under pressure.' },
  { examId: 'neet', text: 'Fact: NEET has negative marking of 1 mark for every wrong answer — leaving a guess with 2 eliminated options is usually +EV.' },
  { examId: 'jee-main', text: 'Trick: In JEE Main, attempt your strongest subject first — early confidence reduces silly mistakes later in the paper.' },
  { examId: 'ibps-po', text: 'Fact: IBPS PO prelims has sectional timing — you cannot move between sections early even if you finish one section fast.' },
];

export function getFactsForExams(examIds: string[]): Fact[] {
  return facts.filter((f) => examIds.includes(f.examId));
}
