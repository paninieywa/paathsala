'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getFlashcards, Flashcard } from '@/data/flashcards';
import { isDue, reviewCard } from '@/lib/flashcardProgress';

export default function FlashcardsPage() {
  const params = useParams<{ examId: string }>();
  const examId = params.examId;

  const allCards = getFlashcards(examId);

  const [queue, setQueue] = useState<Flashcard[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
  const dueCards = allCards.filter((c) => isDue(examId, c.id));
  // eslint-disable-next-line react-hooks/set-state-in-effect
  setQueue(dueCards);
  setLoaded(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [examId]);

  if (allCards.length === 0) {
    return <main style={{ padding: '48px' }}>No flashcards available for this exam yet.</main>;
  }

  if (!loaded) {
    return <main style={{ padding: '48px' }}>Loading...</main>;
  }

  if (queue.length === 0) {
    return (
      <main style={{ padding: '48px' }}>
        <h1 className="font-display text-2xl" style={{ color: 'var(--indigo)' }}>
          All caught up
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '8px' }}>
          No cards due for review right now. Come back tomorrow.
        </p>
      </main>
    );
  }

  const card = queue[0];

  function handleAnswer(knewIt: boolean) {
    reviewCard(examId, card.id, knewIt);
    setFlipped(false);
    setQueue((q) => q.slice(1));
  }

  return (
    <main style={{ padding: 'clamp(20px, 5vw, 48px)', maxWidth: '480px' }}>
      <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '16px' }}>
        {queue.length} card{queue.length === 1 ? '' : 's'} left today
      </p>

      <div
        onClick={() => setFlipped((f) => !f)}
        style={{
          border: '1px solid var(--border)',
          padding: '48px 24px',
          minHeight: '160px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          cursor: 'pointer',
          background: 'var(--surface)',
          marginBottom: '20px',
        }}
      >
        <p className="font-display" style={{ fontSize: '20px', color: 'var(--indigo)' }}>
          {flipped ? card.back : card.front}
        </p>
      </div>

      {!flipped ? (
        <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Tap the card to reveal the answer.</p>
      ) : (
        <div className="flex gap-2">
          <button
            onClick={() => handleAnswer(false)}
            style={{ padding: '10px 20px', background: 'var(--feedback-wrong-bg)', border: 'none', color: 'var(--feedback-wrong-text)' }}
          >
            Didn&apos;t know it
          </button>
          <button
            onClick={() => handleAnswer(true)}
            style={{ padding: '10px 20px', background: 'var(--feedback-correct-bg)', border: 'none', color: 'var(--feedback-correct-text)' }}
          >
            Knew it
          </button>
        </div>
      )}
    </main>
  );
}
