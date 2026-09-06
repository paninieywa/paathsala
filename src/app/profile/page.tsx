'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { getProfile, completeToday, getBadges } from '@/lib/streak';
import { uploadAvatar } from '@/lib/avatar';
import { bannerArtMap } from '@/components/BannerArt';
import StreakHeatmap from '@/components/StreakHeatmap';
import SettingsModal from '@/components/SettingsModal';
import BannerPicker from '@/components/BannerPicker';
import { Flame, Award, Share2, Camera, Settings, MapPin, Mail, Pencil } from 'lucide-react';

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

      const profile = await getProfile(session.user.id);
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
        setDoneToday(profile.last_completed === new Date().toISOString().slice(0, 10));
        if (profile.created_at) {
          setJoinedAt(new Date(profile.created_at).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }));
        }
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

  const badges = getBadges(streak);
  const initial = displayName.charAt(0).toUpperCase();
  const BannerArt = bannerArtMap[bannerId] ?? bannerArtMap.marigold;

  return (
    <div>
      <div style={{ width: '100%', height: 'clamp(120px, 24vw, 180px)', position: 'relative' }}>
        <BannerArt />
        <button
          onClick={() => setBannerPickerOpen(true)}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'rgba(0,0,0,0.4)',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#fff',
          }}
          title="Change banner"
        >
          <Pencil size={14} />
        </button>
      </div>

      <main style={{ maxWidth: '760px', margin: '0 auto', padding: 'clamp(16px, 4vw, 40px)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 'clamp(-48px, -8vw, -56px)', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ position: 'relative' }}>
            <div
              style={{
                width: 'clamp(72px, 18vw, 96px)',
                height: 'clamp(72px, 18vw, 96px)',
                borderRadius: '50%',
                background: avatarUrl ? `url(${avatarUrl}) center/cover` : 'var(--hero-bg)',
                color: 'var(--marigold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-space-grotesk)',
                fontSize: '30px',
                border: '4px solid var(--paper)',
              }}
            >
              {!avatarUrl && initial}
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              style={{
                position: 'absolute',
                bottom: 2,
                right: 2,
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                background: 'var(--marigold)',
                border: '2px solid var(--paper)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <Camera size={12} color="var(--ink)" />
            </button>
            <input ref={fileInputRef} type="file" accept="image/jpeg" onChange={handleAvatarChange} style={{ display: 'none' }} />
          </div>

          <button
            onClick={() => setSettingsOpen(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--indigo)', background: 'none', border: '1px solid var(--border)', padding: '8px 14px', cursor: 'pointer' }}
          >
            <Settings size={15} /> Settings
          </button>
        </div>

        {avatarError && <p style={{ color: 'var(--feedback-wrong-text)', fontSize: '12.5px', marginBottom: '12px' }}>{avatarError}</p>}

        <h1 className="font-display text-2xl" style={{ color: 'var(--indigo)', marginBottom: '4px' }}>
          {displayName}
        </h1>

        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '10px' }}>
          {joinedAt && <span style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>Student since {joinedAt}</span>}
          {showCity && city && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12.5px', color: 'var(--text-muted)' }}>
              <MapPin size={13} /> {city}
            </span>
          )}
          {showEmail && contactEmail && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12.5px', color: 'var(--text-muted)' }}>
              <Mail size={13} /> {contactEmail}
            </span>
          )}
        </div>

        {bio && <p style={{ color: 'var(--ink)', fontSize: '14px', marginBottom: '28px', maxWidth: '60ch' }}>{bio}</p>}

        <div style={{ border: '1px solid var(--border)', background: 'var(--surface)', padding: 'clamp(16px, 4vw, 24px)', marginBottom: '24px' }}>
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
            <code style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '2px 6px', wordBreak: 'break-all', fontSize: '12px' }}>
              /profile/{userId}
            </code>
          </div>
        )}
      </main>

      {settingsOpen && userId && (
        <SettingsModal
          userId={userId}
          initial={{ displayName, bio, city, contactEmail, showCity, showEmail, onLeaderboard, chosenExams }}
          onClose={() => setSettingsOpen(false)}
          onSaved={(updates) => {
            if (updates.displayName !== undefined) setDisplayName(updates.displayName);
            if (updates.bio !== undefined) setBio(updates.bio);
            if (updates.city !== undefined) setCity(updates.city);
            if (updates.contactEmail !== undefined) setContactEmail(updates.contactEmail);
            if (updates.showCity !== undefined) setShowCity(updates.showCity);
            if (updates.showEmail !== undefined) setShowEmail(updates.showEmail);
            if (updates.onLeaderboard !== undefined) setOnLeaderboard(updates.onLeaderboard);
            if (updates.chosenExams !== undefined) setChosenExams(updates.chosenExams);
          }}
        />
      )}

      {bannerPickerOpen && userId && (
        <BannerPicker
          userId={userId}
          current={bannerId}
          onClose={() => setBannerPickerOpen(false)}
          onSelect={setBannerId}
        />
      )}
    </div>
  );
}
