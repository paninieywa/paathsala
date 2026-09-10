'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { createMatch, findMatchByCode } from '@/lib/arena';
import { trackArenaPresence } from '@/lib/arenaPresence';
import { arenaTopics, ArenaTopic } from '@/data/arenaQuestions';
import { Swords } from 'lucide-react';

const topicLabels: Record<ArenaTopic, string> = {
  reasoning: 'Reasoning',
  maths: 'Maths',
  english: 'English',
  gs: 'General Studies',
  'current-affairs': 'Current Affairs',
};

export default function ArenaLobbyPage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState('Student');
  const [creating, setCreating] = useState(false);
  const [onlineCount, setOnlineCount] = useState(0);
  const [joinCode, setJoinCode] = useState('');
  const [joinError, setJoinError] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) return;
      setUserId(session.user.id);
      const { data } = await supabase.from('profiles').select('display_name').eq('id', session.user.id).single();
      if (data?.display_name) setUserName(data.display_name);
    });
  }, []);

  useEffect(() => {
    if (!userId) return;
    const channel = trackArenaPresence(userId, userName, setOnlineCount);
    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, userName]);

  async function startChallenge(topic: ArenaTopic) {
    if (!userId) {
      router.push('/login');
      return;
    }
    setCreating(true);
    const match = await createMatch(userId, userName, topic);
    setCreating(false);
    if (match) router.push(`/arena/${match.id}`);
  }

  async function handleJoinByCode(e: React.FormEvent) {
    e.preventDefault();
    setJoinError('');
    if (!userId) {
      router.push('/login');
      return;
    }
    const match = await findMatchByCode(joinCode.trim());
    if (!match) {
      setJoinError('No match found with that code.');
      return;
    }
    router.push(`/arena/${match.id}`);
  }

  return (
    <main style={{ padding: 'clamp(20px, 5vw, 48px)', maxWidth: '640px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
        <Swords size={24} color="var(--marigold)" />
        <h1 className="font-display text-2xl" style={{ color: 'var(--indigo)' }}>Challenge Arena</h1>
      </div>
      <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '12px' }}>
        Pick a topic, create a challenge, and share the room code with a friend. First to correctly answer 10 questions wins the tug of war.
      </p>

      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '28px' }}>
        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--leaf)', display: 'inline-block' }} />
        <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
          {onlineCount} student{onlineCount === 1 ? '' : 's'} online in Arena right now
        </span>
      </div>

      <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))' }}>
        {arenaTopics.map((topic) => (
          <button
            key={topic}
            onClick={() => startChallenge(topic)}
            disabled={creating}
            style={{
              padding: '20px',
              border: '1px solid var(--border)',
              background: 'var(--surface)',
              color: 'var(--indigo)',
              cursor: creating ? 'not-allowed' : 'pointer',
              fontFamily: 'var(--font-space-grotesk)',
              fontSize: '15px',
              fontWeight: 600,
            }}
          >
            {topicLabels[topic]}
          </button>
        ))}
      </div>

      <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid var(--border)' }}>
        <h2 className="font-display text-lg mb-2" style={{ color: 'var(--indigo)' }}>Have a room code?</h2>
        <form onSubmit={handleJoinByCode} className="flex gap-2" style={{ flexWrap: 'wrap' }}>
          <input
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
            placeholder="Enter 6-character code"
            maxLength={6}
            style={{
              padding: '10px',
              border: '1px solid var(--border)',
              background: 'var(--surface)',
              color: 'var(--ink)',
              letterSpacing: '2px',
              fontFamily: 'monospace',
              textTransform: 'uppercase',
            }}
          />
          <button type="submit" style={{ padding: '10px 20px', background: 'var(--indigo)', color: 'var(--paper)', border: 'none' }}>
            Join
          </button>
        </form>
        {joinError && <p style={{ color: 'var(--kumkum)', fontSize: '13px', marginTop: '8px' }}>{joinError}</p>}
      </div>
    </main>
  );
}
