# Runbook: Domain Sendiri → Search Console → Google Business Profile

Panduan langkah demi langkah setelah memutuskan membeli domain untuk
Shafira Resort. Kerjakan berurutan — setiap fase bergantung pada fase
sebelumnya. Tanda **[pemilik]** berarti langkah itu butuh akun/identitas
pemilik dan tidak bisa diwakilkan; sisanya bisa dibantu Claude.

**Nilai-nilai penting proyek ini (dipakai berulang di bawah):**

| Hal | Nilai |
|---|---|
| Proyek Vercel | `shafira-resort` (team `fiqhrodedens-projects`) |
| Repo GitHub | `FiqhroDeden/shafira-resort` |
| URL sementara | `https://shafira-resort.vercel.app` |
| Nama bisnis | Shafira Resort |
| Alamat | Pantai Memit, Negeri Morella, Kec. Leihitu, Kab. Maluku Tengah, Maluku |
| Koordinat / plus code | `-3.5119, 128.2344` / `F6QM+6QG` |
| Telepon/WA | `+62 822-3976-7944` |
| Instagram | `@resortsafiramemit` |
| Jam | Buka 24 jam (tamu menginap) |

---

## Fase 0 — Membeli domain **[pemilik]**

1. Pilih nama. Rekomendasi berurutan:
   - `shafiraresort.com` — paling universal, tanpa syarat dokumen (± Rp180–250rb/tahun)
   - `shafiraresort.id` — kesan lokal kuat; syarat KTP (± Rp250rb/tahun)
   - Hindari nama panjang/strip (`shafira-resort-morella.com`).
2. Tempat beli (pilih satu):
   - **Paling sederhana: langsung di Vercel** — dashboard proyek → *Settings → Domains → Buy* — DNS & SSL otomatis beres, Fase 1 hampir bisa dilewati.
   - Registrar Indonesia (Niagahoster, Domainesia, Rumahweb) atau global (Cloudflare, Namecheap) — perlu setting DNS manual di Fase 1.
3. Catatan: cukup **satu** domain. Versi `www` akan di-redirect ke domain utama.

## Fase 1 — Menghubungkan domain ke Vercel

*Lewati langkah 2 jika domain dibeli langsung di Vercel.*

1. **[pemilik]** Vercel dashboard → proyek `shafira-resort` → *Settings → Domains* → *Add* → masukkan domain (mis. `shafiraresort.com`). Tambahkan juga `www.shafiraresort.com` dan pilih *Redirect to shafiraresort.com*.
2. **[pemilik]** Di registrar, set DNS sesuai instruksi yang Vercel tampilkan:
   - Record `A` untuk `@` → `76.76.21.21`
   - Record `CNAME` untuk `www` → `cname.vercel-dns.com`
   - (Alternatif: ganti nameserver ke `ns1.vercel-dns.com` & `ns2.vercel-dns.com` agar Vercel mengelola semua DNS — memudahkan verifikasi TXT di Fase 3.)
3. Tunggu propagasi (menit–24 jam). Vercel otomatis menerbitkan sertifikat SSL. Status di halaman Domains harus **Valid Configuration**.
4. Set `shafira-resort.vercel.app` menjadi *Redirect to primary domain* di halaman Domains yang sama, supaya tidak ada dua alamat berisi konten sama (duplicate content).

## Fase 2 — Update kode situs (bisa dikerjakan Claude)

Setelah domain aktif, ada **dua file** yang memuat URL:

1. [src/data/site.ts](src/data/site.ts) — ganti satu baris:
   ```ts
   url: "https://shafiraresort.com",
   ```
   Ini otomatis memperbaiki: canonical, hreflang, Open Graph, sitemap,
   robots, dan seluruh JSON-LD.
2. [public/llms.txt](public/llms.txt) — ganti 4 URL halaman di bagian "Pages"
   (file statis, tidak ikut variabel).
3. Opsional: URL produksi di [README.md](README.md).
4. Commit & push → auto-deploy. Lalu verifikasi (bisa minta Claude):
   ```bash
   curl -s https://shafiraresort.com/sitemap.xml | grep "<loc>"   # harus domain baru
   curl -s https://shafiraresort.com/ | grep -o 'rel="canonical"[^>]*'
   curl -sI https://shafira-resort.vercel.app/ | grep -i location  # harus redirect 308
   ```

## Fase 3 — Google Search Console

