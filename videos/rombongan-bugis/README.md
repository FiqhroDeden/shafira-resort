# Video FYP — Rombongan Keluarga Besar Bugis (10 Okt 2026)

Dua video vertikal 1080×1920 30fps untuk TikTok (29 dtk) & Instagram Reels (46 dtk),
dibangun dengan HyperFrames (HTML + GSAP) dari foto/video WhatsApp asli.

| Output | File |
|---|---|
| TikTok | `renders/shafira-rombongan-bugis-tiktok.mp4` |
| Reels | `renders/shafira-rombongan-bugis-reels.mp4` |
| Cover | `cover/cover-tiktok.jpg`, `cover/cover-reels.jpg` |
| Caption posting | `POSTING.md` |

## Pipeline (semua dapat diulang)
```bash
python3 tools/plates.py              # source/ → assets/footage/*.mp4 (crop 9:16 / band blur, color grade) + assets/img
python3 music/compose.py tiktok      # musik orisinal → assets/audio/musik-tiktok.wav (+ beats json)
python3 music/compose.py reels
python3 tools/mix.py tiktok          # narasi + musik (ducking) + SFX + ambience → assets/audio/mix-tiktok.mp3 (-14 LUFS)
python3 tools/mix.py reels
python3 tools/build_html.py tiktok   # tulis index.html untuk versi tsb (HyperFrames: satu root per proyek)
npm run check && npx --yes hyperframes@0.8.142 render -o renders/x.mp4 -q delivery
```
`tools/edit.py` = satu sumber kebenaran: segmen footage, cut (di ketukan 120 BPM), daftar SFX.

- Narasi: ElevenLabs eleven_v4 (suara WING) — `assets/audio/narasi-*.mp3`, naskah di `SCRIPT.md`.
- SFX: ElevenLabs Sound Effects v2 — `music/sfx/`.
- Musik: disintesis dari kode (`music/compose.py`), bebas hak cipta.
- `assets/footage/` dan `assets/audio/musik-*.wav` tidak di-commit (besar; dibuat ulang oleh `tools/plates.py` dan `music/compose.py`, deterministik).
