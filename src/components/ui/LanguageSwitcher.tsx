'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleLocaleChange = (newLocale: string) => {
    startTransition(() => {
      const search = searchParams.toString();
      const target = search ? `${pathname}?${search}` : pathname;
      router.replace(target, { locale: newLocale });
    });
  };

  const locales = [
    { code: 'en', label: 'EN' },
    { code: 'ru', label: 'RU' },
    { code: 'kk', label: 'KK' },
  ];

  return (
    <div className="flex items-center gap-1 bg-surface/50 border border-border rounded-full p-1" aria-label="Language Switcher">
      {locales.map((l) => (
        <button
          key={l.code}
          onClick={() => handleLocaleChange(l.code)}
          disabled={isPending}
          className={`
            text-[13px] font-medium px-2 py-1 rounded-full transition-all duration-200 select-none
            ${
              locale === l.code
                ? 'bg-white text-text-primary shadow-sm border border-black/4'
                : 'text-text-muted hover:text-text-primary hover:bg-black/2 border border-transparent'
            }
          `}
          aria-pressed={locale === l.code}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
