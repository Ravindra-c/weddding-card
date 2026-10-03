
import { Heart } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import Reveal from '../components/Reveal';
import MandalaBackground from '../components/MandalaBackground';
import PetalAnimation from '../components/PetalAnimation';
import Diya from '../components/Diya';
import { GoldDivider, Lotus, Toran } from '../components/Ornaments';

export default function ThankYouSection() {
  const { t, d, isTelugu } = useLang();

  const body = isTelugu ? 'font-telugu' : 'font-display';

  // Same name styling as HeroSection.jsx
  const name = `text-gold-gradient text-gold-shimmer max-w-full break-words px-4 py-2 leading-normal text-[2rem] min-[400px]:text-4xl sm:text-5xl lg:text-6xl overflow-visible inline-block ${
    isTelugu ? 'font-telugu font-semibold' : 'font-script'
  }`;

  return (
    <section
      id="thanks"
      className="relative isolate overflow-hidden bg-[radial-gradient(ellipse_at_50%_50%,#5f1226_0%,#350812_60%,#1c0409_100%)] px-5 py-24 text-center text-cream sm:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <MandalaBackground className="absolute left-1/2 top-1/2 h-[120vmin] w-[120vmin] max-w-none -translate-x-1/2 -translate-y-1/2 text-gold/[.12]" />

        <PetalAnimation variant="petals" />
        <PetalAnimation variant="gold" density={0.7} />
      </div>

      <Toran className="absolute inset-x-0 top-0 h-10 sm:h-16" />

      <div className="relative mx-auto max-w-3xl">
        <Reveal variant="scale">
          <Lotus className="mx-auto h-16 w-16 animate-floaty text-gold motion-reduce:animate-none" />
        </Reveal>

        <Reveal delay={0.1}>
          <h2
            className={`mt-6 text-3xl font-medium text-gold-light sm:text-5xl ${body}`}
          >
            {t.thanks.line}
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p
            className={`mx-auto mt-5 max-w-xl text-lg text-cream/85 sm:text-xl ${body} ${
              isTelugu ? '' : 'italic'
            }`}
          >
            {t.thanks.sub}
          </p>
        </Reveal>

        {/* Groom & Bride names - same styling as HeroSection */}
        <Reveal
          variant="blur"
          delay={0.3}
          className="mt-12 flex flex-col items-center gap-1 sm:gap-2 overflow-visible"
        >
          {/* Groom Name */}
          <span className={name}>
            {d.groomName}
          </span>

          {/* Heart */}
          <span className="text-gold-light py-1">
            <Heart
              className="h-5 w-5 fill-gold/80 text-gold sm:h-7 sm:w-7"
              aria-label="❤"
            />
          </span>

          {/* Bride Name */}
          <span className={name}>
            {d.brideName}
          </span>
        </Reveal>

        <Reveal delay={0.4} className="mt-10">
          <GoldDivider />

          <p
            className={`mt-5 text-xl text-gold-light ${body} ${
              isTelugu ? '' : 'italic'
            }`}
          >
            {t.thanks.love}
          </p>
        </Reveal>

        <div className="mt-12 flex items-end justify-center gap-10">
          <Diya className="h-16 w-16 sm:h-24 sm:w-24" />
          <Diya className="h-16 w-16 sm:h-24 sm:w-24" />
        </div>
      </div>
    </section>
  );
}
