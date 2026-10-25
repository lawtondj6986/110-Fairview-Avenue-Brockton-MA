'use client';

import { useTranslations } from 'next-intl';

// Locale-aware error boundary. Never shows the error message or stack.
export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const t = useTranslations('Error');
  return (
    <div className="max-w-2xl py-10">
      <h1 className="text-3xl">{t('title')}</h1>
      <p className="mt-3 text-lg">{t('text')}</p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 inline-flex min-h-tap items-center rounded-xl bg-teal px-5 text-lg font-semibold text-white"
      >
        {t('retry')}
      </button>
    </div>
  );
}
