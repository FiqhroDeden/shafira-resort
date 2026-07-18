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
  site,
  type Accommodation,
  type Destination,
  type Facility,
  type SiteImage,
  type Testimonial,
} from "./site";

export const siteEN = {
  ...site,
  tagline: "A quiet seaside stay on Memit Beach, Morella",
  description:
    "Shafira Resort is a family beach resort on Memit Beach in Morella village, Central Maluku, Indonesia — about an hour's drive from Ambon. Stay in a villa, room, or beachfront glamping tent, with a free-use boat, gazebos, and the clear seas of Ambon's quiet north coast.",
  // TODO: konfirmasi jam operasional (mengikuti site.ts)
  hours: "Open daily, 8 AM–9 PM WIT (to be confirmed)",
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
    // TODO: kapasitas asumsi (mengikuti site.ts)
    capacity: "Up to 8 guests · 3 bedrooms",
    features: [
      "Terrace facing the open sea",
      "Spacious living room for gathering",
      "Shared kitchen with full cooking kit",
      "Priority use of the resort boat",
      "Great for family events & get-togethers",
    ],
    image: withAlt(
      vilaID.image,
      "Timber villa by clear seas with coconut palms around it",
    ),
    gallery: [
      withAlt(
        vilaID.gallery[0],
        "Wooden house on a rocky shoreline surrounded by greenery",
      ),
      withAlt(
        vilaID.gallery[1],
        "Thatched-roof villa on the beach against tropical forest",
      ),
      withAlt(
        vilaID.gallery[2],
        "Wood-panelled bedroom with a white canopy bed",
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
      "Bright bedroom with wooden furniture and windows onto tropical greenery",
    ),
    gallery: [
      withAlt(
        kamarID.gallery[0],
        "Traditional-style bedroom in warm light",
      ),
      withAlt(
        kamarID.gallery[1],
        "Tropical villa bedroom with doors open to a balcony",
      ),
      withAlt(
        kamarID.gallery[2],
        "Spacious wooden room with a canopy bed and natural light",
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
      "White glamping tents among coconut palms",
    ),
    gallery: [
      withAlt(
        glampingID.gallery[0],
        "Glamping tent with string lights glowing at night",
      ),
      withAlt(
        glampingID.gallery[1],
        "Glamping tent interior with a mattress and warm décor",
      ),
      withAlt(
        glampingID.gallery[2],
        "Row of glamping tents with string lights on the grass",
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
const [lubangBuayaID, airBelandaID, kapahahaID, liangID, memitID] =
  destinations;

export const destinationsEN: Destination[] = [
  {
    ...lubangBuayaID,
    name: "Lubang Buaya Beach",
    distance: "± 10 minutes by car",
    description:
      "Morella's most famous snorkeling and diving spot. The water is glass-clear — fish swim right up to the entry steps on the shoreline.",
    image: withAlt(
      lubangBuayaID.image,
      "Snorkeler among schools of fish in clear blue water",
    ),
  },
  {
    ...airBelandaID,
    name: "Air Belanda Spring",
    distance: "± 15 minutes by car",
    description:
      "A natural spring that flows straight into the sea — cool freshwater meets warm saltwater at a single point. A favorite bathing spot since colonial times.",
    image: withAlt(
      airBelandaID.image,
      "Calm clear-water beach backed by dense green forest",
    ),
  },
  {
    ...kapahahaID,
    name: "Kapahaha Fortress",
    distance: "± 30-minute uphill walk",
    description:
      "A hilltop site of Morella's resistance against colonial forces. From the top, the Seram Sea stretches wide — worth every step of the climb.",
    image: withAlt(
      kapahahaID.image,
      "View from a height over a rocky shore and clear sea",
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
      "Stretch of white-sand beach with turquoise water",
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
      "Golden sunset over the beach with silhouetted coconut palms",
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
  "Tropical beach with clear water, a rocky shoreline, and a green hill",
);

export const introImagesEN = {
  portrait: withAlt(
    introImages.portrait,
    "Coconut palm leaning over clear turquoise sea",
  ),
  landscape: withAlt(
    introImages.landscape,
    "Wooden boat moving through clear water with green trees behind",
  ),
};

export const ctaImageEN: SiteImage = withAlt(
  ctaImage,
  "Golden sunset on a tropical beach lined with coconut palms",
);

const galleryAltsEN = [
  "Small clear waves washing over a sandy beach",
  "Traditional wooden boat floating on turquoise sea",
  "Wooden gazebo at the end of a pier facing the sea",
  "Small fish swimming near a coral reef in sunlit water",
  "Tropical beach with clear blue water and a rocky shoreline",
  "Silhouetted coconut palms against an orange evening sky",
];

export const galleryImagesEN: SiteImage[] = galleryImages.map((img, i) =>
  withAlt(img, galleryAltsEN[i] ?? img.alt),
);
