'use client';

export default function StreakHeatmap({ completedDates }: { completedDates: string[] }) {
  const dateSet = new Set(completedDates);
  const today = new Date();
  const totalDays = 360;

  const days: { date: string; done: boolean; isFirstOfMonth: boolean; monthLabel: string; weekday: number }[] = [];
  for (let i = totalDays - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const iso = d.toISOString().slice(0, 10);
    days.push({
      date: iso,
      done: dateSet.has(iso),
      isFirstOfMonth: d.getDate() === 1,
      monthLabel: d.toLocaleDateString('en-US', { month: 'short' }),
      weekday: d.getDay(),
    });
  }

  const leadingEmpty = days[0].weekday;
  const padded = [...Array(leadingEmpty).fill(null), ...days];

  const weeks: (typeof days[number] | null)[][] = [];
  for (let i = 0; i < padded.length; i += 7) {
    weeks.push(padded.slice(i, i + 7));
  }

  const weekdayLabels = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

  return (
    <>
      <div
        style={{
          overflowX: 'auto',
          border: '1px solid var(--border)',
          borderRadius: '6px',
          padding: '16px',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
        className="hide-scrollbar"
      >
        <div style={{ display: 'flex' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', marginRight: '8px', paddingTop: '18px' }}>
            {weekdayLabels.map((label, i) => (
              <div key={i} style={{ height: '11px', fontSize: '10px', color: 'var(--text-muted)', lineHeight: '11px' }}>
                {label}
              </div>
            ))}
          </div>

          <div>
            <div style={{ display: 'flex', gap: '3px', marginBottom: '4px' }}>
              {weeks.map((week, wi) => {
                const monthStart = week.find((d) => d && d.isFirstOfMonth);
                return (
                  <div key={wi} style={{ width: '11px', fontSize: '10px', color: 'var(--text-muted)' }}>
                    {monthStart ? (monthStart as NonNullable<typeof monthStart>).monthLabel : ''}
                  </div>
                );
              })}
            </div>
            <div style={{ display: 'flex', gap: '3px' }}>
              {weeks.map((week, wi) => (
                <div key={wi} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  {week.map((day, di) =>
                    day ? (
                      <div
                        key={day.date}
                        title={`${day.date}${day.done ? ' — completed' : ''}`}
                        style={{
                          width: '11px',
                          height: '11px',
                          borderRadius: '2px',
                          background: day.done ? 'var(--marigold)' : 'var(--border)',
                        }}
                      />
                    ) : (
                      <div key={`empty-${wi}-${di}`} style={{ width: '11px', height: '11px' }} />
                    )
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '4px', marginTop: '10px' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Less</span>
          <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: 'var(--border)' }} />
          <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: 'var(--marigold)', opacity: 0.4 }} />
          <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: 'var(--marigold)', opacity: 0.7 }} />
          <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: 'var(--marigold)' }} />
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>More</span>
        </div>
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
}