# Shafira Resort — Website Resmi

Website company profile + pemesanan via WhatsApp untuk **Shafira Resort**,
resort pantai di Pantai Memit, Negeri Morella, Kecamatan Leihitu,
Maluku Tengah.

**Produksi:** https://shafiraresort.com

## Teknologi

- Next.js 15 (App Router, SSG penuh — tanpa backend/database)
- Tailwind CSS v4, font Fraunces + Albert Sans via `next/font`
- Ikon line dari `lucide-react`
- Semua pemesanan diarahkan ke WhatsApp `wa.me/6285242087190`

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

## Generate gambar AI (Cloudflare GPT Image 2.5 Flare)

```bash
export CLOUDFLARE_ACCOUNT_ID=...   # Dashboard Cloudflare → Account home → Account ID
export CLOUDFLARE_API_TOKEN=...    # My Profile → API Tokens → izin "Workers AI"
npm run image -- --prompt "Vila kayu di tepi Pantai Memit saat senja" --out generated/vila.jpg
```

Opsi: `--size 1536x1024|1024x1536|1024x1024`, `--quality low…max`,
`--image input.jpg` (mode edit). Di Claude Code cukup minta "buatkan gambar …" —
skill `.claude/skills/generate-image` akan memakai skrip ini.
