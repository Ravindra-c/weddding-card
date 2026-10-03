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
 * status: 'idle' | 'playing' | 'paused' | 'error'
 * Works with a YouTube link OR a local MP3 — see src/config/music.js
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

  const videoId = useMemo(() => getYouTubeId(musicConfig.youtubeUrl), []);

  // ---- local MP3 helper (also used as a fallback when YouTube fails)
  const setupAudio = useCallback(() => {
    if (audioRef.current) return audioRef.current;
    if (!musicConfig.audioUrl) return null;
    const a = new Audio();
    a.loop = musicConfig.loop;
    a.volume = musicConfig.volume;
    a.preload = 'none';
    a.src = musicConfig.audioUrl;
    a.addEventListener('play', () => setStatus('playing'));
    a.addEventListener('pause', () => setStatus((s) => (s === 'error' ? s : 'paused')));
    a.addEventListener('error', () => setStatus('error'));
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
            width: '1',
            height: '1',
            videoId,
            playerVars: {
              autoplay: 0, controls: 0, disablekb: 1, fs: 0, playsinline: 1, rel: 0,
              modestbranding: 1, loop: 1, playlist: videoId, origin: window.location.origin,
            },
            events: {
              onReady: (e) => {
                ytReady.current = true;
                e.target.setVolume(Math.round(musicConfig.volume * 100));
                if (wantPlayRef.current) e.target.playVideo();
              },
              onStateChange: (e) => {
                const S = window.YT.PlayerState;
                if (e.data === S.PLAYING) setStatus('playing');
                else if (e.data === S.PAUSED) setStatus('paused');
                else if (e.data === S.ENDED && musicConfig.loop) e.target.playVideo();
              },
              onError: () => {
                // Video blocked / unavailable → try the local MP3, otherwise show disabled control.
                ytReady.current = false;
                modeRef.current = 'audio';
                const a = setupAudio();
                if (a && wantPlayRef.current) a.play().catch(() => setStatus('error'));
                else if (!a) setStatus('error');
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

    return () => {
      cancelled = true;
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
  }, [videoId, setupAudio]);

  const play = useCallback(() => {
    if (!musicConfig.enabled) return;
    wantPlayRef.current = true;
    if (modeRef.current === 'youtube') {
      if (ytReady.current && ytRef.current) {
        try { ytRef.current.playVideo(); } catch { setStatus('error'); }
      }
      // otherwise onReady will start it (wantPlayRef is set)
    } else {
      const a = setupAudio();
      if (!a) return setStatus('error');
      a.play().catch(() => setStatus('error'));
    }
  }, [setupAudio]);

  const pause = useCallback(() => {
    wantPlayRef.current = false;
    if (modeRef.current === 'youtube' && ytReady.current) {
      try { ytRef.current.pauseVideo(); } catch { /* ignore */ }
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
    setStatus((s) => (s === 'error' ? s : 'paused'));
  }, []);

  /** Call from a click handler (the "Enter Invitation" button) — browsers need a user gesture. */
  const start = useCallback(() => {
    setStarted(true);
    play();
  }, [play]);

  const toggle = useCallback(() => (status === 'playing' ? pause() : play()), [status, play, pause]);

  const toggleMute = useCallback(() => {
    setMuted((m) => {
      const next = !m;
      try {
        if (modeRef.current === 'youtube' && ytReady.current) next ? ytRef.current.mute() : ytRef.current.unMute();
        else if (audioRef.current) audioRef.current.muted = next;
      } catch { /* ignore */ }
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ enabled: musicConfig.enabled, status, muted, started, start, play, pause, toggle, toggleMute }),
    [status, muted, started, start, play, pause, toggle, toggleMute]
  );

  return (
    <MusicContext.Provider value={value}>
      {children}
      {/* Hidden YouTube player host (kept off-screen, not display:none, so playback is allowed) */}
      <div ref={hostRef} aria-hidden="true" style={{ position: 'fixed', width: 1, height: 1, left: -9999, top: 0, overflow: 'hidden', opacity: 0, pointerEvents: 'none' }} />
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error('useMusic must be used inside <MusicProvider>');
  return ctx;
}
