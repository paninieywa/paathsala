'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { exams } from '@/data/exams';
import { getSyllabus } from '@/data/syllabus';
import { getCompleted, toggleTopic } from '@/lib/syllabusProgress';

export default function ExamDashboard() {
  const params = useParams<{ examId: string }>();
  const examId = params.examId;

  const exam = exams.find((e) => e.id === examId);
  const topics = getSyllabus(examId);
  const [completed, setCompleted] = useState<string[]>([]);

  useEffect(() => {
    setCompleted(getCompleted(examId));
  }, [examId]);

  function handleToggle(topicId: string) {
    setCompleted(toggleTopic(examId, topicId));
  }

  if (!exam) {
    return <main style={{ padding: '48px' }}>Exam not found.</main>;
  }

  const progress = topics.length
    ? Math.round((completed.length / topics.length) * 100)
    : 0;

  return (
    <main style={{ padding: '48px', maxWidth: '640px' }}>
      <h1 className="font-display text-2xl mb-2" style={{ color: 'var(--indigo)' }}>
        {exam.name}
      </h1>
      <p style={{ color: '#5B665F', fontSize: '14px', marginBottom: '24px' }}>
        {exam.category}
      </p>

      <h2 className="font-display text-lg mb-2" style={{ color: 'var(--indigo)' }}>
        Syllabus ({progress}% complete)
      </h2>

      {topics.length === 0 ? (
        <p style={{ color: '#5B665F', fontSize: '14px' }}>
          Syllabus for this exam is coming soon.
        </p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, marginBottom: '32px' }}>
          {topics.map((topic) => (
            <li key={topic.id} style={{ marginBottom: '8px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={completed.includes(topic.id)}
                  onChange={() => handleToggle(topic.id)}
                />
                <span style={{ color: 'var(--ink)' }}>{topic.name}</span>
              </label>
            </li>
          ))}
        </ul>
      )}

      <div style={{ borderTop: '1px solid #E4DCC6', paddingTop: '20px' }}>
        <h2 className="font-display text-lg mb-2" style={{ color: 'var(--indigo)' }}>
          Notes &amp; PYQs
        </h2>
        <p style={{ color: '#5B665F', fontSize: '14px' }}>
          Coming in the next phase — notes library and previous-year questions.
        </p>
      </div>
    </main>
  );
}
