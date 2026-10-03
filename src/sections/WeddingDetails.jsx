import { CalendarDays, Clock, MapPin } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import Reveal from '../components/Reveal';
import MandalaBackground from '../components/MandalaBackground';
import PetalAnimation from '../components/PetalAnimation';
import { GoldDivider, GoldFrame, Lotus, Toran } from '../components/Ornaments';
import SplitText from '../components/SplitText';

export default function WeddingDetails() {
  const { t, d, isTelugu } = useLang();
  const body = isTelugu ? 'font-telugu' : 'font-display';
  return (
    <section id="wedding" className="relative isolate overflow-hidden bg-[radial-gradient(ellipse_at_50%_40%,#5f1226_0%,#350812_65%,#1c0409_100%)] px-4 py-24 text-cream sm:px-8 sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="light-rays absolute inset-0" />
        <MandalaBackground className="absolute left-1/2 top-1/2 h-[130vmin] w-[130vmin] max-w-none -translate-x-1/2 -translate-y-1/2 text-gold/[.13]" />
        <PetalAnimation variant="petals" density={0.8} />
        <PetalAnimation variant="gold" density={0.6} />
      </div>
      <Toran className="absolute inset-x-0 top-0 h-10 sm:h-16" />

      
      <div className="relative mx-auto max-w-3xl">
        <GoldFrame className="bg-maroon-deep/55 px-5 py-14 text-center backdrop-blur-sm sm:px-12 sm:py-20" cornerClass="sm:!h-20 sm:!w-20">
          <Reveal variant="scale">
            <Lotus className="mx-auto h-14 w-14 text-gold sm:h-20 sm:w-20" />
          </Reveal>
          <p className={`mt-5 text-lg text-gold-light/90 ${body} ${isTelugu ? '' : 'italic'}`}>{t.wedding.eyebrow}</p>
          <h2 className={`mt-2 text-3xl font-semibold text-gold-light sm:text-5xl ${body}`}>
            <SplitText text={t.wedding.title} />
          </h2>
          <GoldDivider className="my-7" />

          <Reveal variant="blur" delay={0.1}>
            <p className="flex items-center justify-center gap-2 text-sm text-cream/60"><CalendarDays size={16} className="text-gold" aria-hidden="true" />{t.wedding.on}</p>
            <p className={`mt-2 break-words text-gold-gradient text-gold-shimmer text-4xl font-semibold sm:text-7xl ${body}`}>{d.weddingDate}</p>
          </Reveal>

          <div className="mx-auto mt-9 grid max-w-xl gap-8 sm:grid-cols-2">
            <Reveal variant="left" delay={0.15}>
              <p className="flex items-center justify-center gap-2 text-sm text-cream/60"><Clock size={16} className="text-gold" aria-hidden="true" />{t.wedding.time}</p>
              <p className={`mt-1 break-words text-2xl text-cream sm:text-3xl ${body}`}>{d.weddingTime}</p>
            </Reveal>
            <Reveal variant="right" delay={0.25}>
              <p className="flex items-center justify-center gap-2 text-sm text-cream/60"><MapPin size={16} className="text-gold" aria-hidden="true" />{t.wedding.at}</p>
              <p className={`mt-1 break-words text-2xl text-cream sm:text-3xl ${body}`}>{d.venue}</p>
              <p className="mt-1 break-words text-sm text-cream/60">{d.town}, {d.district}</p>
            </Reveal>
          </div>

          <Reveal delay={0.3} className="mx-auto mt-12 max-w-lg">
            <GoldDivider className="mb-6" />
            <p className={`text-lg leading-relaxed text-cream/90 sm:text-xl ${body} ${isTelugu ? '' : 'italic'}`}>{t.wedding.invite}</p>
          </Reveal>
        </GoldFrame>
      </div>
    </section>
  );
}
