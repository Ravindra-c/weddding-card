import { useCallback, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Maximize2 } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { weddingImages } from '../data/images';
import Img from '../components/Img';
import Lightbox from '../components/Lightbox';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';

export default function GallerySection() {
  const { t, lang } = useLang();
  const [open, setOpen] = useState(null); // index | null
  const [dir, setDir] = useState(1);
  const images = weddingImages.gallery;

  const onNavigate = useCallback((i, step) => { setDir(step); setOpen(i); }, []);
  const onClose = useCallback(() => setOpen(null), []);

  return (
    <section id="gallery" className="section-pad relative overflow-hidden bg-gradient-to-b from-ivory to-cream">
      <div className="container-wedding">
        <SectionHeading title={t.gallery.title} subtitle={t.gallery.subtitle} />
        <div className="columns-2 gap-3 sm:gap-5 md:columns-3">
          {images.map((img, i) => (
            <Reveal key={img.src} variant="blur" delay={(i % 3) * 0.1} amount={0.1} className="mb-3 break-inside-avoid sm:mb-5">
              <button
                type="button"
                onClick={() => { setDir(1); setOpen(i); }}
                aria-label={`${t.gallery.open}: ${img.alt[lang]}`}
                className="group relative block w-full overflow-hidden rounded-xl border border-gold/40 bg-maroon-deep shadow-[0_18px_40px_-24px_rgba(53,8,18,.8)]"
              >
                <Img
                  src={img.src}
                  alt={img.alt[lang]}
                  label={`gallery-${i + 1}.jpg`}
                  className="w-full"
                  imgClassName="transition duration-700 group-hover:scale-105"
                  style={{ aspectRatio: img.aspect }}
                />
                <span aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center bg-maroon-deep/0 opacity-0 transition duration-500 group-hover:bg-maroon-deep/45 group-hover:opacity-100">
                  <Maximize2 className="text-gold-light" />
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {open !== null && <Lightbox images={images} index={open} direction={dir} onClose={onClose} onNavigate={onNavigate} />}
      </AnimatePresence>
    </section>
  );
}
