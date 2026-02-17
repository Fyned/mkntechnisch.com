import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import ContactContent from "./ContactContent";

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
        title: "Contactez-nous — Demandez un devis gratuit",
        description:
          "Contactez MKN Technisch BV pour un devis gratuit. Appelez, envoyez un e-mail ou un message WhatsApp. Disponible dans toute la Belgique.",
        alternates: {
          canonical: "https://mkntechnisch.com/fr/contact",
          languages: { "nl-BE": "https://mkntechnisch.com/nl/contact", "fr-BE": "https://mkntechnisch.com/fr/contact" },
        },
      }
    : {
        title: "Contacteer ons — Vraag een gratis offerte aan",
        description:
          "Neem contact op met MKN Technisch BV voor een vrijblijvende offerte. Bel, mail of stuur een WhatsApp bericht. Actief in heel België.",
        alternates: {
          canonical: "https://mkntechnisch.com/nl/contact",
          languages: { "nl-BE": "https://mkntechnisch.com/nl/contact", "fr-BE": "https://mkntechnisch.com/fr/contact" },
        },
      };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ContactContent />;
}
