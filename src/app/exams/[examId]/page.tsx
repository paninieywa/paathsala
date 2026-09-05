'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { exams } from '@/data/exams';
import { getSyllabus } from '@/data/syllabus';
import { getCompleted, toggleTopic } from '@/lib/syllabusProgress';
import { mockTestsByExam } from '@/data/mockTests';

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

  const mockTests = mockTestsByExam[examId] ?? [];

  return (
    <main style={{ padding: '48px', maxWidth: '640px' }}>
      <h1 className="font-display text-2xl mb-2" style={{ color: 'var(--indigo)' }}>
        {exam.name}
      </h1>
      <p style={{ color: '#5B665F', fontSize: '14px', marginBottom: '16px' }}>
        {exam.category}
      </p>

      <div className="flex flex-wrap gap-2" style={{ marginBottom: '32px' }}>
        <Link
          href={`/exams/${examId}/quiz`}
          style={{ padding: '10px 20px', background: 'var(--marigold)', color: 'var(--ink)' }}
        >
          Today&apos;s quiz
        </Link>
        <Link
          href={`/exams/${examId}/flashcards`}
          style={{ padding: '10px 20px', border: '1px solid var(--indigo)', color: 'var(--indigo)' }}
        >
          Flashcards
        </Link>
        <Link
          href={`/exams/${examId}/notes`}
          style={{ padding: '10px 20px', border: '1px solid var(--indigo)', color: 'var(--indigo)' }}
        >
          Notes
        </Link>
        <Link
  href={`/exams/${examId}/current-affairs`}
  style={{ padding: '10px 20px', border: '1px solid var(--indigo)', color: 'var(--indigo)' }}
>
  Current Affairs
</Link>
        <Link
          href={`/exams/${examId}/forum`}
          style={{ padding: '10px 20px', border: '1px solid var(--indigo)', color: 'var(--indigo)' }}
        >
          Forum
        </Link>
        <Link
          href={`/exams/${examId}/resources`}
          style={{ padding: '10px 20px', border: '1px solid var(--indigo)', color: 'var(--indigo)' }}
        >
          Resources
        </Link>
        <Link
  href={`/exams/${examId}/cutoff`}
  style={{ padding: '10px 20px', border: '1px solid var(--indigo)', color: 'var(--indigo)' }}
>
  Cutoff Trends
</Link>
        <Link
          href={`/exams/${examId}/analytics`}
          style={{ padding: '10px 20px', border: '1px solid var(--indigo)', color: 'var(--indigo)' }}
        >
          Analytics
        </Link>
      </div>

      <h2 className="font-display text-lg mb-2" style={{ color: 'var(--indigo)' }}>
        Mock Tests
      </h2>
      {mockTests.length === 0 ? (
        <p style={{ color: '#5B665F', fontSize: '14px', marginBottom: '32px' }}>
          No mock tests available yet.
        </p>
      ) : (
        <div className="flex flex-col gap-2" style={{ marginBottom: '32px' }}>
          {mockTests.map((m) => (
            <Link
              key={m.id}
              href={`/exams/${examId}/mock/${m.id}`}
              style={{ padding: '10px 16px', border: '1px solid var(--indigo)', color: 'var(--indigo)', textDecoration: 'none' }}
            >
              {m.name} ({m.durationMins} min)
            </Link>
          ))}
        </div>
      )}

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
    </main>
  );
}
