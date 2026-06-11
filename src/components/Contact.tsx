import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { profile } from '../data';
import { prefersReducedMotion } from '../scroll';
import Magnetic from './Magnetic';

export default function Contact() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from('.contact__title .line > span', {
        yPercent: 110,
        duration: 1.1,
        stagger: 0.12,
        ease: 'power4.out',
        scrollTrigger: { trigger: '.contact__title', start: 'top 82%' },
      });
      gsap.from('.contact__row', {
        y: 24,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.contact__row', start: 'top 92%' },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const year = new Date().getFullYear();

  return (
    <footer className="contact" id="contact" ref={rootRef}>
      <div className="container">
        <span className="mono">05 — Got a project in mind?</span>
        <h2 className="contact__title" style={{ marginTop: 24 }}>
          <span className="line"><span>Let's build</span></span>
          <span className="line">
            <span>
              <a href={`mailto:${profile.email}`} className="accent">something ↗</a>
            </span>
          </span>
        </h2>
        <div className="contact__row">
          <p className="hero__tagline">
            Open to senior front-end roles & collaborations.
            <br />
            EU Blue Card holder — open to relocation.
          </p>
          <div className="contact__links">
            <Magnetic>
              <a className="btn btn--accent" href={`mailto:${profile.email}`}>Email me</a>
            </Magnetic>
            <Magnetic>
              <a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            </Magnetic>
            <Magnetic>
              <a className="btn" href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
            </Magnetic>
          </div>
        </div>
      </div>
      <div className="footer__bar mono">
        <span>© {year} Parham Heydari</span>
        <span>Built with React, TypeScript & GSAP</span>
        <span>{profile.location}</span>
      </div>
    </footer>
  );
}
