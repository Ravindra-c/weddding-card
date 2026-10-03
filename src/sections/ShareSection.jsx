import { useEffect, useRef, useState } from 'react';
import { Check, Copy, MessageCircle, Share2 } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { fmt, getShareUrl } from '../utils/helpers';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';

export default function ShareSection() {
  const { t, d, isTelugu } = useLang();
  const [copied, setCopied] = useState(false);
  const [manual, setManual] = useState(false);
  const timer = useRef(0);
  const inputRef = useRef(null);
  const canNative = typeof navigator !== 'undefined' && typeof navigator.share === 'function';

  useEffect(() => () => clearTimeout(timer.current), []);

  const message = () => fmt(t.share.message, { groom: d.groomName, bride: d.brideName });
  const url = () => getShareUrl();

  const whatsapp = () => {
    const text = `${message()}\n${url()}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  const copy = async () => {
    const link = url();
    try {
      await navigator.clipboard.writeText(link);
    } catch {
      try {
        const ta = document.createElement('textarea');
        ta.value = link;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        const ok = document.execCommand('copy');
        document.body.removeChild(ta);
        if (!ok) throw new Error('copy failed');
      } catch {
        // last resort: show the link so it can be copied by hand
        setManual(true);
        setTimeout(() => inputRef.current?.select(), 50);
        return;
      }
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2200);
  };

  const nativeShare = async () => {
    try {
      await navigator.share({ title: document.title, text: message(), url: url() });
    } catch (err) {
      if (err && err.name !== 'AbortError') copy();
    }
  };

  const font = isTelugu ? 'font-teluguSans' : '';

  return (
    <section id="share" className="section-pad relative overflow-hidden bg-ivory !pb-16 sm:!pb-24">
      <div className="container-wedding max-w-2xl text-center">
        <SectionHeading title={t.share.title} subtitle={t.share.subtitle} />
        <Reveal variant="up" className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <button type="button" onClick={whatsapp} className={`btn-gold ${font}`}>
            <MessageCircle size={18} aria-hidden="true" /> {t.share.whatsapp}
          </button>
          <button type="button" onClick={copy} className={`btn-outline text-maroon ${font}`} aria-live="polite">
            {copied ? <Check size={18} aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />}
            {copied ? t.share.copied : t.share.copy}
          </button>
          {canNative && (
            <button type="button" onClick={nativeShare} className={`btn-outline text-maroon ${font}`}>
              <Share2 size={18} aria-hidden="true" /> {t.share.native}
            </button>
          )}
        </Reveal>
        {manual && (
          <div className="mx-auto mt-6 max-w-md">
            <label htmlFor="share-link" className="mb-2 block text-sm text-maroon">{t.share.manual}</label>
            <input id="share-link" ref={inputRef} readOnly value={url()} onFocus={(e) => e.target.select()} className="field text-sm" />
          </div>
        )}
      </div>
    </section>
  );
}
