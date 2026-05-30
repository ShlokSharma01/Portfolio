import { useRef, useEffect } from 'react';
import { gsap } from '../lib/gsap';
import SectionLabel from './ui/SectionLabel';
import { skillGroups } from '../data/skills';

const GROUP_COLORS = ['#E10E1F', '#D4AF37', '#FF2D3F', '#D4AF37', '#A2969A', '#F5F1F0'];

/* ── Single tag — pure DOM hover, zero re-renders ────────────────────── */
function Tag({ skill, color }: { skill: string; color: string }) {
  return (
    <span
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.color = 'var(--crimson)';
        el.style.borderColor = 'rgba(225,14,31,0.45)';
        el.style.transform = 'scale(1.09) translateY(-2px)';
        el.style.background = 'rgba(225,14,31,0.07)';
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.color = '';
        el.style.borderColor = '';
        el.style.transform = '';
        el.style.background = '';
      }}
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
        transition: 'color 0.18s ease, border-color 0.18s ease, transform 0.18s ease, background 0.18s ease',
      }}
    >
      {skill}
    </span>
  );
}

/* ── Marquee row (Tools) ─────────────────────────────────────────────── */
function MarqueeRow({ skills, color }: { skills: string[]; color: string }) {
  // duplicate for seamless loop
  const doubled = [...skills, ...skills];
  return (
    <div
      style={{
        overflow: 'hidden',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
        maskImage:        'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
      }}
    >
      <div className="marquee-track" style={{ gap: '0.5rem' }}>
        {doubled.map((skill, i) => (
          <Tag key={`${skill}-${i}`} skill={skill} color={color} />
        ))}
      </div>
    </div>
  );
}

/* ── Section ──────────────────────────────────────────────────────────── */
export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-skr]', {
        opacity: 0,
        y: 36,
        stagger: 0.1,
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
      {/* ── Texture (mirrored) ───────────────────────────────────── */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'url(/textures/bg-2.webp)', backgroundSize: 'cover', transform: 'scaleX(-1)', opacity: 0.04, mixBlendMode: 'screen' }} />

      {/* ── Atmosphere ───────────────────────────────────────────── */}
      <div aria-hidden="true" className="section-glow section-glow-2 absolute"
        style={{ width: '44vw', height: '44vw', right: '5%', top: '20%', opacity: 0.12 }} />

      {/* ── Ghost index ──────────────────────────────────────────── */}
      <div aria-hidden="true" className="absolute font-display font-bold select-none pointer-events-none"
        style={{ fontSize: 'clamp(9rem, 22vw, 18rem)', lineHeight: 1, letterSpacing: '-0.04em', color: 'var(--text)', opacity: 0.03, top: '-1rem', left: '-1rem', zIndex: 0 }}>
        04
      </div>

      {/* ── Content ──────────────────────────────────────────────── */}
      <div className="relative px-6 md:px-14 lg:px-20 max-w-6xl mx-auto" style={{ zIndex: 2 }}>

        <div data-skr>
          <SectionLabel number="04" label="Stack" />
        </div>

        <h2 data-skr className="font-display font-bold uppercase mb-14"
          style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', lineHeight: '0.92', letterSpacing: '-0.025em', color: 'var(--text)' }}>
          MY <em style={{ color: 'var(--crimson)', fontStyle: 'italic' }}>ARSENAL.</em>
        </h2>

        {/* Category blocks */}
        <div className="space-y-10">
          {skillGroups.map((group, gi) => {
            const color   = GROUP_COLORS[gi];
            const isTools = group.label === 'Tools';

            return (
              <div key={group.label} data-skr>

                {/* Category name + rule */}
                <div className="flex items-center gap-4 mb-4">
                  <h3
                    className="font-display font-bold uppercase shrink-0"
                    style={{
                      fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
                      letterSpacing: '-0.02em',
                      lineHeight: 1,
                      color: 'var(--text)',
                    }}
                  >
                    {group.label}
                  </h3>
                  <div style={{ flex: 1, height: '1px', background: `linear-gradient(to right, ${color}40, transparent)` }} />
                </div>

                {/* Tags — marquee for Tools, static flex for the rest */}
                {isTools ? (
                  <MarqueeRow skills={group.skills} color={color} />
                ) : (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {group.skills.map(skill => (
                      <Tag key={skill} skill={skill} color={color} />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
