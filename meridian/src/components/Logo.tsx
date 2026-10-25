/** Inline SVG logo: a meridian arc over a horizon — a line that connects places. */
export function Logo({ className = '', title }: { className?: string; title?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      focusable="false"
    >
      <circle cx="24" cy="24" r="23" fill="#14284B" />
      <path d="M24 6 A18 18 0 0 1 24 42" fill="none" stroke="#B8892E" strokeWidth="3" strokeLinecap="round" />
      <path d="M24 6 A18 18 0 0 0 24 42" fill="none" stroke="#F7F3EA" strokeWidth="1.5" strokeLinecap="round" opacity="0.55" />
      <line x1="8" y1="27" x2="40" y2="27" stroke="#F7F3EA" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="24" cy="27" r="3.5" fill="#B8892E" />
    </svg>
  );
}
