import { Link } from '@/i18n/navigation';
import { Icon } from './Icon';

/** The sacred path. Signal red is reserved for this and nothing else. */
export function EmergencyButton({ label, shortLabel }: { label: string; shortLabel: string }) {
  return (
    <Link
      href="/emergency"
      className="on-signal inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-signal px-4 py-2 text-lg font-bold text-white no-underline shadow-sm hover:bg-signal-dark md:w-auto"
      data-testid="header-emergency"
    >
      <Icon name="alert" className="size-6 shrink-0" />
      <span className="md:hidden">{shortLabel}</span>
      <span className="hidden md:inline">{label}</span>
    </Link>
  );
}
