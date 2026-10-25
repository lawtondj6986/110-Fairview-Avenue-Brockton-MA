import type { Metadata } from 'next';
import { AttorneyLine } from '@/components/AttorneyLine';
import { CallButton } from '@/components/CallButton';
import { Disclaimer } from '@/components/Disclaimer';
import { Logo } from '@/components/Logo';
import { site } from '@/config/site';
import { flatten, mergedCatalog } from '@/i18n/catalog';
import { localeConfigs } from '@/i18n/locales';
import { initLocale, type LocaleParams } from '@/lib/page';

export const metadata: Metadata = {
  title: 'Choose your language',
  robots: { index: false, follow: true },
};

function say(locale: string, key: string): string {
  return flatten(mergedCatalog(locale))[key] ?? key;
}

/**
 * Full-screen first-visit chooser. Every language speaks for itself (no flags).
 * Links are full page loads so the proxy stores the choice. The call button keeps
 * the emergency path one tap away even here.
 */
export default async function ChooseLanguagePage({ params }: LocaleParams) {
  await initLocale(params);
  return (
    <main id="main" className="on-navy min-h-dvh bg-navy text-ivory">
      <div className="mx-auto flex max-w-xl flex-col gap-6 px-4 py-8">
        <div className="flex items-center gap-3">
          <Logo className="size-12" />
          <span className="font-display text-xl font-semibold">{site.name}</span>
        </div>

        <h1 className="flex flex-col gap-1 text-2xl text-ivory">
          {localeConfigs.map((l) => (
            <span key={l.code} lang={l.code} className="first:text-3xl first:text-gold">
              {say(l.code, 'Chooser.title')}
            </span>
          ))}
        </h1>

        <ul className="flex flex-col gap-3" data-testid="language-options">
          {localeConfigs.map((l) => (
            <li key={l.code}>
              <a
                href={`/${l.code}`}
                lang={l.code}
                hrefLang={l.code}
                className="flex min-h-16 items-center justify-between rounded-xl bg-ivory px-5 text-2xl font-semibold text-navy no-underline shadow hover:bg-white"
              >
                {l.nativeName}
                <span aria-hidden="true">→</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="rounded-card border border-ivory/25 p-4">
          <ul className="mb-3 flex flex-col text-lg">
            {localeConfigs.map((l) => (
              <li key={l.code} lang={l.code}>
                {say(l.code, 'Chooser.callNow')}
              </li>
            ))}
          </ul>
          <CallButton label={localeConfigs.map((l) => say(l.code, 'MobileBar.call')).join(' · ')} emergency className="w-full" />
        </div>

        <AttorneyLine className="text-ivory/90" />
        <Disclaimer tone="dark" />
      </div>
    </main>
  );
}
