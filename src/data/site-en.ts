/*
 * ============================================================
 *  ENGLISH CONTENT — SHAFIRA RESORT
 *  Versi Inggris dari konten situs. Harga, foto, slug, dan kontak
 *  diambil langsung dari site.ts, jadi cukup diubah SEKALI di sana.
 *  File ini hanya berisi teks berbahasa Inggris.
 * ============================================================
 */

import {
  accommodations,
  ctaImage,
  destinations,
  galleryImages,
  heroImage,
  introImages,
  locationImage,
  malukuDestinations,
  site,
  type Accommodation,
  type Destination,
  type Facility,
  type Faq,
  type SiteImage,
  type Testimonial,
} from "./site";

export const siteEN = {
  ...site,
  tagline: "A quiet seaside stay on Memit Beach, Morella",
  description:
    "Shafira Resort is a family beach resort on Memit Beach in Morella village — a beach resort in Ambon, Maluku, Indonesia, about an hour's drive from Ambon city. Stay in a villa, room, or beachfront glamping tent, with a free-use boat, gazebos, snorkeling right off the beach, and sunsets over the quiet north coast of Ambon Island.",
  hours: "Open 24 hours for staying guests",
  address: {
    beach: "Memit Beach",
    village: "Morella Village",
    district: "Leihitu District",
    regency: "Central Maluku Regency",
    province: "Maluku",
  },
};

/* Nama unit versi Inggris; waLabel menyertakan nama asli agar
   pemilik resort langsung mengenali unit yang dimaksud tamu. */
const [vilaID, kamarID, glampingID] = accommodations;

const withAlt = (img: SiteImage, alt: string): SiteImage => ({ ...img, alt });

export const accommodationsEN: Accommodation[] = [
  {
    ...vilaID,
    name: "Grand Villa",
    waLabel: "Grand Villa (Vila Besar)",
    tagline: "For families & groups",
    description:
      "The most spacious stay at Shafira Resort. A timber villa facing the sea with a generous shared living space — room enough for an extended-family weekend away from Ambon, or a group that wants to cook and grill right by the beach.",
    capacity: "Up to 8 guests · 2 large bedrooms · private gazebo",
    features: [
      "Terrace facing the open sea",
      "Spacious living room for gathering",
      "Shared kitchen with full cooking kit",
      "Priority use of the resort boat",
      "Great for family events & get-togethers",
    ],
    image: withAlt(
      vilaID.image,
      "Shafira Resort's Grand Villa — a timber villa with a warmly lit veranda at night",
    ),
    gallery: [
      withAlt(
        vilaID.gallery[0],
        "Grand Villa veranda at Shafira Resort with lounge chairs facing the coconut garden",
      ),
      withAlt(
        vilaID.gallery[1],
        "Grand Villa bedroom at Shafira Resort with timber walls and floors, a large bed, and a wall fan",
      ),
      withAlt(
        vilaID.gallery[2],
        "Private Grand Villa gazebo facing the sea at Memit Beach, Morella",
      ),
      withAlt(
        vilaID.gallery[3],
        "Second Grand Villa bedroom with a trundle bed, timber floors, and curtained windows",
      ),
    ],
  },
  {
    ...kamarID,
    name: "Double Room",
    waLabel: "Double Room (Kamar)",
    tagline: "For couples",
    description:
      "A warm, simple room for two — close enough to the waterline to hear the waves from bed. Made for couples after slow afternoons in a gazebo and a Memit Beach sunset to close the day.",
    capacity: "2 guests · 1 double bed",
    features: [
      "Steps from the waterline",
      "Private bathroom",
      "Small terrace for the late afternoon",
      "Access to all resort facilities",
    ],
    image: withAlt(
      kamarID.image,
      "Room terrace at Shafira Resort with rattan chairs, wood-framed windows, and a colorful stone garden on Memit Beach, Morella",
    ),
    gallery: [
      withAlt(
        kamarID.gallery[0],
        "Room interior at Shafira Resort with a large bed, air conditioning, and an en-suite bathroom",
      ),
      withAlt(
        kamarID.gallery[1],
        "Private bathroom in the Shafira Resort room with a seated toilet and tiled walls",
      ),
      withAlt(
        kamarID.gallery[2],
        "Room terrace overlooking the coconut garden and sea at Shafira Resort, Memit Beach Morella",
      ),
      withAlt(
        kamarID.gallery[3],
        "Air-conditioned room at Shafira Resort with a two-mattress trundle bed and patterned tile floor",
      ),
    ],
  },
  {
    ...glampingID,
    name: "Beach Glamping",
    waLabel: "Beach Glamping",
    tagline: "The closest bed to the sand",
    description:
      "Glamping tents stand among the coconut palms, just a few steps from the sand. The most affordable way to fall asleep to the sound of waves — unzip the tent in the morning and the Morella sea is right there.",
    capacity: "2–3 guests · mattress + fan",
    features: [
      "The closest spot to the sand",
      "Comfortable mattress inside the tent",
      "Lighting & power socket",
      "Campfire experience (on request)",
    ],
    image: withAlt(
      glampingID.image,
      "Glamping tent at Shafira Resort with a mattress, patterned rug, and two lounge chairs under an awning, on Memit Beach in Morella",
    ),
    gallery: [
      withAlt(
        glampingID.gallery[0],
        "Glamping tent at Shafira Resort at night against a backdrop of trees and a beachfront gazebo",
      ),
      withAlt(
        glampingID.gallery[1],
        "Glamping tent interior at Shafira Resort with a mattress, pillows, and a green patterned floor mat",
      ),
      withAlt(
        glampingID.gallery[2],
        "Warm noodle soup and chili sauce served at the beachfront glamping area of Shafira Resort",
      ),
      withAlt(
        glampingID.gallery[3],
        "Lounge chairs and a folding table in front of a Shafira Resort glamping tent under a shade net",
      ),
      withAlt(
        glampingID.gallery[4],
        "Glamping tent porch at Shafira Resort with two lounge chairs and a doormat at the entrance",
      ),
    ],
  },
];

