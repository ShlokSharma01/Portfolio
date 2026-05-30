import { useRef, useEffect } from 'react';
import { gsap } from '../lib/gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionLabel from './ui/SectionLabel';
import { experiences } from '../data/experience';

export default function Experience() {
  const sectionRef  = useRef<HTMLElement>(null);
  const lineRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {

      /* Timeline line draws itself on scroll */
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0, transformOrigin: 'top center' },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end:   'bottom 80%',
            scrub: 0.6,
          },
        },
      );

      /* Cards stagger-reveal */
      gsap.from('[data-er]', {
        opacity: 0,
        y: 48,
        stagger: 0.14,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 68%',
          once: true,
        },
      });

    }, sectionRef.current);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative overflow-hidden"
      style={{
        background: 'var(--bg-elev)',
        scrollMarginTop: '80px',
        paddingTop:    'clamp(6rem, 12vw, 10rem)',
        paddingBottom: 'clamp(6rem, 12vw, 10rem)',
      }}
    >
      {/* ── Texture (mirrored for variety) ───────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'url(/textures/bg-2.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: 'scaleX(-1)',
          opacity: 0.045,
          mixBlendMode: 'screen',
        }}
      />

      {/* ── Atmosphere glow ──────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="section-glow section-glow-2 absolute"
        style={{ width: '42vw', height: '42vw', left: '5%', top: '30%', opacity: 0.14 }}
      />

      {/* ── Ghost index number ────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute font-display font-bold select-none pointer-events-none"
        style={{
          fontSize: 'clamp(9rem, 22vw, 18rem)',
          lineHeight: 1,
          letterSpacing: '-0.04em',
          color: 'var(--text)',
          opacity: 0.03,
          top: '-1rem',
          left: '-1rem',
          zIndex: 0,
        }}
      >
        02
      </div>

      {/* ── Content ──────────────────────────────────────────────── */}
      <div className="relative px-6 md:px-14 lg:px-20 max-w-4xl mx-auto" style={{ zIndex: 2 }}>

        <div data-er>
          <SectionLabel number="02" label="Experience" />
        </div>

        {/* Optional editorial sub-heading */}
        <h2
          data-er
          className="font-display font-bold uppercase mb-12"
          style={{
            fontSize: 'clamp(2.4rem, 5vw, 4rem)',
            lineHeight: '0.92',
            letterSpacing: '-0.025em',
            color: 'var(--text)',
          }}
        >
          WHERE I'VE<br />
          <em style={{ color: 'var(--crimson)', fontStyle: 'italic' }}>SHIPPED.</em>
        </h2>

        {/* Timeline container */}
        <div className="relative">

          {/* Vertical line — GSAP drives scaleY */}
          <div
            ref={lineRef}
            aria-hidden="true"
            className="absolute left-[9px] top-2 bottom-2 w-px hidden md:block"
            style={{
              background: 'linear-gradient(to bottom, var(--crimson), var(--crimson-deep) 60%, transparent)',
              transformOrigin: 'top center',
              transform: 'scaleY(0)',
            }}
          />

          <div className="flex flex-col gap-8">
            {experiences.map((exp, i) => (
              <div
                key={exp.role}
                data-er
                className="md:pl-12 relative"
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-0 top-6 w-[18px] h-[18px] rounded-full border-2 hidden md:flex items-center justify-center"
                  style={{ borderColor: 'var(--crimson)', background: 'var(--bg-elev)', zIndex: 2 }}
                >
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--crimson)' }} />
                </div>

                {/* Card */}
                <div
                  className="experience-card rounded-xl overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, rgba(22,10,13,0.95) 0%, rgba(12,5,7,0.98) 100%)`,
                    border: '1px solid var(--line)',
                    borderLeft: '3px solid var(--crimson-deep)',
                    transition: 'transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = 'translateY(-4px)';
                    el.style.borderLeftColor = 'var(--crimson)';
                    el.style.boxShadow = '-4px 0 24px rgba(225,14,31,0.22)';
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = '';
                    el.style.borderLeftColor = 'var(--crimson-deep)';
                    el.style.boxShadow = '';
                  }}
                >
                  <div className="p-6 md:p-8">
                    {/* Header row — role large, date inline right */}
                    <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 mb-1">
                      <h3
                        className="font-display font-bold"
                        style={{
                          fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                          lineHeight: '1.05',
                          letterSpacing: '-0.015em',
                          color: 'var(--text)',
                        }}
                      >
                        {exp.role}
                      </h3>
                      <span
                        className="font-mono shrink-0"
                        style={{
                          fontSize: 'clamp(0.65rem, 1.2vw, 0.75rem)',
                          letterSpacing: '0.12em',
                          color: 'var(--text-muted)',
                          opacity: 0.7,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {exp.period}
                      </span>
                    </div>

                    {/* Company */}
                    <p
                      className="font-body text-sm font-medium mb-5"
                      style={{ color: 'var(--crimson)', letterSpacing: '0.02em' }}
                    >
                      {exp.company}
                    </p>

                    {/* Bullets */}
                    <ul className="space-y-1.5 mb-5">
                      {exp.bullets.map(b => (
                        <li key={b} className="flex gap-3">
                          <span style={{ color: 'var(--crimson-deep)', flexShrink: 0, marginTop: '0.1em' }}>—</span>
                          <span className="font-body text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                            {b}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {exp.tags.map(tag => (
                        <span
                          key={tag}
                          className="font-mono text-[0.6rem] tracking-widest uppercase px-2.5 py-1 rounded"
                          style={{
                            background: 'rgba(122,10,18,0.2)',
                            color: 'var(--crimson-glow)',
                            border: '1px solid rgba(122,10,18,0.4)',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
