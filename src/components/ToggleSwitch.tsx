'use client';

export default function ToggleSwitch({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  label: string;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
      <span style={{ fontSize: '13.5px', color: 'var(--ink)' }}>{label}</span>
      <button
        onClick={() => onChange(!checked)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        <span style={{ fontSize: '11.5px', color: checked ? 'var(--leaf)' : 'var(--text-muted)', fontWeight: 600, minWidth: '40px', textAlign: 'right' }}>
          {checked ? 'Public' : 'Private'}
        </span>
        <span
          style={{
            width: '38px',
            height: '20px',
            borderRadius: '10px',
            background: checked ? 'var(--leaf)' : 'var(--border)',
            position: 'relative',
            transition: 'background 0.15s ease',
          }}
        >
          <span
            style={{
              position: 'absolute',
              top: '2px',
              left: checked ? '20px' : '2px',
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              background: '#fff',
              transition: 'left 0.15s ease',
            }}
          />
        </span>
      </button>
    </div>
  );
}
