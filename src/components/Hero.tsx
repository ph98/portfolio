import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { profile } from '../data';
import { prefersReducedMotion } from '../scroll';
import Magnetic from './Magnetic';

function Letters({ text, outline = false }: { text: string; outline?: boolean }) {
  return (
    <span className={`line${outline ? ' outline' : ''}`} aria-hidden="true">
      {text.split('').map((ch, i) => (
        <span key={i} className="letter">{ch === ' ' ? ' ' : ch}</span>
      ))}
    </span>
  );
}

export default function Hero({ ready }: { ready: boolean }) {
  const rootRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Intro timeline — fires once the preloader finishes
  useEffect(() => {
    if (!ready) return;
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return;
      gsap
        .timeline({ defaults: { ease: 'power4.out' } })
        .from('.hero__title .letter', {
          yPercent: 110,
          duration: 1.1,
          stagger: { each: 0.025, from: 'start' },
        })
        .from('.hero__meta, .hero__row', { y: 24, opacity: 0, duration: 0.9, stagger: 0.12 }, '-=0.6')
        .from(canvasRef.current, { opacity: 0, duration: 1.4, ease: 'power2.out' }, '-=0.8');
    }, rootRef);
    return () => ctx.revert();
  }, [ready]);

  // Interactive dot-field canvas
  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx2d = canvas.getContext('2d');
    if (!ctx2d) return;

    const reduced = prefersReducedMotion();
    let raf = 0;
    let running = true;
    let width = 0;
    let height = 0;
    let dots: { x: number; y: number; ox: number; oy: number; phase: number }[] = [];
    const mouse = { x: -9999, y: -9999 };
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const build = () => {
      const rect = canvas.parentElement!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx2d.setTransform(dpr, 0, 0, dpr, 0, 0);

      const gap = width < 720 ? 42 : 52;
      dots = [];
      for (let x = gap / 2; x < width; x += gap) {
        for (let y = gap / 2; y < height; y += gap) {
          dots.push({ x, y, ox: x, oy: y, phase: Math.random() * Math.PI * 2 });
        }
      }
    };

    const draw = (t: number) => {
      ctx2d.clearRect(0, 0, width, height);
      const time = t * 0.001;
      for (const d of dots) {
        const dx = d.ox - mouse.x;
        const dy = d.oy - mouse.y;
        const dist = Math.hypot(dx, dy);
        const radius = 180;
        let px = d.ox;
        let py = d.oy;
        let size = 1.1;
        let alpha = 0.16 + Math.sin(time * 0.8 + d.phase) * 0.06;

        if (dist < radius) {
          const force = (1 - dist / radius) ** 2;
          px += (dx / (dist || 1)) * force * 26;
          py += (dy / (dist || 1)) * force * 26;
          size = 1.1 + force * 1.8;
          alpha = Math.min(0.95, alpha + force * 0.85);
        }

        ctx2d.beginPath();
        ctx2d.arc(px, py, size, 0, Math.PI * 2);
        ctx2d.fillStyle =
          dist < radius * 0.55
            ? `rgba(212, 249, 62, ${alpha})`
            : `rgba(236, 235, 228, ${alpha})`;
        ctx2d.fill();
      }
      if (running && !reduced) raf = requestAnimationFrame(draw);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    const onVisibility = () => {
      running = document.visibilityState === 'visible';
      if (running && !reduced) raf = requestAnimationFrame(draw);
      else cancelAnimationFrame(raf);
    };

    build();
    if (reduced) draw(0);
    else raf = requestAnimationFrame(draw);

    window.addEventListener('resize', build);
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerleave', onLeave);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', build);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <section className="hero" id="top" ref={rootRef}>
      <div className="hero__canvas">
        <canvas ref={canvasRef} />
      </div>
      <div className="hero__content container">
        <div className="hero__meta mono">
          <span className="hero__status">
            <span className="dot" /> Available for work
          </span>
          <span>{profile.location}</span>
        </div>
        <h1 className="hero__title" aria-label={profile.name}>
          <Letters text="Parham" />
          <Letters text="Heydari" outline />
        </h1>
        <div className="hero__row">
          <p className="hero__tagline">
            <strong>{profile.role}.</strong> {profile.tagline} React, Next.js &
            TypeScript — for the last 10+ years.
          </p>
          <div className="hero__cta">
            <Magnetic>
              <a className="btn btn--accent" href={`mailto:${profile.email}`}>
                Get in touch ↗
              </a>
            </Magnetic>
            <Magnetic>
              <a className="btn" href={profile.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
