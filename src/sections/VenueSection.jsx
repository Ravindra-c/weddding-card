import { ExternalLink, MapPin, Navigation } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { weddingData } from '../data/weddingData';
import { isValidUrl, mapsDirectionsUrl, mapsSearchUrl } from '../utils/helpers';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';
import { GoldFrame, Lotus } from '../components/Ornaments';
import MandalaBackground from '../components/MandalaBackground';

export default function VenueSection() {
  const { t, d, isTelugu } = useLang();
  const query = `${weddingData.en.venue} ${weddingData.en.address}`;
  const viewUrl = isValidUrl(weddingData.mapsUrl) ? weddingData.mapsUrl : mapsSearchUrl(query);
  const dirUrl = isValidUrl(weddingData.directionsUrl) ? weddingData.directionsUrl : mapsDirectionsUrl(query);
  const embed = isValidUrl(weddingData.mapEmbedUrl) ? weddingData.mapEmbedUrl : null;

  return (
    <section id="venue" className="section-pad relative overflow-hidden bg-gradient-to-b from-maroon-deep via-maroon to-maroon-deep text-cream">
      <MandalaBackground spin="none" className="pointer-events-none absolute -left-40 top-10 h-[34rem] w-[34rem] text-gold/[.08]" />
      <div className="container-wedding relative">
        <SectionHeading light title={t.venue.title} subtitle={t.venue.subtitle} />
        <div className="grid items-stretch gap-8 lg:grid-cols-2 lg:gap-12">
          <Reveal variant="left">
            <GoldFrame className="flex h-full flex-col justify-center bg-maroon-deep/60 p-7 text-center sm:p-12 lg:text-left">
              <MapPin className="mx-auto h-10 w-10 text-gold lg:mx-0" aria-hidden="true" />
              
              <h3 className={`mt-5 text-gold-gradient text-gold-shimmer max-w-full break-words px-6 py-4 leading-relaxed overflow-visible inline-block text-[2rem] min-[400px]:text-4xl sm:text-5xl lg:text-6xl ${isTelugu ? 'font-telugu font-semibold' : 'font-script'}`}>
                {d.venue}
              </h3>

              <p className={`mt-4 break-words leading-relaxed text-cream/80 ${isTelugu ? 'font-telugu' : 'font-body font-light'}`}>{d.address}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
                <a href={viewUrl} target="_blank" rel="noopener noreferrer" className={`btn-gold ${isTelugu ? 'font-teluguSans' : ''}`}>
                  <MapPin size={18} aria-hidden="true" /> {t.venue.view}
                </a>
                <a href={dirUrl} target="_blank" rel="noopener noreferrer" className={`btn-outline text-gold-light ${isTelugu ? 'font-teluguSans' : ''}`}>
                  <Navigation size={18} aria-hidden="true" /> {t.venue.directions} <ExternalLink size={14} aria-hidden="true" className="opacity-70" />
                </a>
              </div>
            </GoldFrame>
          </Reveal>

          <Reveal variant="right" delay={0.1}>
            <div className="relative h-full min-h-[18rem] overflow-hidden rounded-2xl border border-gold/50 bg-maroon-deep shadow-[0_30px_60px_-30px_rgba(0,0,0,.8)]">
              {embed ? (
                <iframe src={embed} title={t.venue.mapTitle} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="absolute inset-0 h-full w-full border-0" allowFullScreen />
              ) : (
                <a href={viewUrl} target="_blank" rel="noopener noreferrer" aria-label={t.venue.view} className="absolute inset-0 flex items-center justify-center">
                  <svg aria-hidden="true" className="absolute inset-0 h-full w-full text-gold/15" preserveAspectRatio="xMidYMid slice" viewBox="0 0 400 300" fill="none" stroke="currentColor">
                    <path d="M0 60C80 40 120 110 200 90S330 40 400 70M0 150C90 130 140 200 220 175S340 120 400 160M0 240C70 220 150 280 230 255S350 215 400 245" />
                    <path d="M70 0C60 90 110 150 90 300M200 0C190 80 240 160 215 300M320 0C310 100 350 160 335 300" opacity=".6" />
                    <circle cx="200" cy="150" r="70" strokeDasharray="3 6" />
                  </svg>
                  <span className="relative flex flex-col items-center">
                    <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-gold-light to-gold-dark text-maroon-deep shadow-[0_0_40px_rgba(212,175,55,.6)]">
                      <span className="absolute inset-0 animate-ping rounded-full bg-gold/30" aria-hidden="true" style={{ animationDuration: '3s' }} />
                      <Lotus className="relative h-10 w-10" />
                    </span>
                    <span className={`mt-4 px-4 text-center text-lg text-gold-light ${isTelugu ? 'font-telugu' : 'font-display'}`}>{d.town}, {d.district}</span>
                  </span>
                </a>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}