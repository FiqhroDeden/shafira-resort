"""Mix audio final per versi: narasi + musik (ducking) + SFX + ambience.

    python3 tools/mix.py tiktok
    python3 tools/mix.py reels
Hasil: assets/audio/mix-<versi>.mp3 (-14 LUFS, true peak -1 dBTP)
"""

import subprocess
import sys

import numpy as np

from edit import AMBIENCE_GAIN, AUDIO, CUTS, FOOTAGE_AUDIO_GAIN, ROOT, SEGMENTS, SFX, TOTAL, VO_OFFSET

SR = 48000


def load(path, start=None, dur=None):
    args = ["ffmpeg", "-v", "error"]
    if start is not None:
        args += ["-ss", f"{start}"]
    if dur is not None:
        args += ["-t", f"{dur}"]
    args += ["-i", str(path), "-f", "f32le", "-ac", "2", "-ar", str(SR), "-"]
    raw = subprocess.run(args, check=True, capture_output=True).stdout
    return np.frombuffer(raw, dtype="<f4").reshape(-1, 2).T.copy()


def add(buf, sig, t, gain):
    i = int(round(t * SR))
    if i < 0:
        sig = sig[:, -i:]
        i = 0
    n = min(sig.shape[1], buf.shape[1] - i)
    if n > 0:
        buf[:, i : i + n] += sig[:, :n] * gain


def fade(sig, fin=0.03, fout=0.08):
    n = sig.shape[1]
    a, b = int(fin * SR), int(fout * SR)
    sig[:, : min(a, n)] *= np.linspace(0, 1, min(a, n))
    sig[:, max(0, n - b) :] *= np.linspace(1, 0, n - max(0, n - b))
    return sig


def envelope(x, attack=0.03, release=0.28):
    """Envelope follower (mono) untuk sidechain ducking."""
    mono = np.abs(x).mean(axis=0)
    hop = 240  # 5 ms
    frames = mono[: len(mono) // hop * hop].reshape(-1, hop).max(axis=1)
    env = np.zeros_like(frames)
    a = np.exp(-hop / (attack * SR))
    r = np.exp(-hop / (release * SR))
    v = 0.0
    for i, f in enumerate(frames):
        v = a * v + (1 - a) * f if f > v else r * v + (1 - r) * f
        env[i] = v
    return np.repeat(env, hop)[: len(mono)] if len(env) else env


def main(ver):
    total = TOTAL[ver]
    n = int(total * SR)
    vo_buf = np.zeros((2, n))
    vo = load(AUDIO / f"narasi-{ver}.mp3")
    add(vo_buf, vo, VO_OFFSET[ver], 1.0)

    # musik + ducking 8 dB saat narasi
    music = load(AUDIO / f"musik-{ver}.wav")
    mus_buf = np.zeros((2, n))
    add(mus_buf, music, 0.0, 1.0)
    env = envelope(vo_buf)
    env = np.pad(env, (0, n - len(env)))
    speech = np.clip(env / 0.05, 0, 1)
    duck = 1.0 - 0.6 * speech  # ~ -8 dB
    mus_buf *= 0.5 * duck

    fx = np.zeros((2, n))
    for name, t, g in SFX[ver]:
        s = load(ROOT / "music" / "sfx" / f"{name}.mp3")
        add(fx, fade(s, 0.002, 0.15), t, g * 0.55)

    # ambience: audio asli footage + ombak ElevenLabs di adegan foto/grafis
    amb = np.zeros((2, n))
    sea = load(ROOT / "music" / "sfx" / "ambience1.mp3")
    for a, b, plate, _kind in CUTS[ver]:
        dur = b - a
        if plate:
            src, st, _d, _m, _f = SEGMENTS[plate]
            s = load(src, st, dur)
            add(amb, fade(s, 0.04, 0.06), a, FOOTAGE_AUDIO_GAIN)
        else:
            reps = int(np.ceil(dur / (sea.shape[1] / SR))) + 1
            loop = np.concatenate([sea] * reps, axis=1)[:, : int(dur * SR)]
            add(amb, fade(loop.copy(), 0.25, 0.25), a, AMBIENCE_GAIN)
    amb *= 1.0 - 0.45 * speech

    mix = vo_buf + mus_buf + fx + amb
    # ekor akhir
    fo = int(0.8 * SR)
    mix[:, n - fo :] *= np.linspace(1, 0, fo)

    tmp = ROOT / "music" / f".premix-{ver}.f32"
    tmp.write_bytes(mix.T.astype("<f4").tobytes())
    out = AUDIO / f"mix-{ver}.mp3"
    subprocess.run(
        [
            "ffmpeg", "-v", "error", "-y", "-f", "f32le", "-ar", str(SR), "-ac", "2", "-i", str(tmp),
            "-af", "highpass=f=35,acompressor=threshold=-16dB:ratio=2.5:attack=8:release=120:makeup=1.5,"
            "loudnorm=I=-14:TP=-1.5:LRA=9,alimiter=limit=0.8",
            "-ar", "48000", "-c:a", "libmp3lame", "-b:a", "320k", str(out),
        ],
        check=True,
    )
    tmp.unlink()
    print("mix", out.name)


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "tiktok")
