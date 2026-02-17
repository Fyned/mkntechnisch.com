import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import AboutContent from "./AboutContent";

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
        title: "À propos de MKN Technisch BV",
        description:
          "Découvrez MKN Technisch BV — entreprise spécialisée en démolition et déconstruction en Belgique. Expérience, sécurité et qualité.",
        alternates: {
          canonical: "https://mkntechnisch.com/fr/over-ons",
          languages: { "nl-BE": "https://mkntechnisch.com/nl/over-ons", "fr-BE": "https://mkntechnisch.com/fr/over-ons" },
        },
      }
    : {
        title: "Over MKN Technisch BV",
        description:
          "Leer MKN Technisch BV kennen — gespecialiseerd in sloop- en afbraakwerken in heel België. Ervaring, veiligheid en kwaliteit.",
        alternates: {
          canonical: "https://mkntechnisch.com/nl/over-ons",
          languages: { "nl-BE": "https://mkntechnisch.com/nl/over-ons", "fr-BE": "https://mkntechnisch.com/fr/over-ons" },
        },
      };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AboutContent />;
}
