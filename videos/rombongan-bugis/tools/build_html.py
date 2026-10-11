"""Generator komposisi HyperFrames untuk dua versi video.

    python3 tools/build_html.py          # tulis tiktok.html + index.html (reels)

Satu sumber kebenaran: edit.py (cut, SFX) + words-*.json (timing kata narasi).
Semua animasi di satu timeline GSAP yang di-pause, deterministik & seek-safe.
"""

import json
import math

from edit import CUTS, ROOT, SEGMENTS, TOTAL, VO_OFFSET

# ------------------------------------------------------------------ helpers

FIX = {
    "savira": "Shafira", "shafira": "Shafira", "pendah": "Tenda", "tenda": "Tenda",
    "berjejar": "berjejer", "bugis": "Bugis", "gazebo": "gazebo", "gazebo.": "gazebo.",
    "saptu": "Sabtu", "sekedar": "sekadar", "prombongan": "Rombongan", "penang": "tenang", "reoni": "reuni",
    "memit": "Memit", "memit,": "Memit,", "morelah": "Morella", "morela.": "Morella.",
    "masjid": "Masjid", "jalan": "Jalan", "baru": "Baru", "baru,": "Baru,",
    "arisan": "arisan", "sementara": "sementara", "oktober": "Oktober",
}


def words(ver):
    raw = json.loads((ROOT / "music" / f"words-{ver}.json").read_text())
    off = VO_OFFSET[ver]
    out = []
    i = 0
    while i < len(raw):
        w = raw[i]
        text = w["text"]
        start, end = w["start"] + off, w["end"] + off
        key = text.lower()
        if key in FIX:
            text = FIX[key]
        elif key.rstrip(".,!?") in FIX:
            text = FIX[key.rstrip(".,!?")] + key[len(key.rstrip(".,!?")) :]
        if text.startswith("3.500.000"):
            text = "Rp3.500.000"
            if i + 1 < len(raw) and raw[i + 1]["text"].lower().startswith("rupiah"):
                end = raw[i + 1]["end"] + off
                tail = raw[i + 1]["text"][6:]
                text += tail
                i += 1
        if text == "Dari" and out and out[-1]["t"] == "Bugis":
            text = "dari"
        out.append({"t": text, "s": round(start, 3), "e": round(end, 3)})
        i += 1
    return out


PROPER = {"Jalan", "Baru", "Masjid", "Al-Fatah", "Ambon", "Bugis", "Shafira", "Resort", "Oktober", "Memit", "Morella", "WhatsApp", "Rp3.500.000"}


def caption_groups(ws, maxw=4, maxc=24, cuts=()):
    groups, cur = [], []
    for k, w in enumerate(ws):
        cur.append(w)
        nxt = ws[k + 1] if k + 1 < len(ws) else None
        chars = sum(len(x["t"]) + 1 for x in cur)
        brk = (
            nxt is None
            or w["t"][-1:] in ".,!?"
            or len(cur) >= maxw
            or chars + len(nxt["t"]) > maxc
            or nxt["s"] - w["e"] > 0.3
            or any(w["s"] < cu - 0.15 <= nxt["s"] for cu in cuts)
            or (nxt["t"][:1].isupper() and nxt["t"].strip(".,!?") not in PROPER)
        )
        if brk:
            groups.append(cur)
            cur = []
    return groups


def esc(s):
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def bez(p0, p1, p2, p3, n):
    pts = []
    for i in range(n + 1):
        t = i / n
        x = (1 - t) ** 3 * p0[0] + 3 * (1 - t) ** 2 * t * p1[0] + 3 * (1 - t) * t**2 * p2[0] + t**3 * p3[0]
        y = (1 - t) ** 3 * p0[1] + 3 * (1 - t) ** 2 * t * p1[1] + 3 * (1 - t) * t**2 * p2[1] + t**3 * p3[1]
        pts.append((round(x, 1), round(y, 1)))
    return pts


class Lcg:
    """PRNG deterministik untuk konfeti."""

    def __init__(self, seed):
        self.s = seed

    def __call__(self):
        self.s = (self.s * 1103515245 + 12345) & 0x7FFFFFFF
        return self.s / 0x7FFFFFFF


# ------------------------------------------------------------------ CSS

