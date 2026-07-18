import type { Metadata } from "next";
import { Albert_Sans, Fraunces } from "next/font/google";
import {
  accommodations,
  ctaImage,
  heroImage,
  site,
} from "@/data/site";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WaFloat } from "@/components/wa-float";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
});

const albertSans = Albert_Sans({
  variable: "--font-albert",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Resort Pantai di Morella, Maluku Tengah`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Shafira Resort",
    "resort Morella",
    "penginapan Morella",
    "Pantai Memit",
    "resort pantai Ambon",
    "glamping Maluku",
    "wisata Maluku Tengah",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: site.name,
    title: `${site.name} — Resort Pantai di Morella, Maluku Tengah`,
    description: site.description,
    url: "/",
    images: [{ url: heroImage.src, width: 1200, height: 800, alt: heroImage.alt }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Resort Pantai di Morella, Maluku Tengah`,
    description: site.description,
    images: [heroImage.src],
  },
  robots: { index: true, follow: true },
};

/* Schema.org: Resort/LodgingBusiness agar muncul rapi di hasil pencarian */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["Resort", "LodgingBusiness"],
  name: site.name,
  description: site.description,
  url: site.url,
  telephone: `+${site.whatsapp}`,
  priceRange: site.priceRange,
  image: [heroImage.src, ctaImage.src],
  address: {
    "@type": "PostalAddress",
    streetAddress: `${site.address.beach}, ${site.address.village}`,
    addressLocality: site.address.district,
    addressRegion: `${site.address.regency}, ${site.address.province}`,
    addressCountry: "ID",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: site.geo.lat,
    longitude: site.geo.lng,
  },
  makesOffer: accommodations.map((a) => ({
    "@type": "Offer",
    name: a.name,
    description: a.tagline,
    price: a.price,
    priceCurrency: "IDR",
    url: `${site.url}/akomodasi#${a.slug}`,
  })),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${fraunces.variable} ${albertSans.variable}`}
      suppressHydrationWarning
    >
      <body>
        {/* Penanda JS aktif — animasi reveal hanya menyembunyikan konten bila kelas ini ada */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <WaFloat />
      </body>
    </html>
  );
}
