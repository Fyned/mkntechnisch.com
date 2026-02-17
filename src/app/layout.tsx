import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "MKN Technisch - Grond Werken",
    template: "%s | MKN Technisch",
  },
  description:
    "MKN Technisch - Grond Werken. Sloop, afbraak en ontmantelingswerken in heel België. Grote en kleine projecten.",
  keywords: [
    "MKN Technisch",
    "Grond Werken",
    "afbraak",
    "ontmanteling",
    "sloopwerken",
    "demolition",
    "déconstruction",
    "démantèlement",
    "Belgium",
    "België",
    "Ternat",
    "grondwerken",
    "stripwerken",
  ],
  icons: {
    icon: "/mkn-favicon-logo-red-black.svg",
  },
  openGraph: {
    title: "MKN Technisch - Grond Werken",
    description:
      "Sloop, afbraak en ontmantelingswerken in heel België. Grote en kleine projecten.",
    url: "https://mkntechnisch.com",
    siteName: "MKN Technisch",
    locale: "nl_BE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
