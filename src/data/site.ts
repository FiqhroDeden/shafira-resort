/*
 * ============================================================
 *  DATA PUSAT SHAFIRA RESORT
 *  Seluruh konten situs (harga, teks, foto, kontak) diatur dari
 *  file ini — ubah di sini, tampilan ikut berubah otomatis.
 *
 *  Cari kata "TODO" untuk menemukan bagian yang masih perlu
 *  dikonfirmasi/diganti oleh pemilik resort.
 * ============================================================
 */

export type SiteImage = {
  src: string;
  alt: string;
  /** Sumber foto sementara (Pexels). Ganti dengan foto asli resort bila sudah ada. */
  credit: string;
};

export type Accommodation = {
  slug: string;
  name: string;
  /** Nama unit di pesan WhatsApp (default: name). Versi EN menyertakan nama asli. */
  waLabel?: string;
  /** Harga per malam dalam Rupiah */
  price: number;
  tagline: string;
  description: string;
  /** TODO: kapasitas masih asumsi — mohon dikoreksi pemilik */
  capacity: string;
  features: string[];
  image: SiteImage;
  gallery: SiteImage[];
};

export type Facility = {
  /** Nama ikon dari set lucide (lihat components/facility-icon.tsx) */
  icon: "boat" | "gazebo" | "canteen" | "cooking" | "wifi";
  title: string;
  description: string;
};

export type Destination = {
  name: string;
  /** Perkiraan jarak/waktu tempuh dari resort */
  distance: string;
  description: string;
  image: SiteImage;
};

export type Testimonial = {
  quote: string;
  name: string;
  origin: string;
};

export type Faq = {
  question: string;
  answer: string;
};

/* ------------------------------------------------------------ */
/*  IDENTITAS & KONTAK                                           */
/* ------------------------------------------------------------ */

export const site = {
  name: "Shafira Resort",
  tagline: "Tepi laut yang tenang di Pantai Memit, Morella",
  description:
    "Shafira Resort adalah resort pantai keluarga di Pantai Memit, Negeri Morella, Kecamatan Leihitu, Maluku Tengah — resort tepi laut di pesisir utara Pulau Ambon, sekitar satu jam berkendara dari Kota Ambon. Menginap di vila, kamar, atau glamping tepat di bibir pantai, dengan perahu bebas pakai, gazebo, snorkeling, dan sunset — tempat healing yang tenang di Ambon, Maluku.",
  url: "https://shafiraresort.com",
  whatsapp: "6285243762626",
  address: {
    beach: "Pantai Memit",
    village: "Negeri Morella",
    district: "Kecamatan Leihitu",
    regency: "Kabupaten Maluku Tengah",
    province: "Maluku",
  },
  hours: "Buka 24 jam untuk tamu menginap",
  instagram: "resortsafiramemit",
  /* Koordinat dari plus code F6QM+6QG (03°30′43″S 128°14′04″E) — situs lama resort */
  geo: { lat: -3.5119, lng: 128.2344 },
  mapsUrl: "https://maps.google.com/?q=-3.5119,128.2344",
  priceRange: "Rp350.000–Rp1.500.000",
} as const;

/* ------------------------------------------------------------ */
/*  AKOMODASI                                                    */
/* ------------------------------------------------------------ */

