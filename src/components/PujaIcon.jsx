/* =====================================================================
   PUJA ICON — Sri Satyanarayana Swamy: crowned Vishnu with four arms
   (chakra, shankha, gada, abhaya hand) in front of banana leaves —
   the traditional Satyanarayana Vratham setting.
   Solid gold (colour = currentColor). Self-contained: no imports.
   ===================================================================== */

const CUT = '#4a0d1c'; // thin separating lines (matches the dark circle behind the icon)

/** One banana leaf fanning out from the base point */
function Leaf({ a, len, w = 5.5 }) {
  return (
    <g transform={`translate(24 35) rotate(${a})`}>
      <path d={`M0 0C${-w} ${-len * 0.3} ${-w} ${-len * 0.75} 0 ${-len}C${w} ${-len * 0.75} ${w} ${-len * 0.3} 0 0Z`} fillOpacity=".55" />
      <path d={`M0 -1V${-(len - 3)}`} fill="none" stroke={CUT} strokeWidth=".7" />
    </g>
  );
}

export default function PujaIcon({ size = 28, className = '' }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} className={className} aria-hidden="true" fill="currentColor" stroke="none" strokeLinecap="round" strokeLinejoin="round">
      {/* banana leaves behind */}
      <Leaf a={-82} len={21} w={5} />
      <Leaf a={-52} len={26} />
      <Leaf a={-24} len={29} />
      <Leaf a={24} len={29} />
      <Leaf a={52} len={26} />
      <Leaf a={82} len={21} w={5} />

      {/* upper-left arm + Sudarshana chakra */}
      <path d="M18.5 23L12.5 16.5" fill="none" stroke="currentColor" strokeWidth="2.4" />
      <g transform="translate(11 11.5)">
        <circle r="4" stroke={CUT} strokeWidth=".7" />
        <circle r="2.4" fill="none" stroke={CUT} strokeWidth=".7" />
        <circle r=".9" fill={CUT} />
      </g>

      {/* upper-right arm + Shankha (conch) */}
      <path d="M29.5 23L35.5 16.5" fill="none" stroke="currentColor" strokeWidth="2.4" />
      <path d="M35 15.5C32.5 12.5 34 8.5 38 8.8C41.5 9 41.8 13 39 15.2C38 16 36.5 16.5 35 15.5Z" stroke={CUT} strokeWidth=".7" />
      <path d="M36 14C35.5 12 36.5 10.5 38.5 10.5" fill="none" stroke={CUT} strokeWidth=".7" />

      {/* lower-left arm: abhaya hand */}
      <path d="M18.5 27L13.5 31" fill="none" stroke="currentColor" strokeWidth="2.4" />
      <ellipse cx="12.5" cy="31.5" rx="2.3" ry="3" stroke={CUT} strokeWidth=".7" />

      {/* lower-right arm: gada (mace) */}
      <path d="M29.5 27L34.5 31" fill="none" stroke="currentColor" strokeWidth="2.4" />
      <path d="M36 40V25" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <ellipse cx="36" cy="22.5" rx="2.6" ry="3.4" stroke={CUT} strokeWidth=".7" />
      <path d="M33.6 22.5H38.4" fill="none" stroke={CUT} strokeWidth=".6" />

      {/* dhoti (lower body) */}
      <path d="M18 32H30L28 41.5L24 45L20 41.5Z" stroke={CUT} strokeWidth=".8" />
      <path d="M24 33V43" fill="none" stroke={CUT} strokeWidth=".6" />

      {/* torso */}
      <path d="M17.5 23C19.5 21 21.5 20.5 24 20.5S28.5 21 30.5 23L29.5 32H18.5Z" stroke={CUT} strokeWidth=".8" />
      {/* garland / necklace */}
      <path d="M20 23.2Q24 29.5 28 23.2" fill="none" stroke={CUT} strokeWidth=".9" />
      <path d="M21.5 27.5Q24 31 26.5 27.5" fill="none" stroke={CUT} strokeWidth=".7" />

      {/* face */}
      <ellipse cx="24" cy="16.5" rx="3.6" ry="4.1" stroke={CUT} strokeWidth=".8" />
      <path d="M24 13.3V15.6" fill="none" stroke={CUT} strokeWidth=".8" />
      <path d="M22.5 13.6Q24 15 25.5 13.6" fill="none" stroke={CUT} strokeWidth=".5" />

      {/* crown (kireetam) */}
      <path d="M19.8 12.3L20.6 8.5L22.3 10.2L24 3.8L25.7 10.2L27.4 8.5L28.2 12.3Z" stroke={CUT} strokeWidth=".7" />
      <rect x="19.5" y="11.6" width="9" height="1.6" rx=".5" stroke={CUT} strokeWidth=".5" />
    </svg>
  );
}