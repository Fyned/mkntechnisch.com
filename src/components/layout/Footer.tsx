"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Phone, Mail, MapPin } from "lucide-react";
import { useTheme } from "@/components/ui/ThemeProvider";

export default function Footer() {
  const t = useTranslations();
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "nl";
  const { theme, mounted } = useTheme();

  const footerLogoSrc = mounted
    ? (theme === "light"
        ? "/mkn-header-logo-red-dark.svg"
        : "/mkn-header-logo-red-black.svg")
    : "/mkn-header-logo-red-dark.svg"; // SSR default (light)

  const navLinks = [
    { href: `/${locale}`, label: t("nav.home") },
    { href: `/${locale}/over-ons`, label: t("nav.about") },
    { href: `/${locale}/diensten`, label: t("nav.services") },
    { href: `/${locale}/projecten`, label: t("nav.projects") },
    { href: `/${locale}/contact`, label: t("nav.contact") },
  ];

  return (
    <footer className="relative z-10 bg-themed border-t border-themed">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Image
              src={footerLogoSrc}
              alt="MKN Technisch"
              width={180}
              height={47}
              className="w-[160px] h-auto mb-4"
            />
            <p className="text-sm text-subtle leading-relaxed">
              {locale === "nl"
                ? "Sloop, afbraak en ontmantelingswerken in heel België."
                : "Travaux de démolition et déconstruction dans toute la Belgique."}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-[family-name:var(--font-bebas-neue)] text-lg tracking-wider mb-4 text-foreground">
              {locale === "nl" ? "NAVIGATIE" : "NAVIGATION"}
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted hover:text-mkn-red transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-[family-name:var(--font-bebas-neue)] text-lg tracking-wider mb-4 text-foreground">
              {t("services.title").toUpperCase()}
            </h3>
            <ul className="space-y-2">
              <li className="text-sm text-muted">{t("services.demolition.title")}</li>
              <li className="text-sm text-muted">{t("services.stripping.title")}</li>
              <li className="text-sm text-muted">{t("services.deconstruction.title")}</li>
              <li className="text-sm text-muted">{t("services.groundwork.title")}</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-[family-name:var(--font-bebas-neue)] text-lg tracking-wider mb-4 text-foreground">
              CONTACT
            </h3>
            <div className="space-y-3">
              <a href="tel:+32472126216" className="flex items-center gap-2 text-sm text-muted hover:text-mkn-red transition-colors">
                <Phone className="w-4 h-4 shrink-0" />
                0472 12 62 16
              </a>
              <a href="tel:+32484471995" className="flex items-center gap-2 text-sm text-muted hover:text-mkn-red transition-colors">
                <Phone className="w-4 h-4 shrink-0" />
                0484 471 995
              </a>
              <a href="mailto:mkntechnischbv@gmail.com" className="flex items-center gap-2 text-sm text-muted hover:text-mkn-red transition-colors">
                <Mail className="w-4 h-4 shrink-0" />
                mkntechnischbv@gmail.com
              </a>
              <div className="flex items-start gap-2 text-sm text-muted">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                <span>Assesteenweg 65<br />1740 Ternat</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-themed py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-subtle">
            &copy; {new Date().getFullYear()} MKN Technisch BV &mdash; Grond Werken. {t("footer.rights")}.
          </p>
          <a href="https://dmckreatif.com" target="_blank" rel="noopener noreferrer" className="text-[10px] text-subtle hover:text-muted transition-colors">
            {t("footer.madeBy")} DMC Kreatif
          </a>
        </div>
      </div>
    </footer>
  );
}
