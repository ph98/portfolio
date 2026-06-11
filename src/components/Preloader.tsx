import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { prefersReducedMotion } from '../scroll';

export default function Preloader({ onDone }: { onDone: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const root = rootRef.current!;
    if (prefersReducedMotion()) {
      root.style.display = 'none';
      onDone();
      return;
    }

    document.documentElement.style.overflow = 'hidden';
    const counter = { value: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        root.style.display = 'none';
        document.documentElement.style.overflow = '';
      },
    });
    tl.to(counter, {
      value: 100,
      duration: 1.5,
      ease: 'power3.inOut',
      onUpdate: () => {
        if (countRef.current) {
          countRef.current.textContent = String(Math.round(counter.value)).padStart(3, '0');
        }
      },
    })
      .add(() => onDone())
      .to(root, { yPercent: -100, duration: 0.9, ease: 'power4.inOut' }, '<');
  }, [onDone]);

  return (
    <div className="preloader" ref={rootRef} aria-hidden="true">
      <div className="preloader__name">Parham Heydari — Portfolio ©2026</div>
      <div className="preloader__count" ref={countRef}>000</div>
    </div>
  );
}
