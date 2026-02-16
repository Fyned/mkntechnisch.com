import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas-neue",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MKN Technisch - Grond Werken | Binnenkort Online",
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
  return (
    <html lang="nl" className={`${inter.variable} ${bebasNeue.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "MKN Technisch — Grond Werken",
              "url": "https://mkntechnisch.com",
              "creator": {
                "@type": "Organization",
                "name": "DMC Kreatif",
                "url": "https://dmckreatif.com",
              },
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