CSS = r"""
@font-face { font-family: "Anton"; src: url("assets/fonts/anton-latin-400-normal.woff2") format("woff2"); font-weight: 400; }
@font-face { font-family: "Fraunces"; src: url("assets/fonts/fraunces-latin-600-normal.woff2") format("woff2"); font-weight: 600; font-style: normal; }
@font-face { font-family: "Fraunces"; src: url("assets/fonts/fraunces-latin-400-italic.woff2") format("woff2"); font-weight: 400; font-style: italic; }
@font-face { font-family: "Albert Sans"; src: url("assets/fonts/albert-sans-latin-500-normal.woff2") format("woff2"); font-weight: 500; }
@font-face { font-family: "Albert Sans"; src: url("assets/fonts/albert-sans-latin-700-normal.woff2") format("woff2"); font-weight: 700; }
@font-face { font-family: "Albert Sans"; src: url("assets/fonts/albert-sans-latin-900-normal.woff2") format("woff2"); font-weight: 900; }

:root {
  --ink: #0b2228; --ink2: #12333b; --ivory: #fbf7ef; --sand: #f2e9d8;
  --sunset: #e0703a; --sunset-deep: #c4653a; --gold: #e2b04a; --yellow: #ffd23f;
  --teal: #1a8c94; --maroon: #7a1f2b; --leaf: #2f6b3a;
  --display: "Anton", Impact, sans-serif; --serif: "Fraunces", Georgia, serif;
  --sans: "Albert Sans", system-ui, sans-serif;
}
* { margin: 0; padding: 0; box-sizing: border-box; }
html, body { width: 1080px; height: 1920px; overflow: hidden; background: var(--ink); }
#root { position: relative; width: 100%; height: 100%; overflow: hidden; background: var(--ink); font-family: var(--sans); color: var(--ivory); }

.layer { position: absolute; inset: 0; }
#stage { position: absolute; inset: 0; overflow: hidden; }
.cam { position: absolute; inset: 0; overflow: hidden; }
.plate { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.scene { position: absolute; inset: 0; overflow: hidden; }
.bgphoto { position: absolute; inset: 0; overflow: hidden; }
.bgphoto img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.tint { position: absolute; inset: 0; }
.ov { position: absolute; inset: 0; }

/* readability shading */
.shade-top { position: absolute; left: 0; right: 0; top: 0; height: 760px; background: linear-gradient(180deg, rgba(11,34,40,.82) 0%, rgba(11,34,40,.35) 55%, rgba(11,34,40,0) 100%); }
.shade-bot { position: absolute; left: 0; right: 0; bottom: 0; height: 900px; background: linear-gradient(0deg, rgba(11,34,40,.85) 0%, rgba(11,34,40,.3) 60%, rgba(11,34,40,0) 100%); }

/* global finishing */
#vignette { position: absolute; inset: 0; background: radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0) 55%, rgba(0,0,0,.42) 100%); pointer-events: none; }
#leak { position: absolute; left: -300px; top: -200px; width: 1100px; height: 1100px; border-radius: 50%; background: radial-gradient(circle, rgba(255,170,90,.75) 0%, rgba(255,120,60,.35) 35%, rgba(255,120,60,0) 70%); mix-blend-mode: screen; opacity: 0; }
#leak2 { position: absolute; right: -380px; bottom: 200px; width: 1000px; height: 1000px; border-radius: 50%; background: radial-gradient(circle, rgba(255,214,120,.6) 0%, rgba(255,160,80,.25) 40%, rgba(255,160,80,0) 70%); mix-blend-mode: screen; opacity: 0; }
#flash { position: absolute; inset: 0; background: #fff6e8; opacity: 0; }
#grain { position: absolute; inset: -60px; opacity: .07; mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='240' height='240' filter='url(%23n)'/></svg>"); }

/* plaid sarung Bugis (lipa' sabbe) — pola kotak benang emas di atas merah marun */
.plaid {
  background-color: var(--maroon);
  background-image:
    repeating-linear-gradient(90deg, rgba(226,176,74,.95) 0 6px, transparent 6px 46px, rgba(26,140,148,.8) 46px 58px, transparent 58px 92px),
    repeating-linear-gradient(0deg, rgba(226,176,74,.85) 0 6px, transparent 6px 46px, rgba(26,140,148,.7) 46px 58px, transparent 58px 92px),
    repeating-linear-gradient(45deg, rgba(0,0,0,.12) 0 2px, transparent 2px 6px);
}
.wipe { position: absolute; left: -400px; top: -400px; width: 1900px; height: 2900px; transform-origin: 50% 50%; }

/* typography */
.slam { position: absolute; left: 60px; right: 60px; display: flex; justify-content: center; text-align: center; }
.slam span { display: block; white-space: nowrap; font-family: var(--display); line-height: .92; letter-spacing: .01em; text-transform: uppercase; color: var(--ivory);
  text-shadow: 0 8px 0 rgba(11,34,40,.85), 0 18px 40px rgba(0,0,0,.45); }
.slam .y { color: var(--yellow); }
.slam .o { color: var(--sunset); }
.eyebrow { font-family: var(--sans); font-weight: 900; font-size: 34px; letter-spacing: .28em; text-transform: uppercase; color: var(--gold); }
.pill { display: inline-block; padding: 14px 34px; border-radius: 999px; background: var(--yellow); color: var(--ink); font-family: var(--sans); font-weight: 900; font-size: 52px; letter-spacing: .02em; text-transform: uppercase; box-shadow: 0 14px 0 rgba(11,34,40,.55); }
.pill.dark { background: var(--ink); color: var(--yellow); }
.pill.white { background: var(--ivory); color: var(--ink); }

.mask { overflow: hidden; display: block; padding: 6px 0; }
.mask > span { display: block; }

/* sticker labels */
.sticker { position: absolute; left: 70px; top: 300px; max-width: 860px; }
.sticker .pill { font-size: 62px; }

/* brand bug */
#bug { position: absolute; left: 50px; top: 214px; display: flex; align-items: center; gap: 14px; padding: 10px 24px 10px 12px; border-radius: 999px; background: rgba(11,34,40,.62); }
#bug img { width: 54px; height: 62px; object-fit: contain; display: block; }
#bug span { font-family: var(--sans); font-weight: 900; font-size: 28px; letter-spacing: .14em; color: var(--ivory); }

/* captions */
.cap { position: absolute; left: 90px; right: 150px; top: 1290px; display: flex; flex-wrap: wrap; justify-content: center; align-content: flex-start; gap: 4px 30px; }
.cap .w { display: inline-block; transform-origin: 50% 60%; font-family: var(--sans); font-weight: 900; font-size: 64px; line-height: 1.12; color: #fff;
  -webkit-text-stroke: 12px #0b2228; paint-order: stroke fill;
  text-shadow: 0 6px 18px rgba(0,0,0,.45); }
.cap .w.hl { color: var(--yellow); }

/* route card */
.route-svg { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; }
.pin-card { position: absolute; left: 140px; right: 140px; padding: 26px 34px; border-radius: 30px; background: var(--ivory); color: var(--ink); box-shadow: 0 24px 60px rgba(0,0,0,.4); display: flex; flex-direction: column; gap: 6px; }
.pin-card .k { font-family: var(--sans); font-weight: 900; font-size: 26px; letter-spacing: .24em; text-transform: uppercase; color: var(--sunset-deep); }
.pin-card .v { font-family: var(--display); font-size: 70px; line-height: 1; text-transform: uppercase; color: var(--ink); }
.pin-card .s { font-family: var(--sans); font-weight: 700; font-size: 34px; color: var(--ink2); }
.chip-time { position: absolute; right: 120px; top: 770px; padding: 16px 30px; border-radius: 999px; background: var(--yellow); color: var(--ink); font-family: var(--sans); font-weight: 900; font-size: 42px; box-shadow: 0 12px 0 rgba(11,34,40,.6); }

/* price card */
.price-head { position: absolute; left: 70px; right: 70px; top: 320px; display: flex; flex-direction: column; align-items: flex-start; gap: 6px; }
.price-head .big { font-family: var(--display); font-size: 136px; line-height: .95; text-transform: uppercase; color: var(--ivory); text-shadow: 0 8px 0 rgba(11,34,40,.85); }
.price-card { position: absolute; left: 70px; right: 70px; top: 640px; padding: 40px 48px 42px; border-radius: 40px; background: var(--ivory); color: var(--ink); box-shadow: 0 30px 80px rgba(0,0,0,.45); display: flex; flex-direction: column; gap: 18px; }
.row { display: flex; align-items: center; gap: 22px; font-family: var(--sans); font-weight: 900; font-size: 50px; color: var(--ink); }
.tick { width: 62px; height: 62px; border-radius: 50%; background: var(--teal); display: flex; align-items: center; justify-content: center; flex: none; }
.tick svg { width: 40px; height: 40px; display: block; }
.divider { height: 4px; border-radius: 4px; background: var(--sand); margin: 8px 0 4px; }
.amount { display: flex; align-items: baseline; gap: 18px; }
.amount .num { font-family: var(--display); font-size: 128px; line-height: 1; color: var(--sunset-deep); font-variant-numeric: tabular-nums; }
.amount .per { font-family: var(--sans); font-weight: 900; font-size: 40px; color: var(--ink); }
.excl { font-family: var(--sans); font-weight: 700; font-size: 34px; color: var(--ink2); }

/* confetti */
.cf { position: absolute; left: 540px; top: 1000px; width: 22px; height: 34px; border-radius: 4px; opacity: 0; }

/* CTA */
.cta-bg img { filter: blur(6px) brightness(.55) saturate(1.2); transform: scale(1.08); }
.cta-tint { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(11,34,40,.55) 0%, rgba(11,34,40,.9) 75%); }
.cta { position: absolute; left: 80px; right: 80px; top: 260px; bottom: 420px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; gap: 22px; }
.cta-logo { width: 240px; height: auto; display: block; }
.cta-name { font-family: var(--serif); font-weight: 600; font-size: 118px; line-height: 1; color: var(--ivory); }
.cta-tag { font-family: var(--serif); font-style: italic; font-weight: 400; font-size: 52px; color: var(--sand); }
.cta-btn { margin-top: 18px; padding: 30px 56px; border-radius: 999px; background: #25d366; display: flex; flex-direction: column; align-items: center; gap: 4px; box-shadow: 0 16px 0 rgba(0,0,0,.35); }
.cta-btn .t1 { font-family: var(--sans); font-weight: 900; font-size: 38px; color: #0b2228; letter-spacing: .04em; text-transform: uppercase; }
.cta-btn .t2 { font-family: var(--display); font-size: 84px; line-height: 1; color: #0b2228; letter-spacing: .02em; }
.cta-meta { font-family: var(--sans); font-weight: 700; font-size: 38px; color: var(--sand); }
.cta-offer { padding: 12px 28px; border-radius: 999px; border: 3px solid var(--gold); font-family: var(--sans); font-weight: 900; font-size: 34px; color: var(--gold); letter-spacing: .06em; text-transform: uppercase; }

/* date card */
.date-wrap { position: absolute; left: 0; right: 0; top: 520px; display: flex; flex-direction: column; align-items: center; gap: 30px; perspective: 1400px; }
.cal { width: 520px; border-radius: 40px; overflow: hidden; background: var(--ivory); box-shadow: 0 30px 80px rgba(0,0,0,.5); }
.cal .top { height: 120px; display: flex; align-items: center; justify-content: center; font-family: var(--sans); font-weight: 900; font-size: 44px; letter-spacing: .2em; color: var(--ivory); }
.cal .day { position: relative; height: 330px; }
.cal .num { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-family: var(--display); font-size: 300px; line-height: 1; color: var(--ink); backface-visibility: hidden; }
.cal .dow { height: 96px; display: flex; align-items: center; justify-content: center; font-family: var(--sans); font-weight: 900; font-size: 46px; letter-spacing: .3em; color: var(--sunset-deep); border-top: 4px dashed var(--sand); }

/* collage */
.paper { position: absolute; inset: 0; background: radial-gradient(ellipse at 50% 40%, #fbf7ef 0%, #f2e9d8 70%, #e6d7bb 100%); }
.strip { position: absolute; left: 0; right: 0; height: 64px; }
.pol { position: absolute; width: 520px; padding: 22px 22px 70px; background: #fff; box-shadow: 0 24px 50px rgba(0,0,0,.28); }
.pol img { display: block; width: 100%; height: 560px; object-fit: cover; }
.pol.land img { height: 380px; }
.quote { position: absolute; left: 90px; right: 150px; top: 1250px; text-align: center; font-family: var(--serif); font-style: italic; font-weight: 400; font-size: 66px; line-height: 1.18; color: var(--ink); }
.quote b { font-style: normal; font-weight: 600; color: var(--sunset-deep); }

/* chips scene */
.chip-list { position: absolute; left: 80px; right: 160px; top: 640px; display: flex; flex-direction: column; align-items: flex-start; gap: 34px; }
.chip-list .pill { font-size: 66px; }

/* ring */
.ring-wrap { position: absolute; left: 0; right: 0; top: 330px; display: flex; flex-direction: column; align-items: center; gap: 10px; }
.ring { position: relative; width: 420px; height: 420px; }
.ring svg { position: absolute; inset: 0; width: 420px; height: 420px; display: block; }
.ring .pct { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-family: var(--display); font-size: 150px; color: var(--ivory); text-shadow: 0 6px 0 rgba(11,34,40,.8); }

/* location */
.loc { position: absolute; left: 0; right: 0; top: 460px; display: flex; flex-direction: column; align-items: center; gap: 18px; }
.loc svg { width: 170px; height: 220px; display: block; }
"""

