import type { Metadata } from "next";
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
  alternates: {
    canonical: "/",
    languages: { id: "/", en: "/en", "x-default": "/" },
  },
};

export default function Home() {
  return (
    <>
      <Hero locale="id" />
      <Intro locale="id" />
      <Accommodations locale="id" />
      <Facilities locale="id" />
      <Destinations locale="id" />
      <Services locale="id" />
      <Gallery locale="id" />
      <Testimonials locale="id" />
      <Faq locale="id" />
      <Location locale="id" />
      <Cta locale="id" />
    </>
  );
}
