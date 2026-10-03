import { useLang } from '../context/LanguageContext';
import Countdown from '../components/Countdown';
import Reveal from '../components/Reveal';
import { GoldDivider } from '../components/Ornaments';

export default function CountdownSection() {
  const { t, isTelugu } = useLang();
  return (
    <section id="countdown" className="relative overflow-hidden bg-ivory px-4 py-16 sm:py-24">
      <div className="container-wedding text-center">
        <Reveal>
          <h2 className={`text-2xl text-maroon sm:text-4xl ${isTelugu ? 'font-telugu font-semibold' : 'font-display font-semibold'}`}>{t.countdown.title}</h2>
          <GoldDivider className="my-5" />
        </Reveal>
        <div className="mt-8"><Countdown /></div>
      </div>
    </section>
  );
}
