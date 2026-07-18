import type { Metadata } from "next";
import { siteEN } from "@/data/site-en";
import { heroImage } from "@/data/site";
import { Hero } from "@/components/sections/hero";
import { Intro } from "@/components/sections/intro";
import { Accommodations } from "@/components/sections/accommodations";
import { Facilities } from "@/components/sections/facilities";
import { Destinations } from "@/components/sections/destinations";
import { Gallery } from "@/components/sections/gallery";
import { Testimonials } from "@/components/sections/testimonials";
import { Cta } from "@/components/sections/cta";

export const metadata: Metadata = {
  title: {
    absolute:
      "Shafira Resort — Beach Resort in Morella, Central Maluku, Indonesia",
  },
  description: siteEN.description,
  alternates: {
    canonical: "/en",
    languages: { id: "/", en: "/en", "x-default": "/" },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: siteEN.name,
    title:
      "Shafira Resort — Beach Resort in Morella, Central Maluku, Indonesia",
    description: siteEN.description,
    url: "/en",
    images: [{ url: heroImage.src, width: 1200, height: 800 }],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Shafira Resort — Beach Resort in Morella, Central Maluku, Indonesia",
    description: siteEN.description,
    images: [heroImage.src],
  },
};

export default function HomeEN() {
  return (
    <>
      <Hero locale="en" />
      <Intro locale="en" />
      <Accommodations locale="en" />
      <Facilities locale="en" />
      <Destinations locale="en" />
      <Gallery locale="en" />
      <Testimonials locale="en" />
      <Cta locale="en" />
    </>
  );
}
