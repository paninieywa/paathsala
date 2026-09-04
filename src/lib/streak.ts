const KEY = 'paathsala_streak';

type StreakData = {
  count: number;
  lastCompleted: string | null; // ISO date, no time
};

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

function daysBetween(a: string, b: string): number {
  const d1 = new Date(a).getTime();
  const d2 = new Date(b).getTime();
  return Math.round((d2 - d1) / (1000 * 60 * 60 * 24));
}

export function getStreak(): StreakData {
  if (typeof window === 'undefined') return { count: 0, lastCompleted: null };
  const raw = localStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : { count: 0, lastCompleted: null };
}

export function completeToday(): StreakData {
  const data = getStreak();
  const today = todayStr();

  if (data.lastCompleted === today) return data; // already done today

  if (!data.lastCompleted) {
    data.count = 1;
  } else {
    const gap = daysBetween(data.lastCompleted, today);
    data.count = gap === 1 ? data.count + 1 : 1; // reset if streak broken
  }

  data.lastCompleted = today;
  localStorage.setItem(KEY, JSON.stringify(data));
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
