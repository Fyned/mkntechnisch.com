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

  return (
    <html lang={locale} className={`light ${inter.variable} ${bebasNeue.variable}`} suppressHydrationWarning>
      <head>
        {/* Blocking script to prevent theme flash (FOUC) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("mkn-theme");if(t==="dark"){document.documentElement.classList.remove("light");document.documentElement.classList.add("dark")}}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "MKN Technisch BV",
              description:
                "Sloop, afbraak en ontmantelingswerken in heel België",
              url: "https://mkntechnisch.com",
              telephone: "+32472126216",
              email: "mkntechnischbv@gmail.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Assesteenweg 65",
                addressLocality: "Ternat",
                postalCode: "1740",
                addressCountry: "BE",
              },
              creator: {
                "@type": "Organization",
                name: "DMC Kreatif",
                url: "https://dmckreatif.com",
              },
            }),
          }}
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
