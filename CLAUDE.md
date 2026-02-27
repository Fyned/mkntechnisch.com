# CLAUDE.md — mkntechnisch.com

## Proje
- **Tip:** Website (teknik hizmet firmasi)
- **Musteri:** MKN Technisch (Belcika)
- **Domain:** mkntechnisch.com
- **Durum:** Aktif gelistirme

## Teknoloji
- Next.js 16, React 19, TypeScript
- Tailwind CSS 4, PostCSS, LightningCSS
- next-intl (coklu dil: nl/fr)
- Sharp (gorsel optimizasyon), Lucide React
- yet-another-react-lightbox (galeri)
- Static export (`output: "export"`)

## Yapi
```
src/
  app/
    [locale]/       # Dil bazli sayfalar (nl, fr)
      contact/      # ContactContent
      diensten/     # ServicesContent
      over-ons/     # AboutContent
      projecten/    # ProjectsContent
    globals.css
    layout.tsx, page.tsx
  components/
    layout/         # Navbar, Footer
    sections/       # Hero, CTA, Stats, ServicesPreview, ProjectsPreview
    ui/             # AnimatedSection, LanguageSwitcher, LightboxGallery, ThemeToggle
  i18n/             # routing.ts, request.ts
  lib/              # project-data.ts
messages/
  nl.json           # Flamanca ceviriler
  fr.json           # Fransizca ceviriler
public/
out/                # Static export ciktisi
```

## Kurallar
- Varsayilan dil Flamanca (nl); Fransizca (fr) desteklenir
- Tum metinler `messages/nl.json` ve `messages/fr.json` dosyalarinda tutulur; hardcode metin yasak
- Static export kullanilir (`next build` ile `out/` klasorune cikar)
- `localePrefix: 'always'` — URL'de her zaman dil oneki olmali (/nl/..., /fr/...)
- Koyu/acik tema destegi vardir (ThemeProvider + ThemeToggle)
