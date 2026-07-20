import * as id from "./site";
import * as en from "./site-en";

export type Locale = "id" | "en";

/** Ambil seluruh konten situs untuk satu bahasa. */
export function getContent(locale: Locale) {
  if (locale === "en") {
    return {
      site: en.siteEN,
      accommodations: en.accommodationsEN,
      facilities: en.facilitiesEN,
      destinations: en.destinationsEN,
      malukuDestinations: en.malukuDestinationsEN,
      testimonials: en.testimonialsEN,
      faqs: en.faqsEN,
      heroImage: en.heroImageEN,
      introImages: en.introImagesEN,
      ctaImage: en.ctaImageEN,
      galleryImages: en.galleryImagesEN,
    };
  }
  return {
    site: id.site as typeof en.siteEN,
    accommodations: id.accommodations,
    facilities: id.facilities,
    destinations: id.destinations,
    malukuDestinations: id.malukuDestinations,
    testimonials: id.testimonials,
    faqs: id.faqs,
    heroImage: id.heroImage,
    introImages: id.introImages,
    ctaImage: id.ctaImage,
    galleryImages: id.galleryImages,
  };
}
