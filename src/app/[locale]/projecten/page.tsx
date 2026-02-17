import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import ProjectsContent from "./ProjectsContent";

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
        title: "Nos projets — Galerie photos et vidéos",
        description:
          "Découvrez nos projets de démolition et déconstruction. Photos et vidéos de chantiers réalisés par MKN Technisch BV en Belgique.",
        alternates: {
          canonical: "https://mkntechnisch.com/fr/projecten",
          languages: { "nl-BE": "https://mkntechnisch.com/nl/projecten", "fr-BE": "https://mkntechnisch.com/fr/projecten" },
        },
      }
    : {
        title: "Onze projecten — Foto's en video's",
        description:
          "Bekijk onze sloop- en afbraakprojecten. Foto's en video's van uitgevoerde werken door MKN Technisch BV in heel België.",
        alternates: {
          canonical: "https://mkntechnisch.com/nl/projecten",
          languages: { "nl-BE": "https://mkntechnisch.com/nl/projecten", "fr-BE": "https://mkntechnisch.com/fr/projecten" },
        },
      };
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ProjectsContent />;
}