export const accommodations: Accommodation[] = [
  {
    slug: "vila-besar",
    name: "Vila Besar",
    price: 1_500_000,
    tagline: "Untuk keluarga & rombongan",
    description:
      "Unit paling lega di Shafira Resort. Vila kayu berdiri menghadap laut dengan ruang berkumpul yang luas — cukup untuk keluarga besar yang datang dari Ambon untuk berakhir pekan, atau rombongan yang ingin masak dan bakar-bakar sendiri di tepi pantai.",
    // 2 kamar besar + 1 gazebo besar (sumber: situs lama resort); jumlah tamu masih asumsi
    capacity: "Hingga 8 tamu · 2 kamar besar · gazebo privat",
    features: [
      "Teras menghadap langsung ke laut",
      "Ruang keluarga luas untuk berkumpul",
      "Akses dapur bersama + peralatan masak lengkap",
      "Prioritas pemakaian perahu resort",
      "Cocok untuk acara keluarga & arisan",
    ],
    image: {
      src: "/photos/vila-besar-shafira-resort.jpg",
      alt: "Vila Besar Shafira Resort — vila kayu dengan teras berlampu hangat di malam hari",
      credit: "Foto asli Shafira Resort (Instagram @resortsafiramemit)",
    },
    gallery: [
      {
        src: "/photos/vila/galeri-1.jpg",
        alt: "Teras Vila Besar Shafira Resort dengan kursi santai menghadap kebun kelapa",
        credit: "Foto asli Shafira Resort",
      },
      {
        src: "/photos/vila/galeri-2.jpg",
        alt: "Kamar Vila Besar Shafira Resort berdinding kayu dengan ranjang dan kipas angin",
        credit: "Foto asli Shafira Resort",
      },
      {
        src: "/photos/vila/galeri-3.jpg",
        alt: "Gazebo privat Vila Besar Shafira Resort menghadap laut Pantai Memit Morella",
        credit: "Foto asli Shafira Resort",
      },
    ],
  },
  {
    slug: "kamar",
    name: "Kamar",
    price: 500_000,
    tagline: "Untuk pasangan & tamu berdua",
    description:
      "Kamar yang hangat dan sederhana untuk dua orang — cukup dekat ke bibir pantai untuk mendengar ombak dari tempat tidur. Pas untuk pasangan yang ingin menghabiskan sore di gazebo dan menutup hari dengan sunset Pantai Memit.",
    // TODO: asumsi — konfirmasi kapasitas & fasilitas kamar mandi
    capacity: "2 tamu · 1 ranjang besar",
    features: [
      "Beberapa langkah ke bibir pantai",
      "Kamar mandi dalam",
      "Teras kecil untuk duduk sore",
      "Akses semua fasilitas resort",
    ],
    image: {
      src: "/photos/kamar/utama.jpg",
      alt: "Teras kamar Shafira Resort dengan kursi rotan, jendela berbingkai kayu cokelat, dan taman batu warna-warni di Pantai Memit Morella",
      credit: "Foto asli Shafira Resort",
    },
    gallery: [
      {
        src: "/photos/kamar/galeri-1.jpg",
        alt: "Interior kamar Shafira Resort dengan ranjang besar dan pendingin ruangan (AC)",
        credit: "Foto asli Shafira Resort",
      },
      {
        src: "/photos/kamar/galeri-2.jpg",
        alt: "Kamar mandi dalam kamar Shafira Resort dengan kloset duduk dan dinding berkeramik",
        credit: "Foto asli Shafira Resort",
      },
      {
        src: "/photos/kamar/galeri-3.jpg",
        alt: "Teras kamar menghadap kebun kelapa dan laut di Shafira Resort, Pantai Memit Morella",
        credit: "Foto asli Shafira Resort",
      },
    ],
  },
  {
    slug: "glamping",
    name: "Glamping",
    price: 350_000,
    tagline: "Tidur paling dekat dengan pantai",
    description:
      "Tenda glamping berdiri di antara pohon kelapa, hanya beberapa meter dari pasir. Pilihan paling hemat untuk merasakan tidur diiringi suara ombak — bangun pagi, buka tenda, dan laut Morella sudah di depan mata.",
    // TODO: asumsi — konfirmasi kapasitas & kelengkapan tenda
    capacity: "2–3 tamu · kasur + kipas",
    features: [
      "Lokasi paling dekat ke pasir pantai",
      "Kasur nyaman di dalam tenda",
      "Lampu & colokan listrik",
      "Pengalaman api unggun (atas permintaan)",
    ],
    image: {
      src: "/photos/glamping/utama.jpg",
      alt: "Tenda glamping Shafira Resort dengan kursi santai di bawah kanopi, di tepi Pantai Memit Morella",
      credit: "Foto asli Shafira Resort",
    },
    gallery: [
      {
        src: "/photos/glamping/galeri-1.jpg",
        alt: "Tenda glamping Shafira Resort pada malam hari dengan latar pepohonan dan gazebo tepi pantai",
        credit: "Foto asli Shafira Resort",
      },
      {
        src: "/photos/glamping/galeri-2.jpg",
        alt: "Interior tenda glamping Shafira Resort dengan kasur, kipas angin, dan alas bermotif",
        credit: "Foto asli Shafira Resort",
      },
      {
        src: "/photos/glamping/galeri-3.jpg",
        alt: "Sajian mi kuah hangat dan sambal di area glamping Shafira Resort tepi pantai",
        credit: "Foto asli Shafira Resort",
      },
    ],
  },
];

