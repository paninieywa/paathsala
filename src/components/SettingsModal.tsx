'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import ToggleSwitch from './ToggleSwitch';

type Props = {
  userId: string;
  initial: {
    displayName: string;
    bio: string;
    city: string;
    contactEmail: string;
    showCity: boolean;
    showEmail: boolean;
    onLeaderboard: boolean;
  };
  onClose: () => void;
  onSaved: (updates: Partial<Props['initial']>) => void;
};

export default function SettingsModal({ userId, initial, onClose, onSaved }: Props) {
  const [displayName, setDisplayName] = useState(initial.displayName);
  const [bio, setBio] = useState(initial.bio);
  const [city, setCity] = useState(initial.city);
  const [contactEmail, setContactEmail] = useState(initial.contactEmail);
  const [showCity, setShowCity] = useState(initial.showCity);
  const [showEmail, setShowEmail] = useState(initial.showEmail);
  const [onLeaderboard, setOnLeaderboard] = useState(initial.onLeaderboard);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  async function handleSave() {
    setSaving(true);
    await supabase
      .from('profiles')
      .update({
        display_name: displayName.trim() || initial.displayName,
        bio,
        city,
        contact_email: contactEmail,
        show_city: showCity,
        show_email: showEmail,
        show_on_leaderboard: onLeaderboard,
      })
      .eq('id', userId);
    setSaving(false);
    onSaved({ displayName: displayName.trim() || initial.displayName, bio, city, contactEmail, showCity, showEmail, onLeaderboard });
    onClose();
  }

  return (
    <div
      onClick={onClose}
      className="hide-scrollbar"
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '20px' }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="hide-scrollbar"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)', maxWidth: '480px', width: '100%', maxHeight: '85vh', overflowY: 'auto', padding: '28px', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 className="font-display text-xl" style={{ color: 'var(--indigo)' }}>Settings</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
            <X size={20} />
          </button>
        </div>

        <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>Display name</label>
        <input
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          style={{ width: '100%', padding: '8px', border: '1px solid var(--border)', background: 'var(--paper)', color: 'var(--ink)', marginBottom: '16px' }}
        />

        <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>Bio</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={3}
          style={{ width: '100%', padding: '8px', border: '1px solid var(--border)', background: 'var(--paper)', color: 'var(--ink)', marginBottom: '16px', fontFamily: 'inherit' }}
        />

        <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>City</label>
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{ width: '100%', padding: '8px', border: '1px solid var(--border)', background: 'var(--paper)', color: 'var(--ink)', marginBottom: '10px' }}
        />
        <ToggleSwitch checked={showCity} onChange={setShowCity} label="City visibility" />

        <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>Contact email</label>
        <input
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
          style={{ width: '100%', padding: '8px', border: '1px solid var(--border)', background: 'var(--paper)', color: 'var(--ink)', marginBottom: '10px' }}
        />
        <ToggleSwitch checked={showEmail} onChange={setShowEmail} label="Email visibility" />

        <ToggleSwitch checked={onLeaderboard} onChange={setOnLeaderboard} label="Leaderboard visibility" />

        <button
          onClick={handleSave}
          disabled={saving}
          style={{ width: '100%', padding: '10px', background: 'var(--marigold)', color: 'var(--ink)', border: 'none', fontWeight: 600, marginTop: '20px' }}
        >
          {saving ? 'Saving...' : 'Save changes'}
        </button>
      </div>
    </div>
  );
}
