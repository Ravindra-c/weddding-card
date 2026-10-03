import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useLang } from '../context/LanguageContext';
import { translations } from '../data/translations';
import { weddingImages } from '../data/images';
import MandalaBackground from './MandalaBackground';
import PetalAnimation from './PetalAnimation';
import LanguageSwitcher from './LanguageSwitcher';
import Img from './Img';
import SplitText from './SplitText';
import { GoldDivider } from './Ornaments';

const EASE = [0.22, 1, 0.36, 1];

/**
 * Divine opening:
 * dark background → faint mandala → golden dust → Lord Venkateshwara reveals with a soft halo
 * → blessing line → "Enter Invitation" (needed so the browser lets music start).
 */
export default function OpeningScreen({ onEnter }) {
  const { t, lang, isTelugu } = useLang();
  const [petals, setPetals] = useState(false);
  const [ready, setReady] = useState(false);
  const btnRef = useRef(null);
  const otherLang = lang === 'te' ? 'en' : 'te';

  useEffect(() => {
    const a = setTimeout(() => setPetals(true), 2200);
    const b = setTimeout(() => setReady(true), 4300);
    return () => { clearTimeout(a); clearTimeout(b); };
  }, []);

  useEffect(() => { if (ready) btnRef.current?.focus({ preventScroll: true }); }, [ready]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={t.opening.blessing}
      className="fixed inset-0 z-[100] overflow-y-auto overflow-x-hidden bg-[radial-gradient(ellipse_at_50%_35%,#4a0c1c_0%,#2a060f_55%,#150308_100%)]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.06, filter: 'blur(10px)', transition: { duration: 1.3, ease: EASE } }}
    >
      {/* Layers */}
      <motion.div className="pointer-events-none fixed inset-0 flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 3, delay: 0.4 }}>
        <MandalaBackground className="h-[135vmax] max-h-[1500px] w-[135vmax] max-w-[1500px] text-gold/[.13]" />
      </motion.div>
      <motion.div className="light-rays pointer-events-none fixed inset-0 opacity-60" initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ duration: 3, delay: 1.2 }} />
      <div className="pointer-events-none fixed inset-0"><PetalAnimation variant="gold" /></div>
      {petals && <div className="pointer-events-none fixed inset-0"><PetalAnimation variant="petals" density={0.7} /></div>}

      <motion.div className="fixed right-3 top-3 z-10 sm:right-6 sm:top-5" style={{ top: 'max(0.75rem, env(safe-area-inset-top))' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 1 }}>
        <LanguageSwitcher />
      </motion.div>

      {/* Content */}
      <div className="relative z-[5] mx-auto flex min-h-full max-w-xl flex-col items-center justify-center px-6 pb-10 pt-20 text-center">
        <div className="relative">
          {/* halo */}
          <motion.div
            aria-hidden="true"
            className="absolute -inset-10 rounded-full bg-[radial-gradient(circle,rgba(255,214,120,.55)_0%,rgba(212,175,55,.22)_40%,transparent_70%)] sm:-inset-16"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2.6, delay: 1, ease: EASE }}
          >
            <div className="h-full w-full animate-glowPulse rounded-full" />
          </motion.div>

          {/* deity — revealed with a soft blur-to-clear fade, never stretched (object-contain) */}
          <motion.div
            initial={{ opacity: 0, filter: 'blur(18px)', scale: 0.94 }}
            animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
            transition={{ duration: 2.4, delay: 1.2, ease: EASE }}
            className="relative"
          >
            <div className="rounded-t-[999px] rounded-b-3xl border border-gold/70 bg-gradient-to-b from-maroon to-maroon-deep p-2 shadow-[0_0_60px_-8px_rgba(212,175,55,.6)]">
              <Img
                src={weddingImages.god}
                alt={t.opening.godAlt}
                label="public/assets/images/lord-venkateshwara.png"
                eager
                className="rounded-t-[999px] rounded-b-2xl"
                imgClassName="!object-contain"
                style={{ height: 'min(44svh, 400px)', aspectRatio: '3 / 4', maxWidth: '78vw' }}
              />
            </div>
          </motion.div>
        </div>

        {/* blessing */}
        <div className="mt-9 sm:mt-12">
          <motion.h1 key={lang} className={`text-[1.6rem] font-semibold leading-snug sm:text-4xl ${isTelugu ? 'font-telugu' : 'font-display'}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
            <SplitText text={t.opening.blessing} inView={false} delay={ready ? 0 : 2.8} stagger={0.12} wordClassName="text-gold-gradient text-gold-shimmer" />
          </motion.h1>
          <motion.p lang={otherLang} className={`mt-3 text-sm italic text-cream/60 sm:text-base ${otherLang === 'te' ? 'font-telugu' : 'font-display'}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.8, duration: 1.4 }}>
            {translations[otherLang].opening.blessing}
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.6, duration: 1.2 }} className="mt-5">
            <GoldDivider />
          </motion.div>
        </div>

        {/* enter */}
        <div className="mt-8 h-14">
          {ready && (
            <motion.button
              ref={btnRef}
              type="button"
              onClick={onEnter}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE }}
              className={`btn-gold px-9 text-base ${isTelugu ? 'font-teluguSans' : 'font-body'}`}
            >
              {t.opening.enter}
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
