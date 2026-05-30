import Lenis from 'lenis';
import { gsap, ScrollTrigger } from './gsap';

let instance: Lenis | null = null;

export function initLenis(): Lenis {
  instance = new Lenis({
    lerp: 0.1,          // snappier feel; raise toward 0.15 if you want more cushion
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
  } as ConstructorParameters<typeof Lenis>[0]);

  instance.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time: number) => {
    instance!.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  return instance;
}

export function getLenis(): Lenis | null {
  return instance;
}

/** Smooth-scroll to an anchor id, accounting for fixed nav height */
export function scrollToId(id: string, offset = -88): void {
  const target = document.getElementById(id);
  if (!target) return;
  if (instance) {
    instance.scrollTo(target, { offset });
  } else {
    target.scrollIntoView({ behavior: 'smooth' });
  }
}
