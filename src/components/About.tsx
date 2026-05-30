import { useRef, useEffect } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { gsap } from '../lib/gsap';
import SectionLabel from './ui/SectionLabel';

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  /* ── GSAP stagger entrance (unchanged) ─────────────────────── */
  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-ar]', {
        opacity: 0,
        y: 52,
        stagger: 0.11,
        duration: 0.95,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 74%',
          once: true,
        },
      });
    }, sectionRef.current);
    return () => ctx.revert();
  }, []);

  /* ── Scroll parallax — image drifts slower than text ────────── */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Image: shallow drift — feels further back
  const imgY = useTransform(
    scrollYProgress, [0, 1],
    reducedMotion ? [0, 0] : [18, -28],
  );
  // Text: deeper drift — feels closer to viewer
  const textY = useTransform(
    scrollYProgress, [0, 1],
    reducedMotion ? [0, 0] : [0, -52],
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden"
      style={{
        background: 'var(--bg)',
        scrollMarginTop: '80px',
        paddingTop: 'clamp(6rem, 12vw, 10rem)',
        paddingBottom: 'clamp(6rem, 12vw, 10rem)',
      }}
    >
      {/* ════════════════════════════════════════════════════════
          GRADIENT MESH — 3 blobs, pure CSS, no filter:blur.
          Each blob is a large soft radial-gradient div that
          animates only via transform (GPU composited).
          ════════════════════════════════════════════════════════ */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 0 }}
      >
        {/* Blob A — large warm crimson, right / top (behind image zone) */}
        <div
          className="mesh-blob absolute"
          style={{
            width: '80vw', height: '80vw',
            borderRadius: '50%',
            right: '-20%', top: '-15%',
            background:
              'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(225,14,31,0.13) 0%, rgba(122,10,18,0.06) 45%, transparent 70%)',
            animation: 'mesh-a 24s ease-in-out infinite',
            willChange: 'transform',
          }}
        />
        {/* Blob B — medium deep crimson, bottom-left */}
        <div
          className="mesh-blob absolute"
          style={{
            width: '55vw', height: '55vw',
            borderRadius: '50%',
            left: '-8%', bottom: '-18%',
            background:
              'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(122,10,18,0.11) 0%, transparent 65%)',
            animation: 'mesh-b 30s ease-in-out infinite',
            willChange: 'transform',
          }}
        />
        {/* Blob C — small gold accent, centre-right */}
        <div
          className="mesh-blob absolute"
          style={{
            width: '38vw', height: '38vw',
            borderRadius: '50%',
            right: '18%', bottom: '12%',
            background:
              'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(212,175,55,0.055) 0%, transparent 60%)',
            animation: 'mesh-c 40s ease-in-out infinite',
            willChange: 'transform',
          }}
        />
      </div>

      {/* ── Ghost index number ──────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute font-display font-bold select-none pointer-events-none"
        style={{
          fontSize: 'clamp(9rem, 22vw, 18rem)',
          lineHeight: 1,
          letterSpacing: '-0.04em',
          color: 'var(--text)',
          opacity: 0.032,
          top: '-1.5rem',
          right: '2rem',
          zIndex: 0,
        }}
      >
        01
      </div>

      {/* ── Abstract image — parallax (slower) ─────────────────── */}
      <motion.div
        aria-hidden="true"
        className="absolute hidden md:block pointer-events-none"
        style={{ right: '-4%', top: 0, bottom: 0, width: '58%', zIndex: 1, y: imgY }}
      >
        <div
          className="absolute inset-y-0 left-0 w-1/2 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, var(--bg) 0%, transparent 100%)',
            zIndex: 2,
          }}
        />
        <img
          src="/about-abstract.webp"
          alt=""
          width={1045}
          height={1400}
          loading="lazy"
          decoding="async"
          className="w-full h-full"
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
            opacity: 0.22,
            filter: 'saturate(0.4) brightness(0.75)',
          }}
        />
      </motion.div>

      {/* ── Content — parallax (faster, feels closer) ──────────── */}
      <motion.div
        className="relative px-6 md:px-14 lg:px-20 max-w-7xl mx-auto"
        style={{ zIndex: 3, y: textY }}
      >
        <div data-ar>
          <SectionLabel number="01" label="About" />
        </div>

        {/* Editorial headline */}
        <h2
          data-ar
          className="font-display font-bold uppercase"
          style={{
            fontSize: 'clamp(2.8rem, 8.5vw, 7rem)',
            lineHeight: '0.88',
            letterSpacing: '-0.028em',
            color: 'var(--text)',
            maxWidth: '14ch',
            marginBottom: 'clamp(2rem, 4vw, 3.5rem)',
          }}
        >
          I BUILD<br />
          TECHNOLOGY<br />
          THAT{' '}
          {/* Crimson emphasis word with glow */}
          <em
            style={{
              color: 'var(--crimson)',
              fontStyle: 'italic',
              textShadow:
                '0 0 28px rgba(225,14,31,0.55), 0 0 70px rgba(225,14,31,0.18)',
            }}
          >
            MATTERS.
          </em>
        </h2>

        {/* Bio */}
        <div style={{ maxWidth: '52ch' }}>
          <p
            data-ar
            className="font-body text-lg leading-relaxed mb-5"
            style={{ color: 'var(--text)' }}
          >
            Third-year B.Tech CSE student at{' '}
            <span
              style={{
                color: 'var(--crimson)',
                textShadow: '0 0 18px rgba(225,14,31,0.35)',
              }}
            >
              Sharda University
            </span>
            , Greater Noida. Currently a{' '}
            <span
              style={{
                color: 'var(--crimson)',
                textShadow: '0 0 18px rgba(225,14,31,0.35)',
              }}
            >
              Web Systems Engineer &amp; Data Analyst
            </span>{' '}
            at Coppersmith Creations (UK).
          </p>
          <p
            data-ar
            className="font-body text-base leading-relaxed"
            style={{ color: 'var(--text-muted)' }}
          >
            Building production web platforms, analytics pipelines, and
            data-driven operations — where software engineering meets
            real-world impact.
          </p>
        </div>

        {/* Stat row */}
        <div
          data-ar
          className="flex flex-wrap gap-10 mt-12 pt-10"
          style={{ borderTop: '1px solid var(--line)', maxWidth: '52ch' }}
        >
          {[
            { label: 'University', value: 'Sharda' },
            { label: 'Year',       value: '3rd'    },
            { label: 'Based in',   value: 'India'  },
          ].map(({ label, value }) => (
            <div key={label}>
              <p
                className="font-mono text-[0.6rem] tracking-[0.28em] uppercase mb-2"
                style={{ color: 'var(--text-muted)' }}
              >
                {label}
              </p>
              <p
                className="font-display font-bold text-2xl"
                style={{
                  color: 'var(--crimson)',
                  letterSpacing: '-0.01em',
                  textShadow: '0 0 16px rgba(225,14,31,0.3)',
                }}
              >
                {value}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
