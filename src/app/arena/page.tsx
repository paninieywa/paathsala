'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { createMatch } from '@/lib/arena';
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

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) return;
      setUserId(session.user.id);
      const { data } = await supabase.from('profiles').select('display_name').eq('id', session.user.id).single();
      if (data?.display_name) setUserName(data.display_name);
    });
  }, []);

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

  return (
    <main style={{ padding: 'clamp(20px, 5vw, 48px)', maxWidth: '640px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
        <Swords size={24} color="var(--marigold)" />
        <h1 className="font-display text-2xl" style={{ color: 'var(--indigo)' }}>Challenge Arena</h1>
      </div>
      <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '28px' }}>
        Pick a topic, create a challenge, and share the link with a friend. First to correctly answer 10 questions wins the tug of war.
      </p>

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
    </main>
  );
}
