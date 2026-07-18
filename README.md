# Shafira Resort — Website Resmi

Website company profile + pemesanan via WhatsApp untuk **Shafira Resort**,
resort pantai di Pantai Memit, Negeri Morella, Kecamatan Leihitu,
Maluku Tengah.

**Produksi:** https://shafira-resort.vercel.app

## Teknologi

- Next.js 15 (App Router, SSG penuh — tanpa backend/database)
- Tailwind CSS v4, font Fraunces + Albert Sans via `next/font`
- Ikon line dari `lucide-react`
- Semua pemesanan diarahkan ke WhatsApp `wa.me/6285243762626`

## Mengubah konten

Seluruh konten situs (harga, fasilitas, destinasi, testimoni, kontak, foto)
ada di **satu file**: [`src/data/site.ts`](src/data/site.ts).
Cari kata `TODO` di file itu untuk menemukan bagian yang masih perlu
dikonfirmasi pemilik (kapasitas unit, jarak destinasi, jam operasional,
Instagram, koordinat, foto asli resort).

Setiap push ke branch `main` otomatis ter-deploy ke Vercel.

## Menjalankan secara lokal

```bash
npm install
npm run dev   # http://localhost:3000
npm run build # verifikasi build produksi
```

## Kredit foto

Foto sementara dari [Pexels](https://www.pexels.com) — tautan sumber ada di
kolom `credit` pada `src/data/site.ts`, siap diganti foto asli resort.
