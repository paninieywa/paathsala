'use client';

import { useEffect, useState } from 'react';
import { getStreak, completeToday, getBadges } from '@/lib/streak';

export default function ProfilePage() {
  const [streak, setStreak] = useState(0);
  const [doneToday, setDoneToday] = useState(false);

  useEffect(() => {
    const data = getStreak();
    setStreak(data.count);
    setDoneToday(data.lastCompleted === new Date().toISOString().slice(0, 10));
  }, []);

  function handleComplete() {
    const data = completeToday();
    setStreak(data.count);
    setDoneToday(true);
  }

  const badges = getBadges(streak);

  return (
    <main style={{ padding: '48px', maxWidth: '640px' }}>
      <h1 className="font-display text-2xl mb-6" style={{ color: 'var(--indigo)' }}>
        Your Profile
      </h1>

      <div
        style={{
          border: '1px solid #E4DCC6',
          padding: '24px',
          marginBottom: '24px',
        }}
      >
        <p className="font-display" style={{ fontSize: '32px', color: 'var(--marigold)' }}>
          {streak} day{streak === 1 ? '' : 's'}
        </p>
        <p style={{ color: '#5B665F', fontSize: '14px' }}>Current streak</p>

        <button
          onClick={handleComplete}
          disabled={doneToday}
          style={{
            marginTop: '16px',
            padding: '10px 20px',
            background: doneToday ? '#E4DCC6' : 'var(--marigold)',
            color: 'var(--ink)',
            border: 'none',
            cursor: doneToday ? 'not-allowed' : 'pointer',
          }}
        >
          {doneToday ? "Today's quiz done" : "Complete today's quiz"}
        </button>
      </div>

      <h2 className="font-display text-lg mb-3" style={{ color: 'var(--indigo)' }}>
        Badges
      </h2>
      {badges.length === 0 ? (
        <p style={{ color: '#5B665F', fontSize: '14px' }}>
          No badges yet — a 3-day streak earns your first one.
        </p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {badges.map((b) => (
            <span
              key={b}
              style={{
                border: '1px solid var(--marigold)',
                padding: '6px 12px',
                fontSize: '13px',
                color: 'var(--indigo)',
              }}
            >
              {b}
            </span>
          ))}
        </div>
      )}
    </main>
  );
}