export const facilitiesEN: Facility[] = [
  {
    icon: "boat",
    title: "Free-use boat",
    description:
      "Paddle at your own pace along the calm waters off the beach — free for staying guests.",
  },
  {
    icon: "gazebo",
    title: "Beachfront gazebos",
    description:
      "Gazebos dot the shoreline for long afternoons, shared meals, or a nap in the sea breeze.",
  },
  {
    icon: "canteen",
    title: "Canteen",
    description:
      "Simple meals and drinks are available on site — no need to leave the resort for a bite.",
  },
  {
    icon: "cooking",
    title: "Full cooking kit",
    description:
      "A gas stove and complete cookware are provided. Bring fresh fish from the market and grill it by the beach.",
  },
  {
    icon: "wifi",
    title: "Fast Starlink internet",
    description:
      "Satellite internet covers the entire resort — stay connected at the edge of the Morella sea.",
  },
];

/* TODO: jarak/waktu tempuh estimasi konservatif (mengikuti site.ts) */
const [lubangBuayaID, liangID, memitID] = destinations;

export const destinationsEN: Destination[] = [
  {
    ...lubangBuayaID,
    name: "Lubang Buaya Beach",
    distance: "± 10 minutes by car",
    description:
      "Morella's most famous snorkeling and diving spot. The water is glass-clear — fish swim right up to the entry steps on the shoreline.",
    image: withAlt(
      lubangBuayaID.image,
      "Clear water at the Lubang Buaya snorkeling spot, Morella",
    ),
  },
  {
    ...liangID,
    name: "Liang Beach (Hunimua)",
    distance: "± 30 minutes by car",
    description:
      "Nearly a kilometer of fine white sand, once named by the UNDP among the most beautiful beaches in Indonesia.",
    image: withAlt(
      liangID.image,
      "White sand and clear blue sea at Liang Beach, Central Maluku",
    ),
  },
  {
    ...memitID,
    name: "Memit Beach",
    distance: "Right in front of the resort",
    description:
      "The resort's home beach and its best sunset stage. Come late afternoon, the sky over the sea turns orange — take a gazebo seat and watch.",
    image: withAlt(
      memitID.image,
      "Orange evening sky over the sea at Memit Beach, seen from the Shafira Resort shoreline in Morella",
    ),
  },
];

