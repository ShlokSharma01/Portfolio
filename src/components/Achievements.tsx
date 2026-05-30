import { useRef, useEffect } from 'react';
import { gsap } from '../lib/gsap';
import SectionLabel from './ui/SectionLabel';
import Counter from './ui/Counter';

const stats = [
  { value: 158, suffix: '+', label: 'LeetCode\nProblems',      href: 'https://leetcode.com/u/shlok_sh01/' },
  { value: 140, suffix: '+', label: 'GeeksforGeeks\nProblems', href: 'https://www.geeksforgeeks.org/profile/user_i9wbg5mhuaq' },
  { value: 5,   suffix: '',  label: 'Hackathons\nEntered',     href: null },
];

const highlights = [
  {
    icon: '🏆',
    title: 'First Prize — IILM University Hackathon 2025',
    sub:   'Theme: Tech for Good',
  },
  {
    icon: '⚡',
    title: 'Multi-Hackathon Participant',
    sub:   'IILM · CodeAstraa · Technovation (Sharda) · PIC 2025 · Zomathon',
  },
  {
    icon: '📜',
    title: 'Complete AI & ML, Data Science Bootcamp',
    sub:   'Udemy Certification — 44 hrs',
  },
];

export default function Achievements() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-achr]', {
        opacity: 0,
        y: 40,
        stagger: 0.12,
        duration: 0.9,
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

  return (
    <section
      ref={sectionRef}
      id="achievements"
      className="relative overflow-hidden"
      style={{
        background: 'var(--bg)',
        scrollMarginTop: '80px',
        paddingTop:    'clamp(6rem, 12vw, 10rem)',
        paddingBottom: 'clamp(6rem, 12vw, 10rem)',
      }}
    >
      {/* ════ Gradient mesh — pure CSS ════ */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <div className="mesh-blob absolute" style={{
          width: '60vw', height: '60vw', borderRadius: '50%',
          left: '-5%', top: '-10%',
          background: 'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(122,10,18,0.13) 0%, rgba(225,14,31,0.05) 45%, transparent 70%)',
          animation: 'mesh-a 22s ease-in-out infinite', willChange: 'transform',
        }} />
        <div className="mesh-blob absolute" style={{
          width: '50vw', height: '50vw', borderRadius: '50%',
          right: '-8%', bottom: '-5%',
          background: 'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(225,14,31,0.09) 0%, transparent 65%)',
          animation: 'mesh-b 28s ease-in-out infinite reverse', willChange: 'transform',
        }} />
        <div className="mesh-blob absolute" style={{
          width: '35vw', height: '35vw', borderRadius: '50%',
          right: '20%', top: '10%',
          background: 'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(212,175,55,0.055) 0%, transparent 60%)',
          animation: 'mesh-c 36s ease-in-out infinite', willChange: 'transform',
        }} />
      </div>

      {/* Ghost index */}
      <div aria-hidden="true" className="absolute font-display font-bold select-none pointer-events-none"
        style={{ fontSize: 'clamp(9rem, 22vw, 18rem)', lineHeight: 1, letterSpacing: '-0.04em', color: 'var(--text)', opacity: 0.028, top: '-1rem', right: '0', zIndex: 0 }}>
        05
      </div>

      {/* ── Content ──────────────────────────────────────────────── */}
      <div className="relative px-6 md:px-14 lg:px-20 max-w-5xl mx-auto" style={{ zIndex: 2 }}>

        <div data-achr>
          <SectionLabel number="05" label="Highlights" />
        </div>

        <h2 data-achr className="font-display font-bold uppercase mb-14"
          style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', lineHeight: '0.92', letterSpacing: '-0.025em', color: 'var(--text)' }}>
          NUMBERS THAT<br />
          <em style={{
            color: 'var(--crimson)',
            fontStyle: 'italic',
            textShadow: '0 0 28px rgba(225,14,31,0.55), 0 0 70px rgba(225,14,31,0.18)',
          }}>
            SPEAK.
          </em>
        </h2>

        {/* ── HUGE stat counters ────────────────────────────────── */}
        <div className="grid grid-cols-3 gap-4 md:gap-8 mb-16" data-achr>
          {stats.map(({ value, suffix, label, href }) => (
            <div key={label} className="text-center relative py-6">

              {/* Pulsing glow — radial-gradient, no filter:blur, GPU-composited */}
              <div
                aria-hidden="true"
                className="stat-glow absolute rounded-full pointer-events-none"
                style={{
                  width:  '220px',
                  height: '220px',
                  top:    '50%',
                  left:   '50%',
                  transform: 'translate(-50%,-50%)',
                  background:
                    'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(225,14,31,0.32) 0%, rgba(225,14,31,0.1) 40%, transparent 70%)',
                  willChange: 'transform, opacity',
                }}
              />

              {/* HUGE number */}
              <p
                className="font-display font-bold relative"
                style={{
                  fontSize:      'clamp(4rem, 11vw, 8rem)',
                  lineHeight:    0.88,
                  letterSpacing: '-0.035em',
                  color:         'var(--text)',
                  textShadow:    '0 0 40px rgba(225,14,31,0.22)',
                }}
              >
                <Counter to={value} suffix={suffix} duration={2} />
              </p>

              <p
                className="font-mono text-[0.6rem] tracking-[0.2em] uppercase mt-4 whitespace-pre-line leading-relaxed"
                style={{ color: 'var(--text-muted)' }}
              >
                {href ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = ''; }}
                  >
                    {label}
                  </a>
                ) : label}
              </p>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="mb-12" style={{ height: '1px', background: 'var(--line)' }} />

        {/* ── Highlight cards ───────────────────────────────────── */}
        <div className="grid md:grid-cols-3 gap-5">
          {highlights.map(({ icon, title, sub }) => (
            <div
              key={title}
              data-achr
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform   = 'translateY(-5px)';
                el.style.borderColor = 'rgba(225,14,31,0.32)';
                el.style.boxShadow   = '0 16px 48px rgba(225,14,31,0.1)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform   = '';
                el.style.borderColor = '';
                el.style.boxShadow   = '';
              }}
              className="rounded-xl p-6"
              style={{
                background:  'var(--card-bg)',
                border:      '1px solid var(--line)',
                transition:  'transform 0.25s ease, border-color 0.25s ease, box-shadow 0.3s ease',
              }}
            >
              <span className="text-2xl mb-3 block" role="img" aria-hidden="true">{icon}</span>
              <p className="font-display font-bold leading-snug mb-2"
                style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)', color: 'var(--text)' }}>
                {title}
              </p>
              <p className="font-body text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                {sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
