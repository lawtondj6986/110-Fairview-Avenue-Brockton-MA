import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { site, telHref } from '@/config/site';
import { Icon } from './Icon';

/** Sticky bottom bar on phones: Call + Emergency guide, always one thumb away. */
export async function MobileActionBar() {
  const t = await getTranslations('MobileBar');
  return (
    <nav
      aria-label={t('label')}
      className="no-print fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-navy/20 bg-white p-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] shadow-[0_-4px_12px_rgba(20,40,75,0.12)] md:hidden"
      data-testid="mobile-bar"
    >
      <a
        href={telHref(site.emergencyPhone.tel)}
        className="flex min-h-14 items-center justify-center gap-2 rounded-xl bg-teal text-lg font-semibold text-white no-underline"
        data-testid="mobile-call"
      >
        <Icon name="phone" />
        {t('call')}
      </a>
      <Link
        href="/emergency"
        className="on-signal flex min-h-14 items-center justify-center gap-2 rounded-xl bg-signal text-lg font-semibold text-white no-underline"
        data-testid="mobile-guide"
      >
        <Icon name="alert" />
        {t('guide')}
      </Link>
    </nav>
  );
}
