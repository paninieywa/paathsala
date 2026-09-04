type CardState = {
  nextReview: string; // ISO date
  interval: number; // days
};

function key(examId: string): string {
  return `paathsala_flashcards_${examId}`;
}

function loadState(examId: string): Record<string, CardState> {
  if (typeof window === 'undefined') return {};
  const raw = localStorage.getItem(key(examId));
  return raw ? JSON.parse(raw) : {};
}

function saveState(examId: string, state: Record<string, CardState>) {
  localStorage.setItem(key(examId), JSON.stringify(state));
}

export function isDue(examId: string, cardId: string): boolean {
  const state = loadState(examId)[cardId];
  if (!state) return true;
  return new Date(state.nextReview) <= new Date();
}

export function reviewCard(examId: string, cardId: string, knewIt: boolean) {
  const state = loadState(examId);
  const prev = state[cardId];
  const interval = knewIt ? (prev ? prev.interval * 2 : 1) : 1;

  const nextReview = new Date();
  nextReview.setDate(nextReview.getDate() + interval);

  state[cardId] = { nextReview: nextReview.toISOString(), interval };
  saveState(examId, state);
}
