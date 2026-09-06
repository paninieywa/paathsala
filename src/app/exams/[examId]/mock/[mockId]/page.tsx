'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getQuestions } from '@/data/questions';
import { getMockTest } from '@/data/mockTests';
import { saveAttempt, TopicResult } from '@/lib/mockAttempts';
import { supabase } from '@/lib/supabase';
import { completeToday } from '@/lib/streak';
import { scoreMockTest } from '@/lib/scoreMockTest';

export default function MockTestPage() {
  const params = useParams<{ examId: string; mockId: string }>();
  const { examId, mockId } = params;

  const mock = getMockTest(examId, mockId);
  const questions = getQuestions(examId);

  const [userId, setUserId] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [secondsLeft, setSecondsLeft] = useState((mock?.durationMins ?? 0) * 60);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<{ score: number; breakdown: TopicResult[] } | null>(null);

 async function handleSubmit() {
  const answeredQuestions = questions.map((q) => ({
    topicId: q.topicId,
    correctIndex: q.correctIndex,
    pickedIndex: answers[q.id],
  }));

  const { score, breakdown } = scoreMockTest(answeredQuestions, mock!.negativeMarking);

  setResult({ score, breakdown });
  saveAttempt(examId, mockId, {
    score,
    totalQuestions: questions.length,
    topicBreakdown: breakdown,
    completedAt: new Date().toISOString(),
  });
  if (userId) await completeToday(userId);
  setSubmitted(true);
}

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserId(session?.user.id ?? null);
    });
  }, []);

  useEffect(() => {
    if (submitted || secondsLeft <= 0) return;
    const timer = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(timer);
  }, [submitted, secondsLeft]);

  useEffect(() => {
  if (secondsLeft !== 0 || submitted) return;
  const timeout = setTimeout(() => handleSubmit(), 0);
  return () => clearTimeout(timeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [secondsLeft]);

  if (!mock) return <main style={{ padding: '48px' }}>Mock test not found.</main>;
  if (questions.length === 0) return <main style={{ padding: '48px' }}>No questions available yet.</main>;

  function selectAnswer(questionId: string, optionIndex: number) {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  }

  if (submitted && result) {
    return (
      <main style={{ padding: '48px', maxWidth: '560px' }}>
        <h1 className="font-display text-2xl mb-2" style={{ color: 'var(--indigo)' }}>
          Test complete
        </h1>
        <p style={{ fontSize: '18px', marginBottom: '24px' }}>
          Score: {result.score.toFixed(1)} / {questions.length}
        </p>

        <h2 className="font-display text-lg mb-3" style={{ color: 'var(--indigo)' }}>
          Topic breakdown
        </h2>
        {result.breakdown.map((t) => {
          const total = t.correct + t.wrong + t.skipped;
          const pct = total ? Math.round((t.correct / total) * 100) : 0;
          return (
            <div key={t.topicId} style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                <span>{t.topicId}</span>
                <span>{pct}% correct</span>
              </div>
              <div style={{ background: 'var(--border)', height: '8px' }}>
                <div style={{ background: pct >= 50 ? 'var(--leaf)' : 'var(--kumkum)', width: `${pct}%`, height: '100%' }} />
              </div>
            </div>
          );
        })}
      </main>
    );
  }

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <main style={{ padding: '48px', maxWidth: '620px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
        <h1 className="font-display text-xl" style={{ color: 'var(--indigo)' }}>
          {mock.name}
        </h1>
        <span className="font-display" style={{ color: 'var(--kumkum)', fontSize: '18px' }}>
          {minutes}:{seconds.toString().padStart(2, '0')}
        </span>
      </div>

      {questions.map((q, i) => (
        <div key={q.id} style={{ marginBottom: '24px' }}>
          <p style={{ marginBottom: '8px' }}>
            {i + 1}. {q.text}
          </p>
          <div className="flex flex-col gap-2">
            {q.options.map((opt, oi) => (
              <button
                key={oi}
                onClick={() => selectAnswer(q.id, oi)}
                style={{
                  padding: '10px 14px',
                  textAlign: 'left',
                  border: '1px solid var(--border)',
                  background: answers[q.id] === oi ? 'var(--marigold)' : 'var(--paper)',
                  color: 'var(--ink)',
                }}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ))}

      <button
        onClick={handleSubmit}
        style={{ padding: '12px 24px', background: 'var(--indigo)', color: 'var(--paper)', border: 'none' }}
      >
        Submit test
      </button>
    </main>
  );
}
