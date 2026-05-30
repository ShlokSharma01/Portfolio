import { useRef, useEffect, lazy, Suspense } from 'react';
import { gsap } from '../lib/gsap';
import SectionLabel from './ui/SectionLabel';
import { skillGroups } from '../data/skills';

const SkillsBlob = lazy(() => import('./canvas/SkillsBlob'));

const GROUP_COLORS = ['#E10E1F', '#D4AF37', '#FF2D3F', '#D4AF37', '#A2969A', '#F5F1F0'];

/* ── Tag — magnetic hover (cursor-tracking offset, zero re-renders) ──── */
function Tag({ skill, color }: { skill: string; color: string }) {
  const isTouch = typeof window !== 'undefined'
    ? window.matchMedia('(pointer: coarse)').matches
    : false;

  const onMove = isTouch ? undefined : (e: React.MouseEvent<HTMLSpanElement>) => {
    const el = e.currentTarget as HTMLElement;
    const r  = el.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width  / 2)) * 0.28;
    const dy = (e.clientY - (r.top  + r.height / 2)) * 0.28;
    el.style.transform     = `translate(${dx}px,${dy}px) scale(1.06)`;
    el.style.color         = 'var(--crimson)';
    el.style.borderColor   = `${color}60`;
    el.style.background    = 'rgba(225,14,31,0.07)';
  };

  const onLeave = (e: React.MouseEvent<HTMLSpanElement>) => {
    const el = e.currentTarget as HTMLElement;
    el.style.transform   = '';
    el.style.color       = '';
    el.style.borderColor = '';
    el.style.background  = '';
  };

  return (
    <span
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: '0.68rem',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: 'var(--text-muted)',
        background: 'rgba(18, 8, 11, 0.88)',
        border: `1px solid ${color}30`,
        padding: '0.4rem 0.9rem',
        borderRadius: '4px',
        display: 'inline-block',
        cursor: 'default',
        userSelect: 'none',
        whiteSpace: 'nowrap',
        flexShrink: 0,
        willChange: 'transform',
        transition:
          'color 0.18s ease, border-color 0.18s ease, background 0.18s ease, transform 0.15s ease',
      }}
    >
      {skill}
    </span>
  );
}

/* ── Marquee for Tools row ───────────────────────────────────────────── */
function MarqueeRow({ skills, color }: { skills: string[]; color: string }) {
  const doubled = [...skills, ...skills];
  return (
    <div style={{
      overflow: 'hidden',
      WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
      maskImage:        'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
    }}>
      <div className="marquee-track" style={{ gap: '0.5rem' }}>
        {doubled.map((s, i) => <Tag key={`${s}-${i}`} skill={s} color={color} />)}
      </div>
    </div>
  );
}

/* ── Section ──────────────────────────────────────────────────────────── */
export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-skr]', {
        opacity: 0,
        y: 36,
        stagger: 0.09,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
          once: true,
        },
      });
    }, sectionRef.current);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative overflow-hidden"
      style={{
        background: 'var(--bg-elev)',
        scrollMarginTop: '80px',
        paddingTop:    'clamp(6rem, 12vw, 10rem)',
        paddingBottom: 'clamp(6rem, 12vw, 10rem)',
      }}
    >
      {/* ════ Gradient mesh — pure CSS ════ */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <div className="mesh-blob absolute" style={{
          width: '65vw', height: '65vw', borderRadius: '50%',
          right: '-10%', top: '-15%',
          background: 'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(122,10,18,0.12) 0%, rgba(225,14,31,0.04) 45%, transparent 70%)',
          animation: 'mesh-a 26s ease-in-out infinite', willChange: 'transform',
        }} />
        <div className="mesh-blob absolute" style={{
          width: '50vw', height: '50vw', borderRadius: '50%',
          left: '-8%', bottom: '-12%',
          background: 'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(225,14,31,0.08) 0%, transparent 65%)',
          animation: 'mesh-b 32s ease-in-out infinite reverse', willChange: 'transform',
        }} />
        <div className="mesh-blob absolute" style={{
          width: '38vw', height: '38vw', borderRadius: '50%',
          left: '30%', bottom: '5%',
          background: 'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(212,175,55,0.05) 0%, transparent 60%)',
          animation: 'mesh-c 40s ease-in-out infinite', willChange: 'transform',
        }} />
      </div>

      {/* Ghost index */}
      <div aria-hidden="true" className="absolute font-display font-bold select-none pointer-events-none"
        style={{ fontSize: 'clamp(9rem, 22vw, 18rem)', lineHeight: 1, letterSpacing: '-0.04em', color: 'var(--text)', opacity: 0.028, top: '-1rem', left: '-1rem', zIndex: 0 }}>
        04
      </div>

      {/* ── Content ──────────────────────────────────────────────── */}
      <div className="relative px-6 md:px-14 lg:px-20 max-w-7xl mx-auto" style={{ zIndex: 2 }}>

        <div data-skr>
          <SectionLabel number="04" label="Stack" />
        </div>

        <h2 data-skr className="font-display font-bold uppercase mb-12"
          style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', lineHeight: '0.92', letterSpacing: '-0.025em', color: 'var(--text)' }}>
          MY{' '}
          <em style={{
            color: 'var(--crimson)', fontStyle: 'italic',
            textShadow: '0 0 28px rgba(225,14,31,0.55), 0 0 70px rgba(225,14,31,0.18)',
          }}>
            ARSENAL.
          </em>
        </h2>

        {/* Two-column: category rows left | 3-D blob right (desktop only) */}
        <div className="grid md:grid-cols-[1fr_300px] lg:grid-cols-[1fr_360px] gap-10 lg:gap-16 items-center">

          {/* ── Category rows ──────────────────────────────────── */}
          <div className="space-y-9">
            {skillGroups.map((group, gi) => {
              const color   = GROUP_COLORS[gi];
              const isTools = group.label === 'Tools';
              return (
                <div key={group.label} data-skr>
                  <div className="flex items-center gap-4 mb-3">
                    <h3 className="font-display font-bold uppercase shrink-0"
                      style={{ fontSize: 'clamp(1.3rem, 2.8vw, 2rem)', letterSpacing: '-0.02em', lineHeight: 1, color: 'var(--text)' }}>
                      {group.label}
                    </h3>
                    <div style={{ flex: 1, height: '1px', background: `linear-gradient(to right, ${color}45, transparent)` }} />
                  </div>
                  {isTools ? (
                    <MarqueeRow skills={group.skills} color={color} />
                  ) : (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {group.skills.map(s => <Tag key={s} skill={s} color={color} />)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* ── 3-D blob — lazy, paused off-screen, hidden on mobile ── */}
          {!reducedMotion && (
            <div className="hidden md:flex items-center justify-center" data-skr
              style={{ height: '360px', position: 'relative' }}>
              {/* Soft crimson halo behind the blob */}
              <div aria-hidden="true" className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse 70% 70% at 50% 50%, rgba(225,14,31,0.09) 0%, transparent 70%)',
                  borderRadius: '50%',
                }}
              />
              <Suspense fallback={null}>
                <SkillsBlob />
              </Suspense>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
