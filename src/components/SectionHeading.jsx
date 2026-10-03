import { GoldDivider } from './Ornaments';
import Reveal from './Reveal';
import SplitText from './SplitText';

export default function SectionHeading({ title, subtitle, light = false, className = '' }) {
  return (
    <div className={`mx-auto mb-12 max-w-2xl text-center sm:mb-16 ${className}`}>
      <h2 className={`font-display text-4xl font-semibold leading-tight sm:text-5xl ${light ? '' : 'text-maroon'}`}>
        <SplitText text={title} wordClassName={light ? 'text-gold-gradient text-gold-shimmer' : ''} />
      </h2>
      <Reveal variant="fade" delay={0.3} className="mt-4">
        <GoldDivider />
      </Reveal>
      {subtitle && (
        <Reveal variant="up" delay={0.4} className={`mt-4 font-display text-lg italic sm:text-xl ${light ? 'text-cream/80' : 'text-bark/70'}`}>
          <p>{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
}
