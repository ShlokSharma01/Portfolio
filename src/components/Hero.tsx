import { useRef, useEffect, lazy, Suspense } from 'react';
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
} from 'framer-motion';
import GlassButton from './ui/GlassButton';

const HeroEmbers = lazy(() => import('./canvas/HeroEmbers'));

const HERO_VARIANTS = {
  hidden: { opacity: 0, y: 44 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Hero() {
  const videoRef    = useRef<HTMLVideoElement>(null);
  const sectionRef  = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  /* ── Cursor parallax — RAF-throttled, disabled when hero is off-screen ── */
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const vx = useSpring(rawX, { stiffness: 38, damping: 20 });
  const vy = useSpring(rawY, { stiffness: 38, damping: 20 });

  const heroVisible = useRef(true);
  const rafId = useRef(0);

  // Track hero visibility so we skip work when scrolled away
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { heroVisible.current = entry.isIntersecting; },
      { threshold: 0 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const onMove = (e: MouseEvent) => {
      if (!heroVisible.current) return;          // skip when hero is off-screen
      cancelAnimationFrame(rafId.current);        // batch to display frequency
      rafId.current = requestAnimationFrame(() => {
        rawX.set((e.clientX / window.innerWidth  - 0.5) * 18);
        rawY.set((e.clientY / window.innerHeight - 0.5) * 11);
      });
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId.current);
    };
  }, [reducedMotion, rawX, rawY]);

  /* ── Scroll-exit animation — text only (video stays static) ────────── */
  const { scrollY } = useScroll();
  const vh = useRef(typeof window !== 'undefined' ? window.innerHeight : 900);

  // Text block: drift upward + fade at half viewport scroll
  const textOpacity = useTransform(scrollY, [0, vh.current * 0.5], [1, 0]);
  const textY       = useTransform(scrollY, [0, vh.current * 0.5], [0, -50]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full overflow-hidden"
      style={{ height: '100dvh', minHeight: '600px' }}
      aria-label="Hero"
    >
      {/* ── LAYER 0: Atmospheric gradient placeholder ────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 65% 75% at 75% 48%, rgba(122,10,18,0.65) 0%, rgba(70,4,9,0.35) 45%, transparent 70%),
            radial-gradient(ellipse 40% 40% at 78% 40%, rgba(225,14,31,0.18) 0%, transparent 55%),
            #0B0608`,
        }}
      />

      {/* ── LAYER 1: Video with cursor-parallax + scroll-exit ────────── */}
      {!reducedMotion ? (
        <motion.div
          aria-hidden="true"
          className="absolute"
          style={{
            inset: '-3%',
            x: vx, y: vy,
          }}
        >
          <video
            ref={videoRef}
            className="w-full h-full"
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            autoPlay muted loop playsInline preload="metadata"
            poster="/hero-poster.png"
          >
            <source src="/hero.webm" type="video/webm" />
            <source src="/hero.mp4"  type="video/mp4"  />
          </video>
        </motion.div>
      ) : (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/hero-poster.png)' }}
          aria-hidden="true"
        />
      )}

      {/* ── LAYER 2: Left-to-right scrim (text protection) ───────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, rgba(8,4,5,0.92) 0%, rgba(8,4,5,0.55) 35%, transparent 55%)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none md:hidden"
        style={{ background: 'linear-gradient(90deg, rgba(8,4,5,0.20) 0%, transparent 60%)' }}
      />

      {/* ── LAYER 3: Global darken ────────────────────────────────────── */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none"
        style={{ background: 'rgba(8,4,5,0.15)' }} />

      {/* ── LAYER 4: Bottom vignette ──────────────────────────────────── */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(8,4,5,0.85) 0%, transparent 30%)' }} />

      {/* ── LAYER 5a: Radial text-column vignette ────────────────────── */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 3,
          background:
            'radial-gradient(ellipse 50% 80% at 22% 50%, rgba(4,2,3,0.55) 15%, transparent 72%)',
        }}
      />

      {/* ── LAYER 5b: Hero film grain (z-5, below text) ──────────────── */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 5,
          opacity: 0.045,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.80' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E\")",
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
        }}
      />

      {/* ── LAYER 7: Crimson embers (R3F, lazy) ──────────────────────── */}
      {!reducedMotion && (
        <Suspense fallback={null}>
          <HeroEmbers />
        </Suspense>
      )}

      {/* ── LAYER 8: Hero text — drifts up + fades on scroll ─────────── */}
      <motion.div
        className="relative z-10 h-full flex flex-col justify-center px-6 md:px-14 lg:px-20 max-w-[min(55%,680px)] lg:max-w-[50%]"
        style={reducedMotion ? {} : { opacity: textOpacity, y: textY }}
      >
        <motion.h1
          custom={0.20}
          variants={HERO_VARIANTS}
          initial="hidden"
          animate="visible"
          className="font-display font-bold uppercase"
          style={{
            fontSize: 'clamp(3.2rem, 9vw, 8rem)',
            fontWeight: 700,
            letterSpacing: '-0.025em',
            lineHeight: '0.88',
            color: 'var(--text)',
            textShadow: '0 0 40px rgba(225,14,31,0.28), 0 0 90px rgba(225,14,31,0.10)',
          }}
        >
          SHLOK<br />SHARMA
        </motion.h1>

        <motion.p
          custom={0.28}
          variants={HERO_VARIANTS}
          initial="hidden"
          animate="visible"
          className="font-mono font-bold mt-5 tracking-[0.22em] uppercase select-none"
          style={{ fontSize: 'clamp(0.72rem, 1.6vw, 1rem)', color: 'var(--text-muted)' }}
        >
          DEVELOPER{' '}
          <span style={{ color: 'var(--gold)' }}>·</span>
          {' '}DATA ANALYST{' '}
          <span style={{ color: 'var(--gold)' }}>·</span>
          {' '}DESIGNER
        </motion.p>

        <motion.div
          custom={0.36}
          variants={HERO_VARIANTS}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap gap-4 mt-9"
        >
          <GlassButton href="#projects">View Work</GlassButton>
          <GlassButton href="#contact" variant="crimson">Get in Touch</GlassButton>
        </motion.div>
      </motion.div>

      {/* ── Scroll cue ───────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 pointer-events-none select-none"
        aria-hidden="true"
      >
        <span
          className="font-mono text-[0.6rem] tracking-[0.3em] uppercase"
          style={{ color: 'var(--text-muted)' }}
        >
          scroll
        </span>
        <span className="scroll-cue-line" />
      </motion.div>
    </section>
  );
}
