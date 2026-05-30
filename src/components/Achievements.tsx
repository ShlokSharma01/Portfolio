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
      {/* ── Texture ──────────────────────────────────────────────── */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'url(/textures/bg-1.png)', backgroundSize: 'cover', opacity: 0.04, mixBlendMode: 'screen' }} />

      {/* ── Atmosphere ───────────────────────────────────────────── */}
      <div aria-hidden="true" className="section-glow section-glow-1 absolute"
        style={{ width: '40vw', height: '40vw', left: '10%', top: '10%', opacity: 0.12 }} />

      {/* ── Ghost index ──────────────────────────────────────────── */}
      <div aria-hidden="true" className="absolute font-display font-bold select-none pointer-events-none"
        style={{ fontSize: 'clamp(9rem, 22vw, 18rem)', lineHeight: 1, letterSpacing: '-0.04em', color: 'var(--text)', opacity: 0.03, top: '-1rem', right: '0', zIndex: 0 }}>
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
          <em style={{ color: 'var(--crimson)', fontStyle: 'italic' }}>SPEAK.</em>
        </h2>

        {/* ── Stat counters with pulse glow ─────────────────────── */}
        <div className="grid grid-cols-3 gap-6 mb-16" data-achr>
          {stats.map(({ value, suffix, label, href }) => (
            <div key={label} className="text-center relative">

              {/* Pulsing crimson glow behind the number */}
              <div
                aria-hidden="true"
                className="stat-glow absolute rounded-full pointer-events-none"
                style={{
                  width:    '120px',
                  height:   '120px',
                  top:      '50%',
                  left:     '50%',
                  transform:'translate(-50%,-50%)',
                  background: 'var(--crimson)',
                  filter:   'blur(38px)',
                  opacity:  0.14,
                }}
              />

              <p
                className="font-display font-bold relative"
                style={{
                  fontSize:   'clamp(3rem, 7vw, 5.5rem)',
                  lineHeight: 1,
                  color:      'var(--text)',
                  letterSpacing: '-0.02em',
                }}
              >
                <Counter to={value} suffix={suffix} duration={2} />
              </p>

              <p
                className="font-mono text-[0.6rem] tracking-[0.2em] uppercase mt-3 whitespace-pre-line leading-relaxed"
                style={{ color: 'var(--text-muted)' }}
              >
                {href ? (
                  <a href={href} target="_blank" rel="noopener noreferrer"
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
          {highlights.map(({ icon, title, sub }, i) => (
            <div
              key={title}
              data-achr
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = 'translateY(-5px)';
                el.style.borderColor = 'rgba(225,14,31,0.3)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = '';
                el.style.borderColor = '';
              }}
              className="rounded-xl p-6"
              style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--line)',
                transition: 'transform 0.25s ease, border-color 0.25s ease',
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
