"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Hammer, HardHat, Trash2, Shovel, CheckCircle, ArrowRight } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { projects } from "@/lib/project-data";

const services = [
  {
    key: "demolition",
    icon: Hammer,
    imageIndex: 0,
    projectIndex: 0,
  },
  {
    key: "stripping",
    icon: HardHat,
    imageIndex: 5,
    projectIndex: 0,
  },
  {
    key: "deconstruction",
    icon: Trash2,
    imageIndex: 3,
    projectIndex: 1,
  },
  {
    key: "groundwork",
    icon: Shovel,
    imageIndex: 10,
    projectIndex: 1,
  },
];

export default function ServicesContent() {
  const t = useTranslations("services");
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "nl";

  return (
    <div className="pt-24 sm:pt-32">
      {/* Header */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 pb-10">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-14">
            <p className="text-mkn-red text-sm uppercase tracking-[0.3em] mb-2 font-medium">
              {t("subtitle")}
            </p>
            <h1 className="font-[family-name:var(--font-bebas-neue)] text-4xl sm:text-5xl lg:text-6xl tracking-wider text-foreground">
              {t("title")}
            </h1>
            <div className="w-16 h-0.5 bg-mkn-red mx-auto mt-4 transform -skew-x-12" />
          </AnimatedSection>
        </div>
      </section>

      {/* Service blocks */}
      {services.map(({ key, icon: Icon, imageIndex, projectIndex }, index) => {
        const image = projects[projectIndex]?.images[imageIndex] || projects[0].images[0];
        const isReversed = index % 2 !== 0;
        const features = t.raw(`${key}.features`) as string[];

        return (
          <section
            key={key}
            className={`relative z-10 py-16 sm:py-24 px-4 sm:px-6 lg:px-8 ${
              index % 2 === 0 ? "" : "bg-themed-secondary"
            }`}
          >
            <div className="max-w-7xl mx-auto">
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
                  isReversed ? "lg:direction-rtl" : ""
                }`}
              >
                {/* Image */}
                <AnimatedSection
                  direction={isReversed ? "right" : "left"}
                  className={isReversed ? "lg:order-2" : ""}
                >
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                    <Image
                      src={image.full}
                      alt={t(`${key}.title`)}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                      placeholder="blur"
                      blurDataURL={image.blurDataURL}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 w-12 h-12 bg-mkn-red/90 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </AnimatedSection>

                {/* Text */}
                <AnimatedSection
                  direction={isReversed ? "left" : "right"}
                  className={isReversed ? "lg:order-1" : ""}
                >
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <Icon className="w-6 h-6 text-mkn-red" />
                        <h2 className="font-[family-name:var(--font-bebas-neue)] text-3xl sm:text-4xl tracking-wider text-foreground">
                          {t(`${key}.title`)}
                        </h2>
                      </div>
                      <div className="w-16 h-0.5 bg-mkn-red transform -skew-x-12 mb-4" />
                    </div>

                    <p className="text-muted text-base leading-relaxed">
                      {t(`${key}.description`)}
                    </p>

                    <ul className="space-y-3">
                      {features.map((feature: string, i: number) => (
                        <li key={i} className="flex items-center gap-3 text-sm text-muted">
                          <CheckCircle className="w-4 h-4 text-mkn-red shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={`/${locale}/contact`}
                      className="inline-flex items-center gap-2 bg-mkn-red hover:bg-mkn-red-dark text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
                    >
                      {locale === "nl" ? "Offerte aanvragen" : "Demander un devis"}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
