import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import SectionLabel from './ui/SectionLabel';

const socials = [
  {
    label: 'GitHub',
    href: 'https://github.com/ShlokSharma01',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/shlok-sharma-/',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'LeetCode',
    href: 'https://leetcode.com/u/shlok_sh01/',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
      </svg>
    ),
  },
  {
    label: 'GFG',
    href: 'https://www.geeksforgeeks.org/profile/user_i9wbg5mhuaq',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M21.45 14.315c-.143.28-.334.532-.565.745a3.69 3.69 0 01-1.104.695 4.51 4.51 0 01-1.58.256 4.44 4.44 0 01-2.515-.68l-.12-.09V14.3l.195.15c.346.259.74.45 1.162.56.421.112.857.155 1.29.127a2.67 2.67 0 001.065-.234 1.68 1.68 0 00.67-.6 1.53 1.53 0 00.225-.83 1.44 1.44 0 00-.195-.748 1.83 1.83 0 00-.555-.567 7.03 7.03 0 00-.99-.495c-.39-.158-.78-.323-1.17-.495a5.12 5.12 0 01-1.005-.608 2.7 2.7 0 01-.69-.878 2.63 2.63 0 01-.255-1.2 2.7 2.7 0 01.42-1.5 2.79 2.79 0 011.17-.99 4.33 4.33 0 011.77-.345 5.1 5.1 0 012.25.465v1.62a3.5 3.5 0 00-2.235-.69 2.7 2.7 0 00-.945.158 1.56 1.56 0 00-.66.45 1.12 1.12 0 00-.24.735c0 .27.068.51.202.72.135.21.34.4.614.57.277.17.645.35 1.11.533.39.157.77.322 1.14.495a5.3 5.3 0 011.02.622 2.8 2.8 0 01.705.908c.172.352.257.762.255 1.23a2.9 2.9 0 01-.36 1.432zM12 2.4A9.6 9.6 0 1 0 12 21.6 9.6 9.6 0 0 0 12 2.4zm0 1.6A8 8 0 1 1 12 20 8 8 0 0 1 12 4zm-1.65 4.35h3.3v1.32h-3.3v5.96h-1.5V9.67h-1.02V8.35h2.52zm3.9 0h1.5v7.28h-1.5z" />
      </svg>
    ),
  },
];

