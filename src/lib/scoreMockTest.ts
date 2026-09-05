export type AnsweredQuestion = {
  topicId: string;
  correctIndex: number;
  pickedIndex: number | undefined;
};

export type TopicResult = {
  topicId: string;
  correct: number;
  wrong: number;
  skipped: number;
};

export function scoreMockTest(
  questions: AnsweredQuestion[],
  negativeMarking: number
): { score: number; breakdown: TopicResult[] } {
  let score = 0;
  const topicMap: Record<string, TopicResult> = {};

  for (const q of questions) {
    if (!topicMap[q.topicId]) {
      topicMap[q.topicId] = { topicId: q.topicId, correct: 0, wrong: 0, skipped: 0 };
    }

    if (q.pickedIndex === undefined) {
      topicMap[q.topicId].skipped += 1;
    } else if (q.pickedIndex === q.correctIndex) {
      topicMap[q.topicId].correct += 1;
      score += 1;
    } else {
      topicMap[q.topicId].wrong += 1;
      score -= negativeMarking;
    }
  }

  return { score, breakdown: Object.values(topicMap) };
}