/* ------------------------------------------------------------ */
/*  FASILITAS                                                    */
/* ------------------------------------------------------------ */

export const facilities: Facility[] = [
  {
    icon: "boat",
    title: "Perahu bebas pakai",
    description:
      "Dayung sendiri menyusuri perairan tenang di sekitar pantai — gratis untuk tamu menginap.",
  },
  {
    icon: "gazebo",
    title: "Gazebo santai",
    description:
      "Banyak gazebo tersebar di tepi pantai untuk duduk sore, makan bersama, atau tidur siang diiringi angin laut.",
  },
  {
    icon: "canteen",
    title: "Kantin",
    description:
      "Makanan dan minuman ringan tersedia di kantin resort — tak perlu keluar area untuk mengisi perut.",
  },
  {
    icon: "cooking",
    title: "Peralatan masak lengkap",
    description:
      "Kompor gas dan alat masak disediakan. Bawa bahan segar dari pasar, sisanya biar dapur kami yang melengkapi — cocok untuk bakar-bakar ikan.",
  },
  {
    icon: "wifi",
    title: "Internet cepat Starlink",
    description:
      "Tetap terhubung di tepi laut Morella — internet satelit Starlink menjangkau seluruh area resort.",
  },
];

/* ------------------------------------------------------------ */
/*  DESTINASI SEKITAR                                            */
/*  TODO: seluruh jarak/waktu tempuh adalah estimasi konservatif */
/*  dari area Pantai Memit — mohon dikoreksi pemilik.            */
/* ------------------------------------------------------------ */

export const destinations: Destination[] = [
  {
    name: "Pantai Lubang Buaya",
    distance: "± 10 menit berkendara",
    description:
      "Spot snorkeling dan diving paling terkenal di Morella. Airnya sebening kaca — ikan berenang sampai ke tepian, bahkan terlihat dari atas tangga masuknya.",
    image: {
      src: "/photos/snorkeling-terumbu-karang-morella.jpg",
      alt: "Terumbu karang warna-warni dengan kawanan ikan di laut jernih Morella",
      credit: "Foto asli Shafira Resort",
    },
  },
  {
    name: "Mata Air Belanda",
    distance: "± 15 menit berkendara",
    description:
      "Mata air alami yang mengalir langsung ke laut — air tawar sejuk bertemu air laut hangat di satu titik. Tempat mandi favorit sejak zaman kolonial.",
    image: {
      src: "https://images.pexels.com/photos/35269348/pexels-photo-35269348.jpeg?auto=compress&cs=tinysrgb&w=1920",
      alt: "Pantai tenang berair jernih dengan hutan hijau lebat di belakangnya",
      credit: "Pexels — https://www.pexels.com/photo/35269348/",
    },
  },
  {
    name: "Benteng Kapahaha",
    distance: "± 30 menit jalan kaki mendaki",
    description:
      "Situs sejarah perjuangan rakyat Morella melawan penjajah di atas bukit. Dari puncaknya, laut Seram terhampar — sepadan dengan pendakiannya.",
    image: {
      src: "https://images.pexels.com/photos/8300514/pexels-photo-8300514.jpeg?auto=compress&cs=tinysrgb&w=1920",
      alt: "Pemandangan dari ketinggian ke arah pantai berbatu dan laut jernih",
      credit: "Pexels — https://www.pexels.com/photo/8300514/",
    },
  },
  {
    name: "Pantai Liang (Hunimua)",
    distance: "± 30 menit berkendara",
    description:
      "Pantai pasir putih sepanjang hampir satu kilometer yang pernah dinobatkan UNDP sebagai salah satu pantai terindah di Indonesia.",
    image: {
      src: "https://images.pexels.com/photos/18558249/pexels-photo-18558249/free-photo-of-a-sandy-beach-with-clear-water-and-white-sand.jpeg?auto=compress&cs=tinysrgb&w=1920",
      alt: "Hamparan pantai pasir putih dengan air laut biru kehijauan",
      credit: "Pexels — https://www.pexels.com/photo/18558249/",
    },
  },
  {
    name: "Pantai Memit",
    distance: "Tepat di depan resort",
    description:
      "Pantai utama Shafira Resort sekaligus panggung sunset terbaiknya. Sore hari, langit di atas laut berubah jingga — cukup duduk di gazebo dan menonton.",
    image: {
      src: "https://images.pexels.com/photos/12446345/pexels-photo-12446345.jpeg?auto=compress&cs=tinysrgb&w=1920",
      alt: "Matahari terbenam keemasan di pantai dengan siluet pohon kelapa",
      credit: "Pexels — https://www.pexels.com/photo/12446345/",
    },
  },
];

