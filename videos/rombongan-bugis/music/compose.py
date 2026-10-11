"""Musik latar orisinal untuk video "Rombongan Keluarga Bugis".

Disintesis sepenuhnya dari kode (numpy/scipy) — bebas hak cipta.
Nuansa: tropical-pop pesisir 120 BPM, petikan pentatonik ala kecapi
Bugis, gendang/tifa sintetis, bass offbeat, pad hangat, sidechain pump.

Pemakaian:
    python3 compose.py tiktok   -> ../assets/audio/musik-tiktok.wav
    python3 compose.py reels    -> ../assets/audio/musik-reels.wav
Juga menulis beats-<versi>.json (waktu tiap ketukan & bar) untuk sinkron cut.
"""

import json
import sys
from pathlib import Path

import numpy as np
from scipy.signal import butter, sosfilt, fftconvolve

SR = 48000
BPM = 120.0
BEAT = 60.0 / BPM
BAR = BEAT * 4
RNG = np.random.default_rng(1010)  # deterministik: 10 Oktober

HERE = Path(__file__).resolve().parent
OUT = HERE.parent / "assets" / "audio"

# ---------------------------------------------------------------- helpers


def t_axis(dur):
    return np.arange(int(dur * SR)) / SR


def env_ad(n, a, d):
    a_n = max(1, int(a * SR))
    e = np.exp(-np.arange(n) / (d * SR))
    e[:a_n] *= np.linspace(0, 1, a_n)
    return e


def lp(x, f, order=2):
    return sosfilt(butter(order, f, "low", fs=SR, output="sos"), x)


def hp(x, f, order=2):
    return sosfilt(butter(order, f, "high", fs=SR, output="sos"), x)


def bp(x, lo, hi, order=2):
    return sosfilt(butter(order, [lo, hi], "band", fs=SR, output="sos"), x)


def midi(n):
    return 440.0 * 2 ** ((n - 69) / 12)


def place(buf, sig, t, gain=1.0, pan=0.0):
    i = int(round(t * SR))
    if i >= buf.shape[1] or i < 0:
        return
    n = min(len(sig), buf.shape[1] - i)
    l = np.cos((pan + 1) * np.pi / 4)
    r = np.sin((pan + 1) * np.pi / 4)
    buf[0, i : i + n] += sig[:n] * gain * l
    buf[1, i : i + n] += sig[:n] * gain * r


# ---------------------------------------------------------------- instruments


def kick():
    t = t_axis(0.45)
    f = 45 + 110 * np.exp(-t / 0.035)
    ph = 2 * np.pi * np.cumsum(f) / SR
    s = np.sin(ph) * np.exp(-t / 0.16)
    click = hp(RNG.standard_normal(len(t)), 2500) * np.exp(-t / 0.004) * 0.25
    return np.tanh((s + click) * 1.6) * 0.9


def clap():
    t = t_axis(0.35)
    n = bp(RNG.standard_normal(len(t)), 900, 5000)
    e = np.zeros_like(t)
    for k, off in enumerate((0.0, 0.011, 0.022)):
        i = int(off * SR)
        e[i:] += np.exp(-(t[i:] - off) / (0.012 if k < 2 else 0.11))
    return n * e * 0.55


def shaker(bright=1.0):
    t = t_axis(0.08)
    n = hp(RNG.standard_normal(len(t)), 6000 * bright)
    return n * env_ad(len(t), 0.004, 0.022) * 0.22


def open_hat():
    t = t_axis(0.25)
    n = hp(RNG.standard_normal(len(t)), 7500)
    return n * env_ad(len(t), 0.002, 0.07) * 0.2


def tifa(pitch=1.0):
    """Gendang/tifa: membran bernada turun + tekstur kulit."""
    t = t_axis(0.5)
    f = (150 * pitch) + 70 * pitch * np.exp(-t / 0.03)
    body = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / 0.18)
    skin = bp(RNG.standard_normal(len(t)), 300, 2200) * np.exp(-t / 0.025) * 0.5
    return np.tanh((body + skin) * 1.3) * 0.7


def ks_pluck(freq, dur=1.6, bright=0.5):
    """Karplus-Strong — karakter petikan kecapi."""
    n = int(dur * SR)
    p = max(2, int(SR / freq))
    buf = RNG.uniform(-1, 1, p)
    buf = lp(buf, 2000 + 6000 * bright, 1)
    out = np.empty(n)
    idx = 0
    damp = 0.996
    for i in range(n):
        v = buf[idx]
        nxt = buf[(idx + 1) % p]
        buf[idx] = damp * 0.5 * (v + nxt)
        out[i] = v
        idx = (idx + 1) % p
    # sedikit "twang" metalik khas kecapi
    tw = np.sin(2 * np.pi * freq * 2.01 * t_axis(dur)) * np.exp(-t_axis(dur) / 0.08) * 0.15
    return (out + tw) * 0.5


