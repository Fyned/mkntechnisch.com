"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function CTA() {
  const t = useTranslations("cta");
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "nl";

  return (
    <section className="relative z-10 py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      <AnimatedSection>
        <div className="max-w-4xl mx-auto relative overflow-hidden rounded-2xl">
          {/* Red background with angular shapes */}
          <div className="bg-mkn-red px-8 sm:px-12 py-14 sm:py-16 text-center relative">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 transform -skew-x-12 translate-x-1/4" />
            <div className="absolute bottom-0 left-0 w-1/4 h-full bg-black/5 transform skew-x-12 -translate-x-1/4" />

            <div className="relative z-10">
              <h2 className="font-[family-name:var(--font-bebas-neue)] text-3xl sm:text-4xl lg:text-5xl tracking-wider text-white mb-3">
                {t("title")}
              </h2>
              <p className="text-white/80 text-base sm:text-lg mb-8 max-w-lg mx-auto">
                {t("subtitle")}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href={`/${locale}/contact`}
                  className="inline-flex items-center gap-2 bg-white text-mkn-red hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  {t("button")}
                </Link>
                <a
                  href="tel:+32472126216"
                  className="inline-flex items-center gap-2 border-2 border-white/30 hover:border-white text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  0472 12 62 16
                </a>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
