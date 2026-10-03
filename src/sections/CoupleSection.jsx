import { useLang } from '../context/LanguageContext';
import { weddingImages } from '../data/images';
import Img from '../components/Img';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';
import { GoldDivider, Jasmine, Marigold } from '../components/Ornaments';
import { Heart } from 'lucide-react';

function Portrait({ src, alt, name, role, delay, side, isTelugu }) {
  return (
    <Reveal variant={side === 'left' ? 'left' : 'right'} delay={delay} className="flex flex-col items-center">
      <div className="group relative">
        {/* soft glow */}
        <div aria-hidden="true" className="absolute -inset-4 rounded-[50%] bg-gold/25 blur-2xl transition duration-700 group-hover:bg-gold/40" />
        <div className="relative animate-floaty motion-reduce:animate-none" style={{ animationDelay: side === 'left' ? '0s' : '1.2s' }}>
          {/* gold ring */}
          <div className="rounded-[50%] bg-gradient-to-br from-gold-light via-gold to-gold-dark p-[5px] shadow-[0_20px_50px_-15px_rgba(90,16,32,.7)] transition duration-700 lg:group-hover:scale-[1.03]">
            <div className="rounded-[50%] bg-ivory p-2">
              <Img src={src} alt={alt} label={name} className="aspect-[3/4] w-[min(62vw,250px)] rounded-[50%] sm:w-[260px] lg:w-[320px]" objectPosition="50% 25%" />
            </div>
          </div>
          {/* floral decoration */}
          <Marigold className="absolute -left-4 top-6 h-12 w-12 sm:h-16 sm:w-16" />
          <Jasmine className="absolute -left-1 top-[4.5rem] h-8 w-8 sm:top-24 sm:h-10 sm:w-10" />
          <Marigold className="absolute -right-3 bottom-10 h-10 w-10 sm:h-14 sm:w-14" />
          <Jasmine className="absolute -right-2 bottom-24 h-7 w-7 sm:h-9 sm:w-9" />
        </div>
      </div>
      <p className="mt-8 font-body text-sm text-maroon/70">{role}</p>
      <h3 className={`mt-1 break-words text-center text-3xl text-maroon sm:text-4xl ${isTelugu ? 'font-telugu font-semibold' : 'font-script text-4xl sm:text-5xl'}`}>{name}</h3>
    </Reveal>
  );
}

export default function CoupleSection() {
  const { t, d, isTelugu } = useLang();
  return (
    <section id="couple" className="section-pad relative overflow-hidden bg-gradient-to-b from-ivory via-cream to-ivory">
      <div className="container-wedding">
        <SectionHeading title={t.couple.title} />
        <div className="grid items-start gap-14 md:grid-cols-[1fr_auto_1fr] md:gap-8">
          <Portrait src={weddingImages.groom} alt={t.couple.groomAlt} name={d.groomName} role={t.couple.groom} side="left" delay={0} isTelugu={isTelugu} />
          <Reveal variant="scale" delay={0.3} className="hidden h-full items-center justify-center md:flex md:pt-24">
            <Heart className="h-10 w-10 fill-maroon/80 text-gold" aria-hidden="true" />
          </Reveal>
          <Portrait src={weddingImages.bride} alt={t.couple.brideAlt} name={d.brideName} role={t.couple.bride} side="right" delay={0.15} isTelugu={isTelugu} />
        </div>
        <Reveal variant="up" delay={0.2} className="mx-auto mt-16 max-w-xl text-center">
          <GoldDivider />
          <p className={`mt-6 text-xl text-maroon sm:text-2xl ${isTelugu ? 'font-telugu' : 'font-display italic'}`}>{t.couple.tagline}</p>
        </Reveal>
      </div>
    </section>
  );
}
