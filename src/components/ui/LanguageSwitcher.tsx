"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { routing, type Locale } from "@/i18n/routing";

export default function LanguageSwitcher() {
  const pathname = usePathname();

  const currentLocale = routing.locales.find((locale) =>
    pathname.startsWith(`/${locale}`)
  ) || routing.defaultLocale;

  const switchLocale = (newLocale: Locale) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    return segments.join("/");
  };

  return (
    <div className="flex items-center gap-1 bg-surface rounded-full p-0.5">
      {routing.locales.map((locale) => (
        <Link
          key={locale}
          href={switchLocale(locale)}
          className={`px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider transition-all duration-300 ${
            currentLocale === locale
              ? "bg-mkn-red text-white shadow-sm"
              : "text-muted hover:text-foreground"
          }`}
        >
          {locale}
        </Link>
      ))}
    </div>
  );
}
