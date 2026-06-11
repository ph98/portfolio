import { useEffect, useRef, type ReactElement, cloneElement } from 'react';
import gsap from 'gsap';

// Wraps a single element and makes it gently follow the pointer (desktop only)
export default function Magnetic({ children, strength = 0.35 }: { children: ReactElement; strength?: number }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const el = ref.current;
    if (!el) return;

    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });

    const move = (e: MouseEvent) => {
      const { left, top, width, height } = el.getBoundingClientRect();
      xTo((e.clientX - (left + width / 2)) * strength);
      yTo((e.clientY - (top + height / 2)) * strength);
    };
    const leave = () => { xTo(0); yTo(0); };

    el.addEventListener('mousemove', move);
    el.addEventListener('mouseleave', leave);
    return () => {
      el.removeEventListener('mousemove', move);
      el.removeEventListener('mouseleave', leave);
    };
  }, [strength]);

  return cloneElement(children, { ref } as object);
}
