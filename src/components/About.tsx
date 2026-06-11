import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { profile, stats } from '../data';
import { prefersReducedMotion } from '../scroll';

export default function About() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      // Words brighten as you scrub through the paragraph
      gsap.fromTo(
        '.about__text .word',
        { opacity: 0.15 },
        {
          opacity: 1,
          stagger: 0.04,
          ease: 'none',
          scrollTrigger: {
            trigger: '.about__text',
            start: 'top 80%',
            end: 'bottom 45%',
            scrub: true,
          },
        },
      );

      // Counter stats
      gsap.utils.toArray<HTMLElement>('.stat__value').forEach((el) => {
        const target = Number(el.dataset.value);
        const counter = { value: 0 };
        gsap.to(counter, {
          value: target,
          duration: 1.6,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
          onUpdate: () => {
            el.firstChild!.textContent = String(Math.round(counter.value));
          },
        });
      });

      gsap.from('.stat', {
        y: 32,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.about__stats', start: 'top 85%' },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="about" id="about" ref={rootRef}>
      <div className="container">
        <div className="section-head">
          <h2><span>About</span></h2>
          <span className="mono">01 — Who I am</span>
        </div>
        <p className="about__text">
          {profile.summary.split(' ').map((w, i) => (
            <span className="word" key={i}>{w}&nbsp;</span>
          ))}
        </p>
        <div className="about__stats">
          {stats.map((s) => (
            <div className="stat" key={s.label}>
              <div className="stat__value" data-value={s.value}>
                {s.value}
                <sup>{s.suffix}</sup>
              </div>
              <div className="mono">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
