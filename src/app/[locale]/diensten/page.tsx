import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import ServicesContent from "./ServicesContent";

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
        title: "Nos services — Démolition, Strip & Terrassement",
        description:
          "Services de démolition, déconstruction, strip et terrassement par MKN Technisch BV. Projets résidentiels et industriels dans toute la Belgique.",
        alternates: {
          canonical: "https://mkntechnisch.com/fr/diensten",
          languages: { "nl-BE": "https://mkntechnisch.com/nl/diensten", "fr-BE": "https://mkntechnisch.com/fr/diensten" },
        },
      }
    : {
        title: "Onze diensten — Sloop, Strip & Grondwerken",
        description:
          "Sloopwerken, afbraak, stripwerken en grondwerken door MKN Technisch BV. Residentiële en industriële projecten in heel België.",
        alternates: {
          canonical: "https://mkntechnisch.com/nl/diensten",
          languages: { "nl-BE": "https://mkntechnisch.com/nl/diensten", "fr-BE": "https://mkntechnisch.com/fr/diensten" },
        },
      };
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ServicesContent />;
}
