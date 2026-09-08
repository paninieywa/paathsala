'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { getProfile } from '@/lib/streak';
import { uploadAvatar } from '@/lib/avatar';
import { bannerArtMap } from '@/components/BannerArt';
import StreakHeatmap from '@/components/StreakHeatmap';
import SettingsModal from '@/components/SettingsModal';
import BannerPicker from '@/components/BannerPicker';
import EarnedBadges from '@/components/EarnedBadges';
import ExamsPanel from '@/components/ExamsPanel';
import { exams } from '@/data/exams';
import { Camera, Settings, MapPin, Mail, Calendar, Pencil, CheckCircle2 } from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [userId, setUserId] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [bannerId, setBannerId] = useState('marigold');
  const [bio, setBio] = useState('');
  const [city, setCity] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [showCity, setShowCity] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [streak, setStreak] = useState(0);
  const [completedDates, setCompletedDates] = useState<string[]>([]);
  const [doneToday, setDoneToday] = useState(false);
  const [onLeaderboard, setOnLeaderboard] = useState(false);
  const [chosenExams, setChosenExams] = useState<string[]>([]);
  const [totalQuizzes, setTotalQuizzes] = useState(0);
  const [totalMocks, setTotalMocks] = useState(0);
  const [forumPosts, setForumPosts] = useState(0);
  const [resourcesShared, setResourcesShared] = useState(0);
  const [loading, setLoading] = useState(true);
  const [avatarError, setAvatarError] = useState('');
  const [joinedAt, setJoinedAt] = useState('');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [bannerPickerOpen, setBannerPickerOpen] = useState(false);

  useEffect(() => {
    async function load() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
        return;
      }
      setUserId(session.user.id);

      let profile = await getProfile(session.user.id);
      if (!profile) {
        const fallbackName = session.user.email?.split('@')[0] || 'Student';
        await supabase.from('profiles').insert({ id: session.user.id, display_name: fallbackName });
        profile = await getProfile(session.user.id);
      }

      if (profile) {
        setDisplayName(profile.display_name);
        setAvatarUrl(profile.avatar_url ?? null);
        setBannerId(profile.banner_id ?? 'marigold');
        setBio(profile.bio ?? '');
        setCity(profile.city ?? '');
        setContactEmail(profile.contact_email ?? '');
        setShowCity(profile.show_city ?? false);
        setShowEmail(profile.show_email ?? false);
        setStreak(profile.streak_count);
        setCompletedDates(profile.completed_dates ?? []);
        setOnLeaderboard(profile.show_on_leaderboard ?? false);
        setChosenExams(profile.chosen_exams ?? []);
        setTotalQuizzes(profile.total_quizzes_completed ?? 0);
        setTotalMocks(profile.total_mocks_completed ?? 0);
        setForumPosts(profile.forum_post_count ?? 0);
        setResourcesShared(profile.resources_shared_count ?? 0);
        setDoneToday(profile.last_completed === new Date().toISOString().slice(0, 10));
        if (profile.created_at) {
          setJoinedAt(new Date(profile.created_at).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }));
        }
      }
      setLoading(false);
    }
    load();
  }, [router]);

  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!userId || !e.target.files?.[0]) return;
    setAvatarError('');
    const result = await uploadAvatar(userId, e.target.files[0]);
    if (result.error) {
      setAvatarError(result.error);
      return;
    }
    if (result.url) setAvatarUrl(result.url);
  }

  if (loading) return <main style={{ padding: '48px' }}>Loading...</main>;

  const initial = displayName.charAt(0).toUpperCase();
  const BannerArt = bannerArtMap[bannerId] ?? bannerArtMap.marigold;

  return (
    <div>
      <div style={{ width: '100%', height: 'clamp(90px, 16vw, 130px)', position: 'relative' }}>
        <BannerArt />
        <button
          onClick={() => setBannerPickerOpen(true)}
          style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.4)', border: 'none', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff' }}
          title="Change banner"
        >
          <Pencil size={13} />
        </button>
      </div>

      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: 'clamp(16px, 4vw, 40px)' }}>
        <div className="profile-grid">
          <aside className="profile-sidebar">
            <div style={{ position: 'relative', width: 'fit-content', marginTop: 'clamp(-40px, -7vw, -50px)', marginBottom: '14px' }}>
              <div
                style={{
                  width: 'clamp(140px, 22vw, 220px)', height: 'clamp(140px, 22vw, 220px)', borderRadius: '50%',
                  background: avatarUrl ? `url(${avatarUrl}) center/cover` : 'var(--hero-bg)', color: 'var(--marigold)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-space-grotesk)',
                  fontSize: '64px', border: '4px solid var(--paper)',
                }}
              >
                {!avatarUrl && initial}
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                style={{ position: 'absolute', bottom: 4, right: 4, width: '32px', height: '32px', borderRadius: '50%', background: 'var(--marigold)', border: '2px solid var(--paper)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              >
                <Camera size={15} color="var(--ink)" />
              </button>
              <input ref={fileInputRef} type="file" accept="image/jpeg" onChange={handleAvatarChange} style={{ display: 'none' }} />
            </div>

            {avatarError && <p style={{ color: 'var(--feedback-wrong-text)', fontSize: '12px', marginBottom: '10px' }}>{avatarError}</p>}

            <h1 className="font-display text-xl" style={{ color: 'var(--indigo)', marginBottom: '2px' }}>{displayName}</h1>
            {bio && <p style={{ color: 'var(--text-muted)', fontSize: '13.5px', marginBottom: '14px' }}>{bio}</p>}

            <button
              onClick={() => setSettingsOpen(true)}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--indigo)', background: 'none', border: '1px solid var(--border)', padding: '8px 14px', cursor: 'pointer', marginBottom: '16px', width: '100%', justifyContent: 'center' }}
            >
              <Settings size={14} /> Edit profile
            </button>

            <div className="flex flex-col gap-2" style={{ marginBottom: '14px' }}>
              {showCity && city && (
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--text-muted)' }}>
                  <MapPin size={14} /> {city}
                </span>
              )}
              {showEmail && contactEmail && (
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--text-muted)' }}>
                  <Mail size={14} /> {contactEmail}
                </span>
              )}
              {joinedAt && (
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--text-muted)' }}>
                  <Calendar size={14} /> Joined {joinedAt}
                </span>
              )}
            </div>

            <p style={{ fontSize: '12px', color: onLeaderboard ? 'var(--leaf)' : 'var(--text-muted)' }}>
              {onLeaderboard ? '● On the leaderboard' : '○ Not on leaderboard'}
            </p>
          </aside>

          <div className="profile-main">
            <ExamsPanel userId={userId!} chosenExams={chosenExams} onChange={setChosenExams} />

            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
                <h2 className="font-display text-lg" style={{ color: 'var(--indigo)' }}>{streak} day streak</h2>
                {doneToday ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--leaf)', fontWeight: 600 }}>
                    <CheckCircle2 size={16} /> Today&apos;s quiz done
                  </span>
                ) : chosenExams.length === 0 ? (
                  <span style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>Pick an exam to start today&apos;s streak</span>
                ) : (
                  <div className="flex gap-2 flex-wrap">
                    {chosenExams.slice(0, 3).map((id) => {
                      const exam = exams.find((e) => e.id === id);
                      return (
                        <Link
                          key={id}
                          href={`/exams/${id}/quiz`}
                          style={{ fontSize: '12.5px', padding: '6px 12px', background: 'var(--marigold)', color: 'var(--ink)', textDecoration: 'none', fontWeight: 600 }}
                        >
                          Quiz: {exam?.name ?? id}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
              <StreakHeatmap completedDates={completedDates} />
            </div>

            <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', marginBottom: '24px' }}>
              {[
                { label: 'Quizzes', value: totalQuizzes },
                { label: 'Mock tests', value: totalMocks },
                { label: 'Forum posts', value: forumPosts },
                { label: 'Resources', value: resourcesShared },
              ].map((stat) => (
                <div key={stat.label} style={{ border: '1px solid var(--border)', padding: '12px', textAlign: 'center' }}>
                  <p className="font-display" style={{ fontSize: '20px', color: 'var(--indigo)' }}>{stat.value}</p>
                  <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{stat.label}</p>
                </div>
              ))}
            </div>

            <div>
              <h2 className="font-display text-lg mb-3" style={{ color: 'var(--indigo)' }}>Badges</h2>
              <EarnedBadges stats={{ streak, totalQuizzes, totalMocks, forumPosts, resourcesShared }} />
            </div>
          </div>
        </div>
      </main>

      {settingsOpen && userId && (
        <SettingsModal
          userId={userId}
          initial={{ displayName, bio, city, contactEmail, showCity, showEmail, onLeaderboard }}
          onClose={() => setSettingsOpen(false)}
          onSaved={(updates) => {
            if (updates.displayName !== undefined) setDisplayName(updates.displayName);
            if (updates.bio !== undefined) setBio(updates.bio);
            if (updates.city !== undefined) setCity(updates.city);
            if (updates.contactEmail !== undefined) setContactEmail(updates.contactEmail);
            if (updates.showCity !== undefined) setShowCity(updates.showCity);
            if (updates.showEmail !== undefined) setShowEmail(updates.showEmail);
            if (updates.onLeaderboard !== undefined) setOnLeaderboard(updates.onLeaderboard);
          }}
        />
      )}

      {bannerPickerOpen && userId && (
        <BannerPicker userId={userId} current={bannerId} onClose={() => setBannerPickerOpen(false)} onSelect={setBannerId} />
      )}
    </div>
  );
}
