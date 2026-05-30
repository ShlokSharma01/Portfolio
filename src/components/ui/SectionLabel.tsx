interface Props {
  number: string;
  label: string;
  className?: string;
}

export default function SectionLabel({ number, label, className = '' }: Props) {
  return (
    <div className={`flex items-center gap-3 mb-14 ${className}`}>
      <span
        className="font-mono text-xs tracking-[0.3em] uppercase"
        style={{ color: 'var(--crimson)' }}
      >
        {number}
      </span>
      <div
        className="h-px w-10 shrink-0"
        style={{ background: 'var(--crimson-deep)' }}
      />
      <span
        className="font-mono text-xs tracking-[0.3em] uppercase"
        style={{ color: 'var(--text-muted)' }}
      >
        {label}
      </span>
    </div>
  );
}
