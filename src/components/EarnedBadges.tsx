'use client';

import { getEarnedBadges, BadgeStats } from '@/data/badges';
import BadgeIcon from './BadgeIcon';

export default function EarnedBadges({ stats }: { stats: BadgeStats }) {
  const earned = getEarnedBadges(stats);

  if (earned.length === 0) {
    return (
      <p style={{ fontSize: '13.5px', color: 'var(--text-muted)' }}>
        No badges yet — complete quizzes, mock tests, or help others in the forum to earn your first one.
      </p>
    );
  }

  return (
    <div className="flex flex-wrap gap-4">
      {earned.map((b) => (
        <div key={b.id} title={b.description} style={{ textAlign: 'center', width: '84px' }}>
          <BadgeIcon icon={b.icon} color={b.color} size={64} />
          <p style={{ fontSize: '11px', fontWeight: 600, color: 'var(--ink)', marginTop: '6px', lineHeight: 1.3 }}>{b.title}</p>
        </div>
      ))}
    </div>
  );
}
