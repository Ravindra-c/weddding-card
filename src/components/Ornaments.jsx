import { useId } from 'react';

/* Small reusable SVG ornaments in temple-gold. All decorative → aria-hidden. */

export function Lotus({ className = '', petals = 8 }) {
  const angles = Array.from({ length: petals }, (_, i) => (360 / petals) * i);
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.2">
      {angles.map((a) => (
        <ellipse key={a} cx="32" cy="17" rx="6" ry="14" transform={`rotate(${a} 32 32)`} opacity=".85" />
      ))}
      <circle cx="32" cy="32" r="4" fill="currentColor" />
    </svg>
  );
}

export function Marigold({ className = '' }) {
  const outer = Array.from({ length: 14 }, (_, i) => (360 / 14) * i);
  const inner = Array.from({ length: 10 }, (_, i) => (360 / 10) * i + 12);
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      {outer.map((a) => <ellipse key={`o${a}`} cx="32" cy="14" rx="5" ry="12" fill="#E58A1F" opacity=".92" transform={`rotate(${a} 32 32)`} />)}
      {inner.map((a) => <ellipse key={`i${a}`} cx="32" cy="20" rx="4" ry="9" fill="#F2B544" transform={`rotate(${a} 32 32)`} />)}
      <circle cx="32" cy="32" r="5" fill="#8A4B0F" />
    </svg>
  );
}

export function Jasmine({ className = '' }) {
  const a = [0, 72, 144, 216, 288];
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      {a.map((r) => <ellipse key={r} cx="20" cy="9" rx="5.5" ry="9" fill="#FFFDF5" stroke="#E8D9A8" strokeWidth=".6" transform={`rotate(${r} 20 20)`} />)}
      <circle cx="20" cy="20" r="3" fill="#D4AF37" />
    </svg>
  );
}

export function GoldDivider({ className = '' }) {
  return (
    <svg viewBox="0 0 260 24" className={`mx-auto h-5 w-56 text-gold ${className}`} aria-hidden="true" fill="none" stroke="currentColor">
      <path d="M0 12H100" strokeWidth="1" />
      <path d="M160 12H260" strokeWidth="1" />
      <path d="M100 12c8-9 14-9 20 0m20 0c-6 9-12 9-20 0" strokeWidth="1" opacity=".7" />
      <path d="M130 3l7 9-7 9-7-9z" fill="currentColor" stroke="none" />
      <circle cx="108" cy="12" r="2" fill="currentColor" stroke="none" />
      <circle cx="152" cy="12" r="2" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Corner flourish for frames. Rotate with Tailwind (rotate-90, rotate-180, -rotate-90). */
export function Corner({ className = '' }) {
  return (
    <svg viewBox="0 0 48 48" className={`h-10 w-10 text-gold sm:h-14 sm:w-14 ${className}`} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M2 46V12C2 6 6 2 12 2h34" />
      <path d="M9 46V16c0-4 3-7 7-7h30" opacity=".55" />
      <path d="M2 2l9 9" opacity=".6" />
      <circle cx="12" cy="12" r="2.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function GoldFrame({ children, className = '', cornerClass = '' }) {
  return (
    <div className={`gold-frame ${className}`}>
      <Corner className={`absolute -left-px -top-px ${cornerClass}`} />
      <Corner className={`absolute -right-px -top-px rotate-90 ${cornerClass}`} />
      <Corner className={`absolute -bottom-px -right-px rotate-180 ${cornerClass}`} />
      <Corner className={`absolute -bottom-px -left-px -rotate-90 ${cornerClass}`} />
      {children}
    </div>
  );
}

/** Mango-leaf & marigold toran (garland) that hangs from the top edge. */
export function Toran({ className = '' }) {
  const id = useId().replace(/:/g, '');
  const W = 1200;
  const scallop = 300;
  const count = 24;
  const sag = (x) => 6 + 20 * Math.sin(Math.PI * ((x % scallop) / scallop));
  const leaves = Array.from({ length: count }, (_, i) => {
    const x = (i + 0.5) * (W / count);
    const frac = (x % scallop) / scallop;
    const slope = 20 * Math.PI * Math.cos(Math.PI * frac) / scallop;
    return { x, y: sag(x), rot: Math.atan(slope) * (180 / Math.PI) * 0.6 };
  });
  const line = Array.from({ length: 61 }, (_, i) => {
    const x = (W / 60) * i;
    return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${sag(x === W ? W - 0.01 : x).toFixed(1)}`;
  }).join(' ');
  const joints = [0, 1, 2, 3, 4].map((i) => i * scallop);
  return (
    <svg viewBox={`0 0 ${W} 72`} preserveAspectRatio="xMidYMin slice" className={`pointer-events-none w-full ${className}`} aria-hidden="true">
      <defs>
        <linearGradient id={`leaf${id}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#8A9A45" />
          <stop offset="1" stopColor="#4C5C22" />
        </linearGradient>
      </defs>
      <path d={line} fill="none" stroke="#D4AF37" strokeWidth="1.5" opacity=".8" />
      {leaves.map((l, i) => (
        <g key={i} transform={`translate(${l.x} ${l.y}) rotate(${l.rot})`}>
          <path d="M0 0C-9 12-8 28 0 44C8 28 9 12 0 0Z" fill={`url(#leaf${id})`} stroke="#D4AF37" strokeWidth=".7" strokeOpacity=".6" />
          <path d="M0 3V40" stroke="#D4AF37" strokeWidth=".5" opacity=".55" />
        </g>
      ))}
      {joints.map((x) => (
        <g key={x} transform={`translate(${x} ${sag(x === W ? W - 0.01 : x)})`}>
          <circle r="11" fill="#E58A1F" /><circle r="7" fill="#F2B544" /><circle r="3" fill="#8A4B0F" />
        </g>
      ))}
    </svg>
  );
}
