import { useEffect, useRef, useState } from 'react';
import { Lotus } from './Ornaments';

/**
 * Image with lazy loading, fade-in and a graceful placeholder when the file is missing.
 * Give the wrapper a size via className (e.g. "aspect-[3/4] w-full") or style.
 */
export default function Img({ src, alt, className = '', imgClassName = '', label, eager = false, style, objectPosition }) {
  const [state, setState] = useState('loading'); // loading | loaded | error
  const ref = useRef(null);

  useEffect(() => {
    setState('loading');
    const el = ref.current;
    if (el && el.complete && el.naturalWidth > 0) setState('loaded');
  }, [src]);

  return (
    <div className={`relative overflow-hidden bg-maroon-deep ${className}`} style={style}>
      {src && state !== 'error' && (
        <img
          ref={ref}
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setState('loaded')}
          onError={() => setState('error')}
          style={objectPosition ? { objectPosition } : undefined}
          className={`h-full w-full object-cover transition-opacity duration-700 ${state === 'loaded' ? 'opacity-100' : 'opacity-0'} ${imgClassName}`}
        />
      )}
      {state !== 'loaded' && (
        <div
          role={state === 'error' ? 'img' : undefined}
          aria-label={state === 'error' ? alt : undefined}
          aria-hidden={state === 'error' ? undefined : true}
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-maroon-deep via-maroon to-maroon-deep p-3 text-center text-gold/80"
        >
          <Lotus className={`h-1/4 max-h-16 min-h-8 w-auto opacity-80 ${state === 'loading' ? 'animate-glowPulse' : ''}`} />
          {state === 'error' && label && <span className="font-body text-[11px] leading-tight text-gold-light/70">{label}</span>}
        </div>
      )}
    </div>
  );
}
