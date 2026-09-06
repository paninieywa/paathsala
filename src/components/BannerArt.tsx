'use client';

function Base({ children, bg }: { children: React.ReactNode; bg: string }) {
  return (
    <svg viewBox="0 0 1200 240" preserveAspectRatio="xMidYMid slice" style={{ width: '100%', height: '100%', display: 'block' }}>
      <rect width="1200" height="240" fill={bg} />
      {children}
    </svg>
  );
}

export function MarigoldBloom() {
  return (
    <Base bg="#14231F">
      <polygon points="150,40 260,100 220,190 90,190 50,100" fill="#E5A13B" opacity="0.9" />
      <polygon points="950,10 1080,70 1050,180 900,190 850,80" fill="#E5A13B" opacity="0.5" />
      <circle cx="600" cy="120" r="70" fill="#C7822A" opacity="0.35" />
      <circle cx="1150" cy="200" r="40" fill="#E5A13B" opacity="0.6" />
    </Base>
  );
}

export function IndigoPeaks() {
  return (
    <Base bg="#F6F1E3">
      <polygon points="0,240 200,60 400,240" fill="#223A5E" opacity="0.85" />
      <polygon points="300,240 550,20 800,240" fill="#223A5E" opacity="0.55" />
      <polygon points="700,240 950,90 1200,240" fill="#223A5E" opacity="0.35" />
    </Base>
  );
}

export function KumkumWaves() {
  return (
    <Base bg="#3D1418">
      <path d="M0,140 Q150,100 300,140 T600,140 T900,140 T1200,140 V240 H0 Z" fill="#A6303A" opacity="0.8" />
      <path d="M0,180 Q150,150 300,180 T600,180 T900,180 T1200,180 V240 H0 Z" fill="#E5A13B" opacity="0.5" />
      <circle cx="1050" cy="60" r="30" fill="#E5A13B" opacity="0.7" />
    </Base>
  );
}

export function LeafGrove() {
  return (
    <Base bg="#0E1F17">
      <ellipse cx="180" cy="120" rx="140" ry="90" fill="#2F7A56" opacity="0.6" />
      <ellipse cx="500" cy="80" rx="100" ry="70" fill="#2F7A56" opacity="0.4" />
      <ellipse cx="900" cy="150" rx="160" ry="100" fill="#3A9268" opacity="0.5" />
      <circle cx="1100" cy="50" r="24" fill="#E5A13B" opacity="0.8" />
    </Base>
  );
}

export function Dusk() {
  return (
    <Base bg="#1B1430">
      <circle cx="1000" cy="70" r="60" fill="#E5A13B" opacity="0.9" />
      <polygon points="0,240 300,110 600,240" fill="#223A5E" opacity="0.7" />
      <polygon points="400,240 750,90 1100,240" fill="#A6303A" opacity="0.5" />
    </Base>
  );
}

export const bannerArtMap: Record<string, React.ComponentType> = {
  marigold: MarigoldBloom,
  indigo: IndigoPeaks,
  kumkum: KumkumWaves,
  leaf: LeafGrove,
  dusk: Dusk,
};
