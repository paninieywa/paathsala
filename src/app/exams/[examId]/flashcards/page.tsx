'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { getFlashcards } from '@/data/flashcards';
import { isDue, reviewCard } from '@/lib/flashcardProgress';

export default function FlashcardsPage() {
  const params = useParams<{ examId: string }>();
  const examId = params.examId;

  const allCards = getFlashcards(examId);
  const dueCards = allCards.filter((c) => isDue(examId, c.id));

  const [queue, setQueue] = useState(dueCards);
  const [flipped, setFlipped] = useState(false);

  if (allCards.length === 0) {
    return <main style={{ padding: '48px' }}>No flashcards available for this exam yet.</main>;
  }

  if (queue.length === 0) {
    return (
      <main style={{ padding: '48px' }}>
        <h1 className="font-display text-2xl" style={{ color: 'var(--indigo)' }}>
          All caught up
        </h1>
        <p style={{ color: '#5B665F', fontSize: '14px', marginTop: '8px' }}>
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
    <main style={{ padding: '48px', maxWidth: '480px' }}>
      <p style={{ color: '#5B665F', fontSize: '13px', marginBottom: '16px' }}>
        {queue.length} card{queue.length === 1 ? '' : 's'} left today
      </p>

      <div
        onClick={() => setFlipped((f) => !f)}
        style={{
          border: '1px solid #E4DCC6',
          padding: '48px 24px',
          minHeight: '160px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          cursor: 'pointer',
          background: 'var(--paper)',
          marginBottom: '20px',
        }}
      >
        <p className="font-display" style={{ fontSize: '20px', color: 'var(--indigo)' }}>
          {flipped ? card.back : card.front}
        </p>
      </div>

      {!flipped ? (
        <p style={{ color: '#5B665F', fontSize: '13px' }}>Tap the card to reveal the answer.</p>
      ) : (
        <div className="flex gap-2">
          <button
            onClick={() => handleAnswer(false)}
            style={{ padding: '10px 20px', background: '#F3DADA', border: 'none', color: 'var(--ink)' }}
          >
            Didn&apos;t know it
          </button>
          <button
            onClick={() => handleAnswer(true)}
            style={{ padding: '10px 20px', background: '#DCEEE3', border: 'none', color: 'var(--ink)' }}
          >
            Knew it
          </button>
        </div>
      )}
    </main>
  );
}
