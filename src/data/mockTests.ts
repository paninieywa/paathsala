export type MockTest = {
  id: string;
  name: string;
  durationMins: number;
  negativeMarking: number; // deducted per wrong answer
};

export const mockTestsByExam: Record<string, MockTest[]> = {
  'ssc-cgl': [{ id: 'mock1', name: 'Full Mock Test 1', durationMins: 2, negativeMarking: 0.5 }],
  neet: [{ id: 'mock1', name: 'Full Mock Test 1', durationMins: 2, negativeMarking: 1 }],
};

export function getMockTest(examId: string, mockId: string): MockTest | undefined {
  return mockTestsByExam[examId]?.find((m) => m.id === mockId);
}
