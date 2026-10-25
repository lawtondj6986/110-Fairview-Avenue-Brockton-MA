import { getTranslations } from 'next-intl/server';
import { CallButton } from '@/components/CallButton';
import { Link } from '@/i18n/navigation';

export default async function NotFound() {
  const t = await getTranslations('NotFound');
  const tContact = await getTranslations('Contact');
  return (
    <div className="max-w-2xl py-10">
      <h1 className="text-3xl">{t('title')}</h1>
      <p className="mt-3 text-lg">{t('text')}</p>
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <CallButton label={tContact('primary')} />
        <Link href="/" className="inline-flex min-h-tap items-center text-lg">
          {t('home')}
        </Link>
      </div>
    </div>
  );
}
