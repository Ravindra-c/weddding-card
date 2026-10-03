/* A single-line-weight mandala. Use currentColor (set text-gold etc. on parent). */

const R = (n) => Array.from({ length: n }, (_, i) => (360 / n) * i);

export default function MandalaBackground({ className = '', spin = 'cw' }) {
  const spinClass = spin === 'cw' ? 'animate-spinSlow' : spin === 'ccw' ? 'animate-spinReverse' : '';
  return (
    <svg viewBox="-200 -200 400 400" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth=".8">
      <g className={spinClass} style={{ transformOrigin: 'center', transformBox: 'fill-box' }}>
        {[196, 188, 172, 122, 72, 30].map((r) => <circle key={r} r={r} opacity={r === 188 ? 0.45 : 0.8} />)}
        {R(36).map((a) => <circle key={`d${a}`} cx="0" cy="-180" r="2.6" fill="currentColor" transform={`rotate(${a})`} />)}
        {R(24).map((a) => <ellipse key={`a${a}`} cx="0" cy="-148" rx="11" ry="28" transform={`rotate(${a})`} />)}
        {R(12).map((a) => <ellipse key={`b${a}`} cx="0" cy="-98" rx="14" ry="30" transform={`rotate(${a + 15})`} opacity=".9" />)}
        {R(8).map((a) => <path key={`c${a}`} d="M0-64Q11-44 0-22Q-11-44 0-64Z" transform={`rotate(${a})`} />)}
        {R(16).map((a) => <path key={`l${a}`} d="M0-125V-170" transform={`rotate(${a + 11.25})`} opacity=".4" />)}
      </g>
    </svg>
  );
}