# ------------------------------------------------------------------ builders


class Comp:
    def __init__(self, ver):
        self.ver = ver
        self.html = []  # body fragments
        self.js = []  # timeline statements
        self.n = 0

    def uid(self, p):
        self.n += 1
        return f"{p}{self.n}"

    def add(self, s):
        self.html.append(s)

    def tl(self, s):
        self.js.append(s)


TICK_SVG = '<svg viewBox="0 0 40 40"><path d="M8 21 L17 30 L33 11" fill="none" stroke="#fbf7ef" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></svg>'
PIN_SVG = (
    '<svg viewBox="0 0 170 220"><path d="M85 8 C42 8 12 40 12 82 C12 136 85 210 85 210 C85 210 158 136 158 82 C158 40 128 8 85 8 Z" '
    'fill="#e0703a" stroke="#fbf7ef" stroke-width="8"/><circle cx="85" cy="82" r="30" fill="#fbf7ef"/></svg>'
)


def slam(c, t, text, top, size, cls="", rot=-3, scale_from=2.6, dur=0.32):
    i = c.uid("sl")
    c.add(f'<div class="slam" style="top:{top}px"><span id="{i}" class="{cls}" style="font-size:{size}px">{esc(text)}</span></div>')
    c.tl(f'tl.fromTo("#{i}",{{opacity:0,scale:{scale_from},rotation:{rot*3}}},{{opacity:1,scale:1,rotation:{rot},duration:{dur},ease:"expo.out"}},{t});')
    return i


def mask_line(c, t, text, size, cls="", color=None, dy=110):
    i = c.uid("ml")
    style = f"font-size:{size}px" + (f";color:{color}" if color else "")
    c.tl(f'tl.fromTo("#{i}",{{yPercent:{dy}}},{{yPercent:0,duration:.45,ease:"expo.out"}},{t});')
    return f'<span class="mask"><span id="{i}" class="{cls}" style="{style}">{esc(text)}</span></span>'


def pop(c, sel, t, s0=0.0, dur=0.5, ease="back.out(2.2)", rot=0):
    c.tl(f'tl.fromTo("{sel}",{{opacity:0,scale:{s0},rotation:{rot - 8}}},{{opacity:1,scale:1,rotation:{rot},duration:{dur},ease:"{ease}"}},{t});')


def confetti(c, t, n=36, cx=540, cy=1000, seed=7):
    r = Lcg(seed)
    cols = ["#ffd23f", "#e0703a", "#1a8c94", "#fbf7ef", "#e2b04a", "#7a1f2b"]
    for k in range(n):
        i = c.uid("cf")
        col = cols[k % len(cols)]
        c.add(f'<div id="{i}" class="cf" style="left:{cx}px;top:{cy}px;background:{col}"></div>')
        ang = -math.pi / 2 + (r() - 0.5) * 2.2
        sp = 650 + r() * 650
        dx = math.cos(ang) * sp
        dy = math.sin(ang) * sp
        fall = 900 + r() * 500
        rot = (r() - 0.5) * 1440
        c.tl(
            f'tl.fromTo("#{i}",{{opacity:1,x:0,y:0,rotation:0,scale:{0.6 + r() * 0.7:.2f}}},'
            f'{{x:{dx:.0f},y:{dy:.0f},rotation:{rot / 2:.0f},duration:.55,ease:"power3.out",immediateRender:false}},{t});'
        )
        c.tl(
            f'tl.to("#{i}",{{x:{dx * 1.35:.0f},y:{dy + fall:.0f},rotation:{rot:.0f},opacity:0,duration:1.5,ease:"power1.in"}},{t + 0.55:.3f});'
        )


# ------------------------------------------------------------------ scene overlays
# Setiap fungsi menerima (c, a, b) = komposisi, waktu mulai, waktu selesai


def ov_open(c, a, b, extra=""):
    i = c.uid("ov")
    c.add(f'<section id="{i}" class="ov clip" data-start="{a}" data-duration="{round(b - a, 3)}" data-track-index="3" data-layout-allow-overlap data-layout-allow-occlusion data-layout-allow-overflow>{extra}')
    return i


def ov_close(c):
    c.add("</section>")


