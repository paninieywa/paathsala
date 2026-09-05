'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { getProfile, completeToday, getBadges } from '@/lib/streak';

export default function ProfilePage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState('');
  const [streak, setStreak] = useState(0);
  const [doneToday, setDoneToday] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
        return;
      }
      setUserId(session.user.id);

      const profile = await getProfile(session.user.id);
      if (profile) {
        setDisplayName(profile.display_name);
        setStreak(profile.streak_count);
        setDoneToday(profile.last_completed === new Date().toISOString().slice(0, 10));
      }
      setLoading(false);
    }
    load();
  }, [router]);

  async function handleComplete() {
    if (!userId) return;
    const updated = await completeToday(userId);
    if (updated) {
      setStreak(updated.streak_count);
      setDoneToday(true);
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push('/login');
  }

  if (loading) return <main style={{ padding: '48px' }}>Loading...</main>;

  const badges = getBadges(streak);

  return (
    <main style={{ padding: '48px', maxWidth: '640px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 className="font-display text-2xl mb-6" style={{ color: 'var(--indigo)' }}>
          {displayName}
        </h1>
        <button
          onClick={handleLogout}
          style={{ fontSize: '13px', color: 'var(--indigo)', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          Log out
        </button>
      </div>

      <div style={{ border: '1px solid #E4DCC6', padding: '24px', marginBottom: '24px' }}>
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
      <button
  onClick={async () => {
    if (!userId) return;
    const { data } = await supabase.from('profiles').select('show_on_leaderboard').eq('id', userId).single();
    const newValue = !data?.show_on_leaderboard;
    await supabase.from('profiles').update({ show_on_leaderboard: newValue }).eq('id', userId);
    alert(newValue ? 'You are now on the leaderboard.' : 'Removed from leaderboard.');
  }}
  style={{ fontSize: '13px', color: 'var(--indigo)', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '24px' }}
>
  Toggle leaderboard visibility
</button>
      <h2 className="font-display text-lg mb-3" style={{ color: 'var(--indigo)' }}>
        Badges
      </h2>
      {badges.length === 0 ? (
        <p style={{ color: '#5B665F', fontSize: '14px' }}>No badges yet — a 3-day streak earns your first one.</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {badges.map((b) => (
            <span key={b} style={{ border: '1px solid var(--marigold)', padding: '6px 12px', fontSize: '13px', color: 'var(--indigo)' }}>
              {b}
            </span>
          ))}
        </div>
      )}

      {userId && (
        <p style={{ marginTop: '24px', fontSize: '13px', color: '#5B665F' }}>
          Share your public profile:{' '}
          <code style={{ background: '#EFE9D8', padding: '2px 6px' }}>/profile/{userId}</code>
        </p>
      )}
    </main>
  );
}
