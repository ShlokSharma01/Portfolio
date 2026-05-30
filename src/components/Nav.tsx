import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { scrollToId } from '../lib/lenis';

const NAV_LINKS = [
  { label: 'About',   id: 'about' },
  { label: 'Work',    id: 'projects' },
  { label: 'Skills',  id: 'skills' },
  { label: 'Contact', id: 'contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const threshold = () => window.innerHeight * 0.88;
    const onScroll = () => setScrolled(window.scrollY > threshold());
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goto = (id: string) => {
    scrollToId(id);
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          background: scrolled ? 'var(--glass)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'blur(0px)',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'blur(0px)',
          borderBottom: scrolled ? '1px solid var(--line)' : '1px solid transparent',
          transition: 'background 0.5s ease, backdrop-filter 0.5s ease, border-color 0.5s ease',
        }}
        className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-14 lg:px-20 py-5"
      >
        {/* Logo */}
        <button
          onClick={() => scrollToId('hero', 0)}
          aria-label="Scroll to top"
          className="leading-none focus-visible:outline-none"
        >
          <img
            src="/favicon.png"
            alt="SS"
            width={38}
            height={38}
            decoding="async"
            className="rounded-md"
            style={{ filter: 'drop-shadow(0 0 8px rgba(225,14,31,0.5))' }}
          />
        </button>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-9" role="list">
          {NAV_LINKS.map(({ label, id }) => (
            <li key={id}>
              <button
                onClick={() => goto(id)}
                className="font-mono font-medium text-[0.7rem] tracking-[0.22em] uppercase transition-colors duration-200 hover:text-white"
                style={{ color: 'var(--text-muted)' }}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen(v => !v)}
        >
          {[0, 1, 2].map(i => (
            <span
              key={i}
              className="block h-px w-6 transition-all duration-300 origin-center"
              style={{
                background: 'var(--text-muted)',
                transform: menuOpen
                  ? i === 0 ? 'translateY(7px) rotate(45deg)'
                  : i === 2 ? 'translateY(-7px) rotate(-45deg)'
                  : 'scaleX(0)'
                  : 'none',
              }}
            />
          ))}
        </button>
      </motion.nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ duration: 0.3 }}
          className="fixed inset-y-0 right-0 z-40 w-72 flex flex-col justify-center gap-8 px-10 md:hidden"
          style={{
            background: 'var(--glass)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderLeft: '1px solid var(--line)',
          }}
        >
          {NAV_LINKS.map(({ label, id }, i) => (
            <motion.button
              key={id}
              onClick={() => goto(id)}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
              className="font-display font-bold text-2xl text-left hover:text-white transition-colors"
              style={{ color: 'var(--text-muted)' }}
            >
              {label}
            </motion.button>
          ))}
        </motion.div>
      )}
    </>
  );
}
