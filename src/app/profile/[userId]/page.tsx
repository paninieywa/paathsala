'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getProfile, getBadges } from '@/lib/streak';

export default function PublicProfilePage() {
  const params = useParams<{ userId: string }>();
  const [profile, setProfile] = useState<{ display_name: string; streak_count: number } | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function load() {
      const data = await getProfile(params.userId);
      if (!data) {
        setNotFound(true);
        return;
      }
      setProfile(data);
    }
    load();
  }, [params.userId]);

  if (notFound) return <main style={{ padding: '48px' }}>Profile not found.</main>;
  if (!profile) return <main style={{ padding: '48px' }}>Loading...</main>;

  const badges = getBadges(profile.streak_count);

  return (
    <main style={{ padding: '48px', maxWidth: '480px' }}>
      <h1 className="font-display text-2xl mb-6" style={{ color: 'var(--indigo)' }}>
        {profile.display_name}
      </h1>
      <p className="font-display" style={{ fontSize: '28px', color: 'var(--marigold)' }}>
        {profile.streak_count} day streak
      </p>

      <h2 className="font-display text-lg mt-6 mb-3" style={{ color: 'var(--indigo)' }}>
        Badges
      </h2>
      {badges.length === 0 ? (
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>No badges yet.</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {badges.map((b) => (
            <span key={b} style={{ border: '1px solid var(--marigold)', padding: '6px 12px', fontSize: '13px', color: 'var(--indigo)' }}>
              {b}
            </span>
          ))}
        </div>
      )}
    </main>
  );
}
