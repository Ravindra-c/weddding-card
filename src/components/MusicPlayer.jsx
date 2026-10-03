import { useState } from 'react';
import { Music2, Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { useMusic } from '../context/MusicContext';

/** Floating circular music control: play / pause / mute / unmute. */
export default function MusicPlayer() {
  const { t } = useLang();
  const { enabled, status, muted, toggle, toggleMute } = useMusic();
  const [tip, setTip] = useState(false);
  if (!enabled) return null;

  const playing = status === 'playing';
  const broken = status === 'error';
  const label = broken ? t.music.unavailable : playing ? t.music.pause : t.music.play;

  return (
    <div
      className="fixed z-40 flex flex-col items-end gap-2"
      style={{ right: 'max(1rem, env(safe-area-inset-right))', bottom: 'max(1rem, env(safe-area-inset-bottom))' }}
    >
      {tip && (
        <span role="tooltip" className="pointer-events-none rounded-full bg-maroon-deep/95 px-3 py-1 font-body text-xs text-gold-light shadow-lg ring-1 ring-gold/40">
          {t.music.label}
        </span>
      )}

      <button
        type="button"
        onClick={toggleMute}
        disabled={broken}
        aria-label={muted ? t.music.unmute : t.music.mute}
        aria-pressed={muted}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/60 bg-maroon-deep/85 text-gold-light shadow-lg backdrop-blur transition hover:scale-105 hover:bg-maroon disabled:opacity-40"
      >
        {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>

      <div className="relative">
        {playing && <span className="absolute inset-0 animate-ping rounded-full bg-gold/30" style={{ animationDuration: '2.6s' }} aria-hidden="true" />}
        <button
          type="button"
          onClick={toggle}
          disabled={broken}
          aria-label={label}
          title={t.music.label}
          onMouseEnter={() => setTip(true)}
          onMouseLeave={() => setTip(false)}
          onFocus={() => setTip(true)}
          onBlur={() => setTip(false)}
          className={`relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-gold bg-gradient-to-br from-maroon via-maroon-deep to-maroon text-gold-light shadow-[0_8px_30px_-6px_rgba(0,0,0,.6)] transition hover:scale-105 disabled:opacity-50 ${broken ? 'grayscale' : ''}`}
        >
          {/* rotating "record" ring while playing */}
          <span aria-hidden="true" className={`absolute inset-1 rounded-full border border-dashed border-gold/70 ${playing ? 'animate-spin' : ''}`} style={{ animationDuration: '8s' }} />
          <span className="relative">
            {playing ? <Pause size={20} fill="currentColor" /> : status === 'idle' || status === 'paused' ? <Play size={20} fill="currentColor" className="ml-0.5" /> : <Music2 size={20} />}
          </span>
        </button>
      </div>
    </div>
  );
}
