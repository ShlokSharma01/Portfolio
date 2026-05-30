import { useRef, useEffect } from 'react';
import { useMotionValue, useTransform, animate, motion } from 'framer-motion';
import { gsap } from '../lib/gsap';
import SectionLabel from './ui/SectionLabel';
import { projects, type Project } from '../data/projects';

/* ── GitHub icon ─────────────────────────────────────────────────────── */
const GithubIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

/* ── Shared card hover logic (no React re-renders) ───────────────────── */
function useCardHover(glowIntensity = 0.22) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef  = useRef<HTMLImageElement>(null);

  const enter = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'translateY(-7px)';
      cardRef.current.style.boxShadow = `0 24px 64px rgba(225,14,31,${glowIntensity})`;
      cardRef.current.style.borderColor = 'rgba(225,14,31,0.45)';
    }
    if (imgRef.current) imgRef.current.style.transform = 'scale(1.06)';
  };
  const leave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = '';
      cardRef.current.style.boxShadow = '';
      cardRef.current.style.borderColor = '';
    }
    if (imgRef.current) imgRef.current.style.transform = '';
  };
  return { cardRef, imgRef, enter, leave };
}

/* ── Feature card (Hotel OS — full-width, horizontal) ────────────────── */
function FeatureCard({ project }: { project: Project }) {
  const { cardRef, imgRef, enter, leave } = useCardHover(0.28);

  return (
    <div
      data-pr
      ref={cardRef}
      onMouseEnter={enter}
      onMouseLeave={leave}
      className="rounded-2xl overflow-hidden mb-6"
      style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--line)',
        transition: 'transform 0.3s ease, box-shadow 0.35s ease, border-color 0.3s ease',
        willChange: 'transform',
      }}
    >
      <div className="grid md:grid-cols-2">
        {/* Image */}
        <div className="relative overflow-hidden" style={{ minHeight: '280px' }}>
          <img
            ref={imgRef}
            src={project.image}
            alt={project.title}
            width={1000}
            height={490}
            loading="lazy"
            decoding="async"
            className="w-full h-full absolute inset-0"
            style={{ objectFit: 'cover', transition: 'transform 0.55s ease' }}
            onError={e => { (e.currentTarget as HTMLImageElement).src = project.fallbackImage; }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to right, transparent 60%, var(--card-bg))',
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(to top, rgba(11,6,8,0.6) 0%, transparent 40%)' }}
          />
          {/* Live badge */}
          {project.live && (
            <span
              className="absolute top-4 left-4 font-mono text-[0.58rem] tracking-[0.2em] uppercase px-2.5 py-1 rounded-full"
              style={{ background: 'rgba(225,14,31,0.18)', color: 'var(--crimson-glow)', border: '1px solid var(--crimson-deep)' }}
            >
              ● live
            </span>
          )}
        </div>

        {/* Content */}
        <div className="relative p-8 md:p-10 flex flex-col justify-between" style={{ minHeight: '280px' }}>
          {/* Ghost index */}
          <div
            aria-hidden="true"
            className="absolute font-display font-bold select-none pointer-events-none"
            style={{ fontSize: '9rem', lineHeight: 1, letterSpacing: '-0.04em', color: 'var(--text)', opacity: 0.05, top: '-1rem', right: '1rem' }}
          >
            01
          </div>

          <div>
            <h3
              className="font-display font-bold"
              style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)', lineHeight: '1.0', letterSpacing: '-0.02em', color: 'var(--text)', marginBottom: '0.75rem' }}
            >
              {project.title}
            </h3>
            <p className="font-body text-sm leading-relaxed mb-5" style={{ color: 'var(--text-muted)', maxWidth: '42ch' }}>
              {project.hook}
            </p>
            <div className="flex flex-wrap gap-1.5 mb-6">
              {project.tech.map(t => (
                <span key={t} className="font-mono text-[0.58rem] tracking-wider uppercase px-2 py-0.5 rounded"
                  style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)', border: '1px solid var(--line)' }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <a href={project.repo} target="_blank" rel="noopener noreferrer"
              className="font-mono text-[0.65rem] tracking-[0.15em] uppercase px-4 py-2.5 rounded flex items-center gap-2"
              style={{ background: 'rgba(225,14,31,0.14)', color: 'var(--crimson-glow)', border: '1px solid var(--crimson-deep)', transition: 'background 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(225,14,31,0.28)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(225,14,31,0.14)'; }}
            >
              <GithubIcon /> GitHub
            </a>
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer"
                className="font-mono text-[0.65rem] tracking-[0.15em] uppercase px-4 py-2.5 rounded"
                style={{ background: 'var(--crimson)', color: '#fff', border: '1px solid var(--crimson-glow)', transition: 'opacity 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.82'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
              >
                Live Demo ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Regular card (with 3-D tilt + hover zoom) ───────────────────────── */
function RegularCard({ project, cardIndex }: { project: Project; cardIndex: number }) {
  const tiltRef = useRef<HTMLDivElement>(null);
  const { cardRef, imgRef, enter, leave } = useCardHover();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-6, 6]);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tiltRef.current) return;
    const r = tiltRef.current.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width  - 0.5);
    y.set((e.clientY - r.top)  / r.height - 0.5);
  };
  const onLeave = () => {
    animate(x, 0, { type: 'spring', stiffness: 300, damping: 28 });
    animate(y, 0, { type: 'spring', stiffness: 300, damping: 28 });
    leave();
  };

  const label = String(cardIndex + 1).padStart(2, '0');

  return (
    <motion.div data-pr style={{ perspective: '1000px' }}>
      <motion.div
        ref={tiltRef}
        onMouseMove={onMove}
        onMouseEnter={enter}
        onMouseLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="h-full"
      >
        <div
          ref={cardRef}
          className="h-full flex flex-col rounded-xl overflow-hidden"
          style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--line)',
            transition: 'box-shadow 0.35s ease, border-color 0.3s ease',
          }}
        >
          {/* Image */}
          <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
            <img
              ref={imgRef}
              src={project.image}
              alt={project.title}
              width={1000}
              height={490}
              loading="lazy"
              decoding="async"
              className="w-full h-full"
              style={{ objectFit: 'cover', transition: 'transform 0.55s ease' }}
              onError={e => { (e.currentTarget as HTMLImageElement).src = project.fallbackImage; }}
            />
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(to top, rgba(11,6,8,0.65) 0%, transparent 50%)' }} />
          </div>

          {/* Info */}
          <div className="flex flex-col flex-1 p-6 relative">
            {/* Ghost card index */}
            <div aria-hidden="true" className="absolute font-display font-bold select-none pointer-events-none"
              style={{ fontSize: '5.5rem', lineHeight: 1, letterSpacing: '-0.04em', color: 'var(--text)', opacity: 0.05, top: '-0.5rem', right: '0.75rem' }}>
              {label}
            </div>

            <h3
              className="font-display font-bold"
              style={{ fontSize: 'clamp(1.2rem, 2vw, 1.6rem)', lineHeight: '1.0', letterSpacing: '-0.015em', color: 'var(--text)', marginBottom: '0.6rem' }}
            >
              {project.title}
            </h3>
            <p className="font-body text-sm leading-relaxed flex-1 mb-4" style={{ color: 'var(--text-muted)' }}>
              {project.hook}
            </p>

            <div className="flex flex-wrap gap-1.5 mb-5">
              {project.tech.map(t => (
                <span key={t} className="font-mono text-[0.58rem] tracking-wider uppercase px-2 py-0.5 rounded"
                  style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)', border: '1px solid var(--line)' }}>
                  {t}
                </span>
              ))}
            </div>

            <div className="flex gap-2.5">
              <a href={project.repo} target="_blank" rel="noopener noreferrer"
                className="font-mono text-[0.62rem] tracking-[0.15em] uppercase px-3.5 py-2 rounded flex items-center gap-1.5"
                style={{ background: 'rgba(225,14,31,0.12)', color: 'var(--crimson-glow)', border: '1px solid var(--crimson-deep)', transition: 'background 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(225,14,31,0.25)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(225,14,31,0.12)'; }}
              >
                <GithubIcon /> GitHub
              </a>
              {project.live && (
                <a href={project.live} target="_blank" rel="noopener noreferrer"
                  className="font-mono text-[0.62rem] tracking-[0.15em] uppercase px-3.5 py-2 rounded"
                  style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)', border: '1px solid var(--line)', transition: 'color 0.2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'; }}
                >
                  Live ↗
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Section ──────────────────────────────────────────────────────────── */
export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-pr]', {
        opacity: 0,
        y: 50,
        stagger: 0.13,
        duration: 0.95,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          once: true,
        },
      });
    }, sectionRef.current);
    return () => ctx.revert();
  }, []);

  const [feature, ...rest] = projects;

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative overflow-hidden"
      style={{
        background: 'var(--bg)',
        scrollMarginTop: '80px',
        paddingTop:    'clamp(6rem, 12vw, 10rem)',
        paddingBottom: 'clamp(6rem, 12vw, 10rem)',
      }}
    >
      {/* ── Texture ──────────────────────────────────────────────── */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'url(/textures/bg-1.webp)', backgroundSize: 'cover', opacity: 0.04, mixBlendMode: 'screen' }} />

      {/* ── Atmosphere glow ──────────────────────────────────────── */}
      <div aria-hidden="true" className="section-glow section-glow-1 absolute"
        style={{ width: '40vw', height: '40vw', right: '10%', bottom: '10%', opacity: 0.12 }} />

      {/* ── Ghost section number ──────────────────────────────────── */}
      <div aria-hidden="true" className="absolute font-display font-bold select-none pointer-events-none"
        style={{ fontSize: 'clamp(9rem, 22vw, 18rem)', lineHeight: 1, letterSpacing: '-0.04em', color: 'var(--text)', opacity: 0.03, top: '-1rem', right: '0', zIndex: 0 }}>
        03
      </div>

      {/* ── Content ──────────────────────────────────────────────── */}
      <div className="relative px-6 md:px-14 lg:px-20 max-w-7xl mx-auto" style={{ zIndex: 2 }}>

        <div data-pr>
          <SectionLabel number="03" label="Selected Work" />
        </div>

        <h2 data-pr className="font-display font-bold uppercase mb-10"
          style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', lineHeight: '0.92', letterSpacing: '-0.025em', color: 'var(--text)' }}>
          THINGS I'VE<br />
          <em style={{ color: 'var(--crimson)', fontStyle: 'italic' }}>BUILT.</em>
        </h2>

        {/* Feature card */}
        <FeatureCard project={feature} />

        {/* 2-column grid for remaining cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {rest.map((p, i) => (
            <RegularCard key={p.id} project={p} cardIndex={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
