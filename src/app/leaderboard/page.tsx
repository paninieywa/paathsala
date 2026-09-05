'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

type LeaderRow = {
  id: string;
  display_name: string;
  streak_count: number;
};

export default function LeaderboardPage() {
  const [rows, setRows] = useState<LeaderRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, display_name, streak_count')
        .eq('show_on_leaderboard', true)
        .order('streak_count', { ascending: false })
        .limit(50);

      if (error) {
        console.error('leaderboard error:', error);
      } else {
        setRows(data ?? []);
      }
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <main style={{ padding: '48px' }}>Loading...</main>;

  return (
    <main style={{ padding: '48px', maxWidth: '560px' }}>
      <h1 className="font-display text-2xl mb-2" style={{ color: 'var(--indigo)' }}>
        Leaderboard
      </h1>
      <p style={{ color: '#5B665F', fontSize: '13px', marginBottom: '24px' }}>
        Shows only students who&apos;ve opted in from their profile.
      </p>

      {rows.length === 0 ? (
        <p style={{ color: '#5B665F', fontSize: '14px' }}>No one has joined the leaderboard yet.</p>
      ) : (
        <div className="flex flex-col gap-1">
          {rows.map((r, i) => (
            <Link
              key={r.id}
              href={`/profile/${r.id}`}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '10px 16px',
                border: '1px solid #E4DCC6',
                textDecoration: 'none',
                color: 'var(--ink)',
              }}
            >
              <span>{i + 1}. {r.display_name}</span>
              <span style={{ color: 'var(--marigold-deep, var(--marigold))' }}>{r.streak_count} days</span>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