def scene_hook(c, a, b):
    ov_open(c, a, b, '<div class="shade-top"></div><div class="shade-bot"></div>')
    i = c.uid("eb")
    c.add(f'<div class="slam" style="top:300px"><span id="{i}" class="eyebrow" style="font-family:var(--sans);font-size:34px;text-shadow:none;color:var(--gold)">10 · 10 · 2026 — Shafira Resort</span></div>')
    c.tl(f'tl.fromTo("#{i}",{{opacity:0,y:-20}},{{opacity:1,y:0,duration:.4,ease:"power2.out"}},{a + 0.05});')
    slam(c, a + 0.18, "1 Resort", 560, 270, "", -4)
    p = c.uid("pl")
    c.add(f'<div class="slam" style="top:880px"><span id="{p}" class="pill dark" style="font-family:var(--sans);font-size:58px;line-height:1.2;text-shadow:none">disewa</span></div>')
    pop(c, f"#{p}", a + 1.3, 0.2, 0.4, rot=2)
    slam(c, a + 1.9, "1 Keluarga", 1010, 205, "y", 3, 3.2)
    ov_close(c)


def scene_title(c, a, b, words_t):
    """ROMBONGAN / KELUARGA BESAR / BUGIS dengan sapuan plaid."""
    ov_open(c, a, b, '<div class="shade-top"></div><div class="shade-bot"></div>')
    t1, t2, t3 = words_t
    c.add('<div class="slam" style="top:420px;flex-direction:column;align-items:center">')
    c.add(mask_line(c, t1, "Rombongan", 170))
    c.add(mask_line(c, t2, "Keluarga Besar", 150, "", "var(--sand)"))
    c.add("</div>")
    j = c.uid("bg")
    c.add(f'<div class="slam" style="top:830px"><span id="{j}" class="y" style="font-size:330px">Bugis</span></div>')
    c.tl(f'tl.fromTo("#{j}",{{opacity:0,scale:3,rotation:-10}},{{opacity:1,scale:1,rotation:-3,duration:.36,ease:"expo.out"}},{t3});')
    k = c.uid("ub")
    c.add(f'<div id="{k}" class="plaid" style="position:absolute;left:250px;width:580px;top:1150px;height:34px;border-radius:8px;transform-origin:0 50%"></div>')
    c.tl(f'tl.fromTo("#{k}",{{scaleX:0}},{{scaleX:1,duration:.5,ease:"power3.out"}},{t3 + 0.15});')
    ov_close(c)


def scene_route(c, a, b, tA, tDraw0, tDraw1, tB, tChip, bgimg):
    # latar foto + peta garis (bagian dari overlay supaya satu adegan)
    i = ov_open(c, a, b)
    kb = c.uid("kb")
    c.add(f'<div class="bgphoto"><img id="{kb}" src="assets/img/{bgimg}" alt="Suasana Shafira Resort"/></div>')
    c.tl(f'tl.fromTo("#{kb}",{{scale:1.18,y:40}},{{scale:1.04,y:-20,duration:{b - a},ease:"none"}},{a});')
    c.add('<div class="tint" style="background:linear-gradient(180deg,rgba(11,34,40,.82),rgba(11,34,40,.7) 50%,rgba(11,34,40,.9))"></div>')
    # grid peta halus
    grid = "".join(f'<line x1="{x}" y1="0" x2="{x}" y2="1920" stroke="rgba(251,247,239,.06)" stroke-width="2"/>' for x in range(0, 1081, 90))
    grid += "".join(f'<line x1="0" y1="{y}" x2="1080" y2="{y}" stroke="rgba(251,247,239,.06)" stroke-width="2"/>' for y in range(0, 1921, 90))
    p0, p1, p2, p3 = (300, 560), (980, 650), (60, 860), (760, 1000)
    pts = bez(p0, p1, p2, p3, 40)
    d = f"M{p0[0]} {p0[1]} C{p1[0]} {p1[1]} {p2[0]} {p2[1]} {p3[0]} {p3[1]}"
    path_id = c.uid("rp")
    car = c.uid("car")
    pa, pb = c.uid("pa"), c.uid("pb")
    c.add(
        f'<svg class="route-svg" viewBox="0 0 1080 1920">{grid}'
        f'<path d="{d}" fill="none" stroke="rgba(251,247,239,.18)" stroke-width="14" stroke-linecap="round"/>'
        f'<path id="{path_id}" d="{d}" fill="none" stroke="#ffd23f" stroke-width="14" stroke-linecap="round" stroke-dasharray="1400" stroke-dashoffset="1400"/>'
        f'<g id="{pa}"><circle cx="{p0[0]}" cy="{p0[1]}" r="30" fill="#e0703a" stroke="#fbf7ef" stroke-width="8"/></g>'
        f'<g id="{pb}"><circle cx="{p3[0]}" cy="{p3[1]}" r="34" fill="#1a8c94" stroke="#fbf7ef" stroke-width="8"/></g>'
        f'<g id="{car}"><circle cx="0" cy="0" r="22" fill="#ffd23f" stroke="#0b2228" stroke-width="6"/></g>'
        "</svg>"
    )
    c.tl(f'tl.fromTo("#{pa}",{{scale:0,transformOrigin:"{p0[0]}px {p0[1]}px"}},{{scale:1,duration:.45,ease:"back.out(3)"}},{tA});')
    c.tl(f'tl.fromTo("#{path_id}",{{strokeDashoffset:1400}},{{strokeDashoffset:0,duration:{tDraw1 - tDraw0:.2f},ease:"power1.inOut"}},{tDraw0});')
    kf = ",".join(f"{{x:{x},y:{y}}}" for x, y in pts[1:])
    c.tl(f'tl.fromTo("#{car}",{{x:{pts[0][0]},y:{pts[0][1]},opacity:0}},{{opacity:1,duration:.15}},{tDraw0});')
    c.tl(f'tl.to("#{car}",{{keyframes:[{kf}],duration:{tDraw1 - tDraw0:.2f},ease:"power1.inOut"}},{tDraw0});')
    c.tl(f'tl.fromTo("#{pb}",{{scale:0,transformOrigin:"{p3[0]}px {p3[1]}px"}},{{scale:1,duration:.5,ease:"back.out(3)"}},{tB});')
    # kartu label
    ca, cb = c.uid("ca"), c.uid("cb")
    c.add(
        f'<div id="{ca}" class="pin-card" style="top:300px"><div class="k">Berangkat dari</div>'
        f'<div class="v">Jalan Baru, Ambon</div><div class="s">depan Masjid Al-Fatah</div></div>'
    )
    c.add(
        f'<div id="{cb}" class="pin-card" style="top:1060px;left:220px;right:80px;background:var(--yellow)"><div class="k" style="color:var(--ink)">Tujuan</div>'
        f'<div class="v">Shafira Resort</div><div class="s">Pantai Memit, Morella</div></div>'
    )
    c.tl(f'tl.fromTo("#{ca}",{{opacity:0,y:-60,rotation:-4}},{{opacity:1,y:0,rotation:-1.5,duration:.5,ease:"back.out(1.8)"}},{tA});')
    c.tl(f'tl.fromTo("#{cb}",{{opacity:0,y:60,rotation:4}},{{opacity:1,y:0,rotation:1.5,duration:.5,ease:"back.out(1.8)"}},{tB});')
    ch = c.uid("ch")
    c.add(f'<div id="{ch}" class="chip-time">± 1 jam perjalanan</div>')
    pop(c, f"#{ch}", tChip, 0.3, 0.45, rot=3)
    ov_close(c)


def scene_label(c, a, b, text, band=False):
    ov_open(c, a, b, '<div class="shade-top" style="height:560px"></div>')
    i = c.uid("lb")
    top = 330 if band else 300
    c.add(f'<div class="sticker" style="top:{top}px"><span id="{i}" class="pill">{esc(text)}</span></div>')
    c.tl(f'tl.fromTo("#{i}",{{opacity:0,x:-120,rotation:-12,scale:.6}},{{opacity:1,x:0,rotation:-3,scale:1,duration:.42,ease:"back.out(2)"}},{a + 0.05});')
    ov_close(c)


