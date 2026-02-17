"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Shield, Award, Wrench, MapPin } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { projects } from "@/lib/project-data";

export default function AboutContent() {
  const t = useTranslations("about");

  // Use a nice project image as about page hero
  const heroImage = projects[0].images[2] || projects[0].images[0];

  const features = [
    { key: "experience", icon: Award },
    { key: "safety", icon: Shield },
    { key: "quality", icon: Wrench },
    { key: "allBelgium", icon: MapPin },
  ];

  return (
    <div className="pt-24 sm:pt-32">
      {/* Hero section */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Image */}
            <AnimatedSection direction="left">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <Image
                  src={heroImage.full}
                  alt="MKN Technisch werkplaats"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  placeholder="blur"
                  blurDataURL={heroImage.blurDataURL}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                {/* Red accent corner */}
                <div className="absolute bottom-0 left-0 w-20 h-1 bg-mkn-red" />
                <div className="absolute bottom-0 left-0 w-1 h-20 bg-mkn-red" />
              </div>
            </AnimatedSection>

            {/* Text */}
            <AnimatedSection direction="right">
              <div className="space-y-6">
                <p className="text-muted text-base sm:text-lg leading-relaxed">
                  {t("intro")}
                </p>

                <div className="bg-themed-card border border-themed rounded-xl p-6">
                  <h3 className="font-[family-name:var(--font-bebas-neue)] text-2xl tracking-wider mb-3 text-mkn-red">
                    {t("mission.title")}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed">
                    {t("mission.text")}
                  </p>
                </div>

                {/* Owner info */}
                <div className="flex items-center gap-4 pt-4 border-t border-themed">
                  <div className="w-14 h-14 bg-mkn-red/10 rounded-full flex items-center justify-center border border-mkn-red/20">
                    <span className="font-[family-name:var(--font-bebas-neue)] text-xl text-mkn-red">
                      MA
                    </span>
                  </div>
                  <div>
                    <p className="text-foreground font-medium">Murat Albayrak</p>
                    <p className="text-sm text-subtle">
                      MKN Technisch BV &mdash; Zaakvoerder
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Why us section */}
      <section className="relative z-10 bg-themed-secondary py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-14">
            <h2 className="font-[family-name:var(--font-bebas-neue)] text-3xl sm:text-4xl tracking-wider text-foreground">
              {t("whyUs.title")}
            </h2>
            <div className="w-16 h-0.5 bg-mkn-red mx-auto mt-4 transform -skew-x-12" />
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map(({ key, icon: Icon }, index) => (
              <AnimatedSection key={key} delay={index * 0.1}>
                <div className="flex items-start gap-4 bg-themed-card rounded-xl p-6 border border-themed hover:border-mkn-red/20 transition-colors">
                  <div className="w-12 h-12 bg-mkn-red/10 rounded-lg flex items-center justify-center shrink-0 border border-mkn-red/20">
                    <Icon className="w-6 h-6 text-mkn-red" />
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-bebas-neue)] text-xl tracking-wider mb-1 text-foreground">
                      {t(`whyUs.${key}.title`)}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed">
                      {t(`whyUs.${key}.text`)}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
