import { Hero } from "@/components/sections/hero";
import { Intro } from "@/components/sections/intro";
import { Accommodations } from "@/components/sections/accommodations";
import { Facilities } from "@/components/sections/facilities";
import { Destinations } from "@/components/sections/destinations";
import { Gallery } from "@/components/sections/gallery";
import { Testimonials } from "@/components/sections/testimonials";
import { Cta } from "@/components/sections/cta";

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <Accommodations />
      <Facilities />
      <Destinations />
      <Gallery />
      <Testimonials />
      <Cta />
    </>
  );
}