/* Wider Maluku destinations — Ambon Island + Seram Island (follows site.ts) */
const [natsepaID, pintuKotaID, amsterdamID, oraID, sawaiID, osiID] =
  malukuDestinations;

export const malukuDestinationsEN: Destination[] = [
  {
    ...natsepaID,
    name: "Natsepa Beach",
    distance: "Ambon Island",
    description:
      "A gently shelving bay east of Ambon city, famous for its Natsepa rujak (fruit salad). Calm water for an easy swim, late afternoons for sitting out with a plate of rujak.",
    image: withAlt(
      natsepaID.image,
      "Natsepa Beach in Suli, Ambon Island",
    ),
  },
  {
    ...pintuKotaID,
    name: "Pintu Kota",
    distance: "Ambon Island",
    description:
      "A cliff with a natural sea-gate arch on the southern tip of Ambon Island — the backdrop almost everyone brings home from Ambon.",
    image: withAlt(
      pintuKotaID.image,
      "The holed rock cliff of Pintu Kota Beach facing the sea, Airlouw, Ambon Island",
    ),
  },
  {
    ...amsterdamID,
    name: "Fort Amsterdam",
    distance: "Ambon Island · Hila village",
    description:
      "A colonial-era stone fort in Hila on the Leihitu coast — a close neighbor of Morella. Its old tower and walls still stand, holding the long story of the Maluku spice trade.",
    image: withAlt(
      amsterdamID.image,
      "Fort Amsterdam in Hila village, Leihitu, Ambon Island",
    ),
  },
  {
    ...oraID,
    name: "Ora Beach",
    distance: "Seram Island · a boat crossing away",
    description:
      "Glass-clear water with cottages built over the sea on the coast of Seram Island. Often called Maluku's hidden paradise — and well worth the crossing.",
    image: withAlt(
      oraID.image,
      "Ora Beach and its over-water cottages seen from the sea, Seram Island",
    ),
  },
  {
    ...sawaiID,
    name: "Sawai & Manusela National Park",
    distance: "Seram Island · a boat crossing away",
    description:
      "A fishing village tucked against the cliff-foot of Seram Island, the gateway into the Manusela National Park jungle. Here the sea meets the rainforest in a single view.",
    image: withAlt(
      sawaiID.image,
      "Limestone sea cliffs near Sawai village, Seram Island",
    ),
  },
  {
    ...osiID,
    name: "Osi Island",
    distance: "Seram Island · West Seram",
    description:
      "A small island off western Seram, linked to the mainland by a long wooden bridge over clear shallow water — a walk across the sea before you arrive.",
    image: withAlt(
      osiID.image,
      "Wooden bridge and stilt houses over the clear sea of Osi Island, West Seram",
    ),
  },
];

/* TODO: contoh/placeholder — ganti dengan ulasan asli tamu (mengikuti site.ts) */
export const testimonialsEN: Testimonial[] = [
  {
    quote:
      "The kids played with the boat until they lost track of time while we grilled fish in front of the villa. In the evening everyone gathered in a gazebo to watch the sunset. It felt like having a beach of our own.",
    name: "The Pattiasina family",
    origin: "Ambon",
  },
  {
    quote:
      "We picked the glamping tent and have no regrets — falling asleep to the waves, waking up to the sea. In the morning we snorkeled at Lubang Buaya, just minutes from the resort.",
    name: "Dita & Farhan",
    origin: "Jakarta",
  },
  {
    quote:
      "The Starlink is genuinely fast. I worked remotely for two days from a gazebo overlooking the sea, then gave the whole weekend to my family. A hard combination to find.",
    name: "Yosua Latuheru",
    origin: "Makassar",
  },
  {
    quote:
      "Clean grounds, warm hosts, and a calm beach — none of the tourist-beach crowds. The big villa fit our group of eight with room to spare.",
    name: "Mrs. Rosa & friends",
    origin: "Passo, Ambon",
  },
];