def scene_milik(c, a, b, t_stk):
    ov_open(c, a, b)
    c.add('<div class="slam" style="top:310px;flex-direction:column;align-items:center">')
    c.add(mask_line(c, a + 0.1, "Serasa", 110, "", "var(--sand)"))
    c.add(mask_line(c, a + 0.55, "Milik Sendiri", 150, "y"))
    c.add("</div>")
    s = c.uid("st")
    c.add(f'<div style="position:absolute;right:90px;top:1080px"><span id="{s}" class="pill" style="background:var(--sunset);color:var(--ivory);font-size:50px">0 tamu lain</span></div>')
    pop(c, f"#{s}", t_stk, 0.2, 0.5, rot=6)
    ov_close(c)


def scene_montage(c, a, b, photos, texts):
    """Foto berganti tiap ketukan + teks besar bertumpuk."""
    i = ov_open(c, a, b)
    step = (b - a) / len(photos)
    for k, ph in enumerate(photos):
        pid = c.uid("mp")
        t0 = a + k * step
        c.add(f'<div class="bgphoto" id="{pid}w" style="opacity:0"><img id="{pid}" src="assets/img/{ph}" alt="Momen keluarga di Shafira Resort"/></div>')
        c.tl(f'tl.set("#{pid}w",{{opacity:1}},{t0:.3f});')
        if k < len(photos) - 1:
            c.tl(f'tl.set("#{pid}w",{{opacity:0}},{t0 + step:.3f});')
        c.tl(f'tl.fromTo("#{pid}",{{scale:1.35}},{{scale:1.08,duration:{step:.3f},ease:"power2.out"}},{t0:.3f});')
    c.add('<div class="tint" style="background:rgba(11,34,40,.38)"></div>')
    tops = [430, 640, 900]
    sizes = [150, 128, 230]
    clss = ["", "", "y"]
    for (t, txt), top, sz, cl in zip(texts, tops, sizes, clss):
        slam(c, t, txt, top, sz, cl, -2 if top != 640 else 2, 2.4, 0.28)
    ov_close(c)


def scene_price(c, a, b, ticks, t_count0, t_count1, t_per, head_t):
    ov_open(c, a, b, '<div class="shade-top"></div>')
    h1, h2 = c.uid("ph"), c.uid("ph")
    c.add(
        f'<div class="price-head"><div id="{h1}" class="eyebrow">Paket eksklusif</div>'
        f'<span class="mask"><span id="{h2}" class="big">Seluruh Unit</span></span></div>'
    )
    c.tl(f'tl.fromTo("#{h1}",{{opacity:0,x:-40}},{{opacity:1,x:0,duration:.4,ease:"power2.out"}},{head_t});')
    c.tl(f'tl.fromTo("#{h2}",{{yPercent:110}},{{yPercent:0,duration:.5,ease:"expo.out"}},{head_t + 0.1});')
    card = c.uid("pc")
    c.add(f'<div id="{card}" class="price-card">')
    names = ["Vila Besar", "Semua Kamar", "Semua Glamping"]
    for name, t in zip(names, ticks):
        r, tk = c.uid("rw"), c.uid("tk")
        c.add(f'<div class="row" id="{r}"><div class="tick" id="{tk}">{TICK_SVG}</div><span>{name}</span></div>')
        c.tl(f'tl.fromTo("#{r}",{{opacity:0,x:-50}},{{opacity:1,x:0,duration:.35,ease:"power3.out"}},{t});')
        c.tl(f'tl.fromTo("#{tk}",{{scale:0,rotation:-90}},{{scale:1,rotation:0,duration:.45,ease:"back.out(3)"}},{t + 0.05});')
    num, per, ex = c.uid("nm"), c.uid("pr"), c.uid("ex")
    c.add(
        f'<div class="divider"></div><div class="amount" id="{num}a"><span id="{num}" class="num">Rp0</span>'
        f'<span id="{per}" class="per">/malam</span></div>'
        f'<div id="{ex}" class="excl">Tanpa tamu lain · pantai, gazebo &amp; perahu jadi milik rombongan</div></div>'
    )
    c.tl(f'tl.fromTo("#{num}a",{{opacity:0,y:30}},{{opacity:1,y:0,duration:.25,ease:"power2.out"}},{t_count0});')
    c.tl(f'tl.fromTo("#{card}",{{opacity:0,y:300}},{{opacity:1,y:0,duration:.55,ease:"expo.out"}},{a + 0.05});')
    c.tl(
        f'(function(){{var o={{v:0}};var el=document.getElementById("{num}");'
        f'tl.to(o,{{v:3500000,duration:{t_count1 - t_count0:.2f},ease:"power2.out",onUpdate:function(){{'
        f'el.textContent="Rp"+String(Math.round(o.v/1000)*1000).replace(/\\B(?=(\\d{{3}})+(?!\\d))/g,".");}}}},{t_count0});}})();'
    )
    c.tl(f'tl.fromTo("#{num}",{{scale:1}},{{scale:1.12,duration:.12,yoyo:true,repeat:1,ease:"power2.out",transformOrigin:"0% 70%"}},{t_count1});')
    c.tl(f'tl.fromTo("#{per}",{{opacity:0,x:-30}},{{opacity:1,x:0,duration:.35,ease:"back.out(2)"}},{t_per});')
    c.tl(f'tl.fromTo("#{ex}",{{opacity:0}},{{opacity:1,duration:.4}},{t_per + 0.2});')
    confetti(c, t_count1, 34, 540, 1080, seed=int(a * 10))
    ov_close(c)


def scene_cta(c, a, b, t_btn, bgimg):
    ov_open(c, a, b)
    kb = c.uid("kb")
    c.add(f'<div class="bgphoto cta-bg"><img id="{kb}" src="assets/img/{bgimg}" alt="Area tenda Shafira Resort"/></div><div class="cta-tint"></div>')
    c.tl(f'tl.fromTo("#{kb}",{{scale:1.08}},{{scale:1.2,duration:{b - a},ease:"none"}},{a});')
    ids = [c.uid("ct") for _ in range(7)]
    c.add(
        f'<div class="cta"><img id="{ids[0]}" class="cta-logo" src="assets/img/logo.png" alt="Logo Shafira Resort"/>'
        f'<div id="{ids[1]}" class="cta-name">Shafira Resort</div>'
        f'<div id="{ids[2]}" class="cta-tag">Pantai Memit · Morella · Maluku</div>'
        f'<div id="{ids[3]}" class="cta-offer">Sewa seluruh unit · Rp3,5 jt/malam</div>'
        f'<div id="{ids[4]}" class="cta-btn"><span class="t1">Pesan via WhatsApp</span><span class="t2">0852-4208-7190</span></div>'
        f'<div id="{ids[5]}" class="cta-meta">Instagram @resortsafiramemit</div></div>'
    )
    c.tl(f'tl.fromTo("#{ids[0]}",{{opacity:0,scale:.4,rotation:-20}},{{opacity:1,scale:1,rotation:0,duration:.7,ease:"back.out(1.8)"}},{a + 0.1});')
    for k, d in zip(range(1, 4), (0.35, 0.5, 0.65)):
        c.tl(f'tl.fromTo("#{ids[k]}",{{opacity:0,y:40}},{{opacity:1,y:0,duration:.5,ease:"power3.out"}},{a + d});')
    c.tl(f'tl.fromTo("#{ids[4]}",{{opacity:0,scale:.5}},{{opacity:1,scale:1,duration:.55,ease:"back.out(2.5)"}},{t_btn});')
    reps = max(0, int((b - t_btn - 0.8) / 0.9) - 1)
    c.tl(f'tl.to("#{ids[4]}",{{scale:1.06,duration:.45,yoyo:true,repeat:{reps * 2 + 1},ease:"sine.inOut"}},{t_btn + 0.6});')
    c.tl(f'tl.fromTo("#{ids[5]}",{{opacity:0,y:30}},{{opacity:1,y:0,duration:.5,ease:"power3.out"}},{t_btn + 0.3});')
    ov_close(c)