export default function Contact() {
  const sectionRef  = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  /* ── Subtle scroll parallax on the headline block ──────────── */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const headlineY = useTransform(
    scrollYProgress, [0, 1],
    reducedMotion ? [0, 0] : [18, -28],
  );

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative overflow-hidden"
      style={{
        background: 'var(--bg-elev)',
        scrollMarginTop: '80px',
        paddingTop:    'clamp(6rem, 12vw, 10rem)',
        paddingBottom: 'clamp(6rem, 12vw, 10rem)',
        paddingLeft:   'clamp(1.5rem, 3.5vw, 5rem)',
        paddingRight:  'clamp(1.5rem, 3.5vw, 5rem)',
      }}
    >
      {/* ════ Gradient mesh — pure CSS ════ */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        {/* Central headline glow — largest, directly behind text */}
        <div className="mesh-blob absolute" style={{
          width: '70vw', height: '70vw', borderRadius: '50%',
          left: '50%', top: '15%',
          transform: 'translateX(-50%)',
          background:
            'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(225,14,31,0.16) 0%, rgba(122,10,18,0.07) 40%, transparent 70%)',
          animation: 'mesh-a 24s ease-in-out infinite', willChange: 'transform',
        }} />
        {/* Flanking accent — lower left */}
        <div className="mesh-blob absolute" style={{
          width: '45vw', height: '45vw', borderRadius: '50%',
          left: '-8%', bottom: '5%',
          background:
            'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(122,10,18,0.11) 0%, transparent 65%)',
          animation: 'mesh-b 30s ease-in-out infinite reverse', willChange: 'transform',
        }} />
        {/* Gold shimmer — upper right */}
        <div className="mesh-blob absolute" style={{
          width: '32vw', height: '32vw', borderRadius: '50%',
          right: '-5%', top: '10%',
          background:
            'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(212,175,55,0.055) 0%, transparent 60%)',
          animation: 'mesh-c 38s ease-in-out infinite', willChange: 'transform',
        }} />
      </div>

      {/* Ghost index */}
      <div aria-hidden="true" className="absolute font-display font-bold select-none pointer-events-none"
        style={{ fontSize: 'clamp(9rem, 22vw, 18rem)', lineHeight: 1, letterSpacing: '-0.04em', color: 'var(--text)', opacity: 0.025, top: '-1rem', right: '1rem', zIndex: 0 }}>
        06
      </div>

      {/* ── Content ──────────────────────────────────────────────── */}
      <div className="relative max-w-3xl mx-auto text-center" style={{ zIndex: 2 }}>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex justify-center"
        >
          <SectionLabel number="06" label="Contact" />
        </motion.div>

        {/* Headline with scroll parallax */}
        <motion.div style={{ y: headlineY }}>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.1 }}
            className="font-display font-bold uppercase mt-4 mb-4"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              letterSpacing: '-0.02em',
              lineHeight: '0.92',
              color: 'var(--text)',
              textShadow: '0 0 60px rgba(225,14,31,0.22)',
            }}
          >
            Let's Build<br />
            <span style={{
              color: 'var(--crimson)',
              textShadow: '0 0 30px rgba(225,14,31,0.6), 0 0 80px rgba(225,14,31,0.2)',
            }}>
              Something.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-body text-base leading-relaxed mb-10"
            style={{ color: 'var(--text-muted)' }}
          >
            Open to collaborations, internships, and projects that push boundaries.
            Drop an email or find me on any of the platforms below.
          </motion.p>
        </motion.div>

        {/* Glass card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="rounded-2xl p-8 md:p-10"
          style={{ background: 'var(--card-bg)', border: '1px solid var(--line)' }}
        >
          {/* Email CTA */}
          <a
            href="mailto:shlok.spc83@gmail.com"
            className="inline-flex items-center gap-3 font-mono text-sm tracking-[0.15em] uppercase px-7 py-3.5 rounded-lg mb-8"
            style={{
              background: 'var(--crimson)',
              color: '#fff',
              border: '1px solid var(--crimson-glow)',
              boxShadow: '0 0 28px rgba(225,14,31,0.35)',
              transition: 'box-shadow 0.25s ease',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 48px rgba(225,14,31,0.6)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 28px rgba(225,14,31,0.35)'; }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            shlok.spc83@gmail.com
          </a>

          {/* Socials */}
          <div className="flex flex-wrap justify-center gap-3">
            {socials.map(({ label, href, icon }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2, borderColor: 'var(--crimson)', color: 'var(--text)' }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.18 }}
                className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase px-4 py-2.5 rounded-lg"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  color: 'var(--text-muted)',
                  border: '1px solid var(--line)',
                  textDecoration: 'none',
                }}
              >
                {icon}
                {label}
              </motion.a>
            ))}
          </div>

          {/* Resume */}
          <div className="mt-6 pt-6" style={{ borderTop: '1px solid var(--line)' }}>
            <a
              href="/resume.pdf"
              download
              className="font-mono text-xs tracking-[0.2em] uppercase inline-flex items-center gap-2"
              style={{ color: 'var(--gold)', transition: 'opacity 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.75'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Download Résumé
            </a>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="mt-20 text-center relative"
        style={{ zIndex: 2 }}
      >
        <div className="h-px w-24 mx-auto mb-6" style={{ background: 'var(--line)' }} />
        <p className="font-mono text-[0.62rem] tracking-[0.25em] uppercase" style={{ color: 'var(--text-muted)' }}>
          © 2026 Shlok Sharma
        </p>
      </motion.footer>
    </section>
  );
}
