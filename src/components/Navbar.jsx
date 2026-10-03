import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import { Lotus } from './Ornaments';

const LINKS = ['home', 'couple', 'story', 'events', 'venue'];

function useActiveSection(ids) {
  const [active, setActive] = useState('home');
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length) return undefined;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);
  return active;
}

export default function Navbar() {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(LINKS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const go = (id) => (e) => {
    e.preventDefault();
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled || open ? 'bg-maroon-deep/90 shadow-[0_6px_30px_-10px_rgba(0,0,0,.7)] backdrop-blur-md' : 'bg-gradient-to-b from-maroon-deep/70 to-transparent'}`}
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-8">
        <a href="#home" onClick={go('home')} className="hidden items-center gap-2 text-gold min-[360px]:flex" aria-label={t.nav.home}>
          <Lotus className="h-8 w-8" />
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {LINKS.map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={go(id)}
                aria-current={active === id ? 'true' : undefined}
                className={`relative rounded-full px-4 py-2 font-display text-lg transition-colors ${active === id ? 'text-gold-light' : 'text-cream/80 hover:text-gold-light'}`}
              >
                {t.nav[id]}
                {active === id && <span className="absolute inset-x-4 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/50 text-gold-light lg:hidden"
            aria-label={open ? t.nav.close : t.nav.menu}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden lg:hidden"
          >
            <ul className="mx-auto flex max-w-md flex-col gap-1 px-6 pb-6 pt-2">
              {[...LINKS].map((id, i) => (
                <motion.li key={id} initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i }}>
                  <a
                    href={`#${id}`}
                    onClick={go(id)}
                    className={`flex min-h-[48px] items-center border-b border-gold/15 px-2 font-display text-xl ${active === id ? 'text-gold-light' : 'text-cream/90'}`}
                  >
                    {t.nav[id]}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
