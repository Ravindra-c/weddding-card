import { useLang } from '../context/LanguageContext';
import { fmt } from '../utils/helpers';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';
import { GoldFrame, Jasmine, Lotus, Marigold } from '../components/Ornaments';
import Diya from '../components/Diya';

function FamilyCard({ title, parentsLine, father, mother, town, variant, delay }) {
  const { t, isTelugu } = useLang();
  return (
    <Reveal variant={variant} delay={delay}>
      <GoldFrame className="relative h-full bg-gradient-to-b from-cream to-ivory px-6 pb-10 pt-12 text-center shadow-[0_30px_60px_-30px_rgba(90,16,32,.45)] sm:px-10">
        <Lotus className="mx-auto h-12 w-12 text-gold" />
        <h3 className={`mt-4 text-2xl text-maroon sm:text-3xl ${isTelugu ? 'font-telugu font-semibold' : 'font-display font-semibold'}`}>{title}</h3>
        <div className="my-6 flex items-center justify-center gap-3" aria-hidden="true">
          <Marigold className="h-6 w-6" /><span className="h-px w-16 bg-gold/60" /><Jasmine className="h-6 w-6" />
        </div>
        <p className={`break-words text-xl text-bark sm:text-2xl ${isTelugu ? 'font-telugu' : 'font-display font-medium'}`}>{father}</p>
        <p className="my-1 font-display text-2xl text-gold-dark">{t.family.and}</p>
        <p className={`break-words text-xl text-bark sm:text-2xl ${isTelugu ? 'font-telugu' : 'font-display font-medium'}`}>{mother}</p>
        <p className="mt-6 text-sm text-bark/60">{parentsLine}</p>
        <p className="mt-1 text-sm text-bark/60">{fmt(t.family.from, { town })}</p>
      </GoldFrame>
    </Reveal>
  );
}

export default function FamilySection() {
  const { t, d, isTelugu } = useLang();
  return (
    <section id="family" className="section-pad relative overflow-hidden bg-ivory">
      <Diya className="absolute left-3 top-6 h-14 w-14 opacity-90 sm:left-10 sm:h-20 sm:w-20" />
      <Diya className="absolute right-3 top-6 h-14 w-14 opacity-90 sm:right-10 sm:h-20 sm:w-20" />
      <div className="container-wedding">
        <SectionHeading title={t.family.title} />
        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2 md:gap-10">
          <FamilyCard variant="left" title={t.family.groomSide} parentsLine={fmt(t.family.parentsOf, { name: d.groomName })} father={d.groomFather} mother={d.groomMother} town={d.groomTown} />
          <FamilyCard variant="right" delay={0.15} title={t.family.brideSide} parentsLine={fmt(t.family.parentsOf, { name: d.brideName })} father={d.brideFather} mother={d.brideMother} town={d.brideTown} />
        </div>
        <Reveal className="mt-12 text-center">
          <p className={`text-lg text-maroon/80 ${isTelugu ? 'font-telugu' : 'font-display italic'}`}>{t.family.note}</p>
        </Reveal>
      </div>
    </section>
  );
}
