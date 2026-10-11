"""Data edit bersama: segmen footage, foto, dan offset narasi per versi.

Semua waktu dalam detik. Dipakai oleh plates.py, mix.py, dan build_html.py.
"""

from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "source"
FOOT = ROOT / "assets" / "footage"
IMG = ROOT / "assets" / "img"
AUDIO = ROOT / "assets" / "audio"

V1 = SRC / "v1-rombongan.mp4"  # 1024x576 lanskap, 77 dtk — kerumunan, tenda, laut
V2 = SRC / "v2-glamping-gazebo.mp4"  # 1024x576 lanskap, 29 dtk — rumah, gazebo, glamping
V3 = SRC / "v3-pantai-portrait.mp4"  # 576x1024 potret (rotasi), 16 dtk — perahu, pantai

# id: (sumber, mulai, durasi, mode, fokus_x)
#   mode "full" = crop 9:16 memenuhi layar (fokus_x 0..1 posisi crop horizontal)
#   mode "band" = latar blur + footage lanskap utuh di tengah (kartu)
#   mode "native" = sumber sudah potret
SEGMENTS = {
    "crowd-hero": (V1, 38.0, 3.4, "full", 0.42),
    "crowd-tents": (V1, 30.0, 2.4, "full", 0.40),
    "crowd-wide": (V1, 41.0, 4.2, "band", 0.5),
    "family": (V1, 52.6, 2.2, "full", 0.55),
    "swing": (V1, 25.0, 3.7, "full", 0.62),
    "tent-close": (V1, 17.5, 2.6, "full", 0.55),
    "tents-row": (V1, 60.4, 3.3, "full", 0.42),
    "sea-swim": (V1, 11.3, 2.6, "band", 0.5),
    "umbrella": (V1, 69.0, 2.4, "band", 0.5),
    "gazebo": (V2, 5.6, 2.9, "band", 0.5),
    "glamping": (V2, 13.0, 5.3, "band", 0.5),
    "boat": (V3, 0.0, 2.8, "native", 0.5),
    "beach-portrait": (V3, 3.0, 2.0, "native", 0.5),
    "tents-portrait": (V3, 8.3, 3.2, "native", 0.5),
}

# Foto (sumber -> nama aset)
PHOTOS = {
    "foto-1.jpg": "pantai-tenda-1.jpg",  # lanskap: anak bermain, tenda merah, payung
    "foto-2.jpg": "ayunan-potret.jpg",  # potret: ayunan pohon
    "foto-3.jpg": "pantai-tenda-2.jpg",  # lanskap: keluarga di ayunan
    "foto-4.jpg": "area-tenda.jpg",  # lanskap: tenda warna-warni
    "foto-5.jpg": "tepi-laut.jpg",  # lanskap: pantai & tepi laut
    "foto-6.jpg": "laut-pohon-potret.jpg",  # potret: laut, perenang, pohon
    "foto-7.jpg": "ayunan-keluarga.jpg",  # lanskap: ayunan & kerumunan
    "foto-8.jpg": "rumah-potret.jpg",  # potret: rumah & kelapa
    "foto-9.jpg": "gazebo-potret.jpg",  # potret: gazebo tepi laut
}

# Offset narasi di timeline (detik) per versi
VO_OFFSET = {"tiktok": 0.2, "reels": 0.4}
TOTAL = {"tiktok": 29.0, "reels": 46.0}

