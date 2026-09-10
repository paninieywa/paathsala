import { supabase } from './supabase';
import { RealtimeChannel } from '@supabase/supabase-js';

export function trackArenaPresence(userId: string, userName: string, onCountChange: (count: number) => void): RealtimeChannel {
  const channel = supabase.channel('arena-lobby', {
    config: { presence: { key: userId } },
  });

  channel
    .on('presence', { event: 'sync' }, () => {
      const state = channel.presenceState();
      onCountChange(Object.keys(state).length);
    })
    .subscribe(async (status) => {
      if (status === 'SUBSCRIBED') {
        await channel.track({ userName, online_at: new Date().toISOString() });
      }
    });

  return channel;
}