1. **[pemilik]** Buka [search.google.com/search-console](https://search.google.com/search-console) dengan akun Google pemilik → *Add property* → pilih tipe **Domain** (bukan URL prefix) → masukkan `shafiraresort.com`.
2. **[pemilik]** Verifikasi kepemilikan: salin record `TXT` yang diberikan Google → tempel di DNS (registrar, atau Vercel *Settings → Domains → DNS Records* jika pakai nameserver Vercel) → klik *Verify* (kadang perlu tunggu ± 1 jam).
3. Menu *Sitemaps* → submit: `https://shafiraresort.com/sitemap.xml`.
4. Menu *URL Inspection* → masukkan lalu klik *Request Indexing* satu per satu untuk 4 halaman: `/`, `/en`, `/akomodasi`, `/en/accommodation`.
5. (Opsional, berguna untuk AI search) Ulangi hal serupa di [Bing Webmaster Tools](https://www.bing.com/webmasters) — bisa impor langsung dari Search Console. Bing adalah sumber data beberapa AI chat.
6. **Rutin bulanan:** buka tab *Performance* → lihat kueri yang menampilkan situs ("resort di ambon", "tempat healing di ambon", dll.). Kueri yang muncul tapi posisinya rendah = bahan menambah konten/FAQ baru (minta Claude).

Ekspektasi: halaman mulai terindeks dalam hitungan hari–2 minggu; posisi ranking bergerak dalam 1–3 bulan.

## Fase 4 — Google Business Profile (kunci ranking lokal & Google Maps)

Ini penentu terbesar untuk kueri "resort di ambon" / "resort di maluku"
di Google Maps dan panel lokal hasil pencarian.

1. **[pemilik]** Cek dulu: cari "Shafira Resort Morella" di Google Maps.
   - Jika **sudah ada** listing-nya → buka → klik *Klaim bisnis ini / Own this business?* → ikuti proses klaim.
   - Jika **belum ada** → [business.google.com](https://business.google.com) → *Tambahkan bisnis*.
2. Isi profil:
   - Nama: `Shafira Resort` (persis, tanpa embel-embel "Pantai Memit" — konsistensi nama penting)
   - Kategori utama: **Resor** (tambahan: *Hotel*, *Vila*, *Perkemahan* untuk glamping)
   - Alamat: Pantai Memit, Negeri Morella, Kec. Leihitu, Kab. Maluku Tengah, Maluku — geser pin peta ke `-3.5119, 128.2344` (plus code `F6QM+6QG`)
   - Area layanan: biarkan kosong (bisnis dengan lokasi fisik)
3. **[pemilik]** Verifikasi. Untuk lokasi seperti Morella biasanya Google menawarkan **verifikasi video**: siapkan rekaman berjalan yang memperlihatkan plang/gerbang resort, bangunan, dan sekitar pantai dalam satu pengambilan. Alternatif: kartu pos (± 2 minggu) atau telepon.
4. Lengkapi (semakin lengkap = semakin tinggi peluang tampil):
   - Jam: **Buka 24 jam**
   - Telepon: `+62 822-3976-7944` · Situs web: `https://shafiraresort.com`
   - Link janji temu/pemesanan: `https://wa.me/6282239767944`
   - Foto: unggah foto-foto asli (mulai dari 6 foto di `public/photos/` repo ini, lalu tambah dari HP: kamar, kantin, perahu, tamu beraktivitas). Target awal ± 20 foto.
   - Atribut: Wi-Fi, parkir gratis, cocok untuk anak, pantai
   - Deskripsi (salin ini):
     > Resort pantai keluarga di Pantai Memit, Negeri Morella, Maluku Tengah — sekitar satu jam berkendara dari Kota Ambon. Menginap di vila, kamar, atau glamping tepat di tepi laut, dengan perahu bebas pakai, gazebo, peralatan masak, snorkeling, dan internet Starlink. Pemesanan langsung via WhatsApp.
5. **Rutin setelah aktif:**
   - Minta tamu memberi ulasan — bagikan link ulasan dari dashboard GBP (mis. lewat WA setelah check-out). Balas setiap ulasan.
   - Posting foto/promo 1–2× sebulan dari dashboard GBP.
   - Pastikan Nama-Alamat-Telepon **konsisten persis** di: situs web (footer), GBP, dan bio Instagram @resortsafiramemit.
6. Setelah GBP aktif, beri tahu Claude → link profil GBP akan ditambahkan ke `sameAs` di JSON-LD situs.

## Fase 5 — Lanjutan (opsional, berdampak jangka panjang)

- [ ] Ganti 4 testimoni contoh di `src/data/site.ts` dengan kutipan ulasan asli dari GBP (tulis nama seizin tamu).
- [ ] Ganti sisa foto Pexels (kamar, glamping, galeri) dengan foto asli — cukup edit `src/data/site.ts` + `site-en.ts`.
- [ ] Ajukan resort ke direktori/artikel wisata Maluku (Atourin, dispar.malukuprov.go.id, blog wisata) — backlink lokal memperkuat ranking.
- [ ] Validasi ulang structured data: [search.google.com/test/rich-results](https://search.google.com/test/rich-results) → masukkan URL beranda.
- [ ] Pantau pertanyaan tamu di WA — pertanyaan yang sering muncul jadi kandidat FAQ baru (naikkan peluang tampil di AI search).

---

*Runbook dibuat 19 Juli 2026. Jika ada langkah yang berubah di sisi
Google/Vercel, minta Claude memperbarui file ini.*
