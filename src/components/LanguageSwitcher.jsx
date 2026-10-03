import { motion } from 'framer-motion';
import { useLang } from '../context/LanguageContext';

const OPTIONS = [
  { code: 'te', label: 'తెలుగు' },
  { code: 'en', label: 'English' },
];

/** Premium pill-style language switcher. No page reload — React state only. */
export default function LanguageSwitcher({ className = '' }) {
  const { lang, setLang, t } = useLang();
  return (
    <div
      role="group"
      aria-label={t.lang.label}
      className={`relative inline-flex items-center rounded-full border border-gold/60 bg-maroon-deep/70 p-1 backdrop-blur ${className}`}
    >
      {OPTIONS.map((o) => {
        const active = lang === o.code;
        return (
          <button
            key={o.code}
            type="button"
            lang={o.code}
            aria-pressed={active}
            onClick={() => setLang(o.code)}
            className={`relative z-10 min-h-[36px] rounded-full px-3.5 py-1 text-[13px] font-medium transition-colors sm:px-4 sm:text-sm ${o.code === 'te' ? 'font-teluguSans' : 'font-body'} ${active ? 'text-maroon-deep' : 'text-gold-light hover:text-white'}`}
          >
            {active && (
              <motion.span
                layoutId="lang-pill"
                className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-gold-dark via-gold-light to-gold"
                transition={{ type: 'spring', stiffness: 420, damping: 34 }}
              />
            )}
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
