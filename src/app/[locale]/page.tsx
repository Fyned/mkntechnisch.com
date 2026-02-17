import type { Metadata } from "next";
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  return locale === "fr"
    ? {
        title: "MKN Technisch BV — Démolition, Déconstruction & Terrassement en Belgique",
        description:
          "MKN Technisch BV — Spécialiste en démolition, déconstruction, strip et terrassement dans toute la Belgique. Sûr, efficace et professionnel.",
        alternates: {
          canonical: "https://mkntechnisch.com/fr",
          languages: { "nl-BE": "https://mkntechnisch.com/nl", "fr-BE": "https://mkntechnisch.com/fr" },
        },
      }
    : {
        title: "MKN Technisch BV — Sloop, Afbraak & Grondwerken in België",
        description:
          "MKN Technisch BV — Specialist in sloop, afbraak, strip- en grondwerken in heel België. Veilig, efficiënt en professioneel. Vraag een gratis offerte aan.",
        alternates: {
          canonical: "https://mkntechnisch.com/nl",
          languages: { "nl-BE": "https://mkntechnisch.com/nl", "fr-BE": "https://mkntechnisch.com/fr" },
        },
      };
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
