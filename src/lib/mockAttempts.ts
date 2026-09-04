export type TopicResult = {
  topicId: string;
  correct: number;
  wrong: number;
  skipped: number;
};

export type AttemptResult = {
  score: number;
  totalQuestions: number;
  topicBreakdown: TopicResult[];
  completedAt: string;
};

function key(examId: string, mockId: string): string {
  return `paathsala_mock_${examId}_${mockId}`;
}

export function saveAttempt(examId: string, mockId: string, result: AttemptResult) {
  const raw = localStorage.getItem(key(examId, mockId));
  const history: AttemptResult[] = raw ? JSON.parse(raw) : [];
  history.push(result);
  localStorage.setItem(key(examId, mockId), JSON.stringify(history));
}

export function getAttempts(examId: string, mockId: string): AttemptResult[] {
  if (typeof window === 'undefined') return [];
  const raw = localStorage.getItem(key(examId, mockId));
  return raw ? JSON.parse(raw) : [];
}