def scene_date(c, a, b, t_flip):
    ov_open(c, a, b, '<div class="tint" style="background:rgba(11,34,40,.35)"></div>')
    w, cal, n9, n10, dw, eb = (c.uid(x) for x in ("dw", "cl", "n", "n", "dw", "eb"))
    c.add(
        f'<div class="date-wrap"><div id="{eb}" class="eyebrow" style="color:var(--ivory);text-shadow:0 4px 12px rgba(0,0,0,.6)">Catatan tamu Shafira</div>'
        f'<div id="{cal}" class="cal"><div class="top plaid">OKTOBER 2026</div>'
        f'<div class="day"><div id="{n9}" class="num">09</div><div id="{n10}" class="num" style="opacity:0">10</div></div>'
        f'<div id="{dw}" class="dow">SABTU</div></div></div>'
    )
    c.tl(f'tl.fromTo("#{eb}",{{opacity:0,y:-20}},{{opacity:1,y:0,duration:.4}},{a + 0.1});')
    c.tl(f'tl.fromTo("#{cal}",{{opacity:0,rotationX:-80,y:120}},{{opacity:1,rotationX:0,y:0,duration:.7,ease:"back.out(1.6)"}},{a + 0.15});')
    c.tl(f'tl.fromTo("#{n9}",{{rotationX:0,opacity:1}},{{rotationX:90,opacity:0,duration:.18,ease:"power2.in"}},{t_flip});')
    c.tl(f'tl.fromTo("#{n10}",{{rotationX:-90,opacity:0}},{{rotationX:0,opacity:1,duration:.3,ease:"back.out(2)"}},{t_flip + 0.18});')
    ov_close(c)


def scene_guest(c, a, b, t_logo, t_tamu, t_ist):
    ov_open(c, a, b, '<div class="shade-top"></div><div class="shade-bot"></div>')
    lg = c.uid("lg")
    c.add(
        f'<div class="slam" style="top:330px"><span id="{lg}" class="pill white" style="font-family:var(--sans);font-size:46px;line-height:1.2;text-shadow:none;display:flex;align-items:center;gap:16px">'
        f'<img src="assets/img/logo.png" alt="" style="width:52px;height:60px;display:block"/>Shafira Resort</span></div>'
    )
    pop(c, f"#{lg}", t_logo, 0.3, 0.5)
    rays = c.uid("ry")
    lines = "".join(
        f'<rect x="535" y="40" width="10" height="190" rx="5" fill="#ffd23f" transform="rotate({k * 30} 540 540)"/>' for k in range(12)
    )
    c.add(f'<svg id="{rays}" viewBox="0 0 1080 1080" style="position:absolute;left:0;top:420px;width:1080px;height:1080px;opacity:0">{lines}</svg>')
    c.tl(f'tl.fromTo("#{rays}",{{opacity:0,scale:.4,rotation:0,transformOrigin:"50% 50%"}},{{opacity:.85,scale:1.05,rotation:25,duration:.6,ease:"expo.out"}},{t_ist});')
    c.tl(f'tl.to("#{rays}",{{opacity:0,rotation:45,duration:.5,ease:"power1.in"}},{t_ist + 0.6});')
    slam(c, t_tamu, "Tamu", 690, 210, "", -3)
    slam(c, t_ist, "Istimewa", 880, 200, "y", 2, 3.0)
    ov_close(c)


def scene_full(c, a, b, t1, t2, t3):
    ov_open(c, a, b, '<div class="shade-top" style="height:1000px"></div>')
    rg, pc, arc = c.uid("rg"), c.uid("pc"), c.uid("ar")
    circ = 2 * math.pi * 180
    c.add(
        f'<div class="ring-wrap"><div class="ring" id="{rg}"><svg viewBox="0 0 420 420">'
        f'<circle cx="210" cy="210" r="180" fill="rgba(11,34,40,.55)" stroke="rgba(251,247,239,.25)" stroke-width="26"/>'
        f'<circle id="{arc}" cx="210" cy="210" r="180" fill="none" stroke="#ffd23f" stroke-width="26" stroke-linecap="round" '
        f'stroke-dasharray="{circ:.1f}" stroke-dashoffset="{circ:.1f}" transform="rotate(-90 210 210)"/></svg>'
        f'<div class="pct" id="{pc}">0%</div></div></div>'
    )
    c.tl(f'tl.fromTo("#{rg}",{{opacity:0,scale:.6}},{{opacity:1,scale:1,duration:.45,ease:"back.out(2)"}},{t1 - 0.4});')
    c.tl(f'tl.fromTo("#{arc}",{{strokeDashoffset:{circ:.1f}}},{{strokeDashoffset:0,duration:{t3 - t1:.2f},ease:"power2.inOut"}},{t1});')
    c.tl(
        f'(function(){{var o={{v:0}};var el=document.getElementById("{pc}");tl.to(o,{{v:100,duration:{t3 - t1:.2f},ease:"power2.inOut",'
        f'onUpdate:function(){{el.textContent=Math.round(o.v)+"%";}}}},{t1});}})();'
    )
    c.tl(f'tl.to("#{rg}",{{scale:1.1,duration:.14,yoyo:true,repeat:1}},{t3});')
    slam(c, t1, "1 Resort penuh", 800, 140, "", -2, 2.4)
    slam(c, t3, "Seharian", 960, 190, "y", 2, 3.0)
    ov_close(c)


def scene_collage(c, a, b, items, quotes):
    i = ov_open(c, a, b)
    c.add('<div class="paper"></div>')
    s1, s2 = c.uid("sp"), c.uid("sp")
    c.add(f'<div id="{s1}" class="strip plaid" style="top:0"></div><div id="{s2}" class="strip plaid" style="bottom:0"></div>')
    c.tl(f'tl.fromTo("#{s1}",{{xPercent:-100}},{{xPercent:0,duration:.6,ease:"expo.out"}},{a});')
    c.tl(f'tl.fromTo("#{s2}",{{xPercent:100}},{{xPercent:0,duration:.6,ease:"expo.out"}},{a});')
    for k, (t, img, left, top, rot, land) in enumerate(items):
        p = c.uid("po")
        cls = "pol land" if land else "pol"
        c.add(f'<div id="{p}" class="{cls}" style="left:{left}px;top:{top}px"><img src="assets/img/{img}" alt="Momen rombongan di Shafira Resort"/></div>')
        c.tl(f'tl.fromTo("#{p}",{{opacity:0,y:-900,rotation:{rot * -4}}},{{opacity:1,y:0,rotation:{rot},duration:.75,ease:"back.out(1.2)"}},{t});')
        c.tl(f'tl.to("#{p}",{{y:-30,rotation:{rot * 0.7:.1f},duration:{b - t - 0.8:.2f},ease:"none"}},{t + 0.8:.2f});')
    for k, (t, t_end, html) in enumerate(quotes):
        q = c.uid("qt")
        c.add(f'<div id="{q}" class="quote" style="opacity:0">{html}</div>')
        c.tl(f'tl.fromTo("#{q}",{{opacity:0,y:30}},{{opacity:1,y:0,duration:.5,ease:"power2.out"}},{t});')
        if t_end:
            c.tl(f'tl.to("#{q}",{{opacity:0,y:-20,duration:.3,ease:"power1.in"}},{t_end});')
    ov_close(c)


