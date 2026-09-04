function key(examId: string): string {
  return `paathsala_syllabus_${examId}`;
}

export function getCompleted(examId: string): string[] {
  if (typeof window === 'undefined') return [];
  const raw = localStorage.getItem(key(examId));
  return raw ? JSON.parse(raw) : [];
}

export function toggleTopic(examId: string, topicId: string): string[] {
  const current = getCompleted(examId);
  const updated = current.includes(topicId)
    ? current.filter((id) => id !== topicId)
    : [...current, topicId];
  localStorage.setItem(key(examId), JSON.stringify(updated));
  return updated;
}
