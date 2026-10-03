import { useId } from 'react';

/** A small brass diya with a softly flickering flame. */
export default function Diya({ className = '' }) {
  const id = useId().replace(/:/g, '');
  return (
    <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
      <defs>
        <radialGradient id={`g${id}`}>
          <stop offset="0" stopColor="#FFD27A" stopOpacity=".85" />
          <stop offset="1" stopColor="#FFD27A" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`f${id}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#FFF3C4" />
          <stop offset=".5" stopColor="#FFB63D" />
          <stop offset="1" stopColor="#E5701F" />
        </linearGradient>
        <linearGradient id={`b${id}`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#F0D78A" />
          <stop offset="1" stopColor="#9C7A1E" />
        </linearGradient>
      </defs>
      <circle cx="40" cy="30" r="28" fill={`url(#g${id})`} className="animate-glowPulse" />
      <g className="animate-flame" style={{ transformOrigin: '40px 44px' }}>
        <path d="M40 12C48 24 50 32 40 44C30 32 32 24 40 12Z" fill={`url(#f${id})`} />
        <path d="M40 26C44 32 44 37 40 43C36 37 36 32 40 26Z" fill="#FFF8DC" opacity=".9" />
      </g>
      <path d="M12 46Q40 78 68 46Z" fill={`url(#b${id})`} />
      <path d="M12 46H68" stroke="#FFE9A8" strokeWidth="1.5" />
      <path d="M30 66h20" stroke="#9C7A1E" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
