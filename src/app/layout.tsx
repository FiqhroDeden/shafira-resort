import type { Metadata } from "next";
import { Albert_Sans, Fraunces } from "next/font/google";
import {
  accommodations,
  ctaImage,
  facilities,
  heroImage,
  introImages,
  site,
} from "@/data/site";
import "./globals.css";

/** URL absolut untuk aset lokal (foto asli resort ada di /public) */
const abs = (src: string) =>
  src.startsWith("http") ? src : `${site.url}${src}`;

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
    default: `${site.name} — Resort Pantai di Morella, Pulau Ambon, Maluku`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Shafira Resort",
    "resort di Maluku",
    "resort di Ambon",
    "resort pantai Ambon",
    "tempat healing di Ambon",
    "resort Morella",
    "penginapan Morella",
    "Pantai Memit",
    "glamping Ambon",
    "glamping Maluku",
    "villa pantai Maluku Tengah",
    "snorkeling Morella",
    "wisata Maluku Tengah",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: site.name,
    title: `${site.name} — Resort Pantai di Morella, Pulau Ambon, Maluku`,
    description: site.description,
    url: "/",
    images: [
      { url: heroImage.src, width: 1600, height: 900, alt: heroImage.alt },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Resort Pantai di Morella, Pulau Ambon, Maluku`,
    description: site.description,
    images: [heroImage.src],
  },
  robots: { index: true, follow: true },
};

/* Schema.org: Resort/LodgingBusiness + WebSite agar mudah dipahami
   mesin pencari maupun model AI (ChatGPT, Gemini, Perplexity, dll.) */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Resort", "LodgingBusiness"],
      "@id": `${site.url}/#resort`,
      name: site.name,
      alternateName: "Shafira Resort Pantai Memit Morella",
      description: site.description,
      url: site.url,
      telephone: `+${site.whatsapp}`,
      priceRange: site.priceRange,
      currenciesAccepted: "IDR",
      image: [abs(heroImage.src), abs(ctaImage.src), abs(introImages.portrait.src)],
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
      hasMap: site.mapsUrl,
      sameAs: [`https://www.instagram.com/${site.instagram}/`],
      amenityFeature: facilities.map((f) => ({
        "@type": "LocationFeatureSpecification",
        name: f.title,
        value: true,
      })),
      makesOffer: accommodations.map((a) => ({
        "@type": "Offer",
        name: a.name,
        description: a.tagline,
        price: a.price,
        priceCurrency: "IDR",
        url: `${site.url}/akomodasi#${a.slug}`,
      })),
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      name: site.name,
      url: site.url,
      description: site.description,
      inLanguage: ["id-ID", "en-US"],
      publisher: { "@id": `${site.url}/#resort` },
    },
  ],
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
        {children}
      </body>
    </html>
  );
}
