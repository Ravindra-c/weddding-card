import { ExternalLink, MapPin, Navigation } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { weddingData } from '../data/weddingData';
import { events } from '../data/events';
import { isValidUrl, mapsDirectionsUrl, mapsSearchUrl } from '../utils/helpers';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';
import { GoldFrame } from '../components/Ornaments';
import MandalaBackground from '../components/MandalaBackground';

/** One venue card: label, big venue name, date, address and the two map buttons. */
function VenueCard({ label, name, date, address, viewUrl, dirUrl, t, isTelugu }) {
  const tel = isTelugu ? 'font-telugu' : '';
  return (
    <GoldFrame className="flex h-full flex-col justify-start bg-maroon-deep/60 p-7 text-center sm:p-10 lg:text-left">
      <MapPin className="mx-auto h-10 w-10 text-gold lg:mx-0" aria-hidden="true" />

      {/* small label: Wedding / Reception */}
      <p className={`mt-4 text-sm text-gold/90 ${isTelugu ? 'font-telugu' : 'font-body uppercase tracking-[0.3em]'}`}>{label}</p>

      <div className="mt-2 flex items-center justify-center lg:min-h-[9.5rem] lg:justify-start">
        <h3 className={`inline-block max-w-full overflow-visible break-words py-3 text-gold-gradient text-gold-shimmer text-[1.6rem] min-[400px]:text-3xl sm:text-4xl ${isTelugu ? 'font-telugu font-semibold leading-[1.8]' : 'font-script leading-relaxed'}`}>
          {name}
        </h3>
      </div>

      {date && <p className={`mt-1 text-gold-light ${isTelugu ? 'font-telugu' : 'font-display text-lg'}`}>{date}</p>}

      <p className={`mt-4 break-words leading-relaxed text-cream/80 lg:min-h-[4.5rem] ${isTelugu ? 'font-telugu' : 'font-body font-light'}`}>{address}</p>

      <div className="mt-auto flex flex-col gap-3 pt-8 sm:flex-row sm:justify-center lg:justify-start">
        <a href={viewUrl} target="_blank" rel="noopener noreferrer" className={`btn-gold ${isTelugu ? 'font-teluguSans' : ''}`}>
          <MapPin size={18} aria-hidden="true" /> {t.venue.view}
        </a>
        <a href={dirUrl} target="_blank" rel="noopener noreferrer" className={`btn-outline text-gold-light ${tel ? 'font-teluguSans' : ''}`}>
          <Navigation size={18} aria-hidden="true" /> {t.venue.directions} <ExternalLink size={14} aria-hidden="true" className="opacity-70" />
        </a>
      </div>
    </GoldFrame>
  );
}

export default function VenueSection() {
  const { t, d, lang, isTelugu } = useLang();

  /* ---------- Wedding venue ---------- */
  const weddingQuery = `${weddingData.en.venue} ${weddingData.en.address}`;
  const weddingView = isValidUrl(weddingData.mapsUrl) ? weddingData.mapsUrl : mapsSearchUrl(weddingQuery);
  const weddingDir = isValidUrl(weddingData.directionsUrl) ? weddingData.directionsUrl : mapsDirectionsUrl(weddingQuery);

  /* ---------- Reception venue (edit the details in src/data/weddingData.js) ---------- */
  const recEvent = events.find((e) => e.id === 'reception');
  const recName = d.receptionVenue || recEvent?.venue?.[lang] || '';
  const recAddress = d.receptionAddress || '';
  const recDate = d.receptionDate || recEvent?.date?.[lang] || '';
  const recQuery = `${weddingData.en.receptionVenue || recEvent?.venue?.en || ''} ${weddingData.en.receptionAddress || ''}`.trim();
  const recView = isValidUrl(weddingData.receptionMapsUrl) ? weddingData.receptionMapsUrl : mapsSearchUrl(recQuery);
  const recDir = isValidUrl(weddingData.receptionDirectionsUrl) ? weddingData.receptionDirectionsUrl : mapsDirectionsUrl(recQuery);

  const labels = isTelugu ? { wedding: 'వివాహం', reception: 'రిసెప్షన్' } : { wedding: 'Wedding', reception: 'Reception' };

  return (
    <section id="venue" className="section-pad relative overflow-hidden bg-gradient-to-b from-maroon-deep via-maroon to-maroon-deep text-cream">
      <MandalaBackground spin="none" className="pointer-events-none absolute -left-40 top-10 h-[34rem] w-[34rem] text-gold/[.08]" />
      <div className="container-wedding relative">
        <SectionHeading light title={t.nav.venue} subtitle={t.venue.subtitle} />
        <div className="grid items-stretch gap-8 lg:grid-cols-2 lg:gap-10">
          <Reveal variant="left">
            <VenueCard
              label={labels.wedding}
              name={d.venue}
              date={d.weddingDate}
              address={d.address}
              viewUrl={weddingView}
              dirUrl={weddingDir}
              t={t}
              isTelugu={isTelugu}
            />
          </Reveal>

          <Reveal variant="right" delay={0.1}>
            <VenueCard
              label={labels.reception}
              name={recName}
              date={recDate}
              address={recAddress}
              viewUrl={recView}
              dirUrl={recDir}
              t={t}
              isTelugu={isTelugu}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}