/* ------------------------------------------------------------ */
/*  TESTIMONI                                                    */
/*  TODO: ini contoh/placeholder — ganti dengan ulasan asli tamu */
/* ------------------------------------------------------------ */

export const testimonials: Testimonial[] = [
  {
    quote:
      "Anak-anak main perahu sampai lupa waktu, kami orang tua bakar ikan di depan vila. Sore-sore semua kumpul di gazebo menonton sunset. Rasanya seperti punya pantai sendiri.",
    name: "Keluarga Pattiasina",
    origin: "Ambon",
  },
  {
    quote:
      "Kami pilih glamping dan tidak menyesal — tidur dengar ombak, bangun langsung lihat laut. Paginya snorkeling ke Lubang Buaya, dekat sekali dari resort.",
    name: "Dita & Farhan",
    origin: "Jakarta",
  },
  {
    quote:
      "Starlink-nya beneran kencang. Saya sempat kerja remote dua hari dari gazebo sambil memandang laut, lalu weekend penuh untuk keluarga. Kombinasi yang sulit dicari.",
    name: "Yosua Latuheru",
    origin: "Makassar",
  },
  {
    quote:
      "Tempatnya bersih, pemiliknya ramah, dan pantainya tenang — tidak ramai seperti pantai wisata lain. Vila besarnya muat rombongan arisan kami, 8 orang, masih lega.",
    name: "Ibu Rosa & rombongan",
    origin: "Passo, Ambon",
  },
];

/* ------------------------------------------------------------ */
/*  TANYA JAWAB (FAQ)                                            */
/*  Jawaban ini juga dipakai untuk schema FAQPage (SEO/AI).      */
/* ------------------------------------------------------------ */

export const faqs: Faq[] = [
  {
    question: "Di mana lokasi Shafira Resort?",
    answer:
      "Shafira Resort berada di Pantai Memit, Negeri Morella, Kecamatan Leihitu, Kabupaten Maluku Tengah — di pesisir utara Pulau Ambon. Dari pusat Kota Ambon jaraknya sekitar satu jam berkendara lewat jalur pesisir Leihitu. Titik persisnya bisa dibuka di Google Maps pada koordinat -3.5119, 128.2344.",
  },
  {
    question: "Berapa harga menginap di Shafira Resort?",
    answer:
      "Ada tiga pilihan menginap: Vila Besar Rp1.500.000 per malam untuk keluarga atau rombongan (dua kamar besar plus gazebo privat), Kamar Rp500.000 per malam untuk berdua, dan tenda Glamping Rp350.000 per malam tepat di tepi pantai. Semua tamu bebas memakai perahu, gazebo, peralatan masak, dan internet Starlink tanpa biaya tambahan.",
  },
  {
    question: "Bagaimana cara memesan kamar di Shafira Resort?",
    answer:
      "Pemesanan langsung ke pemilik resort lewat WhatsApp di +62 852-4376-2626, tanpa perantara dan tanpa aplikasi booking. Cukup kirim tanggal check-in, tipe unit, dan jumlah tamu — formulir di situs ini bisa menyusunkan pesannya secara otomatis.",
  },
  {
    question: "Apakah Shafira Resort cocok untuk tempat healing di Ambon?",
    answer:
      "Ya — banyak tamu datang justru untuk itu. Berbeda dari pantai wisata yang ramai, Pantai Memit tenang: yang terdengar hanya ombak, dan sunset terlihat langsung dari gazebo. Bagi yang mencari tempat healing di Ambon atau resort di Maluku yang jauh dari keramaian, resort pantai di Morella ini memang dibangun untuk memperlambat hari.",
  },
  {
    question: "Apa saja yang bisa dilakukan di Shafira Resort dan sekitarnya?",
    answer:
      "Di dalam resort: berenang di laut jernih, mendayung perahu, snorkeling di depan pantai, bakar ikan dengan peralatan masak yang disediakan, atau bersantai di gazebo. Di sekitarnya ada spot snorkeling Pantai Lubang Buaya (± 10 menit), Mata Air Belanda, situs sejarah Benteng Kapahaha, dan Pantai Liang (Hunimua) yang terkenal.",
  },
  {
    question: "Apakah ada sinyal internet di resort?",
    answer:
      "Ada. Shafira Resort memakai internet satelit Starlink yang menjangkau seluruh area resort, jadi tetap bisa mengirim foto, video call, bahkan kerja remote dari gazebo menghadap laut.",
  },
];

