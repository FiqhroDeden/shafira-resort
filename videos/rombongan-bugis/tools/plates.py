"""Bangun plate footage vertikal 1080x1920 ber-color-grade dari video WhatsApp.

    python3 tools/plates.py          # semua segmen + foto
    python3 tools/plates.py swing    # satu segmen
"""

import subprocess
import sys

from edit import FOOT, IMG, PHOTOS, SEGMENTS, SRC

# Grade hangat & bersih untuk footage pantai yang berkabut:
# kontras naik, saturasi naik, midtone sedikit hangat, highlight tidak pecah.
GRADE = (
    "eq=contrast=1.13:saturation=1.38:brightness=0.005:gamma=0.96,"
    "colorbalance=rs=0.03:gs=0.0:bs=-0.04:rm=0.04:gm=0.01:bm=-0.03:rh=0.02:bh=-0.02,"
    "curves=master='0/0 0.25/0.22 0.75/0.79 1/0.98'"
)
SHARP = "unsharp=5:5:0.9:5:5:0.0"
ENC = ["-an", "-c:v", "libx264", "-preset", "slow", "-crf", "17", "-pix_fmt", "yuv420p", "-r", "30", "-movflags", "+faststart"]


def run(args):
    subprocess.run(["ffmpeg", "-v", "error", "-y", *args], check=True)


def plate(name):
    src, start, dur, mode, fx = SEGMENTS[name]
    out = FOOT / f"{name}.mp4"
    inp = ["-ss", f"{start}", "-t", f"{dur}", "-i", str(src)]
    if mode == "full":
        # crop 9:16 dari tinggi penuh (324x576) lalu skala ke 1080x1920
        cw = 324
        x = int((1024 - cw) * fx)
        vf = f"crop={cw}:576:{x}:0,scale=1080:1920:flags=lanczos,{GRADE},{SHARP},hqdn3d=1.5:1.5:3:3,fps=30"
        run([*inp, "-vf", vf, *ENC, str(out)])
    elif mode == "native":
        vf = f"scale=1080:1920:flags=lanczos,{GRADE},{SHARP},fps=30"
        run([*inp, "-vf", vf, *ENC, str(out)])
    elif mode == "band":
        # latar: footage diperbesar, blur kuat & digelapkan; depan: footage utuh 1080 lebar
        fc = (
            f"[0:v]{GRADE},split=2[a][b];"
            f"[a]scale=-2:1920,crop=1080:1920,boxblur=28:3,eq=brightness=-0.12:saturation=1.2[bg];"
            f"[b]scale=1080:-2:flags=lanczos,{SHARP}[fg];"
            f"[bg][fg]overlay=0:(H-h)/2-80,fps=30[v]"
        )
        run([*inp, "-filter_complex", fc, "-map", "[v]", *ENC, str(out)])
    print("plate", name, mode)


def photos():
    for src, dst in PHOTOS.items():
        vf = f"{GRADE},{SHARP}"
        run(["-i", str(SRC / src), "-vf", vf, "-q:v", "3", str(IMG / dst)])
        print("foto", dst)


if __name__ == "__main__":
    FOOT.mkdir(parents=True, exist_ok=True)
    IMG.mkdir(parents=True, exist_ok=True)
    names = sys.argv[1:] or list(SEGMENTS)
    for n in names:
        plate(n)
    if not sys.argv[1:]:
        photos()
