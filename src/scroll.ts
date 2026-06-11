import Lenis from 'lenis';

// Singleton holder so nav links and sections can trigger smooth scrolls
export const scroller: { lenis: Lenis | null } = { lenis: null };

export function scrollToSection(selector: string) {
  const target = document.querySelector(selector);
  if (!target) return;
  if (scroller.lenis) {
    scroller.lenis.scrollTo(target as HTMLElement, { offset: 0, duration: 1.4 });
  } else {
    target.scrollIntoView({ behavior: 'smooth' });
  }
}

export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;
