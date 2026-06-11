import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { testimonials } from '../data';
import { prefersReducedMotion } from '../scroll';

export default function Testimonials() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from('.tcard', {
        y: 48,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.testimonials__grid', start: 'top 85%' },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="testimonials" ref={rootRef}>
      <div className="container">
        <div className="section-head">
          <h2><span>Kind words</span></h2>
          <span className="mono">04 — From colleagues</span>
        </div>
        <div className="testimonials__grid">
          {testimonials.map((t) => (
            <figure className="tcard" key={t.name}>
              <div className="tcard__mark">“</div>
              <blockquote className="tcard__quote">{t.quote}</blockquote>
              <figcaption>
                <div className="tcard__name">{t.name}</div>
                <div className="tcard__title">{t.title}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
