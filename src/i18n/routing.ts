import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['nl', 'fr'],
  defaultLocale: 'nl',
  localePrefix: 'always',
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
