import { useCallback, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { fmt } from '../utils/helpers';
import Img from './Img';

const ratioOf = (aspect) => {
  const [w, h] = String(aspect).split('/').map((n) => parseFloat(n));
  return w && h ? w / h : 1;
};

/** Accessible full-screen viewer: Esc, ←/→, swipe, focus trap, scroll lock, focus restore. */
export default function Lightbox({ images, index, direction = 1, onClose, onNavigate }) {
  const { t, lang } = useLang();
  const closeRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const touch = useRef(null);
  const total = images.length;

  const go = useCallback((step) => onNavigate((index + step + total) % total, step), [index, total, onNavigate]);

  // scroll lock + focus handling
  useEffect(() => {
    const opener = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      if (opener && typeof opener.focus === 'function') opener.focus({ preventScroll: true });
    };
  }, []);

  // keyboard
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
      else if (e.key === 'Tab') {
        const order = [closeRef.current, prevRef.current, nextRef.current].filter(Boolean);
        const i = order.indexOf(document.activeElement);
        e.preventDefault();
        order[(i + (e.shiftKey ? -1 : 1) + order.length) % order.length]?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, onClose]);

  // preload neighbours
  useEffect(() => {
    [index + 1, index - 1].forEach((i) => {
      const img = new Image();
      img.src = images[(i + total) % total].src;
    });
  }, [index, images, total]);

  const item = images[index];
  const r = ratioOf(item.aspect);
  const btn = 'absolute z-10 flex h-12 w-12 items-center justify-center rounded-full border border-gold/60 bg-maroon-deep/80 text-gold-light backdrop-blur transition hover:bg-maroon hover:scale-105';

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={item.alt[lang]}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/90 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      onTouchStart={(e) => { touch.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touch.current == null) return;
        const dx = e.changedTouches[0].clientX - touch.current;
        touch.current = null;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
      }}
    >
      <button ref={closeRef} type="button" aria-label={t.gallery.close} onClick={onClose} className={`${btn} right-3 top-3 sm:right-6 sm:top-6`} style={{ top: 'max(0.75rem, env(safe-area-inset-top))' }}>
        <X size={22} />
      </button>
      <button ref={prevRef} type="button" aria-label={t.gallery.prev} onClick={(e) => { e.stopPropagation(); go(-1); }} className={`${btn} left-2 top-1/2 -translate-y-1/2 sm:left-6`}>
        <ChevronLeft size={24} />
      </button>
      <button ref={nextRef} type="button" aria-label={t.gallery.next} onClick={(e) => { e.stopPropagation(); go(1); }} className={`${btn} right-2 top-1/2 -translate-y-1/2 sm:right-6`}>
        <ChevronRight size={24} />
      </button>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 40 * direction }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 * direction }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
        >
          <Img
            src={item.src}
            alt={item.alt[lang]}
            label={item.src}
            eager
            className="rounded-lg border border-gold/50 shadow-2xl"
            imgClassName="!object-contain"
            style={{ aspectRatio: String(r), width: `min(88vw, calc(78svh * ${r.toFixed(4)}))` }}
          />
        </motion.div>
      </AnimatePresence>

      <p aria-live="polite" className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-maroon-deep/80 px-4 py-1 text-sm text-gold-light" style={{ bottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
        {fmt(t.gallery.counter, { n: index + 1, total })}
      </p>
    </motion.div>
  );
}
