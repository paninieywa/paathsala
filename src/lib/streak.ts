import { supabase } from './supabase';

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

function daysBetween(a: string, b: string): number {
  const d1 = new Date(a).getTime();
  const d2 = new Date(b).getTime();
  return Math.round((d2 - d1) / (1000 * 60 * 60 * 24));
}

export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  if (error) {
    console.error('getProfile error:', {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
    });
    return null;
  }
  return data;
}

export async function completeToday(userId: string) {
  const profile = await getProfile(userId);
  if (!profile) {
    console.error('completeToday: no profile found for', userId);
    return null;
  }

  const today = todayStr();
  const completedDates: string[] = profile.completed_dates ?? [];
  const alreadyRecordedToday = completedDates.includes(today);

  if (profile.last_completed === today && alreadyRecordedToday) {
    return profile;
  }

  let newCount = profile.streak_count;
  if (profile.last_completed !== today) {
    if (!profile.last_completed) {
      newCount = 1;
    } else {
      const gap = daysBetween(profile.last_completed, today);
      newCount = gap === 1 ? profile.streak_count + 1 : 1;
    }
  }

  const updatedDates = alreadyRecordedToday ? completedDates : [...completedDates, today];

  const { data, error } = await supabase
    .from('profiles')
    .update({ streak_count: newCount, last_completed: today, completed_dates: updatedDates })
    .eq('id', userId)
    .select()
    .single();

  if (error) {
    console.error('completeToday update error:', {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
    });
    return null;
  }
  return data;
}

export function getBadges(streakCount: number): string[] {
  const badges: string[] = [];
  if (streakCount >= 3) badges.push('3-Day Starter');
  if (streakCount >= 7) badges.push('7-Day Habit');
  if (streakCount >= 30) badges.push('30-Day Scholar');
  if (streakCount >= 100) badges.push('100-Day Legend');
  return badges;
}
