import type { Metadata } from "next";
import { siteEN } from "@/data/site-en";
import { Hero } from "@/components/sections/hero";
import { Intro } from "@/components/sections/intro";
import { Accommodations } from "@/components/sections/accommodations";
import { Facilities } from "@/components/sections/facilities";
import { Destinations } from "@/components/sections/destinations";
import { Services } from "@/components/sections/services";
import { Gallery } from "@/components/sections/gallery";
import { Testimonials } from "@/components/sections/testimonials";
import { Faq } from "@/components/sections/faq";
import { Location } from "@/components/sections/location";
import { Cta } from "@/components/sections/cta";

export const metadata: Metadata = {
  title: {
    absolute: "Shafira Resort — Beach Resort in Ambon, Maluku, Indonesia",
  },
  description: siteEN.description,
  keywords: [
    "Shafira Resort",
    "beach resort in Ambon",
    "resort in Maluku Indonesia",
    "where to stay in Ambon",
    "Morella beach resort",
    "glamping Ambon Indonesia",
    "snorkeling Ambon",
    "quiet beach Ambon Island",
  ],
  alternates: {
    canonical: "/en",
    languages: { id: "/", en: "/en", "x-default": "/" },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: siteEN.name,
    title: "Shafira Resort — Beach Resort in Ambon, Maluku, Indonesia",
    description: siteEN.description,
    url: "/en",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Shafira Resort — beach resort at Memit Beach, Morella, Maluku",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shafira Resort — Beach Resort in Ambon, Maluku, Indonesia",
    description: siteEN.description,
    images: ["/og.jpg"],
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
      <Services locale="en" />
      <Gallery locale="en" />
      <Testimonials locale="en" />
      <Faq locale="en" />
      <Location locale="en" />
      <Cta locale="en" />
    </>
  );
}
