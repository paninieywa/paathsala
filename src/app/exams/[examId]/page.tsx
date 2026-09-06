'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { exams } from '@/data/exams';
import { examMeta } from '@/data/examMeta';
import { getSyllabus } from '@/data/syllabus';
import { getCompleted, toggleTopic } from '@/lib/syllabusProgress';
import { mockTestsByExam } from '@/data/mockTests';
import { PenLine, Layers, BookOpen, MessageSquare, Link2, BarChart3, TrendingUp, Newspaper, Clock } from 'lucide-react';

const actionLinks = [
  { key: 'quiz', label: "Today's quiz", icon: PenLine, primary: true },
  { key: 'flashcards', label: 'Flashcards', icon: Layers },
  { key: 'notes', label: 'Notes', icon: BookOpen },
  { key: 'current-affairs', label: 'Current Affairs', icon: Newspaper },
  { key: 'forum', label: 'Forum', icon: MessageSquare },
  { key: 'resources', label: 'Resources', icon: Link2 },
  { key: 'cutoff', label: 'Cutoff Trends', icon: TrendingUp },
  { key: 'analytics', label: 'Analytics', icon: BarChart3 },
];

export default function ExamDashboard() {
  const params = useParams<{ examId: string }>();
  const examId = params.examId;

  const exam = exams.find((e) => e.id === examId);
  const meta = examMeta[examId];
  const Icon = meta?.icon;
  const topics = getSyllabus(examId);
  const [completed, setCompleted] = useState<string[]>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
    <main style={{ padding: 'clamp(20px, 5vw, 48px)', maxWidth: '820px' }}>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '8px' }}>
        <div style={{ width: '52px', height: '52px', background: 'var(--hero-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          {Icon && <Icon size={26} color="var(--marigold)" />}
        </div>
        <div>
          <h1 className="font-display text-2xl" style={{ color: 'var(--indigo)' }}>
            {exam.name}
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>{meta?.description}</p>
        </div>
      </div>

      <div
        className="grid gap-3"
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', margin: '32px 0' }}
      >
        {actionLinks.map(({ key, label, icon: ActionIcon, primary }) => (
          <Link
            key={key}
            href={`/exams/${examId}/${key}`}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              padding: '18px 16px',
              border: `1px solid ${primary ? 'var(--marigold)' : 'var(--border)'}`,
              background: primary ? 'var(--marigold)' : 'var(--surface)',
              color: primary ? 'var(--ink)' : 'var(--indigo)',
              textDecoration: 'none',
              transition: 'transform 0.1s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            <ActionIcon size={20} />
            <span style={{ fontSize: '14px', fontWeight: 600 }}>{label}</span>
          </Link>
        ))}
      </div>

      <h2 className="font-display text-lg mb-2" style={{ color: 'var(--indigo)' }}>
        Mock Tests
      </h2>
      {mockTests.length === 0 ? (
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '32px' }}>
          No mock tests available yet.
        </p>
      ) : (
        <div className="flex flex-col gap-2" style={{ marginBottom: '32px' }}>
          {mockTests.map((m) => (
            <Link
              key={m.id}
              href={`/exams/${examId}/mock/${m.id}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '14px 16px',
                border: '1px solid var(--indigo)',
                color: 'var(--indigo)',
                textDecoration: 'none',
              }}
            >
              <Clock size={16} />
              <span>{m.name} — {m.durationMins} min</span>
            </Link>
          ))}
        </div>
      )}

      <h2 className="font-display text-lg mb-3" style={{ color: 'var(--indigo)' }}>
        Syllabus
      </h2>
      {topics.length === 0 ? (
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
          Syllabus for this exam is coming soon.
        </p>
      ) : (
        <>
          <div style={{ background: 'var(--border)', height: '10px', marginBottom: '8px' }}>
            <div style={{ background: 'var(--marigold)', width: `${progress}%`, height: '100%' }} />
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>{progress}% complete</p>

          <ul style={{ listStyle: 'none', padding: 0 }}>
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
        </>
      )}
    </main>
  );
}
