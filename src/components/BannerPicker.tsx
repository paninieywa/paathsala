'use client';

import { X } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { banners } from '@/data/banners';
import { bannerArtMap } from './BannerArt';

export default function BannerPicker({
  userId,
  current,
  onClose,
  onSelect,
}: {
  userId: string;
  current: string;
  onClose: () => void;
  onSelect: (id: string) => void;
}) {
  async function choose(id: string) {
    await supabase.from('profiles').update({ banner_id: id }).eq('id', userId);
    onSelect(id);
    onClose();
  }

  return (
    <div
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '20px' }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ background: 'var(--surface)', border: '1px solid var(--border)', maxWidth: '520px', width: '100%', padding: '24px' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 className="font-display text-lg" style={{ color: 'var(--indigo)' }}>Choose a banner</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
            <X size={18} />
          </button>
        </div>
        <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))' }}>
          {banners.map((b) => {
            const Art = bannerArtMap[b.id];
            return (
              <button
                key={b.id}
                onClick={() => choose(b.id)}
                style={{
                  border: current === b.id ? '2px solid var(--marigold)' : '2px solid transparent',
                  padding: 0,
                  cursor: 'pointer',
                  overflow: 'hidden',
                  height: '70px',
                  background: 'none',
                }}
              >
                <Art />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
