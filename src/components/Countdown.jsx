import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useLang } from '../context/LanguageContext';
import { weddingData } from '../data/weddingData';
import Reveal from './Reveal';

const DAY = 86400000;

function useNow() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

function Unit({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <div className="gold-frame flex h-[4.5rem] w-[4.5rem] items-center justify-center overflow-hidden rounded-xl bg-gradient-to-b from-maroon to-maroon-deep shadow-[0_14px_30px_-14px_rgba(53,8,18,.8)] min-[400px]:h-20 min-[400px]:w-20 sm:h-28 sm:w-28">
        <motion.span
          key={value}
          initial={{ y: -12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.35 }}
          className="font-display text-3xl font-semibold tabular-nums text-gold-light sm:text-5xl"
        >
          {String(value).padStart(2, '0')}
        </motion.span>
      </div>
      <span className="mt-3 text-xs text-maroon sm:text-sm">{label}</span>
    </div>
  );
}

/** Live countdown to weddingData.weddingDateTime (re-computed every second, timer cleaned up on unmount). */
export default function Countdown() {
  const { t, isTelugu } = useLang();
  const now = useNow();
  const target = useMemo(() => new Date(weddingData.weddingDateTime).getTime(), []);
  const diff = Number.isFinite(target) ? target - now : 0;

  if (Number.isFinite(target) && diff <= 0) {
    const same = diff > -DAY;
    return (
      <p role="status" className={`text-center text-3xl text-gold-gradient text-gold-shimmer sm:text-5xl ${isTelugu ? 'font-telugu font-semibold leading-snug' : 'font-script'}`}>
        {same ? t.countdown.today : t.countdown.after}
      </p>
    );
  }

  const s = Math.floor(diff / 1000);
  const units = [
    [Math.floor(s / 86400), t.countdown.days],
    [Math.floor((s % 86400) / 3600), t.countdown.hours],
    [Math.floor((s % 3600) / 60), t.countdown.minutes],
    [s % 60, t.countdown.seconds],
  ];
  return (
    <Reveal variant="up">
      <div role="timer" aria-label={t.countdown.title} className="flex justify-center gap-2.5 min-[400px]:gap-4 sm:gap-8">
        {units.map(([v, l]) => <Unit key={l} value={v} label={l} />)}
      </div>
    </Reveal>
  );
}
