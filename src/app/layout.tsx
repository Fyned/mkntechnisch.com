import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://mkntechnisch.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "MKN Technisch BV — Sloop, Afbraak & Grondwerken in België",
    template: "%s | MKN Technisch",
  },
  description:
    "MKN Technisch BV — Specialist in sloop, afbraak, strip- en grondwerken in heel België. Veilig, efficiënt en professioneel. Vraag een gratis offerte aan.",
  keywords: [
    "MKN Technisch",
    "sloopwerken",
    "afbraakwerken",
    "grondwerken",
    "stripwerken",
    "ontmanteling",
    "demolition",
    "déconstruction",
    "démolition",
    "démantèlement",
    "travaux de terrassement",
    "sloop België",
    "afbraak België",
    "sloopbedrijf",
    "afbraakbedrijf",
    "Ternat",
    "Vlaams-Brabant",
    "België",
    "Belgique",
    "grondverzet",
    "bouwafval",
    "asbest verwijdering",
    "industriële sloop",
    "renovatie sloop",
    "professionele sloopwerken",
  ],
  authors: [
    { name: "MKN Technisch BV" },
    { name: "DMC Kreatif", url: "https://dmckreatif.com" },
  ],
  creator: "DMC Kreatif",
  publisher: "MKN Technisch BV",
  icons: {
    icon: "/mkn-favicon-logo-red-black.svg",
    apple: "/mkn-favicon-logo-red-black.svg",
  },
  openGraph: {
    title: "MKN Technisch BV — Sloop, Afbraak & Grondwerken",
    description:
      "Specialist in sloop, afbraak, strip- en grondwerken in heel België. Veilig, efficiënt en professioneel.",
    url: siteUrl,
    siteName: "MKN Technisch",
    locale: "nl_BE",
    alternateLocale: "fr_BE",
    type: "website",
    images: [
      {
        url: "/images/projects/project-1/full/img-002.webp",
        width: 1600,
        height: 1200,
        alt: "MKN Technisch — Sloop en afbraakwerken",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MKN Technisch BV — Sloop, Afbraak & Grondwerken",
    description:
      "Specialist in sloop, afbraak, strip- en grondwerken in heel België.",
    images: ["/images/projects/project-1/full/img-002.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      "nl-BE": `${siteUrl}/nl`,
      "fr-BE": `${siteUrl}/fr`,
    },
  },
  other: {
    "designer": "DMC Kreatif — dmckreatif.com",
    "geo.region": "BE-VBR",
    "geo.placename": "Ternat",
    "geo.position": "50.876;4.163",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
