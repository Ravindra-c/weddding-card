import { useState } from 'react';
import { CheckCircle2, Send } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { submitRSVP } from '../config/rsvp';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';
import { GoldFrame } from '../components/Ornaments';

const OPTIONS = ['attend', 'maybe', 'decline'];

export default function RSVPSection() {
  const { t, guest, isTelugu } = useLang();
  const [form, setForm] = useState({ name: guest || '', guests: '1', attendance: 'attend', message: '', website: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [nameError, setNameError] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (form.website) return; // honeypot: bots fill this hidden field
    if (!form.name.trim()) { setNameError(true); return; }
    setNameError(false);
    setStatus('sending');
    try {
      await submitRSVP({
        name: form.name.trim(),
        guests: Number(form.guests),
        attendance: form.attendance,
        message: form.message.trim(),
      });
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const font = isTelugu ? 'font-teluguSans' : 'font-body';
  const label = `mb-2 block text-sm font-medium text-maroon ${font}`;

  return (
    <section id="rsvp" className="section-pad relative overflow-hidden bg-gradient-to-b from-cream to-ivory">
      <div className="container-wedding max-w-2xl">
        <SectionHeading title={t.rsvp.title} subtitle={t.rsvp.subtitle} />
        <Reveal variant="up">
          <GoldFrame className="bg-ivory p-6 shadow-[0_30px_60px_-34px_rgba(90,16,32,.5)] sm:p-10">
            {status === 'success' ? (
              <div role="status" className="py-8 text-center">
                <CheckCircle2 className="mx-auto h-14 w-14 text-gold-dark" aria-hidden="true" />
                <p className={`mt-4 text-xl text-maroon ${isTelugu ? 'font-telugu' : 'font-display'}`}>{t.rsvp.success}</p>
                <button type="button" className="btn-outline mt-6 text-maroon" onClick={() => { setStatus('idle'); setForm((f) => ({ ...f, message: '' })); }}>
                  {t.rsvp.another}
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="space-y-6">
                <div>
                  <label htmlFor="rsvp-name" className={label}>{t.rsvp.name}</label>
                  <input
                    id="rsvp-name"
                    type="text"
                    autoComplete="name"
                    maxLength={80}
                    value={form.name}
                    onChange={set('name')}
                    placeholder={t.rsvp.namePh}
                    aria-invalid={nameError}
                    aria-describedby={nameError ? 'rsvp-name-err' : undefined}
                    className={`field ${font} ${nameError ? '!border-red-700' : ''}`}
                  />
                  {nameError && <p id="rsvp-name-err" role="alert" className="mt-1.5 text-sm text-red-800">{t.rsvp.nameRequired}</p>}
                </div>

                <div>
                  <label htmlFor="rsvp-guests" className={label}>{t.rsvp.guests}</label>
                  <select id="rsvp-guests" value={form.guests} onChange={set('guests')} className={`field ${font}`}>
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>

                <fieldset>
                  <legend className={label}>{t.rsvp.attendance}</legend>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {OPTIONS.map((o) => (
                      <label key={o} className={`relative flex min-h-[52px] cursor-pointer items-center justify-center rounded-xl border px-3 py-3 text-center text-sm transition focus-within:ring-2 focus-within:ring-gold/60 ${font} ${form.attendance === o ? 'border-gold bg-gradient-to-br from-maroon to-maroon-deep text-gold-light shadow-md' : 'border-gold/40 bg-ivory text-bark hover:border-gold'}`}>
                        <input type="radio" name="attendance" value={o} checked={form.attendance === o} onChange={set('attendance')} className="sr-only" />
                        {t.rsvp[o]}
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div>
                  <label htmlFor="rsvp-msg" className={label}>{t.rsvp.message}</label>
                  <textarea id="rsvp-msg" rows={4} maxLength={500} value={form.message} onChange={set('message')} placeholder={t.rsvp.messagePh} className={`field resize-y ${font}`} />
                </div>

                {/* honeypot — hidden from people, visible to bots */}
                <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                  <label>Website<input tabIndex={-1} autoComplete="off" value={form.website} onChange={set('website')} /></label>
                </div>

                {status === 'error' && <p role="alert" className="text-sm text-red-800">{t.rsvp.error}</p>}

                <div className="text-center">
                  <button type="submit" disabled={status === 'sending'} className={`btn-gold !text-gold-light disabled:opacity-60 ${font}`} style={{ background: 'linear-gradient(110deg,#5A1020,#7A1830)' }}>
                    <Send size={18} aria-hidden="true" />
                    {status === 'sending' ? t.rsvp.sending : t.rsvp.submit}
                  </button>
                </div>
              </form>
            )}
          </GoldFrame>
        </Reveal>
      </div>
    </section>
  );
}
