import { motion } from 'framer-motion';
import { ChevronDown, Heart } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import MandalaBackground from '../components/MandalaBackground';
import PetalAnimation from '../components/PetalAnimation';
import Diya from '../components/Diya';
import { Corner, GoldDivider, Toran } from '../components/Ornaments';
import SplitText from '../components/SplitText';

export default function HeroSection() {
  const { t, d, greeting, isTelugu } = useLang();
  const heart = t.hero.joiner === 'heart';

  return (
    // Top padding decreased by 20% (pt-36 sm:pt-44 -> pt-28 sm:pt-36)
    <section id="home" className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_50%_30%,#6b1428_0%,#350812_60%,#1c0409_100%)] px-5 pb-24 pt-28 sm:pt-36 text-center text-cream">
      {/* atmosphere */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="light-rays absolute inset-0" />
        <MandalaBackground className="absolute left-1/2 top-[44%] h-[150vmin] w-[150vmin] max-w-none -translate-x-1/2 -translate-y-1/2 text-gold/[.14]" />
        <MandalaBackground spin="ccw" className="absolute left-1/2 top-[44%] hidden h-[95vmin] w-[95vmin] max-w-none -translate-x-1/2 -translate-y-1/2 text-gold/[.1] md:block" />
        <PetalAnimation variant="gold" />
        <PetalAnimation variant="petals" density={0.8} />
      </div>
      <Toran className="pointer-events-none absolute inset-x-0 top-14 h-10 sm:top-16 sm:h-16" />

      {/* gold border frame */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-3 border border-gold/50 sm:inset-6 lg:inset-8">
        <div className="absolute inset-1.5 border border-gold/20" />
        <Corner className="absolute -left-px -top-px" />
        <Corner className="absolute -right-px -top-px rotate-90" />
        <Corner className="absolute -bottom-px -right-px rotate-180" />
        <Corner className="absolute -bottom-px -left-px -rotate-90" />
      </div>
      <Diya className="absolute bottom-6 left-6 h-14 w-14 sm:bottom-12 sm:left-14 sm:h-20 sm:w-20" />
      <Diya className="absolute bottom-6 right-6 h-14 w-14 sm:bottom-12 sm:right-14 sm:h-20 sm:w-20" />

      {/* content wrapper top margin decreased by 20% (mt-6 sm:mt-10 -> mt-4 sm:mt-6) */}
      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center mt-4 sm:mt-6">
        <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }} className={`text-sm text-gold-light/90 sm:text-base ${isTelugu ? 'font-telugu' : 'font-display italic'}`}>
          {greeting}
        </motion.p>

        <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }} className={`mt-4 text-2xl font-medium text-gold-light sm:text-3xl ${isTelugu ? 'font-telugu' : 'font-display tracking-[.18em]'}`}>
          <SplitText text={t.hero.title} inView={false} delay={0.6} />
        </motion.h2>

        <GoldDivider className="mt-5" />

        <h1 className="mt-6 flex flex-col items-center gap-1 sm:mt-8 sm:gap-2 overflow-visible" aria-label={`${d.groomName} ${d.brideName}`}>
          {/* Groom Name */}
          <motion.span 
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }} 
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} 
            transition={{ duration: 1.4, delay: 1 }} 
            className={`text-gold-gradient text-gold-shimmer max-w-full break-words px-4 py-2 leading-normal text-[2rem] min-[400px]:text-4xl sm:text-5xl lg:text-6xl overflow-visible inline-block ${isTelugu ? 'font-telugu font-semibold' : 'font-script'}`}
          >
            {d.groomName}
          </motion.span>
          
          {/* Joiner Ampersand/Heart */}
          <motion.span initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 1.6 }} className="text-gold-light py-1">
            {heart ? <Heart className="h-5 w-5 fill-gold/80 text-gold sm:h-7 sm:w-7" /> : <span className="font-script text-3xl sm:text-4xl">&amp;</span>}
          </motion.span>
          
          {/* Bride Name */}
          <motion.span 
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }} 
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} 
            transition={{ duration: 1.4, delay: 1.9 }} 
            className={`text-gold-gradient text-gold-shimmer max-w-full break-words px-4 py-2 leading-normal text-[2rem] min-[400px]:text-4xl sm:text-5xl lg:text-6xl overflow-visible inline-block ${isTelugu ? 'font-telugu font-semibold' : 'font-script'}`}
          >
            {d.brideName}
          </motion.span>
        </h1>

        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 2.5 }} className={`mx-auto mt-8 max-w-xl text-lg leading-relaxed text-cream/85 sm:mt-10 sm:text-xl ${isTelugu ? 'font-telugu' : 'font-display italic'}`}>
          {t.hero.line}
        </motion.p>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.1, duration: 1 }} className="mt-8 flex flex-col items-center gap-1 text-gold-light">
          <span className={`text-base sm:text-lg ${isTelugu ? 'font-teluguSans' : 'font-display tracking-widest'}`}>{d.weddingDate}</span>
          <span className="text-sm text-cream/70">{d.town}, {d.state}</span>
        </motion.div>
      </div>

      <motion.a
        href="#couple"
        aria-label={t.hero.scroll}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.6 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center text-gold/80 sm:flex"
      >
        <ChevronDown className="animate-bounce" />
      </motion.a>
    </section>
  );
}