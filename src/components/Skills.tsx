import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { skills } from '../data';
import { prefersReducedMotion } from '../scroll';

export default function Skills() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.skill-group').forEach((group) => {
        gsap.from(group.querySelectorAll('.skill-chip'), {
          y: 18,
          opacity: 0,
          duration: 0.6,
          stagger: 0.03,
          ease: 'power3.out',
          scrollTrigger: { trigger: group, start: 'top 85%' },
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="skills" id="skills" ref={rootRef}>
      <div className="container">
        <div className="section-head">
          <h2><span>Toolbox</span></h2>
          <span className="mono">03 — What I work with</span>
        </div>
        <div className="skills__grid">
          {skills.map((g, i) => (
            <div className="skill-group" key={g.group}>
              <h3 className="skill-group__title">
                {g.group} <em>/{String(i + 1).padStart(2, '0')}</em>
              </h3>
              <ul>
                {g.items.map((item) => (
                  <li className="skill-chip" key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
