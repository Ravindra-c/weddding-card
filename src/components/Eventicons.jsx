/* =====================================================================
   EVENT ICONS — hand-drawn temple-gold line art for the event cards.
   Same look as Lotus / Marigold in Ornaments.jsx: fine gold strokes,
   soft gold fills, drawn on a 48×48 grid. Colour = currentColor.
   ===================================================================== */

function Base({ size = 28, className = '', children }) {
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

/** Small four-point sparkle */
const Spark = ({ x, y, s = 3 }) => (
  <path d={`M${x} ${y - s}L${x + s * 0.35} ${y - s * 0.35}L${x + s} ${y}L${x + s * 0.35} ${y + s * 0.35}L${x} ${y + s}L${x - s * 0.35} ${y + s * 0.35}L${x - s} ${y}L${x - s * 0.35} ${y - s * 0.35}Z`} fill="currentColor" stroke="none" />
);

/** Engagement — two interlinked rings with a diamond */
export function RingsIcon(props) {
  return (
    <Base {...props}>
      <circle cx="18" cy="31" r="11" />
      <circle cx="30" cy="31" r="11" />
      <circle cx="18" cy="31" r="8.2" opacity=".35" />
      <circle cx="30" cy="31" r="8.2" opacity=".35" />
      {/* diamond on the right ring */}
      <path d="M25.5 14.5L30 10l4.5 4.5L30 20z" fill="currentColor" fillOpacity=".28" />
      <path d="M25.5 14.5h9M30 10v10" opacity=".6" strokeWidth="1" />
      <Spark x={9} y={11} s={3} />
      <Spark x={41} y={22} s={2.2} />
    </Base>
  );
}

/** Haldi / Pasupu — brass bowl of turmeric with flowers */
export function HaldiIcon(props) {
  return (
    <Base {...props}>
      {/* turmeric mound */}
      <path d="M12 28C14 17 20 13 24 13s10 4 12 15z" fill="currentColor" fillOpacity=".3" />
      <path d="M17 25c2-5 5-7 7-7" opacity=".55" strokeWidth="1" />
      {/* brass bowl */}
      <path d="M8 28h32c0 9-6.5 14-16 14S8 37 8 28z" />
      <path d="M12 32h24" opacity=".5" strokeWidth="1" />
      <path d="M19 42h10" />
      {/* marigold + leaves resting on the mound */}
      <circle cx="24" cy="9" r="2.4" fill="currentColor" stroke="none" />
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <ellipse key={a} cx="24" cy="5.6" rx="1.5" ry="2.6" transform={`rotate(${a} 24 9)`} strokeWidth="1" />
      ))}
      <path d="M12 17c-3-1-5-3-5-6 3 0 5 2 5 6zM36 17c3-1 5-3 5-6-3 0-5 2-5 6z" fill="currentColor" fillOpacity=".25" strokeWidth="1.1" />
    </Base>
  );
}

/** Mehendi — paisley (mango) motif */
export function MehendiIcon(props) {
  return (
    <Base {...props}>
      <path d="M24 5c10 3 16 12 14 22-1.6 8-8 14-15 14-6 0-10-4.5-9-10 1-5 6-7 9-5 2.5 1.6 2 5-.5 6" />
      <path d="M24 12c6 2 9 8 8 14" opacity=".5" strokeWidth="1" />
      <circle cx="24" cy="20" r="2" fill="currentColor" stroke="none" />
      <circle cx="30" cy="30" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="18" cy="35" r="1.4" fill="currentColor" stroke="none" opacity=".7" />
      <Spark x={10} y={14} s={2.6} />
    </Base>
  );
}

/** Wedding — kalasam: pot, coconut and mango leaves */
export function KalasamIcon(props) {
  return (
    <Base {...props}>
      {/* mango leaves */}
      <path d="M24 17C14 16 8 11 8 5c7 0 14 4 16 12z" fill="currentColor" fillOpacity=".25" />
      <path d="M24 17C34 16 40 11 40 5c-7 0-14 4-16 12z" fill="currentColor" fillOpacity=".25" />
      <path d="M24 17C20 11 20 6 24 2c4 4 4 9 0 15z" fill="currentColor" fillOpacity=".25" />
      <path d="M24 16V4" opacity=".5" strokeWidth="1" />
      {/* coconut */}
      <circle cx="24" cy="13" r="4.4" fill="currentColor" fillOpacity=".5" />
      <path d="M22.5 12.4h.01M25.5 12.4h.01M24 14.6h.01" strokeWidth="1.6" />
      {/* pot */}
      <path d="M16 19h16" />
      <path d="M17.5 19c-1 2-1 3.5 0 4.5-6 3-8.5 8-7 12 1.5 4.5 7 6.5 13.5 6.5s12-2 13.5-6.5c1.5-4-1-9-7-12 1-1 1-2.5 0-4.5" />
      {/* decorative band */}
      <path d="M12 31c8 3 16 3 24 0" opacity=".6" strokeWidth="1" />
      <circle cx="24" cy="35.5" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="18" cy="35" r="1" fill="currentColor" stroke="none" opacity=".7" />
      <circle cx="30" cy="35" r="1" fill="currentColor" stroke="none" opacity=".7" />
    </Base>
  );
}

/** Reception — blooming lotus with sparkles */
export function LotusBloomIcon(props) {
  return (
    <Base {...props}>
      {/* outer petals */}
      <path d="M24 38C14 36 7 29 6 19c8 0 15 5 18 19z" fill="currentColor" fillOpacity=".18" />
      <path d="M24 38C34 36 41 29 42 19c-8 0-15 5-18 19z" fill="currentColor" fillOpacity=".18" />
      {/* inner petals */}
      <path d="M24 38C16 34 12 25 15 15c6 3 9 11 9 23z" fill="currentColor" fillOpacity=".28" />
      <path d="M24 38C32 34 36 25 33 15c-6 3-9 11-9 23z" fill="currentColor" fillOpacity=".28" />
      {/* centre petal */}
      <path d="M24 38C18 30 18 18 24 8c6 10 6 22 0 30z" fill="currentColor" fillOpacity=".4" />
      <path d="M24 14v22" opacity=".5" strokeWidth="1" />
      {/* water line */}
      <path d="M10 42h28" opacity=".7" />
      <path d="M16 45h16" opacity=".4" strokeWidth="1" />
      <Spark x={9} y={9} s={3} />
      <Spark x={40} y={8} s={2.4} />
    </Base>
  );
}

/** Heart (generic) — heart with a small bloom */
export function HeartBloomIcon(props) {
  return (
    <Base {...props}>
      <path d="M24 41C10 31 6 22 9 15c3-6 11-6 15 0 4-6 12-6 15 0 3 7-1 16-15 26z" fill="currentColor" fillOpacity=".25" />
      <path d="M24 33C16 27 14 22 15.5 18.5" opacity=".5" strokeWidth="1" />
      <Spark x={38} y={8} s={3} />
      <Spark x={8} y={7} s={2} />
    </Base>
  );
}