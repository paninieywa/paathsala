'use client';

import { LucideIcon } from 'lucide-react';

export default function BadgeIcon({ icon: Icon, color, size = 56 }: { icon: LucideIcon; color: string; size?: number }) {
  const gradientId = `grad-${color.replace('#', '')}`;

  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor={color} stopOpacity="0.6" />
        </linearGradient>
      </defs>
      <polygon
        points="50,3 90,25 90,75 50,97 10,75 10,25"
        fill={`url(#${gradientId})`}
        stroke={color}
        strokeWidth="2"
      />
      <foreignObject x="25" y="25" width="50" height="50">
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon size={size * 0.28} color="#fff" strokeWidth={2.2} />
        </div>
      </foreignObject>
    </svg>
  );
}
