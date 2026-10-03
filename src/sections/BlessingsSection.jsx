import { useLang } from '../context/LanguageContext';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';
import MandalaBackground from '../components/MandalaBackground';
import { Lotus } from '../components/Ornaments';

const VARIANTS = ['left', 'up', 'right'];

export default function BlessingsSection() {
  const { t, isTelugu } = useLang();
  return (
    <section id="blessings" className="section-pad relative overflow-hidden bg-gradient-to-b from-maroon-deep via-maroon to-maroon-deep text-cream">
      <MandalaBackground className="pointer-events-none absolute -right-48 -top-24 h-[40rem] w-[40rem] text-gold/[.08]" spin="ccw" />
      <div className="container-wedding relative">
        <SectionHeading light title={t.blessings.title} />
        <div className="grid gap-6 md:grid-cols-3 md:gap-8">
          {t.blessings.cards.map((c, i) => (
            <Reveal key={c.big} variant={VARIANTS[i]} delay={i * 0.1}>
              <figure className="gold-frame relative flex h-full flex-col items-center rounded-2xl bg-maroon-deep/60 px-6 py-10 text-center backdrop-blur-sm">
                <Lotus className="h-9 w-9 text-gold" />
                <blockquote className="mt-5">
                  <p className={`text-gold-gradient text-gold-shimmer break-words text-3xl font-semibold sm:text-4xl ${isTelugu ? 'font-telugu leading-snug' : 'font-script'}`}>{c.big}</p>
                  <p className={`mt-5 leading-relaxed text-cream/80 ${isTelugu ? 'font-telugu' : 'font-display text-lg italic'}`}>{c.text}</p>
                </blockquote>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
