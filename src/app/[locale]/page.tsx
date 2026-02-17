import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Hero from "@/components/sections/Hero";
import ServicesPreview from "@/components/sections/ServicesPreview";
import ProjectsPreview from "@/components/sections/ProjectsPreview";
import Stats from "@/components/sections/Stats";
import CTA from "@/components/sections/CTA";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="overflow-hidden">
      <Hero />

      {/* Diagonal transition */}
      <div className="relative z-10 h-20 sm:h-28">
        <div className="absolute inset-0 bg-themed clip-diagonal-reverse" />
      </div>

      <ServicesPreview />
      <Stats />
      <ProjectsPreview />
      <CTA />
    </div>
  );
}
