import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const el = ref.current!;
    const xTo = gsap.quickTo(el, 'x', { duration: 0.35, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.35, ease: 'power3.out' });

    const move = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      const interactive = (e.target as HTMLElement).closest('a, button, .skill-chip');
      el.classList.toggle('is-hover', !!interactive);
    };
    const hide = () => el.classList.add('is-hidden');
    const show = () => el.classList.remove('is-hidden');

    window.addEventListener('pointermove', move, { passive: true });
    document.documentElement.addEventListener('pointerleave', hide);
    document.documentElement.addEventListener('pointerenter', show);
    return () => {
      window.removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('pointerleave', hide);
      document.documentElement.removeEventListener('pointerenter', show);
    };
  }, []);

  return <div className="cursor" ref={ref} aria-hidden="true" />;
}
