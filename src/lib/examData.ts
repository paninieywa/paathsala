import { mockTestsByExam } from '@/data/mockTests';

export function clearExamLocalData(examId: string) {
  localStorage.removeItem(`paathsala_syllabus_${examId}`);
  localStorage.removeItem(`paathsala_flashcards_${examId}`);

  const mocks = mockTestsByExam[examId] ?? [];
  for (const mock of mocks) {
    localStorage.removeItem(`paathsala_mock_${examId}_${mock.id}`);
  }
}
