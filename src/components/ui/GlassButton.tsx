import { motion } from 'framer-motion';
import { scrollToId } from '../../lib/lenis';

interface Props {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'default' | 'crimson';
  className?: string;
  as?: 'a' | 'button';
  target?: string;
  rel?: string;
  download?: boolean;
  disabled?: boolean;
}

const BASE: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.5rem',
  padding: '0.75rem 1.75rem',
  background: 'var(--card-bg)',
  color: 'var(--text)',
  fontFamily: '"JetBrains Mono", monospace',
  fontSize: '0.75rem',
  letterSpacing: '0.15em',
  textTransform: 'uppercase' as const,
  textDecoration: 'none',
  cursor: 'pointer',
  position: 'relative' as const,
  overflow: 'hidden' as const,
};

export default function GlassButton({
  children,
  href,
  onClick,
  variant = 'default',
  className = '',
  as: Tag = 'button',
  target,
  rel,
  download,
  disabled,
}: Props) {
  const handleClick = () => {
    onClick?.();
    if (href?.startsWith('#')) {
      scrollToId(href.slice(1));
    }
  };

  const style: React.CSSProperties = {
    ...BASE,
    border: variant === 'crimson' ? '1px solid var(--crimson)' : '1px solid var(--line)',
    opacity: disabled ? 0.5 : 1,
    cursor: disabled ? 'not-allowed' : 'pointer',
  };

  /* GET IN TOUCH — crimson fill sweeps left → right */
  if (variant === 'crimson' && Tag !== 'a') {
    return (
      <motion.button
        onClick={handleClick}
        disabled={disabled}
        initial="rest"
        whileHover="hover"
        whileTap={{ scale: 0.97 }}
        style={style}
        className={className}
      >
        <motion.span
          aria-hidden="true"
          variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'absolute', inset: 0,
            background: 'var(--crimson)',
            transformOrigin: 'left',
            zIndex: 0,
          }}
        />
        <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
      </motion.button>
    );
  }

  /* External anchor */
  if (Tag === 'a') {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        download={download}
        style={style}
        className={className}
        whileHover={{ y: -3, boxShadow: '0 10px 36px rgba(225,14,31,0.36)', borderColor: 'rgba(225,14,31,0.5)' }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.a>
    );
  }

  /* VIEW WORK — lift + crimson glow */
  return (
    <motion.button
      onClick={handleClick}
      disabled={disabled}
      style={style}
      className={className}
      whileHover={{ y: -3, boxShadow: '0 10px 36px rgba(225,14,31,0.36)', borderColor: 'rgba(225,14,31,0.5)' }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.button>
  );
}
