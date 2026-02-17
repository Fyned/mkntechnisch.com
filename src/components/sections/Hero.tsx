"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowDown, ChevronRight } from "lucide-react";
import { projects } from "@/lib/project-data";

export default function Hero() {
  const t = useTranslations("hero");
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "nl";

  // Pick a landscape project image for the hero (1600x1200)
  // img-002 (index 1), img-004 (index 3), img-014 (index 13) are confirmed landscape
  const heroImage = projects[0].images[1] || projects[0].images[3] || projects[0].images[13];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImage.full}
          alt="MKN Technisch project"
          fill
          sizes="100vw"
          className="object-cover"
          placeholder="blur"
          blurDataURL={heroImage.blurDataURL}
          priority
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/60" />
        {/* Red accent overlay */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-mkn-red/10 transform -skew-x-12 translate-x-1/4" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto hero-stagger">
        {/* Logo */}
        <div className="mb-6 sm:mb-8 hero-stagger-item">
          <Image
            src="/mkn-header-logo-red-black.svg"
            alt="MKN Technisch - Grond Werken"
            width={500}
            height={130}
            className="w-[220px] sm:w-[320px] lg:w-[400px] h-auto drop-shadow-2xl mx-auto logo-image"
            priority
          />
        </div>

        {/* Red accent bar */}
        <div className="w-20 h-1 bg-mkn-red mb-6 transform -skew-x-12 mx-auto hero-stagger-item hero-bar" />

        {/* Tagline */}
        <h1 className="font-[family-name:var(--font-bebas-neue)] text-3xl sm:text-4xl lg:text-6xl tracking-wider text-white mb-4 hero-stagger-item">
          {t("tagline")}
        </h1>

        <p className="text-base sm:text-lg text-gray-300 mb-8 max-w-xl mx-auto hero-stagger-item">
          {t("subtitle")}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 hero-stagger-item">
          <Link
            href={`/${locale}/projecten`}
            className="group flex items-center gap-2 bg-mkn-red hover:bg-mkn-red-dark text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-mkn-red/20"
          >
            {t("cta")}
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="flex items-center gap-2 border border-white/30 hover:border-mkn-red/50 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:bg-white/10"
          >
            {t("ctaContact")}
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hero-stagger-item scroll-bounce">
        <ArrowDown className="w-5 h-5 text-mkn-red" />
      </div>
    </section>
  );
}
