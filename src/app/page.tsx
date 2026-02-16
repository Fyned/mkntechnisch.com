import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-mkn-black text-white overflow-hidden relative">
      {/* Background: subtle diagonal stripes */}
      <div className="fixed inset-0 construction-stripes pointer-events-none z-0" />

      {/* Decorative angular shapes */}
      <div className="fixed top-0 right-0 w-1/3 h-screen bg-mkn-red/5 transform -skew-x-12 translate-x-1/4 z-0" />
      <div className="fixed bottom-0 left-0 w-1/4 h-1/2 bg-mkn-red/[0.03] transform skew-x-12 -translate-x-1/4 z-0" />

      {/* Top red accent line */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-mkn-red z-20" />

      {/* ===== HERO SECTION ===== */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="mb-8 sm:mb-12">
          <Image
            src="/mkn-header-logo-red-black.svg"
            alt="MKN Technisch - Grond Werken"
            width={500}
            height={130}
            className="w-[260px] sm:w-[380px] lg:w-[480px] h-auto drop-shadow-2xl"
            priority
          />
        </div>

        {/* Red accent bar */}
        <div className="w-20 h-1 bg-mkn-red mb-8 transform -skew-x-12" />

        {/* Coming Soon heading */}
        <h1 className="font-[family-name:var(--font-bebas-neue)] text-4xl sm:text-5xl lg:text-7xl tracking-wider text-center mb-3 text-white">
          BINNENKORT ONLINE
        </h1>
        <p className="text-base sm:text-lg text-gray-400 mb-2 text-center">
          Site bientôt en ligne
        </p>

        {/* Animated "under construction" indicator */}
        <div className="flex items-center gap-2 mt-6 mb-10">
          <span className="w-2 h-2 rounded-full bg-mkn-red animate-pulse-dot" />
          <span className="text-xs uppercase tracking-[0.3em] text-gray-500">
            Website in opbouw
          </span>
          <span className="w-2 h-2 rounded-full bg-mkn-red animate-pulse-dot-delayed" />
        </div>

        {/* Services description - NL & FR */}
        <div className="max-w-2xl text-center space-y-3">
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
            Voor al uw sloop, strip- en afbraakwerken over heel België.
            <br />
            Grote en kleine projecten.
          </p>
          <p className="text-xs sm:text-sm text-gray-500 italic leading-relaxed">
            Pour tous vos travaux de démolition, de déconstruction et de
            démantèlement dans toute la Belgique. Grands et petits projets.
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg
            className="w-5 h-5 text-mkn-red"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>

      {/* ===== DIAGONAL TRANSITION ===== */}
      <div className="relative z-10 h-20 sm:h-28">
        <div className="absolute inset-0 bg-mkn-dark-gray clip-diagonal-reverse" />
      </div>

      {/* ===== CONTACT SECTION ===== */}
      <section className="relative z-10 bg-mkn-dark-gray py-14 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Section heading */}
          <div className="text-center mb-12">
            <h2 className="font-[family-name:var(--font-bebas-neue)] text-3xl sm:text-4xl tracking-wider mb-1">
              CONTACTEER ONS
            </h2>
            <p className="text-sm text-gray-500">Contactez-nous</p>
            <div className="w-16 h-0.5 bg-mkn-red mx-auto mt-4 transform -skew-x-12" />
          </div>

          {/* Contact grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Phone */}
            <div className="flex items-start gap-4 bg-mkn-black/40 rounded-lg p-5 border border-white/5 hover:border-mkn-red/20 transition-colors">
              <div className="w-10 h-10 bg-mkn-red/10 rounded-lg flex items-center justify-center shrink-0 border border-mkn-red/20">
                <svg
                  className="w-5 h-5 text-mkn-red"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1.5 uppercase tracking-wider">
                  Murat Albayrak
                </p>
                <a
                  href="tel:+32472126216"
                  className="text-base sm:text-lg text-white hover:text-mkn-red transition-colors block"
                >
                  0472 12 62 16
                </a>
                <a
                  href="tel:+32484471995"
                  className="text-base sm:text-lg text-white hover:text-mkn-red transition-colors block"
                >
                  0484 471 995
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4 bg-mkn-black/40 rounded-lg p-5 border border-white/5 hover:border-mkn-red/20 transition-colors">
              <div className="w-10 h-10 bg-mkn-red/10 rounded-lg flex items-center justify-center shrink-0 border border-mkn-red/20">
                <svg
                  className="w-5 h-5 text-mkn-red"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1.5 uppercase tracking-wider">
                  E-mail
                </p>
                <a
                  href="mailto:mkntechnischbv@gmail.com"
                  className="text-base sm:text-lg text-white hover:text-mkn-red transition-colors break-all"
                >
                  mkntechnischbv@gmail.com
                </a>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-4 bg-mkn-black/40 rounded-lg p-5 border border-white/5 hover:border-mkn-red/20 transition-colors">
              <div className="w-10 h-10 bg-mkn-red/10 rounded-lg flex items-center justify-center shrink-0 border border-mkn-red/20">
                <svg
                  className="w-5 h-5 text-mkn-red"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0115 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1.5 uppercase tracking-wider">
                  Adres / Adresse
                </p>
                <p className="text-base sm:text-lg text-white">
                  Assesteenweg 65
                  <br />
                  1740 Ternat
                </p>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="flex items-start gap-4 bg-mkn-black/40 rounded-lg p-5 border border-white/5 hover:border-green-900/30 transition-colors">
              <div className="w-10 h-10 bg-green-900/20 rounded-lg flex items-center justify-center shrink-0 border border-green-700/20">
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1.5 uppercase tracking-wider">
                  WhatsApp
                </p>
                <a
                  href="https://wa.me/32472126216"
                  className="text-base sm:text-lg text-white hover:text-green-400 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Stuur een bericht
                </a>
                <p className="text-xs text-gray-500 mt-0.5 italic">
                  Envoyez un message
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="relative z-10 bg-mkn-black py-8 px-4 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-12 h-0.5 bg-mkn-red mx-auto mb-4 transform -skew-x-12" />
          <p className="text-xs text-gray-600">
            &copy; 2025 MKN Technisch BV &mdash; Grond Werken. Alle rechten
            voorbehouden.
          </p>
          <a
            href="https://dmckreatif.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 text-[10px] text-gray-700 hover:text-gray-400 transition-colors"
          >
            Gemaakt door DMC Kreatif
          </a>
        </div>
      </footer>
    </main>
  );
}