def bass_note(freq, dur):
    t = t_axis(dur)
    s = np.sin(2 * np.pi * freq * t) + 0.35 * np.sin(2 * np.pi * freq * 2 * t)
    s += 0.15 * np.sign(np.sin(2 * np.pi * freq * t))
    s = lp(s, 600)
    return np.tanh(s * 1.4) * env_ad(len(t), 0.005, dur * 0.7) * 0.45


def pad_chord(notes, dur):
    t = t_axis(dur)
    s = np.zeros_like(t)
    for n in notes:
        for det in (-0.08, 0.0, 0.07):
            f = midi(n + det)
            saw = 2 * ((t * f) % 1.0) - 1
            s += saw
    s = lp(s / (len(notes) * 3), 1400, 2)
    a = np.minimum(1, t / 0.25)
    r = np.minimum(1, (dur - t) / 0.3).clip(0, 1)
    return s * a * r * 0.32


def bell(freq, dur=0.9):
    t = t_axis(dur)
    s = np.sin(2 * np.pi * freq * t + 1.2 * np.sin(2 * np.pi * freq * 3.5 * t) * np.exp(-t / 0.2))
    return s * env_ad(len(t), 0.002, 0.35) * 0.22


# ---------------------------------------------------------------- arrangement

# Progresi G mayor: I - vi - IV - V (G Em C D), pentatonik G A B D E
CHORDS = [
    (43, [55, 59, 62, 67]),  # G
    (40, [52, 55, 59, 64]),  # Em
    (36, [52, 55, 60, 64]),  # C
    (38, [54, 57, 62, 66]),  # D
]
PENT = [67, 69, 71, 74, 76, 79, 81, 83]  # G4 A4 B4 D5 E5 G5 A5 B5
# Motif 2-bar (indeks pentatonik, posisi 8th-note, panjang 8th) — sinkopasi ala lagu pesisir
MOTIF_A = [(4, 0), (3, 1), (2, 3), (3, 4), (4, 6), (5, 7), (4, 9), (3, 10), (2, 12), (1, 14)]
MOTIF_B = [(2, 0), (3, 2), (4, 3), (5, 5), (6, 6), (5, 8), (4, 10), (3, 11), (4, 13), (2, 14)]
TIFA_FILL = [(0, 1.0), (0.75, 1.25), (1.5, 1.0), (2.0, 0.8), (2.5, 1.25), (3.0, 1.0), (3.25, 1.0), (3.5, 1.4)]


