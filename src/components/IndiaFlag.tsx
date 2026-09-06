export default function IndiaFlag({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size * 0.67}
      viewBox="0 0 30 20"
      style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: '4px' }}
    >
      <rect width="30" height="6.67" y="0" fill="#FF9933" />
      <rect width="30" height="6.67" y="6.67" fill="#FFFFFF" />
      <rect width="30" height="6.67" y="13.33" fill="#138808" />
      <circle cx="15" cy="10" r="2.2" fill="none" stroke="#000080" strokeWidth="0.3" />
      <circle cx="15" cy="10" r="0.3" fill="#000080" />
    </svg>
  );
}
