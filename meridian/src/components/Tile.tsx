import { Link } from '@/i18n/navigation';
import { Icon, type IconName } from './Icon';

/** Big icon + word tile. Emergency tile alone uses signal red. */
export function Tile({ href, icon, label, emergency = false }: { href: string; icon: IconName; label: string; emergency?: boolean }) {
  const colors = emergency
    ? 'on-signal bg-signal text-white hover:bg-signal-dark border-signal'
    : 'bg-white text-navy hover:border-teal border-navy/15';
  return (
    <Link
      href={href}
      className={`flex min-h-32 flex-col items-center justify-center gap-3 rounded-card border-2 p-4 text-center text-lg font-semibold no-underline shadow-sm ${colors}`}
    >
      <Icon name={icon} className="size-10" />
      <span>{label}</span>
    </Link>
  );
}
