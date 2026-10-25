import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { officeOneLine, site, telHref } from '@/config/site';
import { AttorneyLine } from './AttorneyLine';
import { Disclaimer } from './Disclaimer';

export async function Footer() {
  const t = await getTranslations('Footer');
  const year = new Date().getFullYear();
  return (
    <footer className="on-navy mt-16 bg-navy text-ivory" data-testid="site-footer">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-2">
        <div>
          <h2 className="font-display text-xl text-gold">{t('officeHeading')}</h2>
          <address className="mt-3 not-italic">
            <p className="font-semibold">{site.name}</p>
            <p>{officeOneLine}</p>
            <p className="mt-2">
              {t('phone')}:{' '}
              <a className="text-ivory underline" href={telHref(site.phone.tel)}>
                {site.phone.display}
              </a>
            </p>
            <p>
              {t('email')}: <span>{site.email}</span>
            </p>
            <p>
              {t('hours')}: <span>{site.hours}</span>
            </p>
          </address>
          <AttorneyLine className="mt-4 text-ivory/90" />
        </div>
        <div>
          <h2 className="font-display text-xl text-gold">{t('linksHeading')}</h2>
          <ul className="mt-3 flex flex-wrap gap-x-2">
            {(['privacy', 'disclaimer', 'accessibility'] as const).map((k) => (
              <li key={k}>
                <Link href={`/${k}`} className="inline-flex min-h-tap items-center px-1 text-ivory underline">
                  {t(k)}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <Disclaimer tone="dark" />
          </div>
        </div>
      </div>
      <p className="border-t border-ivory/15 px-4 py-4 text-center text-[1rem] text-ivory/80">{t('copyright', { year })}</p>
    </footer>
  );
}
