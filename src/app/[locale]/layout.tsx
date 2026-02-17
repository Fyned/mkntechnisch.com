import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale, getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { Inter, Bebas_Neue } from "next/font/google";
import { routing } from "@/i18n/routing";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ThemeProvider from "@/components/ui/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas-neue",
  subsets: ["latin"],
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  const altLocale = locale === "nl" ? "fr" : "nl";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://mkntechnisch.com/#business",
    name: "MKN Technisch BV",
    legalName: "MKN Technisch BV",
    description:
      locale === "fr"
        ? "Travaux de démolition, déconstruction et terrassement dans toute la Belgique"
        : "Sloop, afbraak en ontmantelingswerken in heel België",
    url: `https://mkntechnisch.com/${locale}`,
    telephone: ["+32472126216", "+32484471995"],
    email: "mkntechnischbv@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Assesteenweg 65",
      addressLocality: "Ternat",
      postalCode: "1740",
      addressRegion: "Vlaams-Brabant",
      addressCountry: "BE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 50.876,
      longitude: 4.163,
    },
    areaServed: {
      "@type": "Country",
      name: "Belgium",
    },
    priceRange: "$$",
    image: "https://mkntechnisch.com/images/projects/project-1/full/img-002.webp",
    knowsLanguage: ["nl", "fr"],
    serviceType: [
      "Sloopwerken",
      "Afbraakwerken",
      "Stripwerken",
      "Grondwerken",
      "Ontmanteling",
    ],
    creator: {
      "@type": "Organization",
      name: "DMC Kreatif",
      url: "https://dmckreatif.com",
    },
  };

  return (
    <html lang={locale} className={`light ${inter.variable} ${bebasNeue.variable}`} suppressHydrationWarning>
      <head>
        {/* Designer credit */}
        <meta name="designer" content="DMC Kreatif — dmckreatif.com" />

        {/* Hreflang tags for international SEO */}
        <link rel="alternate" hrefLang={locale} href={`https://mkntechnisch.com/${locale}`} />
        <link rel="alternate" hrefLang={altLocale} href={`https://mkntechnisch.com/${altLocale}`} />
        <link rel="alternate" hrefLang="x-default" href="https://mkntechnisch.com/nl" />

        {/* Blocking script to prevent theme flash (FOUC) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("mkn-theme");if(t==="dark"){document.documentElement.classList.remove("light");document.documentElement.classList.add("dark")}}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        {/* Structured data — LocalBusiness */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            {/* Construction SVG background decoration */}
            <div className="construction-bg" aria-hidden="true" />
            <Navbar />
            <main className="relative z-10">{children}</main>
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
