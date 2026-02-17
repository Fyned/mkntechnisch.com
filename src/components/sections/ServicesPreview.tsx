"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Hammer, HardHat, Trash2, Shovel, ArrowRight } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";

const serviceIcons = [
  { key: "demolition", icon: Hammer },
  { key: "stripping", icon: HardHat },
  { key: "deconstruction", icon: Trash2 },
  { key: "groundwork", icon: Shovel },
];

export default function ServicesPreview() {
  const t = useTranslations("services");
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "nl";

  return (
    <section className="relative z-10 py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section heading */}
        <AnimatedSection className="text-center mb-14">
          <p className="text-mkn-red text-sm uppercase tracking-[0.3em] mb-2 font-medium">
            {t("subtitle")}
          </p>
          <h2 className="font-[family-name:var(--font-bebas-neue)] text-3xl sm:text-4xl lg:text-5xl tracking-wider text-foreground">
            {t("title")}
          </h2>
          <div className="w-16 h-0.5 bg-mkn-red mx-auto mt-4 transform -skew-x-12" />
        </AnimatedSection>

        {/* Service cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviceIcons.map(({ key, icon: Icon }, index) => (
            <AnimatedSection key={key} delay={index * 0.1}>
              <Link
                href={`/${locale}/diensten`}
                className="group block bg-themed-card border border-themed rounded-xl p-6 hover:border-mkn-red/30 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-xl hover:shadow-mkn-red/5 h-full"
              >
                <div className="w-12 h-12 bg-mkn-red/10 rounded-lg flex items-center justify-center mb-4 border border-mkn-red/20 group-hover:bg-mkn-red/20 transition-colors">
                  <Icon className="w-6 h-6 text-mkn-red" />
                </div>
                <h3 className="font-[family-name:var(--font-bebas-neue)] text-xl tracking-wider mb-2 text-foreground">
                  {t(`${key}.title`)}
                </h3>
                <p className="text-sm text-muted leading-relaxed mb-4">
                  {t(`${key}.description`)}
                </p>
                <span className="inline-flex items-center gap-1 text-mkn-red text-xs font-medium group-hover:gap-2 transition-all">
                  {locale === "nl" ? "Meer info" : "Plus d'info"}
                  <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
