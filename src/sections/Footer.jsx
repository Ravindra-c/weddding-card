import { Heart } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { GoldDivider } from '../components/Ornaments';

export default function Footer() {
  const { t, d, isTelugu } = useLang();
  return (
    <footer className="bg-maroon-deep px-5 pb-28 pt-10 text-center text-cream/80 sm:pb-24">
      <GoldDivider className="mb-5" />
      <p className={`text-xl text-gold-light ${isTelugu ? 'font-telugu' : 'font-display'}`}>{d.groomName} &amp; {d.brideName}</p>
      <p className={`mt-1 text-sm ${isTelugu ? 'font-teluguSans' : 'font-body'}`}>{d.weddingDate}</p>
      <p className={`mt-4 flex items-center justify-center gap-1.5 text-xs text-cream/60 ${isTelugu ? 'font-teluguSans' : 'font-body'}`}>
        {t.footer.made} <Heart size={12} className="fill-gold text-gold" aria-hidden="true" />
      </p>
    </footer>
  );
}