def scene_chips(c, a, b, chips):
    ov_open(c, a, b, '<div class="shade-top" style="height:620px"></div>')
    c.add('<div class="slam" style="top:300px;justify-content:flex-start">')
    c.add(mask_line(c, a + 0.1, "Pas banget buat…", 120, "", None))
    c.add("</div>")
    c.add('<div class="chip-list">')
    for k, (t, txt) in enumerate(chips):
        p = c.uid("cp")
        cls = ["pill", "pill white", "pill"][k % 3]
        style = "background:var(--sunset);color:var(--ivory)" if k == 2 else ""
        c.add(f'<span id="{p}" class="{cls}" style="{style}">{esc(txt)}</span>')
        pop(c, f"#{p}", t, 0.3, 0.45, rot=[-3, 2, -2][k % 3])
    c.add("</div>")
    ov_close(c)


def scene_location(c, a, b, t1, t2):
    ov_open(c, a, b, '<div class="tint" style="background:rgba(11,34,40,.4)"></div>')
    pn, n1, n2 = c.uid("pn"), c.uid("lc"), c.uid("lc")
    c.add(
        f'<div class="loc"><div id="{pn}">{PIN_SVG}</div>'
        f'<div class="slam" style="position:static"><span id="{n1}" style="font-size:170px">Pantai Memit</span></div>'
        f'<div class="slam" style="position:static"><span id="{n2}" class="y" style="font-size:96px">Morella · Maluku</span></div></div>'
    )
    c.tl(f'tl.fromTo("#{pn}",{{y:-500,opacity:0}},{{y:0,opacity:1,duration:.6,ease:"bounce.out"}},{a + 0.05});')
    c.tl(f'tl.fromTo("#{n1}",{{opacity:0,scale:2.2}},{{opacity:1,scale:1,duration:.32,ease:"expo.out"}},{t1});')
    c.tl(f'tl.fromTo("#{n2}",{{opacity:0,y:40}},{{opacity:1,y:0,duration:.4,ease:"back.out(2)"}},{t2});')
    ov_close(c)


# ------------------------------------------------------------------ assemble


