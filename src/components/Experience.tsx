import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { experience } from '../data';
import { prefersReducedMotion } from '../scroll';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Experience() {
  const rootRef = useRef<HTMLElement>(null);
  const bodyRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [open, setOpen] = useState<number>(0);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.job').forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    bodyRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.to(el, {
        height: i === open ? 'auto' : 0,
        duration: prefersReducedMotion() ? 0 : 0.7,
        ease: 'power3.inOut',
        onComplete: () => ScrollTrigger.refresh(),
      });
    });
  }, [open]);

  return (
    <section className="experience" id="experience" ref={rootRef}>
      <div className="container">
        <div className="section-head">
          <h2><span>Experience</span></h2>
          <span className="mono">02 — Where I've been</span>
        </div>
        <div>
          {experience.map((job, i) => (
            <article className={`job${open === i ? ' is-open' : ''}`} key={`${job.company}-${job.period}`}>
              <button
                className="job__head"
                onClick={() => setOpen(open === i ? -1 : i)}
                aria-expanded={open === i}
                aria-controls={`job-body-${i}`}
              >
                <span className="job__index">/{String(i + 1).padStart(2, '0')}</span>
                <span>
                  <span className="job__company">{job.company}</span>
                  <span className="job__role">{job.role}</span>
                </span>
                <span className="job__period">
                  {job.period}
                  <span className="place">{job.place}</span>
                </span>
              </button>
              <div
                className="job__body"
                id={`job-body-${i}`}
                ref={(el) => { bodyRefs.current[i] = el; }}
                style={{ height: i === 0 ? 'auto' : 0 }}
              >
                <div className="job__body-inner">
                  <div>
                    <p className="job__blurb">{job.blurb}</p>
                    <div className="job__tags">
                      {job.tags.map((t) => (
                        <span className="job__tag" key={t}>{t}</span>
                      ))}
                    </div>
                  </div>
                  <ul className="job__highlights">
                    {job.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
