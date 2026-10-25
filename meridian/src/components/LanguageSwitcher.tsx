'use client';

import { usePathname } from '@/i18n/navigation';
import { Icon } from './Icon';

type Option = { code: string; nativeName: string };
type Props = { current: string; options: Option[]; label: string };

/**
 * Plain links (full page loads) so the proxy saves the choice in the language cookie.
 * <details> keeps it usable even before JavaScript loads.
 */
export function LanguageSwitcher({ current, options, label }: Props) {
  const pathname = usePathname();
  const rest = pathname === '/' ? '' : pathname;
  const currentName = options.find((o) => o.code === current)?.nativeName ?? current;
  return (
    <details className="group relative">
      <summary
        className="flex min-h-tap cursor-pointer list-none items-center gap-2 rounded-lg px-3 text-ivory hover:bg-white/10 [&::-webkit-details-marker]:hidden"
        aria-label={`${label}: ${currentName}`}
      >
        <Icon name="globe" className="size-5" />
        <span lang={current} className="max-w-[9rem] truncate text-base">
          {currentName}
        </span>
      </summary>
      <ul className="absolute right-0 z-50 mt-2 w-60 rounded-card border border-navy/15 bg-white p-2 shadow-lg">
        {options.map((o) => (
          <li key={o.code}>
            <a
              href={`/${o.code}${rest}`}
              lang={o.code}
              hrefLang={o.code}
              aria-current={o.code === current ? 'true' : undefined}
              className="flex min-h-tap items-center rounded-lg px-3 text-lg text-navy no-underline hover:bg-ivory aria-[current=true]:font-semibold"
            >
              {o.nativeName}
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}
