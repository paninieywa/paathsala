'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getQuestions } from '@/data/questions';
import { supabase } from '@/lib/supabase';
import { completeToday } from '@/lib/streak';

export default function QuizPage() {
  const params = useParams<{ examId: string }>();
  const questions = getQuestions(params.examId);

  const [userId, setUserId] = useState<string | null>(null);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserId(session?.user.id ?? null);
    });
  }, []);

  if (questions.length === 0) {
    return <main style={{ padding: '48px' }}>No quiz available for this exam yet.</main>;
  }

  const current = questions[index];

  function handleSelect(optionIndex: number) {
    if (selected !== null) return;
    setSelected(optionIndex);
    if (optionIndex === current.correctIndex) setScore((s) => s + 1);
  }

  async function handleNext() {
    if (index + 1 < questions.length) {
      setIndex((i) => i + 1);
      setSelected(null);
    } else {
      if (userId) await completeToday(userId);
      setFinished(true);
    }
  }

  if (finished) {
    return (
      <main style={{ padding: '48px', maxWidth: '480px' }}>
        <h1 className="font-display text-2xl mb-2" style={{ color: 'var(--indigo)' }}>
          Quiz complete
        </h1>
        <p style={{ fontSize: '18px', color: 'var(--ink)' }}>
          You scored {score} out of {questions.length}.
        </p>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '12px' }}>
          {userId ? "Today's streak has been recorded." : 'Log in to save your streak next time.'}
        </p>
      </main>
    );
  }

  return (
    <main style={{ padding: '48px', maxWidth: '560px' }}>
      <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '8px' }}>
        Question {index + 1} of {questions.length}
      </p>
      <h1 className="font-display text-xl mb-6" style={{ color: 'var(--indigo)' }}>
        {current.text}
      </h1>

      <div className="flex flex-col gap-2">
        {current.options.map((option, i) => {
          const isCorrect = selected !== null && i === current.correctIndex;
          const isWrongPick = selected === i && i !== current.correctIndex;
          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              style={{
                padding: '12px 16px',
                textAlign: 'left',
                border: '1px solid var(--border)',
                background: isCorrect ? 'var(--feedback-correct-bg)' : isWrongPick ? 'var(--feedback-wrong-bg)' : 'var(--paper)',
                color: 'var(--ink)',
                cursor: selected === null ? 'pointer' : 'default',
              }}
            >
              {option}
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <button
          onClick={handleNext}
          style={{ marginTop: '20px', padding: '10px 20px', background: 'var(--marigold)', color: 'var(--ink)', border: 'none' }}
        >
          {index + 1 < questions.length ? 'Next question' : 'Finish quiz'}
        </button>
      )}
    </main>
  );
}
