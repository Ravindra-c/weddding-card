import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

const PETAL_COLORS = ['#E58A1F', '#F2B544', '#C9485B', '#FFF1CC', '#FFFDF5'];

/**
 * Lightweight canvas particle layer. Drop it inside any `relative` section.
 *  variant="petals" → slowly falling marigold / jasmine petals
 *  variant="gold"   → softly glowing golden dust drifting upward
 * One <canvas>, 10–35 particles, pauses when off-screen or tab hidden,
 * fewer particles on phones, disabled when the user prefers reduced motion.
 */
export default function PetalAnimation({ variant = 'petals', density = 1, className = '' }) {
  const canvasRef = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return undefined;
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return undefined;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let raf = 0;
    let last = 0;
    let visible = false;
    let particles = [];
    const rnd = (a, b) => a + Math.random() * (b - a);

    const make = (initial) => {
      if (variant === 'gold') {
        return { x: rnd(0, w), y: initial ? rnd(0, h) : h + 10, r: rnd(0.8, 2.4), vy: -rnd(5, 16), ph: rnd(0, 6.28), sp: rnd(0.6, 1.6), amp: rnd(4, 14) };
      }
      return {
        x: rnd(0, w), y: initial ? rnd(-20, h) : rnd(-60, -10), s: rnd(5, 10), vy: rnd(18, 38),
        ph: rnd(0, 6.28), sp: rnd(0.5, 1.2), amp: rnd(14, 34), rot: rnd(0, 6.28), vr: rnd(-1.2, 1.2),
        color: PETAL_COLORS[(Math.random() * PETAL_COLORS.length) | 0], a: rnd(0.55, 0.9), t: 0,
      };
    };

    const resize = () => {
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const phone = window.innerWidth < 640;
      const base = variant === 'gold' ? (phone ? 16 : 34) : phone ? 8 : 18;
      particles = Array.from({ length: Math.round(base * density) }, () => make(true));
    };

    const drawPetal = (p) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.scale(1, 0.55 + 0.45 * Math.abs(Math.cos(p.ph * 1.7)));
      ctx.globalAlpha = p.a;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.moveTo(0, -p.s);
      ctx.bezierCurveTo(p.s * 0.9, -p.s * 0.5, p.s * 0.7, p.s * 0.6, 0, p.s);
      ctx.bezierCurveTo(-p.s * 0.7, p.s * 0.6, -p.s * 0.9, -p.s * 0.5, 0, -p.s);
      ctx.fill();
      ctx.restore();
    };

    const tick = (now) => {
      if (!visible) { raf = 0; return; }
      const dt = Math.min((now - (last || now)) / 1000, 0.05);
      last = now;
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i];
        p.ph += p.sp * dt;
        p.x += Math.sin(p.ph) * p.amp * dt;
        p.y += p.vy * dt;
        if (variant === 'gold') {
          const a = 0.35 + 0.35 * Math.sin(p.ph * 2.2);
          ctx.fillStyle = `rgba(240,215,138,${a * 0.22})`;
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 3.2, 0, 6.2832); ctx.fill();
          ctx.fillStyle = `rgba(255,236,170,${a + 0.2})`;
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.2832); ctx.fill();
          if (p.y < -10) particles[i] = make(false);
        } else {
          p.rot += p.vr * dt;
          drawPetal(p);
          if (p.y > h + 20) particles[i] = make(false);
        }
        if (p.x < -30) p.x = w + 20;
        if (p.x > w + 30) p.x = -20;
      }
      raf = requestAnimationFrame(tick);
    };

    const start = () => { if (!raf && visible && !document.hidden) { last = 0; raf = requestAnimationFrame(tick); } };
    const stop = () => { if (raf) cancelAnimationFrame(raf); raf = 0; };

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; visible ? start() : stop(); }, { threshold: 0 });
    const ro = new ResizeObserver(resize);
    const onVis = () => (document.hidden ? stop() : start());

    resize();
    io.observe(parent);
    ro.observe(parent);
    document.addEventListener('visibilitychange', onVis);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [variant, density, reduce]);

  if (reduce) return null;
  return <canvas ref={canvasRef} aria-hidden="true" className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
}
