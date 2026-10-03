
import {
  CalendarDays,
  Clock,
  Flame,
  Flower2,
  Gem,
  Heart,
  Leaf,
  MapPin,
  PartyPopper,
} from 'lucide-react';

import { events } from '../data/events';
import { useLang, useLocalized } from '../context/LanguageContext';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';
import { Corner } from '../components/Ornaments';

const ICONS = {
  ring: Gem,
  haldi: Flower2,
  mehendi: Leaf,
  wedding: Flame,
  reception: PartyPopper,
  heart: Heart,
};

// A different subtle reveal for each card
const REVEALS = [
  'up',
  'left',
  'scale',
  'right',
  'rotate',
  'blur',
];

function Row({ Icon, label, value, isTelugu }) {
  return (
    <div className="flex min-w-0 items-start gap-3 text-left">
      <Icon
        size={18}
        className="mt-1 shrink-0 text-gold"
        aria-hidden="true"
      />

      <div className="min-w-0 flex-1">
        <p className="text-xs text-cream/50">
          {label}
        </p>

        <p
          className={`break-words whitespace-normal text-base leading-relaxed text-cream ${
            isTelugu
              ? 'font-teluguSans'
              : 'font-body'
          }`}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

export default function EventsSection() {
  const { t, lang, isTelugu } = useLang();
  const pick = useLocalized();

  // Show only enabled events and remove the Mehendi event
  const list = events.filter(
    (e) => e.enabled && e.icon !== 'mehendi'
  );

  if (!list.length) {
    return null;
  }

  return (
    <section
      id="events"
      className="section-pad relative overflow-hidden bg-gradient-to-b from-ivory via-cream to-ivory"
    >
      <div className="container-wedding w-full max-w-full">
        {/* ==================== SECTION HEADING ==================== */}
        <SectionHeading
          title={t.events.title}
          subtitle={t.events.subtitle}
        />

        {/* ==================== EVENT CARDS ==================== */}
        <div className="flex w-full flex-wrap justify-center gap-6 sm:gap-8">
          {list.map((e, i) => {
            const Icon = ICONS[e.icon] || Heart;

            const name =
              lang === 'te'
                ? e.teluguName
                : e.name;

            return (
              <Reveal
                key={e.id}
                variant={REVEALS[i % REVEALS.length]}
                delay={(i % 3) * 0.12}
                className="w-full min-w-0 sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.35rem)]"
              >
                <article
                  className={`relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border p-7 pt-9 text-cream shadow-[0_24px_50px_-28px_rgba(53,8,18,.9)] transition duration-500 lg:hover:-translate-y-1 ${
                    e.highlight
                      ? 'border-gold bg-gradient-to-b from-maroon to-maroon-deep'
                      : 'border-gold/40 bg-gradient-to-b from-maroon-rich/90 to-maroon-deep'
                  }`}
                >
                  {/* ==================== CORNER DECORATIONS ==================== */}
                  <Corner className="absolute left-1 top-1 !h-8 !w-8 opacity-70" />

                  <Corner className="absolute bottom-1 right-1 rotate-180 !h-8 !w-8 opacity-70" />

                  {/* ==================== EVENT ICON ==================== */}
                  <div className="mx-auto mb-5 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gold/70 bg-maroon-deep text-gold">
                    <Icon
                      size={26}
                      aria-hidden="true"
                    />
                  </div>

                  {/* ==================== EVENT NAME ==================== */}
                  <div className="flex w-full min-w-0 justify-center px-1">
                    <h3
                      className={`w-full max-w-full break-words whitespace-normal text-center leading-[1.2] text-gold-light ${
                        isTelugu
                          ? 'font-telugu text-xl font-semibold sm:text-2xl'
                          : 'font-display text-xl font-semibold sm:text-2xl'
                      }`}
                    >
                      {name}
                    </h3>
                  </div>

                  {/* ==================== DIVIDER ==================== */}
                  <div className="mx-auto my-5 h-px w-20 shrink-0 bg-gradient-to-r from-transparent via-gold to-transparent" />

                  {/* ==================== EVENT DETAILS ==================== */}
                  <div className="min-w-0 space-y-4">
                    <Row
                      Icon={CalendarDays}
                      label={t.events.date}
                      value={pick(e.date)}
                      isTelugu={isTelugu}
                    />

                    <Row
                      Icon={Clock}
                      label={t.events.time}
                      value={pick(e.time)}
                      isTelugu={isTelugu}
                    />

                    <Row
                      Icon={MapPin}
                      label={t.events.venue}
                      value={pick(e.venue)}
                      isTelugu={isTelugu}
                    />
                  </div>

                  {/* ==================== DESCRIPTION ==================== */}
                  {e.description && (
                    <p
                      className={`mt-5 break-words whitespace-normal border-t border-gold/20 pt-4 text-sm leading-relaxed text-cream/70 ${
                        isTelugu
                          ? 'font-telugu'
                          : ''
                      }`}
                    >
                      {pick(e.description)}
                    </p>
                  )}
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
