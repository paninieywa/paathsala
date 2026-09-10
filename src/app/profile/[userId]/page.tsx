'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getProfile } from '@/lib/streak';
import { bannerArtMap } from '@/components/BannerArt';
import StreakHeatmap from '@/components/StreakHeatmap';
import EarnedBadges from '@/components/EarnedBadges';
import { exams } from '@/data/exams';
import { examMeta } from '@/data/examMeta';
import { MapPin, Mail, Calendar } from 'lucide-react';

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
  show_on_leaderboard?: boolean;
  created_at?: string;
  chosen_exams?: string[];
  total_quizzes_completed?: number;
  total_mocks_completed?: number;
  forum_post_count?: number;
  resources_shared_count?: number;
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

  const initial = profile.display_name.charAt(0).toUpperCase();
  const BannerArt = bannerArtMap[profile.banner_id ?? 'marigold'] ?? bannerArtMap.marigold;
  const joinedAt = profile.created_at
    ? new Date(profile.created_at).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })
    : null;
  const chosenExams = profile.chosen_exams ?? [];

  const stats = {
    streak: profile.streak_count,
    totalQuizzes: profile.total_quizzes_completed ?? 0,
    totalMocks: profile.total_mocks_completed ?? 0,
    forumPosts: profile.forum_post_count ?? 0,
    resourcesShared: profile.resources_shared_count ?? 0,
  };

  return (
    <div>
      <div style={{ width: '100%', height: 'clamp(90px, 16vw, 130px)' }}>
        <BannerArt />
      </div>

      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: 'clamp(16px, 4vw, 40px)' }}>
        <div className="profile-grid">
          <aside className="profile-sidebar">
            <div style={{ width: 'fit-content', marginTop: 'clamp(-40px, -7vw, -50px)', marginBottom: '14px' }}>
              <div
                style={{
                  width: 'clamp(140px, 22vw, 220px)',
                  height: 'clamp(140px, 22vw, 220px)',
                  borderRadius: '50%',
                  background: profile.avatar_url ? `url(${profile.avatar_url}) center/cover` : 'var(--hero-bg)',
                  color: 'var(--marigold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-space-grotesk)',
                  fontSize: '64px',
                  border: '4px solid var(--paper)',
                }}
              >
                {!profile.avatar_url && initial}
              </div>
            </div>

            <h1 className="font-display text-xl" style={{ color: 'var(--indigo)', marginBottom: '2px' }}>
              {profile.display_name}
            </h1>
            {profile.bio && <p style={{ color: 'var(--text-muted)', fontSize: '13.5px', marginBottom: '14px' }}>{profile.bio}</p>}

            <div className="flex flex-col gap-2" style={{ marginBottom: '14px' }}>
              {profile.show_city && profile.city && (
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--text-muted)' }}>
                  <MapPin size={14} /> {profile.city}
                </span>
              )}
              {profile.show_email && profile.contact_email && (
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--text-muted)' }}>
                  <Mail size={14} /> {profile.contact_email}
                </span>
              )}
              {joinedAt && (
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--text-muted)' }}>
                  <Calendar size={14} /> Joined {joinedAt}
                </span>
              )}
            </div>

            {profile.show_on_leaderboard && (
              <p style={{ fontSize: '12px', color: 'var(--leaf)' }}>● On the leaderboard</p>
            )}
          </aside>

          <div className="profile-main">
            <div style={{ marginBottom: '24px' }}>
              <h2 className="font-display text-lg mb-3" style={{ color: 'var(--indigo)' }}>Preparing for</h2>
              {chosenExams.length === 0 ? (
                <p style={{ fontSize: '13.5px', color: 'var(--text-muted)' }}>No exams listed yet.</p>
              ) : (
                <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
                  {chosenExams.map((id) => {
                    const exam = exams.find((e) => e.id === id);
                    const meta = examMeta[id];
                    const Icon = meta?.icon;
                    return (
                      <div key={id} style={{ border: '1px solid var(--border)', padding: '14px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          {Icon && <Icon size={16} color="var(--marigold)" />}
                          <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--indigo)' }}>{exam?.name ?? id}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div style={{ marginBottom: '24px' }}>
              <h2 className="font-display text-lg mb-3" style={{ color: 'var(--indigo)' }}>{profile.streak_count} day streak</h2>
              <StreakHeatmap completedDates={profile.completed_dates ?? []} />
            </div>

            <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', marginBottom: '24px' }}>
              {[
                { label: 'Quizzes', value: stats.totalQuizzes },
                { label: 'Mock tests', value: stats.totalMocks },
                { label: 'Forum posts', value: stats.forumPosts },
                { label: 'Resources', value: stats.resourcesShared },
              ].map((stat) => (
                <div key={stat.label} style={{ border: '1px solid var(--border)', padding: '12px', textAlign: 'center' }}>
                  <p className="font-display" style={{ fontSize: '20px', color: 'var(--indigo)' }}>{stat.value}</p>
                  <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{stat.label}</p>
                </div>
              ))}
            </div>

            <div>
              <h2 className="font-display text-lg mb-3" style={{ color: 'var(--indigo)' }}>Badges</h2>
              <EarnedBadges stats={stats} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
