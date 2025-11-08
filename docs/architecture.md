## Wuub Web Architecture

### Amaç
- Ergonomik bilek desteği Wuub için TR/EN, SEO ve performans odaklı pazarlama sitesi.
- Next.js 14 App Router, TypeScript, Tailwind CSS ve shadcn/ui kullanımıyla modern UI.

### Teknoloji Yığını
- **Framework:** Next.js 14 (App Router, RSC öncelikli)
- **Dil:** TypeScript (strict)
- **Stil:** Tailwind CSS + shadcn/ui komponentleri
- **i18n:** `next-intl` (tr/en segment tabanlı)
- **Veri/Analitik:** static içerik + Vercel Analytics hook
- **Test:** Jest + React Testing Library, Playwright (hazır yapılandırma planlanacak)

### Klasör Yapısı
```
/
  docs/                  # Mimari ve süreç dokümantasyonu
  app/
    (tr)/                # Türkçe segment
      page.tsx
      product/page.tsx
      how-it-works/page.tsx
      pricing/page.tsx
      reviews/page.tsx
      b2b/page.tsx
      contact/page.tsx
      legal/
        privacy/page.tsx
        terms/page.tsx
    (en)/                # İngilizce segment, TR ile aynı yapıda
    layout.tsx
    not-found.tsx
    error.tsx
    sitemap.ts
    robots/
      route.ts
  components/
    ui/                  # shadcn ui primitive'leri (Button, Card, Accordion, Dialog, Input, Textarea, ThemeSwitcher)
    layout/              # Navbar, Footer, LangSwitcher
    sections/            # Hero, ProblemSolution, FeatureGrid, HowItWorksSteps, ComparisonTable, UseCases, Testimonials, FAQ, CTABanner
  lib/
    i18n/                # next-intl konfigürasyonları, locale mesajları
    seo.ts               # Metadata & canonical helper
    schema.ts            # JSON-LD üreticisi (Product schema)
    utils/               # cn helper vb.
  public/
    images/              # Ürün görselleri, OG görselleri
  styles/
    globals.css          # Tailwind layer'ları
  tailwind.config.ts
  tsconfig.json
  next.config.ts
  package.json
```

### Route Stratejisi
- Locale tabanlı segmentler `(tr)` ve `(en)` ile aynı bilgi mimarisi.
- Ana sayfa bileşen kompozisyonu:
  1. Hero
  2. Problem → Çözüm
  3. Feature Grid
  4. How It Works
  5. Comparison Table
  6. Use Cases
  7. Testimonials
  8. FAQ
  9. CTA Banner
  10. Footer
- Diğer sayfalar (product, how-it-works, pricing, reviews, b2b, contact, legal) içerik olarak dokümandaki kopyaya dayanacak.

### Stil & Tema
- Tailwind extend: `wuub.orange`, `wuub.gray`, `wuub.white`, `wuub.black`.
- Varsayılan font: `Inter`, fallback Tailwind sans seti.
- Yüksek kontrast, WCAG uyumlu renk kombinasyonları.
- Tüm görsellerde `alt` metin, `next/image` kullanımı.

### UI Bileşenleri
- shadcn/ui tabanlı reusable komponentler:
  - Button, Card, Accordion, Dialog, Input, Textarea
  - LangSwitcher (locale değişimi), ThemeSwitcher (dark/light)
- Section bileşenleri server component olarak uygulanacak, gerekirse client (accordion vb.) için `"use client"`.
- Formlar (contact, b2b) `react-hook-form` + `zod` ile, erişilebilir etiketler.

### Çok Dillilik
- Locale algılama middleware’i (varsayılan `tr`).
- Her sayfa `generateMetadata` içinde locale spesifik başlık & açıklama.
- Kopyalar `lib/i18n/messages/{tr,en}.ts` dosyalarından yüklenecek.

### SEO & Analytics
- Metadata: title, description, canonical, OG, Twitter card.
- `app/sitemap.ts` ve `app/robots/route.ts` ile SEO dosyaları.
- JSON-LD Product schema `Wuub Ergonomic Wrist Rest`.
- Vercel Analytics `<Analytics />` bileşeni `layout.tsx` içinde.

### Performans
- Server Components öncelikli render, client component minimal.
- Section görselleri için `priority` sadece Hero’da.
- `loading="lazy"`, `next/dynamic` gerektiğinde (ör. ThemeSwitcher).
- Lighthouse hedefleri: Performance ≥ 90, SEO ≥ 90.

### Erişilebilirlik
- Navbar ve menüler klavye ile gezilebilir (tabindex, aria).
- FAQ için aria-controlled accordion.
- CTA butonlarında net metinler (“Satın Alın”, “Try Wuub today”).
- Form alanlarında `label`, `aria-invalid`, `aria-describedby`.

### Geliştirme Süreci
- Paket yöneticisi: npm
- Script akışı:
  - `npm run dev`, `npm run build`, `npm run lint`, `npm run test`, `npm run typecheck`
- Kod standartları: ESLint + Prettier, import sıralaması, no default export (page hariç).
- Test stratejisi:
  - Unit: Jest + RTL (section bileşenleri, utils)
  - E2E: Playwright (kritik user flow)

### Açık İşler
- UI içerikleri yerleştikçe ürün görselleri importu.
- MSW & Playwright yapılandırması.
- Form backend entegrasyonu (örn. webhook) henüz belirlenmedi, stub.


