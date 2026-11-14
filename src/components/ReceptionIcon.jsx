const CUT = '#4a0d1c'; // colour of the thin "cut-out" lines (matches the dark circle behind the icon)

export default function PujaIcon({ size = 28, className = '' }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} className={className} aria-hidden="true" fill="currentColor" stroke="none">
      {/* finial */}
      <path d="M24 1.2 25.3 7.5H22.7Z" />

      {/* dome with ribs */}
      <path d="M8.5 19.5C8.5 12 15.5 7.5 24 7.5S39.5 12 39.5 19.5Z" />
      <g fill="none" stroke={CUT} strokeWidth="1" strokeLinecap="round">
        <path d="M24 8V19" />
        <path d="M24 8C19.5 10 17.5 14 17.5 19" />
        <path d="M24 8C28.5 10 30.5 14 30.5 19" />
        <path d="M24 8C16 9.5 12.5 14 12.5 19" />
        <path d="M24 8C32 9.5 35.5 14 35.5 19" />
      </g>

      {/* cornice */}
      <rect x="6.5" y="19.8" width="35" height="1.8" rx=".6" />
      <rect x="8.5" y="22.2" width="31" height="1" rx=".5" />

      {/* flower garland under the dome */}
      <g>
        {[[17, 25.2], [20.5, 26.6], [24, 27], [27.5, 26.6], [31, 25.2]].map(([x, y]) => (
          <g key={x}>
            <circle cx={x} cy={y} r="2" />
            <circle cx={x} cy={y} r=".7" fill={CUT} />
          </g>
        ))}
      </g>

      {/* pillars */}
      <rect x="10.5" y="23.5" width="2.6" height="17" />
      <rect x="34.9" y="23.5" width="2.6" height="17" />
      <rect x="14.8" y="23.5" width="1.5" height="17" opacity=".45" />
      <rect x="31.7" y="23.5" width="1.5" height="17" opacity=".45" />

      {/* platform */}
      <rect x="8" y="40.5" width="32" height="1.8" rx=".5" />
      <rect x="6" y="43" width="36" height="2.2" rx=".6" />

      {/* bride (left): head, veil, gown */}
      <circle cx="20.5" cy="29.5" r="2.2" />
      <path d="M18.3 29.8C18 32 18.2 34 18.8 35.5L19.8 31.5Z" opacity=".75" />
      <path d="M20.5 32.2C19 33.2 18.7 36 16.8 40.5H24.8C23.6 37.2 23.6 34.2 22.7 32.2Z" />

      {/* groom (right): head and body */}
      <circle cx="28.8" cy="28.5" r="2.2" />
      <path d="M27.2 31.2H30.6V40.5H28.9V35.5H28.8V40.5H27.2Z" />
      <rect x="26.8" y="30.8" width="3.8" height="5" rx="1" />

      {/* joined hands */}
      <path d="M22.5 33.6L27 33.3 27 34.5 22.6 34.8Z" />
    </svg>
  );
}

