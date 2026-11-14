/* =====================================================================
   PUJA ICON — Satyanarayana Swamy Vratham: Vishnu's Sudarshana Chakra
   and Shankha (conch). Same temple-gold line-art style as the other
   event icons (colour = currentColor). Self-contained: no imports.
   ===================================================================== */

const Spark = ({ x, y, s = 3 }) => (
  <path d={`M${x} ${y - s}L${x + s * 0.35} ${y - s * 0.35}L${x + s} ${y}L${x + s * 0.35} ${y + s * 0.35}L${x} ${y + s}L${x - s * 0.35} ${y + s * 0.35}L${x - s} ${y}L${x - s * 0.35} ${y - s * 0.35}Z`} fill="currentColor" stroke="none" />
);

/** Sudarshana Chakra: flame-edged wheel with spokes */
function Chakra({ cx, cy, r }) {
  const teeth = Array.from({ length: 12 }, (_, k) => {
    const a = (k * 30 * Math.PI) / 180;
    const d = (5 * Math.PI) / 180;
    const p = (ang, rad) => `${(cx + rad * Math.cos(ang)).toFixed(2)} ${(cy + rad * Math.sin(ang)).toFixed(2)}`;
    return `M${p(a - d, r)}L${p(a, r + 3.2)}L${p(a + d, r)}`;
  }).join('');
  const spokes = Array.from({ length: 8 }, (_, k) => {
    const a = (k * 45 * Math.PI) / 180;
    return `M${(cx + 2.2 * Math.cos(a)).toFixed(2)} ${(cy + 2.2 * Math.sin(a)).toFixed(2)}L${(cx + (r - 3.2) * Math.cos(a)).toFixed(2)} ${(cy + (r - 3.2) * Math.sin(a)).toFixed(2)}`;
  }).join('');
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="currentColor" fillOpacity=".15" />
      <path d={teeth} fill="currentColor" fillOpacity=".5" strokeWidth="1" />
      <circle cx={cx} cy={cy} r={r - 3.2} strokeWidth="1" opacity=".7" />
      <path d={spokes} strokeWidth="1" opacity=".8" />
      <circle cx={cx} cy={cy} r="2.2" fill="currentColor" />
    </g>
  );
}

export default function PujaIcon({ size = 28, className = '' }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <Chakra cx={15} cy={27} r={10.5} />

      {/* Shankha (conch) */}
      <path d="M33 9C40 9 45 15 44 23C43 31 37 37 30 38L26 42L27 36C23 33 22 28 24 23C26 17 28 9 33 9Z" fill="currentColor" fillOpacity=".22" />
      <path d="M31.5 12C29.5 18 29.5 27 33 35" strokeWidth="1" opacity=".7" />
      <path d="M35.5 11.5C33.5 18 33.5 27 37.5 35" strokeWidth="1" opacity=".7" />
      <path d="M39.5 13.5C38.5 19 39.5 26 42 31" strokeWidth="1" opacity=".7" />
      <path d="M31 9C31 5.5 35.5 5.5 35.5 9" />

      <Spark x={22} y={8} s={2.6} />
      <Spark x={6} y={11} s={2.2} />
    </svg>
  );
}