def render(sections, total, fade_out=1.6):
    """sections: list of (start_sec, end_sec, kind) — kind in intro|drop|break|outro."""
    n = int(total * SR) + SR * 2
    drums = np.zeros((2, n))
    bass = np.zeros((2, n))
    pad = np.zeros((2, n))
    lead = np.zeros((2, n))
    K, C, OH = kick(), clap(), open_hat()
    plucks = {}

    def pl(note):
        if note not in plucks:
            plucks[note] = ks_pluck(midi(note))
        return plucks[note]

    kick_times = []

    def kind_at(t):
        for s, e, k in sections:
            if s <= t < e:
                return k
        return None

    nbars = int(np.ceil(total / BAR)) + 1
    for b in range(nbars):
        t0 = b * BAR
        root, chord = CHORDS[b % 4]
        k = kind_at(t0 + 0.01)
        if k is None:
            continue
        full = k in ("drop", "outro")
        # pad
        pad_gain = 0.9 if k in ("intro", "break") else 0.6
        place(pad, pad_chord(chord, BAR + 0.2), t0, pad_gain, -0.2)
        place(pad, pad_chord([c + 12 for c in chord[:2]], BAR + 0.2), t0, pad_gain * 0.4, 0.3)
        # melody
        motif = MOTIF_A if (b // 2) % 2 == 0 else MOTIF_B
        half = b % 2
        for idx, pos in motif:
            if (pos >= 8) != bool(half):
                continue
            tt = t0 + (pos - 8 * half) * BEAT / 2
            if kind_at(tt) is None:
                continue
            g = 0.55 if full else 0.42
            place(lead, pl(PENT[idx]), tt, g, 0.25)
            place(lead, pl(PENT[idx]), tt + BEAT * 0.75, g * 0.28, -0.45)  # echo
            if full and pos % 4 == 0:
                place(lead, bell(midi(PENT[idx] + 12)), tt, 0.5, -0.3)
        for beat in range(4):
            tb = t0 + beat * BEAT
            kb = kind_at(tb)
            if kb is None:
                continue
            fb = kb in ("drop", "outro")
            # shaker 16th
            for s16 in range(4):
                acc = 1.0 if s16 == 2 else 0.55
                if kb == "intro":
                    acc *= 0.6
                place(drums, shaker(1.0 if s16 % 2 else 0.8), tb + s16 * BEAT / 4, acc, 0.35)
            if fb:
                place(drums, K, tb, 1.0)
                kick_times.append(tb)
                place(drums, OH, tb + BEAT / 2, 0.8, -0.3)
                if beat in (1, 3):
                    place(drums, C, tb, 0.9, 0.05)
                # bass offbeat + root on downbeat
                place(bass, bass_note(midi(root), BEAT * 0.45), tb + BEAT / 2, 1.0)
                if beat == 0:
                    place(bass, bass_note(midi(root), BEAT * 0.4), tb, 0.8)
            elif kb == "break":
                if beat == 0:
                    place(bass, bass_note(midi(root), BAR * 0.9), tb, 0.55)
            elif kb == "intro" and beat in (0, 2):
                place(drums, tifa(0.9), tb, 0.5, -0.2)
        # tifa fill di bar ke-4 tiap frase pada drop
        if full and b % 4 == 3:
            for bt, p in TIFA_FILL:
                place(drums, tifa(p), t0 + bt * BEAT, 0.75, -0.25 + 0.15 * p)

    # sidechain pump untuk pad + bass di bagian drop
    pump = np.ones(n)
    for kt in kick_times:
        i = int(kt * SR)
        L = int(0.32 * SR)
        seg = 1 - 0.55 * np.exp(-np.arange(L) / (0.08 * SR))
        j = min(n, i + L)
        pump[i:j] = np.minimum(pump[i:j], seg[: j - i])
    pad *= pump
    bass *= pump

    # reverb sederhana untuk pad + lead
    ir_t = t_axis(1.8)
    ir = np.stack([RNG.standard_normal(len(ir_t)), RNG.standard_normal(len(ir_t))])
    ir *= np.exp(-ir_t / 0.45)
    ir[:, : int(0.01 * SR)] = 0
    ir /= np.sqrt((ir**2).sum(axis=1, keepdims=True))
    wet_src = pad * 0.6 + lead
    wet = np.stack([fftconvolve(wet_src[c], ir[c])[:n] for c in range(2)]) * 0.35

    # break: lowpass pada drum agar terasa "di bawah air"
    mix = drums * 0.9 + bass + pad + lead + wet
    for s, e, k in sections:
        if k == "break":
            i, j = int(s * SR), int(e * SR)
            for c in range(2):
                mix[c, i:j] = lp(mix[c, i:j], 2200, 2) * 0.9 + mix[c, i:j] * 0.1

    mix = hp(mix, 30)
    # fade out
    end = int(total * SR)
    fo = int(fade_out * SR)
    mix[:, end - fo : end] *= np.linspace(1, 0, fo) ** 1.5
    mix[:, end:] = 0
    mix = mix[:, :end]
    # glue: soft clip + normalise
    mix = np.tanh(mix * 1.1)
    mix /= np.max(np.abs(mix)) + 1e-9
    mix *= 0.89
    return mix, kick_times


def write_wav(path, x):
    import wave

    pcm = (np.clip(x.T, -1, 1) * 32767).astype("<i2")
    with wave.open(str(path), "wb") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(pcm.tobytes())


# Peta bagian per versi (detik). Drop jatuh tepat di beat, diselaraskan dengan narasi.
VERSIONS = {
    # TikTok: hook 0-3 dtk (intro tifa + petikan), drop di 3,0 dtk saat "Rombongan…",
    # break singkat di "pantainya serasa milik sendiri", drop lagi saat CTA.
    "tiktok": {
        "total": 29.0,
        "sections": [(0.0, 3.0, "intro"), (3.0, 15.5, "drop"), (15.5, 18.0, "break"), (18.0, 29.0, "outro")],
    },
    # Reels: intro lembut "Sabtu, 10 Oktober", drop di 2,5 dtk, break emosional
    # "Dari anak-anak sampai orang tua…", drop kembali di CTA (31 dtk).
    "reels": {
        "total": 46.0,
        "sections": [(0.0, 2.5, "intro"), (2.5, 23.0, "drop"), (23.0, 31.0, "break"), (31.0, 46.0, "outro")],
    },
}

if __name__ == "__main__":
    name = sys.argv[1] if len(sys.argv) > 1 else "tiktok"
    v = VERSIONS[name]
    mix, kicks = render(v["sections"], v["total"])
    OUT.mkdir(parents=True, exist_ok=True)
    write_wav(OUT / f"musik-{name}.wav", mix)
    beats = [round(i * BEAT, 3) for i in range(int(v["total"] / BEAT) + 1)]
    (HERE / f"beats-{name}.json").write_text(
        json.dumps({"bpm": BPM, "beats": beats, "bars": beats[::4], "sections": v["sections"]}, indent=1)
    )
    print(f"musik-{name}.wav  {v['total']}s  kicks={len(kicks)}")
