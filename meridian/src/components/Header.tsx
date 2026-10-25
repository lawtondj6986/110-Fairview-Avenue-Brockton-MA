import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { localeConfigs } from '@/i18n/locales';
import { EmergencyButton } from './EmergencyButton';
import { Icon } from './Icon';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Logo } from './Logo';
import { NAV } from '@/config/nav';


export async function Header() {
  const locale = await getLocale();
  const t = await getTranslations('Header');
  const tNav = await getTranslations('Nav');
  const tMeta = await getTranslations('Meta');
  const options = localeConfigs.map(({ code, nativeName }) => ({ code, nativeName }));

  return (
    <header className="on-navy bg-navy text-ivory">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-3 px-4 py-3">
        <Link href="/" className="flex min-h-tap items-center gap-2 text-ivory no-underline" aria-label={t('home')}>
          <Logo className="size-10 shrink-0" />
          <span className="font-display text-lg leading-tight font-semibold sm:text-xl">{tMeta('siteName')}</span>
        </Link>

        <nav aria-label={tNav('label')} className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className="flex min-h-tap items-center rounded-lg px-3 text-base text-ivory no-underline hover:bg-white/10"
                >
                  {tNav(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-1 lg:ml-0">
          <LanguageSwitcher current={locale} options={options} label={t('language')} />
          <details className="relative lg:hidden">
            <summary className="flex min-h-tap min-w-tap cursor-pointer list-none items-center justify-center gap-2 rounded-lg px-3 text-ivory hover:bg-white/10 [&::-webkit-details-marker]:hidden">
              <Icon name="menu" className="size-6" />
              <span className="text-base">{t('menu')}</span>
            </summary>
            <nav aria-label={tNav('label')} className="absolute right-0 z-50 mt-2 w-64 rounded-card border border-navy/15 bg-white p-2 shadow-lg">
              <ul>
                {NAV.map((item) => (
                  <li key={item.key}>
                    <Link href={item.href} className="flex min-h-tap items-center rounded-lg px-3 text-lg text-navy no-underline hover:bg-ivory">
                      {tNav(item.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </details>
        </div>

        <div className="w-full md:order-none md:w-auto">
          <EmergencyButton label={t('emergency')} shortLabel={t('emergencyShort')} />
        </div>
      </div>
    </header>
  );
}