export const heroImageEN: SiteImage = withAlt(
  heroImage,
  "The clear emerald water of Memit Beach with cottages and gazebos along Morella's forest edge, Shafira Resort",
);

export const introImagesEN = {
  portrait: withAlt(
    introImages.portrait,
    "Beachfront gazebos at Shafira Resort with a colorful stone garden",
  ),
  landscape: withAlt(
    introImages.landscape,
    "The Resort Shafira boat on a rocky beach with shade trees and the Morella sea",
  ),
};

export const locationImageEN: SiteImage = withAlt(
  locationImage,
  "Wooden cottage and grassy grounds facing the sea at Shafira Resort, Morella",
);

export const ctaImageEN: SiteImage = withAlt(
  ctaImage,
  "Sunset over the sea from Memit Beach, Shafira Resort Morella",
);

const galleryAltsEN = [
  "Memit Beach shoreline at Shafira Resort — a shady pebble beach with lounge benches and clear sea",
  "Sunset over the sea from Memit Beach, Shafira Resort Morella",
  "Video of the Memit Beach shoreline at Shafira Resort — white sand, shade trees, and a dusk sky",
  "Beachfront gazebos at Shafira Resort with a colorful stone garden",
  "The Resort Shafira boat on a rocky beach with shade trees and the Morella sea",
  "Sea view from the lounging area at Shafira Resort, Memit Beach",
  "Wooden cottage and grassy grounds facing the sea at Shafira Resort, Morella",
];

export const galleryImagesEN: SiteImage[] = galleryImages.map((img, i) =>
  withAlt(img, galleryAltsEN[i] ?? img.alt),
);

/* Jawaban FAQ versi Inggris — juga dipakai untuk schema FAQPage */
export const faqsEN: Faq[] = [
  {
    question: "Where is Shafira Resort located?",
    answer:
      "Shafira Resort sits on Memit Beach in Morella village, Leihitu District, Central Maluku — on the north coast of Ambon Island, Indonesia. It is about a one-hour drive from downtown Ambon along the Leihitu coastal road. You can find the exact spot on Google Maps at -3.5119, 128.2344.",
  },
  {
    question: "How much does it cost to stay at Shafira Resort?",
    answer:
      "There are three ways to stay: the Grand Villa at Rp1,500,000 per night for families or groups (two large bedrooms plus a private gazebo), the Double Room at Rp500,000 per night for two, and Beach Glamping tents at Rp350,000 per night right on the sand. All guests get free use of the boat, gazebos, cooking equipment, and Starlink internet.",
  },
  {
    question: "How do I book a room at Shafira Resort?",
    answer:
      "You book directly with the owner over WhatsApp at +62 852-4208-7190 — no middlemen and no booking platforms. Send your check-in dates, room type, and group size; the form on this website composes the message for you automatically.",
  },
  {
    question: "Is Shafira Resort a good beach resort in Ambon for a quiet getaway?",
    answer:
      "Yes — that is exactly what it is built for. Unlike the busier tourist beaches, Memit Beach stays calm: all you hear is the waves, and the sunset is visible straight from your gazebo. If you are looking for a quiet beach resort in Ambon or a peaceful place to stay in Maluku, Morella's coast is hard to beat.",
  },
  {
    question: "What can I do at Shafira Resort and nearby?",
    answer:
      "At the resort: swim in clear water, paddle the free-use boat, snorkel right off the beach, grill fish with the cooking kit provided, or simply settle into a gazebo. Nearby are the famous Lubang Buaya snorkeling spot (± 10 minutes) and the white sands of Liang Beach (Hunimua).",
  },
  {
    question: "Is there internet at the resort?",
    answer:
      "Yes. Shafira Resort runs on Starlink satellite internet covering the whole property, so you can upload photos, take video calls, and even work remotely from a gazebo facing the sea.",
  },
];
