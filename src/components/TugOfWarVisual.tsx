'use client';

export default function TugOfWarVisual({
  player1Progress,
  player2Progress,
  totalQuestions,
  player1Name,
  player2Name,
}: {
  player1Progress: number;
  player2Progress: number;
  totalQuestions: number;
  player1Name: string;
  player2Name: string;
}) {
  const diff = player1Progress - player2Progress;
  const maxDiff = totalQuestions;
  const pull = Math.max(-1, Math.min(1, diff / maxDiff));
  const markerX = 300 + pull * 200;

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '13px' }}>
        <span style={{ color: 'var(--marigold)', fontWeight: 600 }}>{player1Name} — {player1Progress}/{totalQuestions}</span>
        <span style={{ color: 'var(--indigo)', fontWeight: 600 }}>{player2Name} — {player2Progress}/{totalQuestions}</span>
      </div>
      <svg viewBox="0 0 600 100" style={{ width: '100%', height: '90px' }}>
        <line x1="50" y1="50" x2="550" y2="50" stroke="var(--border)" strokeWidth="6" />
        <line x1="300" y1="20" x2="300" y2="80" stroke="var(--text-muted)" strokeWidth="2" strokeDasharray="4" />
        <circle cx={markerX} cy="50" r="16" fill={pull >= 0 ? 'var(--marigold)' : 'var(--indigo)'} />
        <text x={markerX} y="55" textAnchor="middle" fontSize="14" fill="var(--ink)" fontWeight="bold">●</text>
        <text x="50" y="30" fontSize="20">🧑</text>
        <text x="530" y="30" fontSize="20">🧑</text>
      </svg>
    </div>
  );
}
