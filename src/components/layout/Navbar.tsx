"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useTheme } from "@/components/ui/ThemeProvider";

export default function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const { theme, mounted } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const locale = pathname.split("/")[1] || "nl";

  // Only the homepage has a dark hero image background
  const isHomePage = pathname === `/${locale}` || pathname === `/${locale}/`;

  // Transparent navbar only on homepage when not scrolled
  const isTransparent = isHomePage && !scrolled;

  // Logo: white on dark hero, dark on light scrolled navbar
  const logoSrc = mounted
    ? (isTransparent || theme === "dark"
        ? "/mkn-header-logo-red-black.svg"
        : "/mkn-header-logo-red-dark.svg")
    : "/mkn-header-logo-red-black.svg"; // SSR default

  const links = [
    { href: `/${locale}`, label: t("home") },
    { href: `/${locale}/over-ons`, label: t("about") },
    { href: `/${locale}/diensten`, label: t("services") },
    { href: `/${locale}/projecten`, label: t("projects") },
    { href: `/${locale}/contact`, label: t("contact") },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === `/${locale}`) return pathname === `/${locale}` || pathname === `/${locale}/`;
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Top red accent line */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-mkn-red z-50" />

      <nav
        className={`fixed top-1 left-0 right-0 z-40 transition-all duration-300 ${
          isTransparent
            ? "bg-transparent"
            : "bg-nav backdrop-blur-md shadow-lg"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link href={`/${locale}`} className="shrink-0">
              <Image
                src={logoSrc}
                alt="MKN Technisch"
                width={200}
                height={52}
                className="w-[140px] sm:w-[180px] h-auto transition-opacity duration-300"
                priority
              />
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 text-sm font-medium tracking-wide uppercase transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-mkn-red focus-visible:outline-offset-2 rounded ${
                    isActive(link.href)
                      ? "text-mkn-red"
                      : isTransparent
                        ? "text-white/70 hover:text-white"
                        : "text-nav-link hover:text-nav-link-hover"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop right section */}
            <div className="hidden lg:flex items-center gap-3">
              <ThemeToggle />
              <LanguageSwitcher />
              <a
                href="tel:+32484471995"
                className="flex items-center gap-2 bg-mkn-red hover:bg-mkn-red-dark text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-mkn-red focus-visible:outline-offset-2"
              >
                <Phone className="w-4 h-4" />
                <span className="hidden xl:inline">0484 47 19 95</span>
                <span className="xl:hidden">{t("getQuote")}</span>
              </a>
              <a
                href="tel:+32472126216"
                className="hidden xl:flex items-center gap-2 text-muted hover:text-mkn-red text-sm font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-mkn-red focus-visible:outline-offset-2"
              >
                <Phone className="w-4 h-4" />
                0472 12 62 16
              </a>
            </div>

            {/* Mobile controls */}
            <div className="flex lg:hidden items-center gap-2">
              <ThemeToggle />
              <LanguageSwitcher />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-2 rounded-lg transition-colors ${isTransparent ? "text-white hover:bg-white/10" : "text-nav-link hover:bg-black/5 dark:hover:bg-white/10"}`}
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            isOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-nav-mobile backdrop-blur-md border-t border-themed px-4 py-4 space-y-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-3 text-sm font-medium tracking-wide uppercase rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-mkn-red ${
                  isActive(link.href)
                    ? "text-mkn-red bg-mkn-red/10"
                    : "text-nav-link hover:text-nav-link-hover hover:bg-black/5 dark:hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="tel:+32484471995"
              className="flex items-center justify-center gap-2 mt-3 bg-mkn-red hover:bg-mkn-red-dark text-white px-4 py-3 rounded-lg text-sm font-medium transition-colors"
            >
              <Phone className="w-4 h-4" />
              0484 47 19 95
            </a>
            <a
              href="tel:+32472126216"
              className="flex items-center justify-center gap-2 mt-1 text-muted hover:text-mkn-red px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              <Phone className="w-4 h-4" />
              0472 12 62 16
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
