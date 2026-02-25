'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

const LOCALES = [
  { code: 'en', label: 'English' },
  { code: 'ru', label: 'Русский' },
  { code: 'kk', label: 'Қазақша' },
];

export function LocaleNameSwitcher() {
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

  return (
    <div className="flex items-center justify-center gap-2" aria-label="Language">
      {LOCALES.map((l, i) => (
        <span key={l.code} className="flex items-center gap-2">
          {i > 0 && (
            <span className="text-text-muted/40 select-none" aria-hidden>·</span>
          )}
          {locale === l.code ? (
            <span aria-current="true" className="text-[13px] font-semibold text-text-primary select-none">
              {l.label}
            </span>
          ) : (
            <button
              onClick={() => handleLocaleChange(l.code)}
              disabled={isPending}
              className="text-[13px] font-normal text-text-muted hover:text-text-secondary transition-colors duration-150 select-none"
            >
              {l.label}
            </button>
          )}
        </span>
      ))}
    </div>
  );
}
