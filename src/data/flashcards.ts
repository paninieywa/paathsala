export type Flashcard = {
  id: string;
  front: string;
  back: string;
};

export const flashcardsByExam: Record<string, Flashcard[]> = {
  'ssc-cgl': [
    { id: 'f1', front: 'Capital of Australia?', back: 'Canberra' },
    { id: 'f2', front: 'LCM of 4 and 6?', back: '12' },
  ],
  neet: [
    { id: 'f1', front: 'Unit of force?', back: 'Newton' },
    { id: 'f2', front: 'Number of chromosomes in humans?', back: '46' },
  ],
};

export function getFlashcards(examId: string): Flashcard[] {
  return flashcardsByExam[examId] ?? [];
}
