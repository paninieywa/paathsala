'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { getProfile, completeToday, getBadges } from '@/lib/streak';

export default function ProfilePage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState('');
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [streak, setStreak] = useState(0);
  const [doneToday, setDoneToday] = useState(false);
  const [onLeaderboard, setOnLeaderboard] = useState(false);
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
        setNameInput(profile.display_name);
        setStreak(profile.streak_count);
        setOnLeaderboard(profile.show_on_leaderboard ?? false);
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

  async function saveName() {
    if (!userId || !nameInput.trim()) return;
    await supabase.from('profiles').update({ display_name: nameInput.trim() }).eq('id', userId);
    setDisplayName(nameInput.trim());
    setEditingName(false);
  }

  async function toggleLeaderboard() {
    if (!userId) return;
    const newValue = !onLeaderboard;
    await supabase.from('profiles').update({ show_on_leaderboard: newValue }).eq('id', userId);
    setOnLeaderboard(newValue);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push('/login');
  }

  if (loading) return <main style={{ padding: '48px' }}>Loading...</main>;

  const badges = getBadges(streak);

  return (
    <main style={{ padding: 'clamp(20px, 5vw, 48px)', maxWidth: '640px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '8px' }}>
        {editingName ? (
          <div className="flex gap-2" style={{ alignItems: 'center' }}>
            <input
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              style={{ padding: '8px', border: '1px solid var(--border)', fontFamily: 'var(--font-space-grotesk)', fontSize: '18px' }}
            />
            <button onClick={saveName} style={{ padding: '8px 14px', background: 'var(--marigold)', border: 'none', color: 'var(--ink)', fontSize: '13px' }}>
              Save
            </button>
          </div>
        ) : (
          <h1 className="font-display text-2xl" style={{ color: 'var(--indigo)' }}>
            {displayName}{' '}
            <button
              onClick={() => setEditingName(true)}
              style={{ fontSize: '13px', color: 'var(--indigo)', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Edit
            </button>
          </h1>
        )}
        <button
          onClick={handleLogout}
          style={{ fontSize: '13px', color: 'var(--indigo)', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          Log out
        </button>
      </div>

      <div style={{ border: '1px solid var(--border)', padding: '24px', marginBottom: '24px' }}>
        <p className="font-display" style={{ fontSize: '32px', color: 'var(--marigold)' }}>
          {streak} day{streak === 1 ? '' : 's'}
        </p>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Current streak</p>

        <button
          onClick={handleComplete}
          disabled={doneToday}
          style={{
            marginTop: '16px',
            padding: '10px 20px',
            background: doneToday ? 'var(--border)' : 'var(--marigold)',
            color: 'var(--ink)',
            border: 'none',
            cursor: doneToday ? 'not-allowed' : 'pointer',
          }}
        >
          {doneToday ? "Today's quiz done" : "Complete today's quiz"}
        </button>
      </div>

      <button
        onClick={toggleLeaderboard}
        style={{ fontSize: '13px', color: 'var(--indigo)', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '24px' }}
      >
        {onLeaderboard ? 'Remove me from the leaderboard' : 'Show me on the leaderboard'}
      </button>

      <h2 className="font-display text-lg mb-3" style={{ color: 'var(--indigo)' }}>
        Badges
      </h2>
      {badges.length === 0 ? (
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>No badges yet — a 3-day streak earns your first one.</p>
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
        <p style={{ marginTop: '24px', fontSize: '13px', color: 'var(--text-muted)', wordBreak: 'break-all' }}>
          Share your public profile: <code style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '2px 6px' }}>/profile/{userId}</code>
        </p>
      )}
    </main>
  );
}
