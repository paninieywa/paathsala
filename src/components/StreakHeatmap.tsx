'use client';

export default function StreakHeatmap({ completedDates }: { completedDates: string[] }) {
  const dateSet = new Set(completedDates);
  const days: { date: string; done: boolean }[] = [];

  const today = new Date();
  for (let i = 179; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const iso = d.toISOString().slice(0, 10);
    days.push({ date: iso, done: dateSet.has(iso) });
  }

  const weeks: { date: string; done: boolean }[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  return (
    <div style={{ display: 'flex', gap: '3px', overflowX: 'auto', padding: '4px 0' }}>
      {weeks.map((week, wi) => (
        <div key={wi} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
          {week.map((day) => (
            <div
              key={day.date}
              title={`${day.date}${day.done ? ' — completed' : ''}`}
              style={{
                width: '11px',
                height: '11px',
                background: day.done ? 'var(--marigold)' : 'var(--border)',
                borderRadius: '2px',
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
