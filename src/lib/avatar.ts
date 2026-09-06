import { supabase } from './supabase';

const MAX_SIZE = 500 * 1024; // 500KB

export async function uploadAvatar(userId: string, file: File): Promise<{ url?: string; error?: string }> {
  if (file.type !== 'image/jpeg') {
    return { error: 'Only JPG images are allowed.' };
  }
  if (file.size > MAX_SIZE) {
    return { error: 'Image must be under 500KB.' };
  }

  const path = `${userId}/avatar.jpg`;
  const { error: uploadError } = await supabase.storage
    .from('avatars')
    .upload(path, file, { upsert: true, contentType: 'image/jpeg' });

  if (uploadError) {
    return { error: uploadError.message };
  }

  const { data } = supabase.storage.from('avatars').getPublicUrl(path);
  const cacheBustedUrl = `${data.publicUrl}?t=${Date.now()}`;

  await supabase.from('profiles').update({ avatar_url: cacheBustedUrl }).eq('id', userId);

  return { url: cacheBustedUrl };
}