/* ------------------------------------------------------------ */
/*  GALERI & FOTO PENDUKUNG                                      */
/* ------------------------------------------------------------ */

export const heroImage: SiteImage = {
  src: "/photos/cottage-laut-shafira-resort-memit.jpg",
  alt: "Cottage ungu Shafira Resort berdiri di atas laut jernih kehijauan Pantai Memit dengan latar hutan Morella",
  credit: "Foto asli Shafira Resort",
};

export const introImages: { portrait: SiteImage; landscape: SiteImage } = {
  portrait: {
    src: "/photos/dermaga-shafira-resort-morella.jpg",
    alt: "Dermaga kayu ungu Shafira Resort berhias lampion dengan gazebo di atas air laut jernih",
    credit: "Foto asli Shafira Resort",
  },
  landscape: {
    src: "https://images.pexels.com/photos/9802332/pexels-photo-9802332.jpeg?auto=compress&cs=tinysrgb&w=1920",
    alt: "Perahu kayu melaju di air laut jernih dengan latar pepohonan hijau",
    credit: "Pexels — https://www.pexels.com/photo/9802332/",
  },
};

export const ctaImage: SiteImage = {
  src: "/photos/sunset-dermaga-pantai-memit.jpg",
  alt: "Matahari terbenam jingga di balik dermaga dan gazebo Shafira Resort, Pantai Memit Morella",
  credit: "Foto asli Shafira Resort",
};

export const galleryImages: SiteImage[] = [
  {
    src: "https://images.pexels.com/photos/11090567/pexels-photo-11090567.jpeg?auto=compress&cs=tinysrgb&w=1920",
    alt: "Ombak kecil berair jernih menyapu pantai berpasir",
    credit: "Pexels — https://www.pexels.com/photo/11090567/",
  },
  {
    src: "https://images.pexels.com/photos/36609167/pexels-photo-36609167/free-photo-of-traditional-longtail-boat-on-phuket-s-turquoise-waters.jpeg?auto=compress&cs=tinysrgb&w=1920",
    alt: "Perahu kayu tradisional terapung di laut biru kehijauan",
    credit: "Pexels — https://www.pexels.com/photo/36609167/",
  },
  {
    src: "https://images.pexels.com/photos/984291/pexels-photo-984291.jpeg?auto=compress&cs=tinysrgb&w=1920",
    alt: "Gazebo kayu di ujung dermaga menghadap laut",
    credit: "Pexels — https://www.pexels.com/photo/984291/",
  },
  {
    src: "/photos/terumbu-karang-pantai-memit.jpg",
    alt: "Terumbu karang lunak dan ikan-ikan kecil di perairan Pantai Memit",
    credit: "Foto asli Shafira Resort",
  },
  {
    src: "https://images.pexels.com/photos/10218413/pexels-photo-10218413.jpeg?auto=compress&cs=tinysrgb&w=1920",
    alt: "Pantai tropis berair biru jernih dengan garis pantai berbatu",
    credit: "Pexels — https://www.pexels.com/photo/10218413/",
  },
  {
    src: "https://images.pexels.com/photos/4870971/pexels-photo-4870971.jpeg?auto=compress&cs=tinysrgb&w=1920",
    alt: "Siluet pohon kelapa di depan langit senja berwarna jingga",
    credit: "Pexels — https://www.pexels.com/photo/4870971/",
  },
];