def build(ver):
    c = Comp(ver)
    cuts = CUTS[ver]
    total = TOTAL[ver]
    ws = words(ver)

    def wt(text, after=0.0):
        for w in ws:
            if w["s"] >= after and w["t"].lower().strip(".,!?").startswith(text.lower()):
                return w["s"]
        raise KeyError(text)

    # ---- plates (stage)
    c.add('<div id="stage">')
    for k, (a, b, plate, kind) in enumerate(cuts):
        if not plate:
            continue
        cam, vid = f"cam{k}", f"v{k}"
        c.add(
            f'<div class="cam" id="{cam}"><video id="{vid}" class="clip plate" src="assets/footage/{plate}.mp4" '
            f'data-start="{a}" data-duration="{round(b - a, 3)}" data-track-index="0" muted playsinline></video></div>'
        )
        mode = SEGMENTS[plate][3]
        if mode == "band":
            c.tl(f'tl.fromTo("#{cam}",{{scale:1.0}},{{scale:1.06,duration:{b - a},ease:"none"}},{a});')
        else:
            c.tl(f'tl.fromTo("#{cam}",{{scale:1.22}},{{scale:1.04,duration:.45,ease:"expo.out"}},{a});')
            c.tl(f'tl.to("#{cam}",{{scale:1.0,duration:{max(0.1, b - a - 0.45):.2f},ease:"none"}},{a + 0.45});')
    c.add("</div>")
    c.add('<div id="vignette"></div>')

    # ---- overlays per adegan
    for a, b, plate, kind in cuts:
        band = bool(plate) and SEGMENTS[plate][3] == "band"
        if kind == "hook":
            scene_hook(c, a, b)
        elif kind == "title":
            scene_title(c, a, b, (wt("Rombongan"), wt("keluarga", wt("Rombongan")), wt("Bugis")))
        elif kind == "route":
            if ver == "tiktok":
                scene_route(c, a, b, wt("Jalan"), wt("depan"), wt("Shafira", 8), wt("Shafira", 8), wt("ramai"), "laut-pohon-potret.jpg")
            else:
                scene_route(c, a, b, wt("Jalan"), wt("depan"), wt("Ambon") + 0.1, wt("Ambon") + 0.2, wt("Al-Fatah"), "laut-pohon-potret.jpg")
        elif kind.startswith("label:"):
            scene_label(c, a, b, kind[6:], band)
        elif kind == "milik":
            scene_milik(c, a, b, wt("sendiri"))
        elif kind == "montage":
            scene_montage(
                c, a, b,
                ["pantai-tenda-1.jpg", "ayunan-keluarga.jpg", "pantai-tenda-2.jpg", "area-tenda.jpg"],
                [(wt("Mau"), "Mau reuni"), (wt("keluarga", 17), "keluarga besar"), (wt("juga"), "juga?")],
            )
        elif kind == "price":
            t0 = wt("Sewa", 19 if ver == "tiktok" else 34)
            scene_price(
                c, a, b,
                (wt("seluruh", t0), wt("unit", t0), wt("Shafira", t0)),
                wt("Rp3", t0) - 0.1, wt("Rp3", t0) + 1.1,
                wt("semalam", t0) if ver == "tiktok" else wt("malam", t0),
                a + 0.1,
            )
        elif kind == "cta":
            scene_cta(c, a, b, wt("WhatsApp", a - 1) - 0.1, "area-tenda.jpg")
        elif kind == "date":
            scene_date(c, a, b, wt("10"))
        elif kind == "guest":
            scene_guest(c, a, b, wt("Shafira"), wt("tamu"), wt("istimewa"))
        elif kind == "full":
            scene_full(c, a, b, wt("satu", 12), wt("penuh"), wt("seharian"))
        elif kind == "collage":
            items = [
                (wt("Dari", 23), "laut-pohon-potret.jpg", 60, 170, -6, False),
                (wt("sampai", 23), "pantai-tenda-1.jpg", 470, 260, 5, True),
                (wt("Satu", 25), "ayunan-potret.jpg", 500, 560, 7, False),
                (wt("tamu", 26), "area-tenda.jpg", 50, 700, -4, True),
                (wt("Begitulah"), "gazebo-potret.jpg", 300, 420, -2, False),
            ]
            quotes = [
                (wt("Dari", 23), wt("Satu", 25) - 0.25, "Dari anak-anak <b>sampai orang tua</b>…"),
                (wt("Satu", 25), wt("Begitulah") - 0.25, "satu pantai, <b>tanpa tamu lain.</b>"),
                (wt("Begitulah"), None, "Begitulah <b>kebersamaan</b> seharusnya terasa."),
            ]
            scene_collage(c, a, b, items, quotes)
        elif kind == "chips":
            scene_chips(c, a, b, [(wt("reuni", 30), "Reuni keluarga"), (wt("arisan"), "Arisan besar"), (wt("gathering"), "Gathering kantor")])
        elif kind == "location":
            scene_location(c, a, b, wt("Pantai", 39), wt("Morella"))

    # ---- brand bug (setelah hook, sampai CTA)
    first = cuts[1][0]
    cta_a = [a for a, b, p, k in cuts if k == "cta"][0]
    no_bug = [(a, b) for a, b, p, k in cuts if k == "collage"]
    c.add(
        f'<div id="bugw" class="clip" data-start="{first}" data-duration="{round(cta_a - first, 3)}" data-track-index="5" style="position:absolute;inset:0" data-layout-allow-overlap>'
        f'<div id="bug"><img src="assets/img/logo.png" alt=""/><span>SHAFIRA RESORT</span></div></div>'
    )
    c.tl(f'tl.fromTo("#bug",{{opacity:0,x:-40}},{{opacity:1,x:0,duration:.5,ease:"power3.out"}},{first + 0.2});')
    for a, b in no_bug:
        c.tl(f'tl.to("#bug",{{opacity:0,duration:.2}},{a});')
        c.tl(f'tl.to("#bug",{{opacity:1,duration:.3}},{b});')

    # ---- captions (karaoke kata-per-kata)
    no_cap_kinds = {"hook", "montage", "cta", "date", "collage"}
    blocked = [(a, b) for a, b, p, k in cuts if k in no_cap_kinds]

    def capped(t):
        return not any(a - 0.05 <= t < b for a, b in blocked)

    groups = caption_groups(ws, cuts=[a for a, b, p, k in cuts if a > 0])
    for gi, g in enumerate(groups):
        g = [w for w in g if capped(w["s"])]
        if not g:
            continue
        start = round(g[0]["s"] - 0.04, 3)
        nxt = None
        for h in groups[gi + 1 :]:
            hh = [w for w in h if capped(w["s"])]
            if hh:
                nxt = hh[0]["s"] - 0.04
                break
        end = g[-1]["e"] + 0.25
        if nxt is not None:
            end = min(end, nxt)
        for a, b in blocked:
            if start < a < end:
                end = a
        end = round(end, 3)
        cid = c.uid("cap")
        spans = []
        for w in g:
            wid = c.uid("w")
            spans.append(f'<span id="{wid}" class="w">{esc(w["t"])}</span>')
            c.tl(f'tl.fromTo("#{wid}",{{color:"#ffffff",scale:1}},{{color:"#ffd23f",scale:1.05,duration:.08,ease:"power2.out"}},{w["s"]});')
            c.tl(f'tl.to("#{wid}",{{color:"#ffffff",scale:1,duration:.12}},{max(w["e"], w["s"] + 0.12):.3f});')
        c.add(
            f'<div id="{cid}" class="cap clip" data-start="{start}" data-duration="{round(end - start, 3)}" data-track-index="6" data-layout-allow-overlap>'
            f'{"".join(spans)}</div>'
        )
        c.tl(f'tl.fromTo("#{cid}",{{y:24,opacity:0}},{{y:0,opacity:1,duration:.16,ease:"power2.out"}},{start});')

    # ---- finishing: plaid wipe, flash, leak, grain, beat pulse, shake
    wipe_at = [a for a, b, p, k in cuts if k in ("title", "collage", "price")]
    c.add('<div id="fx" class="layer" style="pointer-events:none">')
    for k, t in enumerate(wipe_at):
        wid = f"wipe{k}"
        c.add(f'<div id="{wid}" class="wipe plaid" style="opacity:0"></div>')
        c.tl(f'tl.fromTo("#{wid}",{{opacity:1,rotation:-18,xPercent:-110}},{{opacity:1,xPercent:0,duration:.18,ease:"power2.in"}},{t - 0.18:.2f});')
        c.tl(f'tl.to("#{wid}",{{xPercent:110,duration:.22,ease:"power2.out"}},{t:.2f});')
        c.tl(f'tl.set("#{wid}",{{opacity:0}},{t + 0.23:.2f});')
    c.add('<div id="leak"></div><div id="leak2"></div><div id="flash"></div><div id="grain"></div></div>')

    cut_times = [a for a, b, p, k in cuts if a > 0 and a not in wipe_at]
    for t in cut_times:
        c.tl(f'tl.fromTo("#flash",{{opacity:.55}},{{opacity:0,duration:.28,ease:"power2.out",immediateRender:false}},{t});')

    leak_windows = [(a, b) for a, b, p, k in cuts if k in ("hook", "date", "collage", "cta", "milik", "guest")]
    for a, b in leak_windows:
        d = b - a
        c.tl(f'tl.fromTo("#leak",{{opacity:0,x:-200,y:-100}},{{opacity:.55,x:120,y:80,duration:{d / 2:.2f},ease:"sine.inOut",immediateRender:false}},{a});')
        c.tl(f'tl.to("#leak",{{opacity:0,x:300,y:160,duration:{d / 2:.2f},ease:"sine.inOut"}},{a + d / 2:.2f});')
        c.tl(f'tl.fromTo("#leak2",{{opacity:0,y:120}},{{opacity:.4,y:-60,duration:{d / 2:.2f},ease:"sine.inOut",immediateRender:false}},{a + d * 0.25:.2f});')
        c.tl(f'tl.to("#leak2",{{opacity:0,y:-160,duration:{d / 2:.2f},ease:"sine.inOut"}},{a + d * 0.75:.2f});')

    frames = int(total * 12)
    c.tl(f'tl.fromTo("#grain",{{x:0,y:0}},{{x:-60,y:-60,duration:{total},ease:"steps({frames})"}},0);')

    beats = json.loads((ROOT / "music" / f"beats-{ver}.json").read_text())
    drops = [(s, e) for s, e, k in beats["sections"] if k in ("drop", "outro")]
    c.tl('tl.set("#stage",{scale:1.04,x:0,y:0},0);')
    for bt in beats["beats"]:
        if any(s <= bt < e - 0.01 for s, e in drops) and bt < total - 1.0:
            c.tl(f'tl.set("#stage",{{scale:1.075}},{bt});tl.to("#stage",{{scale:1.04,duration:.3,ease:"power2.out"}},{bt});')

    from edit import SFX

    for name, t, g in SFX[ver]:
        if name.startswith("impact") and g >= 0.75:
            c.tl(
                f'tl.to("#stage",{{keyframes:[{{x:-18,y:10}},{{x:14,y:-8}},{{x:-8,y:6}},{{x:4,y:-2}},{{x:0,y:0}}],duration:.28,ease:"none"}},{t});'
            )

    # ---- audio
    c.add(f'<audio id="mix" src="assets/audio/mix-{ver}.mp3" data-start="0" data-duration="{total}" data-track-index="9" data-volume="1"></audio>')

    title = "Rombongan Keluarga Bugis — TikTok" if ver == "tiktok" else "Rombongan Keluarga Bugis — Reels"
    comp_id = ver
    body = "\n".join(c.html)
    js = "\n".join(c.js)
    return f"""<!doctype html>
<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1080, height=1920" />
    <title>{title}</title>
    <!-- DIBUAT OTOMATIS oleh tools/build_html.py — edit generator, bukan file ini -->
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
    <style>{CSS}</style>
  </head>
  <body>
    <div id="root" data-composition-id="{comp_id}" data-start="0" data-duration="{total}" data-width="1080" data-height="1920">
{body}
    </div>
    <script>
      const tl = gsap.timeline({{ paused: true }});
{js}
      window.__timelines["{comp_id}"] = tl;
    </script>
  </body>
</html>
"""


if __name__ == "__main__":
    import sys

    ver = sys.argv[1] if len(sys.argv) > 1 else "tiktok"
    # HyperFrames hanya boleh punya satu root composition (index.html):
    # generator menulis versi yang sedang dikerjakan ke index.html.
    (ROOT / "index.html").write_text(build(ver))
    print(f"wrote index.html ({ver})")
