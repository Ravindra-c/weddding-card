import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { musicConfig } from '../config/music';
import { getYouTubeId } from '../utils/helpers';

const MusicContext = createContext(null);

let ytApiPromise = null;
function loadYouTubeApi() {
  if (window.YT && window.YT.Player) return Promise.resolve(window.YT);
  if (!ytApiPromise) {
    ytApiPromise = new Promise((resolve, reject) => {
      const previous = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (typeof previous === 'function') previous();
        resolve(window.YT);
      };
      const s = document.createElement('script');
      s.src = 'https://www.youtube.com/iframe_api';
      s.async = true;
      s.onerror = () => {
        ytApiPromise = null;
        reject(new Error('YouTube API failed to load'));
      };
      document.head.appendChild(s);
    });
  }
  return ytApiPromise;
}

/**
 * status: 'idle' | 'playing' | 'paused'
 * Works with a YouTube link OR a local MP3 — see src/config/music.js
 * Buttons never get permanently disabled: a failed attempt can always be retried.
 */
export function MusicProvider({ children }) {
  const [status, setStatus] = useState('idle');
  const [muted, setMuted] = useState(false);
  const [started, setStarted] = useState(false);

  const hostRef = useRef(null);
  const ytRef = useRef(null);
  const ytReady = useRef(false);
  const audioRef = useRef(null);
  const modeRef = useRef(null); // 'youtube' | 'audio'
  const wantPlayRef = useRef(false);
  const mutedRef = useRef(false);

  const videoId = useMemo(() => getYouTubeId(musicConfig.youtubeUrl), []);

  const applyMute = useCallback((next) => {
    try {
      if (modeRef.current === 'youtube' && ytReady.current && ytRef.current) {
        if (next) ytRef.current.mute();
        else ytRef.current.unMute();
      }
      if (audioRef.current) audioRef.current.muted = next;
    } catch { /* ignore */ }
  }, []);

  // The real player state, not React state (React state can lag behind on phones).
  const isPlaying = useCallback(() => {
    if (modeRef.current === 'youtube' && ytReady.current && ytRef.current) {
      try {
        const s = ytRef.current.getPlayerState();
        return s === 1 || s === 3; // playing or buffering
      } catch { return false; }
    }
    return !!audioRef.current && !audioRef.current.paused;
  }, []);

  const setupAudio = useCallback(() => {
    if (audioRef.current) return audioRef.current;
    if (!musicConfig.audioUrl) return null;
    const a = new Audio();
    a.loop = musicConfig.loop;
    a.volume = musicConfig.volume;
    a.muted = mutedRef.current;
    a.preload = 'none';
    a.src = musicConfig.audioUrl;
    a.addEventListener('play', () => setStatus('playing'));
    a.addEventListener('pause', () => setStatus('paused'));
    a.addEventListener('error', () => setStatus('paused')); // e.g. mp3 missing: stay usable
    audioRef.current = a;
    return a;
  }, []);

  useEffect(() => {
    if (!musicConfig.enabled) return undefined;
    let cancelled = false;

    if (videoId) {
      modeRef.current = 'youtube';
      loadYouTubeApi()
        .then((YT) => {
          if (cancelled || !hostRef.current) return;
          const holder = document.createElement('div');
          hostRef.current.appendChild(holder);
          ytRef.current = new YT.Player(holder, {
            width: '200',
            height: '200',
            videoId,
            playerVars: {
              autoplay: 0, controls: 0, disablekb: 1, fs: 0, playsinline: 1, rel: 0,
              modestbranding: 1, loop: 1, playlist: videoId, origin: window.location.origin,
            },
            events: {
              onReady: (e) => {
                ytReady.current = true;
                e.target.setVolume(Math.round(musicConfig.volume * 100));
                applyMute(mutedRef.current);
                if (wantPlayRef.current) e.target.playVideo();
              },
              onStateChange: (e) => {
                const S = window.YT.PlayerState;
                if (e.data === S.PLAYING) setStatus('playing');
                else if (e.data === S.PAUSED) setStatus('paused');
                else if (e.data === S.ENDED && musicConfig.loop) e.target.playVideo();
              },
              onError: () => {
                // Video blocked / unavailable → try the local MP3.
                ytReady.current = false;
                modeRef.current = 'audio';
                const a = setupAudio();
                if (a && wantPlayRef.current) a.play().catch(() => setStatus('paused'));
              },
            },
          });
        })
        .catch(() => {
          modeRef.current = 'audio';
          setupAudio();
        });
    } else {
      modeRef.current = 'audio';
      setupAudio();
    }

    // When the guest returns to the tab, re-sync the button with what is really happening.
    const onVisible = () => {
      if (!document.hidden) setStatus(isPlaying() ? 'playing' : (s) => (s === 'idle' ? 'idle' : 'paused'));
    };
    document.addEventListener('visibilitychange', onVisible);

    return () => {
      cancelled = true;
      document.removeEventListener('visibilitychange', onVisible);
      try { ytRef.current?.destroy(); } catch { /* ignore */ }
      ytRef.current = null;
      ytReady.current = false;
      if (hostRef.current) hostRef.current.innerHTML = '';
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeAttribute('src');
        audioRef.current = null;
      }
    };
  }, [videoId, setupAudio, applyMute, isPlaying]);

  const play = useCallback(() => {
    if (!musicConfig.enabled) return;
    wantPlayRef.current = true;
    if (modeRef.current === 'youtube') {
      if (ytReady.current && ytRef.current) {
        try { ytRef.current.playVideo(); } catch { /* ignore */ }
      }
      // if not ready yet, onReady will start it (wantPlayRef is set)
    } else {
      const a = setupAudio();
      if (a) a.play().catch(() => setStatus('paused'));
    }
  }, [setupAudio]);

  const pause = useCallback(() => {
    wantPlayRef.current = false;
    try {
      if (modeRef.current === 'youtube' && ytReady.current && ytRef.current) ytRef.current.pauseVideo();
      else if (audioRef.current) audioRef.current.pause();
    } catch { /* ignore */ }
    setStatus('paused');
  }, []);

  /** Call from a click handler (the "Enter Invitation" button) — browsers need a user gesture. */
  const start = useCallback(() => {
    setStarted(true);
    play();
  }, [play]);

  const toggle = useCallback(() => (isPlaying() ? pause() : play()), [isPlaying, play, pause]);

  const toggleMute = useCallback(() => {
    const next = !mutedRef.current;
    mutedRef.current = next;
    setMuted(next);
    applyMute(next);
  }, [applyMute]);

  const value = useMemo(
    () => ({ enabled: musicConfig.enabled, status, muted, started, start, play, pause, toggle, toggleMute }),
    [status, muted, started, start, play, pause, toggle, toggleMute]
  );

  return (
    <MusicContext.Provider value={value}>
      {children}
      {/* Hidden YouTube player host. Kept at a real size (200x200) but invisible, because some mobile browsers refuse to play tiny players. */}
      <div
        ref={hostRef}
        aria-hidden="true"
        style={{ position: 'fixed', left: 0, bottom: 0, width: 200, height: 200, opacity: 0.01, pointerEvents: 'none', zIndex: -1, overflow: 'hidden' }}
      />
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error('useMusic must be used inside <MusicProvider>');
  return ctx;
}