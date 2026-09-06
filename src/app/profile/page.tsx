'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { getProfile, completeToday, getBadges } from '@/lib/streak';
import StreakHeatmap from '@/components/StreakHeatmap';
import { Flame, Award, Share2 } from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState('');
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [streak, setStreak] = useState(0);
  const [completedDates, setCompletedDates] = useState<string[]>([]);
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
        setCompletedDates(profile.completed_dates ?? []);
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
      setCompletedDates(updated.completed_dates ?? []);
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
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <main style={{ padding: 'clamp(20px, 5vw, 48px)', maxWidth: '720px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'var(--ink)',
              color: 'var(--marigold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-space-grotesk)',
              fontSize: '22px',
              flexShrink: 0,
            }}
          >
            {initial}
          </div>
          <div>
            {editingName ? (
              <div className="flex gap-2" style={{ alignItems: 'center' }}>
                <input
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  style={{ padding: '6px 8px', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--ink)', fontFamily: 'var(--font-space-grotesk)', fontSize: '17px' }}
                />
                <button onClick={saveName} style={{ padding: '6px 12px', background: 'var(--marigold)', border: 'none', color: 'var(--ink)', fontSize: '13px' }}>
                  Save
                </button>
              </div>
            ) : (
              <h1 className="font-display text-2xl" style={{ color: 'var(--indigo)' }}>
                {displayName}{' '}
                <button
                  onClick={() => setEditingName(true)}
                  style={{ fontSize: '12px', color: 'var(--text-muted)', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  edit
                </button>
              </h1>
            )}
            <button
              onClick={toggleLeaderboard}
              style={{ fontSize: '12.5px', color: 'var(--indigo)', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer', marginTop: '2px' }}
            >
              {onLeaderboard ? 'On the leaderboard' : 'Not on leaderboard — click to join'}
            </button>
          </div>
        </div>
        <button
          onClick={handleLogout}
          style={{ fontSize: '13px', color: 'var(--text-muted)', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          Log out
        </button>
      </div>

      <div style={{ border: '1px solid var(--border)', background: 'var(--surface)', padding: '24px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Flame size={26} color="var(--marigold)" />
            <div>
              <p className="font-display" style={{ fontSize: '28px', color: 'var(--marigold)', lineHeight: 1 }}>
                {streak}
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '12.5px' }}>day streak</p>
            </div>
          </div>
          <button
            onClick={handleComplete}
            disabled={doneToday}
            style={{
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

        <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px' }}>Activity — last 180 days</p>
        <StreakHeatmap completedDates={completedDates} />
      </div>

      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
          <Award size={18} color="var(--indigo)" />
          <h2 className="font-display text-lg" style={{ color: 'var(--indigo)' }}>Badges</h2>
        </div>
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
      </div>

      {userId && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-muted)' }}>
          <Share2 size={14} />
          <code style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '2px 6px', wordBreak: 'break-all' }}>
            /profile/{userId}
          </code>
        </div>
      )}
    </main>
  );
}
