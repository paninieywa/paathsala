'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getProfile, getBadges } from '@/lib/streak';
import { bannerArtMap } from '@/components/BannerArt';
import StreakHeatmap from '@/components/StreakHeatmap';
import { Flame, Award, MapPin, Mail } from 'lucide-react';

type PublicProfile = {
  display_name: string;
  streak_count: number;
  completed_dates?: string[];
  avatar_url?: string | null;
  banner_id?: string;
  bio?: string;
  city?: string;
  contact_email?: string;
  show_city?: boolean;
  show_email?: boolean;
  created_at?: string;
};

export default function PublicProfilePage() {
  const params = useParams<{ userId: string }>();
  const [profile, setProfile] = useState<PublicProfile | null>(null);
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
  const initial = profile.display_name.charAt(0).toUpperCase();
  const BannerArt = bannerArtMap[profile.banner_id ?? 'marigold'] ?? bannerArtMap.marigold;
  const joinedAt = profile.created_at
    ? new Date(profile.created_at).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })
    : null;

  return (
    <div>
      <div style={{ width: '100%', height: 'clamp(120px, 24vw, 180px)' }}>
        <BannerArt />
      </div>

      <main style={{ maxWidth: '760px', margin: '0 auto', padding: 'clamp(16px, 4vw, 40px)' }}>
        <div
          style={{
            width: 'clamp(72px, 18vw, 96px)',
            height: 'clamp(72px, 18vw, 96px)',
            borderRadius: '50%',
            background: profile.avatar_url ? `url(${profile.avatar_url}) center/cover` : 'var(--hero-bg)',
            color: 'var(--marigold)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-space-grotesk)',
            fontSize: '30px',
            border: '4px solid var(--paper)',
            marginTop: 'clamp(-48px, -8vw, -56px)',
            marginBottom: '16px',
          }}
        >
          {!profile.avatar_url && initial}
        </div>

        <h1 className="font-display text-2xl" style={{ color: 'var(--indigo)', marginBottom: '4px' }}>
          {profile.display_name}
        </h1>

        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '10px' }}>
          {joinedAt && <span style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>Student since {joinedAt}</span>}
          {profile.show_city && profile.city && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12.5px', color: 'var(--text-muted)' }}>
              <MapPin size={13} /> {profile.city}
            </span>
          )}
          {profile.show_email && profile.contact_email && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12.5px', color: 'var(--text-muted)' }}>
              <Mail size={13} /> {profile.contact_email}
            </span>
          )}
        </div>

        {profile.bio && <p style={{ color: 'var(--ink)', fontSize: '14px', marginBottom: '28px', maxWidth: '60ch' }}>{profile.bio}</p>}

        <div style={{ border: '1px solid var(--border)', background: 'var(--surface)', padding: 'clamp(16px, 4vw, 24px)', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <Flame size={26} color="var(--marigold)" />
            <div>
              <p className="font-display" style={{ fontSize: '28px', color: 'var(--marigold)', lineHeight: 1 }}>
                {profile.streak_count}
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '12.5px' }}>day streak</p>
            </div>
          </div>
          <StreakHeatmap completedDates={profile.completed_dates ?? []} />
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <Award size={18} color="var(--indigo)" />
            <h2 className="font-display text-lg" style={{ color: 'var(--indigo)' }}>Badges</h2>
          </div>
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
        </div>
      </main>
    </div>
  );
}
