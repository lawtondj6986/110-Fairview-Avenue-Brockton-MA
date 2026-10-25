import { getTranslations } from 'next-intl/server';
import { officeOneLine, site } from '@/config/site';

/** MA RPC 7.2: name of the lawyer responsible for content, on every page. */
export async function AttorneyLine({ className = '' }: { className?: string }) {
  const t = await getTranslations('Attorney');
  return (
    <p className={className} data-testid="attorney-line">
      {t('responsible', { name: site.attorney.name, title: site.attorney.title })}
      <br />
      {t('office', { address: officeOneLine })}
    </p>
  );
}
