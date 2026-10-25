import { site, telHref } from '@/config/site';
import { Icon } from './Icon';

type Props = { label: string; emergency?: boolean; className?: string };

/** Primary action: a real tel: link. Shows the number so it can be read or copied. */
export function CallButton({ label, emergency = false, className = '' }: Props) {
  const phone = emergency ? site.emergencyPhone : site.phone;
  const colors = emergency
    ? 'bg-signal hover:bg-signal-dark text-white on-signal'
    : 'bg-teal hover:bg-teal-dark text-white';
  return (
    <a
      href={telHref(phone.tel)}
      className={`inline-flex min-h-14 items-center justify-center gap-3 rounded-xl px-6 py-3 text-lg font-semibold no-underline shadow-sm ${colors} ${className}`}
      data-testid={emergency ? 'call-emergency' : 'call-main'}
    >
      <Icon name="phone" className="size-6 shrink-0" />
      <span className="flex flex-col items-start leading-tight">
        <span>{label}</span>
        <span className="text-base font-normal opacity-90">{phone.display}</span>
      </span>
    </a>
  );
}