# ------------------------------------------------------------------ timeline
# Potongan gambar (cut) jatuh di ketukan 120 BPM (kelipatan 0,5 dtk).
# (mulai, selesai, plate_atau_None, jenis_overlay)
CUTS = {
    "tiktok": [
        (0.0, 3.0, "crowd-hero", "hook"),
        (3.0, 5.0, "crowd-tents", "title"),
        (5.0, 10.0, None, "route"),
        (10.0, 11.0, "tents-row", "label:Tenda berjejer"),
        (11.0, 12.0, "tent-close", "label:di tepi pantai"),
        (12.0, 13.5, "beach-portrait", "label:Anak-anak berenang"),
        (13.5, 14.5, "family", "label:Orang tua santai"),
        (14.5, 15.5, "gazebo", "label:di gazebo"),
        (15.5, 17.5, "umbrella", "milik"),
        (17.5, 19.5, None, "montage"),
        (19.5, 24.0, "glamping", "price"),
        (24.0, 29.0, None, "cta"),
    ],
    "reels": [
        (0.0, 2.5, "boat", "date"),
        (2.5, 5.5, "crowd-hero", "guest"),
        (5.5, 7.5, "crowd-tents", "title"),
        (7.5, 10.5, None, "route"),
        (10.5, 12.0, "family", "label:Bukan sekadar liburan"),
        (12.0, 15.5, "swing", "full"),
        (15.5, 18.5, "tents-row", "label:Tenda warna-warni"),
        (18.5, 20.5, "sea-swim", "label:Laut yang tenang"),
        (20.5, 23.0, "gazebo", "label:Bercengkerama di gazebo"),
        (23.0, 31.0, None, "collage"),
        (31.0, 34.5, "crowd-wide", "chips"),
        (34.5, 39.5, "glamping", "price"),
        (39.5, 41.0, "tents-portrait", "location"),
        (41.0, 46.0, None, "cta"),
    ],
}

# SFX ElevenLabs: (file, waktu, gain)
SFX = {
    "tiktok": [
        ("impact1", 0.0, 0.9), ("whoosh1", 1.05, 0.45), ("pop1", 1.9, 0.7),
        ("riser1", 1.0, 0.55), ("impact2", 3.0, 1.0),
        ("whoosh2", 4.75, 0.5), ("pop2", 5.3, 0.6), ("pop1", 9.35, 0.7),
        ("whoosh1", 9.75, 0.45), ("whoosh2", 11.75, 0.35), ("whoosh1", 13.25, 0.35),
        ("impact1", 15.5, 0.55), ("pop2", 16.4, 0.6),
        ("whoosh2", 17.3, 0.3), ("whoosh1", 17.8, 0.3), ("whoosh2", 18.3, 0.3), ("whoosh1", 18.8, 0.3),
        ("impact2", 19.5, 0.8), ("pop1", 19.9, 0.5), ("pop2", 20.5, 0.5), ("pop1", 20.95, 0.5),
        ("pop2", 23.55, 0.85),
        ("whoosh2", 23.75, 0.5), ("impact1", 24.0, 0.85), ("pop1", 25.7, 0.6),
    ],
    "reels": [
        ("riser1", 0.5, 0.45), ("impact2", 2.5, 1.0), ("pop1", 4.6, 0.6),
        ("whoosh1", 5.3, 0.45), ("whoosh2", 7.25, 0.5), ("pop2", 7.8, 0.6), ("pop1", 10.1, 0.7),
        ("whoosh1", 10.3, 0.4), ("impact1", 12.0, 0.75), ("pop2", 13.4, 0.5),
        ("whoosh2", 15.25, 0.4), ("whoosh1", 18.25, 0.35), ("whoosh2", 20.25, 0.35),
        ("impact1", 23.0, 0.5),
        ("whoosh1", 30.75, 0.5), ("impact2", 31.0, 0.9),
        ("pop1", 31.7, 0.55), ("pop2", 32.6, 0.55), ("pop1", 33.8, 0.55),
        ("impact1", 34.5, 0.7), ("pop2", 35.2, 0.5), ("pop1", 35.7, 0.5), ("pop2", 36.1, 0.5),
        ("pop1", 38.9, 0.85),
        ("whoosh2", 39.25, 0.45), ("pop2", 39.7, 0.6),
        ("whoosh1", 40.75, 0.5), ("impact2", 41.0, 0.85), ("pop1", 42.5, 0.6),
    ],
}

# Ambience pantai (ElevenLabs) di adegan tanpa footage
AMBIENCE_GAIN = 0.22
FOOTAGE_AUDIO_GAIN = 0.16
