"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { projects } from "@/lib/project-data";

export default function ProjectsPreview() {
  const t = useTranslations("projects");
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "nl";

  // Pick 6 diverse images from both projects
  const featured = [
    ...projects[0].images.filter((_, i) => i % 8 === 0).slice(0, 3).map((img) => ({ ...img, key: `p1-${img.filename}` })),
    ...projects[1].images.filter((_, i) => i % 10 === 0).slice(0, 3).map((img) => ({ ...img, key: `p2-${img.filename}` })),
  ].slice(0, 6);

  return (
    <section className="relative z-10 py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-themed-secondary">
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

        {/* Image grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-10">
          {featured.map((img, index) => (
            <AnimatedSection key={img.key} delay={index * 0.08}>
              <Link
                href={`/${locale}/projecten`}
                className="group relative aspect-[4/3] overflow-hidden rounded-lg block"
              >
                <Image
                  src={img.thumb}
                  alt={`MKN Technisch project ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  placeholder="blur"
                  blurDataURL={img.blurDataURL}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-xs font-medium text-white bg-mkn-red/80 px-2 py-1 rounded">
                    {t("view")}
                  </span>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        {/* CTA */}
        <AnimatedSection className="text-center">
          <Link
            href={`/${locale}/projecten`}
            className="group inline-flex items-center gap-2 bg-mkn-red hover:bg-mkn-red-dark text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-mkn-red/20"
          >
            {t("viewAll")}
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
