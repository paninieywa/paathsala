import { describe, it, expect } from 'vitest';
import { getBadges } from '../streak';

describe('getBadges', () => {
  it('returns no badges below 3 days', () => {
    expect(getBadges(0)).toEqual([]);
    expect(getBadges(2)).toEqual([]);
  });

  it('awards the 3-day badge at exactly 3', () => {
    expect(getBadges(3)).toEqual(['3-Day Starter']);
  });

  it('stacks badges as streak grows', () => {
    expect(getBadges(7)).toEqual(['3-Day Starter', '7-Day Habit']);
    expect(getBadges(30)).toEqual(['3-Day Starter', '7-Day Habit', '30-Day Scholar']);
  });

  it('awards all four badges at 100+ days', () => {
    expect(getBadges(100)).toEqual([
      '3-Day Starter',
      '7-Day Habit',
      '30-Day Scholar',
      '100-Day Legend',
    ]);
  });
});
