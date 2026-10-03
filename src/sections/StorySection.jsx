import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { weddingImages } from '../data/images';
import Img from '../components/Img';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';
import PetalAnimation from '../components/PetalAnimation';

export default function StorySection() {
  const { t, isTelugu } = useLang();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] });
  const grow = useSpring(scrollYProgress, { stiffness: 90, damping: 28, mass: 0.4 });

  return (
    <section id="story" className="section-pad relative overflow-hidden bg-gradient-to-b from-maroon-deep via-maroon to-maroon-deep text-cream">
      <PetalAnimation variant="gold" density={0.6} />
      <div className="container-wedding relative">
        <SectionHeading light title={t.story.title} subtitle={t.story.subtitle} />

        <div ref={ref} className="relative">
          {/* the golden line: faint track + line that draws itself while scrolling */}
          <div aria-hidden="true" className="absolute bottom-0 left-4 top-0 w-px -translate-x-1/2 bg-gold/20 md:left-1/2" />
          <motion.div aria-hidden="true" style={{ scaleY: grow, transformOrigin: 'top' }} className="absolute bottom-0 left-4 top-0 w-[2px] -translate-x-1/2 bg-gradient-to-b from-gold-light via-gold to-gold-dark shadow-[0_0_14px_rgba(212,175,55,.8)] md:left-1/2" />

          <ol className="space-y-14 sm:space-y-20">
            {t.story.items.map((item, i) => {
              const left = i % 2 === 0;
              return (
                <li key={item.title} className="relative pl-12 md:grid md:grid-cols-2 md:gap-16 md:pl-0">
                  {/* node */}
                  <span aria-hidden="true" className="absolute left-4 top-3 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full border border-gold bg-maroon-deep md:left-1/2 md:top-8">
                    <Heart size={15} className="fill-gold text-gold" />
                    <Heart size={10} className="heart-float absolute -top-1 fill-gold/70 text-gold/70" style={{ animationDelay: `${i * 1.3}s` }} />
                  </span>

                  <Reveal variant={left ? 'left' : 'right'} className={`${left ? 'md:col-start-1 md:text-right' : 'md:col-start-2'}`}>
                    <div className={`overflow-hidden rounded-2xl border border-gold/40 bg-maroon-deep/60 p-3 backdrop-blur-sm ${left ? 'md:ml-auto' : ''}`}>
                      <Img src={weddingImages.story[i]} alt={t.story.alt} label={`story-${i + 1}.jpg`} className="aspect-[16/10] w-full rounded-xl" />
                      <div className="px-2 pb-2 pt-5">
                        <h3 className={`text-2xl text-gold-light sm:text-3xl ${isTelugu ? 'font-telugu font-semibold' : 'font-display font-semibold'}`}>{item.title}</h3>
                        <p className={`mt-3 leading-relaxed text-cream/80 ${isTelugu ? 'font-telugu' : 'font-body font-light'}`}>{item.text}</p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
